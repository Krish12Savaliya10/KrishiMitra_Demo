require("dotenv").config();
const mongoose = require("mongoose");
const MarketPrice = require("../models/MarketPrice");

const crops = ["Soybean", "Cotton", "Wheat", "Maize", "Rice", "Pigeonpea"];
const state = "Maharashtra";
const district = "Pune";
const market = "Pune(Moshi)";

const basePrices = {
  Soybean: 4500,
  Cotton: 7200,
  Wheat: 2800,
  Maize: 2100,
  Rice: 3500,
  Pigeonpea: 9500
};

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Seeding 30 days of history...");
  
  const today = new Date();
  const bulkOps = [];
  
  for (let i = 1; i <= 30; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1).toString().padStart(2, '0')}/${d.getFullYear()}`;
    
    for (const crop of crops) {
      // Add random fluctuation +/- 5%
      const fluctuation = 1 + (Math.random() * 0.1 - 0.05);
      const modal = Math.round(basePrices[crop] * fluctuation);
      
      bulkOps.push({
        updateOne: {
          filter: { state, district, market, commodity: crop, arrival_date: dateStr },
          update: {
            $set: {
              state, district, market, commodity: crop, variety: "Local",
              arrival_date: dateStr,
              parsedDate: d,
              min_price: modal - 200,
              max_price: modal + 200,
              modal_price: modal,
              fetchedAt: new Date()
            }
          },
          upsert: true
        }
      });
    }
  }
  
  await MarketPrice.bulkWrite(bulkOps);
  console.log("Seeded successfully!");
  process.exit(0);
}
run();
