require("dotenv").config({ path: __dirname + "/../.env" });
const mongoose = require("mongoose");
const CropPlan = require("../models/CropPlan");
const ScheduleTask = require("../models/ScheduleTask");
const Alert = require("../models/Alert");
const User = require("../models/User");
const Farm = require("../models/Farm");
const { generateScheduleForCropPlan, rescheduleOnTaskUpdate } = require("../services/scheduleEngine");

async function run() {
  await mongoose.connect("mongodb://localhost:27017/krishimitra", { useNewUrlParser: true });

  const user = await User.findOne();
  const farm = await Farm.findOne({ owner: user._id });

  const plan = await CropPlan.create({
    owner: user._id,
    farm: farm._id,
    cropName: "Wheat",
    season: "Rabi 2026",
    sowingDate: new Date(),
    expectedHarvestDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
    areaAcres: 1,
    status: "active"
  });

  await generateScheduleForCropPlan(plan, "test");
  
  const criticalTask = await ScheduleTask.findOne({ cropPlan: plan._id, isCritical: true });
  console.log("Found critical task:", criticalTask.title);
  
  criticalTask.status = "skipped";
  await criticalTask.save();
  
  await rescheduleOnTaskUpdate(criticalTask._id);
  
  const alert = await Alert.findOne({ farm: farm._id, title: new RegExp(criticalTask.title) });
  console.log("Alert generated:", alert ? alert.message : "NO ALERT FOUND");
  
  await mongoose.disconnect();
}
run();
