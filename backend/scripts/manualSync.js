require("dotenv").config({ path: __dirname + "/../.env" });
const mongoose = require("mongoose");
const { syncDailyMarketData } = require("../services/marketSyncService");

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB. Starting manual sync...");
  await syncDailyMarketData();
  console.log("Sync triggered. It will run in the background. Exiting process.");
  process.exit(0);
}
run();
