import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { n as useAppData } from "./_ssr/AppDataContext-vZWx5SEf.mjs";
import { G as Info, b as ShieldAlert, c as Timer, g as Sprout, it as CloudRain, o as TriangleAlert, pt as CheckCheck, vt as BellRing } from "./_libs/lucide-react.mjs";
import { r as PageHeader } from "./_ssr/AppShell-22kaeU-F.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.alerts-k-U-xuO1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var config = {
	critical: {
		icon: ShieldAlert,
		ring: "border-destructive/40",
		glow: "shadow-[0_0_36px_-12px_var(--color-destructive)]",
		chip: "bg-destructive/12 text-destructive ring-1 ring-destructive/30",
		icoBg: "bg-destructive/10 text-destructive ring-1 ring-destructive/25"
	},
	warning: {
		icon: TriangleAlert,
		ring: "border-warning/35",
		glow: "",
		chip: "bg-warning/12 text-warning ring-1 ring-warning/30",
		icoBg: "bg-warning/10 text-warning ring-1 ring-warning/25"
	},
	info: {
		icon: Info,
		ring: "border-cyan/25",
		glow: "",
		chip: "bg-cyan/12 text-cyan ring-1 ring-cyan/25",
		icoBg: "bg-cyan/10 text-cyan ring-1 ring-cyan/25"
	}
};
var DEFAULT_RADAR = {
	"Weather risk": {
		level: "Low",
		pct: 0,
		tone: "primary"
	},
	"Schedule delay risk": {
		level: "Low",
		pct: 0,
		tone: "primary"
	},
	"Crop health risk": {
		level: "Low",
		pct: 0,
		tone: "primary"
	},
	"Equipment risk": {
		level: "Low",
		pct: 0,
		tone: "primary"
	}
};
function AlertsPage() {
	const { activeFarm, alerts = [], setAlerts, patchRecord } = useAppData();
	const [dismissed, setDismissed] = (0, import_react.useState)([]);
	const visibleAlerts = alerts.filter((a) => !dismissed.includes(a._id) && a.status !== "dismissed");
	const criticalCount = visibleAlerts.filter((a) => a.severity === "critical").length;
	const warningCount = visibleAlerts.filter((a) => a.severity === "warning").length;
	const radarData = activeFarm?.riskRadarData && Object.keys(activeFarm.riskRadarData).length > 0 ? activeFarm.riskRadarData : DEFAULT_RADAR;
	const riskCategories = [
		{
			icon: CloudRain,
			label: "Weather risk",
			...radarData["Weather risk"]
		},
		{
			icon: Timer,
			label: "Schedule delay risk",
			...radarData["Schedule delay risk"]
		},
		{
			icon: Sprout,
			label: "Crop health risk",
			...radarData["Crop health risk"]
		},
		{
			icon: BellRing,
			label: "Equipment risk",
			...radarData["Equipment risk"]
		}
	];
	const handleDismiss = (id) => {
		setDismissed((prev) => [...prev, id]);
		setAlerts((prev) => prev.map((a) => a._id === id ? {
			...a,
			status: "dismissed"
		} : a));
		patchRecord(`/alerts/${id}`, { status: "dismissed" }).catch(() => {
			toast.error("Couldn't save — this alert may reappear after refresh.");
		});
	};
	const handleMarkAllReviewed = () => {
		const ids = visibleAlerts.map((a) => a._id);
		if (ids.length === 0) return;
		setDismissed((prev) => [...prev, ...ids]);
		setAlerts((prev) => prev.map((a) => ids.includes(a._id) ? {
			...a,
			status: "dismissed"
		} : a));
		Promise.all(ids.map((id) => patchRecord(`/alerts/${id}`, { status: "dismissed" }))).catch(() => {
			toast.error("Some alerts failed to save as reviewed.");
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Risk Alerts",
			subtitle: `${criticalCount} critical · ${warningCount} warnings · monitored for ${activeFarm?.name || "your farm"}`,
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: handleMarkAllReviewed,
				className: "glass flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-colors hover:border-primary/30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "h-3.5 w-3.5 text-primary" }), " Mark all reviewed"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: riskCategories.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass hover-lift rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(r.icon, { className: `h-5 w-5 ${r.tone === "warning" ? "text-warning" : r.tone === "cyan" ? "text-cyan" : "text-primary"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `text-[10px] font-bold uppercase tracking-widest ${r.tone === "warning" ? "text-warning" : r.tone === "cyan" ? "text-cyan" : "text-primary"}`,
							children: r.level
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 text-xs font-medium",
						children: r.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 h-1.5 overflow-hidden rounded-full bg-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `h-full rounded-full ${r.tone === "warning" ? "bg-gradient-to-r from-warning to-destructive/70" : r.tone === "cyan" ? "bg-gradient-to-r from-cyan to-cyan/40" : "bg-gradient-to-r from-primary to-primary/50"}`,
							style: { width: `${r.pct}%` }
						})
					})
				]
			}, r.label))
		}),
		visibleAlerts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass grid place-items-center rounded-2xl p-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "h-6 w-6 text-primary" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 text-sm font-medium",
					children: "All clear — no active alerts"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "All alerts have been reviewed. New alerts will appear here automatically."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setDismissed([]),
					className: "mt-4 rounded-xl border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:border-primary/30 hover:text-primary",
					children: "Restore alerts"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3.5",
			children: visibleAlerts.map((a) => {
				const c = config[a.severity] || config.info;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `glass rounded-2xl border p-5 ${c.ring} ${c.glow}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `grid h-11 w-11 shrink-0 place-items-center rounded-xl ${c.icoBg}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.icon, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-sm font-semibold",
											children: a.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest ${c.chip}`,
											children: a.severity
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1.5 max-w-2xl text-xs leading-relaxed text-muted-foreground",
										children: a.detail || a.message
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2.5 flex flex-wrap items-center gap-3 text-[10px] text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a.source || "System" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a.createdAt ? new Date(a.createdAt).toLocaleDateString() : "" })
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex shrink-0 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "rounded-lg bg-primary px-3.5 py-1.5 text-[11px] font-semibold text-primary-foreground transition-transform hover:scale-[1.03]",
									children: "Take action"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleDismiss(a._id),
									className: "rounded-lg border border-border px-3.5 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground",
									children: "Dismiss"
								})]
							})
						]
					})
				}, a._id);
			})
		})
	] });
}
//#endregion
export { AlertsPage as component };
