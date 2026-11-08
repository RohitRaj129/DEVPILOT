"use client";

import Link from "next/link";
import {
  ExternalLink,
  GitBranch,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { LanguageBadge, LanguageIcon } from "./language-badge";
import { RepoStatus, type IndexStatus } from "./repo-status";
import { IndexErrorAlert } from "./index-error-alert";

// Swap for the Repository type from "@/lib/api" if names match.
export type Repo = {
  id: string;
  owner: string;
  name: string;
  fullName: string;
  isPrivate: boolean;
  defaultBranch: string;
  language: string | null;
  htmlUrl: string | null;
  description: string | null;
  indexStatus: IndexStatus;
  indexedAt: string | null;
  chunkCount: number;
  filesTotal: number;
  filesProcessed: number;
  errorMessage: string | null;
};

const chip =
  "inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs font-semibold text-foreground/80";

export function RepoCard({
  repo,
  onIndex,
  indexing = false,
}: {
  repo: Repo;
  onIndex?: (id: string) => void;
  indexing?: boolean;
}) {
  const ready = repo.indexStatus === "READY";
  const busy = indexing || repo.indexStatus === "INDEXING";
  const canIndex =
    repo.indexStatus === "PENDING" || repo.indexStatus === "FAILED";
  const pct =
    repo.filesTotal > 0
      ? Math.round((repo.filesProcessed / repo.filesTotal) * 100)
      : 0;

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
      <div className="flex items-start gap-3 p-5 pb-4">
        <LanguageIcon language={repo.language} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-muted-foreground">
            {repo.owner}
          </p>
          <h3
            className="truncate text-lg font-extrabold text-foreground"
            title={repo.name}
          >
            {repo.name}
          </h3>
        </div>
        <RepoStatus
          status={repo.indexStatus}
          filesProcessed={repo.filesProcessed}
          filesTotal={repo.filesTotal}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 border-t border-dashed border-border p-5">
        <p className="line-clamp-2 min-h-10 text-sm text-foreground/80">
          {repo.description || "No description provided."}
        </p>

        {repo.indexStatus === "INDEXING" && (
          <div
            className="h-1.5 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-rose-600 transition-[width] duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        )}

        {repo.indexStatus === "FAILED" && (
          <IndexErrorAlert
            title="Indexing failed"
            message={repo.errorMessage}
          />
        )}

        <div className="flex flex-wrap items-center gap-2">
          <span className={chip}>
            <GitBranch className="size-3.5" />
            {repo.defaultBranch}
          </span>
          <LanguageBadge language={repo.language} />
          {ready && <span className={chip}>{repo.chunkCount} chunks</span>}
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-dashed border-border px-5 py-4">
        {repo.htmlUrl && (
          <a
            href={repo.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-semibold text-foreground hover:bg-muted focus-visible:outline focus-visible:outline-rose-500"
          >
            <ExternalLink className="size-4" />
            GitHub
          </a>
        )}

        <div className="ml-auto flex items-center gap-2">
          {ready && (
            <>
              <Link
                href={`/dashboard/repos/${repo.id}/chat`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted focus-visible:outline-2 focus-visible:outline-rose-500"
              >
                <MessageSquare className="size-4" />
                Chat
              </Link>
              <Link
                href={`/dashboard/repos/${repo.id}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3.5 py-2 text-sm font-bold text-white hover:bg-rose-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-rose-400"
              >
                Open
                <ArrowRight className="size-4" />
              </Link>
            </>
          )}

          {!ready && (
            <button
              onClick={() => onIndex?.(repo.id)}
              disabled={!canIndex || busy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3.5 py-2 text-sm font-bold text-white hover:bg-rose-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-rose-400 disabled:opacity-60"
            >
              {busy ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Sparkles className="size-4" />
              )}
              {repo.indexStatus === "FAILED"
                ? "Retry"
                : busy
                  ? "Indexing"
                  : "Index"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
