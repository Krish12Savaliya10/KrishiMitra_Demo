const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema(
  {
    stage: { type: String, required: true }, // e.g. "Sowing", "Germination", "Vegetative", "Flowering", "Harvest"
    plannedDate: { type: Date, required: true },
    actualDate: { type: Date },
    status: { type: String, enum: ["pending", "in-progress", "done", "delayed"], default: "pending" },
    notes: { type: String, default: "" },
  },
  { _id: true }
);

const cropPlanSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    farm: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
    cropName: { type: String, required: true },
    season: { type: String, required: true }, // e.g. "Kharif 2026"
    sowingDate: { type: Date, required: true },
    expectedHarvestDate: { type: Date, required: true },
    seedRateKgPerAcre: Number,
    rowSpacingCm: Number,
    irrigationCycles: [
      {
        stage: String,
        intervalDays: Number,
      },
    ],
    fertilizerEvents: [
      {
        name: String,
        stage: String,
        quantityKg: Number,
        scheduledDate: Date,
        applied: { type: Boolean, default: false },
      },
    ],
    milestones: [milestoneSchema],
    estimatedCost: { type: Number, default: 0 },
    targetYieldKg: { type: Number, default: 0 },
    seasonProgressPct: { type: Number, min: 0, max: 100, default: 0 },
    status: { type: String, enum: ["active", "completed", "abandoned"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CropPlan", cropPlanSchema);
