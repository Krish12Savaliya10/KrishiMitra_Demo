import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { Ct as ChevronDown, U as MapPin, wt as Check } from "../_libs/lucide-react.mjs";
import { r as useAppData } from "./router-C6v2fw80.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/FarmSwitcher-DLtXqUEb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* FarmSwitcher — a compact dropdown that lets the user change the active farm
* from any page (Crop Plan, Schedule, etc.) without going to the Farms page.
*
* Usage:
*   import { FarmSwitcher } from "@/components/app/FarmSwitcher";
*   <FarmSwitcher />
*/
function FarmSwitcher({ className = "" }) {
	const { farms, activeFarm, activeFarmId, setActiveFarmId } = useAppData();
	const [open, setOpen] = (0, import_react.useState)(false);
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		function onClickOutside(e) {
			if (ref.current && !ref.current.contains(e.target)) setOpen(false);
		}
		document.addEventListener("mousedown", onClickOutside);
		return () => document.removeEventListener("mousedown", onClickOutside);
	}, []);
	if (!farms || farms.length === 0) return null;
	const single = farms.length === 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: `relative ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => !single && setOpen((v) => !v),
			disabled: single,
			"aria-label": "Switch farm",
			className: `flex items-center gap-1.5 rounded-xl border border-border/60 bg-secondary/40 px-3 py-2 text-xs font-semibold text-foreground backdrop-blur-sm transition-all
          ${single ? "cursor-default opacity-70" : "cursor-pointer hover:bg-secondary/80 hover:border-primary/40"}
          ${open ? "border-primary/50 bg-secondary/70" : ""}
        `,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5 text-primary shrink-0" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "max-w-[120px] truncate",
					children: activeFarm?.name || "Select Farm"
				}),
				!single && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}` })
			]
		}), open && !single && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute right-0 top-full z-50 mt-2 min-w-[200px] rounded-xl border border-border/60 bg-card shadow-xl overflow-hidden animate-in slide-in-from-top-1 duration-150",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-3 py-2 border-b border-border/40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
					children: "Switch Farm"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "py-1 max-h-64 overflow-y-auto",
				children: farms.map((farm) => {
					const isActive = farm._id === activeFarmId;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setActiveFarmId(farm._id);
							setOpen(false);
						},
						className: `flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-colors
                      ${isActive ? "bg-primary/10 text-primary font-semibold" : "text-foreground hover:bg-secondary/60"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: `h-3.5 w-3.5 shrink-0 ${isActive ? "text-primary" : "text-muted-foreground"}` }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate font-medium",
									children: farm.name
								}), farm.village && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "truncate text-[11px] text-muted-foreground",
									children: farm.village
								})]
							}),
							isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 shrink-0 text-primary" })
						]
					}) }, farm._id);
				})
			})]
		})]
	});
}
//#endregion
export { FarmSwitcher as t };
