import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { Dt as Bell, G as Leaf, H as LoaderCircle, I as MessageSquareText, J as Image, K as LayoutDashboard, L as Menu, P as Moon, S as Send, _ as Sparkles, _t as ChevronRight, ct as Copy, h as Square, i as User, nt as ExternalLink, o as TriangleAlert, p as Sun, t as X, ut as CloudSun, xt as ChartLine, yt as Check } from "../_libs/lucide-react.mjs";
import { i as useTheme, r as useAppData } from "./router-DcyHQImX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-DaKle9m-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function fmt(t) {
	return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\*\*(.*?)\*\*/g, `<strong class="font-semibold text-foreground">$1</strong>`).replace(/\*(.*?)\*/g, `<em class="italic">$1</em>`).replace(/`([^`]+)`/g, `<code class="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[0.82em] text-primary">$1</code>`).replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" class="text-primary underline underline-offset-2" target="_blank" rel="noopener">$1</a>`);
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
			if (!lang.startsWith("chart:") && lang !== "json:database-sync" && !(lang === "json" && raw.includes("\"cropPlan\""))) out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "my-2 overflow-hidden rounded-lg border border-border bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between border-b border-border bg-surface-2 px-3 py-1.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[10px] text-muted-foreground",
						children: lang || "code"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "overflow-x-auto p-3 text-[11.5px] leading-relaxed text-foreground font-mono",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: raw })
				})]
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
			const headers = rows[0].split("|").map((c) => c.trim()).filter(Boolean);
			const body = rows.slice(2).map((r) => r.split("|").map((c) => c.trim()).filter(Boolean));
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "my-2 overflow-x-auto rounded-lg border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-surface-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: headers.map((h, hi) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "border-b border-border px-2.5 py-1.5 text-left font-semibold text-foreground",
							children: h
						}, hi)) })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: body.map((row, ri) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "border-b border-border/60 last:border-0",
						children: row.map((cell, ci) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-2.5 py-1.5 text-foreground/90",
							children: cell
						}, ci))
					}, ri)) })]
				})
			}, i));
			continue;
		}
		if (line.startsWith("### ")) out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
			className: "mt-3 mb-1 flex items-center gap-1.5 text-[13px] font-semibold text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { dangerouslySetInnerHTML: { __html: fmt(line.slice(4)) } })]
		}, i));
		else if (line.startsWith("## ")) out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-3 mb-1.5 border-b border-border pb-1 text-sm font-bold text-foreground",
			dangerouslySetInnerHTML: { __html: fmt(line.slice(3)) }
		}, i));
		else if (line.startsWith("# ")) out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-3 mb-1.5 text-[15px] font-bold text-foreground",
			dangerouslySetInnerHTML: { __html: fmt(line.slice(2)) }
		}, i));
		else if (line.startsWith("> ")) out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
			className: "my-2 flex items-start gap-2 border-l-4 border-warning/50 bg-warning/5 py-1.5 pl-2.5 pr-2 rounded-r-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 h-3 w-3 shrink-0 text-warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-warning-foreground/80 italic",
				dangerouslySetInnerHTML: { __html: fmt(line.slice(2)) }
			})]
		}, i));
		else if (line.match(/^---+$/)) out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-2.5 border-border" }, i));
		else if (line.match(/^[\s]*[-*+] /)) {
			const items = [];
			while (i < lines.length && lines[i].match(/^[\s]*[-*+] /)) {
				items.push(lines[i].replace(/^\s*[-*+] /, ""));
				i++;
			}
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "my-1.5 space-y-1",
				children: items.map((it, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-[6px] h-1 w-1 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[13px] leading-relaxed text-foreground/90",
						dangerouslySetInnerHTML: { __html: fmt(it) }
					})]
				}, j))
			}, `ul${i}`));
			continue;
		} else if (line.match(/^\d+\. /)) {
			const items = [];
			while (i < lines.length && lines[i].match(/^\d+\. /)) {
				items.push(lines[i].replace(/^\d+\. /, ""));
				i++;
			}
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "my-1.5 space-y-1.5 list-none",
				children: items.map((it, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/12 text-[9px] font-bold text-primary mt-0.5",
						children: j + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[13px] leading-relaxed text-foreground/90",
						dangerouslySetInnerHTML: { __html: fmt(it) }
					})]
				}, j))
			}, `ol${i}`));
			continue;
		} else if (line.trim() === "") out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1.5" }, i));
		else out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[13px] leading-relaxed text-foreground/90",
			dangerouslySetInnerHTML: { __html: fmt(line) }
		}, i));
		i++;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-0.5",
		children: out
	});
}
function stripSyncBlock(text) {
	const syncRegex = /```(?:json:database-sync|json)\n([\s\S]*?"cropPlan"[\s\S]*?)\n```/;
	const hasPlan = syncRegex.test(text);
	return {
		text: hasPlan ? text.replace(syncRegex, "").trim() : text,
		hasPlan
	};
}
function ChatWidget({ isOpen, onClose }) {
	const { token } = useAppData();
	const [messages, setMessages] = (0, import_react.useState)([{
		role: "assistant",
		id: "welcome",
		text: "Namaste! I'm AI Mitra, your farming assistant. Ask me about crops, soil, pests, weather, or your farm's schedule."
	}]);
	const [input, setInput] = (0, import_react.useState)("");
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [copiedId, setCopiedId] = (0, import_react.useState)(null);
	const endRef = (0, import_react.useRef)(null);
	const abortRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
	const sendMessage = async (e) => {
		e.preventDefault();
		if (!input.trim() || isLoading) return;
		const userMessage = {
			role: "user",
			id: `u-${Date.now()}`,
			text: input
		};
		const aiMessage = {
			role: "assistant",
			text: "",
			isLoading: true,
			id: `a-${Date.now()}`
		};
		setMessages((prev) => [
			...prev,
			userMessage,
			aiMessage
		]);
		setInput("");
		setIsLoading(true);
		const controller = new AbortController();
		abortRef.current = controller;
		try {
			const apiBase = typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api";
			const res = await fetch(`${apiBase}/chat`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify({
					message: userMessage.text,
					sessionId: "session-1"
				}),
				signal: controller.signal
			});
			if (res.status === 401) throw new Error("Please log in with a real account to use AI Mitra.");
			if (!res.ok) throw new Error("Connection failed");
			const reader = res.body.getReader();
			const decoder = new TextDecoder("utf-8");
			let fullText = "";
			let buffer = "";
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				buffer += decoder.decode(value, { stream: true });
				const lines = buffer.split("\n");
				buffer = lines.pop() || "";
				for (const line of lines) {
					if (!line.startsWith("data: ")) continue;
					const dataStr = line.slice(6).trim();
					if (dataStr === "[DONE]") {
						setMessages((p) => p.map((m) => m.id === aiMessage.id ? {
							...m,
							isLoading: false
						} : m));
						continue;
					}
					try {
						const parsed = JSON.parse(dataStr);
						if (parsed.error) {
							fullText = parsed.error;
							setMessages((p) => p.map((m) => m.id === aiMessage.id ? {
								...m,
								text: fullText,
								isLoading: false
							} : m));
						} else if (parsed.chunk) {
							fullText += parsed.chunk;
							setMessages((p) => p.map((m) => m.id === aiMessage.id ? {
								...m,
								text: fullText,
								isLoading: false
							} : m));
						}
					} catch (e) {}
				}
			}
			setMessages((p) => p.map((m) => m.id === aiMessage.id ? {
				...m,
				isLoading: false
			} : m));
		} catch (err) {
			if (err.name === "AbortError") setMessages((p) => p.map((m) => m.id === aiMessage.id ? {
				...m,
				isLoading: false
			} : m));
			else setMessages((prev) => prev.map((m) => m.id === aiMessage.id ? {
				...m,
				text: err.message,
				isLoading: false
			} : m));
		} finally {
			setIsLoading(false);
		}
	};
	const handleInterrupt = () => abortRef.current?.abort();
	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;
		setMessages((prev) => [...prev, {
			role: "user",
			id: `u-img-${Date.now()}`,
			text: `📷 Uploaded image: ${file.name}`
		}]);
		setIsLoading(true);
		const formData = new FormData();
		formData.append("image", file);
		try {
			const apiBase = typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api";
			const res = await fetch(`${apiBase}/disease/predict`, {
				method: "POST",
				headers: { "Authorization": `Bearer ${token}` },
				body: formData
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Failed to analyze image");
			const reply = data.success === false || data.data?.fallback ? "The disease model is currently unavailable in this environment, so the scanner is running in demo mode. I can still help with general crop advice through chat." : `I analyzed the image. The detected crop disease is **${data.data.disease}** with a confidence of ${(data.data.confidence * 100).toFixed(1)}%.`;
			setMessages((prev) => [...prev, {
				role: "assistant",
				id: `a-img-${Date.now()}`,
				text: reply
			}]);
		} catch (err) {
			setMessages((prev) => [...prev, {
				role: "assistant",
				id: `a-err-${Date.now()}`,
				text: `Error analyzing image: ${err.message}`
			}]);
		} finally {
			setIsLoading(false);
			e.target.value = null;
		}
	};
	if (!isOpen) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed bottom-4 right-4 z-50 flex h-[560px] w-80 flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl sm:w-96",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex shrink-0 items-center justify-between border-b border-border bg-surface/80 px-4 py-3 backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/12 ring-1 ring-primary/25",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-primary ring-2 ring-background" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm font-bold leading-none text-foreground",
						children: "AI Mitra"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-[10px] text-muted-foreground",
						children: "KrishiMitra · Llama 3.1"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-y-auto bg-background px-3 py-3",
				children: [messages.map((msg) => {
					const { text, hasPlan } = msg.role === "assistant" ? stripSyncBlock(msg.text || "") : {
						text: msg.text,
						hasPlan: false
					};
					if (msg.role === "user") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 flex justify-end gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-w-[85%] rounded-2xl rounded-tr bg-primary px-3.5 py-2.5 text-[13px] leading-relaxed text-primary-foreground whitespace-pre-wrap",
							children: text
						})
					}, msg.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group mb-3 flex gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/12 ring-1 ring-primary/25",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-3 w-3 text-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								msg.isLoading && !text ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex w-fit items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: "Thinking..."
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { text }),
								hasPlan && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "/ai-saathi",
									className: "mt-2 flex items-center gap-1.5 rounded-lg border border-primary/20 bg-primary/5 px-2.5 py-2 text-xs font-medium text-primary hover:bg-primary/10 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-3.5 w-3.5" }),
										" A crop plan was proposed — open AI Saathi to save it",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "ml-auto h-3 w-3" })
									]
								}),
								!msg.isLoading && text && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										navigator.clipboard.writeText(text);
										setCopiedId(msg.id);
										setTimeout(() => setCopiedId(null), 1500);
									},
									className: "mt-1.5 flex items-center gap-1 rounded px-1.5 py-1 text-[10px] text-muted-foreground opacity-0 transition-opacity hover:bg-surface-2 hover:text-foreground group-hover:opacity-100",
									children: [copiedId === msg.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-3 w-3" }), copiedId === msg.id ? "Copied" : "Copy"]
								})
							]
						})]
					}, msg.id);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
				onSubmit: sendMessage,
				className: "shrink-0 border-t border-border bg-surface/60 p-3 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end gap-2 rounded-xl border border-border bg-background px-3 py-2 transition-all focus-within:border-primary/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "cursor-pointer rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground shrink-0",
							title: "Upload leaf image",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: "image/*",
								className: "hidden",
								onChange: handleImageUpload,
								disabled: isLoading
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: input,
							onChange: (e) => setInput(e.target.value),
							placeholder: "Ask about crops, soil, weather...",
							className: "flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground outline-none disabled:opacity-60",
							disabled: isLoading
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: isLoading ? "button" : "submit",
							onClick: isLoading ? handleInterrupt : void 0,
							disabled: !isLoading && !input.trim(),
							className: `flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all ${isLoading ? "bg-destructive/10 text-destructive hover:bg-destructive/20" : input.trim() ? "bg-primary text-primary-foreground hover:bg-primary-hover" : "bg-surface-2 text-muted-foreground cursor-not-allowed"}`,
							children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "h-3 w-3 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-3.5 w-3.5" })
						})
					]
				})
			})
		]
	});
}
function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: () => setTheme(theme === "light" ? "dark" : "light"),
		className: "relative rounded-xl border border-border p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
		"aria-label": "Toggle theme",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" })]
	});
}
var nav = [
	{
		label: "Dashboard",
		to: "/dashboard",
		icon: LayoutDashboard
	},
	{
		label: "Weather & Advisory",
		to: "/weather",
		icon: CloudSun
	},
	{
		label: "Market Prices",
		to: "/market",
		icon: ChartLine
	}
];
var secondaryNav = [{
	label: "Settings & Profile",
	to: "/profile",
	icon: User
}];
function BrandMark({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/15 ring-1 ring-primary/30",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-4.5 w-4.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary pulse-dot" })]
		}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "font-display text-lg font-bold tracking-tight text-foreground",
				children: ["Krishi", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-primary",
					children: "Mitra"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
				children: "Agri Intelligence"
			})]
		})]
	});
}
function SidebarContent({ onNavigate }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { farms, activeFarmId, setActiveFarmId, alerts = [], notifications = [] } = useAppData();
	const renderItem = (item) => {
		const active = pathname === item.to || pathname.startsWith(item.to + "/");
		if (item.highlight) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: item.to,
			onClick: onNavigate,
			className: `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all mb-1 ${active ? "bg-primary text-primary-foreground shadow-[0_0_20px_var(--color-primary)/40]" : "bg-primary/12 text-primary hover:bg-primary/20 border border-primary/25"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-4 w-4 shrink-0" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 flex-1 truncate",
					children: item.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5 shrink-0 opacity-70" })
			]
		}, item.to);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: item.to,
			onClick: onNavigate,
			className: `group relative flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium transition-all ${active ? "bg-primary/12 text-primary" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"}`,
			children: [
				active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: `h-4 w-4 shrink-0 transition-colors ${active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}` }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 flex-1 truncate",
					children: item.label
				}),
				(() => {
					let badgeVal = null;
					if (item.dynamicBadge === "alerts" && alerts.length > 0) badgeVal = alerts.length;
					if (item.dynamicBadge === "notifications") {
						const unread = notifications.filter((n) => !n.isRead).length;
						if (unread > 0) badgeVal = unread;
					}
					if (item.badge) badgeVal = item.badge;
					if (!badgeVal) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid h-5 min-w-5 place-items-center rounded-full bg-primary/15 px-1 text-[10px] font-semibold text-primary ring-1 ring-primary/25",
						children: badgeVal
					});
				})()
			]
		}, item.to);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-4 pb-4 pt-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/dashboard",
				onClick: onNavigate,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "flex-1 space-y-0.5 overflow-y-auto px-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-3 pb-1.5 pt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70",
					children: "Operations"
				}),
				nav.map(renderItem),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-3 pb-1.5 pt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/70",
					children: "Account"
				}),
				secondaryNav.map(renderItem)
			]
		})]
	});
}
function AppShell({ children }) {
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const [desktopSidebarOpen, setDesktopSidebarOpen] = (0, import_react.useState)(true);
	const [chatOpen, setChatOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { userProfile, activeFarm, alerts = [] } = useAppData();
	const current = [...nav, ...secondaryNav].find((n) => pathname === n.to || pathname.startsWith(n.to + "/"))?.label ?? "Dashboard";
	const unreadAlerts = alerts.filter((a) => a.severity !== "info").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen w-full bg-background",
		children: [
			desktopSidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "sticky top-0 hidden h-screen w-60 shrink-0 border-r border-sidebar-border bg-sidebar lg:block transition-all",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContent, {})
			}),
			mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-background/70 backdrop-blur-sm",
					onClick: () => setMobileOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "absolute left-0 top-0 h-full w-64 border-r border-sidebar-border bg-sidebar shadow-2xl animate-fade-up",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "absolute right-3 top-4 rounded-lg p-1.5 text-muted-foreground hover:bg-sidebar-accent",
						onClick: () => setMobileOpen(false),
						"aria-label": "Close menu",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SidebarContent, { onNavigate: () => setMobileOpen(false) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:flex sm:justify-between lg:px-7",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground lg:hidden",
									onClick: () => setMobileOpen(true),
									"aria-label": "Open menu",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "hidden rounded-lg border border-border p-2 text-muted-foreground hover:text-foreground lg:block transition-colors",
									onClick: () => setDesktopSidebarOpen(!desktopSidebarOpen),
									"aria-label": "Toggle sidebar",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate font-display text-sm font-semibold",
										children: current
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "hidden text-[11px] text-muted-foreground sm:block",
										suppressHydrationWarning: true,
										children: ["Kharif 2026 · ", activeFarm?.location?.address || "No farm selected"]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex shrink-0 items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/ai-saathi",
									className: "hidden items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 md:flex",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), "AI Assistant"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/alerts",
									className: "relative rounded-xl border border-border p-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-accent",
									"aria-label": "Alerts",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }), unreadAlerts > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-warning text-[9px] font-bold text-warning-foreground",
										children: unreadAlerts
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/profile",
									className: "flex items-center gap-2 rounded-xl border border-border py-1 pl-1 pr-1 transition-colors hover:border-primary/30 sm:pr-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-7 w-7 place-items-center rounded-lg bg-primary/15 text-xs font-bold text-primary ring-1 ring-primary/25",
										children: userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "U"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden text-xs font-medium sm:block",
										children: userProfile.name
									})]
								})
							]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "min-w-0 flex-1 px-4 py-6 lg:px-7",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setChatOpen(true),
				className: "fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform hover:scale-110",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquareText, { className: "h-6 w-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatWidget, {
				isOpen: chatOpen,
				onClose: () => setChatOpen(false)
			})
		]
	});
}
function PageHeader({ title, subtitle, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 sm:flex sm:flex-wrap sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "truncate font-display text-xl font-bold tracking-tight sm:text-2xl",
				children: title
			}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				suppressHydrationWarning: true,
				children: subtitle
			})]
		}), action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "shrink-0",
			children: action
		})]
	});
}
//#endregion
export { ThemeToggle as i, BrandMark as n, PageHeader as r, AppShell as t };
