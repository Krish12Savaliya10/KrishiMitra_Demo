const ScheduleTask = require("../models/ScheduleTask");
const CropPlan = require("../models/CropPlan");
const Alert = require("../models/Alert");
const Notification = require("../models/Notification");

async function performDailyRollover() {
  console.log("[Rollover Service] Starting daily rollover processing...");
  
  // Calculate today at 00:00:00 IST (UTC+5:30)
  const now = new Date();
  
  // Offset to IST (+5:30)
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(now.getTime() + istOffset);
  
  // Start of today in IST
  istTime.setUTCHours(0, 0, 0, 0);
  
  // Convert back to UTC for MongoDB queries
  const todayStartUTC = new Date(istTime.getTime() - istOffset);

  try {
    // 1. Update Schedule Tasks
    // Any task that was scheduled for before today (in local time) and is still "pending" becomes "delayed".
    // Grab the tasks BEFORE updating so we know who to notify and which ones
    // are high-priority/critical enough to escalate into an Alert.
    const overdueTasks = await ScheduleTask.find({
      date: { $lt: todayStartUTC },
      status: "pending",
    });

    const taskResult = await ScheduleTask.updateMany(
      { 
        date: { $lt: todayStartUTC },
        status: "pending" 
      },
      { 
        $set: { status: "delayed" } 
      }
    );
    console.log(`[Rollover Service] Marked ${taskResult.modifiedCount} pending past tasks as delayed.`);

    // 1b. Every missed task gets a notification. Missed HIGH-priority /
    // critical ("must-do") tasks additionally raise (or reuse) an Alert so
    // they show up in the Risk Alerts view, not just the notification bell.
    for (const task of overdueTasks) {
      await Notification.create({
        owner: task.owner,
        type: "schedule",
        title: "Task not completed",
        message: `"${task.title}" was due ${task.date.toDateString()} and is still pending. It has been marked delayed.`,
        refModel: "ScheduleTask",
        refId: task._id,
        isRead: false,
      });

      if (task.isCritical || task.priority === "high") {
        const existing = await Alert.findOne({
          owner: task.owner,
          category: "schedule_delay",
          status: "active",
          message: { $regex: task._id.toString() },
        });
        if (!existing) {
          await Alert.create({
            owner: task.owner,
            farm: task.farm,
            category: "schedule_delay",
            severity: task.isCritical ? "critical" : "warning",
            riskScorePct: task.isCritical ? 85 : 60,
            title: `High-priority task missed: ${task.title}`,
            message: `"${task.title}" (priority: ${task.priority}) was not completed by its due date (${task.date.toDateString()}). Missing must-do stages can affect yield — refId:${task._id}`,
            status: "active",
          });
        }
      }
    }

    // 2. Update Crop Plans
    // Find all active crop plans
    const activePlans = await CropPlan.find({ status: "active" });
    let plansUpdated = 0;

    for (const plan of activePlans) {
      let isModified = false;
      
      // Calculate season progress pct
      const sowingTime = plan.sowingDate.getTime();
      const harvestTime = plan.expectedHarvestDate.getTime();
      const currentTime = todayStartUTC.getTime();
      
      let progress = 0;
      if (currentTime >= harvestTime) {
        progress = 100;
      } else if (currentTime > sowingTime) {
        const totalDuration = harvestTime - sowingTime;
        const elapsed = currentTime - sowingTime;
        progress = Math.round((elapsed / totalDuration) * 100);
      }
      
      if (plan.seasonProgressPct !== progress) {
        plan.seasonProgressPct = progress;
        isModified = true;
      }

      // Update milestones
      if (plan.milestones && plan.milestones.length > 0) {
        plan.milestones.forEach(m => {
          if (!m.plannedDate) return;
          const milestoneTime = m.plannedDate.getTime();
          
          if (milestoneTime < currentTime && m.status === "pending") {
            m.status = "delayed";
            isModified = true;
          } else if (milestoneTime === currentTime && m.status === "pending") {
            m.status = "in-progress";
            isModified = true;
          }
        });
      }
      
      if (isModified) {
        await plan.save();
        plansUpdated++;
      }
    }
    
    console.log(`[Rollover Service] Updated ${plansUpdated} active crop plans.`);
    console.log("[Rollover Service] Daily rollover processing complete.");
    return { success: true, tasksUpdated: taskResult.modifiedCount, plansUpdated };
  } catch (error) {
    console.error("[Rollover Service] Error during rollover:", error);
    return { success: false, error: error.message };
  }
}

module.exports = { performDailyRollover };
