import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { Lt as ArrowUpRight, Rt as ArrowRight, ct as Droplets, f as ThermometerSun, ht as CloudSun, m as Sun, n as Wind, v as Sparkles } from "./_libs/lucide-react.mjs";
import { r as useAppData } from "./_ssr/router-SdgVeMQt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.dashboard-DoiscfhI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var severityStyles = {
	critical: "border-destructive/40 bg-destructive/8 text-destructive",
	warning: "border-warning/40 bg-warning/8 text-warning",
	info: "border-cyan/30 bg-cyan/8 text-cyan"
};
function Dashboard() {
	const { token, userProfile, farms, activeFarm, weatherSnapshot, setWeatherSnapshot, fetchScoped, alerts = [] } = useAppData();
	const [cropPlan, setCropPlan] = (0, import_react.useState)(null);
	const [scheduleTasks, setScheduleTasks] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		async function loadData() {
			try {
				const plans = await fetchScoped("/crop-plans");
				if (Array.isArray(plans) && plans.length > 0) setCropPlan(plans[0]);
				const tasks = await fetchScoped("/schedule");
				if (Array.isArray(tasks)) setScheduleTasks(tasks);
			} catch (e) {}
		}
		loadData();
	}, [activeFarm]);
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
	const totalArea = farms.reduce((s, f) => s + (f.areaAcres || 0), 0);
	const activeFarms = farms.filter((f) => f.isActive).length;
	const firstName = userProfile?.name?.split(" ")[0] || "Farmer";
	const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	});
	const stages = cropPlan?.milestones || [];
	const doneStages = stages.filter((s) => s.status === "done").length;
	const cropProgress = stages.length > 0 ? Math.round(doneStages / stages.length * 100) : 0;
	const activeStage = stages.find((s) => s.status === "in-progress" || s.status === "pending");
	const cropProgressHint = activeStage ? `${activeStage.stage} · Stage ${doneStages + 1} of ${stages.length}` : cropPlan ? `${doneStages} of ${stages.length} stages done` : "No active crop plan";
	const doneTasks = scheduleTasks.filter((t) => t.status === "done").length;
	const adherencePct = scheduleTasks.length > 0 ? Math.round(doneTasks / scheduleTasks.length * 100) : 0;
	const rainChance = weatherSnapshot?.rainChance || 0;
	const humidity = weatherSnapshot?.humidity || 0;
	const aiAdvisories = [
		rainChance > 60 ? {
			title: "Rain alert: delay spraying",
			body: `Rain probability is ${rainChance}%. Avoid spraying operations until dry weather returns to ensure full crop absorption.`,
			tone: "text-warning"
		} : {
			title: "Good spraying window ahead",
			body: `Rain chance is only ${rainChance}%. This is a good window for micronutrient or pesticide spraying operations.`,
			tone: "text-primary"
		},
		humidity > 80 ? {
			title: "High humidity risk",
			body: `Humidity at ${humidity}% — ideal conditions for fungal disease. Inspect leaves and consider preventive fungicide application.`,
			tone: "text-warning"
		} : {
			title: "Irrigation efficiency tip",
			body: activeFarm ? `Your ${activeFarm.name} farm: schedule irrigation in early morning to reduce evaporation losses by up to 30%.` : "Schedule irrigation in early morning to reduce evaporation losses by up to 30%.",
			tone: "text-cyan"
		},
		scheduleTasks.length > 0 ? {
			title: `${adherencePct}% task adherence this season`,
			body: `${doneTasks} of ${scheduleTasks.length} scheduled tasks completed on time. Keep the momentum going for a healthy harvest.`,
			tone: adherencePct > 70 ? "text-primary" : "text-warning"
		} : {
			title: "Start your daily schedule",
			body: "Track daily farm tasks to improve adherence and never miss a critical crop operation window.",
			tone: "text-cyan"
		},
		{
			title: "Market timing signal",
			body: "Check the Market Prices page for today's Mandi rates and compare with your expected harvest value to plan selling strategy.",
			tone: "text-primary"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
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
								children: activeFarm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									"Your ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground",
										children: activeFarm.name
									}),
									" farm has ",
									activeFarm.currentCrop ? `${activeFarm.currentCrop} growing` : "no active crop",
									". Stay on top of today's tasks to keep the season on track."
								] }) : "Welcome back! Add your first farm to get started with your personalized dashboard."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 flex flex-wrap gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/crop-plan",
									className: "flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-[0_0_24px_-8px_var(--color-primary)] transition-transform hover:scale-[1.03]",
									children: ["View today's schedule ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/recommendations",
									className: "glass flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-colors hover:border-primary/30",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 text-primary" }), " AI recommendations"]
								})]
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
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total farms",
						value: String(farms.length),
						hint: `${totalArea.toFixed(1)} acres · ${activeFarms} active`,
						tone: "primary",
						bar: farms.length > 0 ? 100 : 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Crop plan progress",
						value: `${cropProgress}%`,
						hint: cropProgressHint,
						tone: "cyan",
						bar: cropProgress
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Active risk alerts",
						value: String(alerts.length),
						hint: alerts.length > 0 ? `${alerts.filter((a) => a.severity === "critical").length} critical` : "No alerts",
						tone: "warning"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Active farm",
						value: activeFarm?.name?.split("—")[0]?.trim() || "None",
						hint: activeFarm ? `${activeFarm.areaAcres} acres · ${activeFarm.soilType}` : "Select or add a farm",
						tone: "foreground"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "glass rounded-2xl p-5 lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-sm font-semibold",
							children: "Quick actions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/crop-plan",
							className: "text-xs font-medium text-primary hover:underline",
							children: "Open schedule"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							{
								to: "/schedule",
								label: "📋 Daily Schedule",
								sub: "View & manage today's tasks"
							},
							{
								to: "/expenses",
								label: "💰 Expense Tracker",
								sub: "Log farm expenses"
							},
							{
								to: "/market",
								label: "📈 Market Prices",
								sub: "Check today's mandi rates"
							},
							{
								to: "/farms",
								label: "🏡 Farm Details",
								sub: "Manage your farm plots"
							},
							{
								to: "/crop-plan",
								label: "📅 Crop Plan",
								sub: "View growth stage roadmap"
							}
						].map(({ to, label, sub }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
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
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "glass rounded-2xl p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-sm font-semibold",
							children: "Risk alerts"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/alerts",
							className: "text-xs font-medium text-primary hover:underline",
							children: "All alerts"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2.5",
						children: [alerts.slice(0, 3).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `rounded-xl border px-3.5 py-3 ${severityStyles[a.severity] || severityStyles.info}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold",
									children: a.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "shrink-0 text-[10px] opacity-70",
									children: a.createdAt ? new Date(a.createdAt).toLocaleDateString() : ""
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 line-clamp-2 text-[11px] leading-relaxed text-foreground/70",
								children: a.detail || a.message
							})]
						}, a._id || a.id)), alerts.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl border border-dashed px-3.5 py-3 text-center text-xs text-muted-foreground",
							children: "No active alerts"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "glass relative overflow-hidden rounded-2xl p-5 lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/15 blur-3xl" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-sm font-semibold",
								children: "AI recommendation highlights"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid gap-3 sm:grid-cols-2",
							children: aiAdvisories.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-secondary/30 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `text-xs font-semibold ${r.tone}`,
									children: r.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[11px] leading-relaxed text-muted-foreground",
									children: r.body
								})]
							}, r.title))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "glass rounded-2xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-4 font-display text-sm font-semibold",
							children: "Crop plan progress"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [stages.slice(0, 5).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `grid h-5 w-5 shrink-0 place-items-center rounded-full text-[9px] font-bold ${s.status === "done" ? "bg-primary text-primary-foreground" : s.status === "in-progress" ? "bg-primary/15 text-primary ring-1 ring-primary pulse-dot" : "bg-secondary text-muted-foreground"}`,
									children: s.status === "done" ? "✓" : ""
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `truncate text-xs ${s.status === "in-progress" ? "font-semibold text-primary" : s.status === "done" ? "text-muted-foreground" : ""}`,
										children: s.stage
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-muted-foreground",
										children: s.plannedDate ? new Date(s.plannedDate).toLocaleDateString() : ""
									})]
								})]
							}, s._id || s.stage)), stages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "No active crop plan"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/crop-plan",
							className: "mt-4 flex items-center justify-center gap-1 rounded-xl border border-border py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary",
							children: ["Full crop roadmap ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
						})
					]
				})]
			})
		]
	});
}
function StatCard({ label, value, hint, tone, bar }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass hover-lift rounded-2xl p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] font-medium uppercase tracking-widest text-muted-foreground",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThermometerSun, { className: "hidden" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `mt-2 font-display text-2xl font-bold ${tone === "primary" ? "text-primary" : tone === "cyan" ? "text-cyan" : tone === "warning" ? "text-warning" : "text-foreground"}`,
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-[11px] text-muted-foreground",
				children: hint
			}),
			bar !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 h-1.5 overflow-hidden rounded-full bg-secondary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full rounded-full bg-gradient-to-r from-primary to-cyan",
					style: { width: `${Math.min(bar, 100)}%` }
				})
			})
		]
	});
}
//#endregion
export { Dashboard as component };
