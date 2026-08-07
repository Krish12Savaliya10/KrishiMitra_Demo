globalThis.__nitro_main__ = import.meta.url;
import { n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"17-ZZkCVrbr4BSdjt/K43J0tq8+Qq4\"",
		"mtime": "2026-08-07T17:46:34.180Z",
		"size": 23,
		"path": "../public/robots.txt"
	},
	"/assets/BarChart-sKHnwQbi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15e-LRYmV7QLxDqGLTWQ9T7gGg9Vmys\"",
		"mtime": "2026-08-07T17:46:33.615Z",
		"size": 350,
		"path": "../public/assets/BarChart-sKHnwQbi.js"
	},
	"/assets/AppShell-Dy5-Ll2B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f97-6fFYKtkDdWw3LcR6nArGVRimHlY\"",
		"mtime": "2026-08-07T17:46:33.615Z",
		"size": 12183,
		"path": "../public/assets/AppShell-Dy5-Ll2B.js"
	},
	"/assets/LineChart-C9HdlIRi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44c8-hBpgJG0hvbIUnWNBCGAN9g26AFQ\"",
		"mtime": "2026-08-07T17:46:33.615Z",
		"size": 17608,
		"path": "../public/assets/LineChart-C9HdlIRi.js"
	},
	"/assets/Match-D2hBYR-L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1133-lbr7+C6doQ1FDC8OR2S9I7iz+Uc\"",
		"mtime": "2026-08-07T17:46:33.615Z",
		"size": 4403,
		"path": "../public/assets/Match-D2hBYR-L.js"
	},
	"/assets/YAxis-UCKEgQ9q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4583-X17n7x2SV3ex0ZKV8ndKk47/LsI\"",
		"mtime": "2026-08-07T17:46:33.616Z",
		"size": 17795,
		"path": "../public/assets/YAxis-UCKEgQ9q.js"
	},
	"/assets/_app.ai-saathi-ibM9ZPSJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8ebc-/FfwNnUbxqwgMzJDehXADgSyv6I\"",
		"mtime": "2026-08-07T17:46:33.616Z",
		"size": 36540,
		"path": "../public/assets/_app.ai-saathi-ibM9ZPSJ.js"
	},
	"/assets/_app.alerts-C6T6kZXC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18da-XiROYvcrrxhuCPjSFuNoEyJNaws\"",
		"mtime": "2026-08-07T17:46:33.616Z",
		"size": 6362,
		"path": "../public/assets/_app.alerts-C6T6kZXC.js"
	},
	"/assets/_app.crop-plan-B1h1MR1v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b0d-OrnpuRV4fEBBq3NerMXqOqzla1Q\"",
		"mtime": "2026-08-07T17:46:33.616Z",
		"size": 6925,
		"path": "../public/assets/_app.crop-plan-B1h1MR1v.js"
	},
	"/assets/PieChart-DivGgk4P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64c6-MTcm1P77LHgMHVx86QyyZWbZyCA\"",
		"mtime": "2026-08-07T17:46:33.615Z",
		"size": 25798,
		"path": "../public/assets/PieChart-DivGgk4P.js"
	},
	"/assets/_app.crop-plan-Dg4RJ_Lg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"91e3-UTzd9THWINuuo8AFY6S05Xu+j20\"",
		"mtime": "2026-08-07T17:46:33.616Z",
		"size": 37347,
		"path": "../public/assets/_app.crop-plan-Dg4RJ_Lg.js"
	},
	"/assets/_app-DlI_nkwb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"da-XDclDmzkOIH26CUY7OI6FqAHamo\"",
		"mtime": "2026-08-07T17:46:33.616Z",
		"size": 218,
		"path": "../public/assets/_app-DlI_nkwb.js"
	},
	"/assets/_app.dashboard-BmCDYPIC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"31f7-7jrLGsecbdx7pkRrHyiRSDnQqk0\"",
		"mtime": "2026-08-07T17:46:33.616Z",
		"size": 12791,
		"path": "../public/assets/_app.dashboard-BmCDYPIC.js"
	},
	"/assets/_app.farms-DyRtgSwN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16574-Nmt3R7bbcBdZj9vBYOIKsGUSgDQ\"",
		"mtime": "2026-08-07T17:46:33.616Z",
		"size": 91508,
		"path": "../public/assets/_app.farms-DyRtgSwN.js"
	},
	"/assets/_app.expenses-BGvzOVu8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2017-AY5V1QS/WfDPb9yTARUpGdreJH8\"",
		"mtime": "2026-08-07T17:46:33.616Z",
		"size": 8215,
		"path": "../public/assets/_app.expenses-BGvzOVu8.js"
	},
	"/assets/_app.market-BER4PpGx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"474c-T3UBUFcomjkCdaO/REnC6x7HDzY\"",
		"mtime": "2026-08-07T17:46:33.616Z",
		"size": 18252,
		"path": "../public/assets/_app.market-BER4PpGx.js"
	},
	"/assets/_app.weather-BUMETKG-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"603d-qdIcbv4REdXLxYkeNY+jek4S6tE\"",
		"mtime": "2026-08-07T17:46:33.617Z",
		"size": 24637,
		"path": "../public/assets/_app.weather-BUMETKG-.js"
	},
	"/assets/aiSyncEvents-BvjxmtA_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-1gsBbKUmHbUCkXuYxdtGeGQNyiE\"",
		"mtime": "2026-08-07T17:46:33.617Z",
		"size": 290,
		"path": "../public/assets/aiSyncEvents-BvjxmtA_.js"
	},
	"/assets/arrow-right-Bw0KhewU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d-Rs0hT33uwxLXDIGI6H8FVkReKFw\"",
		"mtime": "2026-08-07T17:46:33.617Z",
		"size": 157,
		"path": "../public/assets/arrow-right-Bw0KhewU.js"
	},
	"/assets/calendar-CSMOzRtf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f9-3BKTtzh2CLgQ2mQ6Tn7p6/Si0ms\"",
		"mtime": "2026-08-07T17:46:33.617Z",
		"size": 249,
		"path": "../public/assets/calendar-CSMOzRtf.js"
	},
	"/assets/_app.profile-BuJfAyal.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2997-GbDfWswBwxjuT7uWUqfCvQRY3gs\"",
		"mtime": "2026-08-07T17:46:33.616Z",
		"size": 10647,
		"path": "../public/assets/_app.profile-BuJfAyal.js"
	},
	"/assets/auth-4GMu4peK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c5b-ALkBTqwLHS7yaVBUVUCjch+3DiQ\"",
		"mtime": "2026-08-07T17:46:33.617Z",
		"size": 27739,
		"path": "../public/assets/auth-4GMu4peK.js"
	},
	"/assets/chevron-down-CAkK9uO5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"78-CSfsDPdRYkkq5yAGJYF4YvyUk3U\"",
		"mtime": "2026-08-07T17:46:33.617Z",
		"size": 120,
		"path": "../public/assets/chevron-down-CAkK9uO5.js"
	},
	"/assets/check-0_4ihJZK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"74-5rFYh4S1V1ZozRCcG+ILMb4w6Qw\"",
		"mtime": "2026-08-07T17:46:33.617Z",
		"size": 116,
		"path": "../public/assets/check-0_4ihJZK.js"
	},
	"/auth-farm.png": {
		"type": "image/png",
		"etag": "\"f02d0-3aGHoP/zS5sZII8daAN/ZP8JuAM\"",
		"mtime": "2026-08-07T17:46:34.188Z",
		"size": 983760,
		"path": "../public/auth-farm.png"
	},
	"/assets/circle-alert-BVsVnJAu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f2-jX2eIa2H2rkIz8qoym6Oq3Ag5rk\"",
		"mtime": "2026-08-07T17:46:33.617Z",
		"size": 242,
		"path": "../public/assets/circle-alert-BVsVnJAu.js"
	},
	"/assets/circle-check-OR0V8FJk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa-vf3cJtNKiTslsT7RzEYKnPMocQo\"",
		"mtime": "2026-08-07T17:46:33.617Z",
		"size": 170,
		"path": "../public/assets/circle-check-OR0V8FJk.js"
	},
	"/assets/cloud-rain-PR7h5fgS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"110-ft13K9/BZhzn0R7bhRPLD5OISTA\"",
		"mtime": "2026-08-07T17:46:33.617Z",
		"size": 272,
		"path": "../public/assets/cloud-rain-PR7h5fgS.js"
	},
	"/assets/clsx-CjueKrWZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"170-hIN6XMVOMUzluNGmYPaM/SbauwQ\"",
		"mtime": "2026-08-07T17:46:33.617Z",
		"size": 368,
		"path": "../public/assets/clsx-CjueKrWZ.js"
	},
	"/assets/droplets-DLIFn3FC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16d-jdpCD1e5s+V+GQC7g417xNNuzUo\"",
		"mtime": "2026-08-07T17:46:33.618Z",
		"size": 365,
		"path": "../public/assets/droplets-DLIFn3FC.js"
	},
	"/assets/eye-CyM7Hwih.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-Eon7FGkacRLMUyy3F7sFeB2XGQk\"",
		"mtime": "2026-08-07T17:46:33.618Z",
		"size": 248,
		"path": "../public/assets/eye-CyM7Hwih.js"
	},
	"/assets/dist-PGK0fDxy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f14-UyME5TPZFaGRI8LvkSnSj/C4OHo\"",
		"mtime": "2026-08-07T17:46:33.617Z",
		"size": 32532,
		"path": "../public/assets/dist-PGK0fDxy.js"
	},
	"/assets/map-pin-DsRHkbz9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-220Q1UfX6peKdlXO7md7Xs2Pwzo\"",
		"mtime": "2026-08-07T17:46:33.618Z",
		"size": 251,
		"path": "../public/assets/map-pin-DsRHkbz9.js"
	},
	"/assets/plus-rhvb7IJi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"91-gXP1M3jOKlkabh+PExTASLv+zgY\"",
		"mtime": "2026-08-07T17:46:33.618Z",
		"size": 145,
		"path": "../public/assets/plus-rhvb7IJi.js"
	},
	"/assets/root-DLTE-HSj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20-vSYConOtSP6ciwr9zKsPixNwWmc\"",
		"mtime": "2026-08-07T17:46:33.618Z",
		"size": 32,
		"path": "../public/assets/root-DLTE-HSj.js"
	},
	"/assets/routes-C3ztp_WI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5fb8-TIyMQCkQ0S47sSOSw2FJmpITByA\"",
		"mtime": "2026-08-07T17:46:33.618Z",
		"size": 24504,
		"path": "../public/assets/routes-C3ztp_WI.js"
	},
	"/assets/index-A9V3P5nC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d352-UYuTCGkgLBUuqhWSCBn+o9u27IM\"",
		"mtime": "2026-08-07T17:46:33.615Z",
		"size": 316242,
		"path": "../public/assets/index-A9V3P5nC.js"
	},
	"/assets/generateCategoricalChart-3RQXQC6A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"546dd-AdOh7imnYs/Wnmw9dAWtsS0NhoA\"",
		"mtime": "2026-08-07T17:46:33.618Z",
		"size": 345821,
		"path": "../public/assets/generateCategoricalChart-3RQXQC6A.js"
	},
	"/assets/search-DNPr6jcD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a6-wzh1S8HfC1Vlc5MOh4kwMO0FbwA\"",
		"mtime": "2026-08-07T17:46:33.618Z",
		"size": 166,
		"path": "../public/assets/search-DNPr6jcD.js"
	},
	"/assets/shield-check-DlNl1Rno.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d1-n4gEJiGCYm2Jx0Q9xe6aZji33t8\"",
		"mtime": "2026-08-07T17:46:33.618Z",
		"size": 465,
		"path": "../public/assets/shield-check-DlNl1Rno.js"
	},
	"/assets/sparkles-CeQFPNoO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4279-TnCkyh6hkqjdexpE3hnTUfE2EaY\"",
		"mtime": "2026-08-07T17:46:33.618Z",
		"size": 17017,
		"path": "../public/assets/sparkles-CeQFPNoO.js"
	},
	"/assets/sprout-CuG3Q-3R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12d-pVrfM81CaWE06fXvDsUyNnZ+Qn4\"",
		"mtime": "2026-08-07T17:46:33.618Z",
		"size": 301,
		"path": "../public/assets/sprout-CuG3Q-3R.js"
	},
	"/assets/styles-BtO5pUdL.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"213b1-qz4RAMF2D0TkMdwWJ89gouWBZGU\"",
		"mtime": "2026-08-07T17:46:33.619Z",
		"size": 136113,
		"path": "../public/assets/styles-BtO5pUdL.css"
	},
	"/assets/sun-DLafnc6A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5bfc-TNc6+DM3QipbhZVXZeOHqk4sSTA\"",
		"mtime": "2026-08-07T17:46:33.618Z",
		"size": 23548,
		"path": "../public/assets/sun-DLafnc6A.js"
	},
	"/assets/timer-BWTQgske.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-WrAC9bQuElIprkg2TwaXzDavkJc\"",
		"mtime": "2026-08-07T17:46:33.618Z",
		"size": 230,
		"path": "../public/assets/timer-BWTQgske.js"
	},
	"/assets/triangle-alert-7iWi41LC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-HpHLie4xeUwc+QyLtLn32Dm43g8\"",
		"mtime": "2026-08-07T17:46:33.618Z",
		"size": 257,
		"path": "../public/assets/triangle-alert-7iWi41LC.js"
	},
	"/assets/wind-D9S5WZVz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ee-hfN2HvKLQj58Ryp1sm9uMr6WdAQ\"",
		"mtime": "2026-08-07T17:46:33.619Z",
		"size": 238,
		"path": "../public/assets/wind-D9S5WZVz.js"
	},
	"/assets/useNavigate-jI4F47DZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc-8uZbtrEw+u3HGxSQJbBZDgPgEf0\"",
		"mtime": "2026-08-07T17:46:33.618Z",
		"size": 188,
		"path": "../public/assets/useNavigate-jI4F47DZ.js"
	},
	"/assets/x-DWmW8oId.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"166-R1IFTytA+rxQTD0An56yp+ol0S8\"",
		"mtime": "2026-08-07T17:46:33.619Z",
		"size": 358,
		"path": "../public/assets/x-DWmW8oId.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_LaFG8i = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_LaFG8i
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
