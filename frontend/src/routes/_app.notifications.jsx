import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, CalendarClock, CheckCheck, Cpu, Settings2, Sparkles } from "lucide-react";
import { useAppData } from "@/lib/AppDataContext";
import { PageHeader } from "@/components/app/AppShell";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — KrishiMitra" },
      {
        name: "description",
        content:
          "Activity log and notification timeline: alerts, schedule changes and AI advisories.",
      },
    ],
  }),
  component: NotificationsPage,
});

const typeMeta = {
  alert: { icon: Bell, cls: "bg-warning/10 text-warning ring-1 ring-warning/25", label: "Alerts" },
  schedule: { icon: CalendarClock, cls: "bg-cyan/10 text-cyan ring-1 ring-cyan/25", label: "Schedule" },
  ai: { icon: Sparkles, cls: "bg-primary/10 text-primary ring-1 ring-primary/25", label: "AI Mitra" },
  system: { icon: Cpu, cls: "bg-secondary text-muted-foreground ring-1 ring-border", label: "System" },
};

function NotificationsPage() {
  const { notifications = [], setNotifications, patchRecord } = useAppData();
  const [filter, setFilter] = useState("all");
  const [markingAll, setMarkingAll] = useState(false);

  const unread = notifications.filter((i) => !i.isRead).length;

  const shown = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.isRead;
    return n.type === filter;
  });

  // Optimistic update — flip local state immediately, then persist to the
  // backend so the read state survives a refresh instead of resetting.
  const markRead = async (id) => {
    const target = notifications.find((n) => n._id === id);
    if (!target || target.isRead) return;
    setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)));
    try {
      await patchRecord(`/notifications/${id}`, { isRead: true });
    } catch (err) {
      setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, isRead: false } : n)));
      toast.error("Couldn't mark as read — try again.");
    }
  };

  const markAllRead = async () => {
    const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n._id);
    if (unreadIds.length === 0) return;
    setMarkingAll(true);
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    try {
      await Promise.all(unreadIds.map((id) => patchRecord(`/notifications/${id}`, { isRead: true })));
    } catch (err) {
      toast.error("Some notifications failed to update.");
    } finally {
      setMarkingAll(false);
    }
  };

  const typeCounts = notifications.reduce((acc, n) => {
    acc[n.type] = (acc[n.type] || 0) + 1;
    return acc;
  }, {});

  const filterTabs = ["all", "unread", ...Object.keys(typeMeta).filter((t) => typeCounts[t] > 0)];

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        title="Notifications & Activity"
        subtitle={`${unread} unread · full history of alerts, schedule changes and AI advisories`}
        action={
          <button
            onClick={markAllRead}
            disabled={markingAll || unread === 0}
            className="glass flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-colors hover:border-primary/30 disabled:opacity-50"
          >
            <CheckCheck className="h-3.5 w-3.5 text-primary" /> {markingAll ? "Marking..." : "Mark all read"}
          </button>
        }
      />

      {/* Filter tabs — all/unread plus one per notification type actually present */}
      <div className="mb-4 flex flex-wrap gap-2">
        {filterTabs.map((f) => {
          const meta = typeMeta[f];
          const count = f === "unread" ? unread : f === "all" ? notifications.length : typeCounts[f];
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-all ${
                filter === f
                  ? "bg-primary text-primary-foreground shadow-[0_0_18px_-6px_var(--color-primary)]"
                  : "border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {meta && <meta.icon className="h-3 w-3" />}
              {meta ? meta.label : f}
              {count > 0 && ` (${count})`}
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div className="relative space-y-3 pl-6">
        <span className="absolute bottom-4 left-[13px] top-4 w-px bg-border" />
        {shown.map((n) => {
          const meta = typeMeta[n.type] || typeMeta.system;
          const isRead = n.isRead;
          return (
            <button
              key={n._id || n.id}
              onClick={() => markRead(n._id)}
              className={`glass ring-glow relative block w-full rounded-2xl p-4 text-left transition-opacity ${
                isRead ? "opacity-65" : ""
              }`}
            >
              <span
                className={`absolute grid h-7 w-7 place-items-center rounded-full ${meta.cls}`}
                style={{ left: "-1.85rem", top: "1rem" }}
              >
                <meta.icon className="h-3.5 w-3.5" />
              </span>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className={`text-sm font-semibold ${isRead ? "text-foreground/80" : "text-foreground"}`}>
                    {n.title}
                  </div>
                  {n.message && n.message !== n.title && (
                    <div className="mt-1 text-[11px] text-muted-foreground">{n.message}</div>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {!isRead && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  <div className="text-[10px] text-muted-foreground">
                    {n.createdAt ? new Date(n.createdAt).toLocaleDateString() : ""}
                  </div>
                </div>
              </div>
            </button>
          );
        })}

        {shown.length === 0 && (
          <div className="glass grid place-items-center rounded-2xl p-10 text-center">
            <CheckCheck className="h-6 w-6 text-primary" />
            <div className="mt-2 text-sm font-medium">All caught up</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {filter === "all" ? "No notifications yet." : "Nothing in this filter right now."}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
        <Settings2 className="h-3 w-3" /> Manage notification preferences in Settings
      </div>
    </div>
  );
}
