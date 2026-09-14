import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AppLayout } from "../../routes/AppLayout";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { LeaderboardTable } from "../../components/LeaderboardTable";
import { CertificatesTab } from "./CertificatesTab";
import {
  getTest,
  listTestQuestions,
  listTestRules,
  createTestRule,
  deleteTestRule,
  removeTestQuestion,
  updateTest,
  uploadTestQuestions,
  type TestCreatePayload,
} from "../../lib/api/tests";
import { listCategories } from "../../lib/api/questionBank";
import { fetchTestAnalysis } from "../../lib/api/analysis";

import styles from "./TestDetailPage.module.css";

type TabKey = "overview" | "rating" | "analysis" | "certificates";

const TABS: { key: TabKey; label: string }[] = [
  { key: "overview", label: "Обзор" },
  { key: "rating", label: "Рейтинг" },
  { key: "analysis", label: "Аналитика" },
  { key: "certificates", label: "Сертификаты" },
];

function toDateInputValue(iso: string | null): string {
  if (!iso) return "";
  return iso.slice(0, 10);
}

export function TestDetailPage() {
  const { testId } = useParams<{ testId: string }>();
  const [tab, setTab] = useState<TabKey>("overview");

  const { data: test } = useQuery({
    queryKey: ["test", testId],
    queryFn: () => getTest(testId!),
    enabled: !!testId,
  });

  if (!test) {
    return (
      <AppLayout>
        <p className={styles.loading}>Загрузка…</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className={styles.page}>
        <h1 className={styles.title}>{test.name}</h1>

        <div className={styles.tabs}>
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              className={t.key === tab ? styles.tabActive : styles.tab}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "overview" && <OverviewTab testId={test.id} />}
        {tab === "rating" && <LeaderboardTable testId={test.id} />}
        {tab === "analysis" && <AnalysisTab testId={test.id} />}
        {tab === "certificates" && <CertificatesTab testId={test.id} />}
      </div>
    </AppLayout>
  );
}

