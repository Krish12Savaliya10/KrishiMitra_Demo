import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { N as Plus, r as Wallet, xt as CircleAlert } from "./_libs/lucide-react.mjs";
import { r as useAppData } from "./_ssr/router-DjYzLMk_.mjs";
import { r as PageHeader } from "./_ssr/AppShell-DJ1b3bto.mjs";
import { d as Pie, f as Cell, m as Tooltip, n as PieChart, p as ResponsiveContainer } from "./_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.expenses-r0VzvM9k.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COLORS = [
	"var(--color-chart-1)",
	"var(--color-chart-2)",
	"var(--color-chart-3)",
	"var(--color-chart-4)",
	"var(--color-chart-5)"
];
function ExpensesPage() {
	const { activeFarmId, token, fetchScoped, postScoped } = useAppData();
	const [expenses, setExpenses] = (0, import_react.useState)([]);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [expenseErrors, setExpenseErrors] = (0, import_react.useState)({});
	const [formData, setFormData] = (0, import_react.useState)({
		label: "",
		category: "seeds",
		amountRs: ""
	});
	const fetchExpenses = (0, import_react.useCallback)(async () => {
		if (!activeFarmId || !token) return;
		try {
			const data = await fetchScoped("/expenses");
			setExpenses(Array.isArray(data) ? data : []);
		} catch (err) {
			console.error(err);
		}
	}, [
		activeFarmId,
		token,
		fetchScoped
	]);
	(0, import_react.useEffect)(() => {
		fetchExpenses();
	}, [fetchExpenses]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!activeFarmId) return toast.error("Select a farm first");
		const newErrors = {};
		if (!formData.label.trim()) newErrors.label = "Description is required";
		if (!formData.amountRs) newErrors.amountRs = "Amount is required";
		else if (Number(formData.amountRs) <= 0) newErrors.amountRs = "Amount must be greater than 0";
		if (Object.keys(newErrors).length > 0) {
			setExpenseErrors(newErrors);
			return;
		}
		setExpenseErrors({});
		setIsSubmitting(true);
		try {
			const res = await postScoped("/expenses", {
				label: formData.label,
				category: formData.category,
				amountRs: Number(formData.amountRs)
			});
			if (res && res._id) {
				setFormData({
					label: "",
					category: "seeds",
					amountRs: ""
				});
				fetchExpenses();
				toast.success("Expense recorded");
			} else toast.error("Failed to add expense");
		} catch (err) {
			toast.error("Error adding expense");
		} finally {
			setIsSubmitting(false);
		}
	};
	const expenseByCategory = (0, import_react.useMemo)(() => {
		const cats = {};
		expenses.forEach((x) => {
			const cat = x.category || "other";
			cats[cat] = (cats[cat] || 0) + (x.amountRs || x.amount || 0);
		});
		return Object.entries(cats).map(([name, value]) => ({
			name: name.charAt(0).toUpperCase() + name.slice(1),
			value
		}));
	}, [expenses]);
	const total = expenseByCategory.reduce((s, c) => s + c.value, 0);
	const breakEven = 42300;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Expense Tracker",
			subtitle: `Kharif 2026 · ${activeFarmId ? "Active Farm" : "All Farms"} · ₹${total.toLocaleString("en-IN")} spent so far`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-5 grid gap-4 sm:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "glass hover-lift rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-[11px] uppercase tracking-widest text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-3.5 w-3.5 text-primary" }), " Season spend"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 font-display text-2xl font-bold",
						children: ["₹", total.toLocaleString("en-IN")]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 text-[11px] text-muted-foreground",
						children: [Math.round(total / breakEven * 100), "% of planned budget"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 h-1.5 overflow-hidden rounded-full bg-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-gradient-to-r from-primary to-cyan",
							style: { width: `${Math.min(total / breakEven * 100, 100)}%` }
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass hover-lift flex flex-col justify-center rounded-2xl p-5 lg:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground",
						children: "Quick add expense"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-[minmax(0,1fr)_140px_120px_auto]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: formData.label,
								onChange: (e) => {
									setFormData({
										...formData,
										label: e.target.value
									});
									if (expenseErrors.label) setExpenseErrors((p) => ({
										...p,
										label: ""
									}));
								},
								placeholder: "What did you spend on?",
								className: `w-full rounded-lg border bg-secondary/40 px-3 py-2 text-xs outline-none focus:border-primary/50 ${expenseErrors.label ? "border-destructive" : "border-input"}`
							}), expenseErrors.label && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 flex items-center gap-1 text-[11px] text-destructive",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }), expenseErrors.label]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: formData.category,
								onChange: (e) => setFormData({
									...formData,
									category: e.target.value
								}),
								className: "rounded-lg border border-input bg-secondary/40 px-3 py-2 text-xs outline-none focus:border-primary/50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "seeds",
										children: "Seeds"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "fertilizer",
										children: "Fertilizer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "pesticide",
										children: "Pesticide"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "labor",
										children: "Labor"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "irrigation",
										children: "Irrigation"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "equipment",
										children: "Equipment"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "transport",
										children: "Transport"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "other",
										children: "Other"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: formData.amountRs,
								onChange: (e) => {
									setFormData({
										...formData,
										amountRs: e.target.value
									});
									if (expenseErrors.amountRs) setExpenseErrors((p) => ({
										...p,
										amountRs: ""
									}));
								},
								placeholder: "₹ Amount",
								className: `w-full rounded-lg border bg-secondary/40 px-3 py-2 text-xs outline-none focus:border-primary/50 ${expenseErrors.amountRs ? "border-destructive" : "border-input"}`
							}), expenseErrors.amountRs && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 flex items-center gap-1 text-[11px] text-destructive",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }), expenseErrors.amountRs]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								disabled: isSubmitting,
								type: "submit",
								className: "flex items-center justify-center gap-1 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.03]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }),
									" ",
									isSubmitting ? "..." : "Add"
								]
							})
						]
					})]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass rounded-2xl p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-sm font-semibold",
						children: "Category breakdown"
					}),
					expenseByCategory.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-48 items-center justify-center text-xs text-muted-foreground",
						children: "No data yet"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto h-48 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
								data: expenseByCategory,
								dataKey: "value",
								nameKey: "name",
								innerRadius: 52,
								outerRadius: 75,
								paddingAngle: 3,
								strokeWidth: 0,
								children: expenseByCategory.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: COLORS[i % COLORS.length] }, i))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								formatter: (v) => `₹${v.toLocaleString("en-IN")}`,
								contentStyle: {
									background: "var(--color-popover)",
									border: "1px solid var(--color-border)",
									borderRadius: 12,
									fontSize: 12,
									color: "var(--color-popover-foreground)"
								},
								itemStyle: { color: "var(--color-popover-foreground)" }
							})] })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: expenseByCategory.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-2.5 w-2.5 shrink-0 rounded-sm",
									style: { background: COLORS[i % COLORS.length] }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0 flex-1 truncate text-muted-foreground",
									children: c.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-semibold",
									children: ["₹", c.value.toLocaleString("en-IN")]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "w-10 text-right text-[10px] text-muted-foreground",
									children: [total > 0 ? Math.round(c.value / total * 100) : 0, "%"]
								})
							]
						}, c.name))
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass rounded-2xl p-5 lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-sm font-semibold",
						children: "Recent expenses"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[11px] text-muted-foreground",
						children: [expenses.length, " records"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: expenses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid place-items-center rounded-xl border border-dashed border-border py-8 text-xs text-muted-foreground",
						children: "No expenses recorded yet. Use the quick-add form below!"
					}) : expenses.map((x) => {
						const d = new Date(x.date || x.createdAt || Date.now());
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ring-glow grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border bg-secondary/30 px-4 py-3 sm:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 items-center gap-3 sm:flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-secondary text-center text-[10px] font-bold text-muted-foreground",
									children: [
										d.getDate(),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										d.toLocaleString("default", { month: "short" })
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-xs font-medium",
										children: x.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[10px] text-muted-foreground",
										children: [
											d.toLocaleDateString(),
											" · ",
											x.category
										]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "shrink-0 text-right",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-sm font-bold",
									children: ["₹", (x.amountRs || x.amount || 0).toLocaleString("en-IN")]
								})
							})]
						}, x._id || x.id);
					})
				})]
			})]
		})
	] });
}
//#endregion
export { ExpensesPage as component };
