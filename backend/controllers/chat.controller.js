// --- NEW CODE ---
const ChatMessage = require("../models/ChatMessage");
const Farm = require("../models/Farm");
const CropPlan = require("../models/CropPlan");
const ScheduleTask = require("../models/ScheduleTask");
const Recommendation = require("../models/Recommendation");
const MarketPrice = require("../models/MarketPrice");
const cropDatabase = require("../data/cropDatabase");
const { extractSyncPayload, getSyncKind } = require("../services/chatSyncService");
const { generateScheduleForCropPlan } = require("../services/scheduleEngine");

const TASK_CATEGORIES = ["planting", "irrigation", "fertilizer", "monitoring", "maintenance", "harvest"];
const TASK_PRIORITIES = ["low", "medium", "high"];
const MILESTONE_STATUSES = ["pending", "in-progress", "done", "delayed"];

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeDate(value, fallback = new Date()) {
  const date = value ? new Date(value) : new Date(fallback);
  return Number.isNaN(date.getTime()) ? new Date(fallback) : date;
}

function normalizeMilestoneStatus(status) {
  const raw = normalizeText(status).replace(/\s+/g, "-");
  if (raw === "active") return "in-progress";
  if (raw === "upcoming") return "pending";
  return MILESTONE_STATUSES.includes(raw) ? raw : "pending";
}

function normalizeTaskCategory(category) {
  const raw = normalizeText(category).replace(/\s+/g, "-");
  if (raw.includes("spray") || raw.includes("pest") || raw.includes("disease")) return "monitoring";
  if (raw.includes("nutri")) return "fertilizer";
  return TASK_CATEGORIES.includes(raw) ? raw : "monitoring";
}

function normalizeTaskPriority(priority) {
  const raw = normalizeText(priority);
  return TASK_PRIORITIES.includes(raw) ? raw : "medium";
}

function findCropDefinition(cropName) {
  const name = normalizeText(cropName).replace(/\([^)]*\)/g, "").trim();
  if (!name) return null;
  return cropDatabase.find((crop) => {
    const cropLabel = normalizeText(crop.name).replace(/\([^)]*\)/g, "").trim();
    return cropLabel === name || cropLabel.includes(name) || name.includes(cropLabel);
  });
}

function normalizeMilestones(milestones, fallbackDate) {
  if (!Array.isArray(milestones)) return [];
  return milestones.map((m) => {
    // The forceJson AI prompt uses "completed": true/false instead of "status".
    // Map it to the schema's status enum so milestones display correctly.
    let status = m.status;
    if (status === undefined && typeof m.completed === "boolean") {
      status = m.completed ? "done" : "pending";
    }
    return {
      stage: m.stage || m.title || "Stage",
      plannedDate: normalizeDate(m.plannedDate || m.date, fallbackDate),
      status: normalizeMilestoneStatus(status),
      notes: m.notes || "",
    };
  });
}

function buildTaskDocs(tasks, { ownerId, farmId, cropPlanId = null, fallbackDate = new Date() }) {
  if (!Array.isArray(tasks)) return [];
  return tasks.map((t) => ({
    owner: ownerId,
    farm: farmId,
    cropPlan: cropPlanId,
    title: t.title || t.task || "Farm Task",
    description: t.description || t.notes || "",
    date: normalizeDate(t.date || t.scheduledDate, fallbackDate),
    originalDate: normalizeDate(t.date || t.scheduledDate, fallbackDate),
    category: normalizeTaskCategory(t.category),
    priority: normalizeTaskPriority(t.priority),
    isCritical: Boolean(t.isCritical),
    status: "pending",
    aiGenerated: true,
    fieldNotes: t.fieldNotes || "",
  }));
}

