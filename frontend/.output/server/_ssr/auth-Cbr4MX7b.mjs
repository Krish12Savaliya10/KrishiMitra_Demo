import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { F as Phone, K as Lock, Ot as ChartColumn, Rt as ArrowRight, St as CircleAlert, U as MapPin, W as Mail, a as UserRound, at as Eye, bt as CircleCheck, ot as EyeOff, x as ShieldCheck } from "../_libs/lucide-react.mjs";
import { r as useAppData } from "./router-SdgVeMQt.mjs";
import { i as ThemeToggle, n as BrandMark } from "./AppShell-DC9lQJHx.mjs";
import { n as GoogleOAuthProvider, t as GoogleLogin } from "../_libs/react-oauth__google.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-Cbr4MX7b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var validators = {
	firstName: (v) => !v.trim() ? "First name is required" : v.trim().length < 2 ? "Must be at least 2 characters" : "",
	lastName: (v) => !v.trim() ? "Last name is required" : "",
	email: (v) => !v.trim() ? "Email is required" : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Enter a valid email address" : "",
	phone: (v) => v && !/^\+?[\d\s\-()]{8,15}$/.test(v) ? "Enter a valid phone number" : "",
	password: (v) => {
		if (!v) return "Password is required";
		if (v.length < 8) return "Password must be at least 8 characters";
		if (!/[A-Z]/.test(v)) return "Include at least one uppercase letter";
		if (!/[0-9]/.test(v)) return "Include at least one number";
		return "";
	},
	location: (v) => !v.trim() ? "Please enter or detect your farm location" : ""
};
function getPasswordStrength(pw) {
	if (!pw) return {
		score: 0,
		label: "",
		color: ""
	};
	let score = 0;
	if (pw.length >= 8) score++;
	if (pw.length >= 12) score++;
	if (/[A-Z]/.test(pw)) score++;
	if (/[0-9]/.test(pw)) score++;
	if (/[^A-Za-z0-9]/.test(pw)) score++;
	return {
		score,
		label: [
			"",
			"Weak",
			"Fair",
			"Good",
			"Strong",
			"Very Strong"
		][score] || "",
		color: [
			"",
			"bg-destructive",
			"bg-warning",
			"bg-warning",
			"bg-primary",
			"bg-primary"
		][score] || ""
	};
}
function AuthPage() {
	const [mode, setMode] = (0, import_react.useState)("login");
	const [step, setStep] = (0, import_react.useState)(1);
	const navigate = useNavigate();
	const { login } = useAppData();
	const [forgotPasswordEmail, setForgotPasswordEmail] = (0, import_react.useState)("");
	const [forgotPasswordSent, setForgotPasswordSent] = (0, import_react.useState)(false);
	const [forgotError, setForgotError] = (0, import_react.useState)("");
	const [isLocating, setIsLocating] = (0, import_react.useState)(false);
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [apiError, setApiError] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [formData, setFormData] = (0, import_react.useState)({
		firstName: "",
		lastName: "",
		phone: "",
		role: "farmer",
		email: "",
		password: "",
		location: "",
		waterResources: []
	});
	const clearFieldError = (name) => setErrors((prev) => {
		const n = { ...prev };
		delete n[name];
		return n;
	});
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
		if (errors[name]) clearFieldError(name);
		setApiError("");
	};
	const validateStep1 = () => {
		const newErrors = {};
		[
			"firstName",
			"lastName",
			"email",
			"password"
		].forEach((f) => {
			const msg = validators[f]?.(formData[f]);
			if (msg) newErrors[f] = msg;
		});
		if (formData.phone) {
			const pMsg = validators.phone(formData.phone);
			if (pMsg) newErrors.phone = pMsg;
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};
	const validateStep2 = () => {
		const msg = validators.location(formData.location);
		if (msg) {
			setErrors((prev) => ({
				...prev,
				location: msg
			}));
			return false;
		}
		clearFieldError("location");
		return true;
	};
	const validateLogin = () => {
		const newErrors = {};
		const emailMsg = validators.email(formData.email);
		if (emailMsg) newErrors.email = emailMsg;
		if (!formData.password) newErrors.password = "Password is required";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};
	const handleUseCurrentLocation = () => {
		if (!navigator.geolocation) {
			setErrors((prev) => ({
				...prev,
				location: "Geolocation is not supported by your browser"
			}));
			return;
		}
		setIsLocating(true);
		clearFieldError("location");
		navigator.geolocation.getCurrentPosition(async (position) => {
			try {
				const { latitude, longitude } = position.coords;
				const data = await (await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)).json();
				if (data && data.address) {
					const city = data.address.city || data.address.town || data.address.village || "";
					const state = data.address.state || "";
					setFormData((prev) => ({
						...prev,
						location: [city, state].filter(Boolean).join(", ")
					}));
					clearFieldError("location");
				}
			} catch {
				setErrors((prev) => ({
					...prev,
					location: "Failed to fetch location. Please enter manually."
				}));
			} finally {
				setIsLocating(false);
			}
		}, () => {
			setIsLocating(false);
			setErrors((prev) => ({
				...prev,
				location: "Location access denied. Please enter manually."
			}));
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setApiError("");
		const API_URL = typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api";
		if (mode === "login") {
			if (!validateLogin()) return;
			try {
				const res = await fetch(`${API_URL}/auth/login`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email: formData.email,
						password: formData.password
					})
				});
				const data = await res.json();
				if (!res.ok) throw new Error(data.message || "Login failed");
				login(data.token);
				navigate({ to: "/dashboard" });
			} catch (err) {
				setApiError(err.message);
			}
			return;
		}
		if (step === 1) {
			if (!validateStep1()) return;
			setStep(2);
			return;
		}
		if (!validateStep2()) return;
		try {
			const payload = {
				firstName: formData.firstName,
				lastName: formData.lastName,
				phone: formData.phone || Math.random().toString().slice(2, 12),
				email: formData.email,
				password: formData.password,
				role: formData.role,
				location: formData.location || "Pune, Maharashtra",
				waterResources: formData.waterResources.length > 0 ? formData.waterResources : ["Borewell"]
			};
			const res = await fetch(`${API_URL}/auth/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Registration failed");
			login(data.token);
			navigate({ to: "/farms" });
		} catch (err) {
			setApiError(err.message);
		}
	};
	const handleGoogleSuccess = async (credentialResponse) => {
		setApiError("");
		const API_URL = typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api";
		try {
			const res = await fetch(`${API_URL}/auth/google`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ credential: credentialResponse.credential })
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || "Google login failed");
			login(data.token);
			navigate({ to: "/dashboard" });
		} catch (err) {
			setApiError(err.message);
		}
	};
	const handleForgotPasswordSubmit = async (e) => {
		e.preventDefault();
		setForgotError("");
		if (!forgotPasswordEmail.trim()) {
			setForgotError("Email is required");
			return;
		}
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotPasswordEmail)) {
			setForgotError("Enter a valid email address");
			return;
		}
		const API_URL = typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api";
		try {
			const res = await fetch(`${API_URL}/auth/forgot-password`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: forgotPasswordEmail })
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message);
			setForgotPasswordSent(true);
		} catch (err) {
			setForgotError(err.message);
		}
	};
	const pwStrength = getPasswordStrength(formData.password);
	const renderStep = () => {
		if (mode === "forgot-password") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold",
				children: "Reset Password"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mt-1",
				children: "Enter your email address and we'll send you a link to reset your password."
			})]
		}), forgotPasswordSent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-primary/20 bg-primary/5 p-4 mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-primary font-semibold mb-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), " Email Sent"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Check your inbox for the reset link."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "mb-1.5 block text-xs font-medium text-foreground",
				children: "Email address"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `flex items-center gap-2.5 rounded-xl border px-3.5 py-3 transition-all bg-background/50 focus-within:ring-2 focus-within:ring-primary/20 ${forgotError ? "border-destructive" : "border-input focus-within:border-primary/50"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: `h-4 w-4 shrink-0 ${forgotError ? "text-destructive" : "text-muted-foreground"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "email",
					value: forgotPasswordEmail,
					onChange: (e) => {
						setForgotPasswordEmail(e.target.value);
						setForgotError("");
					},
					placeholder: "you@example.com",
					className: "w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
				})]
			}),
			forgotError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 flex items-center gap-1 text-[11px] text-destructive",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }),
					" ",
					forgotError
				]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setMode("login"),
				className: "flex-1 rounded-xl border border-border py-2.5 text-sm font-medium hover:bg-secondary/20",
				children: "Back"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: handleForgotPasswordSubmit,
				className: "flex-1 rounded-xl bg-primary py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90",
				children: "Send Link"
			})]
		})] })] });
		if (mode === "login") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				icon: Mail,
				label: "Email address",
				name: "email",
				placeholder: "you@example.com",
				type: "email",
				value: formData.email,
				onChange: handleInputChange,
				error: errors.email
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
				label: "Password",
				name: "password",
				value: formData.password,
				onChange: handleInputChange,
				error: errors.password,
				show: showPassword,
				onToggleShow: () => setShowPassword((p) => !p)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-right",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMode("forgot-password"),
					className: "text-xs font-medium text-primary hover:underline",
					children: "Forgot your password?"
				})
			})
		] });
		if (step === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					icon: UserRound,
					label: "First name",
					name: "firstName",
					placeholder: "Ramesh",
					type: "text",
					value: formData.firstName,
					onChange: handleInputChange,
					error: errors.firstName
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					icon: UserRound,
					label: "Last name",
					name: "lastName",
					placeholder: "Patil",
					type: "text",
					value: formData.lastName,
					onChange: handleInputChange,
					error: errors.lastName
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				icon: Phone,
				label: "Mobile number (optional)",
				name: "phone",
				placeholder: "+91 98765 43210",
				type: "tel",
				value: formData.phone,
				onChange: handleInputChange,
				error: errors.phone
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				icon: Mail,
				label: "Email address",
				name: "email",
				placeholder: "you@example.com",
				type: "email",
				value: formData.email,
				onChange: handleInputChange,
				error: errors.email
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordField, {
				label: "Password",
				name: "password",
				value: formData.password,
				onChange: handleInputChange,
				error: errors.password,
				show: showPassword,
				onToggleShow: () => setShowPassword((p) => !p)
			}),
			formData.password && !errors.password && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-1",
				children: [
					1,
					2,
					3,
					4,
					5
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-1 flex-1 rounded-full transition-all ${i <= pwStrength.score ? pwStrength.color : "bg-secondary"}` }, i))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-[10px] text-muted-foreground",
				children: ["Password strength: ", pwStrength.label]
			})] })
		] });
		if (step === 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "animate-fade-up space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-primary/20 bg-primary/5 p-4 mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-primary font-semibold mb-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }), " Farm Location"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Providing your location allows KrishiMitra to fetch hyper-local weather predictions and precise soil data for your farm."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: handleUseCurrentLocation,
						disabled: isLocating,
						className: "flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/10 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/20 disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }), isLocating ? "Locating..." : "Use my current location"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 flex items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full border-t border-border" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative flex justify-center text-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-card px-2 text-muted-foreground",
								children: "Or enter manually"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-1.5 block text-xs font-medium text-foreground",
							children: "City or Region"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex items-center gap-2.5 rounded-xl border px-3.5 py-3 transition-all bg-background/50 focus-within:ring-2 focus-within:ring-primary/20 ${errors.location ? "border-destructive focus-within:border-destructive" : "border-input focus-within:border-primary/50 focus-within:bg-background"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: `h-4 w-4 shrink-0 ${errors.location ? "text-destructive" : "text-muted-foreground"}` }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									name: "location",
									value: formData.location,
									onChange: handleInputChange,
									placeholder: "e.g. Pune, Maharashtra",
									className: "w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
								}),
								formData.location && !errors.location && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 shrink-0 text-primary" }),
								errors.location && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 shrink-0 text-destructive" })
							]
						}),
						errors.location && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 flex items-center gap-1 text-[11px] text-destructive",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3" }),
								" ",
								errors.location
							]
						})
					] })
				]
			})]
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-screen bg-background lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hero-ambient relative flex flex-col px-5 py-6 sm:px-10 h-[100dvh] overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "w-fit",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-1 items-center justify-center py-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md",
					children: [mode === "register" && step > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setStep(step - 1),
						className: "mb-4 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1",
						children: "← Back"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-strong rounded-3xl p-7 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-2xl font-bold tracking-tight text-foreground",
								children: mode === "login" ? "Welcome back" : step === 1 ? "Create your account" : "Set Farm Location"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm text-muted-foreground",
								children: mode === "login" ? "Sign in to your farm intelligence dashboard." : step === 1 ? "Start smart planning for your farm in minutes." : "Where is your farm located?"
							}),
							mode === "login" || step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 grid grid-cols-2 rounded-xl border border-border bg-secondary/40 p-1 text-sm font-medium",
								children: ["login", "register"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setMode(m);
										setStep(1);
										setErrors({});
										setApiError("");
									},
									className: `rounded-lg py-2 transition-all ${mode === m ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"}`,
									children: m === "login" ? "Sign in" : "Register"
								}, m))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 flex items-center gap-2 mb-2",
								children: [1, 2].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-1.5 rounded-full flex-1 transition-all ${step >= s ? "bg-primary" : "bg-primary/20"}` }, s))
							}),
							apiError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 mt-0.5 shrink-0" }), apiError]
							}),
							mode !== "forgot-password" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "mt-6 space-y-4",
								onSubmit: handleSubmit,
								children: [renderStep(), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									className: "group flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 mt-6 text-sm font-bold text-primary-foreground shadow-[0_0_28px_-8px_var(--color-primary)] transition-transform hover:scale-[1.02]",
									children: [mode === "login" ? "Sign in to dashboard" : step < 2 ? "Continue" : "Complete Registration", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })]
								})]
							}),
							mode === "forgot-password" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 space-y-4",
								children: renderStep()
							}),
							(mode === "login" || step === 1) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mt-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 flex items-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full border-t border-border" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative flex justify-center text-xs",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bg-card px-2 text-muted-foreground",
										children: "Or continue with"
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 flex justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleOAuthProvider, {
									clientId: "123456789-mock.apps.googleusercontent.com",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleLogin, {
										onSuccess: handleGoogleSuccess,
										onError: () => setApiError("Google login failed. Please try again."),
										theme: "outline",
										size: "large",
										text: mode === "login" ? "signin_with" : "signup_with",
										shape: "rectangular",
										width: "340"
									})
								})
							})] }),
							mode === "login" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-6 text-center text-xs text-muted-foreground",
								children: [
									"Don't have an account?",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "font-semibold text-primary hover:underline",
										onClick: () => {
											setMode("register");
											setErrors({});
											setApiError("");
										},
										children: "Create one free"
									})
								]
							}),
							mode === "register" && step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-6 text-center text-xs text-muted-foreground",
								children: [
									"Already have an account?",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "font-semibold text-primary hover:underline",
										onClick: () => {
											setMode("login");
											setErrors({});
											setApiError("");
										},
										children: "Sign in"
									})
								]
							})
						]
					})]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative hidden overflow-hidden border-l border-border lg:block bg-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/auth-farm.png",
					alt: "Aerial view of precision agriculture fields with data overlays",
					loading: "lazy",
					className: "absolute inset-0 h-full w-full object-cover opacity-90"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-12 right-12 hidden xl:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "glass float-slow w-fit rounded-2xl px-5 py-4 shadow-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-5 w-5 text-primary" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase tracking-widest text-muted-foreground",
								children: "Projected Yield"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-0.5 text-lg font-bold text-foreground",
								children: ["14,250 ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-normal text-muted-foreground",
									children: "kg/ha"
								})]
							})] })]
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-12 left-12 right-12 flex flex-col items-start gap-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-strong float-slow-delayed w-fit rounded-2xl px-5 py-4 shadow-xl border-t border-primary/20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5 mb-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] uppercase tracking-widest text-primary font-bold",
									children: "Smart Advisory Active"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-semibold text-foreground",
								children: "Optimal irrigation window"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground mt-0.5",
								children: "6:00 AM - 9:00 AM Tomorrow"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "max-w-xl font-display text-4xl font-bold leading-tight tracking-tight text-foreground",
						children: [
							"Your farm's data, ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							" working ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary italic pr-2",
								children: "for you."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-md text-base text-muted-foreground",
						children: "Soil, weather, equipment, and market intelligence — beautifully unified into one proactive plan."
					})] })]
				})
			]
		})]
	});
}
function Field({ icon: Icon, label, name, value, onChange, placeholder, type, error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: "mb-1.5 block text-xs font-medium text-foreground",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `flex items-center gap-2.5 rounded-xl border px-3.5 py-3 transition-all bg-background/50 focus-within:ring-2 focus-within:ring-primary/20 ${error ? "border-destructive focus-within:border-destructive" : "border-input focus-within:border-primary/50 focus-within:bg-background"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4 w-4 shrink-0 ${error ? "text-destructive" : "text-muted-foreground"}` }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type,
					name,
					value,
					onChange,
					placeholder,
					className: "w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 shrink-0 text-destructive" })
			]
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 flex items-center gap-1 text-[11px] text-destructive",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3 shrink-0" }),
				" ",
				error
			]
		})
	] });
}
function PasswordField({ label, name, value, onChange, error, show, onToggleShow }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
			className: "mb-1.5 block text-xs font-medium text-foreground",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `flex items-center gap-2.5 rounded-xl border px-3.5 py-3 transition-all bg-background/50 focus-within:ring-2 focus-within:ring-primary/20 ${error ? "border-destructive focus-within:border-destructive" : "border-input focus-within:border-primary/50 focus-within:bg-background"}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: `h-4 w-4 shrink-0 ${error ? "text-destructive" : "text-muted-foreground"}` }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: show ? "text" : "password",
					name,
					value,
					onChange,
					placeholder: "••••••••",
					className: "w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onToggleShow,
					className: "shrink-0 text-muted-foreground hover:text-foreground",
					children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
				})
			]
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 flex items-center gap-1 text-[11px] text-destructive",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3 w-3 shrink-0" }),
				" ",
				error
			]
		})
	] });
}
//#endregion
export { AuthPage as component };
