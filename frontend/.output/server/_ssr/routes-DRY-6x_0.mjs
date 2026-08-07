import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { g as Sprout, mt as ChartLine, ut as ChevronRight, v as Shield } from "../_libs/lucide-react.mjs";
import { a as ThemeToggle, n as BrandMark } from "./AppShell-22kaeU-F.mjs";
import { f as Cell, m as Tooltip, o as XAxis, p as ResponsiveContainer, r as BarChart, s as Area, t as AreaChart, u as Bar } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DRY-6x_0.js
var import_jsx_runtime = require_jsx_runtime();
var growthData = [
	{
		name: "Jan",
		value: 30
	},
	{
		name: "Feb",
		value: 45
	},
	{
		name: "Mar",
		value: 35
	},
	{
		name: "Apr",
		value: 65
	},
	{
		name: "May",
		value: 55
	},
	{
		name: "Jun",
		value: 85
	},
	{
		name: "Jul",
		value: 75
	}
];
var allocationData = [
	{
		name: "W",
		value: 400
	},
	{
		name: "S",
		value: 300
	},
	{
		name: "F",
		value: 550
	},
	{
		name: "C",
		value: 200
	},
	{
		name: "L",
		value: 650
	},
	{
		name: "T",
		value: 450
	}
];
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground font-sans selection:bg-primary/30",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl rounded-full glass border border-foreground/10 px-6 py-3 flex items-center justify-between shadow-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							className: "text-sm font-medium text-foreground hover:text-primary transition-colors",
							children: "Log in"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/auth",
							className: "rounded-full bg-primary/20 text-primary border border-primary/50 px-5 py-2 text-sm font-bold transition-all hover:bg-primary hover:text-background hover:glow-emerald",
							children: ["Get Started ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "inline h-4 w-4 ml-1" })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative flex flex-col items-center pt-48 pb-32 overflow-hidden px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 z-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&w=2000&q=80",
							alt: "Lush moss background",
							className: "w-full h-full object-cover opacity-30 mix-blend-luminosity"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 w-full max-w-5xl flex flex-col items-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-8 glow-emerald",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2 rounded-full bg-primary animate-pulse" }),
									"Welcome to KrishiMitra: Your Smart Farming Assistant ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "font-display text-5xl sm:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.1]",
								children: [
									"Intelligence that ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary italic pr-2",
										children: "grows"
									}),
									" with you."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground text-lg sm:text-xl max-w-2xl mb-10",
								children: "The all-in-one platform for agricultural teams who want clarity, precision, and sustainable growth from soil to harvest."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/auth",
								className: "rounded-full bg-primary text-background px-8 py-4 text-base font-bold transition-all hover:scale-105 glow-emerald flex items-center gap-2 mb-6",
								children: ["Start Free Trial ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative z-10 w-full max-w-6xl mt-24 grid grid-cols-1 md:grid-cols-3 gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-strong rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-500",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-12 w-12 rounded-xl border border-foreground/20 flex items-center justify-center mb-6",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "text-primary h-6 w-6" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-bold text-foreground mb-3",
										children: "Unify your farm data"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground text-sm leading-relaxed mb-8",
										children: "Connect all your sensors and weather data into a single source of truth."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "h-32 rounded-xl border border-foreground/10 bg-background/40 flex items-center justify-center overflow-hidden relative",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-8 rounded bg-foreground/10" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-8 rounded bg-foreground/10" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-8 rounded bg-foreground/10" })
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
												className: "absolute left-14 right-14 h-full w-[calc(100%-7rem)] opacity-30",
												preserveAspectRatio: "none",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d: "M0 20 C 50 20, 50 60, 100 60 M0 50 C 50 50, 50 60, 100 60 M0 80 C 50 80, 50 60, 100 60",
													stroke: "var(--color-primary)",
													fill: "none",
													strokeWidth: "2",
													strokeDasharray: "4 4"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute right-4 h-12 w-12 rounded-xl border border-primary/50 bg-primary/20 flex items-center justify-center glow-emerald",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "text-primary h-6 w-6" })
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-strong rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-500",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-12 w-12 rounded-xl border border-foreground/20 flex items-center justify-center mb-6",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLine, { className: "text-primary h-6 w-6" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-bold text-foreground mb-3",
										children: "Surface what matters"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground text-sm leading-relaxed mb-8",
										children: "AI that cuts through noise and highlights the insights that drive crop yield."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "h-32 rounded-xl border border-foreground/10 bg-background/40 pt-4 relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute right-4 top-2 text-xs font-bold text-primary flex items-center gap-1",
											children: "↑ 32%"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
											width: "100%",
											height: "100%",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
												data: growthData,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
													id: "colorValue",
													x1: "0",
													y1: "0",
													x2: "0",
													y2: "1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
														offset: "5%",
														stopColor: "var(--color-primary)",
														stopOpacity: .3
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
														offset: "95%",
														stopColor: "var(--color-primary)",
														stopOpacity: 0
													})]
												}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
													type: "monotone",
													dataKey: "value",
													stroke: "var(--color-primary)",
													strokeWidth: 2,
													fillOpacity: 1,
													fill: "url(#colorValue)"
												})]
											})
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass-strong rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-500",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-12 w-12 rounded-xl border border-foreground/20 flex items-center justify-center mb-6",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "text-primary h-6 w-6" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-xl font-bold text-foreground mb-3",
										children: "Act with confidence"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground text-sm leading-relaxed mb-8",
										children: "Built-in risk assessment and weather prediction so your farm can adapt fast, without risk."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "h-32 rounded-xl border border-foreground/10 bg-background/40 flex items-center justify-center relative overflow-hidden",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute inset-0 flex items-center justify-center",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-32 w-32 rounded-full border border-primary/20" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute h-20 w-20 rounded-full border border-primary/40" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute h-8 w-8 rounded-full border border-primary text-primary flex items-center justify-center bg-primary/10 glow-emerald",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-3 w-3" })
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute inset-0 bg-gradient-to-tr from-transparent via-primary/5 to-transparent animate-[spin_4s_linear_infinite]",
											style: { transformOrigin: "center" }
										})]
									})
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative py-32 px-6 flex justify-center overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-0 z-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=2000&q=80",
						alt: "Dark soil background",
						className: "w-full h-full object-cover opacity-20 mix-blend-luminosity"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 w-full max-w-5xl glass-strong rounded-[2.5rem] border border-foreground/20 p-8 sm:p-12 shadow-2xl overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-start mb-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-muted-foreground text-sm font-semibold uppercase tracking-wider mb-2",
							children: "AI for Success Toolkit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-4xl sm:text-5xl font-bold text-foreground tracking-tight",
							children: [
								"SUSTAINABLE ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"GROWTH"
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-center h-20 w-20 rounded-2xl border border-foreground/10 bg-background/30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex items-center justify-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									className: "w-16 h-16 transform -rotate-90",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "32",
										cy: "32",
										r: "28",
										stroke: "currentColor",
										strokeWidth: "4",
										fill: "transparent",
										className: "text-foreground/10"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "32",
										cy: "32",
										r: "28",
										stroke: "currentColor",
										strokeWidth: "4",
										fill: "transparent",
										strokeDasharray: "175",
										strokeDashoffset: "45",
										className: "text-primary drop-glow-emerald"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute text-sm font-bold text-foreground",
									children: "46%"
								})]
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-2 gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-foreground font-medium mb-6",
									children: "Growth Projections"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-40",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
										width: "100%",
										height: "100%",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
											data: growthData,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
													dataKey: "name",
													hide: true
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
													backgroundColor: "var(--color-card)",
													borderColor: "var(--color-border)",
													borderRadius: "8px"
												} }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
													type: "monotone",
													dataKey: "value",
													stroke: "var(--color-primary)",
													strokeWidth: 3,
													fillOpacity: 0
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
													type: "monotone",
													dataKey: "value",
													stroke: "var(--color-foreground)",
													strokeWidth: 1,
													fillOpacity: 0,
													className: "opacity-30",
													style: { transform: "translateY(10px)" }
												})
											]
										})
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-md",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-foreground font-medium mb-6",
									children: "Resource Allocation"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-40",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
										width: "100%",
										height: "100%",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
											data: allocationData,
											barSize: 20,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
													dataKey: "name",
													axisLine: false,
													tickLine: false,
													tick: {
														fill: "var(--color-muted-foreground)",
														fontSize: 12
													}
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
													cursor: { fill: "var(--color-accent)" },
													contentStyle: {
														backgroundColor: "var(--color-card)",
														borderColor: "var(--color-border)",
														borderRadius: "8px"
													}
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
													dataKey: "value",
													radius: [
														4,
														4,
														0,
														0
													],
													children: allocationData.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: index % 2 === 0 ? "var(--color-primary)" : "var(--color-primary-hover)" }, `cell-${index}`))
												})
											]
										})
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-md md:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-foreground font-medium mb-2",
											children: "Efficiency Score"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-4xl font-bold text-foreground mb-2",
											children: ["22,91 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-primary text-lg",
												children: "↑"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-end gap-1 h-12 mt-6",
											children: [
												30,
												40,
												20,
												50,
												60,
												40,
												70,
												80,
												60,
												90,
												70,
												100,
												80,
												60,
												40,
												50
											].map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-2 rounded-t-sm bg-primary/80 transition-all hover:bg-primary",
												style: { height: `${h}%` }
											}, i))
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative flex items-center justify-center h-24 w-24",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												className: "w-full h-full transform -rotate-90",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "48",
													cy: "48",
													r: "42",
													stroke: "currentColor",
													strokeWidth: "8",
													fill: "transparent",
													className: "text-foreground/10"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "48",
													cy: "48",
													r: "42",
													stroke: "currentColor",
													strokeWidth: "8",
													fill: "transparent",
													strokeDasharray: "264",
													strokeDashoffset: "120",
													className: "text-primary"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "absolute text-center",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-xl font-bold text-foreground",
													children: "46%"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[10px] text-muted-foreground uppercase",
													children: "Canopy"
												})]
											})]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative flex items-center justify-center h-24 w-24",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												className: "w-full h-full transform -rotate-90",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "48",
													cy: "48",
													r: "42",
													stroke: "currentColor",
													strokeWidth: "8",
													fill: "transparent",
													className: "text-foreground/10"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "48",
													cy: "48",
													r: "42",
													stroke: "currentColor",
													strokeWidth: "8",
													fill: "transparent",
													strokeDasharray: "264",
													strokeDashoffset: "200",
													className: "text-primary/50"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "absolute text-center",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-xl font-bold text-foreground",
													children: "9.96"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[10px] text-muted-foreground uppercase",
													children: "Yield"
												})]
											})]
										})
									})]
								})]
							})
						]
					})]
				})]
			})
		]
	});
}
//#endregion
export { Landing as component };
