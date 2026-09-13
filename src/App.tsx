import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "./pages/auth/LoginPage";
import { SignupPage } from "./pages/auth/SignupPage";
import { HomePage } from "./pages/HomePage";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { RequireAuth } from "./routes/RequireAuth";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route
        path="/"
        element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        }
      />
      <Route
        path="/rating"
        element={
          <RequireAuth>
            <PlaceholderPage title="Рейтинг" />
          </RequireAuth>
        }
      />
      <Route
        path="/results"
        element={
          <RequireAuth>
            <PlaceholderPage title="Мои результаты" />
          </RequireAuth>
        }
      />
      <Route
        path="/settings"
        element={
          <RequireAuth>
            <PlaceholderPage title="Настройки" />
          </RequireAuth>
        }
      />
      <Route
        path="/teacher/tests"
        element={
          <RequireAuth>
            <PlaceholderPage title="Мои тесты" />
          </RequireAuth>
        }
      />
      <Route
        path="/teacher/questions"
        element={
          <RequireAuth>
            <PlaceholderPage title="Банк вопросов" />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <RequireAuth>
            <PlaceholderPage title="Дашборд" />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/users"
        element={
          <RequireAuth>
            <PlaceholderPage title="Пользователи" />
          </RequireAuth>
        }
      />
      <Route
        path="/admissions/rating"
        element={
          <RequireAuth>
            <PlaceholderPage title="Общий рейтинг" />
          </RequireAuth>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
