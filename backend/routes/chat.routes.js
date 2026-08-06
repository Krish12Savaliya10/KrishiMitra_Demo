
const router = require("express").Router();
const { protect } = require("../middleware/auth.middleware");
const { sendMessage, getHistory, syncPlan, getAllSessions } = require("../controllers/chat.controller");

router.use(protect);
router.post("/", sendMessage);
router.post("/sync-plan", syncPlan);
router.get("/sessions", getAllSessions);
router.get("/:sessionId", getHistory);

module.exports = router;
