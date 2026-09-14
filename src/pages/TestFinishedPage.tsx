import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Button } from "../components/ui/Button";
import { getSession } from "../lib/api/sessions";
import { getTest } from "../lib/api/tests";
import { downloadCertificate } from "../lib/api/certificates";
import badge from "../assets/irnitu-badge.png";

import styles from "./TestFinishedPage.module.css";

function formatDuration(seconds: number | null): string {
  if (!seconds) return "—";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString("ru-RU", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
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
  const [certificateError, setCertificateError] = useState<string | null>(null);
  const certificateMutation = useMutation({
    mutationFn: () => downloadCertificate(sid!),
    onError: () => setCertificateError("Сертификат для этого теста ещё не настроен"),
    onSuccess: () => setCertificateError(null),
  });

  if (!session) {
    return (
      <div className={styles.shell}>
        <p className={styles.loading}>Загрузка…</p>
      </div>
    );
  }

  const score = session.score?.toFixed(1) ?? "—";

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <img src={badge} alt="" className={styles.logo} aria-hidden="true" />
          <span>
            Система тестирования
            <br />
            ИрНИТУ
          </span>
        </div>
        <div className={styles.testTitle}>{test?.name}</div>
        <div className={styles.timerBlock}>
          <div className={styles.timerValue}>{formatDuration(session.duration_seconds)}</div>
          <div className={styles.timerLabel}>Затраченное время</div>
        </div>
      </header>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} />
      </div>

      <div className={styles.page}>
        <div className={styles.card}>
          <div className={styles.scorePanel}>
            <p className={styles.doneAt}>Задание сделано {formatDateTime(session.time_finish)}</p>
            <div className={styles.scoreValue}>{score}</div>
            <p className={styles.scoreLabel}>баллов</p>

            <div className={styles.actions}>
              {test?.can_be_reviewed && (
                <Link to={`/results/${sid}`} className={styles.resultsLink}>
                  К результатам →
                </Link>
              )}
            </div>
          </div>

          <div className={styles.infoPanel}>
            <h2 className={styles.infoTitle}>Информация о попытке</h2>
            <dl className={styles.infoList}>
              <div className={styles.infoRow}>
                <dt>Затрачено времени</dt>
                <dd>{formatDuration(session.duration_seconds)}</dd>
              </div>
              <div className={styles.infoRow}>
                <dt>Решено задач</dt>
                <dd>
                  {session.questions_answered ?? 0} / {session.total_questions ?? 0}
                </dd>
              </div>
              <div className={styles.infoRow}>
                <dt>Верных ответов</dt>
                <dd>{score}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className={styles.bottomActions}>
          <Button
            type="button"
            variant="secondary"
            disabled={certificateMutation.isPending}
            onClick={() => certificateMutation.mutate()}
          >
            {certificateMutation.isPending ? "Готовим…" : "Скачать сертификат"}
          </Button>
          <Button type="button" onClick={() => navigate("/", { replace: true })}>
            На главную
          </Button>
        </div>
        {certificateError && <p className={styles.certificateError}>{certificateError}</p>}
      </div>
    </div>
  );
}
