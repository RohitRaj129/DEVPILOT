"use client";

export type IndexStatus = "PENDING" | "INDEXING" | "READY" | "FAILED";

const CONFIG: Record<IndexStatus, { label: string; className: string }> = {
  READY: {
    label: "Ready",
    className: "bg-rose-600 text-white border-transparent",
  },
  INDEXING: {
    label: "Indexing",
    className:
      "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
  },
  FAILED: {
    label: "Failed",
    className: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30",
  },
  PENDING: {
    label: "Not indexed",
    className: "bg-transparent text-foreground/80 border-border",
  },
};

export function statusLabel(status: IndexStatus) {
  return CONFIG[status].label;
}

export function RepoStatus({
  status,
  filesProcessed = 0,
  filesTotal = 0,
}: {
  status: IndexStatus;
  filesProcessed?: number;
  filesTotal?: number;
}) {
  const { label, className } = CONFIG[status];
  const pct =
    filesTotal > 0 ? Math.round((filesProcessed / filesTotal) * 100) : 0;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${className}`}
    >
      {status === "INDEXING" && (
        <span
          className="size-1.5 animate-pulse rounded-full bg-amber-500"
          aria-hidden
        />
      )}
      {label}
      {status === "INDEXING" && filesTotal > 0 && (
        <span className="tabular-nums">{pct}%</span>
      )}
    </span>
  );
}
