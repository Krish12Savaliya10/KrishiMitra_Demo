/**
 * cropTaskTemplates.js
 *
 * Comprehensive, agronomically-accurate stage-wise task templates for all crops.
 * Each stage entry defines:
 *   - interval: emit a task every N days within the stage
 *   - tasks[]: cycling task definitions (title, description, category, priority, estimatedMinutes, icon)
 *
 * Stage metadata (description, objectives, observations) is embedded per-stage.
 * The scheduleEngine uses getStageTemplate() to look up crop+stage templates.
 */

// ─── Category icons ──────────────────────────────────────────────────────────
const ICONS = {
  irrigation: "💧",
  fertilizer: "🌱",
  monitoring: "📷",
  harvest: "🌾",
  maintenance: "🔧",
  planting: "🌿",
  "weed-control": "🌿",
  "pest-monitoring": "🐛",
  "disease-monitoring": "📷",
  "soil-check": "🪱",
  "weather-check": "☀️",
  "yield-recording": "📋",
  storage: "🏗️",
};

// ─── Stage metadata (descriptions, objectives, observations, precautions) ────
const STAGE_META = {
  // Universal stages
  "Land Preparation": {
    description: "Thorough field preparation to create an ideal seedbed. Deep ploughing breaks hardpan, incorporates organic matter, and exposes soil pathogens to sunlight.",
    objectives: ["Create fine, weed-free seedbed", "Incorporate basal fertilizers", "Improve soil drainage", "Destroy previous crop residue"],
    observations: ["Soil moisture at 30 cm depth", "Presence of weeds / perennial roots", "Soil texture and crumb structure", "Pest activity (white grubs, termites)"],
    precautions: ["Do not plough when soil is too wet (causes compaction)", "Burn or compost diseased crop residue", "Apply gypsum if soil pH > 8.0"],
    bestPractices: "Plough 2–3 times at right angles. Last ploughing should be fine-tillage to create crumb structure.",
    commonMistakes: "Ploughing too deep in sandy soils causes inversion of infertile subsoil to surface.",
  },
  "Germination": {
    description: "Seed absorbs water and first true leaves emerge. Stand establishment determines final yield potential — a gap of >15% requires gap-filling.",
    objectives: ["Achieve uniform germination (>85%)", "Prevent soil crusting", "Identify poor germination zones early"],
    observations: ["Germination count per 5m row", "Soil crust formation", "Damping-off symptoms", "Bird or rodent damage"],
    precautions: ["Avoid irrigation so heavy that crust forms", "Do not apply herbicides until seedlings are established", "Scout for cutworms at night"],
    bestPractices: "Conduct germination count on day 7 and 10. Fill gaps with spare seedlings within 14 days.",
    commonMistakes: "Sowing too deep delays emergence; too shallow causes desiccation.",
  },
  "Seedling Growth": {
    description: "Young plants focus on root expansion and early leaf area development. Competition from weeds at this stage is highly damaging.",
    objectives: ["Establish strong root system", "Suppress early weed competition", "Ensure adequate plant stand"],
    observations: ["Plant height and leaf count", "Weed density and species", "Nutrient deficiency symptoms (yellowing)", "Early pest attack"],
    precautions: ["Apply pre-emergence herbicide before weeds establish", "Avoid mechanical damage during inter-culture", "Thin to correct spacing"],
    bestPractices: "First weeding within 15–21 days is more impactful than any later operation.",
    commonMistakes: "Delaying thinning causes interplant competition and reduces final stand quality.",
  },
  "Vegetative Growth": {
    description: "Period of maximum biomass accumulation. Canopy closes, leaf area index peaks, and the plant builds reserves for reproductive stages.",
    objectives: ["Maximum green canopy coverage", "Strong root system", "Healthy tillering / branching", "Weed-free conditions"],
    observations: ["Plant height vs. benchmark", "Leaf colour (N, Fe, Mg status)", "Pest and disease scouting", "Weed pressure near bunds"],
    precautions: ["Do not over-apply nitrogen (causes lodging)", "Scout for sucking pests under leaves weekly", "Maintain irrigation schedule"],
    bestPractices: "Apply top-dress nitrogen split — half at early vegetative, half at mid-vegetative for efficient uptake.",
    commonMistakes: "Single heavy N application causes flush growth susceptible to fungal diseases.",
  },
  "Flowering": {
    description: "Reproductive stage — pollen viability and pollination success directly control yield. Water stress at this stage causes flower drop and poor pod/grain set.",
    objectives: ["Maximum flower retention", "Good pollinator activity", "Consistent soil moisture", "Prevent pest damage to flowers"],
    observations: ["Flower drop percentage", "Thrips / aphid population on flowers", "Boron deficiency (malformed flowers)", "Disease lesions on petals"],
    precautions: ["Avoid spraying pesticides during peak flowering hours (6–10 AM)", "Do not irrigate over-head — causes pollen wash", "Apply boron if deficiency signs appear"],
    bestPractices: "Inspect 10 plants per 0.5-acre block. If >30% flower drop, check for water stress or boron deficiency first.",
    commonMistakes: "Applying broad-spectrum insecticides during flowering kills pollinators and reduces yield.",
  },
  "Harvest": {
    description: "Crop reaches physiological maturity. Timely harvest prevents field losses from shattering, bird damage, and weather-related quality deterioration.",
    objectives: ["Zero field loss", "Harvest at correct maturity index", "Safe storage moisture", "Accurate yield recording"],
    observations: ["Grain/seed moisture content", "Maturity indicators (husk colour, neck fall, pod colour)", "Weather forecast for 7 days", "Pest/rodent pressure in field"],
    precautions: ["Harvest in early morning to minimize shattering losses", "Do not burn stubble — chop and incorporate", "Dry produce to safe storage moisture before bagging"],
    bestPractices: "Stagger harvest across sections of large fields. Thresh, grade, and bag on the same day.",
    commonMistakes: "Harvesting too early reduces grain weight; too late causes shattering and weather damage.",
  },
};

