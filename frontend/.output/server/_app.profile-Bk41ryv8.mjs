import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { D as Scale, F as Phone, I as Pencil, It as Award, O as Save, U as MapPin, X as Leaf, _ as Sprout, n as Wind } from "./_libs/lucide-react.mjs";
import { r as useAppData } from "./_ssr/router-SdgVeMQt.mjs";
import { r as PageHeader } from "./_ssr/AppShell-DC9lQJHx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.profile-Bk41ryv8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var modes = [
	{
		id: "organic",
		icon: Leaf,
		label: "Organic",
		desc: "Bio-inputs only. Plans avoid synthetic fertilizers and pesticides entirely."
	},
	{
		id: "moderate",
		icon: Scale,
		label: "Moderate",
		desc: "Balanced approach. Organic-first with targeted synthetic inputs when needed."
	},
	{
		id: "flexible",
		icon: Wind,
		label: "Flexible",
		desc: "Yield-optimized. AI freely recommends the most effective available inputs."
	}
];
function ProfilePage() {
	const { userProfile, farms, token, fetchDashboardData, fetchScoped, activeFarm } = useAppData();
	const [mode, setMode] = (0, import_react.useState)("moderate");
	const [isEditing, setIsEditing] = (0, import_react.useState)(false);
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [editForm, setEditForm] = (0, import_react.useState)({
		firstName: userProfile?.name?.split(" ")[0] || "",
		lastName: userProfile?.name?.split(" ").slice(1).join(" ") || ""
	});
	const [scheduleTasks, setScheduleTasks] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		async function loadTasks() {
			try {
				const tasks = await fetchScoped("/schedule");
				if (Array.isArray(tasks)) setScheduleTasks(tasks);
			} catch (e) {}
		}
		loadTasks();
	}, [activeFarm]);
	const doneTasks = scheduleTasks.filter((t) => t.status === "done").length;
	const adherencePct = scheduleTasks.length > 0 ? Math.round(doneTasks / scheduleTasks.length * 100) : null;
	const adherenceText = adherencePct !== null ? `${adherencePct}% tasks completed on time` : "No tasks recorded yet";
	const totalArea = farms.reduce((s, f) => s + (f.areaAcres || 0), 0);
	const activeFarms = farms.filter((f) => f.isActive);
	const initials = userProfile?.name ? userProfile.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() : "—";
	const handleSaveProfile = async (e) => {
		e.preventDefault();
		setIsSaving(true);
		try {
			if ((await fetch(`${typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api"}/auth/me`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					firstName: editForm.firstName,
					lastName: editForm.lastName,
					farmingMode: mode
				})
			})).ok) {
				setIsEditing(false);
				fetchDashboardData();
				toast.success("Profile updated successfully");
			} else toast.error("Could not save profile changes.");
		} catch (err) {
			console.error(err);
			toast.error("An error occurred while saving profile.");
		} finally {
			setIsSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Farmer Profile",
				subtitle: "Your identity, preferences and saved defaults across the platform"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass-strong hero-ambient relative mb-5 overflow-hidden rounded-3xl p-6 sm:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-pattern pointer-events-none absolute inset-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 sm:flex sm:gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "glow-emerald grid h-18 w-18 shrink-0 place-items-center rounded-2xl bg-primary/15 font-display text-2xl font-bold text-primary ring-1 ring-primary/30",
							style: {
								height: "4.5rem",
								width: "4.5rem"
							},
							children: initials
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleSaveProfile,
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: editForm.firstName,
											onChange: (e) => setEditForm({
												...editForm,
												firstName: e.target.value
											}),
											placeholder: "First name",
											className: "rounded-xl border border-input bg-secondary/40 px-3 py-1.5 text-sm outline-none focus:border-primary/50"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: editForm.lastName,
											onChange: (e) => setEditForm({
												...editForm,
												lastName: e.target.value
											}),
											placeholder: "Last name",
											className: "rounded-xl border border-input bg-secondary/40 px-3 py-1.5 text-sm outline-none focus:border-primary/50"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "submit",
											disabled: isSaving,
											className: "flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-3.5 w-3.5" }),
												" ",
												isSaving ? "Saving..." : "Save"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setIsEditing(false),
											className: "rounded-xl border border-border px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground",
											children: "Cancel"
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "truncate font-display text-xl font-bold",
									children: userProfile?.name || "Farmer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
												" ",
												farms[0]?.location?.address || "India"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3 w-3" }), " Registered farmer"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-3 w-3" }), " KrishiMitra member"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "rounded-full bg-primary/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary ring-1 ring-primary/25",
											children: [mode, " mode"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "rounded-full bg-cyan/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-cyan ring-1 ring-cyan/25",
											children: [
												farms.length,
												" ",
												farms.length === 1 ? "farm" : "farms"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "rounded-full bg-secondary px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground",
											children: [totalArea.toFixed(1), " acres"]
										})
									]
								})
							]
						}),
						!isEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setIsEditing(true),
							className: "glass hidden items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-colors hover:border-primary/30 sm:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" }), " Edit"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-3 font-display text-sm font-semibold text-muted-foreground",
					children: "Farming preference mode"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-3",
					children: modes.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setMode(m.id),
						className: `rounded-2xl border p-5 text-left transition-all ${mode === m.id ? "border-primary/45 bg-primary/8 glow-emerald" : "glass hover:border-primary/25"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.icon, { className: `h-5 w-5 ${mode === m.id ? "text-primary" : "text-muted-foreground"}` }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `mt-3 font-display text-sm font-semibold ${mode === m.id ? "text-primary" : ""}`,
								children: m.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] leading-relaxed text-muted-foreground",
								children: m.desc
							})
						]
					}, m.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "glass rounded-2xl p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs font-semibold",
						children: "Account details"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-3 space-y-2.5 text-xs",
						children: [
							["Full name", userProfile?.name || "—"],
							["Role", userProfile?.role || "Farmer"],
							["Total farms", farms.length],
							["Total area", `${totalArea.toFixed(1)} acres`],
							["Active farms", activeFarms.length]
						].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between border-b border-border/60 pb-2 last:border-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: k
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-medium",
								children: v
							})]
						}, k))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "glass rounded-2xl p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs font-semibold",
						children: "Season summary"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 space-y-3",
						children: [
							[
								Sprout,
								"Active crop",
								activeFarms[0]?.currentCrop || "No active crop"
							],
							[
								MapPin,
								"Total land",
								`${totalArea.toFixed(1)} acres across ${farms.length} plots`
							],
							[
								Award,
								"Plan adherence",
								adherenceText
							]
						].map(([Icon, l, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-xl bg-secondary/40 px-3.5 py-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-widest text-muted-foreground",
									children: l
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-xs font-medium",
									children: v
								})]
							})]
						}, l))
					})]
				})]
			})
		]
	});
}
//#endregion
export { ProfilePage as component };
