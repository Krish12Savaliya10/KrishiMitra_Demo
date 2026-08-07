import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { G as Leaf, H as LoaderCircle, O as RotateCcw, Q as FlaskConical, _ as Sparkles, at as Crown, g as Sprout, rt as Droplets } from "./_libs/lucide-react.mjs";
import { r as useAppData } from "./_ssr/router-DcyHQImX.mjs";
import { r as PageHeader } from "./_ssr/AppShell-DaKle9m-.mjs";
import { n as subscribeAiSyncRefresh } from "./_ssr/aiSyncEvents-D9hVvtz4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.recommendations-ZzohrZpZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var API_URL = typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api";
var DEFAULT_FORM = {
	ph: "",
	nitrogen: "",
	phosphorus: "",
	potassium: "",
	organicCarbon: "",
	ec: "",
	startPreparationDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
};
var FARM_SOIL_TYPE_TO_LABEL = {
	black: "Black (Heavy)",
	red: "Red (Laterite)",
	laterite: "Red (Laterite)",
	sandy: "Sandy Loam",
	alluvial: "Alluvial",
	clay: "Clay",
	loamy: "Loamy",
	other: "Other"
};
function SoilInput({ label, id, value, onChange, placeholder, hint, step = "any" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: id,
				className: "text-[11px] font-semibold uppercase tracking-widest text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				id,
				type: "number",
				step,
				value,
				onChange: (e) => onChange(e.target.value),
				placeholder,
				className: "rounded-xl border border-input bg-secondary/40 px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary/60 focus:bg-secondary/60"
			}),
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] text-muted-foreground/70",
				children: hint
			})
		]
	});
}
function ScoreBar({ value, color = "bg-primary" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-1.5 w-full overflow-hidden rounded-full bg-secondary",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `h-full rounded-full transition-all duration-700 ${color}`,
			style: { width: `${value}%` }
		})
	});
}
function RecommendationsPage() {
	const { activeFarmId, activeFarm, postScoped, fetchScoped, token } = useAppData();
	const [form, setForm] = (0, import_react.useState)(DEFAULT_FORM);
	const [results, setResults] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [saveLoading, setSaveLoading] = (0, import_react.useState)(false);
	const loadSavedRecommendations = (0, import_react.useCallback)(async () => {
		if (!activeFarmId || !token) {
			setResults(null);
			return;
		}
		try {
			const data = await fetchScoped("/recommendations");
			const latest = Array.isArray(data) ? data.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))[0] : null;
			if (latest?.cropOptions?.length) setResults(latest.cropOptions);
			else setResults((current) => current ?? null);
			const soilReports = await fetchScoped("/soil-reports");
			const latestSoil = Array.isArray(soilReports) ? soilReports.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))[0] : null;
			if (latestSoil) setForm((f) => ({
				...f,
				ph: latestSoil.ph || "",
				nitrogen: latestSoil.nitrogen || "",
				phosphorus: latestSoil.phosphorus || "",
				potassium: latestSoil.potassium || "",
				organicCarbon: latestSoil.organicCarbon || "",
				ec: latestSoil.ec || ""
			}));
		} catch (err) {
			console.error("Failed to load saved recommendations", err);
		}
	}, [
		activeFarmId,
		token,
		fetchScoped
	]);
	(0, import_react.useEffect)(() => {
		loadSavedRecommendations();
	}, [loadSavedRecommendations]);
	(0, import_react.useEffect)(() => {
		return subscribeAiSyncRefresh(() => {
			loadSavedRecommendations();
		});
	}, [loadSavedRecommendations]);
	const set = (key) => (val) => setForm((f) => ({
		...f,
		[key]: val
	}));
	const handleAnalyze = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setResults(null);
		try {
			const month = new Date(form.startPreparationDate).getMonth() + 1;
			const season = month >= 6 && month <= 10 ? "kharif" : month >= 11 || month <= 3 ? "rabi" : "zaid";
			const payload = {
				ph: Number(form.ph) || 6.5,
				nitrogen: Number(form.nitrogen) || 120,
				phosphorus: Number(form.phosphorus) || 20,
				potassium: Number(form.potassium) || 200,
				organicCarbon: Number(form.organicCarbon) || .5,
				ec: Number(form.ec) || .4,
				soilType: FARM_SOIL_TYPE_TO_LABEL[activeFarm?.soilType] || "Black (Heavy)",
				season,
				areaAcres: Number(activeFarm?.areaAcres) || 1,
				waterAvailability: activeFarm?.waterLevel || "medium",
				startPreparationDate: form.startPreparationDate
			};
			const res = await fetch(`${API_URL}/soil_recommend`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});
			if (!res.ok) throw new Error("ML server error");
			const data = await res.json();
			setResults(data.recommendations || []);
			toast.success("Analysis complete — view your recommendations below");
		} catch (err) {
			toast.error("Could not reach backend server. Make sure it is running on port 5001.");
		} finally {
			setIsLoading(false);
		}
	};
	const handleSave = async () => {
		if (!results || !activeFarmId) return toast.error("Select a farm first");
		setSaveLoading(true);
		try {
			await postScoped("/recommendations", {
				farm: activeFarmId,
				season: payload.season === "kharif" ? "Kharif 2026" : "Rabi 2026",
				startPreparationDate: form.startPreparationDate,
				cropOptions: results.map((r) => ({
					cropName: r.cropName,
					suitabilityScore: r.suitabilityScore,
					weatherMatchPct: r.weatherMatchPct,
					soilMatchPct: r.soilMatchPct,
					expectedYieldKg: r.expectedYieldKg,
					durationDays: r.durationDays,
					expectedMarginRs: r.expectedMarginRs,
					isTopPick: r.isTopPick,
					reason: r.reason
				}))
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
	const others = results?.filter((r) => !r.isTopPick) || [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Crop Recommendations",
				subtitle: `Enter your soil test values — our model scores crops against your exact soil profile and farm context`,
				action: results && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleSave,
					disabled: saveLoading,
					className: "glass flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-colors hover:border-primary/30",
					children: [saveLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-3.5 w-3.5 text-primary" }), "Save to Profile"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleAnalyze,
				className: "glass rounded-3xl p-6 sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "h-5 w-5 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-base font-semibold",
								children: "Soil Test Report"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto hidden text-[11px] text-muted-foreground sm:block",
								children: "Values from your soil test lab report"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoilInput, {
								label: "pH",
								id: "ph",
								value: form.ph,
								onChange: set("ph"),
								placeholder: "6.5 – 8.5",
								hint: "Ideal: 6.5–7.5",
								step: "0.1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoilInput, {
								label: "Nitrogen (kg/ha)",
								id: "n",
								value: form.nitrogen,
								onChange: set("nitrogen"),
								placeholder: "e.g. 212",
								hint: "Low < 180 · High > 280"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoilInput, {
								label: "Phosphorus (kg/ha)",
								id: "p",
								value: form.phosphorus,
								onChange: set("phosphorus"),
								placeholder: "e.g. 18",
								hint: "Low < 10 · High > 25"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoilInput, {
								label: "Potassium (kg/ha)",
								id: "k",
								value: form.potassium,
								onChange: set("potassium"),
								placeholder: "e.g. 284",
								hint: "Low < 150 · High > 300"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoilInput, {
								label: "Organic Carbon (%)",
								id: "oc",
								value: form.organicCarbon,
								onChange: set("organicCarbon"),
								placeholder: "e.g. 0.58",
								hint: "Ideal ≥ 0.75%",
								step: "0.01"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoilInput, {
								label: "EC (dS/m)",
								id: "ec",
								value: form.ec,
								onChange: set("ec"),
								placeholder: "e.g. 0.42",
								hint: "Safe < 1.0 dS/m",
								step: "0.01"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1 lg:col-span-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-[11px] font-semibold uppercase tracking-widest text-muted-foreground",
										children: "Start Preparation Date"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										value: form.startPreparationDate,
										onChange: (e) => set("startPreparationDate")(e.target.value),
										className: "rounded-xl border border-input bg-secondary/40 px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary/60 focus:bg-secondary/60"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-muted-foreground/70",
										children: "When do you plan to start preparing the field?"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: isLoading,
							className: "flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary)_30%,transparent)] transition-all hover:scale-[1.02] disabled:opacity-60",
							children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Analysing soil…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), " Analyse & Recommend"] })
						}), results && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setResults(null);
								setForm(DEFAULT_FORM);
							},
							className: "flex items-center gap-1.5 rounded-xl border border-border px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5" }), " Reset"]
						})]
					})
				]
			}),
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass flex items-center justify-center gap-3 rounded-3xl py-16 text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin text-primary" }), "Scoring 9 crops against your soil profile…"]
			}),
			results && !isLoading && primary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-strong hero-ambient relative overflow-hidden rounded-3xl p-6 sm:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-pattern pointer-events-none absolute inset-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-inset ring-primary/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "h-3.5 w-3.5" }), " Top Recommendation"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-2 text-3xl font-bold tracking-tight",
							children: primary.cropName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-6 max-w-xl text-sm leading-relaxed text-muted-foreground",
							children: primary.reason
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-x-6 gap-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
										children: "Overall Match"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-3xl font-bold text-primary",
										children: [primary.suitabilityScore, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-lg font-medium text-muted-foreground",
											children: "%"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-px bg-border/50 hidden sm:block" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-0.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
											children: "Expected Yield"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-lg font-bold",
											children: [primary.expectedYieldKg.toLocaleString("en-IN"), " kg"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[10px] text-muted-foreground",
											children: [activeFarm?.areaAcres || 1, " acre(s)"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
										children: "Est. Profit"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-lg font-bold text-primary",
										children: ["₹", primary.expectedMarginRs.toLocaleString("en-IN")]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-0.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
										children: "Duration"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-lg font-bold",
										children: [primary.durationDays, " days"]
									})]
								})
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass flex flex-col gap-4 rounded-2xl bg-background/40 p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground",
								children: "Factor Analysis"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-1.5 flex items-center justify-between text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5 text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "h-3.5 w-3.5" }), "Soil Match"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold",
											children: [primary.soilMatchPct, "%"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, { value: primary.soilMatchPct })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-1.5 flex items-center justify-between text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5 text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "h-3.5 w-3.5" }), "Water / Climate"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold",
											children: [primary.weatherMatchPct, "%"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, {
										value: primary.weatherMatchPct,
										color: "bg-cyan"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-1.5 flex items-center justify-between text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5 text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), "Overall Match"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-semibold",
											children: [primary.suitabilityScore, "%"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, {
										value: primary.suitabilityScore,
										color: "bg-gradient-to-r from-primary to-cyan"
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 pt-4 border-t border-border/50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/crop-plan",
									search: { crop: primary.cropName },
									className: "flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "h-4 w-4" }),
										"Create Crop Plan for ",
										primary.cropName
									]
								})
							})
						]
					})]
				})]
			}), others.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-bold uppercase tracking-widest text-muted-foreground",
				children: "Strong Alternatives"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: others.map((crop) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass group relative overflow-hidden rounded-2xl p-5 transition-all hover:bg-card/60 hover:shadow-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold",
								children: crop.cropName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-0.5 text-[11px] text-muted-foreground",
								children: ["Confidence: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold text-foreground",
									children: [crop.suitabilityScore, "%"]
								})]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-lg bg-secondary/70 px-2 py-0.5 text-[10px] font-medium text-muted-foreground",
								children: [crop.durationDays, "d"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-0.5 flex justify-between text-[10px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Soil" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [crop.soilMatchPct, "%"] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, { value: crop.soilMatchPct })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-0.5 flex justify-between text-[10px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Water" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [crop.weatherMatchPct, "%"] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreBar, {
								value: crop.weatherMatchPct,
								color: "bg-cyan"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-3 text-[11px] leading-relaxed text-muted-foreground line-clamp-2",
							children: crop.reason
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-t border-border/50 pb-3 pt-3 text-xs font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [crop.expectedYieldKg.toLocaleString("en-IN"), " kg"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-primary",
								children: ["₹", crop.expectedMarginRs.toLocaleString("en-IN")]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-t border-border/50 pt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/crop-plan",
								search: { crop: crop.cropName },
								className: "flex w-full items-center justify-center gap-2 rounded-xl bg-primary/10 px-4 py-2.5 text-xs font-semibold text-primary transition-all hover:bg-primary/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "h-3.5 w-3.5" }), "Create Crop Plan"]
							})
						})
					]
				}, crop.cropName))
			})] })] }),
			results && results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass rounded-3xl py-16 text-center text-sm text-muted-foreground",
				children: "No suitable crops found for the given inputs. Try adjusting the season or soil values."
			})
		]
	});
}
//#endregion
export { RecommendationsPage as component };
