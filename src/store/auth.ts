import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { LoginResponse, UserFull } from "../lib/api/types";
import { queryClient } from "../lib/queryClient";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserFull | null;
  setSession: (tokens: LoginResponse, user: UserFull) => void;
  setUser: (user: UserFull) => void;
  setTokens: (tokens: LoginResponse) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      setSession: (tokens, user) => {
        // Wipe any cached queries from a previous session first — query keys
        // (e.g. ["me"]) aren't scoped per-user, so without this a fresh login
        // can briefly render with the previous account's cached data.
        queryClient.clear();
        set({
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          user,
        });
      },
      setUser: (user) => set({ user }),
      setTokens: (tokens) =>
        set({
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
        }),
      clear: () => {
        queryClient.clear();
        set({ accessToken: null, refreshToken: null, user: null });
      },
    }),
    { name: "irnitu-auth" },
  ),
);
