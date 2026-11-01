export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    me: () => [...queryKeys.auth.all, "me"] as const,
  },
  repos: {
    all: ["repos"] as const,
    list: () => [...queryKeys.repos.all, "list"] as const,
    detail: (id: string) => [...queryKeys.repos.all, "detail", id] as const,
    status: (id: string) => [...queryKeys.repos.all, "status", id] as const,
  },
  chat: {
    all: ["chat"] as const,
    session: (repositoryId: string) =>
      [...queryKeys.chat.all, "session", repositoryId] as const,
    messages: (repositoryId: string) =>
      [...queryKeys.chat.all, "messages", repositoryId] as const,
  },
};
