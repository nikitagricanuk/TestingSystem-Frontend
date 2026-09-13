import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { AppLayout } from "../routes/AppLayout";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { getSession } from "../lib/api/sessions";
import { getTest } from "../lib/api/tests";

import styles from "./TestFinishedPage.module.css";

function formatDuration(seconds: number | null): string {
  if (!seconds) return "—";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export function TestFinishedPage() {
  const { sid } = useParams<{ sid: string }>();
  const navigate = useNavigate();

  const { data: session } = useQuery({
    queryKey: ["session", sid],
    queryFn: () => getSession(sid!),
    enabled: !!sid,
  });
  const { data: test } = useQuery({
    queryKey: ["test", session?.test_id],
    queryFn: () => getTest(session!.test_id),
    enabled: !!session?.test_id,
  });

  if (!session) {
    return (
      <AppLayout>
        <p className={styles.loading}>Загрузка…</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className={styles.page}>
        <Card className={styles.card}>
          <h1 className={styles.title}>Тест завершён!</h1>
          <p className={styles.testName}>{test?.name}</p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Балл</span>
              <span className={styles.statValue}>{session.score?.toFixed(1) ?? "—"}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Время</span>
              <span className={styles.statValue}>{formatDuration(session.duration_seconds)}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Решено</span>
              <span className={styles.statValue}>
                {session.questions_answered ?? 0} / {session.total_questions ?? 0}
              </span>
            </div>
          </div>

          <div className={styles.actions}>
            {test?.can_be_reviewed && (
              <Link to={`/results/${sid}`}>
                <Button type="button" variant="secondary">
                  Разбор ответов
                </Button>
              </Link>
            )}
            <Button type="button" onClick={() => navigate("/", { replace: true })}>
              На главную
            </Button>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
