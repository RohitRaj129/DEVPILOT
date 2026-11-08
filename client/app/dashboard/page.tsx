"use client";

import { RequireAuth } from "@/components/providers/require-auth";
import { AppShell } from "@/components/layout/app-shell";
import { RepoDashboard } from "./_components/repo-dashboard";
import { useRepos, useRefreshRepos, useStartIndexing } from "@/hooks/use-repos";

export default function DashboardPage() {
  const { data = [], isLoading, error } = useRepos();
  const refresh = useRefreshRepos();
  const start = useStartIndexing();

  return (
    <RequireAuth>
      <AppShell hideHeader>
        <RepoDashboard
          repos={data}
          isLoading={isLoading}
          error={error?.message}
          syncing={refresh.isPending}
          onSync={() => refresh.mutate()}
          onIndex={(id) => start.mutate(id)}
          indexingId={start.isPending ? start.variables : null}
        />
      </AppShell>
    </RequireAuth>
  );
}
