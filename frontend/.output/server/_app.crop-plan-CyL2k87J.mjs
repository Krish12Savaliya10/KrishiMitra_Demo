import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { At as CalendarClock, J as ListChecks, Lt as Activity, Mt as Brain, Ot as Calendar, S as ShieldAlert, _ as Sprout, c as Timer, ct as Droplet, d as Thermometer, gt as Clock, ht as CloudRain, kt as CalendarRange, n as Wind, nt as FlaskConical, o as TriangleAlert, p as Target, pt as Cloud, q as ListTodo, rt as Flag, st as Droplets, v as Sparkles, vt as ClipboardList, xt as CircleAlert, yt as CircleCheck } from "./_libs/lucide-react.mjs";
import { r as useAppData, t as Route$10 } from "./_ssr/router-DjYzLMk_.mjs";
import { r as PageHeader } from "./_ssr/AppShell-DJ1b3bto.mjs";
import { n as subscribeAiSyncRefresh } from "./_ssr/aiSyncEvents-D9hVvtz4.mjs";
import { t as FarmSwitcher } from "./_ssr/FarmSwitcher-DkqqIKgL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.crop-plan-CyL2k87J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CurrentStageCard({ activeStage, currentDay, durationDays, stageProgress, harvestDate }) {
	if (!activeStage) return null;
	const daysRemaining = Math.max(0, durationDays - currentDay);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-2xl p-5 border-l-4 border-l-primary shadow-sm relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-start mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-sm font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "w-4 h-4 text-primary" }), " Current Stage"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xl font-display font-bold text-foreground mt-1",
					children: activeStage.stage
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground uppercase tracking-wider",
						children: [
							"Day ",
							currentDay,
							" of ",
							durationDays
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-lg font-bold text-primary",
						children: [Math.round(stageProgress), "%"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-2 w-full bg-secondary/80 rounded-full overflow-hidden mb-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-gradient-to-r from-primary to-cyan transition-all duration-1000 ease-out",
					style: { width: `${Math.min(100, Math.max(0, stageProgress))}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-4 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-2 bg-secondary/50 rounded-lg text-cyan",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, { className: "w-4 h-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-muted-foreground uppercase tracking-wider",
						children: "Days Remaining"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-semibold",
						children: [daysRemaining, " Days"]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-2 bg-secondary/50 rounded-lg text-warning",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "w-4 h-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-muted-foreground uppercase tracking-wider",
						children: "Est. Harvest"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: harvestDate || "Not Available"
					})] })]
				})]
			})
		]
	});
}
function PlanSummaryCard({ activePlan, durationDays, harvestDate }) {
	if (!activePlan) return null;
	const data = [
		{
			label: "Crop",
			value: activePlan.cropName || "Not Available"
		},
		{
			label: "Variety",
			value: activePlan.variety || "Not Available"
		},
		{
			label: "Farm Name",
			value: activePlan.farmName || "Not Available"
		},
		{
			label: "Area",
			value: activePlan.areaAcres ? `${activePlan.areaAcres} acres` : "Not Available"
		},
		{
			label: "Season",
			value: activePlan.season || "Not Available"
		},
		{
			label: "Seed Rate",
			value: activePlan.seedRateKgPerAcre ? `${activePlan.seedRateKgPerAcre} kg/acre` : "Not Available"
		},
		{
			label: "Expected Yield",
			value: activePlan.targetYieldKg ? `${activePlan.targetYieldKg} kg` : "Not Available"
		},
		{
			label: "Estimated Cost",
			value: activePlan.estimatedCost ? `₹${activePlan.estimatedCost.toLocaleString("en-IN")}` : "Not Available"
		},
		{
			label: "Expected Revenue",
			value: activePlan.expectedRevenue ? `₹${activePlan.expectedRevenue.toLocaleString("en-IN")}` : "Not Available"
		},
		{
			label: "Harvest Date",
			value: harvestDate || "Not Available"
		},
		{
			label: "Crop Duration",
			value: durationDays ? `${durationDays} days` : "Not Available"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-2xl p-5 shadow-sm h-full flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "w-4 h-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-semibold text-foreground",
				children: "Plan Summary"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
			className: "space-y-3 flex-1 overflow-y-auto pr-2 scrollbar-thin",
			children: data.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center text-xs border-b border-border/50 pb-2 last:border-0 last:pb-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-muted-foreground",
					children: item.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "font-semibold text-foreground text-right",
					children: item.value
				})]
			}, idx))
		})]
	});
}
function AiFarmAdvisor({ cropName }) {
	const insights = [
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-3.5 h-3.5 text-emerald-500" }),
			text: "Crop growth is healthy and on track."
		},
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudRain, { className: "w-3.5 h-3.5 text-cyan-400" }),
			text: "Rain expected tomorrow."
		},
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplet, { className: "w-3.5 h-3.5 text-warning" }),
			text: "Delay next irrigation due to rain."
		},
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "w-3.5 h-3.5 text-primary" }),
			text: `Monitor for early signs of pests specific to ${cropName || "your crop"}.`
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-2xl p-5 border border-primary/20 shadow-sm relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between items-center mb-4 relative z-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
				className: "text-sm font-bold text-foreground flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 text-primary" }), " AI Farm Advisor"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10px] uppercase font-bold tracking-widest text-primary/80 bg-primary/10 px-2 py-0.5 rounded-full",
				children: "Live Insights"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 relative z-10",
			children: [insights.map((insight, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-0.5 p-1 bg-secondary/80 rounded-md shrink-0 border border-border/50",
					children: insight.icon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground leading-snug",
					children: insight.text
				})]
			}, idx)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 pt-4 border-t border-border/50 flex justify-between items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground font-medium",
					children: "Crop Health Score"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-1.5 w-16 bg-secondary rounded-full overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full bg-emerald-500 w-[92%]" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-bold text-emerald-400",
						children: "92%"
					})]
				})]
			})]
		})]
	});
}
function WeatherCard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-2xl p-5 shadow-sm h-full flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-sm font-semibold text-foreground flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud, { className: "w-4 h-4 text-cyan-400" }), " Today's Weather"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] text-muted-foreground uppercase tracking-widest",
					children: "Simulated"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4 mb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-4xl font-display font-light",
					children: "32°"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 grid grid-cols-2 gap-2 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thermometer, { className: "w-3.5 h-3.5" }), " Feels 34°"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "w-3.5 h-3.5" }), " 65% Hum"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud, { className: "w-3.5 h-3.5" }), " 10% Rain"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, { className: "w-3.5 h-3.5" }), " 12 km/h"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto bg-secondary/50 rounded-xl p-3 border border-border/50",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-2",
					children: "Weather Impact"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Should irrigate?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 text-emerald-400 font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3 h-3" }), " Yes"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Can spray pesticides?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 text-emerald-400 font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3 h-3" }), " Ideal"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Disease Risk"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 text-warning font-semibold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-3 h-3" }), " Moderate"]
							})]
						})
					]
				})]
			})
		]
	});
}
function SoilHealthCard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-2xl p-5 shadow-sm h-full flex flex-col cursor-pointer hover:bg-secondary/20 transition-colors group",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-center mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-sm font-semibold text-foreground flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "w-4 h-4 text-warning" }), " Soil Health"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] text-muted-foreground uppercase tracking-widest group-hover:text-primary transition-colors",
					children: "Future Integration"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3 flex-1 flex flex-col justify-center",
				children: [
					{
						name: "Nitrogen (N)",
						level: "Low",
						value: "110 kg/ha",
						color: "text-warning",
						bg: "bg-warning/10"
					},
					{
						name: "Phosphorus (P)",
						level: "Ideal",
						value: "35 kg/ha",
						color: "text-emerald-400",
						bg: "bg-emerald-400/10"
					},
					{
						name: "Potassium (K)",
						level: "Ideal",
						value: "180 kg/ha",
						color: "text-emerald-400",
						bg: "bg-emerald-400/10"
					},
					{
						name: "pH Level",
						level: "High",
						value: "7.8",
						color: "text-destructive",
						bg: "bg-destructive/10"
					}
				].map((n, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted-foreground",
						children: n.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-semibold text-foreground",
							children: n.value
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${n.color} ${n.bg}`,
							children: n.level
						})]
					})]
				}, idx))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 pt-3 border-t border-border/50 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] text-muted-foreground group-hover:text-primary transition-colors",
					children: "Click to view detailed analysis (Coming soon)"
				})
			})
		]
	});
}
function ProgressMetrics({ tasksDone, todayTasks, upcomingTasks, seasonProgress }) {
	const metrics = [
		{
			label: "Tasks Completed",
			value: tasksDone || 0,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { className: "w-4 h-4 text-emerald-400" })
		},
		{
			label: "Today's Tasks",
			value: todayTasks || 0,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "w-4 h-4 text-primary" })
		},
		{
			label: "Upcoming",
			value: upcomingTasks || 0,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListTodo, { className: "w-4 h-4 text-cyan-400" })
		},
		{
			label: "Crop Progress",
			value: `${seasonProgress || 0}%`,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "w-4 h-4 text-warning" })
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-6",
		children: metrics.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-secondary/60 p-2.5 rounded-full mb-2 border border-border/50",
					children: m.icon
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xl font-display font-bold text-foreground",
					children: m.value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5",
					children: m.label
				})
			]
		}, i))
	});
}
function VerticalTimeline({ cropStages, stageTips, stageTipsLoading, stageProgress, getStageActivities }) {
	if (!cropStages || cropStages.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative space-y-6 pl-8 before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent",
		children: cropStages.map((s, i) => {
			const isActive = s.status === "active";
			const isDone = s.status === "done";
			const isUpcoming = s.status === "upcoming";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `absolute left-0 -ml-[19px] md:left-1/2 md:-ml-[11px] grid h-6 w-6 place-items-center rounded-full text-[10px] font-bold z-10 shadow-sm transition-transform duration-300 ${isDone ? "bg-primary text-primary-foreground scale-110" : isActive ? "bg-primary/20 text-primary ring-4 ring-primary/20 pulse-dot scale-125" : "bg-secondary ring-2 ring-border text-muted-foreground scale-100"}`,
					children: isDone ? "✓" : isActive ? "●" : "○"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-[calc(100%-1rem)] md:w-[calc(50%-2rem)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `glass rounded-2xl p-5 shadow-sm transition-all duration-300 ${isActive ? "border-primary/50 glow-emerald scale-[1.02]" : isUpcoming ? "opacity-70 hover:opacity-100" : "opacity-80"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2 mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: `font-display text-base font-bold ${isActive ? "text-primary" : "text-foreground"}`,
									children: s.stage
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-semibold text-muted-foreground bg-secondary/80 px-2 py-0.5 rounded-full border border-border/50",
									children: s.window
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-x-4 gap-y-2 mb-4 text-[11px] text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 font-medium",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3 h-3" }),
											" ",
											s.durationDays || "—",
											" days"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 font-medium",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "w-3 h-3" }),
											" ",
											s.tasksDone,
											"/",
											s.tasks,
											" tasks"
										]
									}),
									isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-primary flex items-center gap-1",
										children: [
											"● ",
											stageProgress,
											"% through"
										]
									}),
									isDone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-emerald-400",
										children: "Completed ✓"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] uppercase font-bold tracking-widest text-muted-foreground",
									children: "Objectives"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5",
									children: getStageActivities(s.stage, s.majorTasks).map((act) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-lg bg-secondary/60 border border-border/50 px-2 py-1 text-[11px] text-foreground",
										children: act
									}, `${s._id}-${act}`))
								})]
							}),
							isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 pt-4 border-t border-border/50 space-y-3",
								children: [stageTipsLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground animate-pulse",
									children: "Analyzing optimal conditions…"
								}), !stageTipsLoading && stageTips && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [
										stageTips.irrigation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-2 bg-cyan-400/5 rounded-xl p-3 border border-cyan-400/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "w-4 h-4 text-cyan-400 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[9px] uppercase font-bold tracking-widest text-cyan-400/70 mb-0.5",
												children: "Irrigation Tasks"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-foreground leading-snug",
												children: stageTips.irrigation
											})] })]
										}),
										stageTips.fertilizer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-2 bg-warning/5 rounded-xl p-3 border border-warning/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "w-4 h-4 text-warning shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[9px] uppercase font-bold tracking-widest text-warning/70 mb-0.5",
												children: "Fertilizer Tasks"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-foreground leading-snug",
												children: stageTips.fertilizer
											})] })]
										}),
										stageTips.watch_for && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "col-span-full flex items-start gap-2 bg-destructive/5 rounded-xl p-3 border border-destructive/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "w-4 h-4 text-destructive shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[9px] uppercase font-bold tracking-widest text-destructive/70 mb-0.5",
												children: "Pest & Disease Monitoring"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-foreground leading-snug",
												children: stageTips.watch_for
											})] })]
										}),
										stageTips.critical && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "col-span-full flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-destructive bg-destructive/10 px-3 py-1.5 rounded-lg w-fit",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-3 h-3" }), " Critical stage — do not skip"]
										})
									]
								})]
							})
						]
					})
				})]
			}, s._id || i);
		})
	});
}
function NextTaskCard({ planTasks }) {
	const navigate = useNavigate();
	if (!planTasks || planTasks.length === 0) return null;
	const nextTask = planTasks.filter((t) => t.status !== "done").sort((a, b) => new Date(a.date) - new Date(b.date))[0];
	if (!nextTask) return null;
	const isHighPriority = nextTask.priority === "high";
	const dateObj = new Date(nextTask.date);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "glass rounded-2xl p-5 border-t border-t-primary/30 shadow-[0_4px_24px_-12px_rgba(var(--color-primary),0.3)] relative overflow-hidden group cursor-pointer",
		onClick: () => navigate({ to: "/schedule" }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between items-start mb-4 relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
					className: "text-sm font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "w-4 h-4 text-primary" }), " Up Next"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[10px] font-bold tracking-wider uppercase bg-secondary px-2 py-1 rounded-md text-foreground flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3 h-3 text-primary" }), !isNaN(dateObj) ? dateObj.toLocaleDateString("en-IN", {
						weekday: "short",
						month: "short",
						day: "numeric"
					}) : "Pending"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-1 mb-4 relative z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "text-base font-bold text-foreground leading-tight",
					children: nextTask.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground line-clamp-2",
					children: nextTask.description
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3 text-[11px] font-medium text-muted-foreground border-t border-border/50 pt-3 relative z-10",
				children: [isHighPriority && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex items-center gap-1 text-destructive font-bold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-3.5 h-3.5" }), " High Priority"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "uppercase tracking-widest bg-secondary/80 px-2 py-0.5 rounded-md text-foreground",
					children: nextTask.category || "General"
				})]
			})
		]
	});
}
var API_URL = typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api";
var STAGE_ACTIVITIES = {
	"Land Preparation": [
		"Deep Ploughing",
		"FYM Application",
		"Levelling",
		"Soil Testing"
	],
	"Pit Preparation": [
		"Pit Digging",
		"Compost Filling",
		"Drainage Layout"
	],
	"Sowing": [
		"Seed Treatment",
		"Sowing",
		"First Irrigation",
		"Gap Filling"
	],
	"Sett Planting": [
		"Sett Preparation",
		"Furrow Planting",
		"First Irrigation"
	],
	"Rhizome Planting": [
		"Rhizome Treatment",
		"Bed Planting",
		"Mulching"
	],
	"Nursery": [
		"Nursery Bed Prep",
		"Seed Sowing",
		"Damping-off Watch",
		"Irrigation"
	],
	"Germination": [
		"Germination Count",
		"Gap Filling",
		"Light Irrigation",
		"Weed Removal"
	],
	"Planting": [
		"Transplanting",
		"First Irrigation",
		"Mulching",
		"Gap Filling"
	],
	"Transplanting": [
		"Evening Transplanting",
		"First Irrigation",
		"Staking",
		"Gap Filling"
	],
	"Crop Establishment": [
		"Gap Filling",
		"Irrigation",
		"Thrips Scouting",
		"Weed Control"
	],
	"Seedling Growth": [
		"Thinning",
		"Weed Removal",
		"First Irrigation",
		"Growth Check"
	],
	"Seedling Stage": [
		"Thinning",
		"Earthing-Up",
		"Weed Scout",
		"N Top-Dress"
	],
	"Seedling Establishment": [
		"Gap Filling",
		"Thinning",
		"Weed Control",
		"First Irrigation"
	],
	"Vegetative Growth": [
		"Irrigation",
		"N Top-Dressing",
		"Weed Control",
		"Pest Scouting"
	],
	"Active Vegetative Growth": [
		"Desuckering",
		"Fertilizer Dose",
		"Disease Scout",
		"Irrigation"
	],
	"Early Vegetative Growth": [
		"Desuckering",
		"Mulch Refresh",
		"Sigatoka Scouting",
		"Irrigation"
	],
	"Tillering": [
		"Irrigation (CRI)",
		"N Top-Dress",
		"Weed Control",
		"Tiller Count"
	],
	"Sprouting": [
		"Mulching",
		"Irrigation",
		"Earthing-Up",
		"Sprout Count"
	],
	"Branching": [
		"Irrigation",
		"Pod Borer Scout",
		"Weed Control",
		"Growth Check"
	],
	"Jointing": [
		"Irrigation",
		"Rust Monitoring",
		"N Application",
		"Lodging Check"
	],
	"Squaring": [
		"Square Count",
		"Bollworm Monitoring",
		"Fertilizer",
		"Whitefly Scout"
	],
	"Flowering": [
		"Flower Monitoring",
		"Irrigation",
		"Micronutrient Spray",
		"Pest Scout"
	],
	"Shooting / Flowering": [
		"Shoot Monitoring",
		"Male Bud Removal",
		"Bunch Sleeving",
		"K Dose"
	],
	"Umbel Formation": [
		"Irrigation",
		"Aphid Scout",
		"Weed Control",
		"Canopy Check"
	],
	"Tasseling / Silking": [
		"Irrigation",
		"Fall Armyworm Scout",
		"Topdress",
		"Silking Watch"
	],
	"Button Stage (Bud)": [
		"Irrigation",
		"Bud Count",
		"Bird Protection",
		"Fertilizer"
	],
	"Pod Filling": [
		"Irrigation",
		"Pod Borer Scout",
		"K Dose",
		"Crop Check"
	],
	"Pod Development": [
		"Pod Count",
		"Irrigation",
		"Pest Scout",
		"K Top-Dress"
	],
	"Pod (Siliqua) Development": [
		"Siliqua Count",
		"Aphid Scout",
		"Irrigation",
		"Crop Check"
	],
	"Bunch Development": [
		"Bunch Fill Check",
		"Leaf Pruning",
		"K Dose",
		"Irrigation"
	],
	"Boll Development": [
		"Boll Count",
		"K Spray",
		"Pink Bollworm Scout",
		"Irrigation"
	],
	"Boll Opening": [
		"Boll Opening Count",
		"First Picking",
		"Contamination Check"
	],
	"Grain Filling": [
		"Irrigation",
		"Bird Protection",
		"Pest Scout",
		"Grain Check"
	],
	"Primary Spike Initiation": [
		"Raceme Count",
		"Capsule Borer Scout",
		"Semi-Looper Check"
	],
	"Primary Spike Flowering": [
		"Spray",
		"Capsule Count",
		"Irrigation",
		"Pest Scout"
	],
	"Secondary Spike Development": [
		"Irrigation",
		"Weeding",
		"Pest Scout",
		"Spray"
	],
	"Capsule Maturation": [
		"Maturity Check",
		"Staggered Harvest",
		"Capsule Count"
	],
	"Rhizome Initiation": [
		"Stop N",
		"K Application",
		"Rhizome Rot Check",
		"Reduce Irrigation"
	],
	"Rhizome Maturation": [
		"Leaf Yellowing Check",
		"Stop Irrigation",
		"Harvest Prep"
	],
	"Bulb Initiation": [
		"Stop N Fertilizer",
		"Reduce Irrigation",
		"Purple Blotch Scout"
	],
	"Bulb Development": [
		"Neck Fall Check",
		"Drainage Inspection",
		"Final Irrigation"
	],
	"Maturity": [
		"Grain Hardness Test",
		"Stop Irrigation",
		"Harvest Prep"
	],
	"Maturation": [
		"Pod Colour Check",
		"Stop Irrigation",
		"Yield Forecast"
	],
	"Maturation / Ripening": [
		"Brix Reading",
		"Irrigation Cutoff",
		"Harvest Scheduling"
	],
	"Maturity / Drying": [
		"Grain Moisture Check",
		"Harvest Timing",
		"Equipment Prep"
	],
	"Ripening": [
		"Brix Check",
		"Field Drainage",
		"Mill Booking"
	],
	"Grand Growth": [
		"Irrigation",
		"Trash Mulching",
		"Red Rot Scout",
		"Propping"
	],
	"Seed Formation": [
		"Irrigation",
		"Pest Scout",
		"Canopy Check"
	],
	"Seed Maturation": [
		"Moisture Check",
		"Pre-Harvest Check",
		"Equipment Prep"
	],
	"Seed Development": [
		"Bird Protection",
		"Irrigation",
		"Blight Scout"
	],
	"Fruiting": [
		"Fruit Borer Scout",
		"K Spray",
		"Irrigation",
		"Blight Check"
	],
	"Multiple Pickings": [
		"Red-Green Picking",
		"K Spray",
		"Pest Scout"
	],
	"First Harvest": [
		"Maturity Check",
		"Picking at 80% Colour",
		"Post-Harvest"
	],
	"Pegging": [
		"Gypsum Application",
		"Earthing-Up",
		"Leaf Spot Spray"
	],
	"Tuber Initiation": [
		"Irrigation",
		"Blight Scout",
		"Earthing-Up"
	],
	"Tuber Bulking": [
		"Irrigation",
		"K Dose",
		"Blight Control"
	],
	"Sprouting": [
		"Mulch Check",
		"Irrigation",
		"Earthing-Up"
	],
	"Panicle Initiation": [
		"Blast Scout",
		"N Panicle Dose",
		"Irrigation"
	],
	"Heading": [
		"Aphid Scout",
		"Irrigation",
		"Ear Emergence Check"
	],
	"Heading / Ear Emergence": [
		"Rust Scout",
		"Irrigation",
		"N Top-Dress"
	],
	"Heading / Flowering": [
		"Blast Check",
		"BPH Scout",
		"Irrigation"
	],
	"Tillering": [
		"Irrigation",
		"N Top-Dress",
		"Tiller Count",
		"Weed Control"
	],
	"Harvest": [
		"Harvest Operation",
		"Threshing",
		"Drying",
		"Storage",
		"Yield Recording"
	],
	"Germination": [
		"Germination Count",
		"Gap Filling",
		"Irrigation",
		"Weed Removal"
	],
	"Pit Preparation": [
		"Pit Digging",
		"Compost Filling",
		"Drainage Layout"
	]
};
function getStageActivities(stageName, majorTasks) {
	const mapped = STAGE_ACTIVITIES[stageName];
	if (mapped && mapped.length > 0) return mapped.slice(0, 4);
	if (majorTasks && majorTasks.length > 0) return majorTasks.map((t) => t.split(" — ")[0].replace(/ begins$/, "").trim()).filter(Boolean).slice(0, 4);
	return [
		"Field Monitoring",
		"Irrigation",
		"Crop Check"
	];
}
function CropPlanPage() {
	const search = Route$10.useSearch();
	const { activeFarmId, activeFarm, token, fetchScoped } = useAppData();
	const [cropPlans, setCropPlans] = (0, import_react.useState)([]);
	const [planTasks, setPlanTasks] = (0, import_react.useState)([]);
	const navigate = useNavigate();
	const [stageTips, setStageTips] = (0, import_react.useState)(null);
	const [stageTipsLoading, setStageTipsLoading] = (0, import_react.useState)(false);
	const [isAiModalOpen, setIsAiModalOpen] = (0, import_react.useState)(false);
	const [isGenerating, setIsGenerating] = (0, import_react.useState)(false);
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [previewPlan, setPreviewPlan] = (0, import_react.useState)(null);
	const [aiForm, setAiForm] = (0, import_react.useState)({
		cropName: "",
		companionCrop: ""
	});
	const [supportedCrops, setSupportedCrops] = (0, import_react.useState)([]);
	const [companionSuggestions, setCompanionSuggestions] = (0, import_react.useState)([]);
	const [isMidwayModalOpen, setIsMidwayModalOpen] = (0, import_react.useState)(false);
	const [midwayPercent, setMidwayPercent] = (0, import_react.useState)(50);
	const [isStartingMidway, setIsStartingMidway] = (0, import_react.useState)(false);
	const [isDropping, setIsDropping] = (0, import_react.useState)(false);
	const [selectedPlanId, setSelectedPlanId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (search.crop) {
			setAiForm((prev) => ({
				...prev,
				cropName: search.crop
			}));
			setIsAiModalOpen(true);
		}
	}, [search.crop]);
	(0, import_react.useEffect)(() => {
		fetch(`${API_URL}/crop-plans/supported-crops`).then((r) => r.json()).then((data) => setSupportedCrops(Array.isArray(data) ? data : [])).catch((err) => console.error("Failed to load supported crops:", err));
	}, []);
	(0, import_react.useEffect)(() => {
		if (aiForm.cropName) fetch(`${API_URL}/crop-plans/companion-suggestions/?crop=${aiForm.cropName}`).then((r) => r.json()).then((data) => setCompanionSuggestions(Array.isArray(data) ? data : [])).catch((err) => console.error("Failed to load companion suggestions:", err));
		else setCompanionSuggestions([]);
	}, [aiForm.cropName]);
	const handleAiSubmit = async (e) => {
		e.preventDefault();
		const month = (/* @__PURE__ */ new Date()).getMonth();
		const year = (/* @__PURE__ */ new Date()).getFullYear();
		let computedSeason = "Zaid";
		if (month >= 5 && month <= 9) computedSeason = "Kharif";
		else if (month >= 10 || month <= 2) computedSeason = "Rabi";
		computedSeason = `${computedSeason} ${year}`;
		const area = activeFarm?.areaAcres || 1;
		const irrigation = activeFarm?.waterResources?.length > 0 ? activeFarm.waterResources.join(", ") : "Rainfed";
		let prompt = `@cropPlan Generate a crop plan. Crop: ${aiForm.cropName}`;
		if (aiForm.companionCrop) prompt = `@cropPlan Generate an intercropping plan for Primary Crop: ${aiForm.cropName} and Companion Crop: ${aiForm.companionCrop}. Generate integrated milestones and tasks for both crops growing simultaneously.`;
		prompt += `, Season: ${computedSeason}, Area: ${area} acres, Irrigation: ${irrigation}.`;
		setIsGenerating(true);
		try {
			const res = await fetch(`${API_URL}/chat`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					message: prompt,
					sessionId: `s-${Date.now()}`,
					farmId: activeFarmId,
					forceJson: true
				})
			});
			if (!res.ok) throw new Error("Failed to generate plan");
			const data = await res.json();
			if (data && data.result) {
				setPreviewPlan(data.result);
				setIsAiModalOpen(false);
			} else toast.error("AI failed to output a valid plan format.");
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
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					syncData: previewPlan,
					farmId: activeFarmId,
					replace
				})
			});
			if (!res.ok) {
				let errMsg = `Server error ${res.status}`;
				try {
					const errBody = await res.json();
					errMsg = errBody.message || errBody.error || errMsg;
				} catch (_) {}
				throw new Error(errMsg);
			}
			const data = await res.json();
			if (data.warnings && data.warnings.length > 0) data.warnings.forEach((w) => toast.warning(w));
			if (data.tasksGenerated > 0 && (!data.warnings || data.warnings.length === 0)) toast.success(`Plan saved! ${data.tasksGenerated} tasks generated.`);
			else if (data.tasksGenerated > 0) toast.success(`Plan saved with ${data.tasksGenerated} tasks (see warnings).`);
			else toast.warning("Plan saved, but no tasks were generated. Check your crop plan.");
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
	const fetchCropPlans = (0, import_react.useCallback)(async () => {
		if (!activeFarmId || !token) return;
		try {
			const data = await fetchScoped("/crop-plans");
			const plans = Array.isArray(data) ? data : [];
			setCropPlans(plans);
			setSelectedPlanId((currentId) => {
				if (!currentId || !plans.find((p) => p._id === currentId)) return plans.length > 0 ? plans[0]._id : null;
				return currentId;
			});
		} catch (err) {
			console.error(err);
		}
	}, [
		activeFarmId,
		token,
		fetchScoped
	]);
	const activePlan = cropPlans.find((p) => p._id === selectedPlanId) || cropPlans[0] || null;
	(0, import_react.useEffect)(() => {
		fetchCropPlans();
	}, [fetchCropPlans]);
	const handleStartMidway = async () => {
		if (!activePlan?._id || !token) return;
		setIsStartingMidway(true);
		try {
			const res = await fetch(`${API_URL}/crop-plans/${activePlan._id}/start-daily-schedule`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({ startPercent: midwayPercent })
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
	const handleDropPlan = async () => {
		if (!activePlan?._id || !token) return;
		if (!window.confirm(`Drop the current ${activePlan.cropName} plan and all its daily tasks? This can't be undone. You can then generate a plan for a new crop.`)) return;
		setIsDropping(true);
		try {
			const res = await fetch(`${API_URL}/crop-plans/${activePlan._id}/drop`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				}
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
	(0, import_react.useEffect)(() => {
		if (activePlan?.tasks) setPlanTasks(Array.isArray(activePlan.tasks) ? activePlan.tasks : []);
		else setPlanTasks([]);
	}, [activePlan]);
	(0, import_react.useEffect)(() => {
		return subscribeAiSyncRefresh(() => {
			fetchCropPlans();
		});
	}, [fetchCropPlans]);
	const cropStages = (0, import_react.useMemo)(() => {
		if (!activePlan?.milestones?.length) return [];
		const sortedMilestones = [...activePlan.milestones].sort((a, b) => new Date(a.plannedDate) - new Date(b.plannedDate));
		const harvestDate = activePlan.expectedHarvestDate ? new Date(activePlan.expectedHarvestDate) : null;
		const oneDay = 864e5;
		const toDayStart = (d) => {
			const x = new Date(d);
			x.setHours(0, 0, 0, 0);
			return x;
		};
		const today = toDayStart(/* @__PURE__ */ new Date());
		const fmt = (date) => !isNaN(date) ? date.toLocaleDateString("en-IN", {
			month: "short",
			day: "numeric"
		}) : "—";
		const dayDiff = (a, b) => Math.max(0, Math.round((toDayStart(b) - toDayStart(a)) / oneDay)) || 0;
		return sortedMilestones.map((m, i) => {
			const start = toDayStart(m.plannedDate);
			const nextStart = sortedMilestones[i + 1]?.plannedDate ? toDayStart(sortedMilestones[i + 1].plannedDate) : null;
			const end = nextStart ? /* @__PURE__ */ new Date(nextStart.getTime() - oneDay) : harvestDate ? toDayStart(harvestDate) : start;
			const stageTasks = planTasks.filter((task) => {
				const taskDate = toDayStart(task.date);
				return taskDate >= start && taskDate <= end;
			});
			const stageTasksDone = stageTasks.filter((task) => task.status === "done").length;
			const majorTasks = stageTasks.filter((task) => task.priority === "high" || task.priority === "medium" || task.category !== "monitoring").slice(0, 3).map((task) => task.title);
			const fallbackMajorTasks = stageTasks.slice(0, 2).map((task) => task.title);
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
				majorTasks: majorTasks.length ? majorTasks : fallbackMajorTasks
			};
		});
	}, [activePlan, planTasks]);
	const cropName = activePlan ? `${activePlan.cropName}${activePlan.variety ? ` (${activePlan.variety})` : ""}` : "No active plan";
	const sowingDateObj = activePlan?.sowingDate ? new Date(activePlan.sowingDate) : null;
	const harvestDateObj = activePlan?.expectedHarvestDate ? new Date(activePlan.expectedHarvestDate) : null;
	const sowingDate = sowingDateObj && !isNaN(sowingDateObj) ? sowingDateObj.toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric"
	}) : "—";
	const harvestDate = harvestDateObj && !isNaN(harvestDateObj) ? harvestDateObj.toLocaleDateString("en-IN", {
		day: "numeric",
		month: "short",
		year: "numeric"
	}) : "—";
	const durationDays = sowingDateObj && harvestDateObj && !isNaN(sowingDateObj) && !isNaN(harvestDateObj) ? Math.max(1, Math.round((new Date(activePlan.expectedHarvestDate) - new Date(activePlan.sowingDate)) / 864e5)) : 0;
	const _activeCropName = activePlan?.cropName || "Soybean";
	const _activeStageForRag = cropStages?.find?.((s) => s.status === "active")?.stage || null;
	(0, import_react.useEffect)(() => {
		if (!_activeStageForRag) return;
		setStageTips(null);
		setStageTipsLoading(true);
		fetch(`${API_URL}/crop_stage_tips`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				crop: _activeCropName,
				stage: _activeStageForRag
			})
		}).then((r) => r.json()).then((d) => {
			if (d.found && d.tips) setStageTips(d.tips);
		}).catch(() => {}).finally(() => setStageTipsLoading(false));
	}, [_activeCropName, _activeStageForRag]);
	const seasonProgress = (0, import_react.useMemo)(() => {
		if (!activePlan?.sowingDate || !durationDays) return 0;
		const today = /* @__PURE__ */ new Date();
		const sowing = new Date(activePlan.sowingDate);
		const elapsed = Math.max(0, Math.round((today - sowing) / 864e5));
		return Math.min(100, Math.round(elapsed / durationDays * 100));
	}, [activePlan?.sowingDate, durationDays]);
	const stageProgress = (0, import_react.useMemo)(() => {
		if (!activePlan?.sowingDate || !activePlan?.milestones?.length) return 0;
		const today = /* @__PURE__ */ new Date();
		const sowing = new Date(activePlan.sowingDate);
		const elapsed = Math.max(0, Math.round((today - sowing) / 864e5));
		const sortedMs = [...activePlan.milestones].sort((a, b) => new Date(a.plannedDate) - new Date(b.plannedDate));
		let activeMsIdx = 0;
		for (let i = 0; i < sortedMs.length; i++) if (Math.round((new Date(sortedMs[i].plannedDate) - sowing) / 864e5) <= elapsed) activeMsIdx = i;
		else break;
		const nextMs = sortedMs[activeMsIdx + 1];
		const thisMs = sortedMs[activeMsIdx];
		const stageStartDay = Math.round((new Date(thisMs.plannedDate) - sowing) / 864e5);
		const stageEndDay = nextMs ? Math.round((new Date(nextMs.plannedDate) - sowing) / 864e5) : durationDays;
		const stageDuration = Math.max(1, stageEndDay - stageStartDay);
		const daysIntoStage = Math.max(0, elapsed - stageStartDay);
		return Math.min(100, Math.round(daysIntoStage / stageDuration * 100));
	}, [
		activePlan?.sowingDate,
		activePlan?.milestones,
		durationDays
	]);
	cropStages.filter((s) => s.status === "done").length;
	const activeStage = cropStages.find((s) => s.status === "active");
	const currentDay = activePlan?.sowingDate ? Math.max(0, Math.round((/* @__PURE__ */ new Date() - new Date(activePlan.sowingDate)) / 864e5)) : 0;
	cropStages.slice(0, 4).map((s, i) => ({
		label: s.stage,
		date: s.window.split(" - ")[0],
		tone: i === 0 ? "primary" : i === 1 ? "cyan" : "warning"
	}));
	const { farms } = useAppData();
	if (!farms || farms.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Crop Plan",
		subtitle: "Generate AI-powered crop schedules for your farm"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center py-24 px-6 text-center gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-full bg-primary/10 p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "h-10 w-10 text-primary" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold text-foreground",
				children: "Add a Farm First"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground max-w-sm",
				children: "A crop plan is tied to a specific farm. Please create your farm before generating a crop plan."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => navigate({ to: "/farms" }),
				className: "flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_-8px_var(--color-primary)] transition-transform hover:scale-[1.03]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "h-4 w-4" }), " Go to Farms"]
			})
		]
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: `Crop Plan${activePlan ? ` — ${cropName}` : ""}`,
			subtitle: activePlan ? `Sown ${sowingDate} · Day ${currentDay} of ${durationDays}` : "Generate an AI-powered crop schedule for your farm",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FarmSwitcher, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => navigate({ to: "/schedule" }),
						className: "flex items-center gap-1.5 rounded-xl bg-secondary px-4 py-2 text-xs font-semibold text-secondary-foreground transition-transform hover:scale-[1.03]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarRange, { className: "h-3.5 w-3.5" }), " View Schedule"]
					}),
					activePlan && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setIsMidwayModalOpen(true),
						className: "flex items-center gap-1.5 rounded-xl border border-border bg-secondary/30 px-4 py-2 text-xs font-semibold transition-colors hover:bg-secondary",
						title: "Crop already partway grown? Start daily tasks from today instead of from the sowing date.",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "h-3.5 w-3.5" }), " Start Daily Tasks From Here"]
					}),
					activePlan && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleDropPlan,
						disabled: isDropping,
						className: "flex items-center gap-1.5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-2 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-60",
						title: "Drop this crop plan and its daily tasks, then grow a new crop instead.",
						children: isDropping ? "Dropping..." : "Drop Plan & Grow New Crop"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setIsAiModalOpen(true),
						className: "flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-[0_0_24px_-8px_var(--color-primary)] transition-transform hover:scale-[1.03]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), " Generate Plan with AI"]
					})
				]
			})
		}),
		cropPlans.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide",
			children: cropPlans.map((plan) => {
				const isSelected = selectedPlanId === plan._id || !selectedPlanId && activePlan?._id === plan._id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setSelectedPlanId(plan._id),
					className: `whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${isSelected ? "bg-primary text-primary-foreground shadow-md" : "bg-secondary/60 text-foreground hover:bg-secondary"}`,
					children: [
						plan.cropName,
						" ",
						plan.variety ? `(${plan.variety})` : ""
					]
				}, plan._id);
			})
		}),
		isMidwayModalOpen && activePlan && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mb-2 flex items-center gap-2 text-lg font-bold text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "h-5 w-5 text-primary" }), " Start Daily Tasks From Here"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-4 text-sm text-muted-foreground",
						children: [
							"If ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: activePlan.cropName
							}),
							" is already partway through its growth, jump daily tasks to that point instead of starting from the sowing date. Past milestones are marked done automatically."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mb-1 block text-xs font-medium text-muted-foreground",
						children: ["Crop growth reached: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold text-foreground",
							children: [midwayPercent, "%"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 5,
						max: 95,
						step: 5,
						value: midwayPercent,
						onChange: (e) => setMidwayPercent(Number(e.target.value)),
						className: "w-full accent-primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 flex justify-between text-[11px] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Just sown" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Half grown" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Near harvest" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex justify-end gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsMidwayModalOpen(false),
							className: "rounded-xl border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-secondary/50",
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: handleStartMidway,
							disabled: isStartingMidway,
							className: "flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-[0_0_24px_-8px_var(--color-primary)] disabled:opacity-60",
							children: isStartingMidway ? "Starting..." : "Start Daily Tasks"
						})]
					})
				]
			})
		}),
		isAiModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-lg font-bold text-foreground mb-4 flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5 text-primary" }), " Generate Crop Plan"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleAiSubmit,
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-xs font-medium text-muted-foreground",
							children: "Crop Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							required: true,
							value: aiForm.cropName,
							onChange: (e) => setAiForm({
								...aiForm,
								cropName: e.target.value,
								companionCrop: ""
							}),
							className: "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select a crop..."
							}), supportedCrops.map((crop) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: crop,
								children: crop
							}, crop))]
						})] }),
						aiForm.cropName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block text-xs font-medium text-muted-foreground",
								children: "Companion Crop / Intercropping (Optional)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: aiForm.companionCrop || "",
								onChange: (e) => setAiForm({
									...aiForm,
									companionCrop: e.target.value
								}),
								className: "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "None (Single Crop)"
								}), companionSuggestions.map((crop) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: crop,
									children: [crop, " (Recommended)"]
								}, crop))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-[10px] text-muted-foreground",
								children: "Selecting a companion crop will generate a unified intercropping plan with mixed tasks."
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-secondary/30 p-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between border-b border-border/50 pb-2 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Farm"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: activeFarm?.name || "Home Farm"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between border-b border-border/50 pb-2 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Area"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-medium",
										children: [activeFarm?.areaAcres || 1, " acres"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Water Source"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: activeFarm?.waterResources?.length > 0 ? activeFarm.waterResources.join(", ") : "Rainfed"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex justify-end gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setIsAiModalOpen(false),
								className: "rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary",
								disabled: isGenerating,
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-md hover:opacity-90 disabled:opacity-50",
								disabled: isGenerating,
								children: isGenerating ? "Generating..." : "Generate Plan"
							})]
						})
					]
				})]
			})
		}),
		previewPlan && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-bold text-foreground mb-4",
					children: "Preview AI Plan"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-secondary/30 p-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between border-b border-border/50 pb-2 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Crop"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: previewPlan.crop || previewPlan.cropPlan?.cropName || previewPlan.cropName
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between border-b border-border/50 pb-2 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Season"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: previewPlan.season || previewPlan.cropPlan?.season || previewPlan.season
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Generated Tasks"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: previewPlan.growth_stage_roadmap ? previewPlan.growth_stage_roadmap.reduce((acc, stage) => acc + (stage.daily_tasks?.length || stage.daily_tasks_count || 0), 0) : previewPlan.schedules?.length || previewPlan.tasks?.length || 0
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-xs font-medium text-muted-foreground",
							children: "Sowing Date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: (previewPlan.sowing_date || previewPlan.cropPlan?.sowingDate || previewPlan.sowingDate || "").split("T")[0],
							onChange: (e) => {
								if (previewPlan.sowing_date !== void 0) setPreviewPlan({
									...previewPlan,
									sowing_date: e.target.value
								});
								else if (previewPlan.cropPlan) setPreviewPlan({
									...previewPlan,
									cropPlan: {
										...previewPlan.cropPlan,
										sowingDate: e.target.value
									}
								});
								else setPreviewPlan({
									...previewPlan,
									sowingDate: e.target.value
								});
							},
							className: "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleSavePreview(true),
									disabled: isSaving,
									className: "w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md hover:opacity-90 disabled:opacity-60",
									children: isSaving ? "Saving..." : "Replace Current Plan"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleSavePreview(false),
									disabled: isSaving,
									className: "w-full rounded-lg border border-primary text-primary px-4 py-2.5 text-sm font-semibold hover:bg-primary/10 disabled:opacity-60",
									children: isSaving ? "Saving..." : "Keep Existing Plan (Add New)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setPreviewPlan(null),
									disabled: isSaving,
									className: "w-full rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary disabled:opacity-60",
									children: "Discard"
								})
							]
						})
					]
				})]
			})
		}),
		!activePlan && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center justify-center py-20 px-6 text-center gap-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-full bg-primary/10 p-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "h-10 w-10 text-primary" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold text-foreground",
					children: "No Crop Plan Yet"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground max-w-sm",
					children: [
						"Generate an AI-powered crop plan for ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold text-foreground",
							children: activeFarm?.name || "your farm"
						}),
						". It will include a full growth-stage roadmap and daily task schedule."
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setIsAiModalOpen(true),
					className: "flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_-8px_var(--color-primary)] transition-transform hover:scale-[1.03]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " Generate Plan with AI"]
				})
			]
		}),
		activePlan && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressMetrics, {
					tasksDone: planTasks.filter((t) => t.status === "done").length,
					todayTasks: planTasks.filter((t) => new Date(t.date).toDateString() === (/* @__PURE__ */ new Date()).toDateString()).length,
					upcomingTasks: planTasks.filter((t) => t.status !== "done" && new Date(t.date) > /* @__PURE__ */ new Date()).length,
					seasonProgress
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrentStageCard, {
							activeStage,
							currentDay,
							durationDays,
							stageProgress,
							harvestDate
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextTaskCard, { planTasks }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AiFarmAdvisor, { cropName: activePlan.cropName }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeatherCard, {})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 xl:grid-cols-4 gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "xl:col-span-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass rounded-2xl p-6 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mb-6 font-display text-lg font-bold text-foreground",
								children: "Growth Stage Roadmap"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerticalTimeline, {
								cropStages,
								stageTips,
								stageTipsLoading,
								stageProgress,
								getStageActivities
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "xl:col-span-1 flex flex-col gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanSummaryCard, {
							activePlan,
							durationDays,
							harvestDate
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoilHealthCard, {})]
					})]
				})
			]
		})
	] });
}
//#endregion
export { CropPlanPage as component };
