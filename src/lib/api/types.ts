// Types mirroring the backend's Pydantic response models
// (TestingSystem-Backend: app/schemas/users.py).

export type Role = "admin" | "teacher" | "admissions_committee" | "student";

export interface School {
  id: string;
  full_name: string;
  short_name: string | null;
  city_id: string;
}

export interface UserFull {
  id: string;
  email: string | null;
  is_active: boolean;
  role: Role | null;
  created_at: string;
  created_at_unix: number;
  updated_at: string | null;
  updated_at_unix: number | null;
  full_name: string;
  nickname: string | null;
  age: number | null;
  phone: string | null;
  school: School | null;
  permissions: string[];
  is_guest: boolean;
  is_graduated: boolean | null;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  access_token_expires_at: string;
  access_token_expires_at_unix: number;
  refresh_token_expires_at: string;
  refresh_token_expires_at_unix: number;
  issued_at: string;
  issued_at_unix: number;
}

export interface ApiError {
  detail: string;
}
