const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const MarketPrice = require("../models/MarketPrice");

const DATAGOV_KEY = process.env.DATAGOV_API_KEY;
const BASE_URL = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

const parseApiDate = (dateStr) => {
  if (!dateStr) return new Date();
  const [day, month, year] = dateStr.split("/");
  return new Date(year, month - 1, day);
};

const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

/**
 * GET /api/market/prices
 * Optional query params:
 *   ?state=Maharashtra   (filter by state, default Maharashtra)
 *   ?commodity=Soybean   (filter by commodity name)
 *   ?limit=20            (number of records, default 20, max 100)
 *
 * Returns live mandi prices from data.gov.in Agmarknet dataset.
 */
router.get("/prices", protect, async (req, res) => {
  try {
    const { state = "", district = "", commodity = "", limit = "50" } = req.query;

    const dbQuery = {};
    if (state) dbQuery.state = new RegExp(`^${escapeRegExp(state)}$`, "i");
    if (district) dbQuery.district = new RegExp(`^${escapeRegExp(district)}`, "i");
    if (commodity) dbQuery.commodity = new RegExp(`^${escapeRegExp(commodity)}`, "i");

    // Always return whatever is in the DB — even if stale — so the UI loads instantly.
    let dbRecords = await MarketPrice.find(dbQuery)
      .sort({ parsedDate: -1, arrival_date: -1 })
      .limit(Number(limit))
      .lean();

    // Check staleness: trigger background sync if the freshest record is >6 hours old (or DB is empty)
    const freshThreshold = new Date(Date.now() - 6 * 60 * 60 * 1000);
    const freshestRecord = dbRecords[0];
    const needsRefresh = !freshestRecord || new Date(freshestRecord.fetchedAt || 0) < freshThreshold;

    if (needsRefresh) {
      const { syncDailyMarketData } = require("../services/marketSyncService");
      syncDailyMarketData().catch(console.error);
    }

    const lastUpdated = freshestRecord?.fetchedAt || freshestRecord?.parsedDate || null;
    return res.json({ source: "database", records: dbRecords, lastUpdated, needsRefresh });
  } catch (err) {
    console.error("Market API error:", err.message);
    res.status(500).json({ error: err.message, records: [] });
  }
});

/**
 * GET /api/market/prices/top
 * Returns the modal price for the most common crops
 * Used by Dashboard alert "Soybean prices up X%"
 */
router.get("/prices/top", protect, async (req, res) => {
  try {
    const crops = ["Soybean", "Maize", "Cotton", "Wheat", "Rice", "Pigeonpea"];
    const prices = [];
    
    for (const crop of crops) {
      const latest = await MarketPrice.findOne({ commodity: crop, state: "Maharashtra" })
        .sort({ parsedDate: -1 })
        .lean();
        
      if (latest) {
        prices.push({
          crop,
          modal_price: latest.modal_price,
          market: latest.market,
          date: latest.arrival_date,
        });
      }
    }
    
    if (prices.length === 0) {
      // Trigger background sync if DB is empty
      const { syncDailyMarketData } = require("../services/marketSyncService");
      syncDailyMarketData().catch(console.error);
    }

    res.json(prices);
  } catch (err) {
    console.error("Market top prices error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/market/history
 * Fetch historical prices for a specific market and commodity
 */
router.get("/history", protect, async (req, res) => {
  try {
    const { state, district, market, commodity } = req.query;

    if (!commodity) {
      return res.status(400).json({ error: "Commodity is required" });
    }

    const dbQuery = { commodity: new RegExp(`^${escapeRegExp(commodity)}$`, "i") };
    if (state) dbQuery.state = new RegExp(`^${escapeRegExp(state)}$`, "i");
    if (district) dbQuery.district = new RegExp(`^${escapeRegExp(district)}`, "i");
    if (market) dbQuery.market = new RegExp(`^${escapeRegExp(market)}`, "i");

    const history = await MarketPrice.find(dbQuery)
      .sort({ parsedDate: 1 }) // Chronological order
      .limit(90) // Last 90 entries
      .lean();

    res.json({ source: "database", records: history });
  } catch (err) {
    console.error("Market history error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/market/locations
 * Fetch distinct states, districts, or markets from the database
 * based on the provided filters.
 */
router.get("/locations", protect, async (req, res) => {
  try {
    const { state, district } = req.query;

    if (state && district) {
      const markets = await MarketPrice.distinct("market", {
        state: new RegExp(`^${escapeRegExp(state)}$`, "i"),
        district: new RegExp(`^${escapeRegExp(district)}$`, "i"),
      });
      return res.json({ markets: markets.sort() });
    } else if (state) {
      const districts = await MarketPrice.distinct("district", {
        state: new RegExp(`^${escapeRegExp(state)}$`, "i"),
      });
      return res.json({ districts: districts.sort() });
    }

    const states = await MarketPrice.distinct("state");
    const commodities = await MarketPrice.distinct("commodity");
    res.json({ states: states.sort(), commodities: commodities.sort() });
  } catch (err) {
    console.error("Market locations error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