function OverviewTab({ testId }: { testId: string }) {
  const queryClient = useQueryClient();
  const { data: test } = useQuery({ queryKey: ["test", testId], queryFn: () => getTest(testId) });
  const { data: questions } = useQuery({
    queryKey: ["test-questions", testId],
    queryFn: () => listTestQuestions(testId),
  });
  const { data: rules } = useQuery({
    queryKey: ["test-rules", testId],
    queryFn: () => listTestRules(testId),
  });
  const { data: categories } = useQuery({ queryKey: ["categories"], queryFn: listCategories });

  const [form, setForm] = useState<Partial<TestCreatePayload>>({});
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    if (test) {
      setForm({
        name: test.name,
        description: test.description ?? "",
        start_date: toDateInputValue(test.start_date) || null,
        end_date: toDateInputValue(test.end_date) || null,
        number_of_required_questions: test.number_of_required_questions,
        shuffle: test.shuffle,
        navigation_method: test.navigation_method,
        can_be_reviewed: test.can_be_reviewed ?? false,
      });
    }
  }, [test]);

  const saveMutation = useMutation({
    mutationFn: (payload: Partial<TestCreatePayload>) => updateTest(testId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["test", testId] });
      queryClient.invalidateQueries({ queryKey: ["tests", "mine"] });
      setSaveMessage("Сохранено");
    },
  });

  const [ruleCategoryId, setRuleCategoryId] = useState("");
  const [ruleMandatory, setRuleMandatory] = useState(true);
  const [ruleFixedPosition, setRuleFixedPosition] = useState("");

  const addRuleMutation = useMutation({
    mutationFn: () =>
      createTestRule(testId, {
        category_id: ruleCategoryId,
        is_mandatory: ruleMandatory,
        fixed_position: ruleFixedPosition ? Number(ruleFixedPosition) : null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["test-rules", testId] });
      setRuleCategoryId("");
      setRuleFixedPosition("");
    },
  });

  const removeRuleMutation = useMutation({
    mutationFn: (ruleId: string) => deleteTestRule(testId, ruleId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["test-rules", testId] }),
  });

  const removeQuestionMutation = useMutation({
    mutationFn: (questionId: string) => removeTestQuestion(testId, questionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["test-questions", testId] });
      queryClient.invalidateQueries({ queryKey: ["test", testId] });
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadMode, setUploadMode] = useState<"append" | "overwrite">("append");
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const uploadMutation = useMutation({
    mutationFn: (file: File) => uploadTestQuestions(testId, file, uploadMode),
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: ["test-questions", testId] });
      queryClient.invalidateQueries({ queryKey: ["test", testId] });
      setUploadMessage(`Загружено вопросов: ${created.length}`);
    },
    onError: () => setUploadMessage("Не удалось загрузить файл"),
  });

  const categoryNameById = new Map((categories ?? []).map((c) => [c.id, c.name]));

  return (
    <div className={styles.overview}>
      <div className={styles.stats}>
        <Card className={styles.statCard}>
          <span className={styles.statLabel}>Вопросов</span>
          <span className={styles.statValue}>{test?.total_questions ?? 0}</span>
        </Card>
        <Card className={styles.statCard}>
          <span className={styles.statLabel}>Обязательных</span>
          <span className={styles.statValue}>{test?.number_of_required_questions ?? 0}</span>
        </Card>
      </div>

      <Card className={styles.formCard}>
        <h2 className={styles.cardTitle}>Основные сведения</h2>
        <Input
          label="Название"
          value={form.name ?? ""}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          label="Описание"
          value={form.description ?? ""}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <div className={styles.row}>
          <Input
            label="Начало теста"
            type="date"
            value={form.start_date ?? ""}
            onChange={(e) => setForm({ ...form, start_date: e.target.value || null })}
          />
          <Input
            label="Конец теста"
            type="date"
            value={form.end_date ?? ""}
            onChange={(e) => setForm({ ...form, end_date: e.target.value || null })}
          />
        </div>
        <div className={styles.row}>
          <Input
            label="Количество обязательных вопросов"
            type="number"
            value={form.number_of_required_questions ?? ""}
            onChange={(e) =>
              setForm({ ...form, number_of_required_questions: e.target.value ? Number(e.target.value) : null })
            }
          />
          <div className={styles.selectField}>
            <label className={styles.selectLabel}>Метод навигации</label>
            <select
              className={styles.select}
              value={form.navigation_method ?? "free"}
              onChange={(e) => setForm({ ...form, navigation_method: e.target.value })}
            >
              <option value="free">Свободная</option>
              <option value="linear">Последовательная</option>
            </select>
          </div>
        </div>
        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={!!form.shuffle}
            onChange={(e) => setForm({ ...form, shuffle: e.target.checked })}
          />
          Перемешивать вопросы
        </label>
        <label className={styles.checkboxRow}>
          <input
            type="checkbox"
            checked={!!form.can_be_reviewed}
            onChange={(e) => setForm({ ...form, can_be_reviewed: e.target.checked })}
          />
          Разрешить просмотр ответов после теста
        </label>
        {saveMessage && <p className={styles.success}>{saveMessage}</p>}
        <div className={styles.actions}>
          <Button type="button" disabled={saveMutation.isPending} onClick={() => saveMutation.mutate(form)}>
            {saveMutation.isPending ? "Сохраняем…" : "Сохранить"}
          </Button>
        </div>
      </Card>

      <Card className={styles.formCard}>
        <h2 className={styles.cardTitle}>Правила банка вопросов</h2>
        <div className={styles.ruleForm}>
          <select
            className={styles.select}
            value={ruleCategoryId}
            onChange={(e) => setRuleCategoryId(e.target.value)}
          >
            <option value="">Выберите категорию</option>
            {(categories ?? []).map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <label className={styles.checkboxRow}>
            <input type="checkbox" checked={ruleMandatory} onChange={(e) => setRuleMandatory(e.target.checked)} />
            Обязательный
          </label>
          <input
            className={styles.positionInput}
            placeholder="Позиция (необяз.)"
            value={ruleFixedPosition}
            onChange={(e) => setRuleFixedPosition(e.target.value)}
          />
          <Button
            type="button"
            variant="secondary"
            disabled={!ruleCategoryId || addRuleMutation.isPending}
            onClick={() => addRuleMutation.mutate()}
          >
            + Добавить
          </Button>
        </div>
        <ul className={styles.ruleList}>
          {(rules ?? []).map((rule) => (
            <li key={rule.id} className={styles.ruleItem}>
              <span>Случайный вопрос из темы</span>
              <span className={styles.pillTopic}>{categoryNameById.get(rule.category_id) ?? rule.category_id}</span>
              {rule.is_mandatory && <span className={styles.pillMandatory}>обязательный</span>}
              {rule.fixed_position != null && (
                <span className={styles.pillPosition}>позиция {rule.fixed_position}</span>
              )}
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => removeRuleMutation.mutate(rule.id)}
              >
                Удалить
              </button>
            </li>
          ))}
          {(rules ?? []).length === 0 && <p className={styles.empty}>Правил пока нет</p>}
        </ul>
      </Card>

      <Card className={styles.formCard}>
        <div className={styles.cardHeaderRow}>
          <h2 className={styles.cardTitle}>Вопросы теста</h2>
          <div className={styles.uploadRow}>
            <select
              className={styles.select}
              value={uploadMode}
              onChange={(e) => setUploadMode(e.target.value as "append" | "overwrite")}
            >
              <option value="append">Добавить</option>
              <option value="overwrite">Заменить</option>
            </select>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xml"
              className={styles.fileInput}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadMutation.mutate(file);
                e.target.value = "";
              }}
            />
            <Button type="button" variant="secondary" onClick={() => fileInputRef.current?.click()}>
              Загрузить XML
            </Button>
          </div>
        </div>
        {uploadMessage && <p className={styles.success}>{uploadMessage}</p>}
        <ul className={styles.questionList}>
          {(questions ?? []).map((q) => (
            <li key={q.id} className={styles.questionItem}>
              <span className={styles.questionText}>{q.text}</span>
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => removeQuestionMutation.mutate(q.id)}
              >
                Удалить
              </button>
            </li>
          ))}
          {(questions ?? []).length === 0 && <p className={styles.empty}>Вопросов пока нет</p>}
        </ul>
      </Card>
    </div>
  );
}

