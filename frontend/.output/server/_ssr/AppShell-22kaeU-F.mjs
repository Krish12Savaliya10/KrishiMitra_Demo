import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAppData } from "./AppDataContext-vZWx5SEf.mjs";
import { F as MessageSquareText, I as Menu, L as MapPinned, N as Moon, U as Leaf, W as LayoutDashboard, _ as Sparkles, _t as Bell, b as ShieldAlert, i as User, mt as ChartLine, p as Sun, r as Wallet, rt as CloudSun, t as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-22kaeU-F.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ThemeProviderContext = (0, import_react.createContext)({
	theme: "system",
	setTheme: () => null
});
function ThemeProvider({ children, defaultTheme = "system", storageKey = "ui-theme", ...props }) {
	const [theme, setTheme] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") return localStorage.getItem(storageKey) || defaultTheme;
		return defaultTheme;
	});
	(0, import_react.useEffect)(() => {
		const root = window.document.documentElement;
		root.classList.remove("light", "dark");
		if (theme === "system") {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
			root.classList.add(systemTheme);
			return;
		}
		root.classList.add(theme);
	}, [theme]);
	const value = {
		theme,
		setTheme: (newTheme) => {
			localStorage.setItem(storageKey, newTheme);
			setTheme(newTheme);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProviderContext.Provider, {
		...props,
		value,
		children
	});
}
var useTheme = () => {
	const context = (0, import_react.useContext)(ThemeProviderContext);
	if (context === void 0) throw new Error("useTheme must be used within a ThemeProvider");
	return context;
};
function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: () => setTheme(theme === "light" ? "dark" : "light"),
		className: "relative rounded-xl border border-border p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
		"aria-label": "Toggle theme",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" })]
	});
}
var nav = [
	{
		label: "AI Mitra",
		to: "/ai-saathi",
		icon: MessageSquareText,
		badge: null,
		highlight: true
	},
	{
		label: "Dashboard",
		to: "/dashboard",
		icon: LayoutDashboard
	},
	{
		label: "Farms",
		to: "/farms",
		icon: MapPinned
	},
	{
		label: "Weather & Advisory",
		to: "/weather",
		icon: CloudSun
	},
	{
		label: "Market Prices",
		to: "/market",
		icon: ChartLine
	},
	{
		label: "Risk Alerts",
		to: "/alerts",
		icon: ShieldAlert,
		dynamicBadge: "alerts"
	},
	{
		label: "Expenses",
		to: "/expenses",
		icon: Wallet
	}
];
var secondaryNav = [{
	label: "Settings & Profile",
	to: "/profile",
	icon: User
}];
function BrandMark({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/30",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-4.5 w-4.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary pulse-dot" })]
		}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "font-display text-lg font-bold tracking-tight text-foreground",
				children: ["Krishi", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-primary",
					children: "Mitra"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
				children: "Agri Intelligence"
			})]
		})]
	});
}
function SidebarContent({ onNavigate }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { farms, activeFarmId, setActiveFarmId, alerts = [], notifications = [] } = useAppData();
	const renderItem = (item) => {
		const active = pathname === item.to || pathname.startsWith(item.to + "/");
		if (item.highlight) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: item.to,
			onClick: onNavigate,
			className: `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all mb-1 ${active ? "bg-primary text-primary-foreground shadow-[0_0_20px_var(--color-primary)/40]" : "bg-primary/12 text-primary hover:bg-primary/20 border border-primary/25"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-4 w-4 shrink-0" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 flex-1 truncate",
					children: item.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 shrink-0 opacity-70" })
			]
		}, item.to);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: item.to,
			onClick: onNavigate,
			className: `group relative flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium transition-all ${active ? "bg-primary/12 text-primary" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"}`,
			children: [
				active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: `h-4 w-4 shrink-0 transition-colors ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}` }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 flex-1 truncate",
					children: item.label
				}),
				(() => {
					let badgeVal = null;
					if (item.dynamicBadge === "alerts" && alerts.length > 0) badgeVal = alerts.length;
					if (item.badge) badgeVal = item.badge;
					if (!badgeVal) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-5 min-w-5 place-items-center rounded-full bg-primary/15 px-1 text-[10px] font-semibold text-primary ring-1 ring-primary/25",
						children: badgeVal
					});
				})()
			]
		}, item.to);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 pb-4 pt-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/dashboard",
					onClick: onNavigate,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {})
				})
			}),
			farms.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-4 mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "mb-1 block text-[10px] font-semibold uppercase tracking-wide text-muted-foreground",
					children: "Active Farm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: activeFarmId || "",
					onChange: (e) => setActiveFarmId(e.target.value),
					className: "w-full rounded-lg border border-border bg-secondary/50 px-2.5 py-1.5 text-[13px] font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary",
					children: farms.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: f._id,
						children: f.name
					}, f._id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex-1 space-y-0.5 overflow-y-auto px-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-3 pb-1.5 pt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70",
						children: "Operations"
					}),
					nav.map(renderItem),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-3 pb-1.5 pt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70",
						children: "Account"
					}),
					secondaryNav.map(renderItem)
				]
			})
		]
	});
}
function AppShell({ children }) {
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [desktopSidebarOpen, setDesktopSidebarOpen] = (0, import_react.useState)(true);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { userProfile, activeFarm, alerts = [] } = useAppData();
	const current = [...nav, ...secondaryNav].find((n) => pathname === n.to || pathname.startsWith(n.to + "/"))?.label ?? "Dashboard";
	const unreadAlerts = alerts.filter((a) => a.severity !== "info").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen w-full bg-background",
		children: [
			desktopSidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "sticky top-0 hidden h-screen w-60 shrink-0 border-r border-sidebar-border bg-sidebar lg:block transition-all",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContent, {})
			}),
			mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-background/70 backdrop-blur-sm",
					onClick: () => setMobileOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "absolute left-0 top-0 h-full w-64 border-r border-sidebar-border bg-sidebar shadow-2xl animate-fade-up",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "absolute right-3 top-4 rounded-lg p-1.5 text-muted-foreground hover:bg-sidebar-accent",
						onClick: () => setMobileOpen(false),
						"aria-label": "Close menu",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContent, { onNavigate: () => setMobileOpen(false) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:flex sm:justify-between lg:px-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground lg:hidden",
									onClick: () => setMobileOpen(true),
									"aria-label": "Open menu",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "hidden rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground lg:block transition-colors",
									onClick: () => setDesktopSidebarOpen(!desktopSidebarOpen),
									"aria-label": "Toggle sidebar",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate font-display text-sm font-semibold",
										children: current
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "hidden text-[11px] text-muted-foreground sm:block",
										suppressHydrationWarning: true,
										children: ["Kharif 2026 · ", activeFarm?.location?.address || "No farm selected"]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/ai-saathi",
									className: "hidden items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 md:flex",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), "AI Assistant"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/alerts",
									className: "relative rounded-xl border border-border p-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-accent",
									"aria-label": "Alerts",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }), unreadAlerts > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-warning text-[9px] font-bold text-warning-foreground",
										children: unreadAlerts
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/profile",
									className: "flex items-center gap-2 rounded-xl border border-border py-1 pl-1 pr-1 transition-colors hover:border-primary/30 sm:pr-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-7 w-7 place-items-center rounded-lg bg-primary/15 text-xs font-bold text-primary ring-1 ring-primary/25",
										children: userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "U"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden text-xs font-medium sm:block",
										children: userProfile.name
									})]
								})
							]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "min-w-0 flex-1 px-4 py-6 lg:px-7",
					children
				})]
			})
		]
	});
}
function PageHeader({ title, subtitle, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 sm:flex sm:flex-wrap sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "truncate font-display text-xl font-bold tracking-tight sm:text-2xl",
				children: title
			}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				suppressHydrationWarning: true,
				children: subtitle
			})]
		}), action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shrink-0",
			children: action
		})]
	});
}
//#endregion
export { ThemeToggle as a, ThemeProvider as i, BrandMark as n, PageHeader as r, AppShell as t };
