import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { Ct as ChevronRight, P as Plus, Tt as Check, _t as Clock, c as Timer, q as LoaderCircle, v as Sparkles, xt as CircleArrowRight, y as SkipForward } from "./_libs/lucide-react.mjs";
import { r as useAppData } from "./_ssr/router-SdgVeMQt.mjs";
import { r as PageHeader } from "./_ssr/AppShell-DC9lQJHx.mjs";
import { t as FarmSwitcher } from "./_ssr/FarmSwitcher-DCB_JGRk.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogDescription, t as Dialog } from "./_ssr/dialog-CbuAZmxp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.schedule-C5tO9Du9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var API_URL = typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api";
var priorityStyle = {
	high: "bg-destructive/12 text-destructive ring-1 ring-destructive/25",
	medium: "bg-warning/12 text-warning ring-1 ring-warning/25",
	low: "bg-cyan/12 text-cyan ring-1 ring-cyan/25"
};
var CATEGORIES = [
	"Irrigation",
	"Crop Health",
	"Nutrition",
	"Equipment",
	"Monitoring",
	"Labour",
	"Other"
];
var PRIORITIES = [
	"high",
	"medium",
	"low"
];
function SchedulePage() {
	const { activeFarmId, activeFarm, token, fetchScoped, postScoped } = useAppData();
	const [tasks, setTasks] = (0, import_react.useState)([]);
	const [isAddOpen, setIsAddOpen] = (0, import_react.useState)(false);
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [isShifting, setIsShifting] = (0, import_react.useState)(false);
	const [isSavingNote, setIsSavingNote] = (0, import_react.useState)(false);
	const [note, setNote] = (0, import_react.useState)("");
	const [recommendation, setRecommendation] = (0, import_react.useState)(null);
	const [formData, setFormData] = (0, import_react.useState)({
		title: "",
		date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
		time: "",
		category: "Irrigation",
		priority: "medium"
	});
	const toLocalISODate = (dateVal) => {
		const d = new Date(dateVal);
		const offset = d.getTimezoneOffset() * 6e4;
		return new Date(d.getTime() - offset).toISOString().split("T")[0];
	};
	const [selectedDateStr, setSelectedDateStr] = (0, import_react.useState)(() => toLocalISODate(/* @__PURE__ */ new Date()));
	const datesRibbon = (0, import_react.useMemo)(() => {
		const d = /* @__PURE__ */ new Date();
		d.setHours(0, 0, 0, 0);
		const arr = [];
		for (let i = -3; i <= 14; i++) {
			const nextD = new Date(d);
			nextD.setDate(d.getDate() + i);
			arr.push(nextD);
		}
		return arr;
	}, []);
	const tasksByDate = (0, import_react.useMemo)(() => {
		const groups = {};
		tasks.forEach((t) => {
			const dateStr = t.date ? toLocalISODate(t.date) : toLocalISODate(/* @__PURE__ */ new Date());
			if (!groups[dateStr]) groups[dateStr] = [];
			groups[dateStr].push(t);
		});
		return groups;
	}, [tasks]);
	const displayedTasks = tasksByDate[selectedDateStr] || [];
	const fetchTasks = (0, import_react.useCallback)(async () => {
		if (!activeFarmId || !token) return;
		try {
			const data = await fetchScoped("/schedule");
			setTasks(Array.isArray(data) ? data : []);
		} catch (err) {
			console.error(err);
		}
	}, [
		activeFarmId,
		token,
		fetchScoped
	]);
	(0, import_react.useEffect)(() => {
		fetchTasks();
	}, [fetchTasks]);
	(0, import_react.useEffect)(() => {
		const topTask = tasks.find((t) => t.status === "pending" && t.priority === "high") || tasks.find((t) => t.status === "pending");
		if (!topTask) return;
		fetch(`${API_URL}/crop_stage_tips`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				crop: topTask.title?.split("—")[1]?.trim() || "Soybean",
				stage: topTask.title?.split("—")[0]?.trim() || topTask.category
			})
		}).then((r) => r.json()).then((d) => {
			if (d.found && d.tips?.key_tasks?.length) setRecommendation({
				task: topTask.title,
				tip: d.tips.key_tasks[0],
				whyItMatters: d.tips.why_it_matters
			});
			else setRecommendation({
				task: topTask.title,
				tip: topTask.fieldNotes || null,
				whyItMatters: null
			});
		}).catch(() => {});
	}, [tasks.length]);
	const setStatus = async (id, status) => {
		setTasks((ts) => ts.map((t) => t._id === id || t.id === id ? {
			...t,
			status
		} : t));
		try {
			await fetch(`${API_URL}/schedule/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({ status })
			});
		} catch (err) {
			console.error("Failed to update task status:", err);
			toast.error("Could not update task status");
		}
	};
	const handleAddTask = async (e) => {
		e.preventDefault();
		if (!activeFarmId) return toast.error("Select a farm first");
		setIsSubmitting(true);
		try {
			let combinedDate = new Date(formData.date);
			if (formData.time) {
				const [hours, minutes] = formData.time.split(":");
				combinedDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
			}
			const res = await postScoped("/schedule", {
				title: formData.title,
				date: combinedDate.toISOString(),
				category: formData.category,
				priority: formData.priority,
				status: "pending"
			});
			if (res && res._id) {
				setIsAddOpen(false);
				setFormData({
					title: "",
					date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
					time: "",
					category: "Irrigation",
					priority: "medium"
				});
				fetchTasks();
				toast.success("Task added");
			} else toast.error("Failed to add task");
		} catch (err) {
			toast.error("Error adding task");
		} finally {
			setIsSubmitting(false);
		}
	};
	const handleShiftToday = async () => {
		if (!activeFarmId) return toast.error("Select a farm first");
		setIsShifting(true);
		try {
			const res = await postScoped("/schedule/shift-today/");
			if (res && res.message) {
				toast.success("Schedule shifted by 1 day");
				fetchTasks();
			} else toast.error("Failed to shift schedule");
		} catch (err) {
			toast.error("Error shifting schedule");
		} finally {
			setIsShifting(false);
		}
	};
	const handleSaveNote = async () => {
		if (!note.trim()) return;
		if (!activeFarmId) return toast.error("Select a farm first");
		setIsSavingNote(true);
		try {
			const res = await postScoped("/schedule", {
				title: `Field note: ${note.trim().slice(0, 80)}`,
				category: "Monitoring",
				priority: "low",
				status: "done",
				date: (/* @__PURE__ */ new Date()).toISOString()
			});
			if (res && res._id) {
				toast.success("Field note saved to schedule");
				setNote("");
				fetchTasks();
			} else toast.error("Failed to save note");
		} catch (err) {
			toast.error("Error saving note");
		} finally {
			setIsSavingNote(false);
		}
	};
	const done = displayedTasks.filter((t) => t.status === "done").length;
	const today = new Date(selectedDateStr).toLocaleDateString("en-IN", {
		weekday: "long",
		day: "numeric",
		month: "long"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			title: "Daily Schedule",
			subtitle: `${today} · ${done} of ${displayedTasks.length} tasks complete`,
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FarmSwitcher, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleShiftToday,
						disabled: isShifting,
						className: "flex items-center gap-1.5 rounded-xl border border-border bg-secondary/30 px-3 py-2 text-xs font-semibold text-secondary-foreground transition-all hover:bg-secondary/50 disabled:opacity-50",
						children: [isShifting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleArrowRight, { className: "h-3.5 w-3.5" }), "Shift Today"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setIsAddOpen(true),
						className: "flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-[0_0_24px_-8px_var(--color-primary)] transition-transform hover:scale-[1.03]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" }), " Add task"]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4 lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-full gap-3 overflow-x-auto pb-4 pt-1 scrollbar-hide snap-x",
					children: datesRibbon.map((d) => {
						const dateStr = toLocalISODate(d);
						const isSelected = dateStr === selectedDateStr;
						const dayTasks = tasksByDate[dateStr] || [];
						const hasSpray = dayTasks.some((t) => t.title.toLowerCase().includes("spray"));
						const hasRain = dayTasks.some((t) => t.title.toLowerCase().includes("rain"));
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setSelectedDateStr(dateStr),
							className: `flex w-[100px] shrink-0 snap-start flex-col items-center justify-center gap-1 rounded-[1.25rem] border p-3 transition-all ${isSelected ? "border-primary/50 bg-primary/10 text-primary" : "border-border/50 bg-secondary/20 text-muted-foreground hover:bg-secondary/40 hover:text-foreground"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[13px] font-semibold",
									children: d.toLocaleDateString("en-US", {
										weekday: "short",
										day: "numeric"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[10px] opacity-70",
									children: [
										dayTasks.length,
										" ",
										dayTasks.length === 1 ? "task" : "tasks"
									]
								}),
								(hasSpray || hasRain) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-[10px] font-medium text-warning",
									children: hasSpray ? "Spray day" : "Rain likely"
								})
							]
						}, dateStr);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2.5",
					children: displayedTasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass grid place-items-center rounded-2xl p-12 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-medium text-muted-foreground",
							children: "No tasks for today."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsAddOpen(true),
							className: "mt-3 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground",
							children: "Add your first task"
						})]
					}) : displayedTasks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `glass ring-glow rounded-2xl p-4 transition-opacity ${t.status === "done" || t.status === "skipped" ? "opacity-60" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 sm:flex sm:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 items-start gap-3 sm:flex-1 sm:items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setStatus(t._id || t.id, t.status === "done" ? "pending" : "done"),
									"aria-label": "Toggle done",
									className: `mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg border transition-all sm:mt-0 ${t.status === "done" ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary/50"}`,
									children: t.status === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `text-sm ${t.status === "done" ? "text-muted-foreground line-through" : "font-medium"}`,
										children: t.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-0.5 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3 w-3" }),
													" ",
													t.date ? new Date(t.date).toLocaleString(void 0, {
														month: "short",
														day: "numeric",
														hour: "2-digit",
														minute: "2-digit"
													}) : "—"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t.category }),
											t.status === "delayed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-warning",
												children: "· Delayed"
											}),
											t.status === "skipped" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-muted-foreground",
												children: "· Skipped"
											})
										]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex shrink-0 items-center gap-1.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest ${priorityStyle[t.priority] || "bg-secondary text-muted-foreground"}`,
									children: t.priority
								})
							})]
						}), t.status !== "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex gap-2 pl-9",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionBtn, {
									onClick: () => setStatus(t._id || t.id, "done"),
									icon: Check,
									label: "Done",
									tone: "primary"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionBtn, {
									onClick: () => setStatus(t._id || t.id, "delayed"),
									icon: Timer,
									label: "Delay",
									tone: "warning"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionBtn, {
									onClick: () => setStatus(t._id || t.id, "skipped"),
									icon: SkipForward,
									label: "Skip",
									tone: "muted"
								})
							]
						})]
					}, t._id || t.id))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass relative overflow-hidden rounded-2xl p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/15 blur-3xl" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xs font-semibold",
									children: "Next recommendation"
								})]
							}),
							recommendation?.tip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-[12px] leading-relaxed text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
										className: "text-foreground",
										children: [recommendation.task?.split("—")[0]?.trim() || "Top task", ":"]
									}),
									" ",
									recommendation.tip
								]
							}), recommendation.whyItMatters && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-[11px] italic text-muted-foreground/70",
								children: ["💡 ", recommendation.whyItMatters]
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[12px] leading-relaxed text-muted-foreground",
								children: displayedTasks.find((t) => t.status === "pending") ? `Complete your next pending task: ${displayedTasks.find((t) => t.status === "pending")?.title}` : "All tasks done for this day — great work! 🌾"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => window.location.href = "/ai-saathi",
								className: "mt-3 flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline",
								children: ["Ask AI Mitra for details ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-2xl p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xs font-semibold",
								children: "Notes"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: note,
								onChange: (e) => setNote(e.target.value),
								placeholder: "Add a field note for today… e.g. 'Row 6 showing slight yellowing near bund.'",
								rows: 4,
								className: "mt-2.5 w-full resize-none rounded-xl border border-input bg-secondary/40 p-3 text-xs outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/50"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleSaveNote,
								disabled: isSavingNote || !note.trim(),
								className: "mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-secondary py-2 text-[11px] font-semibold transition-colors hover:bg-primary hover:text-primary-foreground disabled:opacity-50",
								children: isSavingNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }), " Saving…"] }) : "Save note"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass rounded-2xl p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xs font-semibold",
								children: "Day's completion"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 h-2 overflow-hidden rounded-full bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-gradient-to-r from-primary to-cyan transition-all duration-500",
									style: { width: displayedTasks.length > 0 ? `${done / displayedTasks.length * 100}%` : "0%" }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 text-[11px] text-muted-foreground",
								children: [
									done,
									"/",
									displayedTasks.length,
									" complete · keep up the momentum!"
								]
							})
						]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: isAddOpen,
			onOpenChange: setIsAddOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "sm:max-w-[425px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Add Task" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Schedule a new farm task for today." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleAddTask,
					className: "grid gap-4 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-[11px] font-medium text-muted-foreground",
							children: "Task title"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							value: formData.title,
							onChange: (e) => setFormData({
								...formData,
								title: e.target.value
							}),
							className: "w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none focus:border-primary/50"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block text-[11px] font-medium text-muted-foreground",
								children: "Date"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "date",
								value: formData.date,
								onChange: (e) => setFormData({
									...formData,
									date: e.target.value
								}),
								className: "w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none focus:border-primary/50"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block text-[11px] font-medium text-muted-foreground",
								children: "Time"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "time",
								value: formData.time,
								onChange: (e) => setFormData({
									...formData,
									time: e.target.value
								}),
								className: "w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none focus:border-primary/50"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-[11px] font-medium text-muted-foreground",
							children: "Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: formData.category,
							onChange: (e) => setFormData({
								...formData,
								category: e.target.value
							}),
							className: "w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none focus:border-primary/50",
							children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c,
								children: c
							}, c))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1 block text-[11px] font-medium text-muted-foreground",
							children: "Priority"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: formData.priority,
							onChange: (e) => setFormData({
								...formData,
								priority: e.target.value
							}),
							className: "w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none focus:border-primary/50",
							children: PRIORITIES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: p,
								children: p.charAt(0).toUpperCase() + p.slice(1)
							}, p))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: isSubmitting,
							type: "submit",
							className: "w-full rounded-xl bg-primary py-2.5 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.02]",
							children: isSubmitting ? "Adding..." : "Add Task"
						})
					]
				})]
			})
		})
	] });
}
function ActionBtn({ onClick, icon: Icon, label, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: `flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-[10px] font-semibold text-muted-foreground transition-colors ${tone === "primary" ? "hover:border-primary/40 hover:text-primary" : tone === "warning" ? "hover:border-warning/40 hover:text-warning" : "hover:border-border hover:text-foreground"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3 w-3" }),
			" ",
			label
		]
	});
}
//#endregion
export { SchedulePage as component };
