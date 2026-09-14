import { QueryClient } from "@tanstack/react-query";

// A single shared instance so code outside React components (the auth store,
// on login/logout) can clear cached query data directly — necessary because
// query keys aren't scoped per-user, so switching accounts within the same
// SPA session (no full page reload) would otherwise leave the previous
// user's cached data (e.g. ["me"]) visible until each query happens to
// refetch, which is wrong immediately and can misdirect one-shot logic like
// RoleHome's role-based redirect.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});
