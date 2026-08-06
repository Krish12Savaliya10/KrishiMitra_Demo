import { createFileRoute } from "@tanstack/react-router";
import { Droplets, MapPin, Plus, Ruler, Satellite, Sprout, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useAppData } from "@/lib/AppDataContext";
import { PageHeader } from "@/components/app/AppShell";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/farms")({
  head: () => ({
    meta: [
      { title: "Farm Details — KrishiMitra" },
      {
        name: "description",
        content: "Manage your farm plots: area, soil type, irrigation source and season status.",
      },
    ],
  }),
  component: FarmsPage,
});

const emptyForm = {
  name: "",
  areaAcres: "",
  soilType: "other",
  waterResources: [],
  waterLevel: "medium",
  currentCrop: "",
  location: "",
  ph: "",
  nitrogen: "",
  phosphorus: "",
  potassium: "",
  ec: "",
  organicCarbon: "",
};

function FarmsPage() {
  const { farms, token, fetchDashboardData, setActiveFarmId } = useAppData();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingFarm, setEditingFarm] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});

  const API_URL = import.meta.env.VITE_API_URL || (typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api");

  const totalArea = farms.reduce((s, f) => s + (f.areaAcres || 0), 0);
  const activeCount = farms.filter((f) => f.isActive).length;

  const openAdd = () => {
    setEditingFarm(null);
    setFormData(emptyForm);
    setFormErrors({});
    setIsAddOpen(true);
  };

  const openEdit = (f) => {
    setEditingFarm(f);
    setFormData({
      name: f.name || "",
      areaAcres: f.areaAcres ?? "",
      soilType: f.soilType || "other",
      waterResources: f.waterResources || [],
      waterLevel: f.waterLevel || "medium",
      currentCrop: f.currentCrop || "",
      location: f.location?.address || "",
      ph: "", nitrogen: "", phosphorus: "", potassium: "", ec: "", organicCarbon: "",
    });
    setIsAddOpen(true);
  };

  const handleDelete = async (f) => {
    if (!window.confirm(`Delete "${f.name}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(`${API_URL}/farms/${f._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        await fetchDashboardData();
        toast.success("Farm deleted");
      } else {
        toast.error("Failed to delete farm");
      }
    } catch (err) {
      toast.error("Error deleting farm");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Farm name is required";
    if (!formData.areaAcres) newErrors.areaAcres = "Area is required";
    else if (Number(formData.areaAcres) <= 0) newErrors.areaAcres = "Area must be greater than 0";
    if (Object.keys(newErrors).length > 0) { setFormErrors(newErrors); return; }
    setFormErrors({});
    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        areaAcres: Number(formData.areaAcres),
        soilType: formData.soilType,
        waterResources: formData.waterResources,
        waterLevel: formData.waterLevel,
        currentCrop: formData.currentCrop,
        location: { address: formData.location },
        isActive: true
      };

      const isEditing = Boolean(editingFarm);
      const url = isEditing ? `${API_URL}/farms/${editingFarm._id}` : `${API_URL}/farms`;
      const res = await fetch(url, {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const savedFarm = await res.json();
        
        // Save soil report if fields are filled
        setIsAddOpen(false);
        setEditingFarm(null);
        setFormData(emptyForm);
        await fetchDashboardData();
        toast.success(isEditing ? "Farm updated" : "Farm added successfully");
      } else {
        toast.error(isEditing ? "Failed to update farm" : "Failed to add farm");
      }
    } catch (err) {
      toast.error("Error saving farm");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleWaterResource = (item) => {
    setFormData((prev) => {
      const arr = prev.waterResources || [];
      if (arr.includes(item)) return { ...prev, waterResources: arr.filter((x) => x !== item) };
      return { ...prev, waterResources: [...arr, item] };
    });
  };

  return (
    <div>
      <PageHeader
        title="Farm Details"
        subtitle={`${farms.length} plots · ${totalArea.toFixed(1)} acres total · ${activeCount} active this season`}
        action={
          <button onClick={openAdd} className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-[0_0_24px_-8px_var(--color-primary)] transition-transform hover:scale-[1.03]">
            <Plus className="h-3.5 w-3.5" /> Add farm
          </button>
        }
      />

      {/* Map-style band */}
      <section className="glass relative mb-5 overflow-hidden rounded-2xl">
        <div className="grid-pattern absolute inset-0" />
        <div className="relative flex flex-wrap items-center gap-6 p-6">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan/10 ring-1 ring-cyan/25">
            <Satellite className="h-6 w-6 text-cyan float-slow" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-base font-semibold">Field intelligence view</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Satellite-linked plot boundaries for your region · Last sync 2h ago
            </p>
          </div>
          <div className="flex gap-6 text-center">
            {[
              [String(farms.length), "Plots mapped"],
              [`${totalArea.toFixed(1)} ac`, "Total area"],
              [String(farms.filter(f => f.waterResources?.length > 0).length), "Irrigated"],
            ].map(([v, l]) => (
              <div key={l}>
                <div className="font-display text-lg font-bold text-cyan">{v}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {farms.map((f) => (
          <div
            key={f._id}
            className="glass hover-lift ring-glow relative overflow-hidden rounded-2xl p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate font-display text-sm font-semibold">{f.name}</h3>
                <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {f.location?.address || "Unknown"}
                </div>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                  f.isActive
                    ? "bg-primary/12 text-primary ring-1 ring-primary/25"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {f.isActive ? "active" : "inactive"}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5 text-xs">
              <InfoChip icon={Ruler} label="Area" value={`${f.areaAcres} acres`} />
              <InfoChip icon={Droplets} label="Water Source" value={f.waterResources?.length > 0 ? f.waterResources.join(', ') : "Rainfed"} />
              <InfoChip icon={Sprout} label="Crop" value={f.currentCrop || "None (fallow)"} />
              <InfoChip icon={Satellite} label="Soil" value={f.soilType} />
            </div>

            {f.isActive && (
              <div className="mt-4">
                <div className="flex justify-between text-[11px] text-muted-foreground">
                  <span>Crop health index</span>
                  <span className="font-semibold text-primary">{f.cropHealthIndex || 0}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-cyan"
                    style={{ width: `${f.cropHealthIndex || 0}%` }}
                  />
                </div>
              </div>
            )}

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => openEdit(f)}
                className="flex-1 rounded-lg border border-border py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
              >
                Edit details
              </button>
              <button
                onClick={() => setActiveFarmId(f._id)}
                className="flex-1 rounded-lg border border-border py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-cyan/30 hover:text-cyan"
              >
                Use for analysis
              </button>
              <button
                onClick={() => handleDelete(f)}
                className="rounded-lg border border-border px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive"
                title="Delete farm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* Add card */}
        <button onClick={openAdd} className="ring-glow grid min-h-52 place-items-center rounded-2xl border border-dashed border-border text-muted-foreground transition-colors hover:text-primary">
          <div className="text-center">
            <Plus className="mx-auto h-6 w-6" />
            <div className="mt-2 text-xs font-medium">Add a new farm plot</div>
            <div className="mt-0.5 text-[10px] text-muted-foreground">
              Area · soil · irrigation · season
            </div>
          </div>
        </button>
      </div>

      <Dialog open={isAddOpen} onOpenChange={(open) => { setIsAddOpen(open); if (!open) setEditingFarm(null); }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingFarm ? `Edit ${editingFarm.name}` : "Add a new farm"}</DialogTitle>
            <DialogDescription>
              {editingFarm
                ? "Update this farm plot's details below."
                : "Enter the details of your new farm plot below."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-[11px] font-medium text-muted-foreground">Name *</label>
              <input
                id="name"
                value={formData.name}
                onChange={(e) => { setFormData({...formData, name: e.target.value}); if (formErrors.name) setFormErrors(p => ({...p, name: ""})); }}
                className={`w-full rounded-xl border bg-secondary/40 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary/50 ${formErrors.name ? "border-destructive" : "border-input"}`}
              />
              {formErrors.name && <p className="mt-1 flex items-center gap-1 text-[11px] text-destructive"><AlertCircle className="h-3 w-3" />{formErrors.name}</p>}
            </div>
            <div>
              <label htmlFor="areaAcres" className="mb-1 block text-[11px] font-medium text-muted-foreground">Area (Acres) *</label>
              <input
                type="number" step="0.1" id="areaAcres"
                value={formData.areaAcres}
                onChange={(e) => { setFormData({...formData, areaAcres: e.target.value}); if (formErrors.areaAcres) setFormErrors(p => ({...p, areaAcres: ""})); }}
                className={`w-full rounded-xl border bg-secondary/40 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary/50 ${formErrors.areaAcres ? "border-destructive" : "border-input"}`}
              />
              {formErrors.areaAcres && <p className="mt-1 flex items-center gap-1 text-[11px] text-destructive"><AlertCircle className="h-3 w-3" />{formErrors.areaAcres}</p>}
            </div>
            <div>
              <label htmlFor="location" className="mb-1 block text-[11px] font-medium text-muted-foreground">Location</label>
              <input id="location" placeholder="e.g. Pune, Maharashtra" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary/50" />
            </div>
            <div>
              <label htmlFor="soilType" className="mb-1 block text-[11px] font-medium text-muted-foreground">Soil Type</label>
              <select id="soilType" value={formData.soilType} onChange={(e) => setFormData({...formData, soilType: e.target.value})} className="w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary/50">
                <option value="alluvial">Alluvial</option>
                <option value="black">Black</option>
                <option value="red">Red</option>
                <option value="laterite">Laterite</option>
                <option value="sandy">Sandy</option>
                <option value="clay">Clay</option>
                <option value="loamy">Loamy</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[11px] font-medium text-muted-foreground">Water Resources</label>
              <div className="grid grid-cols-2 gap-2">
                {["Borewell", "Canal", "River", "Rainfed", "Drip System", "Sprinklers"].map(item => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => toggleWaterResource(item)}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${
                      (formData.waterResources || []).includes(item)
                        ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_-5px_var(--color-primary)]"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    <div className={`h-3 w-3 rounded-full border flex items-center justify-center ${(formData.waterResources || []).includes(item) ? "border-primary bg-primary" : "border-muted-foreground"}`}>
                      {(formData.waterResources || []).includes(item) && <CheckCircle2 className="h-2 w-2 text-background" />}
                    </div>
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="waterLevel" className="mb-1 block text-[11px] font-medium text-muted-foreground">Water Availability</label>
              <select id="waterLevel" value={formData.waterLevel} onChange={(e) => setFormData({...formData, waterLevel: e.target.value})} className="w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary/50">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <p className="mt-1 text-[11px] text-muted-foreground">Saved once here — the AI and schedule engine reuse this instead of asking every time.</p>
            </div>
            
            <div className="flex justify-end pt-2">
              <button disabled={isSubmitting} type="submit" className="w-full rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.02]">
                {isSubmitting ? "Saving..." : editingFarm ? "Save changes" : "Add Farm"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function InfoChip({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-secondary/40 px-3 py-2">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className="mt-0.5 truncate text-[11px] font-medium">{value}</div>
    </div>
  );
}
