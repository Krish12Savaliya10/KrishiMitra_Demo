const mongoose = require("mongoose");

const marketPriceSchema = new mongoose.Schema(
  {
    state: { type: String, required: true },
    district: { type: String, required: true },
    market: { type: String, required: true },
    commodity: { type: String, required: true },
    variety: { type: String },
    arrival_date: { type: String },
    parsedDate: { type: Date },
    min_price: { type: Number },
    max_price: { type: Number },
    modal_price: { type: Number },
    fetchedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Compound index for fast querying and to prevent duplicates
marketPriceSchema.index(
  { state: 1, district: 1, market: 1, commodity: 1, arrival_date: 1 },
  { unique: true }
);

module.exports = mongoose.model("MarketPrice", marketPriceSchema);
