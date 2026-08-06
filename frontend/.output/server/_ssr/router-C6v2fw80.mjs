import { i as __toESM, r as __exportAll$1 } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { L as redirect, _ as createRootRouteWithContext, b as useRouter, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C6v2fw80.js
var router_C6v2fw80_exports = /* @__PURE__ */ __exportAll$1({
	getRouter: () => getRouter,
	i: () => useTheme,
	n: () => Route$11,
	r: () => useAppData,
	t: () => router_exports
});
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var styles_default = "/assets/styles-Dyc5miwU.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
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
var AppDataContext = (0, import_react.createContext)();
var API_URL = typeof window !== "undefined" ? typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api" : "http://localhost:5001/api";
function AppDataProvider({ children }) {
	const router = useRouter();
	const [token, setToken] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") return localStorage.getItem("krishimitra_token");
		return null;
	});
	const [userProfile, setUserProfile] = (0, import_react.useState)({
		name: "Guest User",
		role: "farmer"
	});
	const [userLocation, setUserLocationState] = (0, import_react.useState)(() => {
		try {
			const saved = localStorage.getItem("user_location");
			return saved ? JSON.parse(saved) : null;
		} catch {
			return null;
		}
	});
	const setUserLocation = (loc) => {
		setUserLocationState(loc);
		if (loc) localStorage.setItem("user_location", JSON.stringify(loc));
		else localStorage.removeItem("user_location");
	};
	const [farms, setFarms] = (0, import_react.useState)([]);
	const [activeFarmId, setActiveFarmId] = (0, import_react.useState)(() => {
		if (typeof window !== "undefined") return localStorage.getItem("active_farm_id");
		return null;
	});
	const [weatherSnapshot, setWeatherSnapshot] = (0, import_react.useState)(null);
	const [alerts, setAlerts] = (0, import_react.useState)([]);
	const [notifications, setNotifications] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [loadError, setLoadError] = (0, import_react.useState)(null);
	const logout = () => {
		setToken(null);
		setUserProfile({
			name: "Guest User",
			role: "farmer"
		});
		setFarms([]);
		setActiveFarmId(null);
		localStorage.removeItem("active_farm_id");
		router.navigate({ to: "/auth" });
	};
	const activeFarm = farms.find((f) => String(f._id) === String(activeFarmId) || String(f.id) === String(activeFarmId)) || farms[0] || null;
	(0, import_react.useEffect)(() => {
		if (activeFarmId) localStorage.setItem("active_farm_id", activeFarmId);
	}, [activeFarmId]);
	(0, import_react.useEffect)(() => {
		if (farms.length > 0 && !farms.find((f) => String(f._id) === String(activeFarmId) || String(f.id) === String(activeFarmId))) setActiveFarmId(farms[0]._id || String(farms[0].id));
	}, [farms]);
	(0, import_react.useEffect)(() => {
		if (token) {
			localStorage.setItem("krishimitra_token", token);
			fetchDashboardData();
		} else {
			localStorage.removeItem("krishimitra_token");
			setIsLoading(false);
		}
	}, [token]);
	const fetchDashboardData = async () => {
		try {
			const meRes = await fetch(`${API_URL}/auth/me`, { headers: { Authorization: `Bearer ${token}` } });
			if (meRes.status === 401) {
				logout();
				return;
			}
			const meData = await meRes.json();
			if (meData.user) {
				setUserProfile({
					name: `${meData.user.firstName} ${meData.user.lastName || ""}`.trim(),
					role: meData.user.role
				});
				if (meData.user.location && typeof meData.user.location === "string") setUserLocation({
					address: meData.user.location,
					source: "profile"
				});
				else if (meData.user.location && meData.user.location.address) setUserLocation(meData.user.location);
			}
			const farmsData = await (await fetch(`${API_URL}/farms`, { headers: { Authorization: `Bearer ${token}` } })).json();
			const normalizedFarms = (Array.isArray(farmsData) ? farmsData : []).map((f) => ({
				...f,
				_id: f._id || String(f.id),
				id: f.id || f._id
			}));
			setFarms(normalizedFarms);
			const [alRes, noRes] = await Promise.all([fetch(`${API_URL}/alerts`, { headers: { Authorization: `Bearer ${token}` } }), fetch(`${API_URL}/notifications`, { headers: { Authorization: `Bearer ${token}` } })]);
			const [alData, noData] = await Promise.all([alRes.json(), noRes.json()]);
			setAlerts(Array.isArray(alData) ? alData : []);
			setNotifications(Array.isArray(noData) ? noData : []);
			setLoadError(null);
		} catch (err) {
			console.error("Failed to load dashboard data", err);
			setLoadError(err.message);
		} finally {
			setIsLoading(false);
		}
	};
	const fetchScoped = (0, import_react.useCallback)(async (path) => {
		if (!activeFarmId) return [];
		const res = await fetch(`${API_URL}${path}?farm=${activeFarmId}`, { headers: { Authorization: `Bearer ${token}` } });
		if (res.status === 401) {
			logout();
			return [];
		}
		return res.json();
	}, [activeFarmId, token]);
	const postScoped = (0, import_react.useCallback)(async (path, body) => {
		const res = await fetch(`${API_URL}${path}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				...body,
				farm: activeFarmId
			})
		});
		if (res.status === 401) {
			logout();
			return { error: "Unauthorized" };
		}
		return res.json();
	}, [activeFarmId, token]);
	const patchRecord = (0, import_react.useCallback)(async (path, body) => {
		const res = await fetch(`${API_URL}${path}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(body)
		});
		if (res.status === 401) {
			logout();
			return { error: "Unauthorized" };
		}
		return res.json();
	}, [token]);
	const login = (newToken) => {
		setToken(newToken);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppDataContext.Provider, {
		value: {
			userProfile,
			userLocation,
			setUserLocation,
			farms,
			activeFarm,
			activeFarmId,
			setActiveFarmId,
			weatherSnapshot,
			setWeatherSnapshot,
			alerts,
			setAlerts,
			notifications,
			setNotifications,
			token,
			login,
			logout,
			isLoading,
			loadError,
			fetchDashboardData,
			fetchScoped,
			postScoped,
			patchRecord
		},
		children
	});
}
function useAppData() {
	return (0, import_react.useContext)(AppDataContext);
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$18 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "KrishiMitra — AI-Powered Farming Intelligence" },
			{
				name: "description",
				content: "KrishiMitra is an AI-powered smart agriculture platform: crop recommendations, crop plans, daily schedules, risk alerts and expense insights for every farm."
			},
			{
				name: "author",
				content: "KrishiMitra"
			},
			{
				property: "og:title",
				content: "KrishiMitra — AI-Powered Farming Intelligence"
			},
			{
				property: "og:description",
				content: "Smart planning for every farm. Crop recommendations, plans, schedules, weather advisories and expense insights."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `
            try {
              let theme = localStorage.getItem('krishmitra-theme');
              if (!theme || theme === 'system') {
                theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              }
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (_) {}
          ` } })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$18.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, {
			defaultTheme: "system",
			storageKey: "krishmitra-theme",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppDataProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				position: "bottom-right",
				richColors: true
			})] })
		})
	});
}
var $$splitComponentImporter$15 = () => import("./routes-BhjleFmI.mjs");
var Route$17 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "KrishiMitra — Intelligence that grows with you." }] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("../_app-Bf26PaNl.mjs");
var Route$16 = createFileRoute("/_app")({
	beforeLoad: () => {
		if (typeof window !== "undefined") {
			if (!localStorage.getItem("krishimitra_token")) throw redirect({ to: "/auth" });
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./auth-BYV4km88.mjs");
var Route$15 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Sign in — KrishiMitra" }, {
		name: "description",
		content: "Sign in or create your KrishiMitra account to start AI-powered farm planning."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var BASE_URL = "";
var Route$14 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[{
			path: "/",
			changefreq: "weekly",
			priority: "1.0"
		}, {
			path: "/auth",
			changefreq: "monthly",
			priority: "0.6"
		}].map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$12 = () => import("../_app.ai-saathi-CYNtJsUd.mjs");
var Route$13 = createFileRoute("/_app/ai-saathi")({
	head: () => ({ meta: [{ title: "AI Mitra — KrishiMitra" }, {
		name: "description",
		content: "Your personal AI farming assistant with crop disease detection."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("../_app.alerts-D_P5JDB1.mjs");
var Route$12 = createFileRoute("/_app/alerts")({
	head: () => ({ meta: [{ title: "Risk Alerts — KrishiMitra" }, {
		name: "description",
		content: "Severity-ranked farm risk alerts: weather warnings, delay risks and crop health signals."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("../_app.crop-plan-B9cMVvxo.mjs");
var Route$11 = createFileRoute("/_app/crop-plan")({
	validateSearch: (search) => ({ crop: search.crop || void 0 }),
	head: () => ({ meta: [{ title: "Crop Plan — KrishiMitra" }, {
		name: "description",
		content: "Your soybean crop roadmap: growth stages, timeline, key tasks and milestones."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("../_app.dashboard-COMPPQau.mjs");
var Route$10 = createFileRoute("/_app/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard — KrishiMitra" }, {
		name: "description",
		content: "Your farm at a glance: weather, tasks, crop plan progress, risk alerts and expenses."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("../_app.expenses-CAlpfhNr.mjs");
var Route$9 = createFileRoute("/_app/expenses")({
	head: () => ({ meta: [{ title: "Expense Tracker — KrishiMitra" }, {
		name: "description",
		content: "Track farm expenses by category with cost summaries and break-even insights."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("../_app.farms-DECuytZW.mjs");
var Route$8 = createFileRoute("/_app/farms")({
	head: () => ({ meta: [{ title: "Farm Details — KrishiMitra" }, {
		name: "description",
		content: "Manage your farm plots: area, soil type, irrigation source and season status."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("../_app.market-C5btxJX1.mjs");
var Route$7 = createFileRoute("/_app/market")({
	head: () => ({ meta: [{ title: "Market Prices — KrishiMitra" }, {
		name: "description",
		content: "Live daily mandi prices from Data.gov.in Agmarknet."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("../_app.notifications-B-QzkAbq.mjs");
var Route$6 = createFileRoute("/_app/notifications")({
	head: () => ({ meta: [{ title: "Notifications — KrishiMitra" }, {
		name: "description",
		content: "Activity log and notification timeline: alerts, schedule changes and AI advisories."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("../_app.profile-D-AcNSry.mjs");
var Route$5 = createFileRoute("/_app/profile")({
	head: () => ({ meta: [{ title: "Farmer Profile — KrishiMitra" }, {
		name: "description",
		content: "Manage your personal details, farming preference mode and saved settings."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("../_app.recommendations-PtQw186P.mjs");
var Route$4 = createFileRoute("/_app/recommendations")({
	head: () => ({ meta: [{ title: "Crop Recommendations — KrishiMitra" }, {
		name: "description",
		content: "Enter your soil data and get AI-powered crop recommendations ranked by suitability score."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_app.schedule-ockJHRNf.mjs");
var Route$3 = createFileRoute("/_app/schedule")({
	head: () => ({ meta: [{ title: "Daily Schedule — KrishiMitra" }, {
		name: "description",
		content: "Your practical daily and weekly farm task schedule with priorities and actions."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_app.settings-Xd9G-bPf.mjs");
var Route$2 = createFileRoute("/_app/settings")({
	head: () => ({ meta: [{ title: "Settings — KrishiMitra" }, {
		name: "description",
		content: "Account, language, alert and system preferences for your KrishiMitra workspace."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_app.weather-D7EWfxcq.mjs");
var Route$1 = createFileRoute("/_app/weather")({
	head: () => ({ meta: [{ title: "Weather & Advisory — KrishiMitra" }, {
		name: "description",
		content: "Hyperlocal weather forecast with irrigation and spraying advisories for your farm."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$17.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$18
});
var AppRoute = Route$16.update({
	id: "/_app",
	getParentRoute: () => Route$18
});
var AuthRoute = Route$15.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$18
});
var SitemapDotxmlRoute = Route$14.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$18
});
var AppRouteChildren = {
	AppAiSaathiRoute: Route$13.update({
		id: "/ai-saathi",
		path: "/ai-saathi",
		getParentRoute: () => AppRoute
	}),
	AppAlertsRoute: Route$12.update({
		id: "/alerts",
		path: "/alerts",
		getParentRoute: () => AppRoute
	}),
	AppCropPlanRoute: Route$11.update({
		id: "/crop-plan",
		path: "/crop-plan",
		getParentRoute: () => AppRoute
	}),
	AppDashboardRoute: Route$10.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => AppRoute
	}),
	AppExpensesRoute: Route$9.update({
		id: "/expenses",
		path: "/expenses",
		getParentRoute: () => AppRoute
	}),
	AppFarmsRoute: Route$8.update({
		id: "/farms",
		path: "/farms",
		getParentRoute: () => AppRoute
	}),
	AppMarketRoute: Route$7.update({
		id: "/market",
		path: "/market",
		getParentRoute: () => AppRoute
	}),
	AppNotificationsRoute: Route$6.update({
		id: "/notifications",
		path: "/notifications",
		getParentRoute: () => AppRoute
	}),
	AppProfileRoute: Route$5.update({
		id: "/profile",
		path: "/profile",
		getParentRoute: () => AppRoute
	}),
	AppRecommendationsRoute: Route$4.update({
		id: "/recommendations",
		path: "/recommendations",
		getParentRoute: () => AppRoute
	}),
	AppScheduleRoute: Route$3.update({
		id: "/schedule",
		path: "/schedule",
		getParentRoute: () => AppRoute
	}),
	AppSettingsRoute: Route$2.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => AppRoute
	}),
	AppWeatherRoute: Route$1.update({
		id: "/weather",
		path: "/weather",
		getParentRoute: () => AppRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	AuthRoute,
	SitemapDotxmlRoute
};
var routeTree = Route$18._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { useTheme as i, router_C6v2fw80_exports as n, useAppData as r, Route$11 as t };
