const mongoose = require("mongoose");

const scheduleTaskSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    farm: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
    cropPlan: { type: mongoose.Schema.Types.ObjectId, ref: "CropPlan" },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    date: { type: Date, required: true, index: true },
    originalDate: { type: Date },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    category: {
      type: String,
      enum: ["planting", "irrigation", "fertilizer", "monitoring", "maintenance", "harvest", "other"],
      default: "monitoring",
    },
    isCritical: { type: Boolean, default: false },
    status: { type: String, enum: ["pending", "done", "delayed", "skipped"], default: "pending" },
    aiGenerated: { type: Boolean, default: true },
    fieldNotes: { type: String, default: "" },

    // ── New fields for production-quality schedules ──
    dayNumber: { type: Number, default: 0 },           // Crop day (day 0 = sowing day)
    stageName: { type: String, default: "" },           // Growth stage this task belongs to
    icon: { type: String, default: "📋" },              // Emoji icon for the category
    estimatedMinutes: { type: Number, default: 45 },    // Estimated time to complete
  },
  { timestamps: true }
);

module.exports = mongoose.model("ScheduleTask", scheduleTaskSchema);
