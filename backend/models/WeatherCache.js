const mongoose = require("mongoose");

/**
 * WeatherCache stores per-location weather snapshots in MongoDB.
 * Used to implement Stale-While-Revalidate so the weather page loads instantly.
 * 
 * locationKey = slugified version of the query string (e.g. "surat-gujarat")
 */
const weatherCacheSchema = new mongoose.Schema(
  {
    locationKey: { type: String, required: true, unique: true, index: true },
    cityName: { type: String, required: true },
    lat: { type: Number },
    lon: { type: Number },
    data: {
      current: { type: Object },
      daily: { type: Array },
      hourly: { type: Array },
    },
    fetchedAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

module.exports = mongoose.model("WeatherCache", weatherCacheSchema);
