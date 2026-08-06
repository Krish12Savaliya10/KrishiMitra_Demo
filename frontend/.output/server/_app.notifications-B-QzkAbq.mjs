import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { At as CalendarClock, Nt as Bell, Tt as CheckCheck, ft as Cpu, v as Sparkles, w as Settings2 } from "./_libs/lucide-react.mjs";
import { r as useAppData } from "./_ssr/router-C6v2fw80.mjs";
import { r as PageHeader } from "./_ssr/AppShell-B2DYmKXV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.notifications-B-QzkAbq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var typeMeta = {
	alert: {
		icon: Bell,
		cls: "bg-warning/10 text-warning ring-1 ring-warning/25",
		label: "Alerts"
	},
	schedule: {
		icon: CalendarClock,
		cls: "bg-cyan/10 text-cyan ring-1 ring-cyan/25",
		label: "Schedule"
	},
	ai: {
		icon: Sparkles,
		cls: "bg-primary/10 text-primary ring-1 ring-primary/25",
		label: "AI Mitra"
	},
	system: {
		icon: Cpu,
		cls: "bg-secondary text-muted-foreground ring-1 ring-border",
		label: "System"
	}
};
function NotificationsPage() {
	const { notifications = [], setNotifications, patchRecord } = useAppData();
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [markingAll, setMarkingAll] = (0, import_react.useState)(false);
	const unread = notifications.filter((i) => !i.isRead).length;
	const shown = notifications.filter((n) => {
		if (filter === "all") return true;
		if (filter === "unread") return !n.isRead;
		return n.type === filter;
	});
	const markRead = async (id) => {
		const target = notifications.find((n) => n._id === id);
		if (!target || target.isRead) return;
		setNotifications((prev) => prev.map((n) => n._id === id ? {
			...n,
			isRead: true
		} : n));
		try {
			await patchRecord(`/notifications/${id}`, { isRead: true });
		} catch (err) {
			setNotifications((prev) => prev.map((n) => n._id === id ? {
				...n,
				isRead: false
			} : n));
			toast.error("Couldn't mark as read — try again.");
		}
	};
	const markAllRead = async () => {
		const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n._id);
		if (unreadIds.length === 0) return;
		setMarkingAll(true);
		setNotifications((prev) => prev.map((n) => ({
			...n,
			isRead: true
		})));
		try {
			await Promise.all(unreadIds.map((id) => patchRecord(`/notifications/${id}`, { isRead: true })));
		} catch (err) {
			toast.error("Some notifications failed to update.");
		} finally {
			setMarkingAll(false);
		}
	};
	const typeCounts = notifications.reduce((acc, n) => {
		acc[n.type] = (acc[n.type] || 0) + 1;
		return acc;
	}, {});
	const filterTabs = [
		"all",
		"unread",
		...Object.keys(typeMeta).filter((t) => typeCounts[t] > 0)
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Notifications & Activity",
				subtitle: `${unread} unread · full history of alerts, schedule changes and AI advisories`,
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: markAllRead,
					disabled: markingAll || unread === 0,
					className: "glass flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-colors hover:border-primary/30 disabled:opacity-50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "h-3.5 w-3.5 text-primary" }),
						" ",
						markingAll ? "Marking..." : "Mark all read"
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex flex-wrap gap-2",
				children: filterTabs.map((f) => {
					const meta = typeMeta[f];
					const count = f === "unread" ? unread : f === "all" ? notifications.length : typeCounts[f];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setFilter(f),
						className: `flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-all ${filter === f ? "bg-primary text-primary-foreground shadow-[0_0_18px_-6px_var(--color-primary)]" : "border border-border text-muted-foreground hover:text-foreground"}`,
						children: [
							meta && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(meta.icon, { className: "h-3 w-3" }),
							meta ? meta.label : f,
							count > 0 && ` (${count})`
						]
					}, f);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative space-y-3 pl-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-4 left-[13px] top-4 w-px bg-border" }),
					shown.map((n) => {
						const meta = typeMeta[n.type] || typeMeta.system;
						const isRead = n.isRead;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => markRead(n._id),
							className: `glass ring-glow relative block w-full rounded-2xl p-4 text-left transition-opacity ${isRead ? "opacity-65" : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `absolute grid h-7 w-7 place-items-center rounded-full ${meta.cls}`,
								style: {
									left: "-1.85rem",
									top: "1rem"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(meta.icon, { className: "h-3.5 w-3.5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `text-sm font-semibold ${isRead ? "text-foreground/80" : "text-foreground"}`,
									children: n.title
								}), n.message && n.message !== n.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-[11px] text-muted-foreground",
									children: n.message
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex shrink-0 items-center gap-2",
									children: [!isRead && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] text-muted-foreground",
										children: n.createdAt ? new Date(n.createdAt).toLocaleDateString() : ""
									})]
								})]
							})]
						}, n._id || n.id);
					}),
					shown.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass grid place-items-center rounded-2xl p-10 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, { className: "h-6 w-6 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-sm font-medium",
								children: "All caught up"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: filter === "all" ? "No notifications yet." : "Nothing in this filter right now."
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "h-3 w-3" }), " Manage notification preferences in Settings"]
			})
		]
	});
}
//#endregion
export { NotificationsPage as component };
