require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Farm = require("../models/Farm");
const Expense = require("../models/Expense");
const Equipment = require("../models/Equipment");
const Recommendation = require("../models/Recommendation");
const ScheduleTask = require("../models/ScheduleTask");
const Alert = require("../models/Alert");
const CropPlan = require("../models/CropPlan");

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/krishimitra");
    console.log("Connected to MongoDB");

    const user = await User.findOne();
    if (!user) {
      console.log("No user found. Please sign up in the app first.");
      process.exit(1);
    }
    const userId = user._id;

    console.log(`Seeding data for user: ${user.firstName} ${user.lastName} (${userId})`);

    // Wipe existing farm-related data for a clean slate
    await Farm.deleteMany({ owner: userId });
    await Expense.deleteMany({ owner: userId });
    await Equipment.deleteMany({ owner: userId });
    await Recommendation.deleteMany({ owner: userId });
    await ScheduleTask.deleteMany({ owner: userId });
    await Alert.deleteMany({ owner: userId });
    await CropPlan.deleteMany({ owner: userId });

    console.log("Cleaned up old demo data...");

    // 1. Create a Farm
    const farm = await Farm.create({
      owner: userId,
      name: "Home Farm — Block A",
      location: {
        address: "Shirdi, Ahmednagar",
      },
      areaAcres: 3.2,
      soilType: "black",
      irrigationType: "drip",
      waterResources: ["Drip", "Borewell"],
      currentCrop: "Soybean",
      cropHealthIndex: 86
    });

    const farmId = farm._id;

    // 2. Add Expenses
    const expenses = [
      { date: new Date("2026-07-02"), category: "seeds", label: "Soybean JS 20-98 certified seed", amountRs: 6800 },
      { date: new Date("2026-07-05"), category: "fertilizer", label: "DAP 2 bags + potash 1 bag", amountRs: 4350 },
      { date: new Date("2026-07-09"), category: "labor", label: "Weeding — 6 workers × 1 day", amountRs: 2400 },
      { date: new Date("2026-07-12"), category: "other", label: "Diesel for pump & tractor", amountRs: 1850 },
      { date: new Date("2026-07-15"), category: "pesticide", label: "Pre-emergent herbicide", amountRs: 1620 },
      { date: new Date("2026-07-18"), category: "labor", label: "Spraying labour", amountRs: 800 },
    ];
    await Expense.insertMany(expenses.map(e => ({ owner: userId, farm: farmId, ...e })));

    // 3. Add Equipment
    const equipments = [
      { name: "Mahindra 575 DI Tractor", model: "575 DI", type: "Tractor", status: "available", hoursUsed: 1240, lastServiceDate: new Date("2026-05-18") },
      { name: "5 HP Diesel Pump", model: "Generic", type: "Other", status: "maintenance", hoursUsed: 860, lastServiceDate: new Date("2026-03-02") },
      { name: "Drip Irrigation Kit", model: "Generic", type: "Other", status: "available", hoursUsed: 0, lastServiceDate: new Date("2026-06-10") },
      { name: "Knapsack Power Sprayer", model: "Generic", type: "Other", status: "available", hoursUsed: 145, lastServiceDate: new Date("2026-05-28") },
      { name: "Rotavator 6ft", model: "Generic", type: "Cultivator", status: "in-use", hoursUsed: 410, lastServiceDate: new Date("2026-04-20") },
    ];
    await Equipment.insertMany(equipments.map(e => ({ owner: userId, farm: farmId, ...e })));

    // 4. Add Recommendations (Correct Schema format)
    const recommendationDoc = {
      owner: userId,
      farm: farmId,
      season: "Kharif 2026",
      selectedCrop: "Soybean (JS 20-98)",
      cropOptions: [
        {
          cropName: "Soybean (JS 20-98)",
          suitabilityScore: 94,
          weatherMatchPct: 96,
          soilMatchPct: 92,
          equipmentMatchPct: 95,
          expectedYieldKg: 1250,
          durationDays: 98,
          expectedMarginRs: 38500,
          reason: "Excellent fit for black cotton soil with pH 7.1. Monsoon onset window aligns with sowing. Your drip system covers dry-spell risk, and current mandi trends favour oilseeds.",
          isTopPick: true
        },
        {
          cropName: "Maize (Hybrid)",
          suitabilityScore: 87,
          weatherMatchPct: 90,
          soilMatchPct: 84,
          equipmentMatchPct: 92,
          expectedYieldKg: 2400,
          durationDays: 105,
          expectedMarginRs: 31200,
          reason: "Strong yield potential with sprinkler support. Slightly higher nitrogen demand than your current soil profile supports without split application.",
          isTopPick: false
        },
        {
          cropName: "Pigeon Pea (Tur)",
          suitabilityScore: 81,
          weatherMatchPct: 85,
          soilMatchPct: 88,
          equipmentMatchPct: 70,
          expectedYieldKg: 800,
          durationDays: 170,
          expectedMarginRs: 27800,
          reason: "Great soil-health rotation choice and low water need, but the longer duration ties up land through Rabi and needs a seed drill you don't currently list.",
          isTopPick: false
        }
      ]
    };
    await Recommendation.create(recommendationDoc);

    // 5. Add Schedule Tasks
    const tasks = [
      { title: "Irrigate Block A — 45 min drip cycle", date: new Date(new Date().setHours(6, 0, 0, 0)), priority: "high", status: "done", category: "irrigation" },
      { title: "Scout for stem borer in soybean rows 4–9", date: new Date(new Date().setHours(8, 30, 0, 0)), priority: "high", status: "pending", category: "monitoring" },
      { title: "Apply micronutrient foliar spray (Zn + B)", date: new Date(new Date().setHours(10, 0, 0, 0)), priority: "medium", status: "pending", category: "fertilizer" },
      { title: "Service diesel pump — replace fuel filter", date: new Date(new Date().setHours(14, 0, 0, 0)), priority: "medium", status: "delayed", category: "maintenance" },
      { title: "Record weekly growth photos for Block B", date: new Date(new Date().setHours(17, 0, 0, 0)), priority: "low", status: "pending", category: "monitoring" },
    ];
    await ScheduleTask.insertMany(tasks.map(t => ({ owner: userId, farm: farmId, ...t })));

    // 6. Add Alerts
    const alerts = [
      { category: "weather", severity: "critical", title: "Heavy rain expected Sunday", message: "80% chance of 40–60mm rainfall. Postpone Sunday spraying; check drainage channels in Block A before Saturday evening.", source: "Weather Intelligence", status: "active" },
      { category: "schedule_delay", severity: "warning", title: "Pump maintenance overdue by 3 days", message: "The diesel pump service task has been delayed. Irrigation reliability risk rises during the upcoming wet spell.", source: "Schedule Monitor", status: "active" },
      { category: "crop_health", severity: "warning", title: "Nitrogen trending low in Block B", message: "Soil model estimates N depletion ahead of the flowering stage. Consider split urea application within 6 days.", source: "Soil Model", status: "active" },
      { category: "weather", severity: "info", title: "Market: soybean prices up 4.2%", message: "Mandi price trend is favourable. Review your break-even panel in Expense Tracker.", source: "Market Signals", status: "active" },
    ];
    await Alert.insertMany(alerts.map(a => ({ owner: userId, farm: farmId, ...a })));

    // 8. Add Crop Plan
    await CropPlan.create({
      owner: userId,
      farm: farmId,
      cropName: "Soybean (JS 20-98)",
      season: "Kharif 2026",
      sowingDate: new Date("2026-06-22"),
      expectedHarvestDate: new Date("2026-09-25"),
      seedRateKgPerAcre: 30,
      rowSpacingCm: 45,
      estimatedCost: 24600,
      targetYieldKg: 1200,
      status: "active",
      milestones: [
        { stage: "Land Prep & Sowing", plannedDate: new Date("2026-06-15"), status: "done", notes: "Completed prep" },
        { stage: "Germination", plannedDate: new Date("2026-06-28"), status: "done", notes: "Good uniform emergence" },
        { stage: "Vegetative Growth", plannedDate: new Date("2026-07-12"), status: "in-progress", notes: "Scout for pests" },
        { stage: "Flowering", plannedDate: new Date("2026-08-05"), status: "pending", notes: "Critical irrigation point" },
        { stage: "Harvest", plannedDate: new Date("2026-09-20"), status: "pending", notes: "Ready for combine" }
      ]
    });

    console.log("Successfully seeded rich demo data for all components!");
    process.exit(0);
  } catch (err) {
    console.error("Failed to seed data:", err);
    process.exit(1);
  }
};

runSeed();
