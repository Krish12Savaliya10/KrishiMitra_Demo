const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const WeatherCache = require("../models/WeatherCache");

const STALE_THRESHOLD_MS = 30 * 60 * 1000; // 30 minutes

/**
 * Slugify a location query into a stable cache key.
 * e.g. "Surat, Gujarat" → "surat-gujarat"
 */
function toLocationKey(query) {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Background refresh: fetch live weather from Open-Meteo ML backend
 * and save it to the WeatherCache.
 * Does NOT block the HTTP response — always fires-and-forgets.
 */
async function refreshWeatherInBackground(locationKey, query) {
  const ML_API = process.env.ML_API_URL || "http://127.0.0.1:5005";

  try {
    // Step 1: Geocode the query to lat/lon
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&addressdetails=1`,
      { signal: AbortSignal.timeout(10000) }
    );
    const geoData = await geoRes.json();

    let lat = 21.17, lon = 72.83, cityName = query;
    if (geoData && geoData.length > 0) {
      lat = parseFloat(geoData[0].lat);
      lon = parseFloat(geoData[0].lon);
      const addr = geoData[0].address || {};
      cityName =
        addr.city || addr.town || addr.village || addr.county || query.split(",")[0].trim();
    }

    // Step 2: Fetch weather from ML service
    const weatherRes = await fetch(
      `${ML_API}/api/weather?latitude=${lat}&longitude=${lon}`,
      { signal: AbortSignal.timeout(15000) }
    );
    if (!weatherRes.ok) throw new Error(`ML weather API error: ${weatherRes.status}`);
    const raw = await weatherRes.json();

    // Step 3: Process into compact snapshot
    const nowHour = new Date().getHours();
    const current = {
      temp: Math.round(raw.current?.temperature ?? 28),
      feelsLike: Math.round(raw.current?.feels_like ?? 28),
      humidity: raw.current?.humidity ?? 65,
      wind: Math.round(raw.current?.wind_speed ?? 12),
      windDir: raw.current?.wind_direction ?? 225,
      rainChance: raw.daily_forecast?.[0]?.precipitation_probability_max ?? 10,
      precipitation: raw.current?.precipitation ?? 0,
      uv: raw.daily_forecast?.[0]?.uv_index_max ?? 5,
      visibility: 15,
      pressure: raw.current?.pressure ?? 1007,
      sunrise: raw.daily_forecast?.[0]?.sunrise?.split("T")[1]?.slice(0, 5) ?? "06:05",
      sunset: raw.daily_forecast?.[0]?.sunset?.split("T")[1]?.slice(0, 5) ?? "19:23",
    };

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daily = (raw.daily_forecast || []).slice(0, 10).map((d, i) => ({
      day: i === 0 ? "Today" : days[new Date(d.date).getDay()],
      hi: Math.round(d.temp_max),
      lo: Math.round(d.temp_min),
      rain: d.precipitation_probability_max ?? 0,
    }));

    const hourlyAll = raw.hourly_forecast || [];
    const startIdx = hourlyAll.findIndex((h) => new Date(h.time).getHours() === nowHour) || 0;
    const hourly = hourlyAll.slice(startIdx, startIdx + 13).map((h, i) => {
      const hr = new Date(h.time).getHours();
      return {
        label: i === 0 ? "Now" : `${hr}${hr < 12 ? "AM" : "PM"}`,
        temp: Math.round(h.temperature),
        rain: h.precipitation_probability ?? 0,
      };
    });

    // Step 4: Upsert into WeatherCache
    await WeatherCache.findOneAndUpdate(
      { locationKey },
      {
        locationKey,
        cityName,
        lat,
        lon,
        data: { current, daily, hourly },
        fetchedAt: new Date(),
      },
      { upsert: true, new: true }
    );
    console.log(`[WeatherCache] Updated cache for "${query}" → key="${locationKey}"`);
  } catch (err) {
    console.error(`[WeatherCache] Background refresh failed for "${query}":`, err.message);
  }
}

/**
 * GET /api/weather/cache/:locationKey?query=Surat%2C+Gujarat
 *
 * Returns cached weather data immediately (no waiting for live fetch).
 * If cache is stale (>30min) or missing, triggers a background refresh
 * so next call will be warm.
 *
 * Response: { source: "cache"|"stale"|"empty", data, cityName, cachedAt }
 */
router.get("/cache/:locationKey", protect, async (req, res) => {
  const { locationKey } = req.params;
  const { query } = req.query;

  try {
    const cached = await WeatherCache.findOne({ locationKey }).lean();

    if (cached) {
      const ageMs = Date.now() - new Date(cached.fetchedAt).getTime();
      const isStale = ageMs > STALE_THRESHOLD_MS;

      if (isStale && query) {
        // Return stale data immediately, refresh in background
        refreshWeatherInBackground(locationKey, query).catch(() => {});
      }

      return res.json({
        source: isStale ? "stale" : "cache",
        cityName: cached.cityName,
        lat: cached.lat,
        lon: cached.lon,
        data: cached.data,
        cachedAt: cached.fetchedAt,
        ageMinutes: Math.round(ageMs / 60000),
      });
    }

    // No cache at all — trigger background refresh, return empty signal
    if (query) {
      refreshWeatherInBackground(locationKey, query).catch(() => {});
    }

    return res.json({ source: "empty", data: null, cachedAt: null });
  } catch (err) {
    console.error("[WeatherCache] GET error:", err.message);
    return res.status(500).json({ source: "error", data: null });
  }
});

/**
 * POST /api/weather/cache
 * Body: { locationKey, cityName, lat, lon, data }
 *
 * Called by the frontend after a successful live fetch to persist
 * the result so future page loads are instant.
 */
router.post("/cache", protect, async (req, res) => {
  const { locationKey, cityName, lat, lon, data } = req.body;
  if (!locationKey || !data) {
    return res.status(400).json({ error: "locationKey and data are required" });
  }

  try {
    await WeatherCache.findOneAndUpdate(
      { locationKey },
      { locationKey, cityName, lat, lon, data, fetchedAt: new Date() },
      { upsert: true, new: true }
    );
    return res.json({ ok: true });
  } catch (err) {
    console.error("[WeatherCache] POST error:", err.message);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
module.exports.toLocationKey = toLocationKey;
