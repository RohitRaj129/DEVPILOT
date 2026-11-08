"use client";

import { AlertTriangle, RotateCw } from "lucide-react";

export function IndexErrorAlert({
  message,
  title = "Something went wrong",
  onRetry,
  retrying = false,
}: {
  message?: string | null;
  title?: string;
  onRetry?: () => void;
  retrying?: boolean;
}) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm"
    >
      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-red-600 dark:text-red-400" />
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-red-700 dark:text-red-300">{title}</p>
        {message && (
          <p className="mt-0.5 wrap-break-word text-red-700/80 dark:text-red-700">
            {message}
          </p>
        )}
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          disabled={retrying}
          className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-semibold text-red-700 dark:text-red-200 transition hover:bg-red-500/10 focus-visible:outline-2 focus-visible:outline-rose-500 disabled:opacity-50"
        >
          <RotateCw className={`size-3.5 ${retrying ? "animate-spin" : ""}`} />
          Retry
        </button>
      )}
    </div>
  );
}
