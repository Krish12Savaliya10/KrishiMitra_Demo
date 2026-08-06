const mongoose = require("mongoose");

const cropOptionSchema = new mongoose.Schema(
  {
    cropName: { type: String, required: true },
    suitabilityScore: { type: Number, min: 0, max: 100, required: true },
    weatherMatchPct: Number,
    soilMatchPct: Number,

    expectedYieldKg: Number,
    durationDays: Number,
    expectedMarginRs: Number,
    isTopPick: { type: Boolean, default: false },
  },
  { _id: true }
);

const recommendationSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    farm: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
    budgetRs: { type: Number },
    season: { type: String, required: true },
    cropOptions: [cropOptionSchema],
    selectedCrop: { type: String, default: null },
    generatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recommendation", recommendationSchema);
