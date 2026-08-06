const cropDatabase = require("../data/cropDatabase");

// Maps a farm's water resources (from the Farm model) to a "capacity" category,
// so we can compare against each crop's waterNeedCategory.
function getFarmWaterCapacity(farm) {
  const resources = (farm.waterResources || []).map((r) => r.toLowerCase());
  if (resources.some((r) => r.includes("canal") || r.includes("river") || r.includes("drip"))) return "high";
  if (resources.some((r) => r.includes("borewell") || r.includes("sprinkler"))) return "medium";
  if (resources.some((r) => r.includes("rainfed"))) return "low";
  return "medium"; // unknown -> assume medium so nothing gets unfairly zeroed out
}

// Returns the current season based on month, India-standard cropping calendar.
function getCurrentSeason(date = new Date()) {
  const month = date.getMonth() + 1; // 1-12
  if (month >= 6 && month <= 10) return "kharif";
  if (month >= 10 || month <= 3) return "rabi";
  return "zaid";
}

const WATER_CAPACITY_RANK = { low: 1, medium: 2, high: 3 };


/**
 * Scores every crop in the database against the given farm/soil/season/budget
 * and returns a ranked list of options, same shape as the Recommendation model's
 * cropOptions[] subdocument.
 *
 * @param {Object} params
 * @param {Object} params.farm        - Farm document (areaAcres, waterResources, soilType, location)
 * @param {number} params.budgetRs    - Farmer's total budget for the season (optional)
 * @param {string} params.season      - "kharif" | "rabi" | "zaid" (optional, defaults to current)
 */
function generateCropRecommendations({ farm, budgetRs, season }) {
  const targetSeason = season || getCurrentSeason();
  const farmWaterCapacity = getFarmWaterCapacity(farm);
  const areaAcres = farm.areaAcres || 1;

  const scored = cropDatabase
    .filter((crop) => crop.season === targetSeason)
    .map((crop) => {
      // --- Soil match (0-100) ---
      let soilMatchPct = 70; // neutral default

      // --- Weather/water match (0-100) ---
      const cropWaterRank = WATER_CAPACITY_RANK[crop.waterNeedCategory];
      const farmWaterRank = WATER_CAPACITY_RANK[farmWaterCapacity];
      // Penalize more heavily when the farm has LESS water than the crop needs
      // than when it has more (excess water capacity is a smaller problem).
      const waterGap = cropWaterRank - farmWaterRank;
      const weatherMatchPct = waterGap <= 0 ? 95 : Math.max(35, 95 - waterGap * 30);



      // --- Economics ---
      const estimatedCost = Math.round(crop.costPerAcreRs * areaAcres);
      const expectedYieldKg = Math.round(crop.expectedYieldKgPerAcre * areaAcres);
      const expectedRevenue = Math.round(expectedYieldKg * crop.marketPriceRsPerKg);
      const expectedMarginRs = expectedRevenue - estimatedCost;

      // Budget fit — if the farmer set a budget and this crop exceeds it,
      // knock the suitability score down hard (not a hard filter, since the
      // farmer might still want to see it and adjust their plan).
      let budgetFitPct = 100;
      if (budgetRs && estimatedCost > budgetRs) {
        budgetFitPct = Math.max(20, 100 - ((estimatedCost - budgetRs) / budgetRs) * 100);
      }

      // --- Overall suitability score (weighted average) ---
      const suitabilityScore = Math.round(
        soilMatchPct * 0.35 +
          weatherMatchPct * 0.35 +
          budgetFitPct * 0.2 +
          (crop.marketDemand === "high" ? 100 : crop.marketDemand === "medium" ? 70 : 45) * 0.1
      );

      return {
        cropName: crop.name,
        suitabilityScore,
        soilMatchPct: Math.round(soilMatchPct),
        weatherMatchPct: Math.round(weatherMatchPct),

        expectedYieldKg,
        durationDays: crop.durationDays,
        expectedMarginRs,
        estimatedCostRs: estimatedCost,
        reason: buildReasonText({ crop, farmWaterCapacity, soilMatchPct, weatherMatchPct, budgetFitPct }),
        isTopPick: false,
      };
    })
    .sort((a, b) => b.suitabilityScore - a.suitabilityScore);

  if (scored.length > 0) scored[0].isTopPick = true;

  return { season: targetSeason, selectedCrop: null, cropOptions: scored };
}

// Assembles a short, plain-language explanation from the actual computed numbers —
// no LLM call here, just template sentences over real data, so it's instant and
// never invents a reason that doesn't match the scores shown next to it.
function buildReasonText({ crop, farmWaterCapacity, soilMatchPct, weatherMatchPct, budgetFitPct }) {
  const parts = [];
  if (weatherMatchPct >= 85) {
    parts.push(`Your ${farmWaterCapacity}-capacity water source comfortably covers this crop's ${crop.waterNeedCategory} water need.`);
  } else {
    parts.push(`This crop needs ${crop.waterNeedCategory} water, which may stretch your current ${farmWaterCapacity}-capacity irrigation.`);
  }
  if (budgetFitPct < 80) {
    parts.push(`Estimated cost is above your stated budget — consider a smaller area or a cheaper alternative.`);
  }
  parts.push(crop.riskNotes);
  return parts.join(" ");
}

module.exports = { generateCropRecommendations, getCurrentSeason, getFarmWaterCapacity };
