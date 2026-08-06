const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    sessionId: { type: String, required: true, index: true }, // groups a conversation thread
    role: { type: String, enum: ["user", "assistant", "system"], required: true },
    content: { type: String, required: true },
    contextSnapshot: { type: mongoose.Schema.Types.Mixed }, // farm/soil/weather data sent as context for this turn
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatMessage", chatMessageSchema);
