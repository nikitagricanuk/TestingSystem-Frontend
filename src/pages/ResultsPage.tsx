import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { AppLayout } from "../routes/AppLayout";
import { Card } from "../components/ui/Card";
import { listMySessions } from "../lib/api/sessions";
import { listTests } from "../lib/api/tests";

import styles from "./ResultsPage.module.css";

function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("ru-RU");
}

export function ResultsPage() {
  const { data: sessions, isLoading: sessionsLoading } = useQuery({
    queryKey: ["my-sessions"],
    queryFn: listMySessions,
  });
  const { data: tests } = useQuery({ queryKey: ["tests"], queryFn: listTests });

  const testNameById = new Map((tests ?? []).map((t) => [t.id, t.name]));
  const finished = (sessions ?? []).filter((s) => s.status === "completed");

  return (
    <AppLayout>
      <div className={styles.page}>
        <h1 className={styles.title}>Мои результаты</h1>

        <Card className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Тест</th>
                <th>Балл</th>
                <th>Отвечено</th>
                <th>Дата</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {sessionsLoading && (
                <tr>
                  <td colSpan={5} className={styles.status}>
                    Загрузка…
                  </td>
                </tr>
              )}
              {!sessionsLoading && finished.length === 0 && (
                <tr>
                  <td colSpan={5} className={styles.status}>
                    Пока нет завершённых тестов
                  </td>
                </tr>
              )}
              {finished.map((session) => (
                <tr key={session.sid}>
                  <td>{testNameById.get(session.test_id) ?? "Тест"}</td>
                  <td>{session.score != null ? session.score.toFixed(1) : "—"}</td>
                  <td>
                    {session.questions_answered ?? 0} / {session.total_questions ?? 0}
                  </td>
                  <td>{formatDate(session.time_finish)}</td>
                  <td>
                    <Link to={`/results/${session.sid}`} className={styles.link}>
                      Подробнее
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </AppLayout>
  );
}
