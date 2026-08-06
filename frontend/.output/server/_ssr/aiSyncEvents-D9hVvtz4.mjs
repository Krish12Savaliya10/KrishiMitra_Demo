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
export { subscribeAiSyncRefresh as n, emitAiSyncRefresh as t };
