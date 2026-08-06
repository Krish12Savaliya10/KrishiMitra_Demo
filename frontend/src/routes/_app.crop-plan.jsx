import { createFileRoute } from "@tanstack/react-router";
import { CalendarRange, CheckCircle2, Flag, Sparkles, Sprout, Droplets, FlaskConical, AlertTriangle, Eye } from "lucide-react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useAppData } from "@/lib/AppDataContext";
import { PageHeader } from "@/components/app/AppShell";
import { FarmSwitcher } from "@/components/app/FarmSwitcher";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { subscribeAiSyncRefresh } from "@/lib/aiSyncEvents";

const API_URL = import.meta.env.VITE_API_URL || (typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api");

export const Route = createFileRoute("/_app/crop-plan")({
  validateSearch: (search) => ({
    crop: search.crop || undefined,
  }),
  head: () => ({
    meta: [
      { title: "Crop Plan — KrishiMitra" },
      {
        name: "description",
        content: "Your soybean crop roadmap: growth stages, timeline, key tasks and milestones.",
      },
    ],
  }),
  component: CropPlanPage,
});

// Fallback demo stages when no data in DB
const demoCropStages = [
  { _id: "s1", stage: "Land Prep & Sowing", window: "Jun 15 – Jun 28", status: "done", tasks: 6 },
  { _id: "s2", stage: "Germination & Establishment", window: "Jun 28 – Jul 12", status: "done", tasks: 4 },
  { _id: "s3", stage: "Vegetative Growth", window: "Jul 12 – Aug 05", status: "active", tasks: 9 },
  { _id: "s4", stage: "Flowering", window: "Aug 05 – Aug 22", status: "upcoming", tasks: 7 },
  { _id: "s5", stage: "Pod Development", window: "Aug 22 – Sep 15", status: "upcoming", tasks: 5 },
  { _id: "s6", stage: "Maturity & Harvest", window: "Sep 15 – Oct 02", status: "upcoming", tasks: 6 },
];

const milestones = [
  { label: "First flowering expected", date: "Aug 07", tone: "primary" },
  { label: "Critical irrigation checkpoint", date: "Aug 18", tone: "cyan" },
  { label: "Pod-fill nutrition window", date: "Aug 26", tone: "warning" },
  { label: "Harvest readiness assessment", date: "Sep 20", tone: "primary" },
];

// Stage-to-major-activities mapping for display
const STAGE_ACTIVITIES = {
  "Land Preparation":          ["Deep Ploughing", "FYM Application", "Levelling", "Soil Testing"],
  "Pit Preparation":           ["Pit Digging", "Compost Filling", "Drainage Layout"],
  "Sowing":                    ["Seed Treatment", "Sowing", "First Irrigation", "Gap Filling"],
  "Sett Planting":             ["Sett Preparation", "Furrow Planting", "First Irrigation"],
  "Rhizome Planting":          ["Rhizome Treatment", "Bed Planting", "Mulching"],
  "Nursery":                   ["Nursery Bed Prep", "Seed Sowing", "Damping-off Watch", "Irrigation"],
  "Germination":               ["Germination Count", "Gap Filling", "Light Irrigation", "Weed Removal"],
  "Planting":                  ["Transplanting", "First Irrigation", "Mulching", "Gap Filling"],
  "Transplanting":             ["Evening Transplanting", "First Irrigation", "Staking", "Gap Filling"],
  "Crop Establishment":        ["Gap Filling", "Irrigation", "Thrips Scouting", "Weed Control"],
  "Seedling Growth":           ["Thinning", "Weed Removal", "First Irrigation", "Growth Check"],
  "Seedling Stage":            ["Thinning", "Earthing-Up", "Weed Scout", "N Top-Dress"],
  "Seedling Establishment":    ["Gap Filling", "Thinning", "Weed Control", "First Irrigation"],
  "Vegetative Growth":         ["Irrigation", "N Top-Dressing", "Weed Control", "Pest Scouting"],
  "Active Vegetative Growth":  ["Desuckering", "Fertilizer Dose", "Disease Scout", "Irrigation"],
  "Early Vegetative Growth":   ["Desuckering", "Mulch Refresh", "Sigatoka Scouting", "Irrigation"],
  "Tillering":                 ["Irrigation (CRI)", "N Top-Dress", "Weed Control", "Tiller Count"],
  "Sprouting":                 ["Mulching", "Irrigation", "Earthing-Up", "Sprout Count"],
  "Branching":                 ["Irrigation", "Pod Borer Scout", "Weed Control", "Growth Check"],
  "Jointing":                  ["Irrigation", "Rust Monitoring", "N Application", "Lodging Check"],
  "Squaring":                  ["Square Count", "Bollworm Monitoring", "Fertilizer", "Whitefly Scout"],
  "Flowering":                 ["Flower Monitoring", "Irrigation", "Micronutrient Spray", "Pest Scout"],
  "Shooting / Flowering":      ["Shoot Monitoring", "Male Bud Removal", "Bunch Sleeving", "K Dose"],
  "Umbel Formation":           ["Irrigation", "Aphid Scout", "Weed Control", "Canopy Check"],
  "Tasseling / Silking":       ["Irrigation", "Fall Armyworm Scout", "Topdress", "Silking Watch"],
  "Button Stage (Bud)":        ["Irrigation", "Bud Count", "Bird Protection", "Fertilizer"],
  "Pod Filling":               ["Irrigation", "Pod Borer Scout", "K Dose", "Crop Check"],
  "Pod Development":           ["Pod Count", "Irrigation", "Pest Scout", "K Top-Dress"],
  "Pod (Siliqua) Development": ["Siliqua Count", "Aphid Scout", "Irrigation", "Crop Check"],
  "Bunch Development":         ["Bunch Fill Check", "Leaf Pruning", "K Dose", "Irrigation"],
  "Boll Development":          ["Boll Count", "K Spray", "Pink Bollworm Scout", "Irrigation"],
  "Boll Opening":              ["Boll Opening Count", "First Picking", "Contamination Check"],
  "Grain Filling":             ["Irrigation", "Bird Protection", "Pest Scout", "Grain Check"],
  "Primary Spike Initiation":  ["Raceme Count", "Capsule Borer Scout", "Semi-Looper Check"],
  "Primary Spike Flowering":   ["Spray", "Capsule Count", "Irrigation", "Pest Scout"],
  "Secondary Spike Development":["Irrigation", "Weeding", "Pest Scout", "Spray"],
  "Capsule Maturation":        ["Maturity Check", "Staggered Harvest", "Capsule Count"],
  "Rhizome Initiation":        ["Stop N", "K Application", "Rhizome Rot Check", "Reduce Irrigation"],
  "Rhizome Maturation":        ["Leaf Yellowing Check", "Stop Irrigation", "Harvest Prep"],
  "Bulb Initiation":           ["Stop N Fertilizer", "Reduce Irrigation", "Purple Blotch Scout"],
  "Bulb Development":          ["Neck Fall Check", "Drainage Inspection", "Final Irrigation"],
  "Maturity":                  ["Grain Hardness Test", "Stop Irrigation", "Harvest Prep"],
  "Maturation":                ["Pod Colour Check", "Stop Irrigation", "Yield Forecast"],
  "Maturation / Ripening":     ["Brix Reading", "Irrigation Cutoff", "Harvest Scheduling"],
  "Maturity / Drying":         ["Grain Moisture Check", "Harvest Timing", "Equipment Prep"],
  "Ripening":                  ["Brix Check", "Field Drainage", "Mill Booking"],
  "Grand Growth":              ["Irrigation", "Trash Mulching", "Red Rot Scout", "Propping"],
  "Seed Formation":            ["Irrigation", "Pest Scout", "Canopy Check"],
  "Seed Maturation":           ["Moisture Check", "Pre-Harvest Check", "Equipment Prep"],
  "Seed Development":          ["Bird Protection", "Irrigation", "Blight Scout"],
  "Fruiting":                  ["Fruit Borer Scout", "K Spray", "Irrigation", "Blight Check"],
  "Multiple Pickings":         ["Red-Green Picking", "K Spray", "Pest Scout"],
  "First Harvest":             ["Maturity Check", "Picking at 80% Colour", "Post-Harvest"],
  "Pegging":                   ["Gypsum Application", "Earthing-Up", "Leaf Spot Spray"],
  "Tuber Initiation":          ["Irrigation", "Blight Scout", "Earthing-Up"],
  "Tuber Bulking":             ["Irrigation", "K Dose", "Blight Control"],
  "Sprouting":                 ["Mulch Check", "Irrigation", "Earthing-Up"],
  "Panicle Initiation":        ["Blast Scout", "N Panicle Dose", "Irrigation"],
  "Heading":                   ["Aphid Scout", "Irrigation", "Ear Emergence Check"],
  "Heading / Ear Emergence":   ["Rust Scout", "Irrigation", "N Top-Dress"],
  "Heading / Flowering":       ["Blast Check", "BPH Scout", "Irrigation"],
  "Tillering":                 ["Irrigation", "N Top-Dress", "Tiller Count", "Weed Control"],
  "Harvest":                   ["Harvest Operation", "Threshing", "Drying", "Storage", "Yield Recording"],
  "Germination":               ["Germination Count", "Gap Filling", "Irrigation", "Weed Removal"],
  "Pit Preparation":           ["Pit Digging", "Compost Filling", "Drainage Layout"],
};

function getStageActivities(stageName, majorTasks) {
  // Use pre-defined activities map if available
  const mapped = STAGE_ACTIVITIES[stageName];
  if (mapped && mapped.length > 0) return mapped.slice(0, 4);
  // Fall back to actual task titles from DB (strip crop name suffix)
  if (majorTasks && majorTasks.length > 0) {
    return majorTasks.map(t => t.split(" — ")[0].replace(/ begins$/, "").trim()).filter(Boolean).slice(0, 4);
  }
  return ["Field Monitoring", "Irrigation", "Crop Check"];
}

function CropPlanPage() {
  const search = Route.useSearch();
  const ML_URL = import.meta.env.VITE_ML_URL || "http://localhost:5005";
  const { activeFarmId, activeFarm, token, fetchScoped } = useAppData();
  const [cropPlans, setCropPlans] = useState([]);
  const [planTasks, setPlanTasks] = useState([]);
  const navigate = useNavigate();
  const [stageTips, setStageTips] = useState(null);
  const [stageTipsLoading, setStageTipsLoading] = useState(false);
  
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [previewPlan, setPreviewPlan] = useState(null);
  const [aiForm, setAiForm] = useState({ cropName: "" });
  const [supportedCrops, setSupportedCrops] = useState([]);
  const [isMidwayModalOpen, setIsMidwayModalOpen] = useState(false);
  const [midwayPercent, setMidwayPercent] = useState(50);
  const [isStartingMidway, setIsStartingMidway] = useState(false);
  const [isDropping, setIsDropping] = useState(false);

  useEffect(() => {
    if (search.crop) {
      setAiForm(prev => ({ ...prev, cropName: search.crop }));
      setIsAiModalOpen(true);
    }
  }, [search.crop]);

  useEffect(() => {
    fetch(`${API_URL}/crop-plans/supported-crops`)
      .then(r => r.json())
      .then(data => setSupportedCrops(Array.isArray(data) ? data : []))
      .catch(err => console.error("Failed to load supported crops:", err));
  }, []);

  const handleAiSubmit = async (e) => {
    e.preventDefault();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    let computedSeason = "Zaid";
    if (month >= 5 && month <= 9) computedSeason = "Kharif";
    else if (month >= 10 || month <= 2) computedSeason = "Rabi";
    computedSeason = `${computedSeason} ${year}`;
    
    const area = activeFarm?.areaAcres || 1;
    const irrigation = activeFarm?.waterResources?.length > 0 ? activeFarm.waterResources.join(', ') : "Rainfed";
    const prompt = `@cropPlan Generate a crop plan. Crop: ${aiForm.cropName}, Season: ${computedSeason}, Area: ${area} acres, Irrigation: ${irrigation}.`;
    
    setIsGenerating(true);
    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          message: prompt,
          sessionId: `s-${Date.now()}`,
          farmId: activeFarmId,
          forceJson: true
        }),
      });
      if (!res.ok) throw new Error("Failed to generate plan");
      
      const data = await res.json();
      if (data && data.result) {
        setPreviewPlan(data.result);
        setIsAiModalOpen(false);
      } else {
        toast.error("AI failed to output a valid plan format.");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSavePreview = async (replace = true) => {
    if (!activeFarmId) {
      toast.error("No farm selected. Please select a farm before saving.");
      return;
    }
    if (!previewPlan) {
      toast.error("No plan to save. Please generate a plan first.");
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch(`${API_URL}/chat/sync-plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ syncData: previewPlan, farmId: activeFarmId, replace })
      });
      
      if (!res.ok) {
        // Read the actual error body from the server to surface the real reason
        let errMsg = `Server error ${res.status}`;
        try {
          const errBody = await res.json();
          errMsg = errBody.message || errBody.error || errMsg;
        } catch (_) { /* ignore JSON parse failure */ }
        throw new Error(errMsg);
      }
      
      const data = await res.json();
      
      if (data.warnings && data.warnings.length > 0) {
        data.warnings.forEach(w => toast.warning(w));
      }
      
      if (data.tasksGenerated > 0 && (!data.warnings || data.warnings.length === 0)) {
        toast.success(`Plan saved! ${data.tasksGenerated} tasks generated.`);
      } else if (data.tasksGenerated > 0) {
        toast.success(`Plan saved with ${data.tasksGenerated} tasks (see warnings).`);
      } else {
        toast.warning("Plan saved, but no tasks were generated. Check your crop plan.");
      }
      
      setPreviewPlan(null);
      fetchCropPlans();
      subscribeAiSyncRefresh("cropPlan");
    } catch (err) {
      console.error("[CropPlan] Save failed:", err);
      toast.error(err.message || "Failed to save plan. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const fetchCropPlans = useCallback(async () => {
    if (!activeFarmId || !token) return;
    try {
      const data = await fetchScoped("/crop-plans");
      setCropPlans(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  }, [activeFarmId, token, fetchScoped]);

  const activePlan = cropPlans[0];

  useEffect(() => {
    fetchCropPlans();
  }, [fetchCropPlans]);

  const handleStartMidway = async () => {
    if (!activePlan?._id || !token) return;
    setIsStartingMidway(true);
    try {
      const res = await fetch(`${API_URL}/crop-plans/${activePlan._id}/start-daily-schedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ startPercent: midwayPercent }),
      });
      if (!res.ok) throw new Error("Failed to start daily schedule");
      const data = await res.json();
      toast.success(`Daily tasks now start at day ${data.startDay} of ${data.durationDays} — ${data.tasksGenerated} tasks generated.`);
      setIsMidwayModalOpen(false);
      fetchCropPlans();
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setIsStartingMidway(false);
    }
  };

  // Drop the current crop plan (and its daily tasks) so the farmer can start
  // growing something new without the old plan's tasks lingering in the
  // Schedule page alongside the new ones.
  const handleDropPlan = async () => {
    if (!activePlan?._id || !token) return;
    const confirmed = window.confirm(
      `Drop the current ${activePlan.cropName} plan and all its daily tasks? This can't be undone. You can then generate a plan for a new crop.`
    );
    if (!confirmed) return;
    setIsDropping(true);
    try {
      const res = await fetch(`${API_URL}/crop-plans/${activePlan._id}/drop`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to drop plan");
      const data = await res.json();
      toast.success(`Dropped ${activePlan.cropName} plan${data.tasksRemoved ? ` and ${data.tasksRemoved} tasks` : ""}.`);
      await fetchCropPlans();
      setIsAiModalOpen(true);
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setIsDropping(false);
    }
  };

  useEffect(() => {
    if (!activePlan?._id || !token) {
      setPlanTasks([]);
      return;
    }

    fetch(`${API_URL}/crop-plans/${activePlan._id}/calendar`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => setPlanTasks(Array.isArray(data?.tasks) ? data.tasks : []))
      .catch(() => setPlanTasks([]));
  }, [activePlan?._id, token]);

  useEffect(() => {
    const unsubscribe = subscribeAiSyncRefresh(() => {
      fetchCropPlans();
    });
    return unsubscribe;
  }, [fetchCropPlans]);

  const cropStages = useMemo(() => {
    if (!activePlan?.milestones?.length) return demoCropStages;

    const sortedMilestones = [...activePlan.milestones].sort((a, b) => new Date(a.plannedDate) - new Date(b.plannedDate));
    const harvestDate = activePlan.expectedHarvestDate ? new Date(activePlan.expectedHarvestDate) : null;
    const oneDay = 24 * 60 * 60 * 1000;
    // FIX: truncate to midnight so a stage's *last calendar day* still counts
    // as "active" instead of tipping into "done"/"upcoming" depending on what
    // time of day it is right now (comparing a date-only boundary against a
    // full timestamp was why "current stage" sometimes failed to show at all).
    const toDayStart = (d) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
    const today = toDayStart(new Date());
    const fmt = (date) => date.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
    const dayDiff = (a, b) => Math.max(0, Math.round((toDayStart(b) - toDayStart(a)) / oneDay));

    return sortedMilestones.map((m, i) => {
      const start = toDayStart(m.plannedDate);
      const nextStart = sortedMilestones[i + 1]?.plannedDate ? toDayStart(sortedMilestones[i + 1].plannedDate) : null;
      const end = nextStart ? new Date(nextStart.getTime() - oneDay) : (harvestDate ? toDayStart(harvestDate) : start);
      const stageTasks = planTasks.filter((task) => {
        const taskDate = toDayStart(task.date);
        return taskDate >= start && taskDate <= end;
      });
      const stageTasksDone = stageTasks.filter((task) => task.status === "done").length;
      const majorTasks = stageTasks
        .filter((task) => task.priority === "high" || task.priority === "medium" || task.category !== "monitoring")
        .slice(0, 3)
        .map((task) => task.title);
      const fallbackMajorTasks = stageTasks.slice(0, 2).map((task) => task.title);
      // Stage status is date-driven (agronomic stages happen on a calendar,
      // not "whenever the farmer finishes ticking boxes"), but a milestone
      // explicitly marked "done" by the backend (e.g. past stages when a
      // plan is started mid-growth) always wins.
      const dateStatus = end < today ? "done" : start <= today && today <= end ? "active" : "upcoming";
      const status = m.status === "done" ? "done" : dateStatus;

      return {
        _id: m._id || `m${i}`,
        stage: m.stage,
        window: `${fmt(start)} - ${fmt(end)}`,
        gapDays: i === 0 ? 0 : dayDiff(sortedMilestones[i - 1].plannedDate, m.plannedDate),
        durationDays: Math.max(1, dayDiff(start, end) + 1),
        status,
        tasks: stageTasks.length,
        tasksDone: stageTasksDone,
        majorTasks: majorTasks.length ? majorTasks : fallbackMajorTasks,
      };
    });
  }, [activePlan, planTasks]);
  const cropName = activePlan ? `${activePlan.cropName} (${activePlan.variety || "—"})` : "Soybean (JS 20-98)";
  const sowingDate = activePlan?.sowingDate ? new Date(activePlan.sowingDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "22 Jun 2026";
  const harvestDate = activePlan?.expectedHarvestDate ? new Date(activePlan.expectedHarvestDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "Sep 25, 2026";
  const durationDays = activePlan?.sowingDate && activePlan?.expectedHarvestDate
    ? Math.max(1, Math.round((new Date(activePlan.expectedHarvestDate) - new Date(activePlan.sowingDate)) / (24 * 60 * 60 * 1000)))
    : 100;

  // Fetch RAG tips whenever the active stage changes
  const _activeCropName = activePlan?.cropName || "Soybean";
  const _activeStageForRag = cropStages?.find?.((s) => s.status === "active")?.stage || null;

  useEffect(() => {
    if (!_activeStageForRag) return;
    setStageTips(null);
    setStageTipsLoading(true);
    fetch(`${ML_URL}/api/crop_stage_tips`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ crop: _activeCropName, stage: _activeStageForRag }),
    })
      .then((r) => r.json())
      .then((d) => { if (d.found && d.tips) setStageTips(d.tips); })
      .catch(() => {})
      .finally(() => setStageTipsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_activeCropName, _activeStageForRag]);


  // ─── Progress calculation (CORRECT: elapsed days based) ──────────────────
  // Season progress = elapsed days / total crop duration
  const seasonProgress = useMemo(() => {
    if (!activePlan?.sowingDate || !durationDays) return 0;
    const today = new Date();
    const sowing = new Date(activePlan.sowingDate);
    const elapsed = Math.max(0, Math.round((today - sowing) / (1000 * 60 * 60 * 24)));
    return Math.min(100, Math.round((elapsed / durationDays) * 100));
  }, [activePlan?.sowingDate, durationDays]);

  // Stage progress = elapsed days within active stage / stage duration
  const stageProgress = useMemo(() => {
    if (!activePlan?.sowingDate || !activePlan?.milestones?.length) return 0;
    const today = new Date();
    const sowing = new Date(activePlan.sowingDate);
    const elapsed = Math.max(0, Math.round((today - sowing) / (1000 * 60 * 60 * 24)));
    const sortedMs = [...activePlan.milestones].sort((a, b) => new Date(a.plannedDate) - new Date(b.plannedDate));
    let activeMsIdx = 0;
    for (let i = 0; i < sortedMs.length; i++) {
      const msDay = Math.round((new Date(sortedMs[i].plannedDate) - sowing) / (1000 * 60 * 60 * 24));
      if (msDay <= elapsed) activeMsIdx = i;
      else break;
    }
    const nextMs = sortedMs[activeMsIdx + 1];
    const thisMs = sortedMs[activeMsIdx];
    const stageStartDay = Math.round((new Date(thisMs.plannedDate) - sowing) / (1000 * 60 * 60 * 24));
    const stageEndDay = nextMs ? Math.round((new Date(nextMs.plannedDate) - sowing) / (1000 * 60 * 60 * 24)) : durationDays;
    const stageDuration = Math.max(1, stageEndDay - stageStartDay);
    const daysIntoStage = Math.max(0, elapsed - stageStartDay);
    return Math.min(100, Math.round((daysIntoStage / stageDuration) * 100));
  }, [activePlan?.sowingDate, activePlan?.milestones, durationDays]);

  const done = cropStages.filter((s) => s.status === "done").length;
  const activeStage = cropStages.find((s) => s.status === "active");
  const currentDay = activePlan?.sowingDate
    ? Math.max(0, Math.round((new Date() - new Date(activePlan.sowingDate)) / (24 * 60 * 60 * 1000)))
    : done * 14;
  const planMilestones = activePlan
    ? cropStages.slice(0, 4).map((s, i) => ({
        label: s.stage,
        date: s.window.split(" - ")[0],
        tone: i === 0 ? "primary" : i === 1 ? "cyan" : "warning",
      }))
    : milestones;

  return (
    <div>
      <PageHeader
        title={`Crop Plan — ${cropName}`}
        subtitle={`Sown ${sowingDate} · Day ${currentDay} of ${durationDays}`}
        action={
          <div className="flex items-center gap-2">
            <FarmSwitcher />
            <button
              onClick={() => navigate({ to: "/schedule" })}
              className="flex items-center gap-1.5 rounded-xl bg-secondary px-4 py-2 text-xs font-semibold text-secondary-foreground transition-transform hover:scale-[1.03]"
            >
              <CalendarRange className="h-3.5 w-3.5" /> View Schedule
            </button>
            {activePlan && (
              <button
                onClick={() => setIsMidwayModalOpen(true)}
                className="flex items-center gap-1.5 rounded-xl border border-border bg-secondary/30 px-4 py-2 text-xs font-semibold transition-colors hover:bg-secondary"
                title="Crop already partway grown? Start daily tasks from today instead of from the sowing date."
              >
                <Flag className="h-3.5 w-3.5" /> Start Daily Tasks From Here
              </button>
            )}
            {activePlan && (
              <button
                onClick={handleDropPlan}
                disabled={isDropping}
                className="flex items-center gap-1.5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-2 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-60"
                title="Drop this crop plan and its daily tasks, then grow a new crop instead."
              >
                {isDropping ? "Dropping..." : "Drop Plan & Grow New Crop"}
              </button>
            )}
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-[0_0_24px_-8px_var(--color-primary)] transition-transform hover:scale-[1.03]"
            >
              <Sparkles className="h-3.5 w-3.5" /> Generate Plan with AI
            </button>
          </div>
        }
      />

      {isMidwayModalOpen && activePlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <h2 className="mb-2 flex items-center gap-2 text-lg font-bold text-foreground">
              <Flag className="h-5 w-5 text-primary" /> Start Daily Tasks From Here
            </h2>
            <p className="mb-4 text-sm text-muted-foreground">
              If <span className="font-medium text-foreground">{activePlan.cropName}</span> is already partway through its growth, jump daily tasks to that point instead of starting from the sowing date. Past milestones are marked done automatically.
            </p>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Crop growth reached: <span className="font-semibold text-foreground">{midwayPercent}%</span>
            </label>
            <input
              type="range"
              min={5}
              max={95}
              step={5}
              value={midwayPercent}
              onChange={(e) => setMidwayPercent(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
              <span>Just sown</span>
              <span>Half grown</span>
              <span>Near harvest</span>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setIsMidwayModalOpen(false)}
                className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-secondary/50"
              >
                Cancel
              </button>
              <button
                onClick={handleStartMidway}
                disabled={isStartingMidway}
                className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-[0_0_24px_-8px_var(--color-primary)] disabled:opacity-60"
              >
                {isStartingMidway ? "Starting..." : "Start Daily Tasks"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> Generate Crop Plan</h2>
            <form onSubmit={handleAiSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Crop Name</label>
                <select required value={aiForm.cropName} onChange={e => setAiForm({...aiForm, cropName: e.target.value})} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none">
                  <option value="">Select a crop...</option>
                  {supportedCrops.map(crop => <option key={crop} value={crop}>{crop}</option>)}
                </select>
              </div>
              <div className="rounded-lg bg-secondary/30 p-3 text-sm">
                <div className="flex justify-between border-b border-border/50 pb-2 mb-2">
                  <span className="text-muted-foreground">Farm</span>
                  <span className="font-medium">{activeFarm?.name || "Home Farm"}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2 mb-2">
                  <span className="text-muted-foreground">Area</span>
                  <span className="font-medium">{activeFarm?.areaAcres || 1} acres</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Water Source</span>
                  <span className="font-medium">
                    {activeFarm?.waterResources?.length > 0 ? activeFarm.waterResources.join(", ") : "Rainfed"}
                  </span>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setIsAiModalOpen(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary" disabled={isGenerating}>Cancel</button>
                <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-md hover:opacity-90 disabled:opacity-50" disabled={isGenerating}>
                  {isGenerating ? "Generating..." : "Generate Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {previewPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <h2 className="text-lg font-bold text-foreground mb-4">Preview AI Plan</h2>
            <div className="space-y-4">
              <div className="rounded-lg bg-secondary/30 p-3 text-sm">
                <div className="flex justify-between border-b border-border/50 pb-2 mb-2">
                  <span className="text-muted-foreground">Crop</span>
                  <span className="font-medium">{previewPlan.crop || previewPlan.cropPlan?.cropName || previewPlan.cropName}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2 mb-2">
                  <span className="text-muted-foreground">Season</span>
                  <span className="font-medium">{previewPlan.season || previewPlan.cropPlan?.season || previewPlan.season}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Generated Tasks</span>
                  <span className="font-medium">
                    {previewPlan.growth_stage_roadmap 
                      ? previewPlan.growth_stage_roadmap.reduce((acc, stage) => acc + (stage.daily_tasks?.length || stage.daily_tasks_count || 0), 0)
                      : (previewPlan.schedules?.length || previewPlan.tasks?.length || 0)}
                  </span>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Sowing Date</label>
                <input 
                  type="date" 
                  value={(previewPlan.sowing_date || previewPlan.cropPlan?.sowingDate || previewPlan.sowingDate || "").split("T")[0]} 
                  onChange={e => {
                    if (previewPlan.sowing_date !== undefined) {
                      setPreviewPlan({ ...previewPlan, sowing_date: e.target.value });
                    } else if (previewPlan.cropPlan) {
                      setPreviewPlan({ ...previewPlan, cropPlan: { ...previewPlan.cropPlan, sowingDate: e.target.value } });
                    } else {
                      setPreviewPlan({ ...previewPlan, sowingDate: e.target.value });
                    }
                  }}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none" 
                />
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <button onClick={() => handleSavePreview(true)} disabled={isSaving} className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md hover:opacity-90 disabled:opacity-60">
                  {isSaving ? "Saving..." : "Replace Current Plan"}
                </button>
                <button onClick={() => handleSavePreview(false)} disabled={isSaving} className="w-full rounded-lg border border-primary text-primary px-4 py-2.5 text-sm font-semibold hover:bg-primary/10 disabled:opacity-60">
                  {isSaving ? "Saving..." : "Keep Existing Plan (Add New)"}
                </button>
                <button type="button" onClick={() => setPreviewPlan(null)} disabled={isSaving} className="w-full rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary disabled:opacity-60">
                  Discard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary band */}
      <section className="glass mb-6 grid gap-5 rounded-2xl p-6 sm:grid-cols-4">
        {[
          [<Sprout key="i" className="h-4 w-4 text-primary" />, "Current stage", activeStage?.stage || "—"],
          [<CalendarRange key="i" className="h-4 w-4 text-cyan" />, "Est. duration", `${durationDays} days`],
          [<CheckCircle2 key="i" className="h-4 w-4 text-primary" />, "Stages complete", `${done} of ${cropStages.length}`],
          [<Flag key="i" className="h-4 w-4 text-warning" />, "Harvest target", harvestDate],
        ].map(([icon, l, v]) => (
          <div key={l} className="flex items-center gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-secondary/60 ring-1 ring-border">
              {icon}
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{l}</div>
              <div className="truncate text-sm font-semibold">{v}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Progress bar */}
      <div className="glass mb-6 rounded-2xl p-5">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="font-semibold">Season progress</span>
          <span className="font-display font-bold text-primary">{seasonProgress}%</span>
        </div>
        <div className="shimmer-line mt-2 h-2.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary via-primary/60 to-cyan transition-all duration-700"
            style={{ width: `${seasonProgress}%` }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
          <span>Sowing · {sowingDate}</span>
          <span className="text-primary font-medium">Day {currentDay} of {durationDays}</span>
          <span>Harvest · {harvestDate}</span>
        </div>
        {activeStage && (
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1">
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-muted-foreground">Current stage: <span className="text-foreground font-medium">{activeStage.stage}</span></span>
                <span className="text-primary font-semibold">{stageProgress}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-secondary/80">
                <div
                  className="h-full rounded-full bg-primary/60 transition-all duration-700"
                  style={{ width: `${stageProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {activePlan && (
        <section className="glass mb-6 rounded-2xl p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-sm font-semibold">Plan overview</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Stage timeline, key activities, and task distribution for your {activePlan.cropName} crop plan.
              </p>
            </div>
            <div className="rounded-xl bg-secondary/50 px-3 py-2 text-xs font-semibold text-muted-foreground">
              {planTasks.length} scheduled tasks
            </div>
          </div>
          <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
            {cropStages.map((stage) => {
              const activities = getStageActivities(stage.stage, stage.majorTasks);
              const statusColour =
                stage.status === "done" ? "border-primary/30 bg-primary/5" :
                stage.status === "active" ? "border-primary/50 bg-primary/8" :
                "border-border bg-background/40";
              return (
                <div key={`overview-${stage._id}`} className={`rounded-xl border p-3 transition-colors ${statusColour}`}>
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-xs font-semibold text-foreground">{stage.stage}</p>
                    <div className="flex items-center gap-1">
                      {stage.status === "done" && <span className="text-[9px] font-bold text-primary">✓ Done</span>}
                      {stage.status === "active" && <span className="text-[9px] font-bold text-primary animate-pulse">● Active</span>}
                      <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[9px] font-bold uppercase text-muted-foreground">
                        {stage.durationDays}d
                      </span>
                    </div>
                  </div>
                  <p className="mt-1 text-[10px] text-muted-foreground">{stage.window}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {activities.map((act) => (
                      <span key={act} className="rounded-md bg-secondary/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">{act}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Timeline */}
        <section className="lg:col-span-2">
          <h2 className="mb-3 font-display text-sm font-semibold text-muted-foreground">
            Growth stage roadmap
          </h2>
          <div className="relative space-y-3 pl-6">
            <span className="absolute bottom-4 left-[9px] top-4 w-px bg-gradient-to-b from-primary via-border to-border" />
            {cropStages.map((s, i) => (
              <div key={s._id || i} className="relative">
                <span
                  className={`absolute -left-6 top-5 grid h-5 w-5 place-items-center rounded-full text-[9px] font-bold ${
                    s.status === "done"
                      ? "bg-primary text-primary-foreground"
                      : s.status === "active"
                        ? "bg-primary/15 text-primary ring-2 ring-primary pulse-dot"
                        : "bg-secondary ring-1 ring-border"
                  }`}
                >
                  {s.status === "done" ? "✓" : ""}
                </span>
                <div
                  className={`glass rounded-2xl p-4 ${s.status === "active" ? "border-primary/35 glow-emerald" : ""} ${
                    s.status === "upcoming" ? "opacity-70" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3
                      className={`font-display text-sm font-semibold ${s.status === "active" ? "text-primary" : ""}`}
                    >
                      {s.stage}
                    </h3>
                    <span className="text-[11px] text-muted-foreground">{s.window}</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span>{s.durationDays || "—"} days</span>
                    <span>{s.tasks > 0 ? `${s.tasksDone}/${s.tasks} tasks done` : "0 tasks"}</span>
                    <span>{s.gapDays === 0 ? "Starts plan" : `Day ${s.gapDays}+`}</span>
                    {s.status === "active" && (
                      <span className="font-semibold text-primary">{stageProgress}% through stage</span>
                    )}
                    {s.status === "done" && <span className="text-primary/70">Completed ✓</span>}
                  </div>
                  {/* Major activities for this stage */}
                  <div className="mt-3 grid gap-1.5 text-[11px] sm:grid-cols-2">
                    {getStageActivities(s.stage, s.majorTasks).map((act) => (
                      <div key={`${s._id}-${act}`} className="rounded-lg bg-secondary/40 px-3 py-1.5 text-muted-foreground">
                        • {act}
                      </div>
                    ))}
                  </div>
                  {s.status === "active" && (
                    <div className="mt-3 space-y-3">
                      {/* Key tasks */}
                      {stageTipsLoading && (
                        <div className="text-[11px] text-muted-foreground animate-pulse">Loading field tips…</div>
                      )}
                      {!stageTipsLoading && stageTips?.key_tasks?.length > 0 && (
                        <div className="grid gap-2 text-[11px] sm:grid-cols-2">
                          {stageTips.key_tasks.map((t) => (
                            <div key={t} className="rounded-lg bg-secondary/40 px-3 py-1.5 text-muted-foreground">
                              • {t}
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Irrigation + Fertilizer strip */}
                      {!stageTipsLoading && stageTips && (
                        <div className="grid gap-2 sm:grid-cols-2">
                          {stageTips.irrigation && (
                            <div className="flex items-start gap-2 rounded-xl border border-border/60 bg-secondary/20 px-3 py-2">
                              <Droplets className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan" />
                              <div>
                                <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Irrigation</div>
                                <div className="text-[11px] text-foreground">{stageTips.irrigation}</div>
                              </div>
                            </div>
                          )}
                          {stageTips.fertilizer && (
                            <div className="flex items-start gap-2 rounded-xl border border-border/60 bg-secondary/20 px-3 py-2">
                              <FlaskConical className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
                              <div>
                                <div className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Fertilizer</div>
                                <div className="text-[11px] text-foreground">{stageTips.fertilizer}</div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                      {/* Watch for */}
                      {!stageTipsLoading && stageTips?.watch_for && (
                        <div className="flex items-start gap-2 rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-2">
                          <Eye className="mt-0.5 h-3.5 w-3.5 shrink-0 text-destructive" />
                          <div>
                            <div className="text-[9px] font-bold uppercase tracking-widest text-destructive/70">Watch for</div>
                            <div className="text-[11px] text-foreground">{stageTips.watch_for}</div>
                          </div>
                        </div>
                      )}
                      {/* Why it matters */}
                      {!stageTipsLoading && stageTips?.why_it_matters && (
                        <p className="text-[11px] italic text-muted-foreground">
                          💡 {stageTips.why_it_matters}
                        </p>
                      )}
                      {/* Critical badge */}
                      {!stageTipsLoading && stageTips?.critical && (
                        <div className="flex items-center gap-1.5">
                          <AlertTriangle className="h-3 w-3 text-destructive" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-destructive">Critical stage — do not skip</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Milestones + Summary */}
        <section>
          <h2 className="mb-3 font-display text-sm font-semibold text-muted-foreground">
            Key milestones
          </h2>
          <div className="glass rounded-2xl p-5">
            <div className="space-y-3.5">
              {planMilestones.map((m) => (
                <div key={m.label} className="flex items-center gap-3">
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-[10px] font-bold ${
                      m.tone === "primary"
                        ? "bg-primary/12 text-primary ring-1 ring-primary/25"
                        : m.tone === "cyan"
                          ? "bg-cyan/12 text-cyan ring-1 ring-cyan/25"
                          : "bg-warning/12 text-warning ring-1 ring-warning/25"
                    }`}
                  >
                    {m.date.split(" ")[1] || m.date}
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-xs font-medium">{m.label}</div>
                    <div className="text-[10px] text-muted-foreground">{m.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass mt-4 rounded-2xl p-5">
            <h3 className="text-xs font-semibold">Plan summary</h3>
            <dl className="mt-3 space-y-2 text-[11px]">
              {[
                ["Crop", activePlan?.cropName || "—"],
                ["Variety", activePlan?.variety || "—"],
                ["Area", activePlan?.areaAcres ? `${activePlan.areaAcres} acres` : "—"],
                ["Seed rate", activePlan?.seedRateKgPerAcre ? `${activePlan.seedRateKgPerAcre} kg/acre` : "—"],
                ["Estimated cost", activePlan?.estimatedCost ? `₹${activePlan.estimatedCost.toLocaleString("en-IN")}` : "—"],
                ["Target yield", activePlan?.targetYieldKg ? `${activePlan.targetYieldKg} kg/acre` : "—"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-border/60 pb-2 last:border-0">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>

    </div>
  );
}
