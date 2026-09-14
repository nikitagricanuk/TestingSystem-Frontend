import { apiClient } from "./client";

export interface CertificateField {
  key: string;
  page: number;
  x: number;
  y: number;
  font_size: number;
}

export interface SignaturePosition {
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CertificateTemplate {
  id: string;
  test_id: string | null;
  name: string;
  kind: "base" | "advanced";
  fields: CertificateField[];
  has_signature: boolean;
  signature_position: SignaturePosition | null;
}

export async function listCertificateTemplates(testId?: string): Promise<CertificateTemplate[]> {
  const res = await apiClient.get<CertificateTemplate[]>("/certificates/templates", {
    params: testId ? { test_id: testId } : undefined,
  });
  return res.data;
}

export async function uploadCertificateTemplate(
  file: File,
  params: { name: string; kind?: "base" | "advanced"; test_id?: string },
): Promise<CertificateTemplate> {
  const form = new FormData();
  form.append("file", file);
  const res = await apiClient.post<CertificateTemplate>("/certificates/templates", form, {
    params,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function updateCertificateFields(
  templateId: string,
  fields: CertificateField[],
  signaturePosition?: SignaturePosition | null,
): Promise<CertificateTemplate> {
  const res = await apiClient.patch<CertificateTemplate>(`/certificates/templates/${templateId}/fields`, {
    fields,
    signature_position: signaturePosition ?? null,
  });
  return res.data;
}

export async function uploadCertificateSignature(templateId: string, file: File): Promise<CertificateTemplate> {
  const form = new FormData();
  form.append("file", file);
  const res = await apiClient.post<CertificateTemplate>(`/certificates/templates/${templateId}/signature`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function deleteCertificateTemplate(templateId: string): Promise<void> {
  await apiClient.delete(`/certificates/templates/${templateId}`);
}

// The asset endpoint requires a Bearer token, which a plain <embed src=...>
// can't send — fetch it as an authenticated blob instead and hand back an
// object URL to embed. Caller owns revoking it (URL.revokeObjectURL) once done.
export async function fetchCertificateAssetUrl(templateId: string): Promise<string> {
  const res = await apiClient.get(`/certificates/templates/${templateId}/asset`, { responseType: "blob" });
  return URL.createObjectURL(res.data as Blob);
}

export async function downloadCertificate(resultId: string): Promise<void> {
  const res = await apiClient.get(`/results/${resultId}/certificate`, { responseType: "blob" });
  const url = URL.createObjectURL(res.data as Blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `certificate-${resultId}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
