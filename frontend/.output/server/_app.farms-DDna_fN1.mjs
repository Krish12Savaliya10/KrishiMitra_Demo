import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "./_libs/@radix-ui/react-dialog+[...].mjs";
import { n as useAppData } from "./_ssr/AppDataContext-vZWx5SEf.mjs";
import { $ as Droplets, E as Ruler, R as MapPin, T as Satellite, g as Sprout, k as Plus, lt as CircleAlert, t as X, tt as Crosshair } from "./_libs/lucide-react.mjs";
import { r as PageHeader } from "./_ssr/AppShell-22kaeU-F.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as clsx } from "./_libs/clsx.mjs";
import { t as twMerge } from "./_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.farms-DDna_fN1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var emptyForm = {
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
	organicCarbon: ""
};
function FarmsPage() {
	const { farms, token, fetchDashboardData, activeFarmId, setActiveFarmId, setUserLocation, postScoped, patchRecord } = useAppData();
	const [isAddOpen, setIsAddOpen] = (0, import_react.useState)(false);
	const [editingFarm, setEditingFarm] = (0, import_react.useState)(null);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)(emptyForm);
	const [formErrors, setFormErrors] = (0, import_react.useState)({});
	const [isLocating, setIsLocating] = (0, import_react.useState)(false);
	const [isAnalyzeOpen, setIsAnalyzeOpen] = (0, import_react.useState)(false);
	const [analyzingFarm, setAnalyzingFarm] = (0, import_react.useState)(null);
	const [isAnalyzing, setIsAnalyzing] = (0, import_react.useState)(false);
	const [analysisSeason, setAnalysisSeason] = (0, import_react.useState)("kharif");
	const [analysisDate, setAnalysisDate] = (0, import_react.useState)(() => (/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
	const [analysisIrrigation, setAnalysisIrrigation] = (0, import_react.useState)("Drip");
	const navigate = useNavigate();
	const API_URL = typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api";
	const handleGetCurrentLocation = () => {
		if (!navigator.geolocation) {
			toast.error("Geolocation is not supported by your browser");
			return;
		}
		setIsLocating(true);
		navigator.geolocation.getCurrentPosition(async (pos) => {
			try {
				const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
				if (!res.ok) throw new Error("Geocoding failed");
				const data = await res.json();
				if (data && data.address) {
					const city = data.address.city || data.address.town || data.address.village || data.address.county || "";
					const state = data.address.state || "";
					const district = data.address.state_district || data.address.county || "";
					const locString = [city, state].filter(Boolean).join(", ");
					if (locString) {
						setFormData((prev) => ({
							...prev,
							location: locString
						}));
						setUserLocation({
							query: locString,
							city,
							state,
							district,
							lat: pos.coords.latitude,
							lon: pos.coords.longitude
						});
						toast.success("Location detected and saved!");
					} else toast.error("Could not resolve city/state from location.");
				}
			} catch (err) {
				console.error(err);
				toast.error("Failed to detect location address");
			} finally {
				setIsLocating(false);
			}
		}, (err) => {
			console.error(err);
			toast.error("Could not get location. Please check browser permissions.");
			setIsLocating(false);
		});
	};
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
			waterResources: Array.isArray(f.waterResources) ? f.waterResources : typeof f.waterResources === "string" ? [f.waterResources] : [],
			waterLevel: f.waterLevel || "medium",
			currentCrop: f.currentCrop || "",
			location: f.location?.address || "",
			ph: f.ph ?? "",
			nitrogen: f.nitrogen ?? "",
			phosphorus: f.phosphorus ?? "",
			potassium: f.potassium ?? "",
			ec: f.ec ?? "",
			organicCarbon: f.organicCarbon ?? ""
		});
		setIsAddOpen(true);
	};
	const handleDelete = async (f) => {
		if (!window.confirm(`Delete "${f.name}"? This cannot be undone.`)) return;
		try {
			if ((await fetch(`${API_URL}/farms/${f._id || f.id}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` }
			})).ok) {
				await fetchDashboardData();
				toast.success("Farm deleted");
			} else toast.error("Failed to delete farm");
		} catch (err) {
			toast.error("Error deleting farm");
		}
	};
	const runAnalysisAndSave = async () => {
		setIsAnalyzing(true);
		try {
			const payload = {
				ph: Number(analyzingFarm?.ph) || 6.5,
				nitrogen: Number(analyzingFarm?.nitrogen) || 120,
				phosphorus: Number(analyzingFarm?.phosphorus) || 20,
				potassium: Number(analyzingFarm?.potassium) || 200,
				organicCarbon: Number(analyzingFarm?.organicCarbon) || .5,
				ec: Number(analyzingFarm?.ec) || .4,
				soilType: {
					black: "Black (Heavy)",
					red: "Red (Laterite)",
					sandy: "Sandy Loam",
					alluvial: "Alluvial",
					clay: "Clay",
					loam: "Loamy",
					other: "Other"
				}[analyzingFarm?.soilType] || "Black (Heavy)",
				season: analysisSeason,
				areaAcres: Number(analyzingFarm?.areaAcres) || 1,
				waterAvailability: analyzingFarm?.waterLevel || "medium",
				startPreparationDate: analysisDate,
				irrigationType: analysisIrrigation
			};
			const res = await fetch(`${API_URL}/soil_recommend`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});
			if (!res.ok) throw new Error("ML server error");
			const data = await res.json();
			const results = data.recommendations || [];
			const llmSummary = data.llm_summary || null;
			await postScoped("/recommendations", {
				farm: analyzingFarm._id || analyzingFarm.id,
				season: payload.season === "kharif" ? "Kharif 2026" : "Rabi 2026",
				cropOptions: results.map((r) => ({
					cropName: r.cropName,
					suitabilityScore: r.suitabilityScore,
					weatherMatchPct: r.weatherMatchPct,
					soilMatchPct: r.soilMatchPct,
					expectedYieldKg: r.expectedYieldKg,
					durationDays: r.durationDays,
					expectedMarginRs: r.expectedMarginRs,
					isTopPick: r.isTopPick,
					reason: r.reason,
					suggestedFertilizer: r.suggestedFertilizer,
					irrigationPrediction: r.irrigationPrediction
				})),
				llmSummary
			});
			toast.success("Analysis complete and saved!");
			setActiveFarmId(analyzingFarm._id || analyzingFarm.id);
			setIsAnalyzeOpen(false);
			navigate({ to: "/recommendations" });
		} catch (err) {
			toast.error("Analysis failed. Make sure backend is running on port 5001.");
			console.error(err);
		} finally {
			setIsAnalyzing(false);
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const newErrors = {};
		if (!formData.name.trim()) newErrors.name = "Farm name is required";
		if (!formData.areaAcres) newErrors.areaAcres = "Area is required";
		else if (Number(formData.areaAcres) <= 0) newErrors.areaAcres = "Area must be greater than 0";
		if (Object.keys(newErrors).length > 0) {
			setFormErrors(newErrors);
			return;
		}
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
				ph: !formData.ph && formData.ph !== 0 ? null : Number(formData.ph),
				nitrogen: !formData.nitrogen && formData.nitrogen !== 0 ? null : Number(formData.nitrogen),
				phosphorus: !formData.phosphorus && formData.phosphorus !== 0 ? null : Number(formData.phosphorus),
				potassium: !formData.potassium && formData.potassium !== 0 ? null : Number(formData.potassium),
				ec: !formData.ec && formData.ec !== 0 ? null : Number(formData.ec),
				organicCarbon: !formData.organicCarbon && formData.organicCarbon !== 0 ? null : Number(formData.organicCarbon),
				isActive: true
			};
			const isEditing = Boolean(editingFarm);
			const url = isEditing ? `${API_URL}/farms/${editingFarm._id || editingFarm.id}` : `${API_URL}/farms`;
			const res = await fetch(url, {
				method: isEditing ? "PATCH" : "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify(payload)
			});
			if (res.ok) {
				const savedFarm = await res.json();
				if (formData.location) try {
					const geoData = await (await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.location)}&addressdetails=1&limit=1`)).json();
					if (geoData && geoData.length > 0) {
						const addr = geoData[0].address || {};
						const city = addr.city || addr.town || addr.village || addr.county || formData.location.split(",")[0]?.trim() || "";
						const state = addr.state || "";
						const district = addr.state_district || addr.county || "";
						const lat = parseFloat(geoData[0].lat);
						const lon = parseFloat(geoData[0].lon);
						setUserLocation({
							query: formData.location,
							city,
							state,
							district,
							lat,
							lon
						});
						await patchRecord(`/farms/${savedFarm._id || savedFarm.id}`, { location: {
							address: formData.location,
							city,
							state,
							district,
							lat,
							lon
						} });
					}
				} catch (e) {
					console.error("Geocoding during save failed", e);
				}
				await fetchDashboardData();
				toast.success(isEditing ? "Farm updated" : "Farm added");
				setIsAddOpen(false);
				setEditingFarm(null);
				setFormData(emptyForm);
			} else {
				const errorData = await res.json().catch(() => ({}));
				console.error("Farm save error:", errorData);
				toast.error(`Failed: ${JSON.stringify(errorData)}`);
			}
		} catch (err) {
			console.error("Network error:", err);
			toast.error("Network error saving farm.");
		} finally {
			setIsSubmitting(false);
		}
	};
	const toggleWaterResource = (item) => {
		setFormData((prev) => {
			const arr = Array.isArray(prev.waterResources) ? prev.waterResources : [];
			if (arr.includes(item)) return {
				...prev,
				waterResources: arr.filter((x) => x !== item)
			};
			return {
				...prev,
				waterResources: [...arr, item]
			};
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Farm Details",
			subtitle: `${farms.length} plots · ${totalArea.toFixed(1)} acres total · ${activeCount} active this season`,
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: openAdd,
				className: "flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-[0_0_24px_-8px_var(--color-primary)] transition-transform hover:scale-[1.03]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Add farm"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "glass relative mb-5 overflow-hidden rounded-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-pattern absolute inset-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex flex-wrap items-center gap-6 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-14 w-14 place-items-center rounded-2xl bg-cyan/10 ring-1 ring-cyan/25",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Satellite, { className: "h-6 w-6 text-cyan" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-base font-semibold",
							children: "Field intelligence view"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: "Satellite-linked plot boundaries for your region · Last sync 2h ago"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-6 text-center",
						children: [
							[String(farms.length), "Plots mapped"],
							[`${totalArea.toFixed(1)} ac`, "Total area"],
							[String(farms.filter((f) => f.waterResources?.length > 0).length), "Irrigated"]
						].map(([v, l]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-lg font-bold text-cyan",
							children: v
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-widest text-muted-foreground",
							children: l
						})] }, l))
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 md:grid-cols-2 xl:grid-cols-3",
			children: [farms.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `glass ring-glow relative overflow-hidden rounded-2xl p-5 ${activeFarmId === (f._id || f.id) ? "ring-2 ring-primary/50" : ""}`,
				onClick: () => setActiveFarmId(activeFarmId === (f._id || f.id) ? null : f._id || f.id),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "truncate font-display text-sm font-semibold",
								children: f.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex items-center gap-1 text-[11px] text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
									" ",
									f.location?.address || "Unknown"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${f.isActive ? "bg-primary/12 text-primary ring-1 ring-primary/25" : "bg-secondary text-muted-foreground"}`,
							children: f.isActive ? "active" : "inactive"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid grid-cols-2 gap-2.5 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoChip, {
								icon: Ruler,
								label: "Area",
								value: `${f.areaAcres} acres`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoChip, {
								icon: Droplets,
								label: "Water Source",
								value: Array.isArray(f.waterResources) && f.waterResources.length > 0 ? f.waterResources.join(", ") : "Rainfed"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoChip, {
								icon: Sprout,
								label: "Crop",
								value: f.currentCrop || "None (fallow)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoChip, {
								icon: Satellite,
								label: "Soil",
								value: f.soilType
							})
						]
					}),
					f.isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-[11px] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Crop health index" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-primary",
								children: [f.cropHealthIndex || 0, "%"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-gradient-to-r from-primary to-cyan",
								style: { width: `${f.cropHealthIndex || 0}%` }
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => openEdit(f),
								className: "flex-1 rounded-lg border border-border py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary",
								children: "Edit details"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setAnalyzingFarm(f);
									setIsAnalyzeOpen(true);
								},
								className: "flex-1 rounded-lg border border-border py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-cyan/30 hover:text-cyan",
								children: "Analyse & Recommend"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleDelete(f),
								className: "rounded-lg border border-border px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive",
								children: "Delete"
							})
						]
					})
				]
			}, f._id || f.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: openAdd,
				className: "ring-glow grid min-h-52 place-items-center rounded-2xl border border-dashed border-border text-muted-foreground transition-colors hover:text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mx-auto h-6 w-6" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-xs font-medium",
							children: "Add a new farm plot"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 text-[10px] text-muted-foreground",
							children: "Area · soil · irrigation · season"
						})
					]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: isAddOpen,
			onOpenChange: (open) => {
				setIsAddOpen(open);
				if (!open) setEditingFarm(null);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "sm:max-w-[425px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editingFarm ? `Edit ${editingFarm.name}` : "Add a new farm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: editingFarm ? "Update this farm plot's details below." : "Enter the details of your new farm plot below." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "name",
								className: "mb-1 block text-[11px] font-medium text-muted-foreground",
								children: "Name *"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "name",
								value: formData.name,
								onChange: (e) => {
									setFormData({
										...formData,
										name: e.target.value
									});
									if (formErrors.name) setFormErrors((p) => ({
										...p,
										name: ""
									}));
								},
								className: `w-full rounded-xl border bg-secondary/40 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary/50 ${formErrors.name ? "border-destructive" : "border-input"}`
							}),
							formErrors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 flex items-center gap-1 text-[11px] text-destructive",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }), formErrors.name]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "areaAcres",
								className: "mb-1 block text-[11px] font-medium text-muted-foreground",
								children: "Area (Acres) *"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								step: "0.1",
								id: "areaAcres",
								value: formData.areaAcres,
								onChange: (e) => {
									setFormData({
										...formData,
										areaAcres: e.target.value
									});
									if (formErrors.areaAcres) setFormErrors((p) => ({
										...p,
										areaAcres: ""
									}));
								},
								className: `w-full rounded-xl border bg-secondary/40 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary/50 ${formErrors.areaAcres ? "border-destructive" : "border-input"}`
							}),
							formErrors.areaAcres && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 flex items-center gap-1 text-[11px] text-destructive",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }), formErrors.areaAcres]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "location",
							className: "mb-1 block text-[11px] font-medium text-muted-foreground",
							children: "Location"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "location",
								placeholder: "e.g. Pune, Maharashtra",
								value: formData.location,
								onChange: (e) => setFormData({
									...formData,
									location: e.target.value
								}),
								className: "flex-1 rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary/50"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: handleGetCurrentLocation,
								disabled: isLocating,
								className: "flex shrink-0 items-center justify-center gap-1.5 rounded-xl bg-primary/10 px-3 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 disabled:opacity-50",
								title: "Use my current location",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crosshair, { className: `h-4 w-4 ${isLocating ? "animate-spin" : ""}` })
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "soilType",
							className: "mb-1 block text-[11px] font-medium text-muted-foreground",
							children: "Soil Type"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "soilType",
							value: formData.soilType,
							onChange: (e) => setFormData({
								...formData,
								soilType: e.target.value
							}),
							className: "w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "alluvial",
									children: "Alluvial"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "black",
									children: "Black"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "red",
									children: "Red"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "laterite",
									children: "Laterite"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "sandy",
									children: "Sandy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "clay",
									children: "Clay"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "loamy",
									children: "Loamy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "other",
									children: "Other"
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-[11px] font-medium text-muted-foreground",
							children: "Water Resources"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [
								"Borewell",
								"Canal",
								"River",
								"Rainfed",
								"Drip System",
								"Sprinklers"
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggleWaterResource(item),
								className: `flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${(Array.isArray(formData.waterResources) ? formData.waterResources : []).includes(item) ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_-5px_var(--color-primary)]" : "border-border text-muted-foreground hover:border-primary/50"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `h-3 w-3 rounded-full border flex items-center justify-center ${(Array.isArray(formData.waterResources) ? formData.waterResources : []).includes(item) ? "border-primary bg-primary" : "border-muted-foreground"}`,
									children: (Array.isArray(formData.waterResources) ? formData.waterResources : []).includes(item) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCircle2, { className: "h-2 w-2 text-background" })
								}), item]
							}, item))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "waterLevel",
								className: "mb-1 block text-[11px] font-medium text-muted-foreground",
								children: "Water Availability"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "waterLevel",
								value: formData.waterLevel,
								onChange: (e) => setFormData({
									...formData,
									waterLevel: e.target.value
								}),
								className: "w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary/50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "low",
										children: "Low"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "medium",
										children: "Medium"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "high",
										children: "High"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: "Saved once here — the AI and schedule engine reuse this instead of asking every time."
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-1 border-t border-border pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "mb-3 text-[12px] font-semibold text-foreground",
								children: "Soil Test Data (Optional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "ph",
										className: "mb-1 block text-[11px] font-medium text-muted-foreground",
										children: "pH"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "0.1",
										id: "ph",
										value: formData.ph,
										onChange: (e) => setFormData({
											...formData,
											ph: e.target.value
										}),
										placeholder: "6.5",
										className: "w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary/50"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "ec",
										className: "mb-1 block text-[11px] font-medium text-muted-foreground",
										children: "EC (dS/m)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "0.01",
										id: "ec",
										value: formData.ec,
										onChange: (e) => setFormData({
											...formData,
											ec: e.target.value
										}),
										placeholder: "0.42",
										className: "w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary/50"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "nitrogen",
										className: "mb-1 block text-[11px] font-medium text-muted-foreground",
										children: "Nitrogen (kg/ha)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										id: "nitrogen",
										value: formData.nitrogen,
										onChange: (e) => setFormData({
											...formData,
											nitrogen: e.target.value
										}),
										placeholder: "212",
										className: "w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary/50"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "phosphorus",
										className: "mb-1 block text-[11px] font-medium text-muted-foreground",
										children: "Phosphorus (kg/ha)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										id: "phosphorus",
										value: formData.phosphorus,
										onChange: (e) => setFormData({
											...formData,
											phosphorus: e.target.value
										}),
										placeholder: "18",
										className: "w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary/50"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "potassium",
										className: "mb-1 block text-[11px] font-medium text-muted-foreground",
										children: "Potassium (kg/ha)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										id: "potassium",
										value: formData.potassium,
										onChange: (e) => setFormData({
											...formData,
											potassium: e.target.value
										}),
										placeholder: "284",
										className: "w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary/50"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "organicCarbon",
										className: "mb-1 block text-[11px] font-medium text-muted-foreground",
										children: "Organic Carbon (%)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										step: "0.01",
										id: "organicCarbon",
										value: formData.organicCarbon,
										onChange: (e) => setFormData({
											...formData,
											organicCarbon: e.target.value
										}),
										placeholder: "0.58",
										className: "w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary/50"
									})] })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-end pt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: isSubmitting,
								type: "submit",
								className: "w-full rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.02]",
								children: isSubmitting ? "Saving..." : editingFarm ? "Save changes" : "Add Farm"
							})
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: isAnalyzeOpen,
			onOpenChange: setIsAnalyzeOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "sm:max-w-[425px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Analyze Crop Plan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Confirm your farm elements and set your planting parameters." })] }), analyzingFarm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-2 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "mb-1 block text-[11px] font-medium text-muted-foreground",
										children: "Date to Plant"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "date",
										value: analysisDate,
										onChange: (e) => setAnalysisDate(e.target.value),
										className: "w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary/50"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-1 block text-[11px] font-medium text-muted-foreground",
									children: "Season"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: analysisSeason,
									onChange: (e) => setAnalysisSeason(e.target.value),
									className: "w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary/50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "kharif",
											children: "Kharif"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "rabi",
											children: "Rabi"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "zaid",
											children: "Zaid"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mb-1 block text-[11px] font-medium text-muted-foreground",
									children: "Irrigation Type"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: analysisIrrigation,
									onChange: (e) => setAnalysisIrrigation(e.target.value),
									className: "w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary/50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Drip",
											children: "Drip"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Sprinkler",
											children: "Sprinkler"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Flood",
											children: "Flood"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "Manual",
											children: "Manual"
										})
									]
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-[12px] font-semibold text-foreground border-t border-border pt-4",
							children: "Farm Elements"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-secondary/50 p-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-muted-foreground uppercase tracking-widest",
										children: "Nitrogen"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold",
										children: analyzingFarm.nitrogen || "N/A"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-secondary/50 p-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-muted-foreground uppercase tracking-widest",
										children: "Phosphorus"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold",
										children: analyzingFarm.phosphorus || "N/A"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-secondary/50 p-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-muted-foreground uppercase tracking-widest",
										children: "Potassium"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold",
										children: analyzingFarm.potassium || "N/A"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-secondary/50 p-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-muted-foreground uppercase tracking-widest",
										children: "pH Level"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold",
										children: analyzingFarm.ph || "N/A"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-secondary/50 p-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-muted-foreground uppercase tracking-widest",
										children: "Soil Type"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold capitalize",
										children: analyzingFarm.soilType || "N/A"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-secondary/50 p-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-muted-foreground uppercase tracking-widest",
										children: "Water Availability"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold capitalize",
										children: analyzingFarm.waterLevel || "N/A"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setIsAnalyzeOpen(false);
									openEdit(analyzingFarm);
								},
								className: "rounded-xl border border-border px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:bg-secondary",
								children: "Edit Elements"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: runAnalysisAndSave,
								disabled: isAnalyzing,
								className: "rounded-xl bg-cyan px-4 py-2.5 text-xs font-semibold text-cyan-foreground transition-transform hover:scale-[1.02] flex items-center justify-center min-w-[120px]",
								children: isAnalyzing ? "Processing..." : "Recommend"
							})]
						})
					]
				})]
			})
		})
	] });
}
function InfoChip({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-secondary/40 px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3 w-3" }),
				" ",
				label
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-0.5 truncate text-[11px] font-medium",
			children: value
		})]
	});
}
//#endregion
export { FarmsPage as component };
