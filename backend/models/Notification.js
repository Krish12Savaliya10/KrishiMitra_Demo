const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    type: { type: String, enum: ["alert", "schedule", "ai", "system"], required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    refModel: { type: String, enum: ["Alert", "ScheduleTask", "Recommendation", null], default: null },
    refId: { type: mongoose.Schema.Types.ObjectId, default: null },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