async function saveAiSyncPayload({ syncPayload, userId, farm, cropPlanId, replace = true }) {
  console.log(`[CropPlan] Generating syncType=${getSyncKind(syncPayload)} source=AI replace=${replace}`);
  const warnings = [];
  const syncType = getSyncKind(syncPayload);

  if (syncType === "cropPlan") {
    const rawSowingDate = syncPayload.sowing_date || syncPayload.cropPlan?.sowingDate || syncPayload.sowingDate;
    const sowingDate = normalizeDate(rawSowingDate);
    const rawCropName = syncPayload.crop || syncPayload.cropPlan?.cropName || syncPayload.cropName || "Unknown Crop";
    const cropDef = findCropDefinition(rawCropName);
    const rawHarvestDate = syncPayload.harvest_target_date || syncPayload.cropPlan?.expectedHarvestDate || syncPayload.expectedHarvestDate;
    const expectedHarvestDate = normalizeDate(
      rawHarvestDate,
      cropDef ? new Date(sowingDate.getTime() + cropDef.durationDays * 24 * 60 * 60 * 1000) : sowingDate
    );
    const season = syncPayload.season || syncPayload.cropPlan?.season || syncPayload.season || "Kharif 2026";
    const areaAcres = Number(syncPayload.plan_summary?.area_acres || syncPayload.cropPlan?.areaAcres || syncPayload.areaAcres || farm.areaAcres || 1);

    // A farmer generating a new AI plan almost always means "replace my
    // current crop" — without this, the old plan's tasks stayed in the
    // ScheduleTask collection alongside the new plan's tasks and both showed
    // up together on the Schedule page as duplicate-looking daily tasks.
    if (replace) {
      const { abandonActiveCropPlansForFarm } = require("../services/cropPlanLifecycle");
      await abandonActiveCropPlansForFarm(farm._id, userId);
    }

    let parsedMilestones = syncPayload.milestones || [];
    if (syncPayload.growth_stage_roadmap) {
      parsedMilestones = syncPayload.growth_stage_roadmap.map(stage => ({
        stage: stage.stage_name,
        plannedDate: stage.start_date,
        status: stage.status,
        notes: `Duration: ${stage.duration_days} days. ${stage.daily_tasks_count} tasks.`
      }));
    }

    const newPlan = await CropPlan.create({
      owner: userId,
      farm: farm._id,
      cropName: cropDef?.name || rawCropName,
      season,
      sowingDate,
      expectedHarvestDate,
      areaAcres,
      milestones: normalizeMilestones(parsedMilestones, sowingDate),
      status: "active",
    });

    let taskCount = 0;

    let parsedTasks = syncPayload.tasks || [];
    if (syncPayload.growth_stage_roadmap) {
      syncPayload.growth_stage_roadmap.forEach(stage => {
        if (stage.daily_tasks) {
          stage.daily_tasks.forEach(task => {
            const taskDate = new Date(sowingDate.getTime() + (task.day_offset || 0) * 24 * 60 * 60 * 1000);
            parsedTasks.push({
              title: task.task,
              date: taskDate,
              category: task.category
            });
          });
        }
      });
    }

    const taskDocs = buildTaskDocs(parsedTasks, {
      ownerId: userId,
      farmId: farm._id,
      cropPlanId: newPlan._id,
      fallbackDate: sowingDate,
    });

    if (taskDocs.length > 0) {
      await ScheduleTask.insertMany(taskDocs);
      taskCount += taskDocs.length;
    } else if (cropDef) {
      // No AI-provided tasks (e.g. empty growth_stage_roadmap or no tasks) —
      // fall back to the deterministic template engine so the crop plan
      // ALWAYS gets a full milestone + task calendar.
      try {
        const generated = await generateScheduleForCropPlan(newPlan);
        taskCount += generated.taskCount || 0;
        warnings.push("AI provided no tasks; used standard template.");
        if (generated.warnings) warnings.push(...generated.warnings);
      } catch (err) {
        console.warn("[AI Sync] Template schedule fallback failed:", err.message);
        warnings.push(`Template schedule fallback failed: ${err.message}`);
      }
    } else {
      console.warn(`[AI Sync] No cropDef match for '${rawCropName}' and no AI tasks — plan saved with 0 tasks`);
      warnings.push(`No cropDef match for '${rawCropName}' and no AI tasks — plan saved with 0 tasks`);
    }

    console.log(`[CropPlan] Result: type=cropPlan tasks=${taskCount} warnings=${warnings.length}`);
    return { 
      type: "cropPlan", 
      cropPlan: newPlan, 
      taskCount,
      warnings
    };
  }

  if (syncType === "unified") {
    let cropPlan = null;
    let taskCount = 0;

    // 1. Save or Update Crop Plan — use a WHITELIST of schema-known fields only.
    // Spreading the raw AI object causes Mongoose strict-mode errors when the
    // model generates unknown keys (e.g. areaAcres, variety, estimatedCost, etc.)
    if (syncPayload.cropPlan) {
      const raw = syncPayload.cropPlan;

      const rawCropName = raw.cropName || raw.crop_name || "Unknown Crop";
      const cropDef = findCropDefinition(rawCropName);
      const sowingDate = normalizeDate(raw.sowingDate || raw.sowing_date);
      const expectedHarvestDate = normalizeDate(
        raw.expectedHarvestDate || raw.harvest_target_date,
        cropDef
          ? new Date(sowingDate.getTime() + cropDef.durationDays * 24 * 60 * 60 * 1000)
          : sowingDate
      );

      // The AI generates milestones at the TOP LEVEL of the JSON object
      // (e.g. { cropPlan: {...}, milestones: [...], tasks: [...] })
      // so check both locations.
      const rawMilestones = (raw.milestones && raw.milestones.length > 0)
        ? raw.milestones
        : (syncPayload.milestones || []);

      // Build a clean document with ONLY fields that exist in cropPlanSchema.
      const cleanPlan = {
        cropName: cropDef?.name || rawCropName,
        season: raw.season || "Kharif 2026",
        sowingDate,
        expectedHarvestDate,
        milestones: normalizeMilestones(rawMilestones, sowingDate),
        status: "active",
        estimatedCost: Number(raw.estimatedCost || 0),
        targetYieldKg: Number(raw.targetYieldKg || 0),
        seasonProgressPct: 0,
        irrigationCycles: Array.isArray(raw.irrigationCycles) ? raw.irrigationCycles : [],
        fertilizerEvents: Array.isArray(raw.fertilizerEvents) ? raw.fertilizerEvents : [],
      };

      console.log(`[CropPlan] Saving unified plan: crop=${cleanPlan.cropName} sowing=${cleanPlan.sowingDate} milestones=${cleanPlan.milestones.length}`);

      const existingPlanId = cropPlanId || raw.cropPlanId;

      try {
        if (existingPlanId) {
          cropPlan = await CropPlan.findByIdAndUpdate(
            existingPlanId,
            { $set: cleanPlan },
            { new: true }
          );
          console.log(`[CropPlan] Updated existing plan: ${existingPlanId}`);
        } else {
          const { abandonActiveCropPlansForFarm } = require("../services/cropPlanLifecycle");
          await abandonActiveCropPlansForFarm(farm._id, userId);
          cropPlan = await CropPlan.create({
            ...cleanPlan,
            owner: userId,
            farm: farm._id,
          });
          console.log(`[CropPlan] Created new plan: ${cropPlan._id}`);
        }
      } catch (err) {
        console.error("[CropPlan] Mongoose save failed:", err.message);
        if (err.errors) {
          Object.keys(err.errors).forEach(k => console.error(`  - ${k}: ${err.errors[k].message}`));
        }
        warnings.push(`Plan save error: ${err.message}`);
        throw err; // Re-throw so the HTTP handler returns a proper error response
      }
    }

    // 2. Insert Tasks — normalize so AI-invented category values never fail the
    //    ScheduleTask enum and abort the entire sync.
    const incomingTasks = (syncPayload.tasks && Array.isArray(syncPayload.tasks))
      ? syncPayload.tasks
      : ((syncPayload.schedules && Array.isArray(syncPayload.schedules)) ? syncPayload.schedules : []);

    console.log(`[CropPlan] Processing ${incomingTasks.length} AI-generated tasks`);

    const scheduleDocs = buildTaskDocs(incomingTasks, {
      ownerId: userId,
      farmId: farm._id,
      cropPlanId: cropPlan ? cropPlan._id : (cropPlanId || null),
      fallbackDate: cropPlan?.sowingDate || new Date(),
    });

    if (scheduleDocs.length > 0) {
      try {
        await ScheduleTask.insertMany(scheduleDocs, { ordered: false });
        taskCount += scheduleDocs.length;
        console.log(`[CropPlan] Inserted ${scheduleDocs.length} tasks`);
      } catch (err) {
        // ordered:false means partial inserts succeed; BulkWriteError is normal
        const inserted = err.result?.nInserted || 0;
        taskCount += inserted;
        console.warn(`[CropPlan] Task insertMany partial: ${inserted}/${scheduleDocs.length} inserted. Error: ${err.message}`);
        warnings.push(`${scheduleDocs.length - inserted} tasks failed to insert.`);
      }
    } else if (cropPlan) {
      // AI returned a cropPlan but no valid tasks — fall back to template engine.
      const cropDef = findCropDefinition(cropPlan.cropName);
      if (cropDef) {
        try {
          const generated = await generateScheduleForCropPlan(cropPlan);
          taskCount += generated.taskCount || 0;
          warnings.push("AI provided no tasks; used standard template.");
          if (generated.warnings) warnings.push(...generated.warnings);
        } catch (err) {
          console.warn("[AI Sync] Template schedule fallback failed:", err.message);
          warnings.push(`Template schedule fallback failed: ${err.message}`);
        }
      } else {
        console.warn(`[AI Sync] No cropDef for '${cropPlan.cropName}' and no tasks — plan saved with 0 tasks`);
        warnings.push(`No task template for '${cropPlan.cropName}' — plan saved without schedule.`);
      }
    }

    console.log(`[CropPlan] Result: type=unified tasks=${taskCount} warnings=${warnings.length}`);
    return { type: "unified", cropPlan, taskCount, warnings };
  }

  if (syncType === "schedule") {
    const fallbackDate = syncPayload.date ? normalizeDate(syncPayload.date) : new Date();
    const parsedTasks = (syncPayload.tasks || []).map(t => ({
      ...t,
      description: t.reason || t.description || "",
      date: t.date || fallbackDate
    }));

    const taskDocs = buildTaskDocs(parsedTasks, {
      ownerId: userId,
      farmId: farm._id,
      fallbackDate: fallbackDate,
    });
    
    if (taskDocs.length > 0) {
      await ScheduleTask.insertMany(taskDocs);
    } else {
      warnings.push("No tasks were generated for this schedule. Try checking your crop plan details.");
    }
    
    console.log(`[CropPlan] Result: type=schedule tasks=${taskDocs.length} warnings=${warnings.length}`);
    return { 
      type: "schedule", 
      taskCount: taskDocs.length,
      warnings,
      weather_summary_for_farmer: syncPayload.weather_summary_for_farmer || null,
      farmer_alert_banner: syncPayload.farmer_alert_banner || null,
      skipped_or_rescheduled: syncPayload.skipped_or_rescheduled || []
    };
  }

  if (syncType === "recommendations") {
    const recommendation = await Recommendation.create({
      owner: userId,
      farm: farm._id,
      season: syncPayload.season || "Kharif 2026",
      cropOptions: (syncPayload.recommendations || syncPayload.cropOptions || []).map((option) => ({
        cropName: option.cropName || option.name || "Unknown Crop",
        suitabilityScore: Number(option.suitabilityScore || option.score || 0),
        weatherMatchPct: Number(option.weatherMatchPct || 0),
        soilMatchPct: Number(option.soilMatchPct || 0),
        expectedYieldKg: Number(option.expectedYieldKg || 0),
        durationDays: Number(option.durationDays || 0),
        expectedMarginRs: Number(option.expectedMarginRs || 0),
        isTopPick: !!option.isTopPick,
      })),
      selectedCrop: syncPayload.selectedCrop || null,
    });
    return { type: "recommendations", recommendation };
  }

  return null;
}

