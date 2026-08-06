const router = require("express").Router();
const { register, login, getMe, updateMe, googleLogin, forgotPassword, resetPassword } = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", protect, getMe);
router.patch("/me", protect, updateMe);

module.exports = router;
