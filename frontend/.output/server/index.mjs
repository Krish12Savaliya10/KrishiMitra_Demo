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
		"mtime": "2026-08-06T21:47:05.407Z",
		"size": 23,
		"path": "../public/robots.txt"
	},
	"/assets/AppDataContext-TGNyweVZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c72-QQS6/2e+I77jVYsrOuqCWDjZUiE\"",
		"mtime": "2026-08-06T21:47:04.708Z",
		"size": 15474,
		"path": "../public/assets/AppDataContext-TGNyweVZ.js"
	},
	"/assets/AppShell-DQEx3S2H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6335-MGZIFoti4rwcSHH1nBJFvm00/Rc\"",
		"mtime": "2026-08-06T21:47:04.708Z",
		"size": 25397,
		"path": "../public/assets/AppShell-DQEx3S2H.js"
	},
	"/assets/BarChart-hTe-G-r1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15e-JhPk36RoSJwR1xWmGiruL4Yj7oI\"",
		"mtime": "2026-08-06T21:47:04.708Z",
		"size": 350,
		"path": "../public/assets/BarChart-hTe-G-r1.js"
	},
	"/assets/LineChart-Bu7T5_wB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44ce-2yzjKksHsNnv0sF0hDR4MHXw+bI\"",
		"mtime": "2026-08-06T21:47:04.708Z",
		"size": 17614,
		"path": "../public/assets/LineChart-Bu7T5_wB.js"
	},
	"/assets/PieChart-DrYEGg9q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64cc-mSYf9Dgc1FhEyUi2h92owNW0EnE\"",
		"mtime": "2026-08-06T21:47:04.708Z",
		"size": 25804,
		"path": "../public/assets/PieChart-DrYEGg9q.js"
	},
	"/assets/FarmSwitcher-BWRwYcOr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a12-qJsTs9Yeg5LML/k3keikzDkm88s\"",
		"mtime": "2026-08-06T21:47:04.708Z",
		"size": 2578,
		"path": "../public/assets/FarmSwitcher-BWRwYcOr.js"
	},
	"/assets/_app-ZYQc_IZV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"db-CYqn6FwdBO+swv/k9tKMBBgMK8M\"",
		"mtime": "2026-08-06T21:47:04.708Z",
		"size": 219,
		"path": "../public/assets/_app-ZYQc_IZV.js"
	},
	"/assets/YAxis-B0JkcH3g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4589-hTJUMMCFmuR0I+IC0/nrj9vveNI\"",
		"mtime": "2026-08-06T21:47:04.708Z",
		"size": 17801,
		"path": "../public/assets/YAxis-B0JkcH3g.js"
	},
	"/assets/_app.ai-saathi-qGa0mCa8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9520-071Ztw4v4Uudl6hWIiYfydDGaGM\"",
		"mtime": "2026-08-06T21:47:04.708Z",
		"size": 38176,
		"path": "../public/assets/_app.ai-saathi-qGa0mCa8.js"
	},
	"/assets/_app.alerts-bb1G1FO8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"179d-NkrkzTLpaqtdNCXBmhS8UaDHbfI\"",
		"mtime": "2026-08-06T21:47:04.709Z",
		"size": 6045,
		"path": "../public/assets/_app.alerts-bb1G1FO8.js"
	},
	"/assets/_app.dashboard-Ckc0zAKR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"33df-MgK39FiD06OjbfxcgUibr7TJqa4\"",
		"mtime": "2026-08-06T21:47:04.709Z",
		"size": 13279,
		"path": "../public/assets/_app.dashboard-Ckc0zAKR.js"
	},
	"/assets/_app.crop-plan-BNJsie10.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae5f-HmkIjZw6OS+LrlF82q+UYXBwi40\"",
		"mtime": "2026-08-06T21:47:04.709Z",
		"size": 44639,
		"path": "../public/assets/_app.crop-plan-BNJsie10.js"
	},
	"/assets/_app.expenses-r879a3kx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"201e-huGIUDQ+Ee2UltsBfBh4M2MH6M4\"",
		"mtime": "2026-08-06T21:47:04.709Z",
		"size": 8222,
		"path": "../public/assets/_app.expenses-r879a3kx.js"
	},
	"/assets/_app.farms-Bw7ySMSU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3d0f-sZcyY2aTjV4xUZCHq3K7yXx8B4Q\"",
		"mtime": "2026-08-06T21:47:04.710Z",
		"size": 15631,
		"path": "../public/assets/_app.farms-Bw7ySMSU.js"
	},
	"/assets/_app.market-zkrxe_Bs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4770-uieA1I4TgabqHCHf2YBRAmmehLY\"",
		"mtime": "2026-08-06T21:47:04.711Z",
		"size": 18288,
		"path": "../public/assets/_app.market-zkrxe_Bs.js"
	},
	"/assets/_app.notifications-DBQBwySZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1409-jFHsVCvPEK3OtQtSZkCsl5pUg7o\"",
		"mtime": "2026-08-06T21:47:04.711Z",
		"size": 5129,
		"path": "../public/assets/_app.notifications-DBQBwySZ.js"
	},
	"/assets/_app.profile-B0PDfXJi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20d7-Qe19RutWl4eme00g+iOArnxHz6o\"",
		"mtime": "2026-08-06T21:47:04.711Z",
		"size": 8407,
		"path": "../public/assets/_app.profile-B0PDfXJi.js"
	},
	"/assets/_app.recommendations-DPZApmZ_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3adb-Gg4az5pmgwWL61Q6Oh6DTqi6F08\"",
		"mtime": "2026-08-06T21:47:04.711Z",
		"size": 15067,
		"path": "../public/assets/_app.recommendations-DPZApmZ_.js"
	},
	"/assets/_app.settings-BBeetWGX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bcc-2UA3I7sRxO7/AXqIHkJXa0V2/CI\"",
		"mtime": "2026-08-06T21:47:04.712Z",
		"size": 3020,
		"path": "../public/assets/_app.settings-BBeetWGX.js"
	},
	"/assets/_app.weather-BaDDoQnu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5f5e-xdoAMSGesEUJDI5rYnaw8syi9/4\"",
		"mtime": "2026-08-06T21:47:04.712Z",
		"size": 24414,
		"path": "../public/assets/_app.weather-BaDDoQnu.js"
	},
	"/assets/_app.schedule-BPZD_2tx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"364f-KlLr/JG0g7llBQksqkBxH+cHFPU\"",
		"mtime": "2026-08-06T21:47:04.712Z",
		"size": 13903,
		"path": "../public/assets/_app.schedule-BPZD_2tx.js"
	},
	"/assets/aiSyncEvents-BvjxmtA_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-1gsBbKUmHbUCkXuYxdtGeGQNyiE\"",
		"mtime": "2026-08-06T21:47:04.712Z",
		"size": 290,
		"path": "../public/assets/aiSyncEvents-BvjxmtA_.js"
	},
	"/assets/arrow-right-CVrzMj5m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d-BEiHmRF2qTi/tPFflSUqytUAJhQ\"",
		"mtime": "2026-08-06T21:47:04.712Z",
		"size": 157,
		"path": "../public/assets/arrow-right-CVrzMj5m.js"
	},
	"/auth-farm.png": {
		"type": "image/png",
		"etag": "\"f02d0-3aGHoP/zS5sZII8daAN/ZP8JuAM\"",
		"mtime": "2026-08-06T21:47:05.422Z",
		"size": 983760,
		"path": "../public/auth-farm.png"
	},
	"/assets/auth-BacXEadC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"58fb-d+cDVNvS44n3+8C6kAa68vW04RQ\"",
		"mtime": "2026-08-06T21:47:04.712Z",
		"size": 22779,
		"path": "../public/assets/auth-BacXEadC.js"
	},
	"/assets/check-check-DEjT-78_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ab-ZRVIUFWTT2sd6nYYYav4r0ODWV8\"",
		"mtime": "2026-08-06T21:47:04.713Z",
		"size": 171,
		"path": "../public/assets/check-check-DEjT-78_.js"
	},
	"/assets/circle-alert-D01fs9Ky.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f2-QMDqYOOuowaqDgN3QmPn4RRfYwU\"",
		"mtime": "2026-08-06T21:47:04.713Z",
		"size": 242,
		"path": "../public/assets/circle-alert-D01fs9Ky.js"
	},
	"/assets/chevron-down-Cmq6zeF7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"78-npPUsJ9Uej3LW+7JqdYj2Mf0Bkc\"",
		"mtime": "2026-08-06T21:47:04.713Z",
		"size": 120,
		"path": "../public/assets/chevron-down-Cmq6zeF7.js"
	},
	"/assets/circle-check-B0_Jd6H3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"aa-y+UAAnz+rp2u1RqH4ceRgiIGkB4\"",
		"mtime": "2026-08-06T21:47:04.713Z",
		"size": 170,
		"path": "../public/assets/circle-check-B0_Jd6H3.js"
	},
	"/assets/calendar-clock-B6YtfWEZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"172-99G8+wInGKiPMuIubctmoYDHsvc\"",
		"mtime": "2026-08-06T21:47:04.713Z",
		"size": 370,
		"path": "../public/assets/calendar-clock-B6YtfWEZ.js"
	},
	"/assets/clock-BpEI8sCh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a1-O78jh6pdjhQfmOgArkfQvz3yswI\"",
		"mtime": "2026-08-06T21:47:04.713Z",
		"size": 161,
		"path": "../public/assets/clock-BpEI8sCh.js"
	},
	"/assets/cloud-rain-CNFAd1Ds.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"110-PHfvRBtfs1mgoaSrE3gg3ZPHWHs\"",
		"mtime": "2026-08-06T21:47:04.713Z",
		"size": 272,
		"path": "../public/assets/cloud-rain-CNFAd1Ds.js"
	},
	"/assets/clsx-CjueKrWZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"170-hIN6XMVOMUzluNGmYPaM/SbauwQ\"",
		"mtime": "2026-08-06T21:47:04.713Z",
		"size": 368,
		"path": "../public/assets/clsx-CjueKrWZ.js"
	},
	"/assets/droplets-BcIugnX4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16d-i52W/+V85Xaj5ybTq/EJoU+Xzmg\"",
		"mtime": "2026-08-06T21:47:04.714Z",
		"size": 365,
		"path": "../public/assets/droplets-BcIugnX4.js"
	},
	"/assets/eye-CKOwq4v3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f8-cdSRvLmxvOTHMeAkb8y29gJxsQY\"",
		"mtime": "2026-08-06T21:47:04.714Z",
		"size": 248,
		"path": "../public/assets/eye-CKOwq4v3.js"
	},
	"/assets/dialog-eB5rk8ls.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10290-kKe0kfKI0ioVqaBEhUyuRYR0xlU\"",
		"mtime": "2026-08-06T21:47:04.714Z",
		"size": 66192,
		"path": "../public/assets/dialog-eB5rk8ls.js"
	},
	"/assets/flask-conical-C2V7UmDc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"126-FuNP70VJ7vpl4QAFVWgm0E6GyXw\"",
		"mtime": "2026-08-06T21:47:04.714Z",
		"size": 294,
		"path": "../public/assets/flask-conical-C2V7UmDc.js"
	},
	"/assets/generateCategoricalChart-Cb4nwsq0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"546e3-Ou85Eyu37/dLknsNnbi3sItvN3w\"",
		"mtime": "2026-08-06T21:47:04.715Z",
		"size": 345827,
		"path": "../public/assets/generateCategoricalChart-Cb4nwsq0.js"
	},
	"/assets/link-Cx30Vi6q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5906-ufyLnBew6mMt+l2wG1RwsWY3iuU\"",
		"mtime": "2026-08-06T21:47:04.716Z",
		"size": 22790,
		"path": "../public/assets/link-Cx30Vi6q.js"
	},
	"/assets/map-pin-Cb7ggEWP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-JDHe+ez7NcWD1pQ40ofJc4H6XZY\"",
		"mtime": "2026-08-06T21:47:04.716Z",
		"size": 251,
		"path": "../public/assets/map-pin-Cb7ggEWP.js"
	},
	"/assets/phone-CL4k1KHW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13a-jm1HaWpq7rTpOOhCTvT4ZmizBDs\"",
		"mtime": "2026-08-06T21:47:04.716Z",
		"size": 314,
		"path": "../public/assets/phone-CL4k1KHW.js"
	},
	"/assets/plus-Ddc_5x9G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"91-WA9P/brj2Ss1o1N3qRxa2f3Dhl4\"",
		"mtime": "2026-08-06T21:47:04.716Z",
		"size": 145,
		"path": "../public/assets/plus-Ddc_5x9G.js"
	},
	"/assets/rotate-ccw-Bm0F4HEM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c0-BRf9IMbK4hnju4qGQ0UlINR0rv4\"",
		"mtime": "2026-08-06T21:47:04.716Z",
		"size": 192,
		"path": "../public/assets/rotate-ccw-Bm0F4HEM.js"
	},
	"/assets/search-CXmpK_Os.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a6-+A18GEWon/j9HW4jqYpfR3Bfhvg\"",
		"mtime": "2026-08-06T21:47:04.716Z",
		"size": 166,
		"path": "../public/assets/search-CXmpK_Os.js"
	},
	"/assets/shield-check-ymbyRpGM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"138-0vpj6i7HdgSCnRKNxiqG3SpGe+Y\"",
		"mtime": "2026-08-06T21:47:04.716Z",
		"size": 312,
		"path": "../public/assets/shield-check-ymbyRpGM.js"
	},
	"/assets/sparkles-cTE5Zvxz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"662-R0Q/isE6f0wxCCUMCev9T7nUdmQ\"",
		"mtime": "2026-08-06T21:47:04.716Z",
		"size": 1634,
		"path": "../public/assets/sparkles-cTE5Zvxz.js"
	},
	"/assets/routes-BEWkZWBP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"63e3-tn162vU8zlk9pEoxIice831p6v4\"",
		"mtime": "2026-08-06T21:47:04.716Z",
		"size": 25571,
		"path": "../public/assets/routes-BEWkZWBP.js"
	},
	"/assets/index-BE0u-ojg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5590c-lRKxPxgqo4tsam5MV1I5SWx1g0s\"",
		"mtime": "2026-08-06T21:47:04.708Z",
		"size": 350476,
		"path": "../public/assets/index-BE0u-ojg.js"
	},
	"/assets/styles-Bap8EIQC.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"21996-RB3Nb5Itp/xH3qkN+y743uiPpX4\"",
		"mtime": "2026-08-06T21:47:04.717Z",
		"size": 137622,
		"path": "../public/assets/styles-Bap8EIQC.css"
	},
	"/assets/thermometer-Bp2LqlMO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"161-lkUZvHPHxdWvqTpX69uqli53YWU\"",
		"mtime": "2026-08-06T21:47:04.716Z",
		"size": 353,
		"path": "../public/assets/thermometer-Bp2LqlMO.js"
	},
	"/assets/sun-bEQlGWVg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"322-0Vo3m3vxSy3Q5NN7NJRT6eeW9/4\"",
		"mtime": "2026-08-06T21:47:04.716Z",
		"size": 802,
		"path": "../public/assets/sun-bEQlGWVg.js"
	},
	"/assets/wind-iJtTmKfW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ee-MjEJXACalpYdk6j+zo2pSRZIl7s\"",
		"mtime": "2026-08-06T21:47:04.716Z",
		"size": 238,
		"path": "../public/assets/wind-iJtTmKfW.js"
	},
	"/assets/timer-DkbTHCNG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e6-CvvmnLoAUxkJD2ImDsGICSG3AjQ\"",
		"mtime": "2026-08-06T21:47:04.716Z",
		"size": 230,
		"path": "../public/assets/timer-DkbTHCNG.js"
	},
	"/assets/x-CsHz0Del.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4c0-d+6okGkS6d5RPXk/O7FPCD88ank\"",
		"mtime": "2026-08-06T21:47:04.716Z",
		"size": 1216,
		"path": "../public/assets/x-CsHz0Del.js"
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
