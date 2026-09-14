import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AppLayout } from "../../routes/AppLayout";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import {
  exportApplicantContacts,
  listApplicantContacts,
  updateApplicantContact,
  type ApplicantContact,
} from "../../lib/api/admissions";
import type { RatingPeriod, RatingScope } from "../../lib/api/results";

import styles from "./AdmissionsRatingPage.module.css";

const SCOPE_TABS: { value: RatingScope; label: string }[] = [
  { value: "global", label: "Глобальный" },
  { value: "region", label: "Регион" },
  { value: "city", label: "Город" },
];

const PERIOD_TABS: { value: RatingPeriod; label: string }[] = [
  { value: "all", label: "Все время" },
  { value: "year", label: "Год" },
  { value: "month", label: "Месяц" },
  { value: "week", label: "Неделя" },
];

const STATUS_LABELS: Record<string, string> = {
  called: "Обзвонен",
  not_called: "Необзвонен",
  custom: "Свой тэг",
};

export function AdmissionsRatingPage() {
  const queryClient = useQueryClient();
  const [scope, setScope] = useState<RatingScope>("global");
  const [period, setPeriod] = useState<RatingPeriod>("all");
  const [search, setSearch] = useState("");
  const [exporting, setExporting] = useState(false);

  const { data: entries, isLoading } = useQuery({
    queryKey: ["applicant-contacts", scope, period, search],
    queryFn: () => listApplicantContacts({ scope, period, q: search || undefined }),
  });

  const statusMutation = useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: string }) => updateApplicantContact(userId, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applicant-contacts"] }),
  });

  async function handleExport() {
    setExporting(true);
    try {
      await exportApplicantContacts({ scope, period });
    } finally {
      setExporting(false);
    }
  }

  return (
    <AppLayout>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Общий рейтинг</h1>
          <Button type="button" variant="secondary" disabled={exporting} onClick={handleExport}>
            {exporting ? "Экспортируем…" : "Экспорт в Excel"}
          </Button>
        </div>

        <div className={styles.filters}>
          <div className={styles.tabs}>
            {SCOPE_TABS.map((t) => (
              <button
                key={t.value}
                type="button"
                className={t.value === scope ? styles.tabActive : styles.tab}
                onClick={() => setScope(t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className={styles.tabs}>
            {PERIOD_TABS.map((t) => (
              <button
                key={t.value}
                type="button"
                className={t.value === period ? styles.tabActive : styles.tab}
                onClick={() => setPeriod(t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <Input placeholder="Поиск" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <Card className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Место</th>
                <th>Имя</th>
                <th>Номер телефона</th>
                <th>Электронная почта</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={5} className={styles.status}>
                    Загрузка…
                  </td>
                </tr>
              )}
              {!isLoading && (entries ?? []).length === 0 && (
                <tr>
                  <td colSpan={5} className={styles.status}>
                    Пока нет результатов
                  </td>
                </tr>
              )}
              {entries?.map((entry) => (
                <StatusRow
                  key={entry.user_id}
                  entry={entry}
                  onChangeStatus={(status) => statusMutation.mutate({ userId: entry.user_id, status })}
                />
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </AppLayout>
  );
}

function StatusRow({
  entry,
  onChangeStatus,
}: {
  entry: ApplicantContact;
  onChangeStatus: (status: string) => void;
}) {
  return (
    <tr>
      <td>{entry.rank}</td>
      <td>{entry.name}</td>
      <td>{entry.phone ?? "—"}</td>
      <td>{entry.email ?? "—"}</td>
      <td>
        <select
          className={`${styles.statusSelect} ${styles["status_" + entry.status]}`}
          value={entry.status}
          onChange={(e) => onChangeStatus(e.target.value)}
        >
          <option value="called">{STATUS_LABELS.called}</option>
          <option value="not_called">{STATUS_LABELS.not_called}</option>
          <option value="custom">{STATUS_LABELS.custom}</option>
        </select>
      </td>
    </tr>
  );
}
