import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AppLayout } from "../../routes/AppLayout";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { createTest, deleteTest, listTests } from "../../lib/api/tests";

import styles from "./TeacherTestsPage.module.css";

function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("ru-RU");
}

export function TeacherTestsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const { data: tests, isLoading } = useQuery({
    queryKey: ["tests", "mine"],
    queryFn: () => listTests({ mine: true }),
  });

  const createMutation = useMutation({
    mutationFn: () => createTest({ name: "Новый тест", shuffle: true, navigation_method: "free" }),
    onSuccess: (test) => {
      queryClient.invalidateQueries({ queryKey: ["tests", "mine"] });
      navigate(`/teacher/tests/${test.id}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tests", "mine"] }),
  });

  const filtered = (tests ?? []).filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <AppLayout>
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Мои тесты</h1>
          <Button type="button" disabled={createMutation.isPending} onClick={() => createMutation.mutate()}>
            + Создать
          </Button>
        </div>

        <Input placeholder="Поиск по названию" value={search} onChange={(e) => setSearch(e.target.value)} />

        <Card className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Название</th>
                <th>Вопросов</th>
                <th>Обязательных</th>
                <th>Навигация</th>
                <th>Дата создания</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={6} className={styles.status}>
                    Загрузка…
                  </td>
                </tr>
              )}
              {!isLoading && filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className={styles.status}>
                    Тестов пока нет
                  </td>
                </tr>
              )}
              {filtered.map((test) => (
                <tr key={test.id} className={styles.row} onClick={() => navigate(`/teacher/tests/${test.id}`)}>
                  <td className={styles.nameCell}>{test.name}</td>
                  <td>{test.total_questions}</td>
                  <td>{test.number_of_required_questions ?? "—"}</td>
                  <td>{test.navigation_method === "linear" ? "Последовательная" : "Свободная"}</td>
                  <td>{formatDate(test.created_at)}</td>
                  <td>
                    <button
                      type="button"
                      className={styles.deleteButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Удалить тест «${test.name}»?`)) deleteMutation.mutate(test.id);
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
    </AppLayout>
  );
}