async function buildMarketContext({ farm, message, user }) {
  const hints = new Set();
  if (farm?.currentCrop) hints.add(farm.currentCrop);
  for (const crop of cropDatabase) {
    const simple = crop.name.replace(/\s*\([^)]*\)/g, "");
    if (normalizeText(message).includes(normalizeText(simple))) hints.add(simple);
  }

  const district = user?.location?.district || farm?.location?.address?.split(",")?.slice(-2, -1)?.[0]?.trim();
  const query = {};
  if (hints.size > 0) {
    query.commodity = new RegExp(Array.from(hints).map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "i");
  }
  if (district) query.district = new RegExp(district.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");

  let prices = await MarketPrice.find(query).sort({ parsedDate: -1, fetchedAt: -1 }).limit(6).lean();
  if (prices.length === 0 && hints.size > 0) {
    prices = await MarketPrice.find({ commodity: query.commodity }).sort({ parsedDate: -1, fetchedAt: -1 }).limit(6).lean();
  }
  if (prices.length === 0) {
    prices = await MarketPrice.find({}).sort({ parsedDate: -1, fetchedAt: -1 }).limit(6).lean();
  }

  if (prices.length === 0) return "Stored mandi price context: no recent records available in the database.";
  const rows = prices.map((p) => `${p.commodity} | ${p.market}, ${p.district}, ${p.state} | modal ₹${p.modal_price}/quintal | range ₹${p.min_price}-${p.max_price} | ${p.arrival_date}`);
  return `Stored mandi price context (from local MarketPrice DB):\n${rows.join("\n")}`;
}

