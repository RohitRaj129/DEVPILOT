"use client";

import { useMemo, useState } from "react";
import { DashboardHeader } from "./dashboard-header";
import { IndexErrorAlert } from "./index-error-alert";
import { RepoCard, type Repo } from "./repo-card";
import { statusLabel, type IndexStatus } from "./repo-status";

type Visibility = "all" | "public" | "private";
type StatusFilter = "all" | IndexStatus;

const VISIBILITY: { value: Visibility; label: string }[] = [
  { value: "all", label: "All" },
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
];

const STATUSES: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "READY", label: statusLabel("READY") },
  { value: "INDEXING", label: statusLabel("INDEXING") },
  { value: "PENDING", label: "New" },
  { value: "FAILED", label: statusLabel("FAILED") },
];

function Pills<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex items-center gap-2" role="group" aria-label={label}>
      <span className="mr-1 text-sm font-semibold text-foreground/80">
        {label}
      </span>
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-rose-500 ${
            value === o.value
              ? "border-transparent bg-foreground text-background"
              : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function RepoDashboard({
  repos,
  isLoading = false,
  error,
  syncing = false,
  onSync,
  onIndex,
  indexingId,
  onToggleSidebar,
}: {
  repos: Repo[];
  isLoading?: boolean;
  error?: string | null;
  syncing?: boolean;
  onSync?: () => void;
  onIndex?: (id: string) => void;
  indexingId?: string | null;
  onToggleSidebar?: () => void;
}) {
  const [search, setSearch] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("all");
  const [status, setStatus] = useState<StatusFilter>("all");

  const readyCount = repos.filter((r) => r.indexStatus === "READY").length;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return repos.filter((r) => {
      if (
        q &&
        !r.fullName.toLowerCase().includes(q) &&
        !(r.description ?? "").toLowerCase().includes(q)
      )
        return false;
      if (visibility === "public" && r.isPrivate) return false;
      if (visibility === "private" && !r.isPrivate) return false;
      if (status !== "all" && r.indexStatus !== status) return false;
      return true;
    });
  }, [repos, search, visibility, status]);

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <DashboardHeader
        title="Repositories"
        subtitle={`${repos.length} connected · ${readyCount} ready`}
        search={search}
        onSearchChange={setSearch}
        onSync={onSync}
        syncing={syncing}
        onToggleSidebar={onToggleSidebar}
      />

      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-8 py-4">
        <Pills
          label="Visibility"
          options={VISIBILITY}
          value={visibility}
          onChange={setVisibility}
        />
        <Pills
          label="Status"
          options={STATUSES}
          value={status}
          onChange={setStatus}
        />
      </div>

      <main className="flex-1 p-8">
        {error && (
          <div className="mb-6">
            <IndexErrorAlert
              title="Couldn't load repositories"
              message={error}
              onRetry={onSync}
              retrying={syncing}
            />
          </div>
        )}

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-60 animate-pulse rounded-2xl border border-border bg-muted/40"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mx-auto mt-16 max-w-sm text-center">
            <p className="text-lg font-bold">
              {repos.length === 0
                ? "No repositories yet"
                : "No repositories match"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {repos.length === 0
                ? "Sync to import your repositories from GitHub."
                : "Clear the search or change a filter."}
            </p>
            {repos.length === 0 && onSync && (
              <button
                onClick={onSync}
                className="mt-4 rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white hover:bg-rose-500"
              >
                Sync from GitHub
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((r) => (
              <RepoCard
                key={r.id}
                repo={r}
                onIndex={onIndex}
                indexing={indexingId === r.id}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
