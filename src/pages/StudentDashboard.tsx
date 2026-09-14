import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AppLayout } from "../routes/AppLayout";
import { Card } from "../components/ui/Card";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { listMySessions, startSession } from "../lib/api/sessions";
import { listTests } from "../lib/api/tests";
import { fetchLeaderboard } from "../lib/api/results";

import styles from "./StudentDashboard.module.css";

function isTestOpen(test: { start_date: string | null; end_date: string | null }): boolean {
  const now = Date.now();
  if (test.start_date && new Date(test.start_date).getTime() > now) return false;
  if (test.end_date && new Date(test.end_date).getTime() < now) return false;
  return true;
}

export function StudentDashboard() {
  const { data: user } = useCurrentUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: sessions } = useQuery({ queryKey: ["my-sessions"], queryFn: listMySessions });
  const { data: tests } = useQuery({ queryKey: ["tests"], queryFn: () => listTests() });
  const { data: leaderboard } = useQuery({
    queryKey: ["leaderboard", "global", "all"],
    queryFn: () => fetchLeaderboard({ scope: "global", period: "all" }),
  });

  const attemptedTestIds = new Set((sessions ?? []).map((s) => s.test_id));
  const openTests = (tests ?? []).filter((t) => isTestOpen(t) && !attemptedTestIds.has(t.id)).slice(0, 5);
  const inProgress = (sessions ?? []).filter((s) => s.status === "active");
  const testNameById = new Map((tests ?? []).map((t) => [t.id, t.name]));

  const recentResults = (sessions ?? [])
    .filter((s) => s.status === "completed")
    .slice(0, 3);

  const startMutation = useMutation({
    mutationFn: startSession,
    onSuccess: (session) => {
      queryClient.invalidateQueries({ queryKey: ["my-sessions"] });
      navigate(`/session/${session.sid}`);
    },
  });

  return (
    <AppLayout>
      <div className={styles.page}>
        <h1 className={styles.title}>Главная</h1>
        <p className={styles.greeting}>
          Добро пожаловать, <strong>{user?.full_name || user?.nickname}</strong>!
        </p>

        <div className={styles.grid}>
          <Card className={styles.card}>
            <h2 className={styles.cardTitle}>Ближайшие тесты</h2>
            {inProgress.length === 0 && openTests.length === 0 && (
              <p className={styles.empty}>Пока нет доступных тестов</p>
            )}
            <ul className={styles.list}>
              {inProgress.map((s) => (
                <li key={s.sid} className={styles.listItemButton} onClick={() => navigate(`/session/${s.sid}`)}>
                  <span>{testNameById.get(s.test_id) ?? "Тест"}</span>
                  <span className={styles.pillActive}>Продолжить</span>
                </li>
              ))}
              {openTests.map((t) => (
                <li
                  key={t.id}
                  className={styles.listItemButton}
                  onClick={() => !startMutation.isPending && startMutation.mutate(t.id)}
                >
                  <span>{t.name}</span>
                  <span className={styles.pillOpen}>Начать</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Рейтинг</h2>
              <Link to="/rating" className={styles.link}>
                Смотреть всё
              </Link>
            </div>
            <ul className={styles.list}>
              {(leaderboard ?? []).slice(0, 5).map((entry) => (
                <li key={`${entry.rank}-${entry.nickname}`} className={styles.listItem}>
                  <span>
                    {entry.rank}. {entry.nickname}
                  </span>
                  <span className={styles.score}>{entry.score.toFixed(1)}</span>
                </li>
              ))}
              {(leaderboard ?? []).length === 0 && <p className={styles.empty}>Пока нет данных</p>}
            </ul>
          </Card>

          <Card className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Мои результаты</h2>
              <Link to="/results" className={styles.link}>
                Смотреть всё
              </Link>
            </div>
            <ul className={styles.list}>
              {recentResults.map((s) => (
                <li key={s.sid} className={styles.listItem}>
                  <span>{testNameById.get(s.test_id) ?? "Тест"}</span>
                  <span className={styles.score}>{s.score?.toFixed(1) ?? "—"}</span>
                </li>
              ))}
              {recentResults.length === 0 && <p className={styles.empty}>Пока нет завершённых тестов</p>}
            </ul>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
