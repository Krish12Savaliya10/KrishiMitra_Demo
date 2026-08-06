const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    phone: { type: String, required: true, unique: true, trim: true },
    email: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
    password: { type: String, required: function() { return !this.googleId; }, minlength: 6, select: false },
    googleId: { type: String, unique: true, sparse: true },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    role: { type: String, enum: ["farmer", "advisor"], default: "farmer" },
    farmingMode: { type: String, enum: ["organic", "moderate", "flexible"], default: "moderate" },
    language: {
      type: String,
      enum: ["en", "hi", "mr", "gu", "kn"],
      default: "en",
    },
    avatarUrl: { type: String, default: "" },
    location: {
      village: String,
      district: String,
      state: String,
      lat: Number,
      lng: Number,
    },
    isVerified: { type: Boolean, default: false },
    settings: {
      smsBackupAlerts: { type: Boolean, default: true },
      voiceReadout: { type: Boolean, default: false },
      dataSaverMode: { type: Boolean, default: false },
      theme: { type: String, enum: ["light", "dark", "system"], default: "system" },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model("User", userSchema);
