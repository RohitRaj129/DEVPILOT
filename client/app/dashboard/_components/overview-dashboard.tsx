"use client";

import Link from "next/link";
import { Boxes, CheckCircle2, Database, Loader2, XCircle } from "lucide-react";
import type { Repo } from "./repo-card";
import { DashboardHeader } from "./dashboard-header";
import { LanguageIcon } from "./language-badge";
import { RepoStatus } from "./repo-status";

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
        <Icon className="size-4" />
        {label}
      </div>
      <p className="mt-3 text-3xl font-extrabold tabular-nums text-foreground">
        {value}
      </p>
    </div>
  );
}

export function OverviewDashboard({
  repos,
  onToggleSidebar,
}: {
  repos: Repo[];
  onToggleSidebar?: () => void;
}) {
  const count = (s: Repo["indexStatus"]) =>
    repos.filter((r) => r.indexStatus === s).length;
  const chunks = repos.reduce((n, r) => n + (r.chunkCount ?? 0), 0);
  const recent = repos
    .filter((r) => r.indexedAt)
    .sort((a, b) => +new Date(b.indexedAt!) - +new Date(a.indexedAt!))
    .slice(0, 5);

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <DashboardHeader
        title="Overview"
        subtitle="Index health across your repositories"
        onToggleSidebar={onToggleSidebar}
      />

      <main className="space-y-8 p-8">
        <section
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"
          aria-label="Totals"
        >
          <Stat icon={Boxes} label="Repositories" value={repos.length} />
          <Stat icon={CheckCircle2} label="Ready" value={count("READY")} />
          <Stat icon={Loader2} label="Indexing" value={count("INDEXING")} />
          <Stat icon={XCircle} label="Failed" value={count("FAILED")} />
          <Stat
            icon={Database}
            label="Chunks"
            value={chunks.toLocaleString()}
          />
        </section>

        <section>
          <h2 className="mb-3 text-base font-bold">Recently indexed</h2>
          {recent.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
              Nothing indexed yet. Open{" "}
              <Link
                href="/dashboard/repos"
                className="font-semibold text-rose-600 dark:text-rose-400 underline-offset-2 hover:underline"
              >
                Repositories
              </Link>{" "}
              and index one to start chatting with its code.
            </p>
          ) : (
            <ul className="divide-y divide-dashed divide-border rounded-2xl border border-border bg-card">
              {recent.map((r) => (
                <li key={r.id}>
                  <Link
                    href={`/dashboard/repos/${r.id}`}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted/50"
                  >
                    <LanguageIcon
                      language={r.language}
                      className="size-8 rounded-lg text-xs"
                    />
                    <span className="min-w-0 flex-1 truncate font-semibold">
                      {r.fullName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(r.indexedAt!).toLocaleDateString()}
                    </span>
                    <RepoStatus status={r.indexStatus} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