// ─── Universal fallback templates ─────────────────────────────────────────────
const UNIVERSAL = {
  "Land Preparation": {
    interval: 2,
    tasks: [
      { title: "Deep ploughing", description: "Run MB/disc plough 20–25 cm deep to break hardpan and expose soil to sun.", category: "maintenance", priority: "high", estimatedMinutes: 120, icon: "🔧" },
      { title: "FYM / compost application", description: "Broadcast 5–10 t/acre well-decomposed farmyard manure and incorporate.", category: "fertilizer", priority: "high", estimatedMinutes: 90, icon: "🌱" },
      { title: "Secondary tillage & levelling", description: "Cross-harrow 2 times to break clods. Level with float for uniform water distribution.", category: "maintenance", priority: "medium", estimatedMinutes: 90, icon: "🔧" },
      { title: "Bed / furrow formation", description: "Mark out rows, beds, or ridges using ridger/plough as per crop spacing.", category: "maintenance", priority: "medium", estimatedMinutes: 60, icon: "🔧" },
      { title: "Pre-sowing irrigation (paleva)", description: "Apply light irrigation 5–7 days before sowing to bring soil to field capacity.", category: "irrigation", priority: "medium", estimatedMinutes: 45, icon: "💧" },
      { title: "Soil sample collection", description: "Collect 500 g composite soil sample from 0–15 cm depth; send to lab for pH and NPK analysis.", category: "monitoring", priority: "low", estimatedMinutes: 30, icon: "🪱" },
    ],
  },
  "Germination": {
    interval: 2,
    tasks: [
      { title: "Germination count", description: "Walk rows and count germinated plants per 5 m row; target >85% germination. Flag gaps.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "📷" },
      { title: "Gap filling", description: "Replant missing hills / rows with pre-soaked seeds or spare seedlings.", category: "planting", priority: "high", estimatedMinutes: 60, icon: "🌿" },
      { title: "Light irrigation if needed", description: "Apply light sprinkler or channel irrigation if topsoil crust has formed.", category: "irrigation", priority: "medium", estimatedMinutes: 30, icon: "💧" },
      { title: "Early weed removal", description: "Hand-pull any early-emerging weeds before they compete with seedlings.", category: "maintenance", priority: "low", estimatedMinutes: 45, icon: "🌿" },
    ],
  },
  "Vegetative Growth": {
    interval: 4,
    tasks: [
      { title: "Irrigation check", description: "Check root-zone soil moisture at 10 cm depth. Irrigate if dry.", category: "irrigation", priority: "medium", estimatedMinutes: 40, icon: "💧" },
      { title: "Pest & disease scouting", description: "Walk rows — check leaf undersides for eggs, larvae, and early disease lesions on 10 randomly selected plants.", category: "monitoring", priority: "high", estimatedMinutes: 45, icon: "🐛" },
      { title: "Weed control", description: "Hand-weed or inter-culture; focus on bunds and irrigation channels where weeds re-establish fastest.", category: "maintenance", priority: "medium", estimatedMinutes: 90, icon: "🌿" },
      { title: "Nitrogen top-dress", description: "Apply split nitrogen dose (urea) at correct crop stage. Incorporate into moist soil.", category: "fertilizer", priority: "high", estimatedMinutes: 60, icon: "🌱" },
      { title: "Growth observation", description: "Measure plant height and leaf count at 5 sentinel plants. Compare to crop growth benchmark.", category: "monitoring", priority: "low", estimatedMinutes: 25, icon: "📷" },
      { title: "Soil moisture check", description: "Press finger 5 cm into soil near root zone. Note whether dry, moist, or waterlogged.", category: "monitoring", priority: "low", estimatedMinutes: 15, icon: "🪱" },
    ],
  },
  "Flowering": {
    interval: 3,
    tasks: [
      { title: "Flower count & drop assessment", description: "Count open flowers and dropped flowers on 10 plants. >30% drop indicates stress.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "📷" },
      { title: "Irrigation maintenance", description: "Maintain consistent soil moisture — water stress during flowering causes severe yield loss.", category: "irrigation", priority: "high", estimatedMinutes: 40, icon: "💧" },
      { title: "Pest monitoring on flowers", description: "Check for thrips, aphids, and bud borers on terminal shoots and flower buds.", category: "monitoring", priority: "high", estimatedMinutes: 35, icon: "🐛" },
      { title: "Micronutrient foliar spray", description: "Apply boron 0.1% + zinc 0.5% foliar spray to support flower retention and pod set.", category: "fertilizer", priority: "medium", estimatedMinutes: 45, icon: "🌱" },
      { title: "Disease check at canopy", description: "Inspect flowers and youngest leaves for powdery mildew, blight, or rust lesions.", category: "monitoring", priority: "medium", estimatedMinutes: 30, icon: "📷" },
    ],
  },
  "Harvest": {
    interval: 1,
    tasks: [
      { title: "Maturity assessment", description: "Verify crop maturity indicators: grain colour, grain moisture, neck fall, pod rattle.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "📷" },
      { title: "Harvesting operation", description: "Harvest using manual/mechanical method in early morning to minimize shattering losses.", category: "harvest", priority: "high", estimatedMinutes: 240, icon: "🌾" },
      { title: "Threshing / curing", description: "Thresh, cure, or grade produce. Ensure moisture is within safe storage limits (<12–14%).", category: "harvest", priority: "high", estimatedMinutes: 180, icon: "🌾" },
      { title: "Drying produce", description: "Spread on clean tarpaulin under sun for 2–3 days. Turn twice daily.", category: "harvest", priority: "high", estimatedMinutes: 60, icon: "☀️" },
      { title: "Sorting & grading", description: "Remove broken, shrivelled, or diseased grains. Grade by size if selling to premium market.", category: "harvest", priority: "medium", estimatedMinutes: 120, icon: "🌾" },
      { title: "Yield recording", description: "Weigh and record final yield per plot. Compare with expected yield and calculate profit/loss.", category: "harvest", priority: "medium", estimatedMinutes: 30, icon: "📋" },
      { title: "Storage", description: "Store in clean, dry, rodent-proof bags or bins. Apply storage pesticide if needed.", category: "harvest", priority: "high", estimatedMinutes: 60, icon: "🏗️" },
      { title: "Field trash disposal", description: "Chop stubble and incorporate; do not burn. Remove diseased material from field.", category: "maintenance", priority: "low", estimatedMinutes: 90, icon: "🔧" },
    ],
  },
};

// ─── BANANA ──────────────────────────────────────────────────────────────────
const BANANA = {
  "Pit Preparation": {
    interval: 2,
    tasks: [
      { title: "Pit digging (60×60×60 cm)", description: "Dig pits at 1.8×1.5 m spacing. Expose walls to sun for 7 days to destroy soil pathogens.", category: "maintenance", priority: "high", estimatedMinutes: 180, icon: "🔧" },
      { title: "Pit filling with compost", description: "Fill pit: topsoil + 10 kg FYM + 250 g SSP + 50 g Carbofuran. Refill 2 weeks before planting.", category: "fertilizer", priority: "high", estimatedMinutes: 60, icon: "🌱" },
      { title: "Drainage channel layout", description: "Mark main + cross drainage channels. Banana roots rot in standing water — drainage is critical.", category: "maintenance", priority: "high", estimatedMinutes: 60, icon: "🔧" },
      { title: "Windbreak inspection", description: "Check windbreaks on windward side. Install casuarina/teak row if absent — wind topples banana at bunch stage.", category: "monitoring", priority: "medium", estimatedMinutes: 30, icon: "☀️" },
    ],
  },
  "Planting": {
    interval: 1,
    tasks: [
      { title: "Tissue culture plant placement", description: "Plant TC banana in pit centre; corm 5–8 cm below surface. Check for healthy root ball.", category: "planting", priority: "high", estimatedMinutes: 120, icon: "🌿" },
      { title: "First planting irrigation", description: "Apply 8–10 L water per plant immediately after planting. Do not waterlog.", category: "irrigation", priority: "high", estimatedMinutes: 60, icon: "💧" },
      { title: "Mulching with dry leaves", description: "Cover 5–10 cm dry leaf mulch around plant. Keep 15 cm clear of pseudostem.", category: "maintenance", priority: "high", estimatedMinutes: 60, icon: "🌿" },
      { title: "First nitrogen dose (DAP)", description: "Apply 100 g DAP per plant as ring dose 30 cm from pseudostem. Cover lightly with soil.", category: "fertilizer", priority: "high", estimatedMinutes: 45, icon: "🌱" },
    ],
  },
  "Crop Establishment": {
    interval: 3,
    tasks: [
      { title: "Gap filling & replacement", description: "Replace dead or poorly-establishing plants with TC plants within 14 days of planting.", category: "planting", priority: "high", estimatedMinutes: 90, icon: "🌿" },
      { title: "Mulch refresh", description: "Top up mulch layer (5 cm dry material). Keep clear of pseudostem to avoid crown rot.", category: "maintenance", priority: "medium", estimatedMinutes: 45, icon: "🌿" },
      { title: "Drip irrigation check", description: "Verify emitters delivering 8–10 L/plant/day. Flush lines and check pressure.", category: "irrigation", priority: "high", estimatedMinutes: 30, icon: "💧" },
      { title: "Sigatoka leaf spot scout", description: "Inspect youngest 3 leaves for yellow spots. Apply Mancozeb 0.2% if >3 spots per leaf.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "📷" },
      { title: "Weed control near plants", description: "Hand-weed 1 m radius around plant base. Weeds compete heavily in the first 60 days.", category: "maintenance", priority: "medium", estimatedMinutes: 60, icon: "🌿" },
    ],
  },
  "Early Vegetative Growth": {
    interval: 5,
    tasks: [
      { title: "Desuckering", description: "Remove all suckers except ONE selected sword sucker (ratoon). Cut below soil level to prevent regrowth.", category: "maintenance", priority: "high", estimatedMinutes: 90, icon: "🔧" },
      { title: "Second fertilizer dose", description: "Apply 200 g urea + 100 g MOP per plant as ring dose. Irrigate lightly after application.", category: "fertilizer", priority: "high", estimatedMinutes: 60, icon: "🌱" },
      { title: "Leaf count & growth check", description: "Count functional green leaves. Record pseudostem girth at 1 m height for growth benchmarking.", category: "monitoring", priority: "medium", estimatedMinutes: 30, icon: "📷" },
      { title: "Sigatoka disease spray", description: "Apply Propiconazole 0.1% or Mancozeb 0.2% spray on leaves at 21-day intervals during vegetative growth.", category: "monitoring", priority: "high", estimatedMinutes: 60, icon: "📷" },
      { title: "Irrigation frequency check", description: "Drip: 10 L/plant/day. Check tensiometer reading — maintain field capacity in root zone.", category: "irrigation", priority: "medium", estimatedMinutes: 20, icon: "💧" },
    ],
  },
  "Active Vegetative Growth": {
    interval: 6,
    tasks: [
      { title: "Monthly desuckering", description: "Remove all off-type suckers; keep only one follower sucker per plant for ratoon crop.", category: "maintenance", priority: "high", estimatedMinutes: 90, icon: "🔧" },
      { title: "Propping installation", description: "Install bamboo/wooden props tied to pseudostem — plants at 3+ m height topple in rain and wind.", category: "maintenance", priority: "high", estimatedMinutes: 60, icon: "🔧" },
      { title: "Third fertilizer dose", description: "Apply 250 g urea + 150 g MOP + 150 g SSP per plant. Apply in 2 rings around plant base.", category: "fertilizer", priority: "high", estimatedMinutes: 60, icon: "🌱" },
      { title: "Panama wilt (Fusarium) scout", description: "Check internal cross-section of pseudostem — dark reddish discolouration = Panama wilt. Remove & burn affected plants.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "📷" },
      { title: "Irrigation audit", description: "Banana requires 12–15 L/plant/day at this stage. Check emitter output with measuring bucket.", category: "irrigation", priority: "medium", estimatedMinutes: 30, icon: "💧" },
      { title: "Leaf pruning (dry leaves)", description: "Remove dry, damaged, or Sigatoka-infected leaves from pseudostem base. Improves air circulation.", category: "maintenance", priority: "medium", estimatedMinutes: 45, icon: "🌿" },
    ],
  },
  "Shooting / Flowering": {
    interval: 3,
    tasks: [
      { title: "Shoot emergence monitoring", description: "Observe daily for inflorescence emergence from pseudostem top. Record shooting date per plant row.", category: "monitoring", priority: "high", estimatedMinutes: 20, icon: "📷" },
      { title: "Male bud removal", description: "Cut male bud (bell) 7–10 days after last hand sets. Reduces diversion of photosynthate from bunch.", category: "maintenance", priority: "high", estimatedMinutes: 45, icon: "🔧" },
      { title: "Bunch sleeving", description: "Cover bunch with perforated polythene sleeve to protect fingers from insects and improve colour.", category: "maintenance", priority: "high", estimatedMinutes: 60, icon: "🔧" },
      { title: "Potassium top-dress", description: "Apply 300 g MOP per plant — potassium is critical for starch accumulation in fingers.", category: "fertilizer", priority: "high", estimatedMinutes: 45, icon: "🌱" },
      { title: "Bunch stem propping", description: "Tie lateral bamboo prop to bunch stem to prevent stalk snapping under bunch weight.", category: "maintenance", priority: "high", estimatedMinutes: 30, icon: "🔧" },
    ],
  },
  "Bunch Development": {
    interval: 4,
    tasks: [
      { title: "Finger fill assessment", description: "Measure finger diameter. Harvest when angularity disappears and fingers are 75% plump (3/4 fill).", category: "monitoring", priority: "high", estimatedMinutes: 20, icon: "📷" },
      { title: "Leaf pruning", description: "Remove dry/damaged/Sigatoka-infected leaves. Improves light penetration to bunch for uniform fill.", category: "maintenance", priority: "medium", estimatedMinutes: 45, icon: "🌿" },
      { title: "Final K dose for starch fill", description: "Apply last K dose (200 g MOP/plant). Stop nitrogen now — excess N delays maturation.", category: "fertilizer", priority: "high", estimatedMinutes: 45, icon: "🌱" },
      { title: "Irrigation maintenance", description: "Maintain consistent moisture — stress at bunch stage causes finger splitting and poor fill.", category: "irrigation", priority: "high", estimatedMinutes: 20, icon: "💧" },
      { title: "Pest & disease check on bunch", description: "Inspect sleeved bunch for thrips, mites, or fruit speckle disease. Replace damaged sleeves.", category: "monitoring", priority: "medium", estimatedMinutes: 25, icon: "🐛" },
    ],
  },
};

// ─── RICE ─────────────────────────────────────────────────────────────────────
const RICE = {
  "Nursery": {
    interval: 3,
    tasks: [
      { title: "Nursery bed preparation", description: "Puddle 1/10th field area. Make 1.5 m wide raised beds. Apply FYM and level.", category: "maintenance", priority: "high", estimatedMinutes: 120, icon: "🔧" },
      { title: "Seed treatment", description: "Soak seeds 24 hrs; treat with Carbendazim 2 g/kg. Incubate 24 hrs before sowing.", category: "planting", priority: "high", estimatedMinutes: 30, icon: "🌿" },
      { title: "Nursery irrigation", description: "Maintain 2–3 cm water in nursery. Drain for 1 day every 3 days to prevent algae growth.", category: "irrigation", priority: "medium", estimatedMinutes: 20, icon: "💧" },
      { title: "Blast disease monitoring", description: "Inspect seedlings for grey lesions (leaf blast). Apply Tricyclazole 0.06% if >2% incidence.", category: "monitoring", priority: "high", estimatedMinutes: 20, icon: "📷" },
    ],
  },
  "Crop Establishment": {
    interval: 2,
    tasks: [
      { title: "Maintain 2–5 cm water level", description: "Fill transplanted field to 2–5 cm standing water. Critical for establishment — do not let dry.", category: "irrigation", priority: "high", estimatedMinutes: 30, icon: "💧" },
      { title: "Gap filling", description: "Replace missing hills with spare seedlings within 7 days of transplanting.", category: "planting", priority: "high", estimatedMinutes: 60, icon: "🌿" },
      { title: "Pre-emergence weed management", description: "Apply Butachlor 50 EC at 1.5 L/ac if barnyard grass is a known problem. Apply in standing water.", category: "maintenance", priority: "medium", estimatedMinutes: 30, icon: "🌿" },
      { title: "Fertilizer — basal dose", description: "Apply half of N and full P and K dose as basal fertilizer in standing water.", category: "fertilizer", priority: "high", estimatedMinutes: 45, icon: "🌱" },
    ],
  },
  "Tillering": {
    interval: 4,
    tasks: [
      { title: "Tiller count per hill", description: "Count tillers per hill at 5 sentinel hills. Target: 20–25 productive tillers/hill.", category: "monitoring", priority: "medium", estimatedMinutes: 20, icon: "📷" },
      { title: "Urea top-dress (first)", description: "Apply 30 kg/ac urea when 50% plants show 2–3 tillers. Broadcast on standing water.", category: "fertilizer", priority: "high", estimatedMinutes: 45, icon: "🌱" },
      { title: "Manual weeding", description: "Hand-weed or apply post-emergence herbicide Bispyribac-Na 10 SC at 40 mL/ac in standing water.", category: "maintenance", priority: "medium", estimatedMinutes: 90, icon: "🌿" },
      { title: "Mid-season drainage", description: "Drain field for 5–7 days at max tiller stage to arrest unproductive tillers.", category: "irrigation", priority: "medium", estimatedMinutes: 30, icon: "💧" },
      { title: "Sheath blight scouting", description: "Check lower leaf sheaths for tan-coloured water-soaked lesions (sheath blight). Apply Hexaconazole if >5% incidence.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "📷" },
    ],
  },
  "Panicle Initiation": {
    interval: 3,
    tasks: [
      { title: "Neck blast monitoring", description: "Inspect flag leaf and neck for blast lesions. Apply Tricyclazole at PI if risk is high.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "📷" },
      { title: "Urea top-dress (panicle fertilizer)", description: "Apply 15 kg/ac urea at PI for spikelet number. Apply on soil — avoid foliar burn.", category: "fertilizer", priority: "high", estimatedMinutes: 45, icon: "🌱" },
      { title: "Restore field irrigation", description: "Refill field to 5 cm water after mid-season drainage. Maintain until grain filling.", category: "irrigation", priority: "high", estimatedMinutes: 30, icon: "💧" },
      { title: "Leaf folder & stem borer check", description: "Count leaf folder tubes and dead hearts. Apply Chlorpyrifos if >10% infestation.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "🐛" },
    ],
  },
  "Heading / Flowering": {
    interval: 3,
    tasks: [
      { title: "Blast at neck — final check", description: "Inspect neck node for constriction and browning. Apply second Tricyclazole dose if needed.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "📷" },
      { title: "Maintain irrigation during heading", description: "Do not let water dry during heading/flowering — even 1 day of drought reduces grain set.", category: "irrigation", priority: "high", estimatedMinutes: 20, icon: "💧" },
      { title: "Brown plant hopper monitoring", description: "Push plants at base and count BPH. If >10 per plant, apply Imidacloprid 0.5 mL/L.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "🐛" },
    ],
  },
  "Grain Filling": {
    interval: 4,
    tasks: [
      { title: "Drain field (10 days pre-harvest)", description: "Begin draining field 10–12 days before harvest. This firms soil and speeds ripening.", category: "irrigation", priority: "high", estimatedMinutes: 20, icon: "💧" },
      { title: "Bird & rodent protection", description: "Install bird scarers, nets, or use patrol during golden stage — bird damage can be severe.", category: "maintenance", priority: "medium", estimatedMinutes: 60, icon: "🔧" },
      { title: "Grain fill assessment", description: "Bend panicle and press 10 grains — note milky, doughy, or hard stage. Harvest when 80% grains are hard.", category: "monitoring", priority: "medium", estimatedMinutes: 20, icon: "📷" },
    ],
  },
};

// ─── WHEAT ───────────────────────────────────────────────────────────────────
const WHEAT = {
  "Tillering": {
    interval: 4,
    tasks: [
      { title: "Tiller count assessment", description: "Count tillers per plant at 5 sentinel plants. Target: 4–6 productive tillers per plant.", category: "monitoring", priority: "medium", estimatedMinutes: 20, icon: "📷" },
      { title: "Weed control (narrow-leaf weeds)", description: "Apply Isoproturon 75 WP 1 kg/ac for Phalaris grass. Apply between 21–35 days.", category: "maintenance", priority: "high", estimatedMinutes: 45, icon: "🌿" },
      { title: "First irrigation (CRI)", description: "Crown Root Initiation irrigation — most critical irrigation in wheat. Apply 20–25 days after sowing.", category: "irrigation", priority: "high", estimatedMinutes: 60, icon: "💧" },
      { title: "First N top-dress", description: "Apply 25 kg/ac urea at first irrigation. Broadcast before irrigation for best uptake.", category: "fertilizer", priority: "high", estimatedMinutes: 45, icon: "🌱" },
    ],
  },
  "Jointing": {
    interval: 4,
    tasks: [
      { title: "Second irrigation", description: "Apply second irrigation at jointing (50–55 days). Critical for stem elongation and node formation.", category: "irrigation", priority: "high", estimatedMinutes: 60, icon: "💧" },
      { title: "Yellow rust monitoring", description: "Check flag leaf and upper leaves for yellow stripe rust — stripe pattern of yellow pustules. Apply Propiconazole if found.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "📷" },
      { title: "Lodging assessment", description: "Check plant height vs. variety benchmark. Excess vegetative growth indicates lodging risk.", category: "monitoring", priority: "medium", estimatedMinutes: 20, icon: "📷" },
    ],
  },
  "Heading / Ear Emergence": {
    interval: 3,
    tasks: [
      { title: "Third irrigation at heading", description: "Apply third irrigation when flag leaf is fully expanded. Water stress at ear emergence reduces grain number.", category: "irrigation", priority: "high", estimatedMinutes: 60, icon: "💧" },
      { title: "Second N top-dress", description: "Apply 15 kg/ac urea at heading stage for grain number per ear.", category: "fertilizer", priority: "high", estimatedMinutes: 45, icon: "🌱" },
      { title: "Aphid scouting", description: "Check for aphid colonies on ears. Apply Dimethoate 30 EC if >3 aphids per ear.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "🐛" },
    ],
  },
  "Grain Filling": {
    interval: 4,
    tasks: [
      { title: "Fourth irrigation at grain fill", description: "Apply irrigation at milky stage. Heat stress + drought at grain fill severely reduces weight.", category: "irrigation", priority: "high", estimatedMinutes: 60, icon: "💧" },
      { title: "Brown rust monitoring", description: "Check for circular brown pustules on leaves — brown rust can cut yield 20–30% if unchecked.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "📷" },
      { title: "Grain hardness check", description: "Pinch a grain — soft (milky), medium (doughy), hard (ripe). Harvest when 90% are hard.", category: "monitoring", priority: "medium", estimatedMinutes: 20, icon: "📷" },
    ],
  },
};

// ─── COTTON ──────────────────────────────────────────────────────────────────
const COTTON = {
  "Squaring": {
    interval: 4,
    tasks: [
      { title: "Square (bud) count", description: "Count squares per plant. 8–10 squares per plant is good. Record to forecast boll numbers.", category: "monitoring", priority: "medium", estimatedMinutes: 25, icon: "📷" },
      { title: "Bollworm egg mass monitoring", description: "Count Helicoverpa egg masses on terminal leaves. Spray Bt 1 mL/L if >3 egg masses per plant.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "🐛" },
      { title: "P+K fertilizer dose", description: "Apply DAP 25 kg/ac + MOP 20 kg/ac to support boll formation and root growth.", category: "fertilizer", priority: "high", estimatedMinutes: 45, icon: "🌱" },
      { title: "Whitefly scouting", description: "Count whiteflies per leaf on 10 plants. >10 per leaf = apply Imidacloprid 0.5 mL/L.", category: "monitoring", priority: "high", estimatedMinutes: 25, icon: "🐛" },
    ],
  },
  "Boll Development": {
    interval: 5,
    tasks: [
      { title: "Boll count and weight check", description: "Count bolls per plant. Estimate individual boll weight (target: 4–6 g per boll).", category: "monitoring", priority: "medium", estimatedMinutes: 25, icon: "📷" },
      { title: "Potassium foliar spray", description: "Apply K2SO4 1% spray — potassium drives fibre length and boll filling.", category: "fertilizer", priority: "high", estimatedMinutes: 45, icon: "🌱" },
      { title: "Pink bollworm dissection", description: "Collect 10 bolls randomly; dissect and check for pink bollworm larvae inside seeds.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "🐛" },
      { title: "Critical irrigation", description: "Irrigate every 10–12 days during boll development. Water stress reduces fibre quality.", category: "irrigation", priority: "high", estimatedMinutes: 60, icon: "💧" },
    ],
  },
  "Boll Opening": {
    interval: 4,
    tasks: [
      { title: "Boll opening % assessment", description: "Walk 50 m transect and count open vs. closed bolls. Harvest when 60% bolls are open.", category: "monitoring", priority: "high", estimatedMinutes: 20, icon: "📷" },
      { title: "First cotton picking", description: "Pick fully open bolls in early morning. Avoid picking wet or immature bolls.", category: "harvest", priority: "high", estimatedMinutes: 240, icon: "🌾" },
      { title: "Contamination prevention check", description: "Remove coloured contamination (polythene, jute fibres) from picked cotton before bagging.", category: "harvest", priority: "medium", estimatedMinutes: 30, icon: "🌾" },
    ],
  },
};

// ─── SUGARCANE ───────────────────────────────────────────────────────────────
const SUGARCANE = {
  "Sett Planting": {
    interval: 2,
    tasks: [
      { title: "Sett preparation & treatment", description: "Cut 3-bud setts from healthy stalks. Treat with Carbendazim + Chlorpyrifos solution for 5 min.", category: "planting", priority: "high", estimatedMinutes: 120, icon: "🌿" },
      { title: "Planting in furrows", description: "Place setts end-to-end or at 45° in furrows at 90 cm apart. Cover with 5 cm soil.", category: "planting", priority: "high", estimatedMinutes: 180, icon: "🌿" },
      { title: "First irrigation post-planting", description: "Irrigate immediately. Maintain soil moisture for 15 days for uniform germination.", category: "irrigation", priority: "high", estimatedMinutes: 60, icon: "💧" },
    ],
  },
  "Tillering": {
    interval: 6,
    tasks: [
      { title: "De-trashing (dry leaf removal)", description: "Remove dry lower leaves from stalks to improve air circulation and reduce early shoot borer.", category: "maintenance", priority: "medium", estimatedMinutes: 120, icon: "🔧" },
      { title: "Inter-culture & earthing-up", description: "Rotavate between rows and earth-up to support tillers and suppress weeds.", category: "maintenance", priority: "high", estimatedMinutes: 120, icon: "🔧" },
      { title: "Nitrogen split top-dress", description: "Apply 50 kg/ac urea split-dressed during tillering. Improves tiller count and stalk weight.", category: "fertilizer", priority: "high", estimatedMinutes: 60, icon: "🌱" },
      { title: "Early shoot borer inspection", description: "Check for dead hearts (borer-damaged primary shoots). Pull dead heart gently and destroy.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "🐛" },
    ],
  },
  "Grand Growth": {
    interval: 8,
    tasks: [
      { title: "Irrigation schedule check", description: "Apply 50–60 mm water every 7 days during rapid elongation. Moisture deficit reduces internode length.", category: "irrigation", priority: "high", estimatedMinutes: 60, icon: "💧" },
      { title: "Trash mulching", description: "Spread 5–8 t/ac dry trash between rows to conserve moisture and suppress weeds.", category: "maintenance", priority: "medium", estimatedMinutes: 90, icon: "🌿" },
      { title: "Red rot & wilt scouting", description: "Check cross-section of stalk for red discolouration (red rot). Isolate and destroy affected clumps.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "📷" },
      { title: "Propping against lodging", description: "Tie adjacent rows of tall cane together using polythene rope to prevent wind lodging.", category: "maintenance", priority: "medium", estimatedMinutes: 90, icon: "🔧" },
    ],
  },
  "Maturation / Ripening": {
    interval: 7,
    tasks: [
      { title: "Brix reading", description: "Measure juice Brix in field using refractometer. Target >18 Brix before harvest.", category: "monitoring", priority: "high", estimatedMinutes: 20, icon: "📷" },
      { title: "Irrigation cutoff", description: "Stop irrigation 30–40 days before harvest to concentrate sucrose and improve juice quality.", category: "irrigation", priority: "high", estimatedMinutes: 15, icon: "💧" },
      { title: "Trash burning (if permitted)", description: "Burn field trash 24 hours before harvest only if permitted locally. Use fire-breaks to control.", category: "maintenance", priority: "medium", estimatedMinutes: 60, icon: "🔧" },
    ],
  },
};

// ─── TOMATO ──────────────────────────────────────────────────────────────────
const TOMATO = {
  "Nursery": {
    interval: 3,
    tasks: [
      { title: "Nursery bed preparation", description: "Raise beds 15 cm high. Mix soil + sand + FYM (1:1:1). Drench with Captan 2 g/L.", category: "maintenance", priority: "high", estimatedMinutes: 90, icon: "🔧" },
      { title: "Seed sowing in nursery", description: "Sow in lines 10 cm apart. Cover with fine sand. Water with watering can gently.", category: "planting", priority: "high", estimatedMinutes: 45, icon: "🌿" },
      { title: "Nursery disease check", description: "Inspect seedling bases for Pythium damping-off. Apply copper oxychloride drench if affected.", category: "monitoring", priority: "high", estimatedMinutes: 20, icon: "📷" },
      { title: "Nursery irrigation", description: "Water gently twice a day. Avoid waterlogging. Maintain moderate moisture for uniform seedlings.", category: "irrigation", priority: "medium", estimatedMinutes: 20, icon: "💧" },
    ],
  },
  "Crop Establishment": {
    interval: 2,
    tasks: [
      { title: "Gap filling", description: "Replace missing plants with spare seedlings within 7 days of transplanting.", category: "planting", priority: "high", estimatedMinutes: 45, icon: "🌿" },
      { title: "First irrigation post-transplant", description: "Irrigate daily for first 7 days; shift to every 3 days from week 2 to establish roots.", category: "irrigation", priority: "high", estimatedMinutes: 30, icon: "💧" },
      { title: "TLCV & thrips scout", description: "Check youngest leaves for silvering (thrips) and upward curling (TLCV). Apply Imidacloprid if >5 thrips/leaf.", category: "monitoring", priority: "high", estimatedMinutes: 25, icon: "🐛" },
      { title: "Staking setup", description: "Install bamboo stakes 1 m tall beside each plant. Tie loosely with soft cloth.", category: "maintenance", priority: "medium", estimatedMinutes: 90, icon: "🔧" },
    ],
  },
  "Fruiting": {
    interval: 3,
    tasks: [
      { title: "Fruit borer monitoring", description: "Check for Helicoverpa entry holes in fruit. Use pheromone traps. Spray Chlorantraniliprole if needed.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "🐛" },
      { title: "K foliar spray for fruit size", description: "Apply K2SO4 0.5% foliar spray. Improves fruit size, colour, and shelf life.", category: "fertilizer", priority: "medium", estimatedMinutes: 45, icon: "🌱" },
      { title: "Irrigation — critical for fruit fill", description: "Maintain consistent moisture. Irregular irrigation causes blossom end rot and cracking.", category: "irrigation", priority: "high", estimatedMinutes: 30, icon: "💧" },
      { title: "Early blight check", description: "Inspect lower leaves for concentric ring spots (early blight). Apply Mancozeb 0.2% at 7-day intervals.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "📷" },
    ],
  },
};

// ─── GROUNDNUT ───────────────────────────────────────────────────────────────
const GROUNDNUT = {
  "Pegging": {
    interval: 3,
    tasks: [
      { title: "Gypsum application", description: "Broadcast 200 kg/ac gypsum around plants at pegging stage. Calcium prevents empty pods.", category: "fertilizer", priority: "high", estimatedMinutes: 45, icon: "🌱" },
      { title: "Light earthing-up at pegging", description: "Mound soil 5–8 cm around plant base to support gynoshore (peg) penetration into soil.", category: "maintenance", priority: "high", estimatedMinutes: 60, icon: "🔧" },
      { title: "Leaf spot (tikka) spray", description: "Apply Chlorothalonil 0.2% or Mancozeb 0.25% to manage tikka leaf spot.", category: "monitoring", priority: "medium", estimatedMinutes: 45, icon: "📷" },
    ],
  },
  "Maturation": {
    interval: 4,
    tasks: [
      { title: "Pod colour check (maturity test)", description: "Wash 10 pods. Dark inner pod wall = mature. Harvest when 75% pods show dark colouration.", category: "monitoring", priority: "high", estimatedMinutes: 20, icon: "📷" },
      { title: "Stop irrigation (2 weeks pre-harvest)", description: "Withhold irrigation 2 weeks before harvest to allow pod skin to harden and reduce cracking.", category: "irrigation", priority: "high", estimatedMinutes: 15, icon: "💧" },
    ],
  },
};

// ─── CHILLI ──────────────────────────────────────────────────────────────────
const CHILLI = {
  "Crop Establishment": {
    interval: 3,
    tasks: [
      { title: "Gap filling with spare plants", description: "Replace dead or weak transplants within 10 days of transplanting.", category: "planting", priority: "high", estimatedMinutes: 45, icon: "🌿" },
      { title: "Thrips infestation check", description: "Inspect leaf undersides for thrips. Apply Spinosad 2 mL/L if >5 thrips per leaf.", category: "monitoring", priority: "high", estimatedMinutes: 25, icon: "🐛" },
      { title: "Mulching for moisture retention", description: "Apply black polythene mulch or dried leaf mulch between rows to retain moisture and suppress weeds.", category: "maintenance", priority: "medium", estimatedMinutes: 60, icon: "🌿" },
    ],
  },
  "Fruiting": {
    interval: 3,
    tasks: [
      { title: "Fruit borer management", description: "Set pheromone traps. Apply Chlorantraniliprole 0.4 mL/L if entry holes visible in fruit.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "🐛" },
      { title: "K foliar for colour & size", description: "Apply K2SO4 0.5% foliar spray. Improves fruit colour development and shelf life.", category: "fertilizer", priority: "medium", estimatedMinutes: 45, icon: "🌱" },
    ],
  },
};

// ─── ONION ───────────────────────────────────────────────────────────────────
const ONION = {
  "Bulb Initiation": {
    interval: 3,
    tasks: [
      { title: "Stop nitrogen fertilizer", description: "Do not apply any nitrogen fertilizer after bulb initiation begins — excess N delays maturity.", category: "fertilizer", priority: "high", estimatedMinutes: 10, icon: "🌱" },
      { title: "Reduce irrigation frequency", description: "Shift from daily to every-3-day irrigation to harden bulbs and reduce purple blotch risk.", category: "irrigation", priority: "high", estimatedMinutes: 20, icon: "💧" },
      { title: "Purple blotch monitoring", description: "Inspect leaves for purple-centred lesions with yellow halo. Apply Mancozeb + Carbendazim if >5% incidence.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "📷" },
    ],
  },
  "Bulb Development": {
    interval: 4,
    tasks: [
      { title: "Neck fall assessment", description: "Walk rows and count plants with fallen tops. Harvest when 50% show neck fall.", category: "monitoring", priority: "high", estimatedMinutes: 25, icon: "📷" },
      { title: "Drainage check", description: "Inspect drainage channels. Standing water at bulb stage causes root rot and pink rot.", category: "irrigation", priority: "high", estimatedMinutes: 20, icon: "💧" },
      { title: "Final irrigation (10 days pre-harvest)", description: "Apply last irrigation 10 days before harvest. Helps uniform curing and reduces skin splitting.", category: "irrigation", priority: "medium", estimatedMinutes: 20, icon: "💧" },
    ],
  },
};

// ─── SOYBEAN ─────────────────────────────────────────────────────────────────
const SOYBEAN = {
  "Pod Development": {
    interval: 4,
    tasks: [
      { title: "Pod borer monitoring", description: "Count Helicoverpa larvae on pods. Spray Chlorantraniliprole if >2 larvae per plant.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "🐛" },
      { title: "K top-dress for pod fill", description: "Apply MOP 20 kg/ac at pod development stage to maximize seed weight.", category: "fertilizer", priority: "medium", estimatedMinutes: 45, icon: "🌱" },
      { title: "Irrigation at seed fill", description: "Maintain field capacity during pod fill — moisture stress reduces 100-seed weight.", category: "irrigation", priority: "high", estimatedMinutes: 40, icon: "💧" },
    ],
  },
};

// ─── TURMERIC ─────────────────────────────────────────────────────────────────
const TURMERIC = {
  "Rhizome Planting": {
    interval: 2,
    tasks: [
      { title: "Rhizome seed treatment", description: "Treat mother rhizomes with Mancozeb 0.3% + Quinalphos 0.075% for 30 min. Air-dry before planting.", category: "planting", priority: "high", estimatedMinutes: 60, icon: "🌿" },
      { title: "Planting at 45×25 cm", description: "Plant rhizomes (40–50 g each) at 5 cm depth in raised beds. Cover with loose soil.", category: "planting", priority: "high", estimatedMinutes: 120, icon: "🌿" },
      { title: "Mulching after planting", description: "Apply 10 t/ac dry leaf mulch (coconut/sorghum) immediately after planting for moisture and temperature control.", category: "maintenance", priority: "high", estimatedMinutes: 120, icon: "🌿" },
    ],
  },
  "Rhizome Initiation": {
    interval: 5,
    tasks: [
      { title: "Stop nitrogen — switch to K", description: "Stop N application completely. Apply MOP 30 kg/ac for rhizome fill and curcumin content.", category: "fertilizer", priority: "high", estimatedMinutes: 45, icon: "🌱" },
      { title: "Rhizome rot inspection", description: "Dig up 5 plants and inspect rhizome condition. Brown, water-soaked rhizomes = Pythium rot.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "📷" },
      { title: "Irrigation — reduce frequency", description: "Reduce irrigation to every 5–7 days. Excess water at this stage causes rhizome rot.", category: "irrigation", priority: "high", estimatedMinutes: 20, icon: "💧" },
    ],
  },
};

// ─── BAJRA (PEARL MILLET) ─────────────────────────────────────────────────────
const BAJRA = {
  "Flowering": {
    interval: 3,
    tasks: [
      { title: "Downy mildew check", description: "Inspect all plants for green ear symptom (downy mildew). Remove and destroy affected plants immediately.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "📷" },
      { title: "Irrigation at flowering", description: "Bajra tolerates drought, but moisture stress during flowering reduces grain set by 30–40%.", category: "irrigation", priority: "high", estimatedMinutes: 40, icon: "💧" },
      { title: "Shoot fly trap check", description: "Count shoot fly adults using yellow sticky traps. >10/trap/week = apply Quinalphos 1.5 mL/L.", category: "monitoring", priority: "medium", estimatedMinutes: 15, icon: "🐛" },
    ],
  },
  "Grain Filling": {
    interval: 4,
    tasks: [
      { title: "Ergot disease monitoring", description: "Check for pink sticky honeydew on ear heads (ergot). Remove affected heads and destroy.", category: "monitoring", priority: "high", estimatedMinutes: 25, icon: "📷" },
      { title: "Bird protection", description: "Install scarecrows and reflective tape. Station field guard during morning and evening.", category: "maintenance", priority: "medium", estimatedMinutes: 60, icon: "🔧" },
      { title: "Grain hardness test", description: "Press grain between thumb and nail — if it cannot be dented, harvest within 5 days.", category: "monitoring", priority: "medium", estimatedMinutes: 15, icon: "📷" },
    ],
  },
};

// ─── CASTOR ──────────────────────────────────────────────────────────────────
const CASTOR = {
  "Primary Spike Initiation": {
    interval: 4,
    tasks: [
      { title: "Primary raceme count", description: "Count first racemes per plant. Record for yield estimation.", category: "monitoring", priority: "medium", estimatedMinutes: 20, icon: "📷" },
      { title: "Capsule borer monitoring", description: "Check for Dichomeris (capsule borer) on primary spike. Spray Quinalphos 25 EC if needed.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "🐛" },
      { title: "Semi-looper scouting", description: "Inspect leaves for semi-looper caterpillar damage (half-eaten leaves). Apply Chlorpyrifos if needed.", category: "monitoring", priority: "high", estimatedMinutes: 30, icon: "🐛" },
    ],
  },
  "Capsule Maturation": {
    interval: 5,
    tasks: [
      { title: "Maturity check", description: "Raceme turns yellow-brown and capsules rattle when shaken — harvest primary raceme when 50% mature.", category: "monitoring", priority: "high", estimatedMinutes: 20, icon: "📷" },
      { title: "Staggered harvest of racemes", description: "Castor ripens unevenly — harvest primary raceme first, then secondary, then tertiary over 3–4 rounds.", category: "harvest", priority: "high", estimatedMinutes: 120, icon: "🌾" },
    ],
  },
};

// ─── Master export ────────────────────────────────────────────────────────────
const CROP_TASK_TEMPLATES = {
  _universal: UNIVERSAL,
  Banana: BANANA,
  Rice: RICE,
  Wheat: WHEAT,
  Cotton: COTTON,
  Sugarcane: SUGARCANE,
  Tomato: TOMATO,
  Groundnut: GROUNDNUT,
  Chilli: CHILLI,
  Onion: ONION,
  Soybean: SOYBEAN,
  Turmeric: TURMERIC,
  Bajra: BAJRA,
  Castor: CASTOR,
};

/**
 * Returns the task template for a specific crop + stage.
 * Falls back to universal templates for stages not explicitly defined.
 */
function getStageTemplate(cropName, stageName) {
  const cropTemplates = CROP_TASK_TEMPLATES[cropName] || {};
  const universal = CROP_TASK_TEMPLATES._universal;
  return cropTemplates[stageName] || universal[stageName] || null;
}

/**
 * Returns stage metadata (description, objectives, observations, precautions)
 * for display in the frontend's crop plan stage cards.
 */
function getStageMeta(stageName) {
  return STAGE_META[stageName] || null;
}

/**
 * Returns the emoji icon for a task category.
 */
function getCategoryIcon(category) {
  return ICONS[category] || "📋";
}

module.exports = { getStageTemplate, getStageMeta, getCategoryIcon };
