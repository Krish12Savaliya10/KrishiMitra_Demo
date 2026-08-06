const express = require("express");
const { protect } = require("../middleware/auth.middleware");
const {
  create, getAll, getCalendar, getSupportedCrops, startDailySchedule, dropPlan, remove,
} = require("../controllers/cropPlan.controller");
const crudFactory = require("../controllers/crudFactory");
const CropPlan = require("../models/CropPlan");

const router = express.Router();
const generic = crudFactory(CropPlan);

router.get("/supported-crops", getSupportedCrops);
router.use(protect);
router.route("/").get(getAll).post(create);
router.get("/:id/calendar", getCalendar);
router.post("/:id/start-daily-schedule", startDailySchedule);
router.post("/:id/drop", dropPlan);
router.route("/:id").get(generic.getOne).patch(generic.update).delete(remove);

module.exports = router;
