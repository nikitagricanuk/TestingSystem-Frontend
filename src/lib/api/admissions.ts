import { apiClient } from "./client";
import type { RatingPeriod, RatingScope } from "./results";

export interface ApplicantContact {
  rank: number;
  user_id: string;
  name: string;
  phone: string | null;
  email: string | null;
  score: number;
  status: "called" | "not_called" | "custom";
  custom_tag: string | null;
}

export async function listApplicantContacts(params: {
  scope?: RatingScope;
  period?: RatingPeriod;
  q?: string;
}): Promise<ApplicantContact[]> {
  const res = await apiClient.get<ApplicantContact[]>("/admissions/contacts", { params });
  return res.data;
}

export async function updateApplicantContact(
  userId: string,
  payload: { status: string; custom_tag?: string | null },
): Promise<ApplicantContact> {
  const res = await apiClient.patch<ApplicantContact>(`/admissions/contacts/${userId}`, payload);
  return res.data;
}

export async function exportApplicantContacts(params: { scope?: RatingScope; period?: RatingPeriod }): Promise<void> {
  const res = await apiClient.get("/admissions/contacts/export", {
    params,
    responseType: "blob",
  });
  const url = URL.createObjectURL(res.data as Blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "rating.xlsx";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
