import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { C as Search, R as MapPin, Z as Funnel, _ as Sparkles, k as RefreshCw, m as Store, s as TrendingUp, vt as ChevronDown, xt as ChartLine } from "./_libs/lucide-react.mjs";
import { r as useAppData } from "./_ssr/router-DcyHQImX.mjs";
import { r as PageHeader } from "./_ssr/AppShell-DaKle9m-.mjs";
import { a as YAxis, c as Line, i as LineChart, l as CartesianGrid, m as Tooltip, o as XAxis, p as ResponsiveContainer } from "./_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.market-Fpc6yn2_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_CROPS = [
	"Soybean",
	"Cotton",
	"Wheat",
	"Maize",
	"Rice",
	"Pigeonpea",
	"Gram",
	"Groundnut",
	"Onion",
	"Tomato"
];
function MarketPage() {
	const navigate = useNavigate();
	const { token, activeFarm, userLocation } = useAppData();
	const [prices, setPrices] = (0, import_react.useState)([]);
	const [rawHistory, setRawHistory] = (0, import_react.useState)([]);
	const [chartData, setChartData] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [historyLoading, setHistoryLoading] = (0, import_react.useState)(false);
	const [lastUpdated, setLastUpdated] = (0, import_react.useState)(null);
	const [needsRefresh, setNeedsRefresh] = (0, import_react.useState)(false);
	const [commoditySearch, setCommoditySearch] = (0, import_react.useState)("");
	const [stateFilter, setStateFilter] = (0, import_react.useState)(() => userLocation?.state || "Maharashtra");
	const [districtFilter, setDistrictFilter] = (0, import_react.useState)(() => userLocation?.district || "");
	const [marketFilter, setMarketFilter] = (0, import_react.useState)("");
	const [sortOrder, setSortOrder] = (0, import_react.useState)("dateDesc");
	const [locationLoaded, setLocationLoaded] = (0, import_react.useState)(Boolean(userLocation?.state));
	const [availableDistricts, setAvailableDistricts] = (0, import_react.useState)([]);
	const [availableMarkets, setAvailableMarkets] = (0, import_react.useState)([]);
	const [allCommodities, setAllCommodities] = (0, import_react.useState)(DEFAULT_CROPS);
	const [cropSearchQuery, setCropSearchQuery] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (userLocation?.state && !locationLoaded) {
			setStateFilter(userLocation.state);
			if (userLocation.district) setDistrictFilter(userLocation.district);
			setLocationLoaded(true);
		} else if (!locationLoaded && activeFarm?.location?.address) (async () => {
			try {
				const geoData = await (await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(activeFarm.location.address)}&addressdetails=1`)).json();
				if (geoData && geoData.length > 0 && geoData[0].address) {
					const { state, state_district, county } = geoData[0].address;
					if (state) setStateFilter(state);
					const district = state_district || county || "";
					if (district) setDistrictFilter(district.replace(/ District/i, ""));
				}
			} catch (err) {
				console.error("Geocoding failed", err);
			} finally {
				setLocationLoaded(true);
			}
		})();
	}, [
		userLocation,
		activeFarm?.location?.address,
		locationLoaded
	]);
	(0, import_react.useEffect)(() => {
		async function fetchBaseline() {
			try {
				const res = await fetch(`${typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api"}/market/locations`, { headers: { Authorization: `Bearer ${token}` } });
				if (res.ok) {
					const data = await res.json();
					if (data.commodities && data.commodities.length > 0) setAllCommodities(data.commodities);
				}
			} catch (err) {}
		}
		fetchBaseline();
	}, [token]);
	(0, import_react.useEffect)(() => {
		async function fetchLocations() {
			try {
				const params = new URLSearchParams();
				if (stateFilter) params.append("state", stateFilter);
				if (districtFilter) params.append("district", districtFilter);
				const res = await fetch(`${typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api"}/market/locations?${params.toString()}`, { headers: { Authorization: `Bearer ${token}` } });
				if (res.ok) {
					const data = await res.json();
					if (data.districts) setAvailableDistricts(data.districts);
					if (data.markets) setAvailableMarkets(data.markets);
				}
			} catch (err) {
				console.error("Failed to fetch locations", err);
			}
		}
		fetchLocations();
	}, [
		stateFilter,
		districtFilter,
		token
	]);
	const fetchPrices = async () => {
		setLoading(true);
		try {
			const params = new URLSearchParams({ limit: "50" });
			if (stateFilter) params.append("state", stateFilter);
			if (districtFilter) params.append("district", districtFilter);
			if (commoditySearch) params.append("commodity", commoditySearch);
			const res = await fetch(`${typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api"}/market/prices?${params.toString()}`, { headers: { Authorization: `Bearer ${token}` } });
			if (res.ok) {
				const data = await res.json();
				setPrices(data.records || []);
				if (data.lastUpdated) setLastUpdated(new Date(data.lastUpdated));
				if (data.needsRefresh != null) setNeedsRefresh(data.needsRefresh);
			}
		} catch (err) {
			console.error("Failed to fetch prices:", err);
		} finally {
			setLoading(false);
		}
	};
	const fetchHistory = async () => {
		if (!commoditySearch) {
			setChartData([]);
			return;
		}
		setHistoryLoading(true);
		try {
			const params = new URLSearchParams({ commodity: commoditySearch });
			if (stateFilter) params.append("state", stateFilter);
			if (districtFilter) params.append("district", districtFilter);
			if (marketFilter) params.append("market", marketFilter);
			const res = await fetch(`${typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api"}/market/history?${params.toString()}`, { headers: { Authorization: `Bearer ${token}` } });
			if (res.ok) {
				const data = await res.json();
				setRawHistory(data.records || []);
				const grouped = (data.records || []).reduce((acc, curr) => {
					const date = curr.arrival_date;
					if (!acc[date]) acc[date] = {
						date,
						sum: 0,
						count: 0,
						parsedObj: new Date(curr.parsedDate)
					};
					acc[date].sum += curr.modal_price;
					acc[date].count += 1;
					return acc;
				}, {});
				const chartArr = Object.values(grouped).map((g) => ({
					date: g.date.substring(0, 5),
					price: Math.round(g.sum / g.count),
					parsedObj: g.parsedObj
				})).sort((a, b) => a.parsedObj - b.parsedObj);
				setChartData(chartArr);
			}
		} catch (err) {
			console.error("Failed to fetch history:", err);
		} finally {
			setHistoryLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		const timer = setTimeout(() => {
			fetchPrices();
			fetchHistory();
		}, 500);
		return () => clearTimeout(timer);
	}, [
		commoditySearch,
		stateFilter,
		districtFilter,
		marketFilter,
		token
	]);
	const isHistoryView = !!marketFilter && !!commoditySearch;
	let tableData = isHistoryView ? [...rawHistory] : [...prices];
	if (!isHistoryView && marketFilter) tableData = tableData.filter((p) => p.market.toLowerCase() === marketFilter.toLowerCase());
	tableData.sort((a, b) => {
		if (sortOrder === "priceDesc") return b.modal_price - a.modal_price;
		if (sortOrder === "priceAsc") return a.modal_price - b.modal_price;
		return new Date(b.parsedDate || 0) - new Date(a.parsedDate || 0);
	});
	const filteredCropsList = allCommodities.filter((c) => c.toLowerCase().includes(cropSearchQuery.toLowerCase()));
	const cropStats = (() => {
		if (!commoditySearch || tableData.length === 0) return null;
		const prices_ = tableData.map((p) => p.modal_price).filter((n) => typeof n === "number");
		if (prices_.length === 0) return null;
		const high = Math.max(...prices_);
		const low = Math.min(...prices_);
		const avg = Math.round(prices_.reduce((a, b) => a + b, 0) / prices_.length);
		const marketCount = new Set(tableData.map((p) => p.market)).size;
		let change = null;
		if (chartData.length >= 2) {
			const first = chartData[0].price, last = chartData[chartData.length - 1].price;
			change = first ? Math.round((last - first) / first * 100) : null;
		}
		return {
			high,
			low,
			avg,
			marketCount,
			change
		};
	})();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Market Prices & Trends",
			subtitle: lastUpdated ? `Data from ${lastUpdated.toLocaleDateString("en-IN", {
				day: "numeric",
				month: "short",
				year: "numeric"
			})}${needsRefresh ? " · Syncing latest..." : " · Up to date"}` : "Daily mandi prices via Data.gov.in · Agmarknet",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					needsRefresh && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5 rounded-full bg-warning/10 px-2.5 py-1 text-[11px] font-medium text-warning",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-warning animate-pulse" }), "Syncing in background"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => navigate({ to: "/ai-saathi?prompt=%40market" }),
						className: "flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-[0_0_24px_-8px_var(--color-primary)] transition-transform hover:scale-[1.03]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), " Analyze with AI"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							fetchPrices();
							fetchHistory();
						},
						className: "flex items-center gap-1.5 rounded-xl border border-border bg-secondary/30 px-4 py-2 text-xs font-semibold hover:bg-secondary transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-3.5 w-3.5 ${loading ? "animate-spin" : ""}` }), " Refresh"]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 flex flex-col lg:flex-row gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "w-full lg:w-72 shrink-0 flex flex-col gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-2xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-display font-semibold mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "h-4 w-4" }), " Filters"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block",
								children: "State"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: stateFilter,
										onChange: (e) => {
											setStateFilter(e.target.value);
											setDistrictFilter("");
											setMarketFilter("");
										},
										className: "w-full appearance-none rounded-xl border border-input bg-background pl-10 pr-4 py-2 text-sm outline-none focus:border-primary/50 transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "All States"
										}), [
											"Andhra Pradesh",
											"Assam",
											"Bihar",
											"Chhattisgarh",
											"Gujarat",
											"Haryana",
											"Himachal Pradesh",
											"Jharkhand",
											"Karnataka",
											"Kerala",
											"Madhya Pradesh",
											"Maharashtra",
											"Odisha",
											"Punjab",
											"Rajasthan",
											"Tamil Nadu",
											"Telangana",
											"Uttar Pradesh",
											"Uttarakhand",
											"West Bengal"
										].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: s,
											children: s
										}, s))]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block",
								children: "District"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: districtFilter,
										onChange: (e) => {
											setDistrictFilter(e.target.value);
											setMarketFilter("");
										},
										className: "w-full appearance-none rounded-xl border border-input bg-background pl-10 pr-4 py-2 text-sm outline-none focus:border-primary/50 transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "All Districts"
										}), availableDistricts.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: d,
											children: d
										}, d))]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block",
								children: "Market Yard"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: marketFilter,
										onChange: (e) => setMarketFilter(e.target.value),
										className: "w-full appearance-none rounded-xl border border-input bg-background pl-10 pr-4 py-2 text-sm outline-none focus:border-primary/50 transition-colors",
										disabled: !districtFilter,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: districtFilter ? "All Yards" : "Select District First"
										}), availableMarkets.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: m,
											children: m
										}, m))]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" })
								]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-2xl flex flex-col overflow-hidden max-h-[400px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 border-b border-border/50 bg-background/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block",
							children: "Crop / Commodity"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Search 200+ crops...",
								value: cropSearchQuery,
								onChange: (e) => setCropSearchQuery(e.target.value),
								className: "w-full rounded-lg border border-input bg-background pl-9 pr-3 py-1.5 text-sm outline-none focus:border-primary/50 transition-colors"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "overflow-y-auto p-2",
						children: [filteredCropsList.map((crop) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: `flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${commoditySearch === crop ? "bg-primary/10 text-primary font-medium" : "hover:bg-secondary/40"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "radio",
								name: "cropSelection",
								checked: commoditySearch === crop,
								onChange: () => setCommoditySearch(crop),
								className: "accent-primary"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: crop
							})]
						}, crop)), filteredCropsList.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4 text-center text-xs text-muted-foreground",
							children: "No crops found."
						})]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex flex-col gap-6 min-w-0",
				children: [
					commoditySearch && cropStats && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-widest text-muted-foreground",
									children: "Avg Modal Price"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 font-display text-2xl font-bold text-primary",
									children: ["₹", cropStats.avg.toLocaleString()]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-widest text-muted-foreground",
									children: "Highest"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 font-display text-2xl font-bold",
									children: ["₹", cropStats.high.toLocaleString()]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-widest text-muted-foreground",
									children: "Lowest"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 font-display text-2xl font-bold",
									children: ["₹", cropStats.low.toLocaleString()]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-widest text-muted-foreground",
									children: cropStats.change !== null ? "Trend (period)" : "Markets Reporting"
								}), cropStats.change !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `mt-1 flex items-center gap-1 font-display text-2xl font-bold ${cropStats.change >= 0 ? "text-primary" : "text-destructive"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: `h-4 w-4 ${cropStats.change < 0 ? "rotate-180" : ""}` }),
										cropStats.change >= 0 ? "+" : "",
										cropStats.change,
										"%"
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 font-display text-2xl font-bold",
									children: cropStats.marketCount
								})]
							})
						]
					}),
					commoditySearch && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-2xl p-6 h-[300px] flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-between items-start mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-lg font-display font-semibold flex items-center gap-2",
								children: [commoditySearch ? `${commoditySearch} Price Trend` : "Price Trend", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5 text-primary" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									marketFilter ? `${marketFilter} Yard, ` : "",
									districtFilter ? `${districtFilter}, ` : "",
									stateFilter || "India"
								]
							})] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 w-full relative",
							children: historyLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-0 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-5 w-5 animate-spin text-muted-foreground" })
							}) : chartData.length < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute inset-0 flex flex-col items-center justify-center text-muted-foreground text-sm text-center px-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLine, { className: "h-8 w-8 mb-2 opacity-30" }),
									"Not enough historical data saved for ",
									commoditySearch,
									" in this location yet."
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
									data: chartData,
									margin: {
										top: 5,
										right: 10,
										left: -20,
										bottom: 0
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											strokeDasharray: "3 3",
											vertical: false,
											stroke: "hsl(var(--border))"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "date",
											axisLine: false,
											tickLine: false,
											tick: {
												fontSize: 11,
												fill: "hsl(var(--muted-foreground))"
											},
											dy: 10
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											axisLine: false,
											tickLine: false,
											tick: {
												fontSize: 11,
												fill: "hsl(var(--muted-foreground))"
											},
											domain: ["auto", "auto"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
											contentStyle: {
												borderRadius: "12px",
												border: "1px solid hsl(var(--border))",
												background: "hsl(var(--background))"
											},
											itemStyle: {
												color: "hsl(var(--primary))",
												fontWeight: "bold"
											},
											formatter: (val) => [`₹${val}`, "Avg Modal Price"],
											labelStyle: {
												color: "hsl(var(--foreground))",
												marginBottom: "4px"
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
											type: "monotone",
											dataKey: "price",
											stroke: "hsl(var(--primary))",
											strokeWidth: 3,
											dot: {
												r: 4,
												fill: "hsl(var(--background))",
												strokeWidth: 2
											},
											activeDot: {
												r: 6,
												fill: "hsl(var(--primary))"
											}
										})
									]
								})
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-2xl flex-1 flex flex-col overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-5 border-b border-border/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-display font-semibold",
								children: isHistoryView ? `Previous Prices: ${marketFilter}` : `Latest Prices: ${districtFilter || stateFilter}`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: isHistoryView ? `Historical log of ${commoditySearch || "crops"} in ${marketFilter}` : `Current daily prices across different mandis`
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-medium text-muted-foreground",
									children: "Sort By:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: sortOrder,
									onChange: (e) => setSortOrder(e.target.value),
									className: "rounded-lg border border-input bg-background px-3 py-1.5 text-sm outline-none focus:border-primary/50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "dateDesc",
											children: "Date (Newest First)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "priceDesc",
											children: "Price (High to Low)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "priceAsc",
											children: "Price (Low to High)"
										})
									]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto flex-1 p-5 pt-0",
							children: loading && tableData.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-40 items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-5 w-5 animate-spin" }), " Fetching data..."]
								})
							}) : tableData.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex h-40 flex-col items-center justify-center rounded-xl border border-dashed border-border mt-5 text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "mb-2 h-8 w-8 opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No prices found for your filters." })]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left text-sm mt-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-border text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-3 font-medium px-2",
											children: "Commodity"
										}),
										!isHistoryView && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-3 font-medium px-2",
											children: "Market (Yard)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-3 font-medium px-2 text-right",
											children: "Modal Price"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-3 font-medium px-2 text-right",
											children: "Min-Max"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "pb-3 font-medium px-2 text-right",
											children: "Date"
										})
									]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: tableData.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-border/50 hover:bg-secondary/10 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-3 px-2 cursor-pointer group",
											onClick: () => {
												setCommoditySearch(p.commodity);
												window.scrollTo({
													top: 0,
													behavior: "smooth"
												});
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "font-medium text-foreground group-hover:text-primary transition-colors flex items-center gap-1",
												children: [p.commodity, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[11px] text-muted-foreground",
												children: p.variety
											})]
										}),
										!isHistoryView && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-3 px-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-foreground",
												children: p.market
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[11px] text-muted-foreground",
												children: p.district
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-3 px-2 text-right font-display font-bold text-primary",
											children: ["₹", p.modal_price.toLocaleString()]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-3 px-2 text-right text-xs text-muted-foreground",
											children: [
												"₹",
												p.min_price,
												" - ₹",
												p.max_price
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-3 px-2 text-right text-[11px] text-muted-foreground",
											children: p.arrival_date
										})
									]
								}, i)) })]
							})
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
export { MarketPage as component };
