"use client";

import { PanelLeft, RefreshCw, Search } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export function DashboardHeader({
  title,
  subtitle,
  search,
  onSearchChange,
  searchPlaceholder = "Search repositories…",
  onSync,
  syncing = false,
  onToggleSidebar,
}: {
  title: string;
  subtitle?: string;
  search?: string;
  onSearchChange?: (v: string) => void;
  searchPlaceholder?: string;
  onSync?: () => void;
  syncing?: boolean;
  onToggleSidebar?: () => void;
}) {
  return (
    <header className="flex flex-wrap items-center gap-4 border-b border-border px-8 py-5">
      {onToggleSidebar && (
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          className="rounded-lg p-2 text-foreground/80 hover:bg-muted focus-visible:outline focus-visible:outline-rose-500"
        >
          <PanelLeft className="size-5" />
        </button>
      )}

      <div className="min-w-0">
        <h1 className="text-xl font-extrabold tracking-tight text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>

      <div className="ml-auto flex items-center gap-2">
        {onSearchChange && (
          <label className="flex w-72 items-center gap-2 rounded-xl border border-dashed border-border bg-muted/30 px-3 py-2.5 focus-within:border-rose-500/60">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={search ?? ""}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </label>
        )}

        {onSync && (
          <button
            onClick={onSync}
            disabled={syncing}
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-4 py-2.5 text-sm font-bold text-foreground transition hover:bg-muted focus-visible:outline focus-visible:outline-rose-500 disabled:opacity-60"
          >
            <RefreshCw className={`size-4 ${syncing ? "animate-spin" : ""}`} />
            Sync
          </button>
        )}

        <AnimatedThemeToggler />
      </div>
    </header>
  );
}
