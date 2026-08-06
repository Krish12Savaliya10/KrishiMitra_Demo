import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Check, ChevronRight, Clock, Plus, SkipForward, Sparkles, Timer, Loader2 } from "lucide-react";
import { useAppData } from "@/lib/AppDataContext";
import { PageHeader } from "@/components/app/AppShell";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FarmSwitcher } from "@/components/app/FarmSwitcher";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || (typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api");
const ML_URL  = import.meta.env.VITE_ML_URL  || "http://localhost:5005";

export const Route = createFileRoute("/_app/schedule")({
  head: () => ({
    meta: [
      { title: "Daily Schedule — KrishiMitra" },
      {
        name: "description",
        content: "Your practical daily and weekly farm task schedule with priorities and actions.",
      },
    ],
  }),
  component: SchedulePage,
});

const priorityStyle = {
  high: "bg-destructive/12 text-destructive ring-1 ring-destructive/25",
  medium: "bg-warning/12 text-warning ring-1 ring-warning/25",
  low: "bg-cyan/12 text-cyan ring-1 ring-cyan/25",
};

const CATEGORIES = ["Irrigation", "Crop Health", "Nutrition", "Equipment", "Monitoring", "Labour", "Other"];
const PRIORITIES = ["high", "medium", "low"];

function SchedulePage() {
  const { activeFarmId, activeFarm, token, fetchScoped, postScoped } = useAppData();
  const [tasks, setTasks] = useState([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [note, setNote] = useState("");
  const [recommendation, setRecommendation] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    time: "",
    category: "Irrigation",
    priority: "medium",
  });

  const toLocalISODate = (dateVal) => {
    const d = new Date(dateVal);
    const offset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - offset).toISOString().split("T")[0];
  };

  const [selectedDateStr, setSelectedDateStr] = useState(() => toLocalISODate(new Date()));

  const datesRibbon = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    const arr = [];
    for (let i = -3; i <= 14; i++) {
      const nextD = new Date(d);
      nextD.setDate(d.getDate() + i);
      arr.push(nextD);
    }
    return arr;
  }, []);

  const tasksByDate = useMemo(() => {
    const groups = {};
    tasks.forEach((t) => {
      const dateStr = t.date ? toLocalISODate(t.date) : toLocalISODate(new Date());
      if (!groups[dateStr]) groups[dateStr] = [];
      groups[dateStr].push(t);
    });
    return groups;
  }, [tasks]);

  const displayedTasks = tasksByDate[selectedDateStr] || [];

  const fetchTasks = useCallback(async () => {
    if (!activeFarmId || !token) return;
    try {
      const data = await fetchScoped("/schedule");
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  }, [activeFarmId, token, fetchScoped]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Fetch a RAG-powered recommendation for the first pending high-priority task
  useEffect(() => {
    const topTask = tasks.find((t) => t.status === "pending" && t.priority === "high")
      || tasks.find((t) => t.status === "pending");
    if (!topTask) return;
    fetch(`${ML_URL}/api/crop_stage_tips`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        crop: topTask.title?.split("—")[1]?.trim() || "Soybean",
        stage: topTask.title?.split("—")[0]?.trim() || topTask.category,
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.found && d.tips?.key_tasks?.length) {
          setRecommendation({ task: topTask.title, tip: d.tips.key_tasks[0], whyItMatters: d.tips.why_it_matters });
        } else {
          setRecommendation({ task: topTask.title, tip: topTask.fieldNotes || null, whyItMatters: null });
        }
      })
      .catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks.length]);

  const setStatus = async (id, status) => {
    setTasks((ts) => ts.map((t) => (t._id === id || t.id === id ? { ...t, status } : t)));
    try {
      await fetch(`${API_URL}/schedule/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
    } catch (err) {
      console.error("Failed to update task status:", err);
      toast.error("Could not update task status");
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!activeFarmId) return toast.error("Select a farm first");
    setIsSubmitting(true);
    try {
      let combinedDate = new Date(formData.date);
      if (formData.time) {
        const [hours, minutes] = formData.time.split(":");
        combinedDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      }
      const res = await postScoped("/schedule", {
        title: formData.title,
        date: combinedDate.toISOString(),
        category: formData.category,
        priority: formData.priority,
        status: "pending",
      });
      if (res && res._id) {
        setIsAddOpen(false);
        setFormData({ title: "", date: new Date().toISOString().split("T")[0], time: "", category: "Irrigation", priority: "medium" });
        fetchTasks();
        toast.success("Task added");
      } else {
        toast.error("Failed to add task");
      }
    } catch (err) {
      toast.error("Error adding task");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveNote = async () => {
    if (!note.trim()) return;
    if (!activeFarmId) return toast.error("Select a farm first");
    setIsSavingNote(true);
    try {
      // Save note as a special Monitoring task so it persists in DB
      const res = await postScoped("/schedule", {
        title: `Field note: ${note.trim().slice(0, 80)}`,
        category: "Monitoring",
        priority: "low",
        status: "done",
        date: new Date().toISOString(),
      });
      if (res && res._id) {
        toast.success("Field note saved to schedule");
        setNote("");
        fetchTasks();
      } else {
        toast.error("Failed to save note");
      }
    } catch (err) {
      toast.error("Error saving note");
    } finally {
      setIsSavingNote(false);
    }
  };

  const done = displayedTasks.filter((t) => t.status === "done").length;
  const today = new Date(selectedDateStr).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div>
      <PageHeader
        title="Daily Schedule"
        subtitle={`${today} · ${done} of ${displayedTasks.length} tasks complete`}
        action={
          <div className="flex items-center gap-2">
            <FarmSwitcher />
            <button
              onClick={() => setIsAddOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-[0_0_24px_-8px_var(--color-primary)] transition-transform hover:scale-[1.03]"
            >
              <Plus className="h-3.5 w-3.5" /> Add task
            </button>
          </div>
        }
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Task list */}
        <section className="space-y-4 lg:col-span-2">
          {/* Date Ribbon */}
          <div className="flex w-full gap-3 overflow-x-auto pb-4 pt-1 scrollbar-hide snap-x">
            {datesRibbon.map((d) => {
              const dateStr = toLocalISODate(d);
              const isSelected = dateStr === selectedDateStr;
              const dayTasks = tasksByDate[dateStr] || [];
              
              const hasSpray = dayTasks.some(t => t.title.toLowerCase().includes("spray"));
              const hasRain = dayTasks.some(t => t.title.toLowerCase().includes("rain"));
              
              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDateStr(dateStr)}
                  className={`flex w-[100px] shrink-0 snap-start flex-col items-center justify-center gap-1 rounded-[1.25rem] border p-3 transition-all ${
                    isSelected
                      ? "border-primary/50 bg-primary/10 text-primary"
                      : "border-border/50 bg-secondary/20 text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                  }`}
                >
                  <div className="text-[13px] font-semibold">
                    {d.toLocaleDateString("en-US", { weekday: "short", day: "numeric" })}
                  </div>
                  <div className="text-[10px] opacity-70">
                    {dayTasks.length} {dayTasks.length === 1 ? "task" : "tasks"}
                  </div>
                  {(hasSpray || hasRain) && (
                    <div className="mt-1 text-[10px] font-medium text-warning">
                      {hasSpray ? "Spray day" : "Rain likely"}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="space-y-2.5">
            {displayedTasks.length === 0 ? (
            <div className="glass grid place-items-center rounded-2xl p-12 text-center">
              <div className="text-sm font-medium text-muted-foreground">No tasks for today.</div>
              <button
                onClick={() => setIsAddOpen(true)}
                className="mt-3 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
              >
                Add your first task
              </button>
            </div>
            ) : (
              displayedTasks.map((t) => (
                <div
                key={t._id || t.id}
                className={`glass ring-glow rounded-2xl p-4 transition-opacity ${
                  t.status === "done" || t.status === "skipped" ? "opacity-60" : ""
                }`}
              >
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 sm:flex sm:items-center">
                  <div className="flex min-w-0 items-start gap-3 sm:flex-1 sm:items-center">
                    <button
                      onClick={() => setStatus(t._id || t.id, t.status === "done" ? "pending" : "done")}
                      aria-label="Toggle done"
                      className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg border transition-all sm:mt-0 ${
                        t.status === "done"
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {t.status === "done" && <Check className="h-3.5 w-3.5" />}
                    </button>
                    <div className="min-w-0">
                      <div
                        className={`text-sm ${t.status === "done" ? "text-muted-foreground line-through" : "font-medium"}`}
                      >
                        {t.title}
                      </div>
                      <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {t.date ? new Date(t.date).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : "—"}
                        </span>
                        <span>·</span>
                        <span>{t.category}</span>
                        {t.status === "delayed" && (
                          <span className="font-semibold text-warning">· Delayed</span>
                        )}
                        {t.status === "skipped" && (
                          <span className="font-semibold text-muted-foreground">· Skipped</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${priorityStyle[t.priority] || "bg-secondary text-muted-foreground"}`}
                    >
                      {t.priority}
                    </span>
                  </div>
                </div>
                {t.status !== "done" && (
                  <div className="mt-3 flex gap-2 pl-9">
                    <ActionBtn onClick={() => setStatus(t._id || t.id, "done")} icon={Check} label="Done" tone="primary" />
                    <ActionBtn onClick={() => setStatus(t._id || t.id, "delayed")} icon={Timer} label="Delay" tone="warning" />
                    <ActionBtn onClick={() => setStatus(t._id || t.id, "skipped")} icon={SkipForward} label="Skip" tone="muted" />
                  </div>
                )}
              </div>
            ))
          )}
          </div>
        </section>

        {/* Side panel */}
        <section className="space-y-4">
          <div className="glass relative overflow-hidden rounded-2xl p-5">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/15 blur-3xl" />
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h2 className="text-xs font-semibold">Next recommendation</h2>
            </div>
            {recommendation?.tip ? (
              <>
                <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
                  <b className="text-foreground">{recommendation.task?.split("—")[0]?.trim() || "Top task"}:</b>{" "}
                  {recommendation.tip}
                </p>
                {recommendation.whyItMatters && (
                  <p className="mt-1 text-[11px] italic text-muted-foreground/70">💡 {recommendation.whyItMatters}</p>
                )}
              </>
            ) : (
              <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
                {displayedTasks.find((t) => t.status === "pending")
                  ? `Complete your next pending task: ${displayedTasks.find((t) => t.status === "pending")?.title}`
                  : "All tasks done for this day — great work! 🌾"}
              </p>
            )}
            <button
              onClick={() => window.location.href = "/ai-saathi"}
              className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
            >
              Ask AI Mitra for details <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          <div className="glass rounded-2xl p-5">
            <h2 className="text-xs font-semibold">Notes</h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a field note for today… e.g. 'Row 6 showing slight yellowing near bund.'"
              rows={4}
              className="mt-2.5 w-full resize-none rounded-xl border border-input bg-secondary/40 p-3 text-xs outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/50"
            />
            <button
              onClick={handleSaveNote}
              disabled={isSavingNote || !note.trim()}
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-secondary py-2 text-[11px] font-semibold transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
            >
              {isSavingNote ? <><Loader2 className="h-3 w-3 animate-spin" /> Saving…</> : "Save note"}
            </button>
          </div>

          <div className="glass rounded-2xl p-5">
            <h2 className="text-xs font-semibold">Day's completion</h2>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-cyan transition-all duration-500"
                style={{ width: displayedTasks.length > 0 ? `${(done / displayedTasks.length) * 100}%` : "0%" }}
              />
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground">
              {done}/{displayedTasks.length} complete · keep up the momentum!
            </div>
          </div>
        </section>
      </div>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogDescription>Schedule a new farm task for today.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddTask} className="grid gap-4 py-4">
            <div>
              <label className="mb-1 block text-[11px] font-medium text-muted-foreground">Task title</label>
              <input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none focus:border-primary/50" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-[11px] font-medium text-muted-foreground">Date</label>
                <input required type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none focus:border-primary/50" />
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-medium text-muted-foreground">Time</label>
                <input type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none focus:border-primary/50" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium text-muted-foreground">Category</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none focus:border-primary/50">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium text-muted-foreground">Priority</label>
              <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} className="w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none focus:border-primary/50">
                {PRIORITIES.map((p) => <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>)}
              </select>
            </div>
            <button disabled={isSubmitting} type="submit" className="w-full rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.02]">
              {isSubmitting ? "Adding..." : "Add Task"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ActionBtn({ onClick, icon: Icon, label, tone }) {
  const cls =
    tone === "primary"
      ? "hover:border-primary/40 hover:text-primary"
      : tone === "warning"
        ? "hover:border-warning/40 hover:text-warning"
        : "hover:border-border hover:text-foreground";
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-[10px] font-semibold text-muted-foreground transition-colors ${cls}`}
    >
      <Icon className="h-3 w-3" /> {label}
    </button>
  );
}
