import { Link } from "react-router-dom";

import { AuthLayout } from "../../routes/AuthLayout";

export function SignupPage() {
  return (
    <AuthLayout>
      <h1>Регистрация</h1>
      <p style={{ color: "var(--color-text-secondary)" }}>Скоро здесь появится форма регистрации.</p>
      <Link to="/login">Назад ко входу</Link>
    </AuthLayout>
  );
}
