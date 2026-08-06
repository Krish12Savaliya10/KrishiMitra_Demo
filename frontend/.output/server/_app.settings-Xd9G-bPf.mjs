import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { G as LogOut, x as ShieldCheck } from "./_libs/lucide-react.mjs";
import { r as useAppData } from "./_ssr/router-C6v2fw80.mjs";
import { r as PageHeader } from "./_ssr/AppShell-B2DYmKXV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.settings-Xd9G-bPf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const { logout, token, userProfile, fetchDashboardData } = useAppData();
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Settings",
			subtitle: "Account, language, alerts and system preferences"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "glass rounded-2xl p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-sm font-semibold",
								children: "Account"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block text-[11px] font-medium text-muted-foreground",
								children: "Display name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "settings-display-name",
								defaultValue: userProfile?.name || "",
								className: "w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary/50"
							})] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: async () => {
								setIsSaving(true);
								try {
									const fullName = document.getElementById("settings-display-name").value.trim().split(" ");
									const firstName = fullName[0] || "";
									const lastName = fullName.slice(1).join(" ") || "";
									if ((await fetch(`${typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api"}/auth/me`, {
										method: "PATCH",
										headers: {
											"Content-Type": "application/json",
											Authorization: `Bearer ${token}`
										},
										body: JSON.stringify({
											firstName,
											lastName
										})
									})).ok) {
										await fetchDashboardData();
										toast.success("Settings saved successfully");
									} else toast.error("Failed to save settings");
								} catch (err) {
									console.error(err);
									toast.error("An error occurred while saving");
								} finally {
									setIsSaving(false);
								}
							},
							className: "mt-4 rounded-xl bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.02]",
							children: isSaving ? "Saving..." : "Save changes"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pb-4 text-center text-[11px] text-muted-foreground",
					children: "KrishiMitra v2.4 · Your digital agriculture companion"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "glass rounded-2xl p-5 border-destructive/20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4 text-destructive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-sm font-semibold text-destructive",
								children: "Danger Zone"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-4 text-xs text-muted-foreground",
							children: "Sign out of your account on this device."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: logout,
							className: "rounded-xl border border-destructive bg-destructive/10 px-5 py-2 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/20",
							children: "Log out"
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { SettingsPage as component };
