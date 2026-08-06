const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Farm = require("../models/Farm");

const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID || "dummy-client-id");

// Configure nodemailer transport (Mock/Ethereal for testing if no real credentials)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.ethereal.email",
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER || "fake-user",
    pass: process.env.SMTP_PASS || "fake-pass",
  },
});

const sendEmail = async (options) => {
  try {
    const info = await transporter.sendMail({
      from: '"KrishiMitra AI" <noreply@krishimitra.com>',
      to: options.email,
      subject: options.subject,
      text: options.message,
    });
    console.log(`[Mailer] Email sent: ${info.messageId}`);
    // If using ethereal, you could log nodemailer.getTestMessageUrl(info)
  } catch (err) {
    console.error("[Mailer] Failed to send email:", err.message);
  }
};

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET || "default_secret", {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      password,
      role,
      location,
      waterResources,
    } = req.body;

    const existing = await User.findOne({ phone });
    if (existing) return res.status(400).json({ message: "Phone number already registered" });

    const user = await User.create({
      firstName,
      lastName,
      phone,
      email,
      password,
      role,
      location,
    });

    const farm = await Farm.create({
      owner: user._id,
      name: "Plot 1",
      areaAcres: 1,
      waterResources: waterResources || [],
      location: location ? (typeof location === 'string' ? { address: location } : { address: `${location.village || ""} ${location.district || ""}`.trim() }) : undefined,
    });



    if (email) {
      await sendEmail({
        email,
        subject: "Welcome to KrishiMitra! 🌱",
        message: `Hello ${firstName},\n\nWelcome to KrishiMitra! We are excited to have you on board to optimize your farming journey.\n\nBest,\nKrishiMitra Team`,
      });
    }

    const token = signToken(user._id);
    res.status(201).json({
      token,
      user: { id: user._id, firstName: user.firstName, lastName: user.lastName, role: user.role },
      farm,
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { phone, email, password } = req.body;
    const query = phone ? { phone } : { email };
    const user = await User.findOne(query).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = signToken(user._id);
    res.json({
      token,
      user: { id: user._id, firstName: user.firstName, lastName: user.lastName, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/google
exports.googleLogin = async (req, res, next) => {
  try {
    const { credential } = req.body;
    if (!credential) return res.status(400).json({ message: "No Google token provided" });

    // In a real scenario with a valid client ID, verify it:
    // const ticket = await googleClient.verifyIdToken({ idToken: credential, audience: process.env.VITE_GOOGLE_CLIENT_ID });
    // const payload = ticket.getPayload();
    // For this mockup environment, we decode the JWT (since we don't have a strict client ID enforcement setup yet).
    const payload = jwt.decode(credential);
    if (!payload || !payload.email) return res.status(400).json({ message: "Invalid Google token" });

    let user = await User.findOne({ email: payload.email });
    if (!user) {
      // Create user
      user = await User.create({
        firstName: payload.given_name || "Google",
        lastName: payload.family_name || "User",
        email: payload.email,
        googleId: payload.sub,
        phone: `GGL-${Date.now().toString().slice(-10)}`, // Dummy phone to satisfy unique requirement
        avatarUrl: payload.picture,
        isVerified: true
      });
    }

    const token = signToken(user._id);
    res.json({
      token,
      user: { id: user._id, firstName: user.firstName, lastName: user.lastName, role: user.role },
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/forgot-password
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "There is no user with that email address." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save({ validateBeforeSave: false });

    // Since we don't have frontend routing for reset password yet, we just print the token in the email.
    const message = `You are receiving this email because you (or someone else) has requested a password reset.\n\nYour Reset Token is: ${resetToken}\n\nIf you did not request this, please ignore this email.`;

    try {
      await sendEmail({ email: user.email, subject: "Password Reset Token", message });
      res.status(200).json({ message: "Token sent to email!" });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ message: "There was an error sending the email. Try again later!" });
    }
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/reset-password
exports.resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Token is invalid or has expired" });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    const jwtToken = signToken(user._id);
    res.status(200).json({
      token: jwtToken,
      message: "Password successfully reset!"
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/auth/me
exports.getMe = async (req, res, next) => {
  res.json({ user: req.user });
};

// PATCH /api/auth/me
exports.updateMe = async (req, res, next) => {
  try {
    const { firstName, lastName, farmingMode } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName, farmingMode },
      { new: true, runValidators: true }
    );
    res.json({ user });
  } catch (err) {
    next(err);
  }
};