async function fetchFarmWeatherSnapshot(farm) {
  const lat = farm?.location?.lat;
  const lon = farm?.location?.lng;
  if (lat == null || lon == null) return null;

  try {
    const baseUrl = process.env.ML_SERVICE_URL || "http://127.0.0.1:5005";
    const res = await fetch(`${baseUrl}/api/weather?latitude=${lat}&longitude=${lon}`, {
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      temp: data.current?.temperature,
      humidity: data.current?.humidity,
      rainChance: data.daily_forecast?.[0]?.precipitation_probability_max,
      wind: data.current?.wind_speed,
      condition: data.current?.weather_description,
      todayRainMm: data.daily_forecast?.[0]?.rain_sum,
      uv: data.daily_forecast?.[0]?.uv_index_max,
    };
  } catch (err) {
    console.warn("[AI Controller] Weather context unavailable:", err.message);
    return null;
  }
}

// POST /api/chat
// body: { sessionId, message }
exports.sendMessage = async (req, res, next) => {
  try {
    const { sessionId, message, farmId, weatherSnapshot, forceJson, imageBase64 } = req.body;
    const selectedFarmId = farmId || req.body.farm?.id || req.body.farmId;
    if (!sessionId || !message) {
      return res.status(400).json({ message: "sessionId and message are required" });
    }

    // 1. INPUT VALIDATION
    if (message.length > 1000) {
      return res.status(400).json({ message: "Message is too long. Please keep it under 1000 characters." });
    }
    const badWords = ["abuse", "hate", "kill"];
    if (badWords.some(bw => message.toLowerCase().includes(bw))) {
      return res.status(400).json({ message: "Message contains inappropriate content." });
    }

    // 2. INTENT CLASSIFICATION (Deterministic keyword-based router)
    if (!forceJson) {
      console.log(`[AI Pipeline] Incoming Question: "${message}"`);
      const msgLower = message.toLowerCase();

      // Block-list: topics that are clearly off-domain
      const blockedKeywords = [
        "politician", "politics", "election", "modi", "gandhi", "bjp", "congress", "party",
        "cricket", "football", "ipl", "sports", "match", "stadium",
        "coding", "programming", "python", "javascript", "react", "nodejs",
        "movie", "film", "bollywood", "netflix", "series",
        "religion", "temple", "mosque", "church", "prayer",
        "war", "army", "military", "weapon", "bomb",
        "stock market", "nifty", "sensex", "investment", "cryptocurrency",
        "history", "emperor", "mughal", "british raj",
        "recipe", "cooking", "restaurant", "food",
        "travel", "hotel", "flight", "tourism",
      ];

      // Allow-list: agriculture and app-related terms
      const allowedKeywords = [
        // crops & plants
        "crop", "farm", "agri", "kheti", "kisaan", "kisan",
        "rice", "wheat", "maize", "corn", "soybean", "soya", "cotton", "sugarcane",
        "tomato", "potato", "onion", "chilli", "pepper", "brinjal",
        "mango", "banana", "grape", "orange", "lemon", "pomegranate",
        "vegetable", "fruit", "plant", "seed", "seedling", "harvest", "yield",
        "sow", "sowing", "transplant", "germination",
        // soil & water
        "soil", "mud", "clay", "sand", "loam", "nutrient",
        "irrigation", "water", "drip", "flood", "sprinkler",
        "borewell", "canal", "rain", "monsoon", "drought",
        // inputs
        "fertilizer", "manure", "compost", "organic", "urea", "dap", "npk", "potassium",
        "pesticide", "fungicide", "insecticide", "herbicide", "weedicide", "spray",
        // problems
        "disease", "pest", "insect", "weed", "blight", "rot", "rust", "mildew",
        "leaf", "stem", "root", "yellowing", "wilting", "spots", "fungus", "virus",
        // market
        "mandi", "market", "price", "rate", "sell", "buy",
        "scheme", "pm kisan", "subsidy", "government scheme",
        // weather
        "weather", "temperature", "humidity", "forecast", "uv", "wind",
        // app features
        "krishimitra", "crop plan", "schedule", "dashboard", "disease detection",
        "recommendation", "soil report", "profile", "app",
        // generic farming
        "grow", "growth", "cultivation", "production", "land", "field", "acre",
        "kharif", "rabi", "zaid", "season", "rotation",
      ];

      const isBlocked = blockedKeywords.some(kw => msgLower.includes(kw));
      const isAllowed = allowedKeywords.some(kw => msgLower.includes(kw));

      // Only reject if explicitly blocked AND NOT about farming
      if (isBlocked && !isAllowed) {
        console.log(`[AI Pipeline] Classification Result: NO (blocked keyword matched)`);
        console.log(`[AI Pipeline] Reason for Rejection: Off-domain keyword detected.`);
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.write(`data: ${JSON.stringify({ chunk: "I am KrishiMitra AI. I can only answer questions related to: Agriculture, Farming, Crops, Plant Diseases, Soil, Weather, Fertilizers, Irrigation, Government Agriculture Schemes, Crop Plans, Daily Schedule, Disease Detection, and the KrishiMitra website." })}\n\n`);
        res.write("data: [DONE]\n\n");
        res.end();
        return;
      }

      console.log(`[AI Pipeline] Classification Result: YES (allowed)`);
    }

    // Use whichever farm is selected in the UI (farmId from the frontend's
    // activeFarmId). Falls back to the first farm only if none was sent,
    // so old clients / the demo widget don't break.
    const farm = selectedFarmId
      ? await Farm.findOne({ _id: selectedFarmId, owner: req.user._id })
      : await Farm.findOne({ owner: req.user._id }).sort({ createdAt: 1 });

    const liveWeather = weatherSnapshot || await fetchFarmWeatherSnapshot(farm);

    const contextSnapshot = {
      farmerName: req.user.firstName,
      farmName: farm?.name,
      location: farm?.location?.address || req.user.location?.district,
      currentCrop: farm?.currentCrop,
      // Known-once farm facts — passed in every turn so the AI never has to
      // stop and ask the farmer for these again mid-conversation.
      areaAcres: farm?.areaAcres,
      soilType: farm?.soilType,
      waterLevel: farm?.waterLevel,
      waterResources: farm?.waterResources,
      // Passed straight from the frontend's already-fetched Open-Meteo data —
      // see _app.weather.jsx. Keeps the backend from needing its own weather call.
      weatherTemp: liveWeather?.temp,
      weatherHumidity: liveWeather?.humidity,
      weatherRainChance: liveWeather?.rainChance,
      weatherWind: liveWeather?.wind,
      weatherCondition: liveWeather?.condition,
      weatherRainMm: liveWeather?.todayRainMm,
      weatherUv: liveWeather?.uv,
    };

    const marketContext = await buildMarketContext({ farm, message, user: req.user });

    await ChatMessage.create({
      owner: req.user._id,
      sessionId,
      role: "user",
      content: message,
      contextSnapshot,
    });

    let history = await ChatMessage.find({ owner: req.user._id, sessionId })
      .sort({ createdAt: -1 })
      .limit(30);
    history = history.reverse();

    let finalMessage = message;
    if (imageBase64) {
      const { detectDiseaseFromImageBase64 } = require("../services/geminiService");
      try {
        const diseaseResult = await detectDiseaseFromImageBase64(imageBase64);
        console.log(`[AI Pipeline] Gemini Vision Result: "${diseaseResult}"`);
        if (diseaseResult && diseaseResult !== "No disease detected") {
          // Gemini returns ONLY the disease name. Now instruct Ollama to give full details.
          finalMessage = `I have uploaded a plant image. The AI image analysis has identified the disease as: "${diseaseResult}".

Now, provide a detailed report about this plant disease with the following sections:
1. **Disease Overview** - What is this disease and what causes it (fungal/bacterial/viral/pest)?
2. **Symptoms** - What visible symptoms should the farmer look for on the plant?
3. **Affected Crops** - Which crops are most commonly affected?
4. **Spread & Conditions** - How does it spread? What weather/conditions make it worse?
5. **Treatment & Control** - What are the recommended pesticides, fungicides, or organic treatments available in India?
6. **Prevention** - What farming practices can prevent this disease in future seasons?

Be practical, use Indian context, and format your answer clearly.`;
        } else {
          // No disease found — pass the original message and tell Ollama what happened
          finalMessage = `${message}\n\n[Note: The user uploaded a plant image. The AI vision analysis found: "${diseaseResult}". If they asked about disease, let them know no disease was found but offer to help if they describe symptoms.]`;
        }
      } catch (err) {
        console.error("[AI Pipeline] Gemini API error:", err.message);
        // Gracefully fall back — still respond using user's text
        finalMessage = `${message}\n\n[Note: The user attached a plant image, but the vision analysis service is temporarily unavailable. Please advise the user to describe their crop symptoms in text so you can still help diagnose the disease.]`;
      }
    }

    // Fetch RAG context from our new Python ML Server
    let ragContext = "";
    if (!forceJson) {
      try {
        const ragRes = await fetch("http://127.0.0.1:5005/api/retrieve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: finalMessage, n_results: 5 })
        });
        if (ragRes.ok) {
          const ragData = await ragRes.json();
          
          let isRelevant = true;
          let bestScore = 999;
          
          if (!ragData.distances || ragData.distances.length === 0) {
            isRelevant = false;
            console.log(`[AI Pipeline] Reason for Rejection: Retrieval returned empty.`);
          } else {
             bestScore = ragData.distances[0];
             // L2 distance threshold: > 1.30 is weak
             if (bestScore > 1.30) {
               isRelevant = false;
               console.log(`[AI Pipeline] Reason for Rejection: Retrieval score ${bestScore.toFixed(3)} is worse than threshold (1.30).`);
             }
          }
          
          // Never reject explicit intent-tagged requests (@cropPlan, @schedule, etc)
          // — the farmer triggered a button action on purpose, RAG score is irrelevant.
          const hasIntentTag = message.includes("@cropPlan") || message.includes("@schedule") ||
            message.includes("@recommendation") || message.includes("@disease") || message.includes("@market");

          if (!isRelevant && !hasIntentTag) {
             res.setHeader("Content-Type", "text/event-stream");
             res.setHeader("Cache-Control", "no-cache");
             res.setHeader("Connection", "keep-alive");
             res.write(`data: ${JSON.stringify({ chunk: "I couldn't find reliable information in the KrishiMitra knowledge base. Please ask another farming-related question." })}\n\n`);
             res.write("data: [DONE]\n\n");
             res.end();
             return; // Abort without calling Ollama
          } else if (!isRelevant && hasIntentTag) {
             console.log(`[AI Pipeline] RAG score ${bestScore.toFixed(3)} weak but bypassing rejection due to intent tag.`);
          }
          
          console.log(`[AI Pipeline] Retrieved ${ragData.distances.length} documents. Best Score: ${bestScore.toFixed(3)}`);
          if (ragData.context) {
            ragContext = `\n\n[KNOWLEDGE BASE]\nHere is relevant reference material retrieved from the RAG database:\n---\n${ragData.context}\n---\nUse this information if applicable to accurately advise the farmer on farming or website queries.`;
          }
        } else {
          console.warn("[AI Controller] RAG Server returned non-200 status:", ragRes.status);
        }
      } catch (e) {
        console.warn("[AI Controller] Could not reach RAG Server on port 5005. Proceeding without RAG context. Error:", e.message);
      }
    }

    let intentInstructions = "";
    if (message.includes("@cropPlan")) {
      intentInstructions = `The user wants to generate a CROP PLAN. 
If the user's message does not contain Crop Name, Season, Area, and Irrigation, tell them: "Please use the 'Generate Plan with AI' button on the Crop Plan page to enter your farm details."
If the details ARE provided, generate a comprehensive crop plan.
CRITICAL REQUIREMENT: ${forceJson ? "You MUST output ONLY a valid JSON object matching the database-sync schema. DO NOT output markdown, DO NOT output conversational text, ONLY output raw JSON." : "You MUST append the ```json:database-sync block at the very end of your message. Do not forget it."} Calculate the sowingDate as today's date, and the expectedHarvestDate based on the crop's typical growth duration.`;
    } else if (message.includes("@schedule") || message.includes("@scedule")) {
      intentInstructions = `The user wants a DAILY OR WEEKLY SCHEDULE. 
If the user's message does not contain Crop Name and Growth Stage, tell them: "Please use the 'Generate Tasks with AI' button on the Schedule page to enter your details."
CRITICAL REQUIREMENT: If the details ARE provided, generate a beautiful, detailed schedule in a markdown table. Use emojis (🌾, 🌱, 💧, 🐛) for section headers. Include a "Weekly Monitoring Checklist". At the very end of your message, you MUST append the \`\`\`json:database-sync block containing the tasks array.`;
    } else if (message.includes("@recommendation") || message.includes("@recomandetion")) {
      intentInstructions = `The user wants a CROP RECOMMENDATION.
MANDATORY FIELDS to collect: 1. Region/Location, 2. Soil type or pH (if known), 3. Water/Irrigation availability, 4. Season.
INSTRUCTION: If ANY fields are missing, ask follow-up questions. Once collected, analyze the data to recommend the best crops. Do NOT generate the \`\`\`json:database-sync block unless they explicitly ask to save a specific plan.`;
    } else if (message.includes("@disease") || message.includes("@diease")) {
      intentInstructions = `The user is asking about a DISEASE.
MANDATORY FIELDS to collect: 1. Crop Name, 2. Description of symptoms, 3. Affected plant parts (leaf/stem/root), 4. Duration of symptoms.
INSTRUCTION: If ANY fields are missing, ask follow-up questions to diagnose accurately. Once collected, provide a diagnosis, treatments, and preventative measures in a markdown table.`;
    } else if (message.includes("@market")) {
      intentInstructions = `The user wants MARKET AND PRICE ANALYSIS.
MANDATORY FIELDS to collect: 1. Crop/Commodity Name, 2. Local Mandi or District/State, 3. Target selling timeframe (e.g. today, next week).
INSTRUCTION: If ANY fields are missing, ask follow-up questions. Once collected, provide expected price trends, demand analysis, and best time to sell in a markdown table.`;
    } else if (message.includes("@weather")) {
      intentInstructions = `The user wants a WEATHER ADVISORY.
MANDATORY FIELDS to collect: 1. Specific Farm Location (District/Village), 2. Current Crop being grown, 3. Timeframe of concern (e.g. today, next 3 days, next week).
INSTRUCTION: If ANY fields are missing, ask follow-up questions. Once collected, provide weather impacts on the crop and recommended actions (like delaying spraying or irrigation) in a markdown table.`;
    }

    const basePrompt = `Today's Date: ${new Date().toISOString().split("T")[0]}. Farmer: ${contextSnapshot.farmerName || "Farmer"}. Farm: ${contextSnapshot.farmName || "unnamed plot"}. Location: ${contextSnapshot.location || "unknown"}. Area: ${contextSnapshot.areaAcres ?? "?"} acres. Soil type: ${contextSnapshot.soilType || "unknown"}. Water availability: ${contextSnapshot.waterLevel || "medium"}. Water sources: ${(contextSnapshot.waterResources && contextSnapshot.waterResources.length) ? contextSnapshot.waterResources.join(", ") : "rainfed"}. Crop: ${contextSnapshot.currentCrop || "not set"}. Soil pH: ${contextSnapshot.soilPh ?? "?"}, N: ${contextSnapshot.soilN ?? "?"}, P: ${contextSnapshot.soilP ?? "?"}, K: ${contextSnapshot.soilK ?? "?"}. Current weather: ${contextSnapshot.weatherCondition || "unknown"}, ${contextSnapshot.weatherTemp ?? "?"}°C, ${contextSnapshot.weatherHumidity ?? "?"}% humidity, ${contextSnapshot.weatherRainChance ?? "?"}% rain chance, ${contextSnapshot.weatherRainMm ?? "?"} mm rain today, ${contextSnapshot.weatherWind ?? "?"} km/h wind, UV ${contextSnapshot.weatherUv ?? "?"}.
IMPORTANT: Area, soil type, and water availability/sources above are already on file for this farm. NEVER ask the farmer for these again — use the values given. Only ask follow-up questions for details that are genuinely missing and not listed above (e.g. specific variety, budget).
${marketContext}
IMPORTANT: this farmer may have multiple farms — always answer specifically about "${contextSnapshot.farmName || "this farm"}", not farming in general.${ragContext}`;

    let systemPrompt = "";
    const todayStr = new Date().toISOString().split("T")[0];
    const activeCropPlan = await CropPlan.findOne({ farm: farmId, status: "active" }).sort({ createdAt: -1 });
    const isNewPlanRequest = message.includes("@cropPlan");
    const cropPlanId = req.body.cropPlanId || (activeCropPlan && !isNewPlanRequest ? activeCropPlan._id.toString() : null);
    
    // For schedule ranges: if not provided, assume next 7 days for new plans, or just today for daily tasks.
    const fromDateStr = req.body.fromDate || todayStr;
    const toDate = new Date(new Date(fromDateStr).getTime() + (req.body.days || 7) * 24 * 60 * 60 * 1000);
    const toDateStr = toDate.toISOString().split("T")[0];

    if (forceJson) {
      systemPrompt = `You are a data generator for KrishiMitra's MongoDB collections. Generate crop plan and daily schedule/task documents that EXACTLY match the schemas below, using real Indian agronomic data for the given crop/region. Output must be directly insertable via Mongoose insertMany() with no transformation needed.

=== INPUT PARAMETERS ===
{
  "cropPlanId": ${cropPlanId ? `"${cropPlanId}"` : null},
  "cropName": "Extract from user prompt",
  "variety": "Recommend Indian variety",
  "season": "Extract from prompt or assume Kharif 2026",
  "sowingDate": "${todayStr}",
  "region": "${contextSnapshot.location || "Gujarat"}",
  "today_date": "${todayStr}",
  "schedule_range": {
    "from": "${fromDateStr}",
    "to": "${toDateStr}"
  },
  "weather_context": {
    "condition": "${contextSnapshot.weatherCondition || "unknown"}",
    "rainfall_mm_last_24h": ${contextSnapshot.weatherRainMm ?? 0},
    "rainfall_mm_forecast_next_48h": 0,
    "temp_max_c": ${contextSnapshot.weatherTemp ?? "null"},
    "humidity_percent": ${contextSnapshot.weatherHumidity ?? "null"}
  }
}

=== OUTPUT — return ONLY valid JSON, no markdown fences, no commentary ===

{
  "cropPlan": {
    "cropName": "string",
    "season": "string",
    "sowingDate": "ISO 8601 datetime string",
    "expectedHarvestDate": "ISO 8601 datetime string",
    "milestones": [
      {
        "title": "string (Stage 1)",
        "plannedDate": "ISO 8601 datetime string",
        "description": "string",
        "completed": true
      },
      {
        "title": "string (Stage 2)",
        "plannedDate": "ISO 8601 datetime string",
        "description": "string",
        "completed": false
      },
      {
        "title": "string (Stage 3)",
        "plannedDate": "ISO 8601 datetime string",
        "description": "string",
        "completed": false
      },
      {
        "title": "string (Stage 4)",
        "plannedDate": "ISO 8601 datetime string",
        "description": "string",
        "completed": false
      },
      {
        "title": "string (Stage 5)",
        "date": "ISO 8601 datetime string",
        "description": "string",
        "completed": false
      }
    ],
    "estimatedCost": 5000,
    "targetYieldKg": 1000,
    "seasonProgressPct": 0,
    "status": "active",
    "irrigationCycles": [],
    "fertilizerEvents": []
  },
  "schedules": [
    {
      "title": "string - Day 1 Task A",
      "description": "string - short specific actionable task",
      "date": "ISO 8601 datetime string - morning",
      "priority": "high",
      "category": "monitoring",
      "isCritical": false,
      "status": "pending",
      "aiGenerated": true,
      "fieldNotes": ""
    },
    {
      "title": "string - Day 1 Task B",
      "description": "string",
      "date": "ISO 8601 datetime string - afternoon",
      "priority": "medium",
      "category": "irrigation",
      "isCritical": false,
      "status": "pending",
      "aiGenerated": true,
      "fieldNotes": ""
    },
    {
      "title": "string - Day 2 Task A",
      "description": "string",
      "date": "ISO 8601 datetime string",
      "priority": "high",
      "category": "fertilizer",
      "isCritical": true,
      "status": "pending",
      "aiGenerated": true,
      "fieldNotes": ""
    }
  ]
}

=== RULES ===

GENERAL:
1. You MUST output a single root JSON object containing exactly TWO keys: "cropPlan" and "schedules". DO NOT flatten the object. DO NOT omit the "schedules" array.

CROP PLAN:
1. milestones MUST contain exactly 5 to 8 realistic stage-based checkpoints. Do not output less than 5.
2. expectedHarvestDate must reflect the real maturity duration of cropName/variety for the given season/region.
3. seasonProgressPct = round(((today_date - sowingDate) / (expectedHarvestDate - sowingDate)) * 100).
4. estimatedCost (INR) and targetYieldKg must reflect realistic per-acre Indian farming economics.
5. If cropPlanId is provided, return cropPlan with only fields that should be UPDATED (milestones, seasonProgressPct, irrigationCycles, fertilizerEvents).

SCHEDULES:
6. You MUST generate multiple schedule documents per day across schedule_range.from to schedule_range.to. Aim for exactly 3–6 distinct tasks PER DAY.
7. Each task's date field must include a plausible time (e.g. early morning for irrigation) as an ISO datetime.
8. status: "done" for any date before today_date, "pending" for today_date and future dates.
9. Adjust tasks using weather_context if provided (e.g. skip irrigation if rain > 10mm).
10. category must be exactly: "monitoring" | "fertilizer" | "irrigation" | "pest_control" | "maintenance" | "labor" | "harvest" | "other".
11. Output must be valid JSON parseable by JSON.parse() — no trailing commas, no markdown.`;
    } else {
      systemPrompt = `${basePrompt}

# KrishiMitra AI — Strict Domain Rules
You are KrishiMitra AI. You are a specialized agriculture assistant embedded in the KrishiMitra platform for Indian farmers.

## WHAT YOU ARE
- An expert in: crop cultivation, crop planning, soil health, fertilizers (NPK, organic), irrigation, plant diseases, pests, weeds, weather impact, harvesting, mandi/market prices, government agriculture schemes (PM Kisan, Soil Health Card, etc.), and KrishiMitra app features.
- You have access to: (1) the farmer's own saved farm data shown above, and (2) the retrieved knowledge base context shown above.

## HARD RESTRICTIONS — NEVER VIOLATE THESE
1. **ONLY farming domain**: You MUST NOT answer questions about politics, politicians, public figures, history, coding/programming, finance, sports, entertainment, religion, or any other non-agricultural topic.
2. **Use farmer's data first**: When answering, always prioritize the farmer's own profile data shown above (farm name, crop, soil, water sources, area, location, mandi prices). Do NOT ignore it.
3. **RAG context is your knowledge**: Your answers MUST be grounded in the retrieved [KNOWLEDGE BASE] context above. Do NOT invent facts, statistics, or figures that are not present in the context or the farmer's data.
4. **If context is missing**: If the retrieved context does not contain enough information to answer, say: "I don't have enough information about this topic in my knowledge base. Please try rephrasing or contact a local agricultural expert."
5. **No general knowledge**: Do NOT answer as a general-purpose AI. You are NOT Wikipedia. Even if you know the answer from training data, if it is not in the RAG context or the farmer's data, do not fabricate it.
6. **Rejection message for off-domain**: If the user asks about anything not related to farming or the KrishiMitra app, respond ONLY with: "🌾 I am KrishiMitra AI. I can only help with farming and agriculture. Please ask me about your crops, soil, fertilizers, irrigation, pests, diseases, weather, or the KrishiMitra app."

## RESPONSE QUALITY
- Answer the actual question first, in the first sentence — don't warm up with restated context or throat-clearing.
- Be concise by default. Only go long (tables, multi-section breakdowns) when the question genuinely needs it (a full plan, a comparison, a diagnosis). A quick question deserves a quick, direct answer.
- Don't repeat the same disclaimer or the farmer's own data back to them more than once per reply.
- Prefer plain, confident, farmer-friendly language over generic AI filler ("As an AI...", "I hope this helps!", "Let me know if...").

## FORMATTING RULES
1. Use ## headings, **bold**, bullet lists, numbered steps — only when the answer is long enough to need structure. Use emojis (🌾 🌱 💧 🐛 🚜) sparingly, in section headers only.
2. ANY plan/schedule/comparison MUST be in a markdown TABLE.
3. For 3+ numeric comparisons → output:
   \`\`\`chart:bar
   Label: number
   \`\`\`
4. For time-series → output:
   \`\`\`chart:line
   Month: number
   \`\`\`
5. For budget/splits → output:
   \`\`\`chart:pie
   Category: number
   \`\`\`
6. For warnings/tips → use > blockquotes.
7. NEVER use "$". ALWAYS use "₹" or "INR".
8. Be practical. The farmer must be able to act on your advice immediately.
9. Area, soil type, water availability/sources are already in the profile above — NEVER ask for these again. Only ask for genuinely missing details (e.g. specific variety, budget).
10. CROP PLAN/SCHEDULE REQUIREMENT: When generating a crop plan or schedule, append a \`\`\`json:database-sync block at the very end:
   \`\`\`json:database-sync
   {
     "cropPlan": { "cropName": "Name", "season": "Kharif 2026", "areaAcres": 1, "sowingDate": "2026-06-15", "expectedHarvestDate": "2026-10-15" },
     "milestones": [
       { "stage": "Land Prep & Sowing", "plannedDate": "2026-06-15", "status": "done", "notes": "3 tasks" }
     ],
     "tasks": [
       { "title": "Task title", "date": "2026-06-16", "category": "planting", "priority": "high", "isCritical": true }
     ]
   }
   \`\`\`
   CRITICAL: 'category' must be one of: "planting", "irrigation", "fertilizer", "monitoring", "maintenance", "harvest". 'status' must be: "pending", "in-progress", or "done".
   \`\`\`${intentInstructions ? `\n\nCURRENT TASK INTENT:\n${intentInstructions}` : ""}`;

    }

    const ollamaMessages = [
      { role: "system", content: systemPrompt },
      ...history.map(msg => ({ role: msg.role, content: msg.content })),
      { 
        role: "user", 
        content: finalMessage
      }
    ];

    if (forceJson) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not defined" });
      }

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      
      const promptText = `SYSTEM PROMPT:\n${systemPrompt}\n\nCONVERSATION HISTORY:\n${history.map(msg => `${msg.role}: ${msg.content}`).join("\n")}\n\nUSER PROMPT:\n${finalMessage}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: promptText }] }],
          generationConfig: { responseMimeType: "application/json" }
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("[AI Controller] Gemini JSON request failed:", errText);
        return res.status(500).json({ error: "Gemini request failed" });
      }

      const data = await response.json();
      const content = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!content) {
        return res.status(500).json({ error: "No content generated by Gemini" });
      }

      const assistantDoc = await ChatMessage.create({
        owner: req.user._id,
        sessionId,
        role: "assistant",
        content: content,
      });
      
      try {
        const parsed = JSON.parse(content);
        await assistantDoc.updateOne({ $set: { syncPayload: parsed } });
        return res.json({ result: parsed });
      } catch(e) {
        console.error("[AI Controller] Gemini generated invalid JSON:", content);
        return res.status(500).json({ error: "Gemini generated invalid JSON" });
      }
    }

    console.log(`[AI Controller] Model: ${process.env.OLLAMA_MODEL || "llama3.2:1b"} @ ${process.env.OLLAMA_BASE_URL}`);

    // Set up SSE headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    
    const response = await fetch(`${process.env.OLLAMA_BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "bypass-tunnel-reminder": "true" },
      body: JSON.stringify({
        model: process.env.OLLAMA_MODEL || "llama3.2:1b",
        messages: ollamaMessages,
        stream: true, 
      }),
    });
    
    console.log(`[AI Controller DEBUG] Ollama response status: ${response.status}`);

    if (!response.ok) {
      res.write(`data: ${JSON.stringify({ error: `Ollama request failed: ${response.status}` })}\n\n`);
      res.end();
      return;
    }

    let fullReply = "";
    let buffer = "";
    
    try {
      for await (const chunk of response.body) {
        buffer += Buffer.from(chunk).toString("utf-8");
        
        let newlineIndex;
        while ((newlineIndex = buffer.indexOf("\n")) >= 0) {
          const line = buffer.slice(0, newlineIndex).trim();
          buffer = buffer.slice(newlineIndex + 1);
          
          if (!line) continue;
          
          try {
            const parsed = JSON.parse(line);
            if (parsed.message?.content) {
              fullReply += parsed.message.content;
              res.write(`data: ${JSON.stringify({ chunk: parsed.message.content })}\n\n`);
            }
          } catch (e) {
            // Ignore invalid JSON
          }
        }
      }
    } catch (e) {
      console.error("[AI Controller] Stream read error:", e);
    }
    
    // Process any remaining data in the buffer
    if (buffer.trim()) {
      try {
        const parsed = JSON.parse(buffer.trim());
        if (parsed.message?.content) {
          fullReply += parsed.message.content;
          res.write(`data: ${JSON.stringify({ chunk: parsed.message.content })}\n\n`);
        }
      } catch (e) {
        // Ignore invalid JSON in remainder
      }
    }
    
    // Save the assistant response after streaming completes. If the response
    // contains a database-sync payload, keep it with the chat message and let
    // the chat-page save button decide when to create crop plans/tasks.
    if (fullReply) {
      console.log(`[AI Pipeline] Final Answer: \n${fullReply}\n====================================`);
      const assistantDoc = await ChatMessage.create({
        owner: req.user._id,
        sessionId,
        role: "assistant",
        content: fullReply,
      });

      const syncPayload = extractSyncPayload(fullReply);
      if (syncPayload) {
        await assistantDoc.updateOne({ $set: { syncPayload } });
      }
    }

    res.write(`data: [DONE]\n\n`);
    res.end();
  } catch (err) {
    if (!res.headersSent) {
      next(err);
    } else {
      res.end();
    }
  }
};

