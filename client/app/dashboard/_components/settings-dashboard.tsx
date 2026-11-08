"use client";

import { LogOut, RefreshCw } from "lucide-react";
import { DashboardHeader } from "./dashboard-header";

export type SettingsUser = {
  githubUsername: string;
  displayName?: string | null;
  avatarUrl?: string | null;
};

function Row({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
      <div className="min-w-0">
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{hint}</p>
      </div>
      {children}
    </div>
  );
}

export function SettingsDashboard({
  user,
  onSync,
  syncing = false,
  onLogout,
  loggingOut = false,
  onToggleSidebar,
}: {
  user?: SettingsUser | null;
  onSync?: () => void;
  syncing?: boolean;
  onLogout?: () => void;
  loggingOut?: boolean;
  onToggleSidebar?: () => void;
}) {
  const btn =
    "inline-flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm font-bold text-foreground transition hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-500 disabled:opacity-60";

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <DashboardHeader
        title="Settings"
        subtitle="Account and GitHub connection"
        onToggleSidebar={onToggleSidebar}
      />

      <main className="max-w-2xl space-y-6 p-8">
        <section className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
          {user?.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.avatarUrl} alt="" className="size-14 rounded-full" />
          ) : (
            <span className="flex size-14 items-center justify-center rounded-full bg-muted text-lg font-extrabold">
              {user?.githubUsername?.[0]?.toUpperCase() ?? "?"}
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-lg font-extrabold">
              {user?.displayName || user?.githubUsername}
            </p>
            <p className="truncate text-sm text-muted-foreground">
              @{user?.githubUsername}
            </p>
          </div>
        </section>

        <section className="divide-y divide-dashed divide-border rounded-2xl border border-border bg-card">
          <Row
            title="Sync repositories"
            hint="Pull the latest repository list from GitHub."
          >
            <button onClick={onSync} disabled={syncing} className={btn}>
              <RefreshCw
                className={`size-4 ${syncing ? "animate-spin" : ""}`}
              />
              Sync
            </button>
          </Row>
          <Row title="Sign out" hint="Ends your session on this device.">
            <button onClick={onLogout} disabled={loggingOut} className={btn}>
              <LogOut className="size-4" />
              Sign out
            </button>
          </Row>
        </section>
      </main>
    </div>
  );
}
