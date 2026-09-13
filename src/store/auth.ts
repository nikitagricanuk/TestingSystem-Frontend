import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { LoginResponse, UserFull } from "../lib/api/types";

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
      setSession: (tokens, user) =>
        set({
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          user,
        }),
      setUser: (user) => set({ user }),
      setTokens: (tokens) =>
        set({
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
        }),
      clear: () => set({ accessToken: null, refreshToken: null, user: null }),
    }),
    { name: "irnitu-auth" },
  ),
);
