const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    farm: { type: mongoose.Schema.Types.ObjectId, ref: "Farm" },
    category: {
      type: String,
      enum: ["weather", "schedule_delay", "crop_health", "equipment"],
      required: true,
    },
    severity: { type: String, enum: ["critical", "warning", "info"], default: "info" },
    riskScorePct: { type: Number, min: 0, max: 100 }, // used for the risk-radar view
    title: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["active", "actioned", "dismissed"], default: "active" },
    actionTaken: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Alert", alertSchema);
