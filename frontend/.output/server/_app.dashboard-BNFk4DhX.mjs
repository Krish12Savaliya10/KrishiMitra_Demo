import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { At as ArrowRight, kt as ArrowUpRight, n as Wind, p as Sun, rt as Droplets, ut as CloudSun } from "./_libs/lucide-react.mjs";
import { r as useAppData } from "./_ssr/router-DcyHQImX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.dashboard-BNFk4DhX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Dashboard() {
	const { token, userProfile, activeFarm, weatherSnapshot, setWeatherSnapshot } = useAppData();
	(0, import_react.useEffect)(() => {
		if (!token || weatherSnapshot || !activeFarm?.location?.address) return;
		const API_URL = typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api";
		const locationKey = activeFarm.location.address.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
		fetch(`${API_URL}/weather/cache/${locationKey}?query=${encodeURIComponent(activeFarm.location.address)}`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.ok ? r.json() : null).then((cached) => {
			if (cached?.data?.current) setWeatherSnapshot({
				temp: cached.data.current.temp,
				humidity: cached.data.current.humidity,
				wind: cached.data.current.wind,
				uv: cached.data.current.uv,
				rainChance: cached.data.current.rainChance,
				todayRainMm: cached.data.current.precipitation,
				condition: cached.cityName,
				cityName: cached.cityName
			});
		}).catch(() => {});
	}, [
		token,
		activeFarm,
		weatherSnapshot
	]);
	const firstName = userProfile?.name?.split(" ")[0] || "Farmer";
	const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "glass-strong hero-ambient relative overflow-hidden rounded-3xl p-6 sm:p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-pattern pointer-events-none absolute inset-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-medium uppercase tracking-[0.18em] text-primary",
							children: today
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl",
							children: [
								"Good ",
								(/* @__PURE__ */ new Date()).getHours() < 12 ? "morning" : (/* @__PURE__ */ new Date()).getHours() < 17 ? "afternoon" : "evening",
								", ",
								firstName
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-lg text-sm text-muted-foreground",
							children: "Welcome to KrishiMitra! Check today's weather forecast or explore live market prices."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 flex flex-wrap gap-2.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/market",
								className: "flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-[0_0_24px_-8px_var(--color-primary)] transition-transform hover:scale-[1.03]",
								children: ["View market prices ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass w-full rounded-2xl p-5 lg:w-72",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] uppercase tracking-widest text-muted-foreground",
								children: [activeFarm?.location?.address || "Your Farm", " · Now"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex items-end gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-4xl font-bold",
									children: [weatherSnapshot?.temp ?? "--", "°"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mb-1.5 text-xs text-muted-foreground",
									children: weatherSnapshot?.condition || "--"
								})]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudSun, { className: "h-10 w-10 text-warning float-slow" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid grid-cols-3 gap-2 text-center",
							children: [
								[
									Droplets,
									`${weatherSnapshot?.humidity ?? "--"}%`,
									"Humidity"
								],
								[
									Wind,
									`${weatherSnapshot?.wind ?? "--"} km/h`,
									"Wind"
								],
								[
									Sun,
									`UV ${weatherSnapshot?.uv ?? "--"}`,
									"UV Index"
								]
							].map(([Icon, v, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-secondary/50 py-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mx-auto h-3.5 w-3.5 text-cyan" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-xs font-semibold",
										children: v
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-muted-foreground",
										children: l
									})
								]
							}, l))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/weather",
							className: "mt-3 flex items-center justify-center gap-1 text-[11px] font-medium text-cyan hover:underline",
							children: ["7-day forecast ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-3 w-3" })]
						})
					]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-5 lg:grid-cols-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass rounded-2xl p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-4 flex items-center justify-between",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-sm font-semibold",
						children: "Quick actions"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-1",
					children: [{
						to: "/market",
						label: "📈 Market Prices",
						sub: "Check today's mandi rates"
					}, {
						to: "/weather",
						label: "🌤️ Weather Forecast",
						sub: "View 7-day advisory"
					}].map(({ to, label, sub }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to,
						className: "ring-glow flex items-center gap-3 rounded-xl border border-border bg-secondary/30 px-4 py-3 transition-colors hover:border-primary/30 hover:bg-secondary/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium",
								children: label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-muted-foreground",
								children: sub
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" })]
					}, to))
				})]
			})
		})]
	});
}
//#endregion
export { Dashboard as component };
