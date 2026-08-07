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
		"mtime": "2026-08-07T09:29:16.694Z",
		"size": 23,
		"path": "../public/robots.txt"
	},
	"/assets/AppDataContext-TGNyweVZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3c72-QQS6/2e+I77jVYsrOuqCWDjZUiE\"",
		"mtime": "2026-08-07T09:29:16.072Z",
		"size": 15474,
		"path": "../public/assets/AppDataContext-TGNyweVZ.js"
	},
	"/assets/AppShell-BGe1PKD2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"57cd-irGIHMGZd57rsApYQnB5p2Kwnpw\"",
		"mtime": "2026-08-07T09:29:16.072Z",
		"size": 22477,
		"path": "../public/assets/AppShell-BGe1PKD2.js"
	},
	"/assets/LineChart-Bu7T5_wB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44ce-2yzjKksHsNnv0sF0hDR4MHXw+bI\"",
		"mtime": "2026-08-07T09:29:16.072Z",
		"size": 17614,
		"path": "../public/assets/LineChart-Bu7T5_wB.js"
	},
	"/assets/BarChart-hTe-G-r1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15e-JhPk36RoSJwR1xWmGiruL4Yj7oI\"",
		"mtime": "2026-08-07T09:29:16.072Z",
		"size": 350,
		"path": "../public/assets/BarChart-hTe-G-r1.js"
	},
	"/assets/_app-wMoY-P4K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"db-/I2KOfWJkWFXK6KJXm5e53F95YM\"",
		"mtime": "2026-08-07T09:29:16.078Z",
		"size": 219,
		"path": "../public/assets/_app-wMoY-P4K.js"
	},
	"/assets/PieChart-DrYEGg9q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64cc-mSYf9Dgc1FhEyUi2h92owNW0EnE\"",
		"mtime": "2026-08-07T09:29:16.072Z",
		"size": 25804,
		"path": "../public/assets/PieChart-DrYEGg9q.js"
	},
	"/assets/_app.ai-saathi-B2bCquXr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9523-vq8EXKOFrqjLNuD1+A7mp3/iHUY\"",
		"mtime": "2026-08-07T09:29:16.079Z",
		"size": 38179,
		"path": "../public/assets/_app.ai-saathi-B2bCquXr.js"
	},
	"/assets/_app.alerts-Bvii4bFL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17c7-cfLchEijPvvyJbFFlCdTe2bZCGE\"",
		"mtime": "2026-08-07T09:29:16.079Z",
		"size": 6087,
		"path": "../public/assets/_app.alerts-Bvii4bFL.js"
	},
	"/assets/YAxis-B0JkcH3g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4589-hTJUMMCFmuR0I+IC0/nrj9vveNI\"",
		"mtime": "2026-08-07T09:29:16.078Z",
		"size": 17801,
		"path": "../public/assets/YAxis-B0JkcH3g.js"
	},
	"/assets/_app.crop-plan-Cg2BZDjx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be2c-plyZwiM4vOGWDJblRzjk9TVU+lA\"",
		"mtime": "2026-08-07T09:29:16.079Z",
		"size": 48684,
		"path": "../public/assets/_app.crop-plan-Cg2BZDjx.js"
	},
	"/assets/_app.dashboard-CqmqAraN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1398-Ub+cDZnfmFr+B4e5szXnjhs/9Fw\"",
		"mtime": "2026-08-07T09:29:16.079Z",
		"size": 5016,
		"path": "../public/assets/_app.dashboard-CqmqAraN.js"
	},
	"/assets/_app.expenses-SjC6lTnP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2127-wuVz0TgTOHmKPYEwrhqtg/uMzWE\"",
		"mtime": "2026-08-07T09:29:16.079Z",
		"size": 8487,
		"path": "../public/assets/_app.expenses-SjC6lTnP.js"
	},
	"/assets/_app.farms-DDHWd0gl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13f50-4+jKugV5yZZAP5aKrbJmLKWZWGs\"",
		"mtime": "2026-08-07T09:29:16.079Z",
		"size": 81744,
		"path": "../public/assets/_app.farms-DDHWd0gl.js"
	},
	"/assets/_app.notifications-CWIAH0x5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"142e-YtlWSLye99g3Ft54WOc5UWIeWm0\"",
		"mtime": "2026-08-07T09:29:16.079Z",
		"size": 5166,
		"path": "../public/assets/_app.notifications-CWIAH0x5.js"
	},
	"/assets/_app.recommendations-CcF3Jz0H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b05-7paGQrECq0nXDJRYTpgTF2Fzdxc\"",
		"mtime": "2026-08-07T09:29:16.080Z",
		"size": 15109,
		"path": "../public/assets/_app.recommendations-CcF3Jz0H.js"
	},
	"/assets/arrow-right-Dg-9f-jg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-DzbLAPSNZAb4LvFI9AxslS+P+JU\"",
		"mtime": "2026-08-07T09:29:16.080Z",
		"size": 165,
		"path": "../public/assets/arrow-right-Dg-9f-jg.js"
	},
	"/assets/aiSyncEvents-BvjxmtA_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-1gsBbKUmHbUCkXuYxdtGeGQNyiE\"",
		"mtime": "2026-08-07T09:29:16.080Z",
		"size": 290,
		"path": "../public/assets/aiSyncEvents-BvjxmtA_.js"
	},
	"/assets/_app.weather-3RTAFSri.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5f8e-ASqlVu034Xo2ur5SRIT9eWUi1+g\"",
		"mtime": "2026-08-07T09:29:16.080Z",
		"size": 24462,
		"path": "../public/assets/_app.weather-3RTAFSri.js"
	},
	"/assets/_app.market-DHyfjOnB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4795-VCIEd1uPcNivty+CFEnzamklrug\"",
		"mtime": "2026-08-07T09:29:16.079Z",
		"size": 18325,
		"path": "../public/assets/_app.market-DHyfjOnB.js"
	},
	"/assets/calendar-clock-D0pAJ0nv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17a-hSlyNvaZxOaaIcqHYmaHWI7LMno\"",
		"mtime": "2026-08-07T09:29:16.080Z",
		"size": 378,
		"path": "../public/assets/calendar-clock-D0pAJ0nv.js"
	},
	"/assets/_app.profile-Brlmdo92.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29c5-4WV9lSnoppQmBV2rh9XMFI+IF5w\"",
		"mtime": "2026-08-07T09:29:16.079Z",
		"size": 10693,
		"path": "../public/assets/_app.profile-Brlmdo92.js"
	},
	"/assets/check-check-CobvnGhC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b3-996haEs+JY3O67KuB/EaMl1siYM\"",
		"mtime": "2026-08-07T09:29:16.080Z",
		"size": 179,
		"path": "../public/assets/check-check-CobvnGhC.js"
	},
	"/assets/auth-Bu3FHM0R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68fb-kh2q6Ho3Ay4G1vyvKYB1pRu1G1M\"",
		"mtime": "2026-08-07T09:29:16.080Z",
		"size": 26875,
		"path": "../public/assets/auth-Bu3FHM0R.js"
	},
	"/auth-farm.png": {
		"type": "image/png",
		"etag": "\"f02d0-3aGHoP/zS5sZII8daAN/ZP8JuAM\"",
		"mtime": "2026-08-07T09:29:16.701Z",
		"size": 983760,
		"path": "../public/auth-farm.png"
	},
	"/assets/circle-alert-DAwuS3d-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa-fixGJENbKQtIjBIUvCTmqRSLQb8\"",
		"mtime": "2026-08-07T09:29:16.081Z",
		"size": 250,
		"path": "../public/assets/circle-alert-DAwuS3d-.js"
	},
	"/assets/chevron-down-SebkTElI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"80-O3ta1m2sBN5/n/dmNRrlw30oSYw\"",
		"mtime": "2026-08-07T09:29:16.081Z",
		"size": 128,
		"path": "../public/assets/chevron-down-SebkTElI.js"
	},
	"/assets/circle-check-CjTb_Qy8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b2-rKBbxtHJm1Pg37NfUBIb/RPzjBU\"",
		"mtime": "2026-08-07T09:29:16.081Z",
		"size": 178,
		"path": "../public/assets/circle-check-CjTb_Qy8.js"
	},
	"/assets/cloud-rain-Dj87-_v-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"118-DgTjXyrlay4z718wZBnd3Z9o3ic\"",
		"mtime": "2026-08-07T09:29:16.081Z",
		"size": 280,
		"path": "../public/assets/cloud-rain-Dj87-_v-.js"
	},
	"/assets/clsx-CjueKrWZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"170-hIN6XMVOMUzluNGmYPaM/SbauwQ\"",
		"mtime": "2026-08-07T09:29:16.081Z",
		"size": 368,
		"path": "../public/assets/clsx-CjueKrWZ.js"
	},
	"/assets/createLucideIcon-yBYsCVty.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ae-ZayyNGEdutF2H32nxWIfzmughyo\"",
		"mtime": "2026-08-07T09:29:16.081Z",
		"size": 1198,
		"path": "../public/assets/createLucideIcon-yBYsCVty.js"
	},
	"/assets/eye-CdAkNJv7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-ZYSzN9wyc7fGFIwxjwfnvKDmQfc\"",
		"mtime": "2026-08-07T09:29:16.081Z",
		"size": 256,
		"path": "../public/assets/eye-CdAkNJv7.js"
	},
	"/assets/flask-conical-DvQ73EkX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12e-8Pvff/STMFTuxa+rxm/r/nER0R8\"",
		"mtime": "2026-08-07T09:29:16.081Z",
		"size": 302,
		"path": "../public/assets/flask-conical-DvQ73EkX.js"
	},
	"/assets/generateCategoricalChart-Cb4nwsq0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"546e3-Ou85Eyu37/dLknsNnbi3sItvN3w\"",
		"mtime": "2026-08-07T09:29:16.081Z",
		"size": 345827,
		"path": "../public/assets/generateCategoricalChart-Cb4nwsq0.js"
	},
	"/assets/droplets-DQyYj1GA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"175-0oT6NcDPo9/9zHj8SyMaU9rvcLw\"",
		"mtime": "2026-08-07T09:29:16.081Z",
		"size": 373,
		"path": "../public/assets/droplets-DQyYj1GA.js"
	},
	"/assets/map-pin-BphrknIP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"103-f6ge6jvCml+x3OX9CwIn1OtQnRg\"",
		"mtime": "2026-08-07T09:29:16.082Z",
		"size": 259,
		"path": "../public/assets/map-pin-BphrknIP.js"
	},
	"/assets/link-Cx30Vi6q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5906-ufyLnBew6mMt+l2wG1RwsWY3iuU\"",
		"mtime": "2026-08-07T09:29:16.081Z",
		"size": 22790,
		"path": "../public/assets/link-Cx30Vi6q.js"
	},
	"/assets/rotate-ccw-rtsvLE75.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c8-4r0SBDBmmH0FJNWC3ce3HbIOts8\"",
		"mtime": "2026-08-07T09:29:16.082Z",
		"size": 200,
		"path": "../public/assets/rotate-ccw-rtsvLE75.js"
	},
	"/assets/plus-BVqfLC2K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-ltSjk/qtl2lzqOkV+IQo0Mt7BrM\"",
		"mtime": "2026-08-07T09:29:16.082Z",
		"size": 153,
		"path": "../public/assets/plus-BVqfLC2K.js"
	},
	"/assets/routes-CGpnTDxc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5fa6-RDACBsHhoO82eTlEt47mE0L/r+8\"",
		"mtime": "2026-08-07T09:29:16.082Z",
		"size": 24486,
		"path": "../public/assets/routes-CGpnTDxc.js"
	},
	"/assets/search-B-E0gjHA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-XtSN5fwqQrsF9JG3IAbJ6sIGJ1o\"",
		"mtime": "2026-08-07T09:29:16.082Z",
		"size": 174,
		"path": "../public/assets/search-B-E0gjHA.js"
	},
	"/assets/sprout-DR_T5MvF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"135-WI8lr4HtmtbIZmt//3yh6qR8F4g\"",
		"mtime": "2026-08-07T09:29:16.082Z",
		"size": 309,
		"path": "../public/assets/sprout-DR_T5MvF.js"
	},
	"/assets/sun-BKTfwA5-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32a-wgy8BKzErZhWScvu5NvNvfzK20A\"",
		"mtime": "2026-08-07T09:29:16.082Z",
		"size": 810,
		"path": "../public/assets/sun-BKTfwA5-.js"
	},
	"/assets/styles-DYRTHFZq.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"21b12-blYZrzvyzqB6D39ZbNt+t1psivQ\"",
		"mtime": "2026-08-07T09:29:16.083Z",
		"size": 138002,
		"path": "../public/assets/styles-DYRTHFZq.css"
	},
	"/assets/shield-check-CSkQ1x7h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d9-lKfy9ehxfe+7YEat/00n5YbjoQE\"",
		"mtime": "2026-08-07T09:29:16.082Z",
		"size": 473,
		"path": "../public/assets/shield-check-CSkQ1x7h.js"
	},
	"/assets/thermometer-i9uHpvmY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d3-1laSjHYBihlf6uTlQ5z0RK4lCTI\"",
		"mtime": "2026-08-07T09:29:16.082Z",
		"size": 467,
		"path": "../public/assets/thermometer-i9uHpvmY.js"
	},
	"/assets/timer-FE6gkT2M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21a-Hdxu6882nnS5IJl4HbYMDydltAE\"",
		"mtime": "2026-08-07T09:29:16.082Z",
		"size": 538,
		"path": "../public/assets/timer-FE6gkT2M.js"
	},
	"/assets/wind-BGyNcGZD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f6-KA6V8g6ju7TesDhhXYq4CiqTlNw\"",
		"mtime": "2026-08-07T09:29:16.083Z",
		"size": 246,
		"path": "../public/assets/wind-BGyNcGZD.js"
	},
	"/assets/index-wNFy-9SK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55549-535rses05wOxXaQ+qJLXFe0dbSA\"",
		"mtime": "2026-08-07T09:29:16.071Z",
		"size": 349513,
		"path": "../public/assets/index-wNFy-9SK.js"
	},
	"/assets/x-BhF52vq0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"677-GhPSniewwDZIGTQDxf7yvmCVsNQ\"",
		"mtime": "2026-08-07T09:29:16.083Z",
		"size": 1655,
		"path": "../public/assets/x-BhF52vq0.js"
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
