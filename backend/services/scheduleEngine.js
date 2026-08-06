/**
 * scheduleEngine.js
 *
 * Generates agronomically accurate, crop-specific daily schedules for CropPlans.
 *
 * Key improvements:
 *  - Correct season/stage progress: based on elapsed days, not task completion
 *  - Stage-aware task templates with icons, estimated duration, and per-category tasks
 *  - Dense task generation: 40–150 tasks depending on crop duration
 *  - Same-day deduplication via seenKeys Set
 *  - Generic fallback for stages without crop-specific templates
 *  - All tasks include: title, description, category, priority, icon, estimatedMinutes, dayNumber
 */
const cropDatabase = require("../data/cropDatabase");
const { getStageTemplate, getCategoryIcon } = require("../data/cropTaskTemplates");
const ScheduleTask = require("../models/ScheduleTask");
const CropPlan = require("../models/CropPlan");
const Alert = require("../models/Alert");
const Notification = require("../models/Notification");

// Stages that are "must-do" — missing them has real yield consequences.
const CRITICAL_STAGES = [
  "Sowing", "Planting", "Sett Planting", "Nursery", "Land Preparation",
  "Transplanting", "Flowering", "Harvest", "Germination",
];

function categorizeStage(stageName) {
  const s = stageName.toLowerCase();
  if (s.includes("sow") || s.includes("transplant") || s.includes("nursery") || s.includes("land prep") || s.includes("planting") || s.includes("pit")) return "planting";
  if (s.includes("irrigat") || s.includes("flood")) return "irrigation";
  if (s.includes("fertiliz") || s.includes("nutrition") || s.includes("nitrogen")) return "fertilizer";
  if (s.includes("harvest")) return "harvest";
  if (s.includes("pest") || s.includes("scout") || s.includes("disease") || s.includes("monitor")) return "monitoring";
  return "monitoring";
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function isCriticalStage(stageName) {
  return CRITICAL_STAGES.some((stage) => stageName.toLowerCase().includes(stage.toLowerCase()));
}

function getStageForDay(growthStages, day) {
  let active = growthStages[0];
  for (const stage of growthStages) {
    if (stage.dayOffset <= day) active = stage;
    else break;
  }
  return active;
}

function getPreviousStage(growthStages, activeStage) {
  const idx = growthStages.findIndex((s) => s.stage === activeStage.stage);
  return idx > 0 ? growthStages[idx - 1] : null;
}

function getNextStage(growthStages, day) {
  return growthStages.find((s) => s.dayOffset > day) || null;
}

function getStageDayNumber(activeStage, day) {
  return Math.max(1, day - activeStage.dayOffset + 1);
}

// Generic rotating inspection variants for stages without specific templates
const INSPECTION_VARIANTS = [
  { label: "Pest & disease scan",     detail: "Walk field edges, check leaf undersides for eggs, larvae, and early disease spots on 10 plants." },
  { label: "Growth & canopy check",   detail: "Measure plant height at 5 sentinel plants. Compare to growth benchmark. Flag stunted patches." },
  { label: "Weed pressure check",     detail: "Scan for new weed growth near bunds and channels. Hand-pull or spot-spray as needed." },
  { label: "Soil moisture check",     detail: "Press finger 5 cm into root zone soil. Note whether dry, moist, or waterlogged. Adjust irrigation." },
  { label: "Nutrient deficiency scan", detail: "Inspect leaf colour on 10 plants. Yellowing (N), purple (P), or brown margins (K) indicate deficiency." },
];

function atTime(date, hours, minutes) {
  const d = new Date(date);
  d.setHours(hours, minutes, 0, 0);
  return d;
}

function baseTaskFields({ cropPlan, category, isCritical = false, dayNumber = 0, stageName = "" }) {
  return {
    owner: cropPlan.owner,
    farm: cropPlan.farm,
    cropPlan: cropPlan._id,
    category,
    isCritical,
    status: "pending",
    aiGenerated: true,
    dayNumber,
    stageName,
    icon: getCategoryIcon(category),
  };
}

/**
 * Calculate correct season progress percentage.
 * Based purely on elapsed days / total duration — NOT task completion.
 * Day 0 = 0%, harvest day = 100%.
 */
function computeSeasonProgress(sowingDate, durationDays) {
  const today = new Date();
  const sowing = new Date(sowingDate);
  const elapsed = Math.max(0, Math.round((today - sowing) / (1000 * 60 * 60 * 24)));
  return Math.min(100, Math.round((elapsed / durationDays) * 100));
}

/**
 * Calculate current stage progress percentage.
 * Based on elapsed days within the current stage / stage duration.
 */
function computeStageProgress(sowingDate, growthStages, durationDays) {
  const today = new Date();
  const sowing = new Date(sowingDate);
  const elapsed = Math.max(0, Math.round((today - sowing) / (1000 * 60 * 60 * 24)));

  let activeStage = growthStages[0];
  let activeIdx = 0;
  for (let i = 0; i < growthStages.length; i++) {
    if (growthStages[i].dayOffset <= elapsed) {
      activeStage = growthStages[i];
      activeIdx = i;
    } else break;
  }

  const nextStage = growthStages[activeIdx + 1];
  const stageStart = activeStage.dayOffset;
  const stageEnd = nextStage ? nextStage.dayOffset : durationDays;
  const stageDuration = Math.max(1, stageEnd - stageStart);
  const daysIntoStage = Math.max(0, elapsed - stageStart);
  return Math.min(100, Math.round((daysIntoStage / stageDuration) * 100));
}

/**
 * Builds all tasks for a single crop-day.
 *
 * Milestone days: one landmark task marking the stage transition.
 * Non-milestone days: use stage-specific templates; fall back to generic rotation.
 *
 * Returns an array of 0–3 tasks depending on what is agronomically due.
 */
function buildTasksForDay({ cropPlan, cropDef, growthStages, day, inspectionSeq }) {
  const activeStage = getStageForDay(growthStages, day);
  const milestoneStage = growthStages.find((s) => s.dayOffset === day);
  const previousStage = getPreviousStage(growthStages, activeStage);
  const nextStage = getNextStage(growthStages, day);
  const stageDay = getStageDayNumber(activeStage, day);
  const dayDate = addDays(cropPlan.sowingDate, day);

  // ── Milestone transition day ─────────────────────────────────────────────
  if (milestoneStage) {
    const critical = isCriticalStage(milestoneStage.stage);
    const category = categorizeStage(milestoneStage.stage);
    const date = atTime(dayDate, 8, 0);
    return [
      {
        ...baseTaskFields({ cropPlan, category, isCritical: critical, dayNumber: day, stageName: milestoneStage.stage }),
        title: `${milestoneStage.stage} begins — ${cropPlan.cropName}`,
        description: previousStage
          ? `Day ${day}: transition from ${previousStage.stage} to ${milestoneStage.stage}. ${nextStage ? `Next stage: ${nextStage.stage}.` : "Final stage — complete all operations."}`
          : `Day ${day}: start the crop plan with ${milestoneStage.stage}. ${nextStage ? `Next stage: ${nextStage.stage}.` : ""}`,
        date,
        originalDate: date,
        priority: critical ? "high" : "medium",
        estimatedMinutes: critical ? 120 : 60,
        icon: getCategoryIcon(category),
      },
    ];
  }

  // ── Stage-specific template ───────────────────────────────────────────────
  const template = getStageTemplate(cropPlan.cropName, activeStage.stage);
  if (template) {
    if (stageDay % template.interval !== 1) return [];
    const taskDef = template.tasks[(stageDay - 1) % template.tasks.length];
    const date = atTime(dayDate, 8, 30);
    return [
      {
        ...baseTaskFields({ cropPlan, category: taskDef.category, isCritical: taskDef.priority === "high", dayNumber: day, stageName: activeStage.stage }),
        title: taskDef.title,
        description: `[Day ${day} — ${activeStage.stage}] ${taskDef.description}`,
        date,
        originalDate: date,
        priority: taskDef.priority,
        estimatedMinutes: taskDef.estimatedMinutes || 45,
        icon: taskDef.icon || getCategoryIcon(taskDef.category),
      },
    ];
  }

  // ── Generic fallback for stages without crop-specific templates ───────────
  const tasks = [];
  const irrigationInterval = cropDef.waterNeedCategory === "high" ? 3 : cropDef.waterNeedCategory === "medium" ? 5 : 7;
  const needsIrrigationCheck = day > 0 && day % irrigationInterval === 0;
  const needsNutritionCheck  = day > 0 && day % 15 === 0;
  const needsInspection      = day > 0 && day % 3 === 0;

  if (needsInspection) {
    const variant = INSPECTION_VARIANTS[inspectionSeq % INSPECTION_VARIANTS.length];
    const date = atTime(dayDate, 10, 0);
    tasks.push({
      ...baseTaskFields({ cropPlan, category: "monitoring", dayNumber: day, stageName: activeStage.stage }),
      title: `${variant.label} — ${activeStage.stage}`,
      description: `[Day ${day}] ${variant.detail}${cropDef.riskNotes ? ` Known risk for this crop: ${cropDef.riskNotes}` : ""}`,
      date,
      originalDate: date,
      priority: "low",
      estimatedMinutes: 30,
      icon: getCategoryIcon("monitoring"),
    });
  }

  if (needsNutritionCheck) {
    const date = atTime(dayDate, 11, 45);
    tasks.push({
      ...baseTaskFields({ cropPlan, category: "fertilizer", dayNumber: day, stageName: activeStage.stage }),
      title: `Fertilizer / nutrient check — ${activeStage.stage}`,
      description: `[Day ${day}] Inspect leaf colour for deficiency signs, then apply the scheduled fertilizer dose. Next stage: ${nextStage?.stage || "harvest close"}.`,
      date,
      originalDate: date,
      priority: "medium",
      estimatedMinutes: 45,
      icon: getCategoryIcon("fertilizer"),
    });
  }

  if (needsIrrigationCheck) {
    const date = atTime(dayDate, 16, 0);
    tasks.push({
      ...baseTaskFields({ cropPlan, category: "irrigation", dayNumber: day, stageName: activeStage.stage }),
      title: `Irrigation — ${activeStage.stage}`,
      description: `[Day ${day}] Check root-zone moisture and irrigate if the soil has dried since the last check.`,
      date,
      originalDate: date,
      priority: cropDef.waterNeedCategory === "high" ? "medium" : "low",
      estimatedMinutes: 40,
      icon: getCategoryIcon("irrigation"),
    });
  }

  return tasks;
}

/**
 * Generates the full milestone + daily-task schedule for a CropPlan.
 *
 * FIX: Deletes ALL tasks (not just aiGenerated) before regenerating.
 * FIX: Season/stage progress calculated from elapsed days, not task count.
 * NEW: All tasks include dayNumber, stageName, icon, estimatedMinutes.
 * NEW: Same-day deduplication via seenKeys.
 */
async function generateScheduleForCropPlan(cropPlan, source = "fallback", options = {}) {
  const startDay = Math.max(0, Number(options.startDay) || 0);
  console.log(`[CropPlan] Generating for crop="${cropPlan.cropName}" sowingDate=${cropPlan.sowingDate} source=${source} startDay=${startDay}`);

  const cropDef = cropDatabase.find((c) => c.name === cropPlan.cropName);
  if (!cropDef) throw new Error(`No growth-stage template found for crop "${cropPlan.cropName}"`);

  const milestones = cropDef.growthStages.map((stage) => ({
    stage: stage.stage,
    plannedDate: addDays(cropPlan.sowingDate, stage.dayOffset),
    status: stage.dayOffset < startDay ? "done" : "pending",
  }));

  // Compute CORRECT season progress from elapsed days
  const seasonProgressPct = computeSeasonProgress(cropPlan.sowingDate, cropDef.durationDays);

  await CropPlan.findByIdAndUpdate(cropPlan._id, {
    milestones,
    expectedHarvestDate: addDays(cropPlan.sowingDate, cropDef.durationDays),
    seasonProgressPct: startDay > 0
      ? Math.round((startDay / cropDef.durationDays) * 100)
      : seasonProgressPct,
  });

  // ── Delete ALL tasks (eliminates duplicates from repeated generation) ──
  await ScheduleTask.deleteMany({ cropPlan: cropPlan._id });

  const tasks = [];
  const seenKeys = new Set();
  let inspectionSeq = 0;

  for (let day = startDay; day <= cropDef.durationDays; day++) {
    const dayTasks = buildTasksForDay({
      cropPlan,
      cropDef,
      growthStages: cropDef.growthStages,
      day,
      inspectionSeq,
    });

    for (const task of dayTasks) {
      // Same-day deduplication
      const key = `${day}::${task.title}`;
      if (seenKeys.has(key)) continue;
      seenKeys.add(key);
      tasks.push(task);
      if (task.category === "monitoring") inspectionSeq++;
    }
  }

  await ScheduleTask.insertMany(tasks);

  // Optional: enrich milestone tasks with AI field notes (non-blocking)
  const warnings = [];
  const enrichmentWarnings = await enrichTasksWithFieldNotes(cropPlan, cropDef);
  if (enrichmentWarnings) warnings.push(...enrichmentWarnings);

  console.log(`[CropPlan] Result: milestones=${milestones.length} tasks=${tasks.length} warnings=${warnings.length}`);
  return { milestones, taskCount: tasks.length, warnings };
}

async function enrichTasksWithFieldNotes(cropPlan, cropDef) {
  try {
    const stageList = cropDef.growthStages.map((s) => s.stage).join(", ");
    const prompt = `You are AI Mitra. A farmer just started a ${cropPlan.cropName} crop plan.
Growth stages in order: ${stageList}.
For EACH stage, write one short (max 15 words) practical field note explaining why that stage matters or what to watch for.
Respond ONLY as JSON: {"Stage Name": "note", ...} — no extra text, no markdown.`;

    const response = await fetch(`${process.env.OLLAMA_BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true", "bypass-tunnel-reminder": "true" },
      body: JSON.stringify({
        model: process.env.OLLAMA_MODEL || "llama3.2:1b",
        messages: [{ role: "user", content: prompt }],
        stream: false,
        keep_alive: "60m",
      }),
    });

    if (!response.ok) return;

    const data = await response.json();
    let notesByStage = {};
    try { notesByStage = JSON.parse(data.message?.content || "{}"); } catch (e) { notesByStage = {}; }

    const bulkOps = cropDef.growthStages
      .filter((s) => notesByStage[s.stage])
      .map((s) => ({
        updateOne: {
          filter: { cropPlan: cropPlan._id, title: `${s.stage} begins — ${cropPlan.cropName}` },
          update: { $set: { fieldNotes: notesByStage[s.stage] } },
        },
      }));

    if (bulkOps.length > 0) await ScheduleTask.bulkWrite(bulkOps);
  } catch (err) {
    console.error("Field-note enrichment skipped (non-fatal):", err.message);
    return [`Field-note enrichment skipped: ${err.message}`];
  }
}

/**
 * Reschedule all future pending tasks when a task is delayed or skipped.
 * Also recomputes season progress from elapsed days (not task completion).
 */
async function rescheduleOnTaskUpdate(taskId) {
  const task = await ScheduleTask.findById(taskId);
  if (!task) return null;

  const today = new Date();
  let delayDays = 0;

  if (task.status === "delayed" || task.status === "skipped") {
    delayDays = Math.max(0, Math.ceil((today - task.date) / (1000 * 60 * 60 * 24)));
  }

  if (delayDays > 0 && task.cropPlan) {
    const futureTasks = await ScheduleTask.find({
      cropPlan: task.cropPlan,
      status: "pending",
      date: { $gt: task.date },
    }).sort({ date: 1 });

    for (const ft of futureTasks) {
      ft.date = addDays(ft.date, delayDays);
      await ft.save();
    }

    const cropPlan = await CropPlan.findById(task.cropPlan);
    if (cropPlan) {
      cropPlan.milestones = cropPlan.milestones.map((m) =>
        m.status === "pending" ? { ...m.toObject(), plannedDate: addDays(m.plannedDate, delayDays) } : m
      );
      cropPlan.expectedHarvestDate = addDays(cropPlan.expectedHarvestDate, delayDays);
      await cropPlan.save();
    }
  }

  // Recompute season progress from elapsed days (not task completion)
  if (task.cropPlan) {
    const cropPlan = await CropPlan.findById(task.cropPlan);
    if (cropPlan) {
      const cropDef = cropDatabase.find((c) => c.name === cropPlan.cropName);
      const seasonProgressPct = cropDef
        ? computeSeasonProgress(cropPlan.sowingDate, cropDef.durationDays)
        : 0;
      await CropPlan.findByIdAndUpdate(task.cropPlan, { seasonProgressPct });
    }
  }

  if (task.status === "skipped" || task.status === "delayed") {
    await Notification.create({
      owner: task.owner,
      type: "schedule",
      title: task.status === "skipped" ? "Task skipped" : "Task delayed",
      message: task.status === "skipped"
        ? `"${task.title}" was marked skipped.`
        : `"${task.title}" is running ${delayDays} day(s) late.`,
      refModel: "ScheduleTask",
      refId: task._id,
      isRead: false,
    });
  }

  if ((task.isCritical || task.priority === "high") && (task.status === "skipped" || task.status === "delayed")) {
    await Alert.create({
      owner: task.owner,
      farm: task.farm,
      category: "schedule_delay",
      severity: task.status === "skipped" ? "critical" : "warning",
      riskScorePct: task.status === "skipped" ? 85 : 55,
      title: `High-priority task ${task.status}: ${task.title}`,
      message: task.status === "skipped"
        ? `"${task.title}" was skipped. This is a must-do stage — yield impact expected. Schedule pushed ${delayDays} day(s).`
        : `"${task.title}" is ${delayDays} day(s) late. Remaining tasks rescheduled.`,
      status: "active",
    });
  }

  return { delayDays };
}

/**
 * Start daily tasks from a midpoint in the crop's growth.
 * Useful for farmers who join the app after sowing.
 */
async function startDailyScheduleMidway(cropPlanId, { startPercent, startDay } = {}) {
  const cropPlan = await CropPlan.findById(cropPlanId);
  if (!cropPlan) throw new Error("Crop plan not found");

  const cropDef = cropDatabase.find((c) => c.name === cropPlan.cropName);
  if (!cropDef) throw new Error(`No growth-stage template for "${cropPlan.cropName}"`);

  const resolvedStartDay = startDay !== undefined && startDay !== null
    ? Math.max(0, Number(startDay))
    : Math.round((cropDef.durationDays * (Number(startPercent) || 50)) / 100);

  const result = await generateScheduleForCropPlan(cropPlan, "mid-growth-start", { startDay: resolvedStartDay });
  return { ...result, startDay: resolvedStartDay, durationDays: cropDef.durationDays };
}

module.exports = {
  generateScheduleForCropPlan,
  rescheduleOnTaskUpdate,
  startDailyScheduleMidway,
  computeSeasonProgress,
  computeStageProgress,
};
