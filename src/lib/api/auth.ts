import { apiClient } from "./client";
import type { LoginResponse, UserFull } from "./types";

export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await apiClient.post<LoginResponse>("/auth/login", { email, password });
  return res.data;
}

export async function loginAsGuest(): Promise<LoginResponse> {
  const res = await apiClient.post<LoginResponse>("/auth/guest");
  return res.data;
}

export async function logout(refreshToken: string): Promise<void> {
  await apiClient.post("/auth/logout", { refresh_token: refreshToken });
}

export async function fetchCurrentUser(): Promise<UserFull> {
  const res = await apiClient.get<UserFull>("/auth/users/me");
  return res.data;
}

export interface SignupPayload {
  full_name: string;
  nickname: string;
  age: number | null;
  email: string;
  phone: string;
  password: string;
  school?: { id: string } | null;
}

export async function signup(payload: SignupPayload): Promise<UserFull> {
  const res = await apiClient.post<UserFull>("/auth/signup", payload);
  return res.data;
}
