import { apiClient } from "./client";

export interface Settlement {
  id: string;
  name: string;
  type: string;
  region_id: string;
}

export interface School {
  id: string;
  full_name: string;
  short_name: string | null;
  city_id: string;
}

export async function searchSettlements(q: string): Promise<Settlement[]> {
  if (!q.trim()) return [];
  const res = await apiClient.get<Settlement[]>("/settlements", { params: { q, limit: 20 } });
  return res.data;
}

export async function searchSchools(settlementId: string, q?: string): Promise<School[]> {
  const res = await apiClient.get<School[]>("/schools", {
    params: { settlement_id: settlementId, q: q || undefined, limit: 20 },
  });
  return res.data;
}