// GET /api/chat/:sessionId
exports.getHistory = async (req, res, next) => {
  try {
    const messages = await ChatMessage.find({
      owner: req.user._id,
      sessionId: req.params.sessionId,
    }).sort({ createdAt: 1 }).lean();

    const normalized = messages.map((m) => ({
      ...m,
      id: String(m._id),
      text: m.content,
      role: m.role,
      createdAt: m.createdAt,
    }));

    res.json(normalized);
  } catch (err) {
    next(err);
  }
};

// GET /api/chat/sessions
exports.getAllSessions = async (req, res, next) => {
  try {
    const sessions = await ChatMessage.aggregate([
      { $match: { owner: req.user._id } },
      { $sort: { createdAt: 1 } }, // Get earliest message first for title
      { $group: {
          _id: "$sessionId",
          firstMessage: { $first: "$content" },
          updatedAt: { $last: "$createdAt" }
      }},
      { $sort: { updatedAt: -1 } }
    ]);
    
    // Map to simple structure, generating a title from the first message
    const formatted = sessions.map(s => {
      let title = "New Chat";
      if (s.firstMessage) {
        title = s.firstMessage.split('\n')[0].substring(0, 40);
        if (title.length >= 40) title += "...";
      }
      return {
        id: s._id,
        title,
        updatedAt: s.updatedAt
      };
    });

    res.json(formatted);
  } catch (err) {
    next(err);
  }
};

