import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { n as useAppData } from "./_ssr/AppDataContext-vZWx5SEf.mjs";
import { B as LogOut, C as Scale, R as MapPin, U as Leaf, V as Lock, i as User, j as Pencil, n as Wind, w as Save, y as ShieldCheck } from "./_libs/lucide-react.mjs";
import { r as PageHeader } from "./_ssr/AppShell-22kaeU-F.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app.profile-aGm04y1_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var modes = [
	{
		id: "organic",
		icon: Leaf,
		label: "Organic",
		desc: "Bio-inputs only. Plans avoid synthetic fertilizers and pesticides entirely."
	},
	{
		id: "moderate",
		icon: Scale,
		label: "Moderate",
		desc: "Balanced approach. Organic-first with targeted synthetic inputs when needed."
	},
	{
		id: "flexible",
		icon: Wind,
		label: "Flexible",
		desc: "Yield-optimized. AI freely recommends the most effective available inputs."
	}
];
function ProfileSettingsPage() {
	const { userProfile, farms, token, fetchDashboardData, logout } = useAppData();
	const [mode, setMode] = (0, import_react.useState)(userProfile?.farmingMode || "moderate");
	const [isEditing, setIsEditing] = (0, import_react.useState)(false);
	const [isSavingProfile, setIsSavingProfile] = (0, import_react.useState)(false);
	const [editForm, setEditForm] = (0, import_react.useState)({
		firstName: userProfile?.name?.split(" ")[0] || "",
		lastName: userProfile?.name?.split(" ").slice(1).join(" ") || ""
	});
	const [isChangingPassword, setIsChangingPassword] = (0, import_react.useState)(false);
	const [passwordForm, setPasswordForm] = (0, import_react.useState)({
		oldPassword: "",
		newPassword: "",
		confirmPassword: ""
	});
	const initials = userProfile?.name ? userProfile.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() : "—";
	const handleSaveProfile = async (e) => {
		e.preventDefault();
		setIsSavingProfile(true);
		try {
			if ((await fetch(`${typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api"}/auth/profile`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					firstName: editForm.firstName,
					lastName: editForm.lastName,
					farmingMode: mode
				})
			})).ok) {
				setIsEditing(false);
				fetchDashboardData();
				toast.success("Profile updated successfully");
			} else toast.error("Could not save profile changes.");
		} catch (err) {
			console.error(err);
			toast.error("An error occurred while saving profile.");
		} finally {
			setIsSavingProfile(false);
		}
	};
	const handleChangePassword = async (e) => {
		e.preventDefault();
		if (passwordForm.newPassword !== passwordForm.confirmPassword) {
			toast.error("New passwords do not match.");
			return;
		}
		if (passwordForm.newPassword.length < 6) {
			toast.error("New password must be at least 6 characters.");
			return;
		}
		setIsChangingPassword(true);
		try {
			const res = await fetch(`${typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api"}/auth/change-password`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					oldPassword: passwordForm.oldPassword,
					newPassword: passwordForm.newPassword
				})
			});
			const data = await res.json();
			if (res.ok) {
				toast.success("Password changed successfully!");
				setPasswordForm({
					oldPassword: "",
					newPassword: "",
					confirmPassword: ""
				});
			} else toast.error(data.message || "Failed to change password.");
		} catch (err) {
			console.error(err);
			toast.error("An error occurred.");
		} finally {
			setIsChangingPassword(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "Settings & Profile",
				subtitle: "Manage your identity, security, and farming preferences."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "glass rounded-3xl p-6 sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "Account Information"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 sm:flex sm:gap-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "glow-emerald grid h-18 w-18 shrink-0 place-items-center rounded-2xl bg-primary/15 font-display text-2xl font-bold text-primary ring-1 ring-primary/30",
								style: {
									height: "4.5rem",
									width: "4.5rem"
								},
								children: initials
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										id: "profile-form",
										onSubmit: handleSaveProfile,
										className: "flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: editForm.firstName,
											onChange: (e) => setEditForm({
												...editForm,
												firstName: e.target.value
											}),
											placeholder: "First name",
											className: "rounded-xl border border-input bg-secondary/40 px-3 py-2 text-sm outline-none focus:border-primary/50",
											required: true
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: editForm.lastName,
											onChange: (e) => setEditForm({
												...editForm,
												lastName: e.target.value
											}),
											placeholder: "Last name",
											className: "rounded-xl border border-input bg-secondary/40 px-3 py-2 text-sm outline-none focus:border-primary/50",
											required: true
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "truncate font-display text-xl font-bold",
										children: userProfile?.name || "Farmer"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: userProfile?.email || "No email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
												" ",
												farms[0]?.location?.address || "Location not set"
											]
										})]
									}),
									!isEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex flex-wrap gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "rounded-full bg-primary/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary ring-1 ring-primary/25",
											children: [mode, " mode"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "rounded-full bg-cyan/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-cyan ring-1 ring-cyan/25",
											children: [
												farms.length,
												" ",
												farms.length === 1 ? "farm" : "farms"
											]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 sm:mt-0 flex gap-2",
								children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setIsEditing(false),
									className: "rounded-xl border border-border px-4 py-2 text-sm text-muted-foreground hover:bg-secondary/50",
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									form: "profile-form",
									type: "submit",
									disabled: isSavingProfile,
									className: "flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }),
										" ",
										isSavingProfile ? "Saving..." : "Save"
									]
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setIsEditing(true),
									className: "flex items-center gap-1.5 rounded-xl border border-border bg-secondary/30 px-4 py-2 text-sm font-semibold transition-colors hover:border-primary/30 hover:bg-secondary/60",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" }), " Edit Profile"]
								})
							})
						]
					}),
					isEditing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 pt-6 border-t border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "mb-4 font-display text-sm font-semibold text-foreground",
							children: "Select Farming Preference Mode"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 sm:grid-cols-3",
							children: modes.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setMode(m.id),
								className: `rounded-2xl border p-5 text-left transition-all ${mode === m.id ? "border-primary/45 bg-primary/8 glow-emerald" : "glass hover:border-primary/25"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.icon, { className: `h-5 w-5 ${mode === m.id ? "text-primary" : "text-muted-foreground"}` }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `mt-3 font-display text-sm font-semibold ${mode === m.id ? "text-primary" : ""}`,
										children: m.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[11px] leading-relaxed text-muted-foreground",
										children: m.desc
									})
								]
							}, m.id))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "glass rounded-3xl p-6 sm:p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "Security"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleChangePassword,
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block text-xs font-medium text-muted-foreground",
								children: "Current Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									required: true,
									value: passwordForm.oldPassword,
									onChange: (e) => setPasswordForm({
										...passwordForm,
										oldPassword: e.target.value
									}),
									placeholder: "••••••••",
									className: "w-full rounded-xl border border-input bg-secondary/40 py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary/50"
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block text-xs font-medium text-muted-foreground",
								children: "New Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									required: true,
									minLength: 6,
									value: passwordForm.newPassword,
									onChange: (e) => setPasswordForm({
										...passwordForm,
										newPassword: e.target.value
									}),
									placeholder: "••••••••",
									className: "w-full rounded-xl border border-input bg-secondary/40 py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary/50"
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mb-1 block text-xs font-medium text-muted-foreground",
								children: "Confirm New Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									required: true,
									minLength: 6,
									value: passwordForm.confirmPassword,
									onChange: (e) => setPasswordForm({
										...passwordForm,
										confirmPassword: e.target.value
									}),
									placeholder: "••••••••",
									className: "w-full rounded-xl border border-input bg-secondary/40 py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary/50"
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: isChangingPassword,
								className: "mt-2 w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]",
								children: isChangingPassword ? "Updating..." : "Update Password"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "glass rounded-3xl p-6 sm:p-8 border border-destructive/20 bg-destructive/5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-5 w-5 text-destructive" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-semibold text-destructive",
								children: "Danger Zone"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-6 text-sm text-muted-foreground",
							children: "Sign out of your KrishiMitra account on this device. You will need to log back in to access your farm data."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: logout,
							className: "w-full rounded-xl border border-destructive bg-destructive/10 px-5 py-3 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/20",
							children: "Log Out Securely"
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { ProfileSettingsPage as component };
