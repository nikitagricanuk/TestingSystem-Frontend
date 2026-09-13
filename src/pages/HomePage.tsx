import { AppLayout } from "../routes/AppLayout";
import { Card } from "../components/ui/Card";
import { useAuthStore } from "../store/auth";
import { ROLE_LABELS } from "../lib/roleLabels";

export function HomePage() {
  const user = useAuthStore((s) => s.user);

  return (
    <AppLayout>
      <div style={{ paddingTop: "var(--space-6)" }}>
        <h1 style={{ marginBottom: "var(--space-4)" }}>Главная</h1>
        <Card style={{ padding: "var(--space-6)" }}>
          <p style={{ margin: 0 }}>
            Добро пожаловать, <strong>{user?.full_name || user?.nickname}</strong>
            {user?.role && <> ({ROLE_LABELS[user.role]})</>}.
          </p>
        </Card>
      </div>
    </AppLayout>
  );
}
