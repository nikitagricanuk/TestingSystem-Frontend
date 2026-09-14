import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { AppLayout } from "../../routes/AppLayout";
import { Card } from "../../components/ui/Card";
import { fetchAdminLoad, fetchAdminStats } from "../../lib/api/admin";

import styles from "./AdminDashboardPage.module.css";

export function AdminDashboardPage() {
  const { data: stats } = useQuery({ queryKey: ["admin-stats"], queryFn: fetchAdminStats });
  const { data: load } = useQuery({ queryKey: ["admin-load"], queryFn: fetchAdminLoad });

  return (
    <AppLayout>
      <div className={styles.page}>
        <h1 className={styles.title}>Дашборд</h1>

        <div className={styles.stats}>
          <Card className={styles.statCard}>
            <span className={styles.statLabel}>Текущая нагрузка</span>
            <span className={styles.statValue}>
              {stats?.active_now ?? 0} <span className={styles.statUnit}>пользователя</span>
            </span>
          </Card>
          <Card className={styles.statCard}>
            <span className={styles.statLabel}>Средний балл</span>
            <span className={styles.statValue}>{stats?.avg_score.toFixed(1) ?? "—"}</span>
          </Card>
          <Card className={styles.statCard}>
            <span className={styles.statLabel}>Активны сегодня</span>
            <span className={styles.statValue}>{stats?.active_today ?? 0}</span>
          </Card>
          <Card className={styles.statCard}>
            <span className={styles.statLabel}>Всего попыток</span>
            <span className={styles.statValue}>{stats?.total_finished_attempts ?? 0}</span>
          </Card>
        </div>

        <Card className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Распределение нагрузки по дням недели</h2>
          <div className={styles.chartWrap}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={load ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="label" stroke="var(--color-text-secondary)" fontSize={13} />
                <YAxis stroke="var(--color-text-secondary)" fontSize={13} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="count" fill="var(--color-primary)" radius={[6, 6, 0, 0]} name="Пользователей" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