// POST /api/chat/sync-plan
// body: { syncData, farmId }
exports.syncPlan = async (req, res, next) => {
  try {
    const { syncData, farmId, replace = true } = req.body;
    if (!syncData || !farmId) {
      return res.status(400).json({ message: "syncData and farmId are required" });
    }

    const farm = await Farm.findOne({ _id: farmId, owner: req.user._id });
    if (!farm) return res.status(404).json({ message: "Farm not found" });

    const { getSyncKind } = require('../services/chatSyncService');
    const kind = getSyncKind(syncData);

    // Debug: log what we received
    console.log(`[syncPlan] kind=${kind} keys=${Object.keys(syncData || {}).join(',')} farmId=${farmId}`);
    if (!kind) {
      console.error("[syncPlan] syncData structure:", JSON.stringify(syncData).slice(0, 500));
    }

    const activeCropPlan = await CropPlan.findOne({ farm: farmId, status: "active" }).sort({ createdAt: -1 });
    const cropPlanId = req.body.cropPlanId || (activeCropPlan ? activeCropPlan._id.toString() : null);

    if (kind === "cropPlan" || kind === "schedule" || kind === "unified") {
      const result = await saveAiSyncPayload({ syncPayload: syncData, userId: req.user._id, farm, cropPlanId, replace });
      return res.status(201).json({
        message: result?.type === "schedule" ? "Schedule successfully synchronized" : "Plan successfully synchronized",
        cropPlan: result?.cropPlan,
        tasksGenerated: result?.taskCount || 0,
        warnings: result?.warnings || [],
        ...result
      });
    } else {
      return res.status(400).json({ message: "No cropPlan or tasks found in syncData" });
    }
  } catch (err) {
    console.error("[syncPlan] Unhandled error:", err.message, err.stack);
    next(err);
  }
};
