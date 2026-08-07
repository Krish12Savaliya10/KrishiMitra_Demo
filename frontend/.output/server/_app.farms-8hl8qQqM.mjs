import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { H as MapPin, N as Plus, O as Satellite, _ as Sprout, k as Ruler, st as Droplets, ut as Crosshair, xt as CircleAlert, yt as CircleCheck } from "./_libs/lucide-react.mjs";
import { r as useAppData } from "./_ssr/router-DjYzLMk_.mjs";
import { r as PageHeader } from "./_ssr/AppShell-DJ1b3bto.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogDescription, t as Dialog } from "./_ssr/dialog-CbuAZmxp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.farms-8hl8qQqM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	const { farms, token, fetchDashboardData, setActiveFarmId, setUserLocation } = useAppData();
	const [isAddOpen, setIsAddOpen] = (0, import_react.useState)(false);
	const [editingFarm, setEditingFarm] = (0, import_react.useState)(null);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [formData, setFormData] = (0, import_react.useState)(emptyForm);
	const [formErrors, setFormErrors] = (0, import_react.useState)({});
	const [isLocating, setIsLocating] = (0, import_react.useState)(false);
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
			waterResources: f.waterResources || [],
			waterLevel: f.waterLevel || "medium",
			currentCrop: f.currentCrop || "",
			location: f.location?.address || "",
			ph: "",
			nitrogen: "",
			phosphorus: "",
			potassium: "",
			ec: "",
			organicCarbon: ""
		});
		setIsAddOpen(true);
	};
	const handleDelete = async (f) => {
		if (!window.confirm(`Delete "${f.name}"? This cannot be undone.`)) return;
		try {
			if ((await fetch(`${API_URL}/farms/${f._id}`, {
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
				isActive: true
			};
			const isEditing = Boolean(editingFarm);
			const url = isEditing ? `${API_URL}/farms/${editingFarm._id}` : `${API_URL}/farms`;
			const res = await fetch(url, {
				method: isEditing ? "PATCH" : "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify(payload)
			});
			if (res.ok) {
				await res.json();
				if (formData.location) try {
					const geoData = await (await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.location)}&addressdetails=1&limit=1`)).json();
					if (geoData && geoData.length > 0) {
						const addr = geoData[0].address || {};
						const city = addr.city || addr.town || addr.village || addr.county || formData.location.split(",")[0]?.trim() || "";
						const state = addr.state || "";
						const district = addr.state_district || addr.county || "";
						setUserLocation({
							query: formData.location,
							city,
							state,
							district,
							lat: parseFloat(geoData[0].lat),
							lon: parseFloat(geoData[0].lon)
						});
					}
				} catch (_) {}
				setIsAddOpen(false);
				setEditingFarm(null);
				setFormData(emptyForm);
				await fetchDashboardData();
				toast.success(isEditing ? "Farm updated" : "Farm added successfully");
			} else toast.error(isEditing ? "Failed to update farm" : "Failed to add farm");
		} catch (err) {
			toast.error("Error saving farm");
		} finally {
			setIsSubmitting(false);
		}
	};
	const toggleWaterResource = (item) => {
		setFormData((prev) => {
			const arr = prev.waterResources || [];
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
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Satellite, { className: "h-6 w-6 text-cyan float-slow" })
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
				className: "glass hover-lift ring-glow relative overflow-hidden rounded-2xl p-5",
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
								value: f.waterResources?.length > 0 ? f.waterResources.join(", ") : "Rainfed"
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
								onClick: () => setActiveFarmId(f._id),
								className: "flex-1 rounded-lg border border-border py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-cyan/30 hover:text-cyan",
								children: "Use for analysis"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleDelete(f),
								className: "rounded-lg border border-border px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:border-destructive/40 hover:text-destructive",
								title: "Delete farm",
								children: "Delete"
							})
						]
					})
				]
			}, f._id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
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
					className: "grid gap-4 py-4",
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
								className: `flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${(formData.waterResources || []).includes(item) ? "border-primary bg-primary/10 text-primary shadow-[0_0_15px_-5px_var(--color-primary)]" : "border-border text-muted-foreground hover:border-primary/50"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `h-3 w-3 rounded-full border flex items-center justify-center ${(formData.waterResources || []).includes(item) ? "border-primary bg-primary" : "border-muted-foreground"}`,
									children: (formData.waterResources || []).includes(item) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-2 w-2 text-background" })
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
