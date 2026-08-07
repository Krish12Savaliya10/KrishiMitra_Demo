import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppDataContext-vZWx5SEf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
		if (res.status === 401) return [];
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
		if (res.status === 401) return { error: "Unauthorized" };
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
		if (res.status === 401) return { error: "Unauthorized" };
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
//#endregion
export { useAppData as n, AppDataProvider as t };
