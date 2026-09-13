import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { AppLayout } from "../routes/AppLayout";
import { Card } from "../components/ui/Card";
import { MathText } from "../components/MathText";
import { fetchSessionReview } from "../lib/api/results";

import styles from "./ResultDetailPage.module.css";

export function ResultDetailPage() {
  const { sid } = useParams<{ sid: string }>();
  const { data: review, isLoading } = useQuery({
    queryKey: ["session-review", sid],
    queryFn: () => fetchSessionReview(sid!),
    enabled: !!sid,
  });

  const correctCount = review?.questions.filter((q) => q.is_correct).length ?? 0;

  return (
    <AppLayout>
      <div className={styles.page}>
        <Link to="/results" className={styles.back}>
          ← К результатам
        </Link>
        <h1 className={styles.title}>Разбор теста</h1>

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
                      <span className={styles.answerLabel}>Ваш ответ:</span> <MathText text={q.student_answer || "—"} />
                    </div>
                    {!q.is_correct && (
                      <div>
                        <span className={styles.answerLabel}>Правильный ответ:</span>{" "}
                        <MathText text={q.correct_answer || "—"} />
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
