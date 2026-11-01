"use client";

import { RequireAuth } from "@/components/providers/require-auth";
import { AppShell } from "@/components/layout/app-shell";

export default function DashboardPage() {
  return (
    <RequireAuth>
      <AppShell hideHeader>
        <div className="flex h-full w-full items-center justify-center">
          <h1 className="text-3xl font-bold">Welcome to DevPilot</h1>
        </div>
      </AppShell>
    </RequireAuth>
  );
}