function AnalysisTab({ testId }: { testId: string }) {
  const { data: analysis, isLoading } = useQuery({
    queryKey: ["test-analysis", testId],
    queryFn: () => fetchTestAnalysis(testId),
  });
  const [expanded, setExpanded] = useState<string | null>(null);

  if (isLoading) return <p className={styles.loading}>Загрузка…</p>;
  if (!analysis || analysis.questions.length === 0) {
    return <Card className={styles.placeholderCard}>Пока нет данных для анализа — тест ещё никто не проходил.</Card>;
  }

  return (
    <div className={styles.overview}>
      <div className={styles.stats}>
        <Card className={styles.statCard}>
          <span className={styles.statLabel}>Средний индекс дискриминации</span>
          <span className={styles.statValue}>{(analysis.avg_discrimination * 100).toFixed(1)}%</span>
        </Card>
        <Card className={styles.statCard}>
          <span className={styles.statLabel}>Средний индекс лёгкости</span>
          <span className={styles.statValue}>{(analysis.avg_difficulty * 100).toFixed(1)}%</span>
        </Card>
        <Card className={styles.statCard}>
          <span className={styles.statLabel}>Среднее число попыток</span>
          <span className={styles.statValue}>{analysis.avg_attempts.toFixed(0)}</span>
        </Card>
      </div>

      <Card className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Категория</th>
              <th>Дискриминация</th>
              <th>Лёгкость</th>
              <th>Вес</th>
              <th>Попытки</th>
            </tr>
          </thead>
          <tbody>
            {analysis.questions.map((q) => (
              <>
                <tr
                  key={q.question_id}
                  className={styles.analysisRow}
                  onClick={() => setExpanded(expanded === q.question_id ? null : q.question_id)}
                >
                  <td>{q.category}</td>
                  <td>{(q.discrimination * 100).toFixed(1)}%</td>
                  <td>{(q.difficulty * 100).toFixed(1)}%</td>
                  <td>{(q.effective_weight * 100).toFixed(1)}%</td>
                  <td>{q.attempts}</td>
                </tr>
                {expanded === q.question_id && (
                  <tr key={`${q.question_id}-detail`}>
                    <td colSpan={5} className={styles.detailCell}>
                      <div className={styles.detailGrid}>
                        <div>
                          <span className={styles.detailLabel}>Намеченный вес</span>
                          <span>{(q.intended_weight * 100).toFixed(1)}%</span>
                        </div>
                        <div>
                          <span className={styles.detailLabel}>Стандартное отклонение</span>
                          <span>{(q.std_dev * 100).toFixed(1)}%</span>
                        </div>
                        <div>
                          <span className={styles.detailLabel}>Балл случайного угадывания</span>
                          <span>{(q.guess_score * 100).toFixed(1)}%</span>
                        </div>
                        <div>
                          <span className={styles.detailLabel}>Эффективная дискриминация</span>
                          <span>{q.effective_discrimination.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className={styles.detailLabel}>Тип</span>
                          <span>{q.question_type}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
