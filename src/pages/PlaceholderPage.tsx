import { AppLayout } from "../routes/AppLayout";
import { Card } from "../components/ui/Card";

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <AppLayout>
      <div style={{ paddingTop: "var(--space-6)" }}>
        <h1 style={{ marginBottom: "var(--space-4)" }}>{title}</h1>
        <Card style={{ padding: "var(--space-6)", color: "var(--color-text-secondary)" }}>
          Этот раздел ещё в разработке.
        </Card>
      </div>
    </AppLayout>
  );
}
