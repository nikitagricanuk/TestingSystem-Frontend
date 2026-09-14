import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AppLayout } from "../../routes/AppLayout";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { deleteUser, listUsers, updateUser } from "../../lib/api/admin";
import { ROLE_LABELS } from "../../lib/roleLabels";
import type { Role, UserFull } from "../../lib/api/types";

import styles from "./AdminUsersPage.module.css";

type RoleFilter = "all" | Role;

const TABS: { value: RoleFilter; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "teacher", label: "Преподаватели" },
  { value: "admissions_committee", label: "Приёмная комиссия" },
  { value: "student", label: "Ученики" },
  { value: "admin", label: "Администраторы" },
];

function formatDate(value: string | null): string {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("ru-RU");
}

export function AdminUsersPage() {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<RoleFilter>("all");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ full_name: string; age: string; phone: string }>({
    full_name: "",
    age: "",
    phone: "",
  });

  const { data: users, isLoading } = useQuery({ queryKey: ["admin-users"], queryFn: listUsers });

  const updateMutation = useMutation({
    mutationFn: (user: UserFull) =>
      updateUser(user.id, {
        full_name: editForm.full_name,
        age: editForm.age ? Number(editForm.age) : null,
        phone: editForm.phone || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      setExpandedId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
  });

  const filtered = (users ?? [])
    .filter((u) => tab === "all" || u.role === tab)
    .filter((u) => (u.full_name || u.nickname || "").toLowerCase().includes(search.toLowerCase()));

  function toggleExpand(user: UserFull) {
    if (expandedId === user.id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(user.id);
    setEditForm({
      full_name: user.full_name || "",
      age: user.age != null ? String(user.age) : "",
      phone: user.phone || "",
    });
  }

  return (
    <AppLayout>
      <div className={styles.page}>
        <h1 className={styles.title}>Пользователи</h1>

        <Input placeholder="Поиск по имени" value={search} onChange={(e) => setSearch(e.target.value)} />

        <div className={styles.tabs}>
          {TABS.map((t) => (
            <button
              key={t.value}
              type="button"
              className={t.value === tab ? styles.tabActive : styles.tab}
              onClick={() => setTab(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <Card className={styles.tableCard}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ФИО</th>
                <th>Роль</th>
                <th>Email</th>
                <th>Дата создания</th>
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
              {!isLoading && filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className={styles.status}>
                    Пользователей не найдено
                  </td>
                </tr>
              )}
              {filtered.map((user) => (
                <>
                  <tr key={user.id} className={styles.row} onClick={() => toggleExpand(user)}>
                    <td className={styles.nameCell}>{user.full_name || user.nickname}</td>
                    <td>{user.role ? ROLE_LABELS[user.role] : "—"}</td>
                    <td>{user.email ?? "—"}</td>
                    <td>{formatDate(user.created_at)}</td>
                    <td>
                      <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Удалить пользователя «${user.full_name}»?`)) deleteMutation.mutate(user.id);
                        }}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                  {expandedId === user.id && (
                    <tr key={`${user.id}-edit`}>
                      <td colSpan={5} className={styles.editCell}>
                        <div className={styles.editForm}>
                          <Input
                            label="ФИО"
                            value={editForm.full_name}
                            onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                          />
                          <Input
                            label="Возраст"
                            type="number"
                            value={editForm.age}
                            onChange={(e) => setEditForm({ ...editForm, age: e.target.value })}
                          />
                          <Input
                            label="Телефон"
                            value={editForm.phone}
                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          />
                          <Button
                            type="button"
                            disabled={updateMutation.isPending}
                            onClick={() => updateMutation.mutate(user)}
                          >
                            Сохранить
                          </Button>
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
    </AppLayout>
  );
}
