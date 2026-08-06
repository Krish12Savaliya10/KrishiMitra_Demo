require("dotenv").config({ path: __dirname + "/../.env" });
const mongoose = require("mongoose");
const MarketPrice = require("../models/MarketPrice");

const DATAGOV_KEY = process.env.DATAGOV_API_KEY;
const BASE_URL = "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070";

const parseApiDate = (dateStr) => {
  if (!dateStr) return new Date();
  const [day, month, year] = dateStr.split("/");
  return new Date(year, month - 1, day);
};

async function syncAllData() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected.");

  try {
    let offset = 0;
    const limit = 2000;
    let totalRecordsProcessed = 0;
    let hasMore = true;

    console.log("Starting full sync of Data.gov.in Mandi prices...");

    while (hasMore) {
      console.log(`Fetching records with offset ${offset}...`);
      const params = new URLSearchParams({
        "api-key": DATAGOV_KEY,
        format: "json",
        limit: limit.toString(),
        offset: offset.toString(),
      });

      const response = await fetch(`${BASE_URL}?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const json = await response.json();
      const records = json.records || [];

      if (records.length === 0) {
        hasMore = false;
        break;
      }

      // Map to MongoDB schema
      const formattedRecords = records.map((r) => ({
        state: r.state,
        district: r.district,
        market: r.market,
        commodity: r.commodity,
        variety: r.variety,
        arrival_date: r.arrival_date,
        parsedDate: parseApiDate(r.arrival_date),
        min_price: Number(r.min_price) || 0,
        max_price: Number(r.max_price) || 0,
        modal_price: Number(r.modal_price) || 0,
      }));

      // Upsert into DB
      const bulkOps = formattedRecords.map((r) => ({
        updateOne: {
          filter: {
            state: r.state,
            district: r.district,
            market: r.market,
            commodity: r.commodity,
            arrival_date: r.arrival_date,
          },
          update: { $set: { ...r, fetchedAt: new Date() } },
          upsert: true,
        },
      }));

      const result = await MarketPrice.bulkWrite(bulkOps);
      totalRecordsProcessed += records.length;
      
      console.log(`Successfully synced batch. Total processed so far: ${totalRecordsProcessed}`);

      if (records.length < limit) {
        hasMore = false; // Reached the end
      } else {
        offset += limit;
      }
    }

    console.log(`\n✅ Full sync complete! Total records in DB updated/inserted: ${totalRecordsProcessed}`);

  } catch (err) {
    console.error("Sync failed:", err);
  } finally {
    mongoose.connection.close();
  }
}

syncAllData();
