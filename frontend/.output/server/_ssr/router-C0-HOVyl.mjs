import { i as __toESM, r as __exportAll } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { L as redirect, _ as createRootRouteWithContext, b as useRouter, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAppData, t as AppDataProvider } from "./AppDataContext-vZWx5SEf.mjs";
import { $ as Droplets, Y as FlaskConical, _ as Sparkles, et as Crown, g as Sprout } from "../_libs/lucide-react.mjs";
import { i as ThemeProvider, r as PageHeader } from "./AppShell-22kaeU-F.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/aiSyncEvents-D9hVvtz4.js
var AI_SYNC_EVENT = "krishmitra:ai-sync";
function emitAiSyncRefresh(reason = "ai") {
	if (typeof window === "undefined") return;
	window.dispatchEvent(new CustomEvent(AI_SYNC_EVENT, { detail: { reason } }));
}
function subscribeAiSyncRefresh(handler) {
	if (typeof window === "undefined") return () => {};
	const wrapped = (event) => handler?.(event?.detail?.reason);
	window.addEventListener(AI_SYNC_EVENT, wrapped);
	return () => window.removeEventListener(AI_SYNC_EVENT, wrapped);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/_app.crop-plan-CF5C4V9F.js
var $$splitComponentImporter$11 = () => import("../_app.crop-plan-CVwczpsh.mjs");
var Route$14 = createFileRoute("/_app/crop-plan")({
	validateSearch: (search) => ({ crop: search.crop || void 0 }),
	head: () => ({ meta: [{ title: "Crop Plan — KrishiMitra" }, {
		name: "description",
		content: "Your soybean crop roadmap: growth stages, timeline, key tasks and milestones."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-C0-HOVyl.js
var router_C0_HOVyl_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-ByioLJsS.css";
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
var Route$13 = createRootRouteWithContext()({
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
	const { queryClient } = Route$13.useRouteContext();
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
var $$splitComponentImporter$10 = () => import("./routes-DRY-6x_0.mjs");
var Route$12 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "KrishiMitra — Intelligence that grows with you." }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("../_app-BB-FFRjt.mjs");
var Route$11 = createFileRoute("/_app")({
	beforeLoad: () => {
		if (typeof window !== "undefined") {
			if (!localStorage.getItem("krishimitra_token")) throw redirect({ to: "/auth" });
		}
	},
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./auth-CI1sjEQx.mjs");
var Route$10 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Sign in — KrishiMitra" }, {
		name: "description",
		content: "Sign in or create your KrishiMitra account to start AI-powered farm planning."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var BASE_URL = "";
var Route$9 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
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
var $$splitComponentImporter$7 = () => import("../_app.ai-saathi-fE92ZqLd.mjs");
var Route$8 = createFileRoute("/_app/ai-saathi")({
	head: () => ({ meta: [{ title: "AI Mitra — KrishiMitra" }, {
		name: "description",
		content: "Your personal AI farming assistant with crop disease detection."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("../_app.alerts-k-U-xuO1.mjs");
var Route$7 = createFileRoute("/_app/alerts")({
	head: () => ({ meta: [{ title: "Risk Alerts — KrishiMitra" }, {
		name: "description",
		content: "Severity-ranked farm risk alerts: weather warnings, delay risks and crop health signals."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("../_app.dashboard-DcU3jCOF.mjs");
var Route$6 = createFileRoute("/_app/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard — KrishiMitra" }, {
		name: "description",
		content: "Your farm at a glance: weather, tasks, crop plan progress, risk alerts and expenses."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("../_app.expenses-BrRCkvrV.mjs");
var Route$5 = createFileRoute("/_app/expenses")({
	head: () => ({ meta: [{ title: "Expense Tracker — KrishiMitra" }, {
		name: "description",
		content: "Track farm expenses by category with cost summaries and break-even insights."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
typeof window !== "undefined" && `${window.location.hostname}`;
var Route$4 = createFileRoute("/_app/recommendations")({
	head: () => ({ meta: [{ title: "Crop Recommendations — KrishiMitra" }, {
		name: "description",
		content: "Enter your soil data and get AI-powered crop recommendations ranked by suitability score."
	}] }),
	component: RecommendationsView
});
(/* @__PURE__ */ new Date()).toISOString().split("T")[0];
function ScoreBar({ value, color = "bg-primary" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-1.5 w-full overflow-hidden rounded-full bg-secondary",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `h-full rounded-full transition-all duration-700 ${color}`,
			style: { width: `${value}%` }
		})
	});
}
function RecommendationsView() {
	const { activeFarmId, activeFarm, postScoped, fetchScoped, token } = useAppData();
	const [results, setResults] = (0, import_react.useState)(null);
	const [llmSummary, setLlmSummary] = (0, import_react.useState)(null);
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
			if (latest?.cropOptions?.length) {
				setResults(latest.cropOptions);
				setLlmSummary(latest.llmSummary || null);
			} else {
				setResults(null);
				setLlmSummary(null);
			}
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
	const primary = results?.find((r) => r.isTopPick) || results?.[0];
	const others = results?.filter((r) => !r.isTopPick) || [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Crop Recommendations",
				subtitle: `Below are the latest AI-generated crop recommendations saved for your active farm.`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-between items-center px-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold text-primary",
					children: "Farm Suitability Analysis"
				})
			}),
			results && !isLoading && primary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				llmSummary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-3xl p-6 sm:p-8 bg-primary/5 border border-primary/20 mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-3 text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold",
							children: "AI Agronomist Summary"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap",
						children: llmSummary
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
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
							}),
							(primary.suggestedFertilizer || primary.irrigationPrediction) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-wrap gap-4 pt-4 border-t border-border/40",
								children: [primary.suggestedFertilizer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/50 bg-secondary/20 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "h-3 w-3" }), " Suggested Fertilizer"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-semibold",
										children: primary.suggestedFertilizer
									})]
								}), primary.irrigationPrediction && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border/50 bg-secondary/20 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "h-3 w-3" }), " AI Irrigation Pattern"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-semibold",
										children: primary.irrigationPrediction
									})]
								})]
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
				}),
				others.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
							(crop.suggestedFertilizer || crop.irrigationPrediction) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 space-y-2 border-t border-border/50 pt-3",
								children: [crop.suggestedFertilizer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[10px] text-muted-foreground flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "h-3 w-3" }), " Fertilizer"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground truncate pl-2 max-w-[120px] text-right",
										title: crop.suggestedFertilizer,
										children: crop.suggestedFertilizer
									})]
								}), crop.irrigationPrediction && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[10px] text-muted-foreground flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "h-3 w-3" }), " Irrigation"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-foreground truncate pl-2 max-w-[120px] text-right",
										title: crop.irrigationPrediction,
										children: crop.irrigationPrediction
									})]
								})]
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
				})] })
			] }),
			results && results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass rounded-3xl py-16 text-center text-sm text-muted-foreground",
				children: "No suitable crops found for the given inputs. Try adjusting the season or soil values."
			})
		]
	});
}
var $$splitComponentImporter$3 = () => import("../_app.farms-DDna_fN1.mjs");
var Route$3 = createFileRoute("/_app/farms")({
	head: () => ({ meta: [{ title: "Farm Details — KrishiMitra" }, {
		name: "description",
		content: "Manage your farm plots: area, soil type, irrigation source and season status."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_app.market-DWZrbKaG.mjs");
var Route$2 = createFileRoute("/_app/market")({
	head: () => ({ meta: [{ title: "Market Prices — KrishiMitra" }, {
		name: "description",
		content: "Live daily mandi prices from Data.gov.in Agmarknet."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_app.profile-aGm04y1_.mjs");
var Route$1 = createFileRoute("/_app/profile")({
	head: () => ({ meta: [{ title: "Settings & Profile — KrishiMitra" }, {
		name: "description",
		content: "Manage your personal details, security, and farming preferences."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_app.weather-BoU12oUN.mjs");
var Route = createFileRoute("/_app/weather")({
	head: () => ({ meta: [{ title: "Weather & Advisory — KrishiMitra" }, {
		name: "description",
		content: "Hyperlocal weather forecast with irrigation and spraying advisories for your farm."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var AppRoute = Route$11.update({
	id: "/_app",
	getParentRoute: () => Route$13
});
var AuthRoute = Route$10.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$13
});
var SitemapDotxmlRoute = Route$9.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$13
});
var AppRouteChildren = {
	AppAiSaathiRoute: Route$8.update({
		id: "/ai-saathi",
		path: "/ai-saathi",
		getParentRoute: () => AppRoute
	}),
	AppAlertsRoute: Route$7.update({
		id: "/alerts",
		path: "/alerts",
		getParentRoute: () => AppRoute
	}),
	AppCropPlanRoute: Route$14.update({
		id: "/crop-plan",
		path: "/crop-plan",
		getParentRoute: () => AppRoute
	}),
	AppDashboardRoute: Route$6.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => AppRoute
	}),
	AppExpensesRoute: Route$5.update({
		id: "/expenses",
		path: "/expenses",
		getParentRoute: () => AppRoute
	}),
	AppFarmsRoute: Route$3.update({
		id: "/farms",
		path: "/farms",
		getParentRoute: () => AppRoute
	}),
	AppMarketRoute: Route$2.update({
		id: "/market",
		path: "/market",
		getParentRoute: () => AppRoute
	}),
	AppProfileRoute: Route$1.update({
		id: "/profile",
		path: "/profile",
		getParentRoute: () => AppRoute
	}),
	AppRecommendationsRoute: Route$4.update({
		id: "/recommendations",
		path: "/recommendations",
		getParentRoute: () => AppRoute
	}),
	AppWeatherRoute: Route.update({
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
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
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
export { getRouter, subscribeAiSyncRefresh as i, Route$14 as n, emitAiSyncRefresh as r, router_C0_HOVyl_exports as t };
