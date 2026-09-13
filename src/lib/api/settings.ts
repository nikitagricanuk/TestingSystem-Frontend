import { apiClient } from "./client";
import type { UserFull } from "./types";

export interface ProfileUpdatePayload {
  full_name?: string;
  age?: number | null;
  phone?: string;
  school?: { id: string } | null;
}

export async function updateProfile(payload: ProfileUpdatePayload): Promise<UserFull> {
  const res = await apiClient.patch<UserFull>("/auth/users/me", payload);
  return res.data;
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  await apiClient.post("/auth/users/me/password", {
    current_password: currentPassword,
    new_password: newPassword,
  });
}
