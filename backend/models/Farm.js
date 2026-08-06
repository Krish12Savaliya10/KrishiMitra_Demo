const mongoose = require("mongoose");

const farmSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true }, // e.g. "Plot 1 - North Field"
    areaAcres: { type: Number, required: true },
    soilType: {
      type: String,
      enum: ["alluvial", "black", "red", "laterite", "sandy", "clay", "loamy", "other"],
      default: "other",
    },

    waterResources: [{ type: String }], // ["Borewell", "Canal", "Rainfed", ...]
    // Simple availability bucket the AI/rules can key off of instead of asking
    // the farmer every single time an operation needs to know how much water
    // this farm typically has access to.
    waterLevel: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    currentCrop: { type: String, default: "" },
    cropHealthIndex: { type: Number, min: 0, max: 100, default: 0 }, // %
    location: {
      lat: Number,
      lng: Number,
      address: String,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Farm", farmSchema);
