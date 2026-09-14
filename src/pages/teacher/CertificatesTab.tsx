import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import {
  deleteCertificateTemplate,
  fetchCertificateAssetUrl,
  listCertificateTemplates,
  updateCertificateFields,
  uploadCertificateSignature,
  uploadCertificateTemplate,
  type CertificateField,
} from "../../lib/api/certificates";

import styles from "./CertificatesTab.module.css";

const FIELD_LABELS: Record<string, string> = {
  full_name_short: "Фамилия И.О.",
  score: "Результат",
  rank: "Место",
  duration: "Длительность",
  date: "Дата",
  school: "Уч. заведение",
};

export function CertificatesTab({ testId }: { testId: string }) {
  const queryClient = useQueryClient();
  const { data: templates, isLoading } = useQuery({
    queryKey: ["certificate-templates", testId],
    queryFn: () => listCertificateTemplates(testId),
  });
  const template = templates?.[0];

  const fileInputRef = useRef<HTMLInputElement>(null);
  const signatureInputRef = useRef<HTMLInputElement>(null);
  const [templateName, setTemplateName] = useState("Сертификат");
  const [assetUrl, setAssetUrl] = useState<string | null>(null);
  const [fields, setFields] = useState<CertificateField[]>([]);
  const [newFieldKey, setNewFieldKey] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setFields(template?.fields ?? []);
  }, [template]);

  useEffect(() => {
    if (!template) {
      setAssetUrl(null);
      return;
    }
    let cancelled = false;
    let objectUrl: string | null = null;
    fetchCertificateAssetUrl(template.id).then((url) => {
      if (cancelled) {
        URL.revokeObjectURL(url);
        return;
      }
      objectUrl = url;
      setAssetUrl(url);
    });
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [template]);

  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadCertificateTemplate(file, { name: templateName, kind: "base", test_id: testId }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["certificate-templates", testId] }),
  });

  const saveFieldsMutation = useMutation({
    mutationFn: () => updateCertificateFields(template!.id, fields, template?.signature_position),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificate-templates", testId] });
      setMessage("Сохранено");
    },
  });

  const signatureMutation = useMutation({
    mutationFn: (file: File) => uploadCertificateSignature(template!.id, file),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["certificate-templates", testId] }),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteCertificateTemplate(template!.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["certificate-templates", testId] }),
  });

  if (isLoading) return <p className={styles.loading}>Загрузка…</p>;

  const availableKeys = Object.keys(FIELD_LABELS).filter((k) => !fields.some((f) => f.key === k));

  if (!template) {
    return (
      <Card className={styles.uploadCard}>
        <h2 className={styles.cardTitle}>Шаблон сертификата не настроен</h2>
        <p className={styles.hint}>Загрузите фон сертификата (PDF или изображение), чтобы начать.</p>
        <Input
          label="Название шаблона"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf,image/png,image/jpeg"
          className={styles.fileInput}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadMutation.mutate(file);
            e.target.value = "";
          }}
        />
        <Button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploadMutation.isPending}>
          {uploadMutation.isPending ? "Загружаем…" : "Загрузить шаблон"}
        </Button>
      </Card>
    );
  }

  return (
    <div className={styles.layout}>
      <Card className={styles.previewCard}>
        <h2 className={styles.cardTitle}>{template.name}</h2>
        {assetUrl ? (
          <embed src={assetUrl} type="application/pdf" className={styles.preview} />
        ) : (
          <p className={styles.hint}>Загрузка превью…</p>
        )}
        <button type="button" className={styles.deleteLink} onClick={() => deleteMutation.mutate()}>
          Удалить шаблон
        </button>
      </Card>

      <Card className={styles.fieldsCard}>
        <h2 className={styles.cardTitle}>Компоненты</h2>
        <p className={styles.hint}>
          Координаты — в точках PDF от левого нижнего угла страницы. Сверьтесь с превью слева.
        </p>

        <ul className={styles.fieldList}>
          {fields.map((field, i) => (
            <li key={field.key} className={styles.fieldRow}>
              <span className={styles.fieldLabel}>{FIELD_LABELS[field.key] ?? field.key}</span>
              <input
                className={styles.numberInput}
                type="number"
                value={field.x}
                title="X"
                onChange={(e) => {
                  const next = [...fields];
                  next[i] = { ...field, x: Number(e.target.value) };
                  setFields(next);
                }}
              />
              <input
                className={styles.numberInput}
                type="number"
                value={field.y}
                title="Y"
                onChange={(e) => {
                  const next = [...fields];
                  next[i] = { ...field, y: Number(e.target.value) };
                  setFields(next);
                }}
              />
              <input
                className={styles.numberInput}
                type="number"
                value={field.font_size}
                title="Размер шрифта"
                onChange={(e) => {
                  const next = [...fields];
                  next[i] = { ...field, font_size: Number(e.target.value) };
                  setFields(next);
                }}
              />
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => setFields(fields.filter((f) => f.key !== field.key))}
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        {availableKeys.length > 0 && (
          <div className={styles.addRow}>
            <select className={styles.select} value={newFieldKey} onChange={(e) => setNewFieldKey(e.target.value)}>
              <option value="">Добавить компонент</option>
              {availableKeys.map((k) => (
                <option key={k} value={k}>
                  {FIELD_LABELS[k]}
                </option>
              ))}
            </select>
            <Button
              type="button"
              variant="secondary"
              disabled={!newFieldKey}
              onClick={() => {
                setFields([...fields, { key: newFieldKey, page: 0, x: 100, y: 100, font_size: 24 }]);
                setNewFieldKey("");
              }}
            >
              + Добавить
            </Button>
          </div>
        )}

        <div className={styles.signatureRow}>
          <span>{template.has_signature ? "Подпись загружена" : "Подпись не загружена"}</span>
          <input
            ref={signatureInputRef}
            type="file"
            accept="image/png,image/jpeg"
            className={styles.fileInput}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) signatureMutation.mutate(file);
              e.target.value = "";
            }}
          />
          <Button type="button" variant="secondary" onClick={() => signatureInputRef.current?.click()}>
            Загрузить подпись
          </Button>
        </div>

        {message && <p className={styles.success}>{message}</p>}
        <div className={styles.actions}>
          <Button type="button" disabled={saveFieldsMutation.isPending} onClick={() => saveFieldsMutation.mutate()}>
            {saveFieldsMutation.isPending ? "Сохраняем…" : "Сохранить размещение"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
