import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CloudSun, Crown, FlaskConical, Sparkles, Droplets,
  Loader2, RotateCcw, Leaf, Sprout,
} from "lucide-react";
import { PageHeader } from "@/components/app/AppShell";
import { useAppData } from "@/lib/AppDataContext";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { subscribeAiSyncRefresh } from "@/lib/aiSyncEvents";

const API_URL = import.meta.env.VITE_API_URL || (typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api");
const ML_URL  = import.meta.env.VITE_ML_URL  || "http://localhost:5005";

export const Route = createFileRoute("/_app/recommendations")({
  head: () => ({
    meta: [
      { title: "Crop Recommendations — KrishiMitra" },
      {
        name: "description",
        content:
          "Enter your soil data and get AI-powered crop recommendations ranked by suitability score.",
      },
    ],
  }),
  component: RecommendationsPage,
});

const SOIL_TYPES = ["Black (Heavy)", "Red (Laterite)", "Sandy Loam", "Alluvial", "Clay", "Loamy", "Other"];
const SEASONS    = [{ value: "kharif", label: "Kharif (Jun–Oct)" }, { value: "rabi", label: "Rabi (Oct–Mar)" }];
const WATER_OPT  = [{ value: "low", label: "Low" }, { value: "medium", label: "Medium" }, { value: "high", label: "High" }];

const DEFAULT_FORM = {
  ph: "", nitrogen: "", phosphorus: "", potassium: "",
  organicCarbon: "", ec: "",
  startPreparationDate: new Date().toISOString().split("T")[0],
};

// Farm.soilType is stored as a lowercase slug ("black", "alluvial", ...);
// the recommendations form uses the display label instead. Maps one to the
// other so the farm's saved soil type prefills correctly.
const FARM_SOIL_TYPE_TO_LABEL = {
  black: "Black (Heavy)",
  red: "Red (Laterite)",
  laterite: "Red (Laterite)",
  sandy: "Sandy Loam",
  alluvial: "Alluvial",
  clay: "Clay",
  loamy: "Loamy",
  other: "Other",
};

function SoilInput({ label, id, value, onChange, placeholder, hint, step = "any" }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-xl border border-input bg-secondary/40 px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/60 focus:bg-secondary/60"
      />
      {hint && <p className="text-[10px] text-muted-foreground/70">{hint}</p>}
    </div>
  );
}

