import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  CloudSun,
  Droplets,
  Sparkles,
  Sun,
  ThermometerSun,
  Wind,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAppData } from "@/lib/AppDataContext";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — KrishiMitra" },
      {
        name: "description",
        content:
          "Your farm at a glance: weather, tasks, crop plan progress, risk alerts and expenses.",
      },
    ],
  }),
  component: Dashboard,
});

const severityStyles = {
  critical: "border-destructive/40 bg-destructive/8 text-destructive",
  warning: "border-warning/40 bg-warning/8 text-warning",
  info: "border-cyan/30 bg-cyan/8 text-cyan",
};


function Dashboard() {
  const { token, userProfile, activeFarm, weatherSnapshot, setWeatherSnapshot } = useAppData();

  // Pre-load weather from the backend DB cache on mount so the weather widget
  // shows real data even without the user ever visiting the Weather page.
  useEffect(() => {
    if (!token || weatherSnapshot || !activeFarm?.location?.address) return;
    const API_URL = import.meta.env.VITE_API_URL ||
      (typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api");
    const locationKey = activeFarm.location.address
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    fetch(`${API_URL}/weather/cache/${locationKey}?query=${encodeURIComponent(activeFarm.location.address)}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.ok ? r.json() : null)
      .then(cached => {
        if (cached?.data?.current) {
          setWeatherSnapshot({
            temp: cached.data.current.temp,
            humidity: cached.data.current.humidity,
            wind: cached.data.current.wind,
            uv: cached.data.current.uv,
            rainChance: cached.data.current.rainChance,
            todayRainMm: cached.data.current.precipitation,
            condition: cached.cityName,
            cityName: cached.cityName,
          });
        }
      })
      .catch(() => {});
  }, [token, activeFarm, weatherSnapshot]);

  const firstName = userProfile?.name?.split(" ")[0] || "Farmer";
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="space-y-5">
      {/* Welcome band */}
      <section className="glass-strong hero-ambient relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="grid-pattern pointer-events-none absolute inset-0" />
        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="min-w-0">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              {today}
            </div>
            <h1 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"}, {firstName}
            </h1>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">
              Welcome to KrishiMitra! Check today's weather forecast or explore live market prices.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link
                to="/market"
                className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-[0_0_24px_-8px_var(--color-primary)] transition-transform hover:scale-[1.03]"
              >
                View market prices <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Weather widget */}
          <div className="glass w-full rounded-2xl p-5 lg:w-72">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                  {activeFarm?.location?.address || "Your Farm"} · Now
                </div>
                <div className="mt-1 flex items-end gap-1">
                  <span className="font-display text-4xl font-bold">{weatherSnapshot?.temp ?? "--"}°</span>
                  <span className="mb-1.5 text-xs text-muted-foreground">
                    {weatherSnapshot?.condition || "--"}
                  </span>
                </div>
              </div>
              <CloudSun className="h-10 w-10 text-warning float-slow" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                [Droplets, `${weatherSnapshot?.humidity ?? "--"}%`, "Humidity"],
                [Wind, `${weatherSnapshot?.wind ?? "--"} km/h`, "Wind"],
                [Sun, `UV ${weatherSnapshot?.uv ?? "--"}`, "UV Index"],
              ].map(([Icon, v, l]) => (
                <div key={l} className="rounded-xl bg-secondary/50 py-2">
                  <Icon className="mx-auto h-3.5 w-3.5 text-cyan" />
                  <div className="mt-1 text-xs font-semibold">{v}</div>
                  <div className="text-[10px] text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
            <Link
              to="/weather"
              className="mt-3 flex items-center justify-center gap-1 text-[11px] font-medium text-cyan hover:underline"
            >
              7-day forecast <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Quick links */}
        <section className="glass rounded-2xl p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-sm font-semibold">Quick actions</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-1">
            {[
              { to: "/market", label: "📈 Market Prices", sub: "Check today's mandi rates" },
              { to: "/weather", label: "🌤️ Weather Forecast", sub: "View 7-day advisory" },
            ].map(({ to, label, sub }) => (
              <Link
                key={to}
                to={to}
                className="ring-glow flex items-center gap-3 rounded-xl border border-border bg-secondary/30 px-4 py-3 transition-colors hover:border-primary/30 hover:bg-secondary/50"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{label}</div>
                  <div className="text-[11px] text-muted-foreground">{sub}</div>
                </div>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
