import { apiClient } from "./client";
import type { UserFull } from "./types";

export interface AdminStats {
  active_now: number;
  active_today: number;
  avg_score: number;
  total_finished_attempts: number;
}

export interface WeekdayLoad {
  weekday: number;
  label: string;
  count: number;
}

export interface RegionCount {
  region: string | null;
  count: number;
}

export interface AgeBucketCount {
  bucket: string;
  count: number;
}

export interface AdminDemographics {
  by_region: RegionCount[];
  by_age: AgeBucketCount[];
}

export async function fetchAdminStats(): Promise<AdminStats> {
  const res = await apiClient.get<AdminStats>("/admin/stats");
  return res.data;
}

export async function fetchAdminLoad(): Promise<WeekdayLoad[]> {
  const res = await apiClient.get<WeekdayLoad[]>("/admin/stats/load");
  return res.data;
}

export async function fetchAdminDemographics(): Promise<AdminDemographics> {
  const res = await apiClient.get<AdminDemographics>("/admin/stats/demographics");
  return res.data;
}

export async function listUsers(): Promise<UserFull[]> {
  const res = await apiClient.get<UserFull[]>("/auth/users");
  return res.data;
}

export interface UserUpdatePayload {
  full_name?: string;
  age?: number | null;
  phone?: string;
}

export async function updateUser(userId: string, payload: UserUpdatePayload): Promise<UserFull> {
  const res = await apiClient.patch<UserFull>(`/auth/users/${userId}`, payload);
  return res.data;
}

export async function deleteUser(userId: string): Promise<void> {
  await apiClient.delete(`/auth/users/${userId}`);
}
