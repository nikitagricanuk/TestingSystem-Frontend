import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Card } from "./ui/Card";
import { fetchLeaderboard, type RatingPeriod, type RatingScope } from "../lib/api/results";

import styles from "./LeaderboardTable.module.css";

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

function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("ru-RU");
}

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function LeaderboardTable({ testId }: { testId?: string }) {
  const [scope, setScope] = useState<RatingScope>("global");
  const [period, setPeriod] = useState<RatingPeriod>("all");

  const { data: entries, isLoading } = useQuery({
    queryKey: ["leaderboard", scope, period, testId ?? null],
    queryFn: () => fetchLeaderboard({ scope, period, test_id: testId }),
  });

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs}>
        {SCOPE_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            className={tab.value === scope ? styles.tabActive : styles.tab}
            onClick={() => setScope(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tabs}>
        {PERIOD_TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            className={tab.value === period ? styles.tabActive : styles.tab}
            onClick={() => setPeriod(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <Card className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Место</th>
              <th>Имя</th>
              <th>Балл</th>
              <th>Процент ошибок</th>
              <th>Тест пройден</th>
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
            {!isLoading && entries?.length === 0 && (
              <tr>
                <td colSpan={5} className={styles.status}>
                  Пока нет результатов
                </td>
              </tr>
            )}
            {entries?.map((entry) => (
              <tr key={`${entry.rank}-${entry.nickname}`}>
                <td>{entry.rank}</td>
                <td>{entry.nickname}</td>
                <td>{entry.score.toFixed(1)}</td>
                <td>{formatPercent(entry.error_rate)}</td>
                <td>{formatDate(entry.completed_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
