import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { M as RotateCcw, P as Plus, T as Send, X as Leaf, et as ImagePlus, g as Square, l as ThumbsUp, o as TriangleAlert, pt as Copy, q as LoaderCircle, t as X, u as ThumbsDown, v as Sparkles, vt as ClipboardPaste, wt as Check, z as Microscope } from "./_libs/lucide-react.mjs";
import { r as useAppData } from "./_ssr/router-C6v2fw80.mjs";
import { t as emitAiSyncRefresh } from "./_ssr/aiSyncEvents-D9hVvtz4.mjs";
import { a as YAxis, c as Line, d as Pie, f as Cell, i as LineChart, l as CartesianGrid, m as Tooltip, n as PieChart, o as XAxis, p as ResponsiveContainer, r as BarChart, u as Bar } from "./_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.ai-saathi-CYNtJsUd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CHART_COLORS = [
	"#d97757",
	"#c8a96e",
	"#5b8dee",
	"#e87c45",
	"#e05050",
	"#a97dd9"
];
var chartTooltip = {
	background: "var(--color-surface)",
	border: "1px solid var(--color-border)",
	borderRadius: 8,
	fontSize: 12,
	color: "var(--color-foreground)"
};
var SUGGESTION_PROMPTS = [
	{
		icon: "🌾",
		title: "Kharif Crop Plan",
		desc: "Give me a full Kharif season soybean crop plan with a weekly schedule table."
	},
	{
		icon: "💰",
		title: "Farm Budget",
		desc: "Show my monthly farm budget breakdown as a pie chart."
	},
	{
		icon: "📈",
		title: "Yield Trends",
		desc: "Show crop yield trend over 6 months as a line chart."
	},
	{
		icon: "🐛",
		title: "Pest Diagnosis",
		desc: "My tomato leaves have yellow spots. Identify and give a treatment plan."
	},
	{
		icon: "🧪",
		title: "Soil Correction",
		desc: "My soil pH is 5.2. Give me a correction plan in a table."
	},
	{
		icon: "🌦️",
		title: "Weather Impact",
		desc: "Compare how wheat, rice and cotton handle heavy rain — bar chart."
	}
];
function parseChart(raw) {
	return raw.trim().split("\n").map((l) => {
		const m = l.match(/^(.+?):\s*(\d+\.?\d*)/);
		return m ? {
			name: m[1].trim(),
			value: parseFloat(m[2])
		} : null;
	}).filter(Boolean);
}
function BarBlock({ raw }) {
	const data = parseChart(raw);
	if (!data.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "my-4 overflow-hidden rounded-2xl border border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-2 border-b border-border px-4 py-2.5 bg-surface-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
				children: "Bar Chart"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: 220,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data,
					margin: {
						top: 4,
						right: 8,
						left: -20,
						bottom: 4
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							strokeDasharray: "3 3",
							stroke: "var(--color-border)",
							opacity: .5
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "name",
							tick: {
								fill: "var(--color-muted-foreground)",
								fontSize: 11
							},
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							tick: {
								fill: "var(--color-muted-foreground)",
								fontSize: 11
							},
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
							contentStyle: chartTooltip,
							cursor: {
								fill: "var(--color-primary)",
								opacity: .04
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "value",
							radius: [
								5,
								5,
								0,
								0
							],
							children: data.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: CHART_COLORS[i % CHART_COLORS.length] }, i))
						})
					]
				})
			})
		})]
	});
}
function LineBlock({ raw }) {
	const data = parseChart(raw);
	if (!data.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "my-4 overflow-hidden rounded-2xl border border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-2 border-b border-border px-4 py-2.5 bg-surface-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
				children: "Trend"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: 220,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
					data,
					margin: {
						top: 4,
						right: 8,
						left: -20,
						bottom: 4
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
							strokeDasharray: "3 3",
							stroke: "var(--color-border)",
							opacity: .5
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "name",
							tick: {
								fill: "var(--color-muted-foreground)",
								fontSize: 11
							},
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							tick: {
								fill: "var(--color-muted-foreground)",
								fontSize: 11
							},
							axisLine: false,
							tickLine: false
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: chartTooltip }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
							type: "monotone",
							dataKey: "value",
							stroke: "#d97757",
							strokeWidth: 2.5,
							dot: {
								fill: "#d97757",
								r: 3,
								strokeWidth: 0
							}
						})
					]
				})
			})
		})]
	});
}
function PieBlock({ raw }) {
	const data = parseChart(raw);
	if (!data.length) return null;
	const total = data.reduce((s, d) => s + d.value, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "my-4 overflow-hidden rounded-2xl border border-border bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center gap-2 border-b border-border px-4 py-2.5 bg-surface-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
				children: "Distribution"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4 flex flex-col items-center gap-6 sm:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: 180,
				height: 180,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
					data,
					dataKey: "value",
					cx: "50%",
					cy: "50%",
					innerRadius: 50,
					outerRadius: 80,
					paddingAngle: 2,
					stroke: "none",
					children: data.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: CHART_COLORS[i % CHART_COLORS.length] }, i))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
					contentStyle: chartTooltip,
					formatter: (v) => [`${(v / total * 100).toFixed(1)}%`, ""]
				})] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2.5",
				children: data.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-2.5 w-2.5 rounded-sm shrink-0",
							style: { background: CHART_COLORS[i % CHART_COLORS.length] }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-foreground",
							children: d.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-auto pl-6 text-sm font-semibold text-muted-foreground",
							children: [(d.value / total * 100).toFixed(0), "%"]
						})
					]
				}, i))
			})]
		})]
	});
}
function SyncPlanBlock({ raw }) {
	const { token, activeFarm, farms } = useAppData();
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	let syncData;
	try {
		syncData = JSON.parse(raw);
	} catch (e) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-error text-xs p-2",
			children: "Invalid plan data"
		});
	}
	const handleSave = async () => {
		if (!farms || farms.length === 0) {
			setError("No farm selected. Please add a farm first.");
			return;
		}
		const farmId = activeFarm?._id || farms[0]._id;
		setSaving(true);
		setError(null);
		try {
			const res = await fetch(`${typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api"}/chat/sync-plan`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					syncData,
					farmId
				})
			});
			let data;
			try {
				data = await res.json();
			} catch {
				data = {};
			}
			if (!res.ok) {
				const errMsg = data.message || `Server error (${res.status})`;
				console.error("[SyncPlan] Save failed:", errMsg, data);
				throw new Error(errMsg);
			}
			setSaved(true);
			toast.success(isScheduleOnly ? "Daily schedule saved!" : `Crop plan saved! ${data.tasksGenerated || 0} tasks added.`);
			emitAiSyncRefresh("cropPlan");
			emitAiSyncRefresh("schedule");
		} catch (err) {
			const msg = err.message || "Failed to save plan";
			setError(msg);
			toast.error(`Save failed: ${msg}`);
		} finally {
			setSaving(false);
		}
	};
	const isScheduleOnly = !syncData.cropPlan && Array.isArray(syncData.tasks) && syncData.tasks.length > 0;
	const hasGeneratedTasks = Array.isArray(syncData.tasks) && syncData.tasks.length > 0;
	const saveLabel = isScheduleOnly ? "Save Daily Schedule" : hasGeneratedTasks ? "Save Crop Plan & Schedule" : "Save Crop Plan";
	if (!syncData.cropPlan && !isScheduleOnly) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "my-4 rounded-2xl border border-primary/25 bg-primary/5 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-5 py-3.5 border-b border-primary/15 bg-primary/8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5 text-primary font-semibold text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-4 w-4" }), isScheduleOnly ? "Proposed Schedule" : "Proposed Crop Plan"]
			}), saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-1.5 text-xs font-semibold text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }), " Saved!"]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: handleSave,
				disabled: saving,
				className: "flex items-center gap-2 rounded-lg bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity",
				children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardPaste, { className: "h-3 w-3" }), saveLabel]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-4",
			children: [isScheduleOnly ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2 text-sm",
				children: [syncData.tasks.slice(0, 4).map((task, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-surface p-3 border border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-foreground",
						children: task.title || "Farm Task"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: [
							task.date || "Today",
							" · ",
							task.category || "monitoring",
							" · ",
							task.priority || "medium"
						]
					})]
				}, `${task.title || "task"}-${index}`)), syncData.tasks.length > 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"+",
						syncData.tasks.length - 4,
						" more tasks"
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 text-sm",
				children: [
					["Crop", syncData.cropPlan.cropName],
					["Season", syncData.cropPlan.season],
					["Sowing Date", syncData.cropPlan.sowingDate],
					["Area (Acres)", syncData.cropPlan.areaAcres]
				].map(([label, val]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-surface p-3 border border-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase text-muted-foreground font-semibold mb-1",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-foreground",
						children: val
					})]
				}, label))
			}), error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-error",
				children: error
			})]
		})]
	});
}
function CodeBlock({ code, lang }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "my-3 overflow-hidden rounded-2xl border border-border bg-[#1e1e1e] dark:bg-[#0d0d0d]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-white/8 bg-white/4 px-4 py-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[11px] text-white/50",
				children: lang || "code"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => {
					navigator.clipboard.writeText(code);
					setCopied(true);
					setTimeout(() => setCopied(false), 2e3);
				},
				className: "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] text-white/40 transition-colors hover:text-white/80 hover:bg-white/8",
				children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3 text-green-400" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3 w-3" }), copied ? "Copied!" : "Copy"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			className: "overflow-x-auto p-4 text-[13px] leading-relaxed text-white/90 font-mono",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: code })
		})]
	});
}
function MdTable({ rows }) {
	if (rows.length < 2) return null;
	const headers = rows[0].split("|").map((c) => c.trim()).filter(Boolean);
	const body = rows.slice(2).map((r) => r.split("|").map((c) => c.trim()).filter(Boolean));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "my-4 overflow-x-auto rounded-xl border border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
				className: "bg-surface-2 border-b border-border",
				children: headers.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "px-4 py-3 text-left text-xs font-semibold text-foreground whitespace-nowrap",
					children: h
				}, i))
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: body.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
				className: `border-b border-border/50 last:border-0 hover:bg-surface-2/60 transition-colors ${i % 2 ? "bg-surface/30" : ""}`,
				children: row.map((cell, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "px-4 py-2.5 text-sm text-foreground/90 whitespace-nowrap",
					children: cell
				}, j))
			}, i)) })]
		})
	});
}
function fmt(t) {
	return t.replace(/\*\*(.*?)\*\*/g, `<strong class="font-semibold text-foreground">$1</strong>`).replace(/\*(.*?)\*/g, `<em class="italic text-foreground/80">$1</em>`).replace(/`([^`]+)`/g, `<code class="rounded-md bg-surface-2 border border-border px-1.5 py-0.5 font-mono text-[0.85em] text-foreground/90">$1</code>`).replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" class="text-[#d97757] underline underline-offset-2 hover:opacity-80 transition-opacity" target="_blank" rel="noopener">$1</a>`);
}
function Callout({ type, children }) {
	const styles = {
		note: {
			bg: "bg-blue-500/8 border-blue-500/25",
			icon: "💡",
			text: "text-blue-400"
		},
		tip: {
			bg: "bg-emerald-500/8 border-emerald-500/25",
			icon: "✅",
			text: "text-emerald-400"
		},
		warning: {
			bg: "bg-amber-500/8 border-amber-500/25",
			icon: "⚠️",
			text: "text-amber-400"
		},
		danger: {
			bg: "bg-red-500/8 border-red-500/25",
			icon: "🚨",
			text: "text-red-400"
		}
	};
	const s = styles[type] || styles.note;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `my-3 flex items-start gap-3 rounded-xl border p-4 ${s.bg}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-base shrink-0 mt-0.5",
			children: s.icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `text-sm leading-relaxed ${s.text} flex-1`,
			children
		})]
	});
}
function Markdown({ text }) {
	const lines = text.split("\n");
	const out = [];
	let i = 0;
	while (i < lines.length) {
		const line = lines[i];
		if (line.startsWith("```")) {
			const lang = line.slice(3).trim();
			const block = [];
			i++;
			while (i < lines.length && !lines[i].startsWith("```")) {
				block.push(lines[i]);
				i++;
			}
			const raw = block.join("\n");
			if (lang === "chart:bar") out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarBlock, { raw }, i));
			else if (lang === "chart:line") out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LineBlock, { raw }, i));
			else if (lang === "chart:pie") out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieBlock, { raw }, i));
			else if (lang === "json:database-sync" || lang === "json" && raw.includes("\"cropPlan\"")) out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SyncPlanBlock, { raw }, i));
			else out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
				code: raw,
				lang
			}, i));
			i++;
			continue;
		}
		if (line.includes("|") && i + 1 < lines.length && lines[i + 1].match(/^[\s|:-]+$/)) {
			const rows = [line, lines[i + 1]];
			i += 2;
			while (i < lines.length && lines[i].includes("|")) {
				rows.push(lines[i]);
				i++;
			}
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdTable, { rows }, i));
			continue;
		}
		if (line.match(/^> \[!(NOTE|TIP|WARNING|DANGER)\]/i)) {
			const type = line.match(/\[!(\w+)\]/)[1].toLowerCase();
			const content = [];
			i++;
			while (i < lines.length && lines[i].startsWith("> ")) {
				content.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block",
					dangerouslySetInnerHTML: { __html: fmt(lines[i].slice(2)) }
				}, i));
				i++;
			}
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Callout, {
				type,
				children: content
			}, `callout${i}`));
			continue;
		}
		if (line.startsWith("> ")) {
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
				className: "my-3 border-l-[3px] border-foreground/20 pl-4 py-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm italic text-foreground/60",
					dangerouslySetInnerHTML: { __html: fmt(line.slice(2)) }
				})
			}, i));
			i++;
			continue;
		}
		if (line.match(/^---+$/)) {
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-5 border-border" }, i));
			i++;
			continue;
		}
		if (line.startsWith("### ")) {
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-6 mb-2 text-sm font-semibold text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { dangerouslySetInnerHTML: { __html: fmt(line.slice(4)) } })
			}, i));
			i++;
			continue;
		}
		if (line.startsWith("## ")) {
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-7 mb-2.5 text-base font-bold text-foreground border-b border-border pb-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { dangerouslySetInnerHTML: { __html: fmt(line.slice(3)) } })
			}, i));
			i++;
			continue;
		}
		if (line.startsWith("# ")) {
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-7 mb-3 text-lg font-bold text-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { dangerouslySetInnerHTML: { __html: fmt(line.slice(2)) } })
			}, i));
			i++;
			continue;
		}
		if (line.match(/^[\s]*[-*+] /)) {
			const items = [];
			while (i < lines.length && lines[i].match(/^[\s]*[-*+] /)) {
				items.push({
					depth: Math.floor(lines[i].match(/^\s*/)[0].length / 2),
					content: lines[i].replace(/^\s*[-*+] /, "")
				});
				i++;
			}
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "my-2.5 space-y-1.5",
				children: items.map((it, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-2.5",
					style: { paddingLeft: it.depth * 16 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-[8px] h-[5px] w-[5px] shrink-0 rounded-full bg-foreground/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm leading-7 text-foreground/90",
						dangerouslySetInnerHTML: { __html: fmt(it.content) }
					})]
				}, j))
			}, `ul${i}`));
			continue;
		}
		if (line.match(/^\d+\. /)) {
			const items = [];
			while (i < lines.length && lines[i].match(/^\d+\. /)) {
				items.push(lines[i].replace(/^\d+\. /, ""));
				i++;
			}
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "my-2.5 space-y-2 list-none",
				children: items.map((it, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground/8 text-[11px] font-semibold text-foreground/60 mt-[3px]",
						children: j + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm leading-7 text-foreground/90",
						dangerouslySetInnerHTML: { __html: fmt(it) }
					})]
				}, j))
			}, `ol${i}`));
			continue;
		}
		if (line.trim() === "") {
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3" }, i));
			i++;
			continue;
		}
		out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm leading-7 text-foreground/90",
			dangerouslySetInnerHTML: { __html: fmt(line) }
		}, i));
		i++;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-0",
		children: out
	});
}
function ThinkingDots() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1 py-1",
		children: [[
			0,
			1,
			2
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "h-2 w-2 rounded-full bg-foreground/30",
			style: { animation: `bounce 1.2s ease-in-out ${i * .2}s infinite` }
		}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }` })]
	});
}
function Message({ msg, onEdit, onRetry }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [editText, setEditText] = (0, import_react.useState)(msg.text);
	const [elapsed, setElapsed] = (0, import_react.useState)(0);
	const time = new Date(parseInt(msg.id) || Date.now()).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
	(0, import_react.useEffect)(() => {
		let t;
		if (msg.isLoading) {
			const s = Date.now();
			t = setInterval(() => setElapsed(((Date.now() - s) / 1e3).toFixed(1)), 100);
		}
		return () => clearInterval(t);
	}, [msg.isLoading]);
	if (msg.role === "user") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "group flex justify-end mb-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-[80%]",
			children: editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "w-full rounded-2xl border border-primary/40 bg-surface px-4 py-3 text-sm text-foreground outline-none resize-none focus:ring-1 focus:ring-primary/50",
					value: editText,
					onChange: (e) => setEditText(e.target.value),
					rows: 3,
					autoFocus: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-end gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setEditing(false),
						className: "rounded-xl border border-border px-4 py-1.5 text-sm text-muted-foreground hover:bg-surface-2 transition-colors",
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							onEdit?.(msg.id, editText);
							setEditing(false);
						},
						className: "rounded-xl bg-foreground px-4 py-1.5 text-sm font-medium text-background hover:opacity-90 transition-opacity",
						children: "Send"
					})]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-3xl bg-surface border border-border px-5 py-3.5 text-sm leading-7 text-foreground whitespace-pre-wrap",
				children: msg.text
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1.5 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setEditing(true),
					className: "rounded-lg px-2.5 py-1 text-xs text-muted-foreground hover:bg-surface-2 hover:text-foreground transition-colors",
					children: "Edit"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						navigator.clipboard.writeText(msg.text);
						setCopied(true);
						setTimeout(() => setCopied(false), 2e3);
					},
					className: "rounded-lg p-1.5 text-muted-foreground hover:bg-surface-2 hover:text-foreground transition-colors",
					children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" })
				})]
			})] })
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group mb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2.5 mb-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative grid h-7 w-7 shrink-0 place-items-center rounded-md bg-primary/15 ring-1 ring-primary/30",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-3.5 w-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-primary" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-semibold text-foreground",
					children: "AI Mitra"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: time
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pl-10",
			children: [msg.isLoading ? msg.text ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { text: msg.text }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThinkingDots, {})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThinkingDots, {}), parseFloat(elapsed) > 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-mono text-xs text-muted-foreground/50",
					children: [elapsed, "s"]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { text: msg.text }), !msg.isLoading && msg.role === "assistant" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							navigator.clipboard.writeText(msg.text);
							setCopied(true);
							setTimeout(() => setCopied(false), 2e3);
						},
						className: "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-surface-2 hover:text-foreground transition-colors",
						children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3.5 w-3.5" }), copied ? "Copied" : "Copy"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => onRetry?.(msg.id),
						className: "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-surface-2 hover:text-foreground transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5" }), "Retry"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-surface-2 hover:text-foreground transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsUp, { className: "h-3.5 w-3.5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-surface-2 hover:text-foreground transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsDown, { className: "h-3.5 w-3.5" })
					})
				]
			})]
		})]
	});
}
function DiseaseScanner({ token }) {
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const [file, setFile] = (0, import_react.useState)(null);
	const [preview, setPreview] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const fileRef = (0, import_react.useRef)(null);
	const zoneRef = (0, import_react.useRef)(null);
	const load = (0, import_react.useCallback)((f) => {
		if (!f?.type.startsWith("image/")) {
			setError("Please upload an image file.");
			return;
		}
		setFile(f);
		setResult(null);
		setError(null);
		const r = new FileReader();
		r.onload = (e) => setPreview(e.target.result);
		r.readAsDataURL(f);
	}, []);
	const onPaste = (0, import_react.useCallback)((e) => {
		for (const item of e.clipboardData?.items || []) if (item.type.startsWith("image/")) {
			load(item.getAsFile());
			return;
		}
	}, [load]);
	(0, import_react.useEffect)(() => {
		const el = zoneRef.current;
		if (!el) return;
		el.addEventListener("paste", onPaste);
		return () => el.removeEventListener("paste", onPaste);
	}, [onPaste]);
	const analyze = async () => {
		if (!file) return;
		setLoading(true);
		setError(null);
		setResult(null);
		const form = new FormData();
		form.append("image", file);
		try {
			const res = await fetch(`${typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api"}/disease/predict`, {
				method: "POST",
				headers: { Authorization: `Bearer ${token}` },
				body: form
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Analysis failed");
			setResult(data?.data ?? data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};
	const reset = () => {
		setFile(null);
		setPreview(null);
		setResult(null);
		setError(null);
	};
	const isFallback = Boolean(result?.fallback || !result?.disease || result?.disease === "Unknown" || result?.disease === "Unknown" && result?.confidence === 0);
	const severity = result && !isFallback ? result.disease?.toLowerCase().includes("healthy") ? "healthy" : result.confidence > .85 ? "high" : result.confidence > .6 ? "medium" : "low" : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: zoneRef,
		tabIndex: 0,
		onDragOver: (e) => {
			e.preventDefault();
			setDragging(true);
		},
		onDragLeave: () => setDragging(false),
		onDrop: (e) => {
			e.preventDefault();
			setDragging(false);
			load(e.dataTransfer.files[0]);
		},
		className: "flex h-full flex-col gap-6 overflow-y-auto p-6 outline-none max-w-2xl mx-auto w-full",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-bold text-foreground text-lg",
				children: "Crop Disease Scanner"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Upload a leaf photo to detect diseases using computer vision."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				onClick: () => !file && fileRef.current?.click(),
				className: `relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all ${dragging ? "border-[#d97757] bg-[#d97757]/5 scale-[1.01]" : file ? "border-border bg-surface cursor-default" : "border-border hover:border-foreground/30 hover:bg-surface"}`,
				children: [preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: preview,
						alt: "leaf",
						className: "mx-auto max-h-[280px] rounded-xl object-contain p-3"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: (e) => {
							e.stopPropagation();
							reset();
						},
						className: "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground hover:text-foreground transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-4 p-12 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface-2 transition-all ${dragging ? "border-[#d97757] bg-[#d97757]/10 scale-110" : ""}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: `h-7 w-7 transition-colors ${dragging ? "text-[#d97757]" : "text-muted-foreground"}` })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold text-foreground",
						children: "Drag & drop a leaf photo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: ["or click to browse · paste with ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
							className: "rounded-md border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-xs",
							children: "⌘V"
						})]
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: fileRef,
					type: "file",
					accept: "image/*",
					className: "hidden",
					onChange: (e) => load(e.target.files[0])
				})]
			}),
			file && !result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: analyze,
				disabled: loading,
				className: "flex items-center justify-center gap-2.5 rounded-2xl bg-foreground px-5 py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-85 disabled:opacity-50",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Analyzing..."] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Microscope, { className: "h-4 w-4" }), " Analyze Disease"] })
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3 rounded-2xl border border-red-500/25 bg-red-500/8 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 shrink-0 text-red-400 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-red-400",
					children: error
				})]
			}),
			result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					isFallback ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl border border-amber-500/25 bg-amber-500/8 p-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-4 w-4 shrink-0 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-amber-400",
								children: "Gemini API unavailable"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-foreground/70",
								children: result?.error || "Could not connect to Gemini Vision API. Please check your API key or try again."
							})] })]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `rounded-2xl border p-5 ${{
							healthy: "border-emerald-500/30 bg-emerald-500/8 text-emerald-400",
							high: "border-red-500/30 bg-red-500/8 text-red-400",
							medium: "border-amber-500/30 bg-amber-500/8 text-amber-400",
							low: "border-yellow-500/30 bg-yellow-500/8 text-yellow-400"
						}[severity]}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-semibold uppercase tracking-widest opacity-60 mb-1",
								children: "Detected"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xl font-bold",
								children: result.disease
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-semibold uppercase tracking-widest opacity-60 mb-1",
									children: "Confidence"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-3xl font-bold",
									children: [(result.confidence * 100).toFixed(1), "%"]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-1.5 w-full overflow-hidden rounded-full bg-current/15",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-current/60 transition-all",
								style: { width: `${result.confidence * 100}%` }
							})
						})]
					}),
					result.top3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-surface p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "All Predictions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: result.top3.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-4 text-right text-xs font-semibold text-muted-foreground",
									children: i + 1
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-1.5 flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-foreground",
											children: p.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono text-sm text-muted-foreground",
											children: [(p.prob * 100).toFixed(1), "%"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-1.5 w-full overflow-hidden rounded-full bg-surface-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full transition-all",
											style: {
												width: `${p.prob * 100}%`,
												background: CHART_COLORS[i]
											}
										})
									})]
								})]
							}, i))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: reset,
						className: "w-full rounded-2xl border border-border py-3 text-sm text-muted-foreground hover:bg-surface-2 hover:text-foreground transition-colors",
						children: "Scan Another Image"
					})
				]
			})
		]
	});
}
function AiSaathiPage() {
	const { token, activeFarm, weatherSnapshot } = useAppData();
	const [tab, setTab] = (0, import_react.useState)("chat");
	const [input, setInput] = (0, import_react.useState)("");
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [sessions, setSessions] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const endRef = (0, import_react.useRef)(null);
	const textRef = (0, import_react.useRef)(null);
	const sessionId = (0, import_react.useRef)(`s-${Date.now()}`);
	const abortControllerRef = (0, import_react.useRef)(null);
	const fileInputRef = (0, import_react.useRef)(null);
	const [attachedImage, setAttachedImage] = (0, import_react.useState)(null);
	const handleFileChange = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (file.size > 5242880) {
			toast.error("Image must be smaller than 5MB");
			return;
		}
		const reader = new FileReader();
		reader.onload = (event) => setAttachedImage(event.target.result);
		reader.readAsDataURL(file);
		e.target.value = null;
	};
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
	const loadSessions = async () => {
		if (!token) return;
		try {
			const res = await fetch(`${typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api"}/chat/sessions`, { headers: { Authorization: `Bearer ${token}` } });
			if (res.ok) setSessions(await res.json());
		} catch (err) {
			console.error("Failed to load sessions", err);
		}
	};
	const loadHistory = async (sid) => {
		if (!token || !sid) return;
		try {
			const res = await fetch(`${typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api"}/chat/${encodeURIComponent(sid)}`, { headers: { Authorization: `Bearer ${token}` } });
			if (!res.ok) return;
			const history = await res.json();
			const normalized = (Array.isArray(history) ? history : []).map((m) => ({
				id: String(m.id || m._id || `${Date.now()}-${Math.random()}`),
				role: m.role,
				text: m.text || m.content || "",
				isLoading: false
			}));
			setMessages(normalized);
			sessionId.current = sid;
			setTab("chat");
		} catch (err) {
			console.error("Failed to load chat history", err);
		}
	};
	(0, import_react.useEffect)(() => {
		loadSessions();
		const initialPrompt = new URLSearchParams(window.location.search).get("prompt");
		if (initialPrompt) {
			send(initialPrompt);
			window.history.replaceState({}, document.title, window.location.pathname);
		}
	}, [token]);
	const send = async (text) => {
		const userMsg = {
			id: `${Date.now()}`,
			role: "user",
			text,
			imageBase64: attachedImage
		};
		const aiMsg = {
			id: `${Date.now() + 1}`,
			role: "assistant",
			text: "",
			isLoading: true
		};
		setMessages((p) => [
			...p,
			userMsg,
			aiMsg
		]);
		setLoading(true);
		const payloadImage = attachedImage;
		setAttachedImage(null);
		abortControllerRef.current = new AbortController();
		try {
			const res = await fetch(`${typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api"}/chat`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					message: text,
					sessionId: sessionId.current,
					farmId: activeFarm?._id || null,
					weatherSnapshot: weatherSnapshot || null,
					imageBase64: payloadImage
				}),
				signal: abortControllerRef.current.signal
			});
			if (!res.ok) throw new Error("Failed to connect to AI assistant");
			const reader = res.body.getReader();
			const decoder = new TextDecoder("utf-8");
			let fullText = "";
			let buffer = "";
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				buffer += decoder.decode(value, { stream: true });
				let newlineIndex;
				while ((newlineIndex = buffer.indexOf("\n")) >= 0) {
					const line = buffer.slice(0, newlineIndex).trim();
					buffer = buffer.slice(newlineIndex + 1);
					if (!line) continue;
					if (line.startsWith("data: ")) {
						const dataStr = line.slice(6).trim();
						if (dataStr === "[DONE]") {
							setMessages((p) => p.map((m) => m.id === aiMsg.id ? {
								...m,
								isLoading: false
							} : m));
							break;
						}
						try {
							const parsed = JSON.parse(dataStr);
							if (parsed.error) {
								fullText = parsed.error;
								setMessages((p) => p.map((m) => m.id === aiMsg.id ? {
									...m,
									text: fullText,
									isLoading: false
								} : m));
							} else if (parsed.chunk) {
								fullText += parsed.chunk;
								setMessages((p) => p.map((m) => m.id === aiMsg.id ? {
									...m,
									text: fullText
								} : m));
							}
						} catch (e) {}
					}
				}
			}
			setMessages((p) => p.map((m) => m.id === aiMsg.id ? {
				...m,
				isLoading: false
			} : m));
			emitAiSyncRefresh("chat");
			loadSessions();
		} catch (err) {
			if (err.name === "AbortError") setMessages((p) => p.map((m) => m.id === aiMsg.id ? {
				...m,
				isLoading: false
			} : m));
			else setMessages((p) => p.map((m) => m.id === aiMsg.id ? {
				...m,
				text: err.message || "Connection error.",
				isLoading: false
			} : m));
		} finally {
			setLoading(false);
		}
	};
	const handleInterrupt = () => {
		if (abortControllerRef.current) abortControllerRef.current.abort();
	};
	const handleSend = () => {
		if (!input.trim() || loading) return;
		if (textRef.current) textRef.current.style.height = "24px";
		send(input);
		setInput("");
	};
	const handleEdit = (id, newText) => {
		const idx = messages.findIndex((m) => m.id === id);
		setMessages((p) => p.slice(0, idx));
		send(newText);
	};
	const handleRetry = (id) => {
		const idx = messages.findIndex((m) => m.id === id);
		const prevUser = [...messages].slice(0, idx).reverse().find((m) => m.role === "user");
		if (!prevUser) return;
		setMessages((p) => p.slice(0, idx));
		send(prevUser.text);
	};
	const clear = () => {
		setMessages([]);
		sessionId.current = `s-${Date.now()}`;
	};
	const isEmpty = messages.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex overflow-hidden bg-background",
		style: {
			height: "calc(100vh - 57px)",
			marginLeft: "-28px",
			marginRight: "-28px",
			marginTop: "-24px",
			marginBottom: "-24px"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-64 border-r border-border bg-surface-2 flex flex-col shrink-0 hidden md:flex",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: clear,
					className: "flex w-full items-center gap-2 rounded-lg bg-surface hover:bg-border px-3 py-2 text-sm font-medium text-foreground transition-colors border border-border shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " New chat"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-y-auto px-2 pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-2 pt-2 pb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
					children: "Recents"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-0.5",
					children: [sessions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => loadHistory(s.id),
						className: `flex w-full items-center rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${sessionId.current === s.id && tab === "chat" ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-surface"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: s.title
						})
					}, s.id)), sessions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-2 py-3 text-xs text-muted-foreground",
						children: "No recent chats"
					})]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 flex flex-col min-w-0 bg-background relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex shrink-0 items-center justify-between border-b border-border bg-background px-5 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/15 ring-1 ring-primary/30",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-primary" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "leading-none hidden sm:block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-foreground",
								children: "AI Mitra"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground",
								children: "Llama 3.2 · KrishiMitra"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:ml-2 flex items-center gap-0.5 rounded-lg border border-border bg-surface p-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setTab("chat"),
							className: `flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-all ${tab === "chat" ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3" }), " Chat"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setTab("disease"),
							className: `flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-all ${tab === "disease" ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Microscope, { className: "h-3 w-3" }), " Scan Leaf"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-1.5 md:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: clear,
						className: "flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:bg-surface-2 hover:text-foreground transition-colors",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
					})
				})]
			}), tab === "disease" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiseaseScanner, { token })
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto",
				children: isEmpty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full flex-col items-center justify-center px-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full max-w-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-10 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mx-auto mb-5 relative grid h-16 w-16 place-items-center rounded-2xl bg-primary/15 ring-1 ring-primary/30 shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-8 w-8 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary pulse-dot" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-2xl font-bold text-foreground",
									children: "How can I help your farm?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: "Ask anything about crops, soil, pests, budgets, weather, or schedules."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
							children: SUGGESTION_PROMPTS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => send(p.desc),
								className: "group flex items-start gap-3.5 rounded-2xl border border-border bg-surface p-4 text-left transition-all hover:border-foreground/20 hover:bg-surface-2 hover:shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-2xl shrink-0",
									children: p.icon
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-semibold text-foreground",
									children: p.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed",
									children: p.desc
								})] })]
							}, p.title))
						})]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto w-full max-w-3xl px-4 py-8",
					children: [messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Message, {
						msg: m,
						onEdit: handleEdit,
						onRetry: handleRetry
					}, m.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						ref: endRef,
						className: "h-4"
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "shrink-0 px-4 pb-5 pt-3 bg-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `relative flex flex-col rounded-3xl border bg-surface transition-all ${loading ? "border-foreground/20" : "border-border focus-within:border-foreground/30 focus-within:shadow-sm"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								ref: fileInputRef,
								hidden: true,
								accept: "image/*",
								onChange: handleFileChange
							}),
							attachedImage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-5 pt-4 pb-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative inline-block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: attachedImage,
										alt: "Attached",
										className: "h-20 w-20 object-cover rounded-xl border border-border"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setAttachedImage(null),
										className: "absolute -top-2 -right-2 bg-foreground text-background rounded-full p-1 shadow-md hover:scale-105 transition-transform",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								ref: textRef,
								value: input,
								onChange: (e) => {
									setInput(e.target.value);
									e.target.style.height = "auto";
									e.target.style.height = Math.min(e.target.scrollHeight, 200) + "px";
								},
								onKeyDown: (e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault();
										handleSend();
									}
								},
								placeholder: "Message AI Mitra...",
								disabled: loading,
								rows: 1,
								className: "w-full resize-none bg-transparent px-5 pt-4 pb-2 text-sm text-foreground placeholder:text-muted-foreground outline-none leading-7 max-h-52 disabled:opacity-60",
								style: { height: "44px" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between px-3 pb-3 pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex items-center gap-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: loading ? handleInterrupt : handleSend,
									disabled: !input.trim() && !attachedImage && !loading,
									className: `flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all ${loading ? "bg-foreground text-background hover:opacity-85" : input.trim() || attachedImage ? "bg-foreground text-background hover:opacity-85" : "bg-foreground/15 text-muted-foreground cursor-not-allowed"}`,
									children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "h-3.5 w-3.5 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3.5 w-3.5" })
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2.5 text-center text-[11px] text-muted-foreground/50",
						children: "AI Mitra may make mistakes. Verify important farming decisions with local experts."
					})]
				})
			})] })]
		})]
	});
}
//#endregion
export { AiSaathiPage as component };
