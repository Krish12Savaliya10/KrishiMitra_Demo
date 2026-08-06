const CropPlan = require("../models/CropPlan");
const ScheduleTask = require("../models/ScheduleTask");

/**
 * Marks every currently-"active" CropPlan on a farm as "abandoned" and deletes
 * their generated ScheduleTasks.
 *
 * WHY THIS EXISTS:
 * Previously, generating a new crop plan (via the "Generate Plan with AI"
 * button, or POST /api/crop-plans) never touched the farm's existing active
 * plan. Both plans' tasks stayed in the ScheduleTask collection and both were
 * returned by GET /schedule?farm=<id> at once — which is what showed up in
 * the UI as "duplicate daily tasks". Calling this before creating a new plan
 * guarantees only one plan's tasks exist for a farm at a time.
 *
 * @param {String} farmId
 * @param {String} ownerId
 * @param {String} [exceptId] - a CropPlan _id to leave untouched (e.g. itself)
 * @returns {Promise<number>} number of plans abandoned
 */
async function abandonActiveCropPlansForFarm(farmId, ownerId, exceptId = null) {
  const filter = { farm: farmId, owner: ownerId, status: "active" };
  if (exceptId) filter._id = { $ne: exceptId };

  const plansToAbandon = await CropPlan.find(filter).select("_id");
  if (plansToAbandon.length === 0) return 0;

  const ids = plansToAbandon.map((p) => p._id);
  await ScheduleTask.deleteMany({ cropPlan: { $in: ids } });
  await CropPlan.updateMany({ _id: { $in: ids } }, { $set: { status: "abandoned" } });
  return ids.length;
}

/**
 * Deletes a CropPlan and cascades the delete to its ScheduleTasks so no
 * orphaned tasks are left behind (orphans were another source of
 * "duplicate" tasks showing up in the daily schedule).
 */
async function deleteCropPlanCascade(cropPlanId, ownerId) {
  const plan = await CropPlan.findOneAndDelete({ _id: cropPlanId, owner: ownerId });
  if (!plan) return null;
  await ScheduleTask.deleteMany({ cropPlan: cropPlanId });
  return plan;
}

module.exports = { abandonActiveCropPlansForFarm, deleteCropPlanCascade };
