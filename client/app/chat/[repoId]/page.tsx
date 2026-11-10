import { RequireAuth } from "@/components/providers/require-auth";
import { Suspense, use } from "react";
import { ChatView } from "../_components/chat-view";

function ChatContent({ params }: { params: Promise<{ repoId: string }> }) {
  const { repoId } = use(params);

  return (
    <RequireAuth>
      <ChatView repoId={repoId} />
    </RequireAuth>
  );
}

export default function ChatPage({
  params,
}: {
  params: Promise<{ repoId: string }>;
}) {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <ChatContent params={params} />
    </Suspense>
  );
}
