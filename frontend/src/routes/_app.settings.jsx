import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, LogOut } from "lucide-react";
import { PageHeader } from "@/components/app/AppShell";
import { useAppData } from "@/lib/AppDataContext";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — KrishiMitra" },
      {
        name: "description",
        content: "Account, language, alert and system preferences for your KrishiMitra workspace.",
      },
    ],
  }),
  component: SettingsPage,
});

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={onChange}
      role="switch"
      aria-checked={on}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        on ? "bg-primary shadow-[0_0_14px_-4px_var(--color-primary)]" : "bg-secondary"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-foreground transition-all ${
          on ? "left-[calc(100%-1.375rem)]" : "left-0.5"
        }`}
      />
    </button>
  );
}

function SettingsPage() {
  const { logout, token, userProfile, fetchDashboardData } = useAppData();
  const [isSaving, setIsSaving] = useState(false);

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Settings" subtitle="Account, language, alerts and system preferences" />

      <div className="space-y-5">
        {/* Account */}
        <section className="glass rounded-2xl p-5">
          <div className="mb-4 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <h2 className="font-display text-sm font-semibold">Account</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] font-medium text-muted-foreground">Display name</label>
              <input id="settings-display-name" defaultValue={userProfile?.name || ""} className="w-full rounded-xl border border-input bg-secondary/40 px-3.5 py-2 text-sm outline-none transition-colors focus:border-primary/50" />
            </div>
          </div>
          <button
            onClick={async () => {
              setIsSaving(true);
              try {
                const fullName = document.getElementById("settings-display-name").value.trim().split(" ");
                const firstName = fullName[0] || "";
                const lastName = fullName.slice(1).join(" ") || "";
                
                const res = await fetch(`${import.meta.env.VITE_API_URL || (typeof window !== "undefined" ? `http://${window.location.hostname}:5001/api` : "http://localhost:5001/api")}/auth/me`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                  body: JSON.stringify({ firstName, lastName }),
                });

                if (res.ok) {
                  await fetchDashboardData();
                  toast.success('Settings saved successfully');
                } else {
                  toast.error('Failed to save settings');
                }
              } catch (err) {
                console.error(err);
                toast.error('An error occurred while saving');
              } finally { setIsSaving(false); }
            }}
            className="mt-4 rounded-xl bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            {isSaving ? 'Saving...' : 'Save changes'}
          </button>
        </section>



        <p className="pb-4 text-center text-[11px] text-muted-foreground">
          KrishiMitra v2.4 · Your digital agriculture companion
        </p>

        {/* Danger Zone */}
        <section className="glass rounded-2xl p-5 border-destructive/20">
          <div className="mb-4 flex items-center gap-2">
            <LogOut className="h-4 w-4 text-destructive" />
            <h2 className="font-display text-sm font-semibold text-destructive">Danger Zone</h2>
          </div>
          <p className="mb-4 text-xs text-muted-foreground">
            Sign out of your account on this device.
          </p>
          <button
            onClick={logout}
            className="rounded-xl border border-destructive bg-destructive/10 px-5 py-2 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/20"
          >
            Log out
          </button>
        </section>
      </div>
    </div>
  );
}