function ScoreBar({ value, color = "bg-primary" }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
      <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${value}%` }} />
    </div>
  );
}

function RecommendationsPage() {
  const { activeFarmId, activeFarm, postScoped, fetchScoped, token } = useAppData();
  const [form, setForm]           = useState(DEFAULT_FORM);
  const [results, setResults]     = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const loadSavedRecommendations = useCallback(async () => {
    if (!activeFarmId || !token) {
      setResults(null);
      return;
    }

    try {
      const data = await fetchScoped("/recommendations");
      const latest = Array.isArray(data) ? data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))[0] : null;
      if (latest?.cropOptions?.length) {
        setResults(latest.cropOptions);
      } else {
        setResults((current) => current ?? null);
      }

      const soilReports = await fetchScoped("/soil-reports");
      const latestSoil = Array.isArray(soilReports) ? soilReports.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))[0] : null;
      if (latestSoil) {
        setForm(f => ({
          ...f,
          ph: latestSoil.ph || "",
          nitrogen: latestSoil.nitrogen || "",
          phosphorus: latestSoil.phosphorus || "",
          potassium: latestSoil.potassium || "",
          organicCarbon: latestSoil.organicCarbon || "",
          ec: latestSoil.ec || ""
        }));
      }

    } catch (err) {
      console.error("Failed to load saved recommendations", err);
    }
  }, [activeFarmId, token, fetchScoped]);

  useEffect(() => {
    loadSavedRecommendations();
  }, [loadSavedRecommendations]);



  useEffect(() => {
    const unsubscribe = subscribeAiSyncRefresh(() => {
      loadSavedRecommendations();
    });
    return unsubscribe;
  }, [loadSavedRecommendations]);

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));

  const handleAnalyze = async (e) => {
    e.preventDefault();
    // Allow skipping strict validation if fields are not fully filled
    // If not filled, we just use defaults for missing values so the ML engine doesn't crash

    setIsLoading(true);
    setResults(null);
    try {
      const month = new Date(form.startPreparationDate).getMonth() + 1;
      const season = (month >= 6 && month <= 10) ? "kharif" : (month >= 11 || month <= 3) ? "rabi" : "zaid";
      
      const payload = {
        ph:             Number(form.ph) || 6.5,
        nitrogen:       Number(form.nitrogen) || 120,
        phosphorus:     Number(form.phosphorus) || 20,
        potassium:      Number(form.potassium) || 200,
        organicCarbon:  Number(form.organicCarbon) || 0.5,
        ec:             Number(form.ec) || 0.4,
        soilType:       FARM_SOIL_TYPE_TO_LABEL[activeFarm?.soilType] || "Black (Heavy)",
        season:         season,
        areaAcres:      Number(activeFarm?.areaAcres) || 1,
        waterAvailability: activeFarm?.waterLevel || "medium",
        startPreparationDate: form.startPreparationDate,
      };

      const res = await fetch(`${ML_URL}/api/soil_recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("ML server error");
      const data = await res.json();
      setResults(data.recommendations || []);
      toast.success("Analysis complete — view your recommendations below");
    } catch (err) {
      toast.error("Could not reach ML server. Make sure python app.py is running on port 5005.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!results || !activeFarmId) return toast.error("Select a farm first");
    setSaveLoading(true);
    try {
      await postScoped("/recommendations", {
        farm:        activeFarmId,
        season:      payload.season === "kharif" ? "Kharif 2026" : "Rabi 2026",
        startPreparationDate: form.startPreparationDate,
        cropOptions: results.map((r) => ({
          cropName:         r.cropName,
          suitabilityScore: r.suitabilityScore,
          weatherMatchPct:  r.weatherMatchPct,
          soilMatchPct:     r.soilMatchPct,
          expectedYieldKg:  r.expectedYieldKg,
          durationDays:     r.durationDays,
          expectedMarginRs: r.expectedMarginRs,
          isTopPick:        r.isTopPick,
          reason:           r.reason,
        })),
      });
      await loadSavedRecommendations();
      toast.success("Recommendations saved to your farm profile");
    } catch (err) {
      toast.error("Failed to save recommendations");
    } finally {
      setSaveLoading(false);
    }
  };

  const primary = results?.find((r) => r.isTopPick) || results?.[0];
  const others  = results?.filter((r) => !r.isTopPick) || [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Crop Recommendations"
        subtitle={`Enter your soil test values — our model scores crops against your exact soil profile and farm context`}
        action={
          results && (
            <button
              onClick={handleSave}
              disabled={saveLoading}
              className="glass flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-colors hover:border-primary/30"
            >
              {saveLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Leaf className="h-3.5 w-3.5 text-primary" />}
              Save to Profile
            </button>
          )
        }
      />

      {/* Soil Input Form */}
      <form onSubmit={handleAnalyze} className="glass rounded-3xl p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-2">
          <FlaskConical className="h-5 w-5 text-primary" />
          <h2 className="font-display text-base font-semibold">Soil Test Report</h2>
          <span className="ml-auto hidden text-[11px] text-muted-foreground sm:block">Values from your soil test lab report</span>
        </div>

        {/* NPK + pH */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SoilInput label="pH" id="ph" value={form.ph} onChange={set("ph")} placeholder="6.5 – 8.5" hint="Ideal: 6.5–7.5" step="0.1" />
          <SoilInput label="Nitrogen (kg/ha)" id="n" value={form.nitrogen} onChange={set("nitrogen")} placeholder="e.g. 212" hint="Low < 180 · High > 280" />
          <SoilInput label="Phosphorus (kg/ha)" id="p" value={form.phosphorus} onChange={set("phosphorus")} placeholder="e.g. 18" hint="Low < 10 · High > 25" />
          <SoilInput label="Potassium (kg/ha)" id="k" value={form.potassium} onChange={set("potassium")} placeholder="e.g. 284" hint="Low < 150 · High > 300" />
        </div>

        {/* Start Date + Secondary */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SoilInput label="Organic Carbon (%)" id="oc" value={form.organicCarbon} onChange={set("organicCarbon")} placeholder="e.g. 0.58" hint="Ideal ≥ 0.75%" step="0.01" />
          <SoilInput label="EC (dS/m)" id="ec" value={form.ec} onChange={set("ec")} placeholder="e.g. 0.42" hint="Safe < 1.0 dS/m" step="0.01" />
          <div className="flex flex-col gap-1 lg:col-span-2">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Start Preparation Date</label>
            <input
              type="date"
              value={form.startPreparationDate}
              onChange={(e) => set("startPreparationDate")(e.target.value)}
              className="rounded-xl border border-input bg-secondary/40 px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary/60 focus:bg-secondary/60"
            />
            <p className="text-[10px] text-muted-foreground/70">When do you plan to start preparing the field?</p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary)_30%,transparent)] transition-all hover:scale-[1.02] disabled:opacity-60"
          >
            {isLoading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Analysing soil…</>
            ) : (
              <><Sparkles className="h-4 w-4" /> Analyse & Recommend</>
            )}
          </button>
          {results && (
            <button
              type="button"
              onClick={() => { setResults(null); setForm(DEFAULT_FORM); }}
              className="flex items-center gap-1.5 rounded-xl border border-border px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          )}
        </div>
      </form>

      {/* Loading state */}
      {isLoading && (
        <div className="glass flex items-center justify-center gap-3 rounded-3xl py-16 text-sm text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          Scoring 9 crops against your soil profile…
        </div>
      )}

      {/* Results */}
      {results && !isLoading && primary && (
        <>
          {/* Top pick hero */}
          <section className="glass-strong hero-ambient relative overflow-hidden rounded-3xl p-6 sm:p-8">
            <div className="grid-pattern pointer-events-none absolute inset-0" />
            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start">
              <div>
                <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-inset ring-primary/20">
                  <Crown className="h-3.5 w-3.5" /> Top Recommendation
                </div>
                <h2 className="mb-2 text-3xl font-bold tracking-tight">{primary.cropName}</h2>
                <p className="mb-6 max-w-xl text-sm leading-relaxed text-muted-foreground">{primary.reason}</p>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Overall Match</div>
                    <div className="text-3xl font-bold text-primary">
                      {primary.suitabilityScore}<span className="text-lg font-medium text-muted-foreground">%</span>
                    </div>
                  </div>
                  <div className="h-10 w-px bg-border/50 hidden sm:block" />
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Expected Yield</div>
                    <div className="text-lg font-bold">{primary.expectedYieldKg.toLocaleString("en-IN")} kg</div>
                    <div className="text-[10px] text-muted-foreground">{activeFarm?.areaAcres || 1} acre(s)</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Est. Profit</div>
                    <div className="text-lg font-bold text-primary">₹{primary.expectedMarginRs.toLocaleString("en-IN")}</div>
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Duration</div>
                    <div className="text-lg font-bold">{primary.durationDays} days</div>
                  </div>
                </div>
              </div>

              {/* Score bars */}
              <div className="glass flex flex-col gap-4 rounded-2xl bg-background/40 p-5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Factor Analysis</div>
                <div className="space-y-3">
                  <div>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-muted-foreground"><FlaskConical className="h-3.5 w-3.5" />Soil Match</span>
                      <span className="font-semibold">{primary.soilMatchPct}%</span>
                    </div>
                    <ScoreBar value={primary.soilMatchPct} />
                  </div>
                  <div>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-muted-foreground"><Droplets className="h-3.5 w-3.5" />Water / Climate</span>
                      <span className="font-semibold">{primary.weatherMatchPct}%</span>
                    </div>
                    <ScoreBar value={primary.weatherMatchPct} color="bg-cyan" />
                  </div>
                  <div>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-muted-foreground"><Sparkles className="h-3.5 w-3.5" />Overall Match</span>
                      <span className="font-semibold">{primary.suitabilityScore}%</span>
                    </div>
                    <ScoreBar value={primary.suitabilityScore} color="bg-gradient-to-r from-primary to-cyan" />
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border/50">
                  <Link 
                    to="/crop-plan" 
                    search={{ crop: primary.cropName }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20"
                  >
                    <Sprout className="h-4 w-4" />
                    Create Crop Plan for {primary.cropName}
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Alternatives */}
          {others.length > 0 && (
            <>
              <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Strong Alternatives</div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {others.map((crop) => (
                  <div key={crop.cropName} className="glass group relative overflow-hidden rounded-2xl p-5 transition-all hover:bg-card/60 hover:shadow-md">
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <h3 className="font-bold">{crop.cropName}</h3>
                        <div className="mt-0.5 text-[11px] text-muted-foreground">
                          Confidence: <span className="font-semibold text-foreground">{crop.suitabilityScore}%</span>
                        </div>
                      </div>
                      <span className="rounded-lg bg-secondary/70 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {crop.durationDays}d
                      </span>
                    </div>

                    <div className="mb-3 space-y-2">
                      <div>
                        <div className="mb-0.5 flex justify-between text-[10px] text-muted-foreground">
                          <span>Soil</span><span>{crop.soilMatchPct}%</span>
                        </div>
                        <ScoreBar value={crop.soilMatchPct} />
                      </div>
                      <div>
                        <div className="mb-0.5 flex justify-between text-[10px] text-muted-foreground">
                          <span>Water</span><span>{crop.weatherMatchPct}%</span>
                        </div>
                        <ScoreBar value={crop.weatherMatchPct} color="bg-cyan" />
                      </div>
                    </div>

                    <p className="mb-3 text-[11px] leading-relaxed text-muted-foreground line-clamp-2">{crop.reason}</p>

                    <div className="flex items-center justify-between border-t border-border/50 pb-3 pt-3 text-xs font-semibold">
                      <div>{crop.expectedYieldKg.toLocaleString("en-IN")} kg</div>
                      <div className="text-primary">₹{crop.expectedMarginRs.toLocaleString("en-IN")}</div>
                    </div>
                    
                    <div className="border-t border-border/50 pt-3">
                      <Link 
                        to="/crop-plan" 
                        search={{ crop: crop.cropName }}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary/10 px-4 py-2.5 text-xs font-semibold text-primary transition-all hover:bg-primary/20"
                      >
                        <Sprout className="h-3.5 w-3.5" />
                        Create Crop Plan
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {results && results.length === 0 && (
        <div className="glass rounded-3xl py-16 text-center text-sm text-muted-foreground">
          No suitable crops found for the given inputs. Try adjusting the season or soil values.
        </div>
      )}
    </div>
  );
}
