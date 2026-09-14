import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import { AppLayout } from "../routes/AppLayout";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { MathText } from "../components/MathText";
import { fetchSessionReview } from "../lib/api/results";
import { downloadCertificate } from "../lib/api/certificates";

import styles from "./ResultDetailPage.module.css";

// Answers are stored/returned as raw choice indices (a plain index string for
// single-choice, a JSON-encoded array of indices for multiple-choice) — resolve
// them back to the actual choice text for display. Free-text answers have no
// choices at all, so they're shown as-is.
function resolveAnswerLabel(raw: string | null, choices: string[]): string {
  if (!raw) return "—";
  if (choices.length === 0) return raw;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.map((i) => choices[Number(i)] ?? String(i)).join(", ");
    }
  } catch {
    // not JSON — fall through to single-index handling
  }
  const idx = Number(raw);
  return Number.isInteger(idx) && choices[idx] !== undefined ? choices[idx] : raw;
}

export function ResultDetailPage() {
  const { sid } = useParams<{ sid: string }>();
  const { data: review, isLoading } = useQuery({
    queryKey: ["session-review", sid],
    queryFn: () => fetchSessionReview(sid!),
    enabled: !!sid,
  });

  const correctCount = review?.questions.filter((q) => q.is_correct).length ?? 0;

  const [certificateError, setCertificateError] = useState<string | null>(null);
  const certificateMutation = useMutation({
    mutationFn: () => downloadCertificate(sid!),
    onError: () => setCertificateError("Сертификат для этого теста ещё не настроен"),
    onSuccess: () => setCertificateError(null),
  });

  return (
    <AppLayout>
      <div className={styles.page}>
        <Link to="/results" className={styles.back}>
          ← К результатам
        </Link>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Разбор теста</h1>
          <Button
            type="button"
            variant="secondary"
            disabled={certificateMutation.isPending}
            onClick={() => certificateMutation.mutate()}
          >
            {certificateMutation.isPending ? "Готовим…" : "Скачать сертификат"}
          </Button>
        </div>
        {certificateError && <p className={styles.certificateError}>{certificateError}</p>}

        {isLoading && <p>Загрузка…</p>}

        {review && (
          <>
            <div className={styles.summary}>
              <Card className={styles.summaryCard}>
                <span className={styles.summaryLabel}>Балл</span>
                <span className={styles.summaryValue}>{review.score?.toFixed(1) ?? "—"}</span>
              </Card>
              <Card className={styles.summaryCard}>
                <span className={styles.summaryLabel}>Верно</span>
                <span className={styles.summaryValue}>
                  {correctCount} / {review.questions.length}
                </span>
              </Card>
            </div>

            <div className={styles.questions}>
              {review.questions.map((q) => (
                <Card key={q.index} className={`${styles.questionCard} ${q.is_correct ? styles.correct : styles.incorrect}`}>
                  <div className={styles.questionHeader}>
                    <span>Вопрос {q.index + 1}</span>
                    <span className={q.is_correct ? styles.badgeCorrect : styles.badgeIncorrect}>
                      {q.is_correct ? "Верно" : "Неверно"}
                    </span>
                  </div>
                  <p className={styles.prompt}>
                    <MathText text={q.prompt} />
                  </p>
                  <div className={styles.answers}>
                    <div>
                      <span className={styles.answerLabel}>Ваш ответ:</span>{" "}
                      <MathText text={resolveAnswerLabel(q.student_answer, q.choices)} />
                    </div>
                    {!q.is_correct && (
                      <div>
                        <span className={styles.answerLabel}>Правильный ответ:</span>{" "}
                        <MathText text={resolveAnswerLabel(q.correct_answer, q.choices)} />
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
