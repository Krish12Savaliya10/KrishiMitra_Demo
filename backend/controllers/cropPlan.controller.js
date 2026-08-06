const CropPlan = require("../models/CropPlan");
const ScheduleTask = require("../models/ScheduleTask");
const { generateScheduleForCropPlan, startDailyScheduleMidway } = require("../services/scheduleEngine");
const { abandonActiveCropPlansForFarm, deleteCropPlanCascade } = require("../services/cropPlanLifecycle");
const cropDatabase = require("../data/cropDatabase");

exports.getSupportedCrops = (req, res) => {
  res.json(cropDatabase.map(c => c.name));
};

// POST /api/crop-plans
// Creates the CropPlan AND immediately generates its full day-by-day
// milestone + task calendar in one call — this is the "start" button.
exports.create = async (req, res, next) => {
  try {
    const { farm, cropName, sowingDate, seedRateKgPerAcre, rowSpacingCm } = req.body;
    if (!farm || !cropName || !sowingDate) {
      return res.status(400).json({ message: "farm, cropName, and sowingDate are required" });
    }

    // Dropping the previous crop and growing something new is the common case
    // (not an edge case), so by default a new plan replaces any existing
    // active plan on this farm — this is also what stops daily-task
    // duplication between an old and a new plan. Pass keepExisting:true to
    // opt out (e.g. multi-plot farms tracked as one "farm" record).
    let plansAbandoned = 0;
    if (!req.body.keepExisting) {
      plansAbandoned = await abandonActiveCropPlansForFarm(farm, req.user._id);
    }

    const cropPlan = await CropPlan.create({
      owner: req.user._id,
      farm,
      cropName,
      season: req.body.season || "Kharif 2026",
      sowingDate,
      expectedHarvestDate: sowingDate, // placeholder, overwritten below by the engine
      seedRateKgPerAcre,
      rowSpacingCm,
      estimatedCost: req.body.estimatedCost || 0,
      targetYieldKg: req.body.targetYieldKg || 0,
    });

    const { milestones, taskCount } = await generateScheduleForCropPlan(cropPlan);

    const fresh = await CropPlan.findById(cropPlan._id);
    res.status(201).json({
      cropPlan: fresh,
      milestonesGenerated: milestones.length,
      tasksGenerated: taskCount,
      previousPlansDropped: plansAbandoned,
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/crop-plans  (owner-scoped list)
// Defaults to active-only so abandoned/replaced plans don't resurface as
// "activePlan" on the frontend (which just takes list[0]). Pass
// ?status=all or an explicit ?status=abandoned to see everything/history.
exports.getAll = async (req, res, next) => {
  try {
    const ALLOWED_FILTERS = ["farm", "status", "season"];
    const filter = { owner: req.user._id };
    ALLOWED_FILTERS.forEach((key) => {
      if (req.query[key] !== undefined) filter[key] = req.query[key];
    });
    if (filter.status === "all") delete filter.status;
    else if (!filter.status) filter.status = "active";
    const docs = await CropPlan.find(filter).sort({ createdAt: -1 });
    res.json(docs);
  } catch (err) {
    next(err);
  }
};

// POST /api/crop-plans/:id/drop
// Explicit "I don't want this crop plan anymore" action — marks it abandoned
// and removes its generated daily tasks, without creating a replacement.
exports.dropPlan = async (req, res, next) => {
  try {
    const cropPlan = await CropPlan.findOne({ _id: req.params.id, owner: req.user._id });
    if (!cropPlan) return res.status(404).json({ message: "Not found" });

    const deleted = await ScheduleTask.deleteMany({ cropPlan: cropPlan._id });
    cropPlan.status = "abandoned";
    await cropPlan.save();

    res.json({ cropPlan, tasksRemoved: deleted.deletedCount || 0 });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/crop-plans/:id — cascades to ScheduleTasks so no orphaned
// tasks are left behind (orphans were another source of "duplicate"
// daily tasks showing up on the Schedule page after a plan was deleted).
exports.remove = async (req, res, next) => {
  try {
    const plan = await deleteCropPlanCascade(req.params.id, req.user._id);
    if (!plan) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

// GET /api/crop-plans/:id/calendar — the actual day-by-day view your Crop Plan page renders
exports.getCalendar = async (req, res, next) => {
  try {
    const cropPlan = await CropPlan.findOne({ _id: req.params.id, owner: req.user._id });
    if (!cropPlan) return res.status(404).json({ message: "Not found" });

    const tasks = await ScheduleTask.find({ cropPlan: cropPlan._id }).sort({ date: 1 });
    res.json({ cropPlan, tasks });
  } catch (err) {
    next(err);
  }
};

// POST /api/crop-plans/:id/start-daily-schedule
// "My crop is already halfway grown, start daily tasks from now" button.
// Body: { startPercent } (0-100, defaults to 50) OR { startDay } (exact day count).
exports.startDailySchedule = async (req, res, next) => {
  try {
    const cropPlan = await CropPlan.findOne({ _id: req.params.id, owner: req.user._id });
    if (!cropPlan) return res.status(404).json({ message: "Not found" });

    const { startPercent, startDay } = req.body || {};
    const result = await startDailyScheduleMidway(cropPlan._id, { startPercent, startDay });

    const fresh = await CropPlan.findById(cropPlan._id);
    res.json({
      cropPlan: fresh,
      startDay: result.startDay,
      durationDays: result.durationDays,
      tasksGenerated: result.taskCount,
      milestonesGenerated: result.milestones.length,
    });
  } catch (err) {
    next(err);
  }
};
