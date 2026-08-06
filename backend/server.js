require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/error.middleware");

const crudFactory = require("./controllers/crudFactory");
const buildCrudRoutes = require("./routes/crudRoutes");

const Farm = require("./models/Farm");

const CropPlan = require("./models/CropPlan");
const ScheduleTask = require("./models/ScheduleTask");
const Recommendation = require("./models/Recommendation");
const Alert = require("./models/Alert");
const Expense = require("./models/Expense");
const Notification = require("./models/Notification");

connectDB();

// Scheduled Background Jobs
const cron = require("node-cron");
const { syncDailyMarketData } = require("./services/marketSyncService");
const { performDailyRollover } = require("./services/rolloverService");

// Run market sync every day at 2:00 AM
cron.schedule("0 2 * * *", () => {
  console.log("Running scheduled daily market data sync...");
  syncDailyMarketData();
});

// Run daily rollover every day at midnight (IST aligned if server is in UTC)
// Since cron runs in server time, this triggers at 00:00 server time.
// We can use timezone option to run it strictly at 00:00 Asia/Kolkata
cron.schedule("0 0 * * *", () => {
  console.log("Running scheduled daily rollover...");
  performDailyRollover();
}, { timezone: "Asia/Kolkata" });

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("dev"));

// Auth
app.use("/api/auth", require("./routes/auth.routes"));

// AI Mitra chatbot (Ollama)
app.use("/api/chat", require("./routes/chat.routes"));

// Disease prediction
app.use("/api/disease", require("./routes/disease.routes"));

// Standard CRUD resources — each is owner-scoped automatically via crudFactory
app.use("/api/farms", buildCrudRoutes(crudFactory(Farm)));

app.use("/api/crop-plans", require("./routes/cropPlan.routes"));

// Custom route to simulate rollover for testing
app.post("/api/schedule/simulate-rollover", async (req, res) => {
  const result = await performDailyRollover();
  if (result.success) {
    res.json(result);
  } else {
    res.status(500).json(result);
  }
});

app.use("/api/schedule", buildCrudRoutes(crudFactory(ScheduleTask)));
app.use("/api/recommendations", buildCrudRoutes(crudFactory(Recommendation)));
app.use("/api/alerts", buildCrudRoutes(crudFactory(Alert)));
app.use("/api/expenses", buildCrudRoutes(crudFactory(Expense)));
app.use("/api/notifications", buildCrudRoutes(crudFactory(Notification)));
app.use("/api/market", require("./routes/market.routes"));
app.use("/api/weather", require("./routes/weather.routes"));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`KrishiMitra API running on port ${PORT}`));
// Restart trigger
