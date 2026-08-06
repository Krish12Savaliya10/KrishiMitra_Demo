import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Award, Leaf, MapPin, Pencil, Phone, Save, Scale, Sprout, Wind } from "lucide-react";
import { useAppData } from "@/lib/AppDataContext";
import { PageHeader } from "@/components/app/AppShell";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({
    meta: [
      { title: "Farmer Profile — KrishiMitra" },
      {
        name: "description",
        content: "Manage your personal details, farming preference mode and saved settings.",
      },
    ],
  }),
  component: ProfilePage,
});

const modes = [
  {
    id: "organic",
    icon: Leaf,
    label: "Organic",
    desc: "Bio-inputs only. Plans avoid synthetic fertilizers and pesticides entirely.",
  },
  {
    id: "moderate",
    icon: Scale,
    label: "Moderate",
    desc: "Balanced approach. Organic-first with targeted synthetic inputs when needed.",
  },
  {
    id: "flexible",
    icon: Wind,
    label: "Flexible",
    desc: "Yield-optimized. AI freely recommends the most effective available inputs.",
  },
];

function ProfilePage() {
  const { userProfile, farms, token, fetchDashboardData, fetchScoped, activeFarm } = useAppData();
  const [mode, setMode] = useState("moderate");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: userProfile?.name?.split(" ")[0] || "",
    lastName: userProfile?.name?.split(" ").slice(1).join(" ") || "",
  });
  const [scheduleTasks, setScheduleTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      try {
        const tasks = await fetchScoped("/schedule");
        if (Array.isArray(tasks)) setScheduleTasks(tasks);
      } catch (e) { /* silently fail */ }
    }
    loadTasks();
  }, [activeFarm]);

  const doneTasks = scheduleTasks.filter(t => t.status === "done").length;
  const adherencePct = scheduleTasks.length > 0 ? Math.round((doneTasks / scheduleTasks.length) * 100) : null;
  const adherenceText = adherencePct !== null ? `${adherencePct}% tasks completed on time` : "No tasks recorded yet";

  const totalArea = farms.reduce((s, f) => s + (f.areaAcres || 0), 0);
  const activeFarms = farms.filter((f) => f.isActive);
  const initials = userProfile?.name
    ? userProfile.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "—";

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || (typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api")}/auth/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: editForm.firstName,
          lastName: editForm.lastName,
          farmingMode: mode,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        fetchDashboardData();
        toast.success("Profile updated successfully");
      } else {
        toast.error("Could not save profile changes.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while saving profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Farmer Profile"
        subtitle="Your identity, preferences and saved defaults across the platform"
      />

      {/* Identity card */}
      <section className="glass-strong hero-ambient relative mb-5 overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="grid-pattern pointer-events-none absolute inset-0" />
        <div className="relative grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 sm:flex sm:gap-6">
          <div
            className="glow-emerald grid h-18 w-18 shrink-0 place-items-center rounded-2xl bg-primary/15 font-display text-2xl font-bold text-primary ring-1 ring-primary/30"
            style={{ height: "4.5rem", width: "4.5rem" }}
          >
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="flex flex-wrap items-center gap-2">
                <input
                  value={editForm.firstName}
                  onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                  placeholder="First name"
                  className="rounded-xl border border-input bg-secondary/40 px-3 py-1.5 text-sm outline-none focus:border-primary/50"
                />
                <input
                  value={editForm.lastName}
                  onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                  placeholder="Last name"
                  className="rounded-xl border border-input bg-secondary/40 px-3 py-1.5 text-sm outline-none focus:border-primary/50"
                />
                <button type="submit" disabled={isSaving} className="flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
                  <Save className="h-3.5 w-3.5" /> {isSaving ? "Saving..." : "Save"}
                </button>
                <button type="button" onClick={() => setIsEditing(false)} className="rounded-xl border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground">
                  Cancel
                </button>
              </form>
            ) : (
              <h2 className="truncate font-display text-xl font-bold">{userProfile?.name || "Farmer"}</h2>
            )}
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {farms[0]?.location?.address || "India"}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" /> Registered farmer
              </span>
              <span className="flex items-center gap-1">
                <Award className="h-3 w-3" /> KrishiMitra member
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-primary/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary ring-1 ring-primary/25">
                {mode} mode
              </span>
              <span className="rounded-full bg-cyan/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-cyan ring-1 ring-cyan/25">
                {farms.length} {farms.length === 1 ? "farm" : "farms"}
              </span>
              <span className="rounded-full bg-secondary px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                {totalArea.toFixed(1)} acres
              </span>
            </div>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="glass hidden items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-colors hover:border-primary/30 sm:flex"
            >
              <Pencil className="h-3.5 w-3.5" /> Edit
            </button>
          )}
        </div>
      </section>

      {/* Preference mode */}
      <section className="mb-5">
        <h2 className="mb-3 font-display text-sm font-semibold text-muted-foreground">
          Farming preference mode
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`rounded-2xl border p-5 text-left transition-all ${
                mode === m.id
                  ? "border-primary/45 bg-primary/8 glow-emerald"
                  : "glass hover:border-primary/25"
              }`}
            >
              <m.icon
                className={`h-5 w-5 ${mode === m.id ? "text-primary" : "text-muted-foreground"}`}
              />
              <div
                className={`mt-3 font-display text-sm font-semibold ${mode === m.id ? "text-primary" : ""}`}
              >
                {m.label}
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{m.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <section className="glass rounded-2xl p-5">
          <h3 className="text-xs font-semibold">Account details</h3>
          <dl className="mt-3 space-y-2.5 text-xs">
            {[
              ["Full name", userProfile?.name || "—"],
              ["Role", userProfile?.role || "Farmer"],
              ["Total farms", farms.length],
              ["Total area", `${totalArea.toFixed(1)} acres`],
              ["Active farms", activeFarms.length],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between border-b border-border/60 pb-2 last:border-0"
              >
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="glass rounded-2xl p-5">
          <h3 className="text-xs font-semibold">Season summary</h3>
          <div className="mt-3 space-y-3">
            {[
              [Sprout, "Active crop", activeFarms[0]?.currentCrop || "No active crop"],
              [MapPin, "Total land", `${totalArea.toFixed(1)} acres across ${farms.length} plots`],
              [Award, "Plan adherence", adherenceText],
            ].map(([Icon, l, v]) => (
              <div
                key={l}
                className="flex items-center gap-3 rounded-xl bg-secondary/40 px-3.5 py-2.5"
              >
                <Icon className="h-4 w-4 shrink-0 text-primary" />
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{l}</div>
                  <div className="truncate text-xs font-medium">{v}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
