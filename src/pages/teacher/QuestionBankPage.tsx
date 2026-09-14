import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AppLayout } from "../../routes/AppLayout";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import {
  createCategory,
  deleteCategory,
  deleteQuestion,
  listCategories,
  listQuestions,
} from "../../lib/api/questionBank";

import styles from "./QuestionBankPage.module.css";

const TYPE_LABELS: Record<string, string> = {
  single: "Один вариант",
  multiple: "Несколько вариантов",
  text: "Текстовый ответ",
};

export function QuestionBankPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  const { data: categories } = useQuery({ queryKey: ["categories"], queryFn: listCategories });
  const { data: questions, isLoading } = useQuery({
    queryKey: ["questions", selectedCategoryId],
    queryFn: () => listQuestions(selectedCategoryId ? { category_id: selectedCategoryId, include_descendants: true } : undefined),
  });

  const createCategoryMutation = useMutation({
    mutationFn: () => createCategory(newCategoryName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setNewCategoryName("");
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setSelectedCategoryId(null);
    },
  });

  const deleteQuestionMutation = useMutation({
    mutationFn: deleteQuestion,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["questions"] }),
  });

  const rootCategories = (categories ?? []).filter((c) => !c.parent_id);

  return (
    <AppLayout>
      <div className={styles.page}>
        <h1 className={styles.title}>Банк вопросов</h1>

        <div className={styles.layout}>
          <Card className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Категории</h2>
            <ul className={styles.categoryList}>
              <li>
                <button
                  type="button"
                  className={selectedCategoryId === null ? styles.categoryActive : styles.category}
                  onClick={() => setSelectedCategoryId(null)}
                >
                  Все вопросы
                </button>
              </li>
              {rootCategories.map((c) => (
                <li key={c.id} className={styles.categoryRow}>
                  <button
                    type="button"
                    className={selectedCategoryId === c.id ? styles.categoryActive : styles.category}
                    onClick={() => setSelectedCategoryId(c.id)}
                  >
                    {c.name}
                  </button>
                  <button
                    type="button"
                    className={styles.categoryDelete}
                    onClick={() => deleteCategoryMutation.mutate(c.id)}
                    title="Удалить категорию"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            <div className={styles.newCategory}>
              <input
                className={styles.newCategoryInput}
                placeholder="Новая категория"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <button
                type="button"
                className={styles.newCategoryButton}
                disabled={!newCategoryName.trim() || createCategoryMutation.isPending}
                onClick={() => createCategoryMutation.mutate()}
              >
                +
              </button>
            </div>
          </Card>

          <div className={styles.main}>
            <div className={styles.mainHeader}>
              <span className={styles.count}>{questions?.length ?? 0} вопросов</span>
              <Button type="button" onClick={() => navigate("/teacher/questions/new")}>
                + Создать вопрос
              </Button>
            </div>

            <Card className={styles.tableCard}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Вопрос</th>
                    <th>Тип</th>
                    <th>Баллы</th>
                    <th>Активен</th>
                    <th />
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
                  {!isLoading && (questions ?? []).length === 0 && (
                    <tr>
                      <td colSpan={5} className={styles.status}>
                        Вопросов пока нет
                      </td>
                    </tr>
                  )}
                  {questions?.map((q) => (
                    <tr key={q.id} className={styles.row} onClick={() => navigate(`/teacher/questions/${q.id}`)}>
                      <td className={styles.questionText}>{q.text}</td>
                      <td>{TYPE_LABELS[q.question_type] ?? q.question_type}</td>
                      <td>{q.mark_out_of}</td>
                      <td>{q.is_active ? "Да" : "Нет"}</td>
                      <td>
                        <button
                          type="button"
                          className={styles.deleteButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm("Удалить вопрос?")) deleteQuestionMutation.mutate(q.id);
                          }}
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
