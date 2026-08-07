import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { y as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { A as Plus, C as Search, Ct as Calendar, N as Navigation, R as MapPin, X as Gauge, _ as Sparkles, d as Thermometer, dt as CloudRain, et as Eye, ft as Clock, n as Wind, p as Sun, rt as Droplets, t as X, ut as CloudSun } from "./_libs/lucide-react.mjs";
import { r as useAppData } from "./_ssr/router-DcyHQImX.mjs";
import { r as PageHeader } from "./_ssr/AppShell-DaKle9m-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.weather-DxCbCSiO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function getSkyStyle(rainChance, temp, windSpeed, hour) {
	if (hour < 6 || hour >= 19) return {
		bg: "linear-gradient(160deg, #0f0c29 0%, #1a1a4e 40%, #24243e 100%)",
		overlay: "rgba(15,12,41,0.3)",
		label: "Night"
	};
	if (rainChance > 70) return {
		bg: "linear-gradient(160deg, #2c3e50 0%, #3d5a73 40%, #4a7fa0 100%)",
		overlay: "rgba(44,62,80,0.2)",
		label: "Stormy"
	};
	if (rainChance > 40) return {
		bg: "linear-gradient(160deg, #616e7c 0%, #7d9ab5 40%, #a0bfd4 100%)",
		overlay: "rgba(97,110,124,0.2)",
		label: "Cloudy"
	};
	if (temp > 35) return {
		bg: "linear-gradient(160deg, #c94b4b 0%, #e87a3a 40%, #f5c26b 100%)",
		overlay: "rgba(200,75,75,0.15)",
		label: "Hot & Sunny"
	};
	return {
		bg: "linear-gradient(160deg, #1e6fa8 0%, #2e9cd4 40%, #78c8ed 100%)",
		overlay: "rgba(30,111,168,0.15)",
		label: "Partly Cloudy"
	};
}
function buildAdvisory(current, waterLevel) {
	if (!current) return [];
	const items = [];
	if (current.rainChance >= 60) items.push({
		tone: "warning",
		title: "Hold off on spraying",
		detail: `${current.rainChance}% chance of rain — spray will likely wash off. Wait for a drier window.`
	});
	else if (current.wind >= 25) items.push({
		tone: "warning",
		title: "Skip spraying today",
		detail: `Wind around ${current.wind} km/h risks drift. Spray early morning once wind drops below 15 km/h.`
	});
	else items.push({
		tone: "good",
		title: "Good spraying window",
		detail: "Low rain chance and calm wind — safe to spray pesticide/fertilizer today."
	});
	const lowWater = waterLevel === "low";
	if (current.rainChance >= 60) items.push({
		tone: "good",
		title: "Irrigation can wait",
		detail: "Rain expected today — skip scheduled irrigation and check drainage instead."
	});
	else if (lowWater && current.humidity < 50) items.push({
		tone: "warning",
		title: "Prioritise irrigation",
		detail: "This farm is marked low water availability and humidity is low — irrigate early morning to reduce evaporation loss."
	});
	else if (current.humidity < 40) items.push({
		tone: "warning",
		title: "Irrigate today",
		detail: "Low humidity is drying the root zone faster than usual — check soil moisture and irrigate if dry."
	});
	else items.push({
		tone: "neutral",
		title: "Irrigation on schedule",
		detail: "Conditions are normal — follow the regular irrigation interval for this crop."
	});
	if (current.uv >= 8) items.push({
		tone: "warning",
		title: "High UV",
		detail: "Avoid midday fieldwork; schedule labour for early morning or evening."
	});
	return items;
}
function WeatherIcon({ rainChance, size = 5, className = "" }) {
	const cls = `h-${size} w-${size} ${className}`;
	if (rainChance > 60) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudRain, { className: cls });
	if (rainChance > 25) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudSun, { className: cls });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: cls });
}
async function fetchWeatherForLocation(locationQuery) {
	let lat = 21.17;
	let lon = 72.83;
	let cityName = locationQuery;
	const geoData = await (await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationQuery)}&limit=1`)).json();
	if (geoData && geoData.length > 0) {
		lat = parseFloat(geoData[0].lat);
		lon = parseFloat(geoData[0].lon);
		const addr = geoData[0].address || {};
		cityName = addr.city || addr.town || addr.village || addr.county || locationQuery;
	}
	const baseUrl = typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api";
	const weatherRes = await fetch(`${baseUrl}/weather?latitude=${lat}&longitude=${lon}`);
	if (!weatherRes.ok) throw new Error("Failed to fetch weather from ML backend");
	const data = await weatherRes.json();
	const current = {
		temp: Math.round(data.current?.temperature ?? 28),
		feelsLike: Math.round(data.current?.feels_like ?? 28),
		humidity: data.current?.humidity ?? 65,
		wind: Math.round(data.current?.wind_speed ?? 12),
		windDir: data.current?.wind_direction ?? 225,
		rainChance: data.daily_forecast?.[0]?.precipitation_probability_max ?? 10,
		precipitation: data.current?.precipitation ?? 0,
		uv: data.daily_forecast?.[0]?.uv_index_max ?? 5,
		visibility: 15,
		pressure: data.current?.pressure ?? 1007,
		sunrise: data.daily_forecast?.[0]?.sunrise?.split("T")[1]?.slice(0, 5) ?? "06:05",
		sunset: data.daily_forecast?.[0]?.sunset?.split("T")[1]?.slice(0, 5) ?? "19:23"
	};
	const days = [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	];
	const daily = (data.daily_forecast || []).slice(0, 10).map((d, i) => ({
		day: i === 0 ? "Today" : days[new Date(d.date).getDay()],
		hi: Math.round(d.temp_max),
		lo: Math.round(d.temp_min),
		rain: d.precipitation_probability_max ?? 0
	}));
	const nowHour = (/* @__PURE__ */ new Date()).getHours();
	const hourlyStartIdx = (data.hourly_forecast || []).findIndex((h) => new Date(h.time).getHours() === nowHour) || 0;
	const hourly = (data.hourly_forecast || []).slice(hourlyStartIdx, hourlyStartIdx + 13).map((h, i) => {
		const hr = new Date(h.time).getHours();
		return {
			label: i === 0 ? "Now" : `${hr}${hr < 12 ? "AM" : "PM"}`,
			temp: Math.round(h.temperature),
			rain: h.precipitation_probability ?? 0
		};
	});
	return {
		cityName,
		current,
		daily,
		hourly,
		lat,
		lon
	};
}
function LocationCard({ name, temp, condition, rain, active, onClick, onRemove }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "button",
		tabIndex: 0,
		onClick,
		onKeyDown: (e) => e.key === "Enter" && onClick?.(),
		className: `hover-lift group relative flex shrink-0 cursor-pointer flex-col items-start gap-1 overflow-hidden rounded-2xl px-4 py-3 text-left transition-all ${active ? "glass ring-2 ring-primary/50" : "glass ring-1 ring-border hover:ring-primary/25"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex w-full items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate text-sm font-semibold",
					children: name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-0.5 text-[11px] text-muted-foreground",
					children: condition
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-right",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "font-display text-lg font-bold text-primary",
					children: [temp, "°"]
				}), rain > 30 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-[10px] text-cyan",
					children: [rain, "% rain"]
				})]
			})]
		}), onRemove && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: (e) => {
				e.stopPropagation();
				onRemove();
			},
			className: "absolute right-1 top-1 hidden h-5 w-5 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-destructive group-hover:flex",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
		})]
	});
}
function WeatherPage() {
	const navigate = useNavigate();
	const { token, activeFarm, userLocation, setWeatherSnapshot, postScoped, alerts, fetchDashboardData } = useAppData();
	const [locations, setLocations] = (0, import_react.useState)([]);
	const [locationData, setLocationData] = (0, import_react.useState)({});
	const [locationMeta, setLocationMeta] = (0, import_react.useState)({});
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [searchResults, setSearchResults] = (0, import_react.useState)([]);
	const [isSearching, setIsSearching] = (0, import_react.useState)(false);
	const [showSearch, setShowSearch] = (0, import_react.useState)(false);
	(0, import_react.useRef)(null);
	const searchTimeout = (0, import_react.useRef)(null);
	const API_URL = typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api";
	/** Convert a location query to a stable cache key (mirrors backend logic) */
	const toLocationKey = (q) => q.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
	/** Save freshly-fetched live data to the backend DB cache */
	const persistToCache = async (locationKey, cityName, lat, lon, data) => {
		try {
			await fetch(`${API_URL}/weather/cache`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					locationKey,
					cityName,
					lat,
					lon,
					data
				})
			});
		} catch (e) {}
	};
	/**
	* SWR loader for a single location:
	* 1. Check backend DB cache → render immediately if found
	* 2. Fire live fetch in parallel (or if cache empty)
	* 3. When live data arrives → update UI + persist to cache
	*/
	const loadLocationSWR = async (loc) => {
		const key = toLocationKey(loc.query);
		try {
			const cacheRes = await fetch(`${API_URL}/weather/cache/${key}?query=${encodeURIComponent(loc.query)}`, { headers: { Authorization: `Bearer ${token}` } });
			if (cacheRes.ok) {
				const cached = await cacheRes.json();
				if (cached.data) {
					setLocationData((prev) => ({
						...prev,
						[loc.id]: {
							cityName: cached.cityName,
							...cached.data,
							lat: cached.lat,
							lon: cached.lon
						}
					}));
					setLocationMeta((prev) => ({
						...prev,
						[loc.id]: {
							source: cached.source,
							ageMinutes: cached.ageMinutes,
							cachedAt: cached.cachedAt
						}
					}));
					if (cached.source === "cache") return;
				}
			}
		} catch (e) {}
		try {
			const liveData = await fetchWeatherForLocation(loc.query);
			setLocationData((prev) => ({
				...prev,
				[loc.id]: liveData
			}));
			setLocationMeta((prev) => ({
				...prev,
				[loc.id]: {
					source: "live",
					ageMinutes: 0,
					cachedAt: (/* @__PURE__ */ new Date()).toISOString()
				}
			}));
			persistToCache(key, liveData.cityName, liveData.lat, liveData.lon, {
				current: liveData.current,
				daily: liveData.daily,
				hourly: liveData.hourly
			});
		} catch (e) {
			console.error("Live weather fetch failed for", loc.query, e);
		}
	};
	(0, import_react.useEffect)(() => {
		for (const loc of locations) if (!locationData[loc.id]) loadLocationSWR(loc);
	}, [locations, token]);
	(0, import_react.useEffect)(() => {
		if (userLocation?.query) {
			const id = "user-home";
			setLocations((prev) => {
				if (prev.find((l) => l.id === id)) return prev;
				return [{
					id,
					query: userLocation.query
				}, ...prev];
			});
			setActiveId(id);
		} else if (activeFarm?.location?.address) {
			const farmQuery = activeFarm.location.address;
			const id = "farm-main";
			setLocations((prev) => {
				if (prev.find((l) => l.id === id)) return prev;
				return [{
					id,
					query: farmQuery
				}, ...prev];
			});
			setActiveId(id);
		}
	}, [userLocation, activeFarm]);
	(0, import_react.useEffect)(() => {
		clearTimeout(searchTimeout.current);
		if (searchQuery.length < 3) {
			setSearchResults([]);
			return;
		}
		searchTimeout.current = setTimeout(async () => {
			setIsSearching(true);
			try {
				const data = await (await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5`)).json();
				setSearchResults(data);
			} finally {
				setIsSearching(false);
			}
		}, 500);
	}, [searchQuery]);
	const addLocation = async (item) => {
		const addr = item.address || {};
		const name = addr.city || addr.town || addr.village || addr.county || item.display_name.split(",")[0];
		const state = addr.state || "";
		const query = state ? `${name}, ${state}` : name;
		const id = Date.now();
		setLocations((prev) => [...prev, {
			id,
			query
		}]);
		setActiveId(id);
		setSearchQuery("");
		setSearchResults([]);
		setShowSearch(false);
		loadLocationSWR({
			id,
			query
		});
	};
	const removeLocation = (id) => {
		setLocations((prev) => prev.filter((l) => l.id !== id));
		setLocationData((prev) => {
			const c = { ...prev };
			delete c[id];
			return c;
		});
		if (activeId === id) setActiveId(locations[0]?.id);
	};
	const active = locationData[activeId];
	const hour = (/* @__PURE__ */ new Date()).getHours();
	(0, import_react.useEffect)(() => {
		if (!active?.current) return;
		setWeatherSnapshot({
			temp: active.current.temp,
			humidity: active.current.humidity,
			wind: active.current.wind,
			uv: active.current.uv,
			rainChance: active.current.rainChance,
			todayRainMm: active.current.precipitation,
			condition: getSkyStyle(active.current.rainChance, active.current.temp, active.current.wind, (/* @__PURE__ */ new Date()).getHours()).label,
			cityName: active.cityName
		});
	}, [active]);
	(0, import_react.useEffect)(() => {
		if (!active?.current || !activeFarm) return;
		if (!(locations[0]?.id === activeId || active.cityName === activeFarm.location?.address)) return;
		const { rainChance, wind, temp } = active.current;
		let severity = null, title = "", message = "";
		if (rainChance >= 80) {
			severity = "warning";
			title = "Heavy rain expected";
			message = `${rainChance}% chance of rain today near ${active.cityName}. Consider delaying spraying/irrigation and check drainage.`;
		} else if (wind >= 35) {
			severity = "warning";
			title = "High wind advisory";
			message = `Winds around ${wind} km/h expected near ${active.cityName}. Avoid spraying and secure loose structures/equipment.`;
		} else if (temp >= 42) {
			severity = "critical";
			title = "Extreme heat warning";
			message = `Temperature near ${temp}°C expected at ${active.cityName}. Increase irrigation frequency and protect young/sensitive crops.`;
		}
		if (!severity) return;
		if (alerts?.some((a) => a.category === "weather" && a.status === "active" && a.title === title && new Date(a.createdAt).toDateString() === (/* @__PURE__ */ new Date()).toDateString())) return;
		postScoped("/alerts", {
			category: "weather",
			severity,
			riskScorePct: severity === "critical" ? 85 : 60,
			title,
			message
		}).then(() => fetchDashboardData?.());
	}, [active, activeFarm]);
	const sky = active ? getSkyStyle(active.current.rainChance, active.current.temp, active.current.wind, hour) : getSkyStyle(20, 28, 10, hour);
	const activeMeta = locationMeta[activeId];
	const windDirLabel = (deg) => {
		return [
			"N",
			"NE",
			"E",
			"SE",
			"S",
			"SW",
			"W",
			"NW"
		][Math.round(deg / 45) % 8];
	};
	const uvLabel = (uv) => {
		if (uv <= 2) return "Low";
		if (uv <= 5) return "Moderate";
		if (uv <= 7) return "High";
		if (uv <= 10) return "Very High";
		return "Extreme";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Weather & Advisory",
			subtitle: active ? `${active.cityName} · ${sky.label}` : "Loading conditions...",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [activeMeta && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${activeMeta.source === "live" ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full ${activeMeta.source === "live" ? "bg-primary" : "bg-muted-foreground/50"}` }), activeMeta.source === "live" ? "Live" : `${activeMeta.ageMinutes ?? "?"} min ago`]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => navigate({ to: "/ai-saathi?prompt=%40weather" }),
					className: "flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-[0_0_24px_-8px_var(--color-primary)] transition-transform hover:scale-[1.03]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), " Ask AI Mitra"]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "glass relative mb-5 rounded-2xl p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex items-center gap-2 rounded-xl bg-secondary/50 px-3 py-2 ring-1 ring-border focus-within:ring-primary/40",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "Search city to add...",
						value: searchQuery,
						onChange: (e) => {
							setSearchQuery(e.target.value);
							setShowSearch(true);
						},
						onFocus: () => setShowSearch(true),
						className: "w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
					}),
					showSearch && searchResults.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "glass absolute left-0 right-0 top-full z-50 mt-1 max-h-64 overflow-y-auto rounded-xl shadow-2xl",
						children: searchResults.map((item) => {
							const addr = item.address || {};
							const name = addr.city || addr.town || addr.village || addr.county || item.display_name.split(",")[0];
							const state = addr.state || addr.country || "";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => addLocation(item),
								className: "flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm hover:bg-secondary/60 first:rounded-t-xl last:rounded-b-xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5 shrink-0 text-muted-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium",
										children: name
									}), state && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] text-muted-foreground",
										children: state
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "ml-auto h-3.5 w-3.5 text-muted-foreground" })
								]
							}, item.place_id);
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex gap-2.5 overflow-x-auto pb-1",
				children: locations.map((loc) => {
					const d = locationData[loc.id];
					const rainChance = d?.current?.rainChance ?? 0;
					const condition = d ? getSkyStyle(rainChance, d.current.temp, d.current.wind, hour).label : "Loading...";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocationCard, {
						name: d?.cityName || loc.query.split(",")[0],
						temp: d?.current?.temp ?? "—",
						condition,
						rain: rainChance,
						active: activeId === loc.id,
						onClick: () => setActiveId(loc.id),
						onRemove: locations.length > 1 ? () => removeLocation(loc.id) : null
					}, loc.id);
				})
			})]
		}),
		!active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "glass h-44 animate-pulse rounded-2xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "glass h-24 animate-pulse rounded-2xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "glass h-28 animate-pulse rounded-2xl" })
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 gap-5 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-5 lg:col-span-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-2xl p-6 shadow-lg ring-1 ring-border transition-all duration-1000",
						style: { background: sky.bg },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pointer-events-none absolute inset-0 overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -right-16 -top-10 h-56 w-[420px] rounded-full opacity-25 blur-3xl",
									style: { background: "rgba(255,255,255,0.5)" }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute bottom-0 left-0 right-0 h-32 opacity-10 blur-3xl",
									style: { background: "rgba(0,0,0,0.6)" }
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-white",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 text-lg font-semibold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5" }), active.cityName]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1.5 text-sm text-white/80",
										children: [
											sky.label,
											" • Feels like ",
											active.current.feelsLike,
											"°"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right text-white",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-display text-6xl font-bold leading-none",
										children: [active.current.temp, "°"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 text-sm text-white/80",
										children: [
											"H:",
											active.daily[0]?.hi,
											"° • L:",
											active.daily[0]?.lo,
											"°"
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative mt-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex max-w-sm items-center gap-4 rounded-xl border border-white/10 bg-black/20 p-3.5 text-white backdrop-blur-md",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeatherIcon, {
										rainChance: active.current.rainChance,
										size: 8,
										className: "text-white"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold",
										children: sky.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-0.5 text-xs text-white/80",
										children: active.current.rainChance > 30 ? "Expect showers or rain soon." : "Clear conditions expected."
									})] })]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-5 sm:grid-cols-2",
						children: buildAdvisory(active.current, activeFarm?.waterLevel).slice(0, 2).map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `rounded-2xl border p-4 ${item.tone === "warning" ? "border-warning/20 bg-warning/10 text-warning" : item.tone === "good" ? "border-primary/30 bg-primary/10 text-primary" : "border-border bg-secondary/30 text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-center gap-2 text-sm font-bold",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "h-4 w-4" }), item.title]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `text-xs leading-relaxed ${item.tone === "warning" ? "text-warning/80" : item.tone === "good" ? "text-primary/80" : "text-muted-foreground"}`,
								children: item.detail
							})]
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-2xl p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }), " TODAY'S FARM ADVISORY & HOURLY"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-5 overflow-x-auto pb-2",
							children: active.hourly.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-[50px] shrink-0 flex-col items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-medium text-muted-foreground",
										children: h.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeatherIcon, {
										rainChance: h.rain,
										size: 5,
										className: h.rain > 50 ? "text-cyan" : "text-warning"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm font-bold",
										children: [h.temp, "°"]
									})
								]
							}, i))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-5 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-2 flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-3 w-3" }), " UV Index"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display text-3xl font-bold",
										children: active.current.uv
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-sm font-medium text-foreground/80",
										children: uvLabel(active.current.uv)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 h-1.5 overflow-hidden rounded-full",
										style: { background: "linear-gradient(to right, #22c55e, #eab308, #ef4444, #7c3aed)" },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full w-2 rounded-full bg-white shadow",
											style: { marginLeft: `${Math.min(active.current.uv / 11 * 100, 95)}%` }
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 text-[11px] text-muted-foreground",
										children: active.current.uv <= 2 ? "No protection needed" : `Use sun protection ${active.current.sunrise}–${active.current.sunset}`
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-2 flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-3 w-3" }), " Sunset"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-2xl font-bold",
										children: active.current.sunset
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 text-sm text-muted-foreground",
										children: ["Sunrise: ", active.current.sunrise]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative mt-4 h-12 overflow-hidden",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-0 right-0 h-px bg-border" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
											viewBox: "0 0 100 40",
											className: "absolute bottom-0 w-full",
											fill: "none",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d: "M5 38 Q25 8, 50 8 Q75 8, 95 38",
												stroke: "var(--color-cyan)",
												strokeOpacity: "0.4",
												strokeWidth: "1.5"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												cx: "50",
												cy: "8",
												r: "3",
												fill: "var(--color-warning, #f59e0b)"
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-2 flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wind, { className: "h-3 w-3" }), " Wind"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-end gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-display text-3xl font-bold",
											children: active.current.wind
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mb-1 text-sm text-muted-foreground",
											children: "km/h"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "relative h-16 w-16",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "absolute inset-0 flex items-center justify-center rounded-full border border-border",
												children: [[
													"N",
													"E",
													"S",
													"W"
												].map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "absolute text-[9px] text-muted-foreground",
													style: {
														top: i === 0 ? "2px" : i === 2 ? "auto" : "50%",
														bottom: i === 2 ? "2px" : "auto",
														left: i === 3 ? "2px" : i === 1 ? "auto" : "50%",
														right: i === 1 ? "2px" : "auto",
														transform: i === 0 || i === 2 ? "translateX(-50%)" : "translateY(-50%)"
													},
													children: d
												}, d)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, {
													className: "h-5 w-5 text-cyan",
													style: { transform: `rotate(${active.current.windDir}deg)` }
												})]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-sm font-medium",
												children: windDirLabel(active.current.windDir)
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[11px] text-muted-foreground",
												children: "Direction"
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-2 flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudRain, { className: "h-3 w-3" }), " Precipitation"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-end gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-display text-3xl font-bold",
											children: active.current.precipitation
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mb-1 text-sm text-muted-foreground",
											children: "mm"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-sm text-muted-foreground",
										children: "Today"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 text-[11px] text-muted-foreground",
										children: [active.current.rainChance, "% chance of rain"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-2 flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Thermometer, { className: "h-3 w-3" }), " Feels Like"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-display text-3xl font-bold",
										children: [active.current.feelsLike, "°"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 text-sm text-muted-foreground",
										children: Math.abs(active.current.feelsLike - active.current.temp) < 2 ? "Similar to the actual temperature." : active.current.feelsLike < active.current.temp ? `Feels cooler due to wind (${active.current.wind} km/h).` : `Feels warmer due to humidity (${active.current.humidity}%).`
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-2 flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { className: "h-3 w-3" }), " Humidity"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-display text-3xl font-bold",
										children: [active.current.humidity, "%"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 h-1.5 overflow-hidden rounded-full bg-secondary/60",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full bg-cyan",
											style: { width: `${active.current.humidity}%` }
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 text-[11px] text-muted-foreground",
										children: active.current.humidity > 80 ? "High — fungal risk for crops." : active.current.humidity > 60 ? "The dew point is comfortable." : "Low — consider irrigation."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-2 flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3 w-3" }), " Visibility"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-end gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-display text-3xl font-bold",
											children: active.current.visibility
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mb-1 text-sm text-muted-foreground",
											children: "km"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 text-sm text-muted-foreground",
										children: active.current.visibility >= 10 ? "Perfectly clear view." : "Reduced visibility."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass rounded-2xl p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-2 flex items-center gap-1 text-[10px] uppercase tracking-widest text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "h-3 w-3" }), " Pressure"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-end gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-display text-3xl font-bold",
											children: active.current.pressure
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mb-1 text-sm text-muted-foreground",
											children: "hPa"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex justify-between text-[11px] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Low" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "High" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-1.5 overflow-hidden rounded-full bg-secondary/60",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full bg-primary",
											style: { width: `${Math.min((active.current.pressure - 980) / 50 * 100, 100)}%` }
										})
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 text-center text-xs text-muted-foreground",
						children: [
							"Weather for ",
							active.cityName,
							" · Open-Meteo ·",
							" ",
							activeMeta?.source === "live" ? "Live ✓" : activeMeta?.ageMinutes != null ? `Cached ${activeMeta.ageMinutes} min ago` : "Open-Meteo"
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-5 lg:col-span-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass flex h-full flex-col rounded-2xl p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5" }), " 10-DAY FORECAST"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-1 flex-col justify-between space-y-4",
						children: active.daily.map((d, i) => {
							const allHi = active.daily.map((x) => x.hi);
							const allLo = active.daily.map((x) => x.lo);
							const minAll = Math.min(...allLo);
							const range = Math.max(...allHi) - minAll || 1;
							const barStart = (d.lo - minAll) / range * 100;
							const barWidth = (d.hi - d.lo) / range * 100;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-10 text-sm font-medium",
										children: d.day
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WeatherIcon, {
										rainChance: d.rain,
										size: 4,
										className: d.rain > 50 ? "text-cyan" : "text-warning"
									}),
									d.rain > 20 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "w-8 text-[11px] text-cyan",
										children: [d.rain, "%"]
									}),
									d.rain <= 20 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-8" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "w-8 text-right text-sm text-muted-foreground",
										children: [d.lo, "°"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative h-1.5 flex-1 overflow-hidden rounded-full bg-secondary/60",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full bg-gradient-to-r from-warning to-destructive",
											style: {
												marginLeft: `${barStart}%`,
												width: `${barWidth}%`
											}
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "w-8 text-sm font-semibold",
										children: [d.hi, "°"]
									})
								]
							}, i);
						})
					})]
				})
			})]
		})
	] });
}
//#endregion
export { WeatherPage as component };
