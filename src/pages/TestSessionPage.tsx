import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { Button } from "../components/ui/Button";
import { MathText } from "../components/MathText";
import {
  answerQuestion,
  getSession,
  goToNextQuestion,
  goToPrevQuestion,
  goToQuestion,
  listSessionQuestions,
  submitSession,
} from "../lib/api/sessions";
import { getTest } from "../lib/api/tests";
import type { ApiError } from "../lib/api/types";
import badge from "../assets/irnitu-badge.png";

import styles from "./TestSessionPage.module.css";

function formatElapsed(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export function TestSessionPage() {
  const { sid } = useParams<{ sid: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: session } = useQuery({
    queryKey: ["session", sid],
    queryFn: () => getSession(sid!),
    enabled: !!sid,
  });
  const { data: questions } = useQuery({
    queryKey: ["session-questions", sid],
    queryFn: () => listSessionQuestions(sid!),
    enabled: !!sid,
  });
  const { data: test } = useQuery({
    queryKey: ["test", session?.test_id],
    queryFn: () => getTest(session!.test_id),
    enabled: !!session?.test_id,
  });

  const isLinear = test?.navigation_method === "linear";
  const currentQuestion = questions?.find((q) => q.index === session?.current_question_index);

  const [selectedSingle, setSelectedSingle] = useState<string>("");
  const [selectedMultiple, setSelectedMultiple] = useState<Set<string>>(new Set());
  const [textValue, setTextValue] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!currentQuestion || !session) return;
    const raw = session.answers?.[String(currentQuestion.index)];
    setSelectedSingle(currentQuestion.question_type === "single" ? raw || "" : "");
    setTextValue(currentQuestion.question_type === "text" ? raw || "" : "");
    if (currentQuestion.question_type === "multiple") {
      try {
        setSelectedMultiple(new Set(raw ? JSON.parse(raw) : []));
      } catch {
        setSelectedMultiple(new Set());
      }
    } else {
      setSelectedMultiple(new Set());
    }
  }, [currentQuestion, session]);

  useEffect(() => {
    if (!session?.time_start) return;
    const start = new Date(session.time_start).getTime();
    const tick = () => setElapsed((Date.now() - start) / 1000);
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [session?.time_start]);

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: ["session", sid] });
    queryClient.invalidateQueries({ queryKey: ["session-questions", sid] });
  }

  const answerMutation = useMutation({
    mutationFn: (answer: string) => answerQuestion(sid!, currentQuestion!.question_id, answer),
    onSuccess: invalidate,
  });

  const navMutation = useMutation({
    mutationFn: (action: "next" | "prev" | { jump: string }) => {
      if (action === "next") return goToNextQuestion(sid!);
      if (action === "prev") return goToPrevQuestion(sid!);
      return goToQuestion(sid!, action.jump);
    },
    onSuccess: invalidate,
  });

  const submitMutation = useMutation({
    mutationFn: () => submitSession(sid!),
    onSuccess: () => {
      invalidate();
      navigate(`/session/${sid}/finished`, { replace: true });
    },
    onError: (err) => {
      const detail = (err as AxiosError<ApiError>).response?.data?.detail;
      setSubmitError(detail ?? "Не удалось завершить тест");
    },
  });

  if (!session || !questions || !currentQuestion || !test) {
    return (
      <div className={styles.shell}>
        <p className={styles.loading}>Загрузка…</p>
      </div>
    );
  }

  const atFirst = session.current_question_index === 0;
  const atLast = session.current_question_index === questions.length - 1;
  const answeredCount = questions.filter((q) => q.status === "answered").length;
  const progressPercent = (answeredCount / questions.length) * 100;

  function toggleMultiple(choiceIndex: string) {
    const next = new Set(selectedMultiple);
    if (next.has(choiceIndex)) next.delete(choiceIndex);
    else next.add(choiceIndex);
    setSelectedMultiple(next);
    answerMutation.mutate(JSON.stringify(Array.from(next).sort()));
  }

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
        <div className={styles.testTitle}>{test.name}</div>
        <div className={styles.timerBlock}>
          <div className={styles.timerValue}>{formatElapsed(elapsed)}</div>
          <div className={styles.timerLabel}>Затраченное время</div>
        </div>
      </header>

      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
        <div className={styles.progressDots}>
          {questions.map((q) => (
            <button
              key={q.question_id}
              type="button"
              className={styles.progressDot}
              disabled={!isLinear || q.index === session.current_question_index}
              onClick={() => navMutation.mutate({ jump: q.question_id })}
              aria-label={`Вопрос ${q.index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.questionMeta}>Выберите правильный вариант ответа</div>
        <p className={styles.prompt}>
          <MathText text={currentQuestion.question} />
        </p>

        {currentQuestion.question_type === "single" && (
          <div className={styles.choices}>
            {currentQuestion.choices.map((choice, i) => (
              <label key={i} className={styles.choice}>
                <input
                  type="radio"
                  name="answer"
                  checked={selectedSingle === String(i)}
                  onChange={() => {
                    setSelectedSingle(String(i));
                    answerMutation.mutate(String(i));
                  }}
                />
                <MathText text={choice} />
              </label>
            ))}
          </div>
        )}

        {currentQuestion.question_type === "multiple" && (
          <div className={styles.choices}>
            {currentQuestion.choices.map((choice, i) => (
              <label key={i} className={styles.choice}>
                <input
                  type="checkbox"
                  checked={selectedMultiple.has(String(i))}
                  onChange={() => toggleMultiple(String(i))}
                />
                <MathText text={choice} />
              </label>
            ))}
          </div>
        )}

        {(currentQuestion.question_type === "text" || currentQuestion.question_type == null) && (
          <textarea
            className={styles.textAnswer}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            onBlur={() => textValue && answerMutation.mutate(textValue)}
            placeholder="Введите ответ"
          />
        )}

        <div className={styles.divider} />
        <button type="button" className={styles.reportError} disabled>
          Сообщить об ошибке
        </button>

        {submitError && <p className={styles.submitError}>{submitError}</p>}
      </div>

      <div className={styles.actions}>
        <Button
          type="button"
          variant="secondary"
          disabled={atFirst || isLinear || navMutation.isPending}
          onClick={() => navMutation.mutate("prev")}
        >
          Назад
        </Button>
        {!atLast && (
          <Button
            type="button"
            style={{ background: "var(--color-text)", color: "var(--color-text-inverse)" }}
            disabled={navMutation.isPending}
            onClick={() => navMutation.mutate("next")}
          >
            Далее
          </Button>
        )}
        <div className={styles.spacer} />
        <Button type="button" disabled={submitMutation.isPending} onClick={() => submitMutation.mutate()}>
          {submitMutation.isPending ? "Завершаем…" : "Закончить"}
        </Button>
      </div>
    </div>
  );
}
