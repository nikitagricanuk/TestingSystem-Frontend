import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { AppLayout } from "../../routes/AppLayout";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { MathText } from "../../components/MathText";
import {
  createQuestion,
  getQuestion,
  listCategories,
  updateQuestion,
  type QuestionType,
} from "../../lib/api/questionBank";
import { parseMultiEnvironment } from "../../lib/latexQuestion";
import type { ApiError } from "../../lib/api/types";

import styles from "./QuestionEditorPage.module.css";

function buildLatexFromQuestion(text: string, choices: string[], correct: number[]): string {
  const items = choices
    .map((choice, i) => `${correct.includes(i) ? "\\item*" : "\\item"} ${choice}`)
    .join("\n ");
  return `\\begin{multi}{Q}\n ${text}\n ${items}\n\\end{multi}`;
}

export function QuestionEditorPage() {
  const { questionId } = useParams<{ questionId: string }>();
  const isNew = !questionId || questionId === "new";
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: existing } = useQuery({
    queryKey: ["question", questionId],
    queryFn: () => getQuestion(questionId!),
    enabled: !isNew,
  });
  const { data: categories } = useQuery({ queryKey: ["categories"], queryFn: listCategories });

  const [questionType, setQuestionType] = useState<QuestionType>("single");
  const [latex, setLatex] = useState("");
  const [textPrompt, setTextPrompt] = useState("");
  const [textAnswer, setTextAnswer] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [markOutOf, setMarkOutOf] = useState("1");
  const [penalty, setPenalty] = useState("0");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!existing) return;
    setQuestionType(existing.question_type);
    setCategoryId(existing.category_id ?? "");
    setMarkOutOf(String(existing.mark_out_of));
    setPenalty(String(existing.penalty));
    setIsActive(existing.is_active);
    if (existing.question_type === "text") {
      setTextPrompt(existing.text);
      setTextAnswer(existing.answer.correct_text ?? "");
    } else {
      setLatex(buildLatexFromQuestion(existing.text, existing.answer.choices ?? [], existing.answer.correct ?? []));
    }
  }, [existing]);

  const parsed = useMemo(() => (questionType !== "text" ? parseMultiEnvironment(latex) : null), [latex, questionType]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!categoryId) throw new Error("Выберите категорию");
      const common = {
        category_id: categoryId,
        mark_out_of: Number(markOutOf) || 1,
        penalty: Number(penalty) || 0,
        is_active: isActive,
      };
      let payload;
      if (questionType === "text") {
        if (!textPrompt.trim() || !textAnswer.trim()) throw new Error("Заполните вопрос и правильный ответ");
        payload = {
          ...common,
          text: textPrompt,
          problem: textPrompt,
          question_type: "text" as const,
          answer: { correct_text: textAnswer },
        };
      } else {
        if (!parsed) throw new Error("Не удалось разобрать LaTeX — проверьте формат \\begin{multi}...\\end{multi}");
        if (questionType === "single" && parsed.correctIndices.length !== 1) {
          throw new Error("Для вопроса с одним вариантом должен быть ровно один \\item*");
        }
        payload = {
          ...common,
          text: parsed.prompt,
          problem: parsed.prompt,
          question_type: questionType,
          answer: { choices: parsed.choices, correct: parsed.correctIndices },
        };
      }
      return isNew ? createQuestion(payload) : updateQuestion(questionId!, payload);
    },
    onSuccess: (question) => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      setError(null);
      navigate(`/teacher/questions/${question.id}`, { replace: true });
    },
    onError: (err) => {
      const detail = (err as AxiosError<ApiError>).response?.data?.detail;
      setError(detail ?? (err as Error).message ?? "Не удалось сохранить вопрос");
    },
  });

  return (
    <AppLayout>
      <div className={styles.page}>
        <h1 className={styles.title}>{isNew ? "Новый вопрос" : "Редактирование вопроса"}</h1>

        <Card className={styles.metaCard}>
          <div className={styles.metaRow}>
            <div className={styles.field}>
              <label className={styles.label}>Категория</label>
              <select className={styles.select} value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">Выберите категорию</option>
                {(categories ?? []).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Тип ответа</label>
              <select
                className={styles.select}
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value as QuestionType)}
              >
                <option value="single">Один вариант</option>
                <option value="multiple">Несколько вариантов</option>
                <option value="text">Текстовый ответ</option>
              </select>
            </div>
            <Input label="Баллы" type="number" value={markOutOf} onChange={(e) => setMarkOutOf(e.target.value)} />
            <Input label="Штраф" type="number" value={penalty} onChange={(e) => setPenalty(e.target.value)} />
          </div>
          <label className={styles.checkboxRow}>
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
            Активен
          </label>
        </Card>

        {questionType === "text" ? (
          <Card className={styles.formCard}>
            <Input label="Текст вопроса" value={textPrompt} onChange={(e) => setTextPrompt(e.target.value)} />
            <Input label="Правильный ответ" value={textAnswer} onChange={(e) => setTextAnswer(e.target.value)} />
          </Card>
        ) : (
          <div className={styles.split}>
            <Card className={styles.editorCard}>
              <h2 className={styles.cardTitle}>Текст вопроса</h2>
              <textarea
                className={styles.textarea}
                value={latex}
                onChange={(e) => setLatex(e.target.value)}
                placeholder={"\\begin{multi}{ID}\n Текст вопроса $x^2$\n \\item* верный вариант\n \\item неверный вариант\n\\end{multi}"}
                spellCheck={false}
              />
            </Card>
            <Card className={styles.previewCard}>
              <h2 className={styles.cardTitle}>Предпросмотр</h2>
              {parsed ? (
                <div className={styles.preview}>
                  <p className={styles.previewPrompt}>
                    <MathText text={parsed.prompt} />
                  </p>
                  <ul className={styles.previewChoices}>
                    {parsed.choices.map((choice, i) => (
                      <li key={i} className={parsed.correctIndices.includes(i) ? styles.previewCorrect : undefined}>
                        <MathText text={choice} />
                        {parsed.correctIndices.includes(i) && " ✓"}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className={styles.previewEmpty}>Введите LaTeX слева, чтобы увидеть предпросмотр</p>
              )}
            </Card>
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.actions}>
          <Button type="button" disabled={saveMutation.isPending} onClick={() => saveMutation.mutate()}>
            {saveMutation.isPending ? "Сохраняем…" : "Сохранить"}
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
