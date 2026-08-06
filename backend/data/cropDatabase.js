// Static reference data for common crops grown in Gujarat/western India.
// All growthStages are agronomically verified against ICAR/State Agri Dept norms.
//
// waterNeedCategory: "low" | "medium" | "high"
// season: "kharif" | "rabi" | "zaid" | "year-round"
// growthStages.dayOffset: day FROM sowing/planting when stage BEGINS

module.exports = [
  // ─────────────────────────── POTATO ──────────────────────────────
  {
    name: "Potato",
    season: "rabi",
    soilPhRange: [5.5, 6.5],
    waterNeedCategory: "medium",
    durationDays: 100,
    costPerAcreRs: 45000,
    expectedYieldKgPerAcre: 8000,
    marketPriceRsPerKg: 15,
    marketDemand: "high",
    riskNotes: "Late blight risk in high humidity; needs well-drained soil to avoid tuber rot.",
    growthStages: [
      { stage: "Land Preparation",   dayOffset: 0  }, // 7 days — deep plough, FYM, ridges
      { stage: "Sowing",             dayOffset: 7  }, // cut seed, treat, plant in ridges
      { stage: "Sprout Emergence",   dayOffset: 15 }, // 6–8 days after sowing
      { stage: "Vegetative Growth",  dayOffset: 30 }, // haulm develops; earthing-up
      { stage: "Tuber Initiation",   dayOffset: 55 }, // stolon→tuber; critical irrigation
      { stage: "Tuber Bulking",      dayOffset: 75 }, // rapid size gain; K demand peaks
      { stage: "Maturation",         dayOffset: 90 }, // haulm yellows; stop irrigation
      { stage: "Harvest",            dayOffset: 100 },
    ],
  },

  // ─────────────────────────── FENNEL ──────────────────────────────
  {
    name: "Fennel",
    season: "rabi",
    soilPhRange: [6.5, 8.0],
    waterNeedCategory: "medium",
    durationDays: 160,
    costPerAcreRs: 15000,
    expectedYieldKgPerAcre: 800,
    marketPriceRsPerKg: 120,
    marketDemand: "medium",
    riskNotes: "Ramularia blight risk in cloudy weather; sensitive to frost.",
    growthStages: [
      { stage: "Land Preparation",     dayOffset: 0   }, // 5 days — fine tilth for tiny seeds
      { stage: "Sowing",               dayOffset: 5   }, // shallow drilling or broadcasting
      { stage: "Germination",          dayOffset: 12  }, // 7–10 days after sowing
      { stage: "Seedling Establishment",dayOffset: 25 }, // thinning, first weeding
      { stage: "Vegetative Growth",    dayOffset: 45  }, // canopy build-up
      { stage: "Umbel Formation",      dayOffset: 95  }, // primary umbel visible
      { stage: "Flowering",            dayOffset: 115 }, // avoid sprays; pollinator window
      { stage: "Seed Formation",       dayOffset: 130 }, // grain fill; reduce irrigation
      { stage: "Seed Maturation",      dayOffset: 148 }, // seed colour change; pre-harvest
      { stage: "Harvest",              dayOffset: 160 },
    ],
  },

  // ─────────────────────────── CHICKPEA ─────────────────────────────
  {
    name: "ChickPea",
    season: "rabi",
    soilPhRange: [6.0, 7.5],
    waterNeedCategory: "low",
    durationDays: 100,
    costPerAcreRs: 11000,
    expectedYieldKgPerAcre: 500,
    marketPriceRsPerKg: 58,
    marketDemand: "high",
    riskNotes: "Pod borer risk; generally low water and low input crop.",
    growthStages: [
      { stage: "Land Preparation",  dayOffset: 0  }, // 5 days — moderate tilth
      { stage: "Sowing",            dayOffset: 5  }, // rhizobium seed treatment
      { stage: "Germination",       dayOffset: 13 }, // 7–10 days after sowing
      { stage: "Seedling Growth",   dayOffset: 25 }, // thinning + first weeding
      { stage: "Vegetative Growth", dayOffset: 40 }, // bushy canopy; pest scouting
      { stage: "Flowering",         dayOffset: 60 }, // critical for pod set
      { stage: "Pod Filling",       dayOffset: 80 }, // pod borer peak risk
      { stage: "Harvest",           dayOffset: 100 },
    ],
  },

  // ─────────────────────────── TOMATO ──────────────────────────────
  {
    name: "Tomato",
    season: "rabi",
    soilPhRange: [6.0, 7.0],
    waterNeedCategory: "medium",
    durationDays: 130,
    costPerAcreRs: 30000,
    expectedYieldKgPerAcre: 10000,
    marketPriceRsPerKg: 20,
    marketDemand: "high",
    riskNotes: "Early and late blight risk; fruit borer requires monitoring.",
    growthStages: [
      { stage: "Nursery",              dayOffset: 0   }, // 25 days — raise seedlings
      { stage: "Land Preparation",     dayOffset: 20  }, // prepare field while nursery matures
      { stage: "Transplanting",        dayOffset: 25  }, // 3–5 days; evening planting, irrigation
      { stage: "Crop Establishment",   dayOffset: 30  }, // 15 days; gap filling, root establishment
      { stage: "Vegetative Growth",    dayOffset: 45  }, // stake, train; N top-dress
      { stage: "Flowering",            dayOffset: 62  }, // blossom drop watch; K application
      { stage: "Fruiting",             dayOffset: 80  }, // fruit borer scouting
      { stage: "First Harvest",        dayOffset: 100 }, // pick 80% colour
      { stage: "Harvest",              dayOffset: 130 }, // final picking
    ],
  },

  // ─────────────────────────── BANANA ──────────────────────────────
  {
    name: "Banana",
    season: "year-round",
    soilPhRange: [6.5, 7.5],
    waterNeedCategory: "high",
    durationDays: 330,
    costPerAcreRs: 60000,
    expectedYieldKgPerAcre: 25000,
    marketPriceRsPerKg: 15,
    marketDemand: "high",
    riskNotes: "Sigatoka leaf spot and Panama wilt; sensitive to wind and drought.",
    growthStages: [
      { stage: "Land Preparation",          dayOffset: 0   }, // 5 days — deep plough, FYM, layout
      { stage: "Pit Preparation",           dayOffset: 5   }, // 7 days — dig pits 60×60×60 cm, fill with compost
      { stage: "Planting",                  dayOffset: 12  }, // 5 days — plant suckers/TC, first irrigation
      { stage: "Crop Establishment",        dayOffset: 17  }, // 20 days — gap fill, mulching, root establishment
      { stage: "Early Vegetative Growth",   dayOffset: 37  }, // 80 days — rapid leaf production, desuckering begins
      { stage: "Active Vegetative Growth",  dayOffset: 117 }, // 90 days — maximum canopy; prop plants; monthly desuckering
      { stage: "Shooting / Flowering",      dayOffset: 207 }, // 55 days — remove male bud; bunch sleeves
      { stage: "Bunch Development",         dayOffset: 262 }, // 60 days — propping; leaf pruning; potassium boost
      { stage: "Harvest",                   dayOffset: 322 }, // 8 days — cut when 75% fill; grade & transport
    ],
  },

  // ─────────────────────────── BARLEY ──────────────────────────────
  {
    name: "Barley",
    season: "rabi",
    soilPhRange: [6.0, 8.0],
    waterNeedCategory: "low",
    durationDays: 120,
    costPerAcreRs: 12000,
    expectedYieldKgPerAcre: 1400,
    marketPriceRsPerKg: 22,
    marketDemand: "medium",
    riskNotes: "Tolerant to salinity and drought; aphid risk during grain fill.",
    growthStages: [
      { stage: "Land Preparation",  dayOffset: 0   }, // 5 days
      { stage: "Sowing",            dayOffset: 5   }, // drill at 100-125 kg/ha
      { stage: "Germination",       dayOffset: 12  }, // 7 days; uniform emergence
      { stage: "Tillering",         dayOffset: 28  }, // weed control, light N
      { stage: "Jointing",          dayOffset: 50  }, // stem elongation; irrigation 1
      { stage: "Heading",           dayOffset: 70  }, // ear emergence; irrigation 2
      { stage: "Flowering",         dayOffset: 82  }, // avoid fungicide spray
      { stage: "Grain Filling",     dayOffset: 95  }, // aphid scouting; stop irrigation
      { stage: "Harvest",           dayOffset: 120 },
    ],
  },

  // ─────────────────────────── MAIZE ───────────────────────────────
  {
    name: "Maize",
    season: "kharif",
    soilPhRange: [6.0, 8.0],
    waterNeedCategory: "medium",
    durationDays: 100,
    costPerAcreRs: 14000,
    expectedYieldKgPerAcre: 1200,
    marketPriceRsPerKg: 18,
    marketDemand: "medium",
    riskNotes: "Fall armyworm risk; moderate water need, tolerant of mixed conditions.",
    growthStages: [
      { stage: "Land Preparation",    dayOffset: 0  }, // 5 days
      { stage: "Sowing",              dayOffset: 5  }, // seed treatment; 60×20 cm spacing
      { stage: "Germination",         dayOffset: 11 }, // 5–7 days; uniform stand check
      { stage: "Seedling Stage",      dayOffset: 20 }, // thinning to 1 plant/hill
      { stage: "Vegetative Growth",   dayOffset: 30 }, // earthing-up; N top-dress
      { stage: "Tasseling / Silking", dayOffset: 55 }, // irrigation critical; no spray
      { stage: "Grain Filling",       dayOffset: 78 }, // fall armyworm peak
      { stage: "Maturity / Drying",   dayOffset: 92 }, // husk turns brown; stop irrigation
      { stage: "Harvest",             dayOffset: 100 },
    ],
  },

  // ─────────────────────────── MUSTARD ─────────────────────────────
  {
    name: "Mustard",
    season: "rabi",
    soilPhRange: [6.0, 7.5],
    waterNeedCategory: "low",
    durationDays: 110,
    costPerAcreRs: 9000,
    expectedYieldKgPerAcre: 600,
    marketPriceRsPerKg: 52,
    marketDemand: "medium",
    riskNotes: "Aphid risk during flowering; low water need makes it drought-tolerant.",
    growthStages: [
      { stage: "Land Preparation",          dayOffset: 0  }, // 4 days — fine tilth
      { stage: "Sowing",                    dayOffset: 4  }, // line or broadcast; 4-5 kg/ha
      { stage: "Germination",               dayOffset: 10 }, // 5–7 days
      { stage: "Seedling Establishment",    dayOffset: 20 }, // thinning; first irrigation
      { stage: "Vegetative Growth",         dayOffset: 32 }, // canopy build; weeding
      { stage: "Flowering",                 dayOffset: 55 }, // aphid peak; honey bee visits
      { stage: "Pod (Siliqua) Development", dayOffset: 78 }, // avoid excess N
      { stage: "Siliqua Maturation",        dayOffset: 98 }, // yellowing; pre-harvest check
      { stage: "Harvest",                   dayOffset: 110 },
    ],
  },

  // ─────────────────────────── GUAR ────────────────────────────────
  {
    name: "Guar",
    season: "kharif",
    soilPhRange: [7.0, 8.5],
    waterNeedCategory: "low",
    durationDays: 90,
    costPerAcreRs: 8000,
    expectedYieldKgPerAcre: 400,
    marketPriceRsPerKg: 45,
    marketDemand: "medium",
    riskNotes: "Extremely drought-tolerant; susceptible to bacterial blight in heavy rains.",
    growthStages: [
      { stage: "Land Preparation",  dayOffset: 0  }, // 4 days
      { stage: "Sowing",            dayOffset: 4  }, // 30×10 cm; rhizobium treatment
      { stage: "Germination",       dayOffset: 10 }, // 5–7 days
      { stage: "Seedling Growth",   dayOffset: 20 }, // thinning; weed control
      { stage: "Vegetative Growth", dayOffset: 32 }, // canopy; blight scouting
      { stage: "Flowering",         dayOffset: 48 }, // irrigation if dry spell
      { stage: "Pod Formation",     dayOffset: 65 }, // pod counts; blight watch
      { stage: "Harvest",           dayOffset: 90 },
    ],
  },

  // ─────────────────────────── CASTOR ──────────────────────────────
  {
    name: "Castor",
    season: "kharif",
    soilPhRange: [5.0, 8.0],
    waterNeedCategory: "low",
    durationDays: 180,
    costPerAcreRs: 12000,
    expectedYieldKgPerAcre: 800,
    marketPriceRsPerKg: 60,
    marketDemand: "high",
    riskNotes: "Drought-hardy; watch for semi-looper and capsule borer.",
    growthStages: [
      { stage: "Land Preparation",          dayOffset: 0   }, // 6 days
      { stage: "Sowing",                    dayOffset: 6   }, // large seed; 90×60 cm
      { stage: "Germination",               dayOffset: 14  }, // 8–10 days
      { stage: "Seedling Establishment",    dayOffset: 28  }, // gap fill; weed control
      { stage: "Vegetative Growth",         dayOffset: 45  }, // earthing-up; N top-dress
      { stage: "Primary Spike Initiation",  dayOffset: 72  }, // first raceme visible
      { stage: "Primary Spike Flowering",   dayOffset: 90  }, // capsule borer scouting
      { stage: "Secondary Spike Development",dayOffset: 115}, // inter-culture; weeding
      { stage: "Capsule Maturation",        dayOffset: 155 }, // raceme turns yellow
      { stage: "Harvest",                   dayOffset: 180 }, // pick mature racemes in stages
    ],
  },

  // ─────────────────────────── SUNFLOWER ───────────────────────────
  {
    name: "Sunflower",
    season: "zaid",
    soilPhRange: [6.5, 8.0],
    waterNeedCategory: "medium",
    durationDays: 100,
    costPerAcreRs: 14000,
    expectedYieldKgPerAcre: 600,
    marketPriceRsPerKg: 45,
    marketDemand: "high",
    riskNotes: "Bird damage risk during grain fill; susceptible to Alternaria blight.",
    growthStages: [
      { stage: "Land Preparation",   dayOffset: 0  }, // 5 days
      { stage: "Sowing",             dayOffset: 5  }, // 60×30 cm; treated seed
      { stage: "Germination",        dayOffset: 12 }, // 6–8 days
      { stage: "Seedling Growth",    dayOffset: 22 }, // thinning to 1 plant/hill
      { stage: "Vegetative Growth",  dayOffset: 35 }, // N top-dress; weed control
      { stage: "Button Stage (Bud)", dayOffset: 50 }, // head visible; irrigation critical
      { stage: "Flowering",          dayOffset: 65 }, // cross-pollination; bird watch starts
      { stage: "Seed Development",   dayOffset: 82 }, // Alternaria blight risk
      { stage: "Maturity / Harvest", dayOffset: 100 }, // back of head turns yellow
    ],
  },

  // ─────────────────────────── SESAME ──────────────────────────────
  {
    name: "Sesame",
    season: "kharif",
    soilPhRange: [5.5, 8.0],
    waterNeedCategory: "low",
    durationDays: 90,
    costPerAcreRs: 9000,
    expectedYieldKgPerAcre: 250,
    marketPriceRsPerKg: 120,
    marketDemand: "high",
    riskNotes: "Very sensitive to waterlogging; phyllody disease risk.",
    growthStages: [
      { stage: "Land Preparation",       dayOffset: 0  }, // 4 days — very fine tilth
      { stage: "Sowing",                 dayOffset: 4  }, // broadcast or drill; 3-4 kg/ha
      { stage: "Germination",            dayOffset: 10 }, // 5–7 days
      { stage: "Seedling Establishment", dayOffset: 20 }, // thinning; phyllody scout
      { stage: "Vegetative Growth",      dayOffset: 32 }, // weed control; earthing-up
      { stage: "Flowering",              dayOffset: 48 }, // axillary flowers; avoid spray
      { stage: "Capsule Formation",      dayOffset: 65 }, // capsule fill; drainage check
      { stage: "Maturation",             dayOffset: 82 }, // lower leaves yellowing
      { stage: "Harvest",                dayOffset: 90 }, // cut when lowest capsules turn yellow
    ],
  },

  // ─────────────────────────── COTTON ──────────────────────────────
  {
    name: "Cotton",
    season: "kharif",
    soilPhRange: [6.0, 8.0],
    waterNeedCategory: "medium",
    durationDays: 180,
    costPerAcreRs: 28000,
    expectedYieldKgPerAcre: 500,
    marketPriceRsPerKg: 65,
    marketDemand: "high",
    riskNotes: "Bollworm and whitefly risk in humid conditions; needs monitoring.",
    growthStages: [
      { stage: "Land Preparation",    dayOffset: 0   }, // 8 days — deep plough
      { stage: "Sowing",              dayOffset: 8   }, // 90×60 cm; treated Bt seed
      { stage: "Germination",         dayOffset: 16  }, // 7–10 days; gap filling
      { stage: "Seedling Stage",      dayOffset: 28  }, // thinning; first spraying
      { stage: "Vegetative Growth",   dayOffset: 45  }, // N top-dress; whitefly scout
      { stage: "Squaring",            dayOffset: 65  }, // first squares; nutrient boost
      { stage: "Flowering",           dayOffset: 90  }, // bollworm peak; boll counting
      { stage: "Boll Development",    dayOffset: 120 }, // irrigation critical; K application
      { stage: "Boll Opening",        dayOffset: 155 }, // ethephon if needed; first pick
      { stage: "Harvest",             dayOffset: 180 }, // multiple pickings every 8–10 days
    ],
  },

  // ─────────────────────────── GROUNDNUT ───────────────────────────
  {
    name: "Groundnut",
    season: "kharif",
    soilPhRange: [6.0, 7.0],
    waterNeedCategory: "medium",
    durationDays: 110,
    costPerAcreRs: 18000,
    expectedYieldKgPerAcre: 700,
    marketPriceRsPerKg: 55,
    marketDemand: "high",
    riskNotes: "Sensitive to waterlogging; leaf spot risk in high humidity.",
    growthStages: [
      { stage: "Land Preparation",     dayOffset: 0  }, // 6 days — gypsum application
      { stage: "Sowing",               dayOffset: 6  }, // 30×10 cm; gypsum at pegging
      { stage: "Germination",          dayOffset: 14 }, // 8 days; gap filling
      { stage: "Seedling Growth",      dayOffset: 25 }, // thinning; first weeding
      { stage: "Vegetative Growth",    dayOffset: 38 }, // leaf spot scouting; earthing-up
      { stage: "Flowering",            dayOffset: 50 }, // first flowers; gynoshore visible
      { stage: "Pegging",              dayOffset: 62 }, // critical — gypsum top-dress
      { stage: "Pod Development",      dayOffset: 80 }, // irrigation stop 2 wks before harvest
      { stage: "Maturation",           dayOffset: 98 }, // pod colour check; irrigation stop
      { stage: "Harvest",              dayOffset: 110 },
    ],
  },

  // ─────────────────────────── CHILLI ──────────────────────────────
  {
    name: "Chilli",
    season: "kharif",
    soilPhRange: [6.0, 7.0],
    waterNeedCategory: "medium",
    durationDays: 150,
    costPerAcreRs: 35000,
    expectedYieldKgPerAcre: 2000,
    marketPriceRsPerKg: 100,
    marketDemand: "high",
    riskNotes: "Thrips and leaf curl virus are major threats; needs well-drained soil.",
    growthStages: [
      { stage: "Nursery",                dayOffset: 0   }, // 35 days — raise seedlings
      { stage: "Land Preparation",       dayOffset: 25  }, // prepare field while nursery matures
      { stage: "Transplanting",          dayOffset: 35  }, // 5 days; evening planting
      { stage: "Crop Establishment",     dayOffset: 40  }, // 20 days; thrips scouting starts
      { stage: "Vegetative Growth",      dayOffset: 60  }, // staking; leaf curl watch
      { stage: "Flowering",              dayOffset: 85  }, // fruit borer; avoid rain spray
      { stage: "Fruiting",               dayOffset: 108 }, // fruit colour development
      { stage: "Multiple Pickings",      dayOffset: 125 }, // pick red/green as per market
      { stage: "Harvest",                dayOffset: 150 }, // last pick; vine/trash disposal
    ],
  },

  // ─────────────────────────── WHEAT ───────────────────────────────
  {
    name: "Wheat",
    season: "rabi",
    soilPhRange: [6.0, 7.5],
    waterNeedCategory: "medium",
    durationDays: 120,
    costPerAcreRs: 16000,
    expectedYieldKgPerAcre: 1600,
    marketPriceRsPerKg: 23,
    marketDemand: "high",
    riskNotes: "Rust disease risk if humidity spikes during grain fill.",
    growthStages: [
      { stage: "Land Preparation",    dayOffset: 0   }, // 5 days — puddling, fine tilth
      { stage: "Sowing",              dayOffset: 5   }, // drill at 100 kg/ha; basal dose
      { stage: "Germination",         dayOffset: 12  }, // 6–8 days
      { stage: "Seedling Stage",      dayOffset: 22  }, // gap fill; weed scout
      { stage: "Tillering",           dayOffset: 30  }, // light N top-dress; weed control
      { stage: "Jointing",            dayOffset: 52  }, // irrigation CRI stage
      { stage: "Heading / Ear Emergence", dayOffset: 72 }, // flag leaf visible
      { stage: "Flowering",           dayOffset: 83  }, // rust watch; irrigation 3
      { stage: "Grain Filling",       dayOffset: 98  }, // aphid scouting; avoid stress
      { stage: "Harvest",             dayOffset: 120 }, // golden yellow; moisture 12–14%
    ],
  },

  // ─────────────────────────── SUGARCANE ───────────────────────────
  {
    name: "Sugarcane",
    season: "year-round",
    soilPhRange: [6.5, 7.5],
    waterNeedCategory: "high",
    durationDays: 360,
    costPerAcreRs: 45000,
    expectedYieldKgPerAcre: 35000,
    marketPriceRsPerKg: 3,
    marketDemand: "high",
    riskNotes: "Requires massive water input; red rot disease and early shoot borer risks.",
    growthStages: [
      { stage: "Land Preparation",         dayOffset: 0   }, // 10 days — deep subsoil plough
      { stage: "Sett Planting",            dayOffset: 10  }, // 5 days — 2-3 bud setts in furrows
      { stage: "Germination",              dayOffset: 25  }, // 15–20 days; gap filling
      { stage: "Seedling Establishment",   dayOffset: 45  }, // shoot borer scouting; earthing-up
      { stage: "Tillering",                dayOffset: 85  }, // detrashing; gap fill; N top-dress
      { stage: "Grand Growth",             dayOffset: 160 }, // rapid elongation; high irrigation demand
      { stage: "Maturation / Ripening",    dayOffset: 310 }, // Brix check; irrigation cutoff
      { stage: "Harvest",                  dayOffset: 360 }, // mechanical/manual cut; ratoon prep
    ],
  },

  // ─────────────────────────── MUNG BEAN ───────────────────────────
  {
    name: "MungBean",
    season: "zaid",
    soilPhRange: [6.0, 7.5],
    waterNeedCategory: "low",
    durationDays: 65,
    costPerAcreRs: 8000,
    expectedYieldKgPerAcre: 350,
    marketPriceRsPerKg: 75,
    marketDemand: "high",
    riskNotes: "Yellow Mosaic Virus risk; extremely sensitive to waterlogging.",
    growthStages: [
      { stage: "Land Preparation",     dayOffset: 0  }, // 4 days — light tilth
      { stage: "Sowing",               dayOffset: 4  }, // rhizobium treatment; 30×10 cm
      { stage: "Germination",          dayOffset: 10 }, // 5–7 days; YMV whitefly watch
      { stage: "Seedling Growth",      dayOffset: 20 }, // thinning; first weeding
      { stage: "Vegetative Growth",    dayOffset: 30 }, // bushy stage; weed control
      { stage: "Flowering",            dayOffset: 40 }, // critical irrigation; YMV peak
      { stage: "Pod Development",      dayOffset: 52 }, // pod fill; stop excess irrigation
      { stage: "Harvest",              dayOffset: 65 }, // pick when 80% pods mature
    ],
  },

  // ─────────────────────────── TURMERIC ────────────────────────────
  {
    name: "Turmeric",
    season: "kharif",
    soilPhRange: [5.5, 7.5],
    waterNeedCategory: "high",
    durationDays: 270,
    costPerAcreRs: 50000,
    expectedYieldKgPerAcre: 8000,
    marketPriceRsPerKg: 90,
    marketDemand: "high",
    riskNotes: "Rhizome rot in poorly drained soil; needs shaded or mixed cropping early on.",
    growthStages: [
      { stage: "Land Preparation",       dayOffset: 0   }, // 10 days — deep beds, FYM
      { stage: "Rhizome Planting",       dayOffset: 10  }, // 5 days — seed rhizomes 45×25 cm
      { stage: "Sprouting",              dayOffset: 30  }, // 20–25 days; mulching with leaves
      { stage: "Crop Establishment",     dayOffset: 55  }, // 35 days; first earthing-up; shade
      { stage: "Vegetative Growth",      dayOffset: 90  }, // canopy close; weeding
      { stage: "Rhizome Initiation",     dayOffset: 180 }, // reduce irrigation; no N
      { stage: "Rhizome Maturation",     dayOffset: 240 }, // leaves yellow; stop irrigation
      { stage: "Harvest",                dayOffset: 270 }, // dig, cure, boil, dry
    ],
  },

  // ─────────────────────────── BAJRA (PEARL MILLET) ────────────────
  {
    name: "Bajra",
    season: "kharif",
    soilPhRange: [6.5, 7.5],
    waterNeedCategory: "low",
    durationDays: 90,
    costPerAcreRs: 12000,
    expectedYieldKgPerAcre: 900,
    marketPriceRsPerKg: 24,
    marketDemand: "high",
    riskNotes: "Low disease risk; vulnerable to shoot fly in early stage.",
    growthStages: [
      { stage: "Land Preparation",    dayOffset: 0  }, // 4 days
      { stage: "Sowing",              dayOffset: 4  }, // 45×15 cm; 4 kg/ha
      { stage: "Germination",         dayOffset: 10 }, // 5–7 days; shoot fly watch
      { stage: "Seedling Stage",      dayOffset: 20 }, // thinning; earthing-up
      { stage: "Vegetative Growth",   dayOffset: 30 }, // N top-dress; weed control
      { stage: "Flowering",           dayOffset: 50 }, // irrigation if dry
      { stage: "Grain Filling",       dayOffset: 68 }, // moisture & downy mildew watch
      { stage: "Maturity",            dayOffset: 82 }, // ears dry; stop irrigation
      { stage: "Harvest",             dayOffset: 90 },
    ],
  },

  // ─────────────────────────── SOYBEAN ─────────────────────────────
  {
    name: "Soybean",
    season: "kharif",
    soilPhRange: [6.5, 7.5],
    waterNeedCategory: "medium",
    durationDays: 100,
    costPerAcreRs: 18000,
    expectedYieldKgPerAcre: 450,
    marketPriceRsPerKg: 45,
    marketDemand: "high",
    riskNotes: "Yellow Mosaic Virus (YMV) via whitefly; stem borer; pod borer at pod fill.",
    growthStages: [
      { stage: "Land Preparation",   dayOffset: 0  }, // 6 days — fine tilth
      { stage: "Sowing",             dayOffset: 6  }, // rhizobium + PSB treatment; 45×5 cm
      { stage: "Germination",        dayOffset: 14 }, // 7–10 days; YMV whitefly watch
      { stage: "Seedling Growth",    dayOffset: 25 }, // thinning; weed control
      { stage: "Vegetative Growth",  dayOffset: 38 }, // canopy; stem borer scouting
      { stage: "Flowering",          dayOffset: 58 }, // irrigation critical; avoid spray
      { stage: "Pod Development",    dayOffset: 74 }, // pod borer peak; K top-dress
      { stage: "Maturation",         dayOffset: 90 }, // pods rattle; stop irrigation
      { stage: "Harvest",            dayOffset: 100 },
    ],
  },

  // ─────────────────────────── ONION ───────────────────────────────
  {
    name: "Onion",
    season: "rabi",
    soilPhRange: [6.0, 7.5],
    waterNeedCategory: "medium",
    durationDays: 120,
    costPerAcreRs: 35000,
    expectedYieldKgPerAcre: 8000,
    marketPriceRsPerKg: 20,
    marketDemand: "high",
    riskNotes: "Thrips and purple blotch risk; highly sensitive to excess soil moisture.",
    growthStages: [
      { stage: "Nursery",                dayOffset: 0   }, // 35–45 days
      { stage: "Land Preparation",       dayOffset: 35  }, // ridges + FYM
      { stage: "Transplanting",          dayOffset: 45  }, // 5 days; 15×10 cm; evening
      { stage: "Crop Establishment",     dayOffset: 50  }, // 20 days; gap fill; thrips watch
      { stage: "Vegetative Growth",      dayOffset: 70  }, // leaf canopy; weed control
      { stage: "Bulb Initiation",        dayOffset: 88  }, // stop N; reduce irrigation
      { stage: "Bulb Development",       dayOffset: 105 }, // purple blotch watch; drain excess
      { stage: "Harvest",                dayOffset: 120 }, // 50% neck fall; cure 7 days
    ],
  },

  // ─────────────────────────── URAD BEAN ───────────────────────────
  {
    name: "UradBean",
    season: "kharif",
    soilPhRange: [6.0, 7.5],
    waterNeedCategory: "low",
    durationDays: 75,
    costPerAcreRs: 9000,
    expectedYieldKgPerAcre: 350,
    marketPriceRsPerKg: 70,
    marketDemand: "high",
    riskNotes: "Yellow Mosaic Virus risk; extremely sensitive to waterlogging.",
    growthStages: [
      { stage: "Land Preparation",    dayOffset: 0  }, // 4 days
      { stage: "Sowing",              dayOffset: 4  }, // rhizobium; 30×10 cm
      { stage: "Germination",         dayOffset: 10 }, // 5–7 days; YMV watch
      { stage: "Seedling Growth",     dayOffset: 20 }, // thinning; drainage check
      { stage: "Vegetative Growth",   dayOffset: 32 }, // bushy; weed control
      { stage: "Flowering",           dayOffset: 45 }, // critical irrigation
      { stage: "Pod Development",     dayOffset: 60 }, // pod fill; whitefly scouting
      { stage: "Harvest",             dayOffset: 75 },
    ],
  },

  // ─────────────────────────── RICE ────────────────────────────────
  {
    name: "Rice",
    season: "kharif",
    soilPhRange: [6.0, 7.5],
    waterNeedCategory: "high",
    durationDays: 130,
    costPerAcreRs: 22000,
    expectedYieldKgPerAcre: 1800,
    marketPriceRsPerKg: 21,
    marketDemand: "high",
    riskNotes: "Needs standing water/high irrigation; blast disease risk in humid weather.",
    growthStages: [
      { stage: "Nursery",                   dayOffset: 0   }, // 20–25 days; wet or dry bed
      { stage: "Land Preparation",          dayOffset: 18  }, // puddling while nursery grows
      { stage: "Transplanting",             dayOffset: 25  }, // 5 days; 2-3 seedlings/hill
      { stage: "Crop Establishment",        dayOffset: 30  }, // 15 days; maintain 2–5 cm water
      { stage: "Tillering",                 dayOffset: 45  }, // max tiller count; weeding
      { stage: "Panicle Initiation",        dayOffset: 75  }, // blast risk peak; N top-dress
      { stage: "Heading / Flowering",       dayOffset: 90  }, // maintain water; avoid spray
      { stage: "Grain Filling",             dayOffset: 105 }, // drain field 10 days pre-harvest
      { stage: "Harvest",                   dayOffset: 130 }, // golden grain; 20% moisture
    ],
  },

  // ─────────────────────────── PIGEON PEA ──────────────────────────
  {
    name: "Pigeonpea",
    season: "kharif",
    soilPhRange: [6.0, 7.5],
    waterNeedCategory: "low",
    durationDays: 160,
    costPerAcreRs: 12000,
    expectedYieldKgPerAcre: 600,
    marketPriceRsPerKg: 65,
    marketDemand: "high",
    riskNotes: "Pod borer and wilt risk; deep-rooted, highly drought-tolerant.",
    growthStages: [
      { stage: "Land Preparation",   dayOffset: 0   }, // 5 days — deep furrows
      { stage: "Sowing",             dayOffset: 5   }, // rhizobium; 60×20 cm
      { stage: "Germination",        dayOffset: 13  }, // 7–10 days; wilt scout
      { stage: "Seedling Stage",     dayOffset: 25  }, // thinning; earthing-up
      { stage: "Vegetative Growth",  dayOffset: 50  }, // bushy; inter-culture
      { stage: "Branching",          dayOffset: 88  }, // spray for pod borer
      { stage: "Flowering",          dayOffset: 118 }, // critical irrigation if dry
      { stage: "Pod Development",    dayOffset: 140 }, // pod borer peak risk
      { stage: "Harvest",            dayOffset: 160 }, // 75% pods brown
    ],
  },
];
