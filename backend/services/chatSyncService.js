function extractSyncPayload(text) {
  if (!text || typeof text !== "string") return null;

  const match = text.match(/```json:database-sync\s*([\s\S]*?)```/i);
  if (!match) return null;

  try {
    return JSON.parse(match[1].trim());
  } catch (error) {
    return null;
  }
}

function getSyncKind(syncData) {
  if (!syncData || typeof syncData !== "object") return null;
  // "unified" = has a cropPlan object (may also have top-level tasks/milestones/schedules)
  if (syncData.cropPlan || syncData.schedules) return "unified";
  // "cropPlan" = flat crop plan without wrapper (legacy Ollama output)
  if (syncData.crop || syncData.growth_stage_roadmap || syncData.cropName) return "cropPlan";
  if (syncData.recommendations || syncData.recommendation) return "recommendations";
  // "schedule" = tasks-only, no crop plan
  if (syncData.tasks && Array.isArray(syncData.tasks)) return "schedule";
  return null;
}

module.exports = {
  extractSyncPayload,
  getSyncKind,
};
