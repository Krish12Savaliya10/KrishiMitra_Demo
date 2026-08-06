const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    farm: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
    cropPlan: { type: mongoose.Schema.Types.ObjectId, ref: "CropPlan" },
    label: { type: String, required: true }, // e.g. "Urea 50kg bag"
    category: {
      type: String,
      enum: ["seeds", "fertilizer", "pesticide", "labor", "irrigation", "equipment", "transport", "other"],
      required: true,
    },
    amountRs: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
