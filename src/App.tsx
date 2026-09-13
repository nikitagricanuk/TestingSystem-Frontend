import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "./pages/auth/LoginPage";
import { SignupWizard } from "./pages/auth/SignupWizard";
import { RoleHome } from "./pages/RoleHome";
import { RatingPage } from "./pages/RatingPage";
import { ResultsPage } from "./pages/ResultsPage";
import { ResultDetailPage } from "./pages/ResultDetailPage";
import { SettingsPage } from "./pages/SettingsPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";
import { RequireAuth } from "./routes/RequireAuth";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupWizard />} />

      <Route
        path="/"
        element={
          <RequireAuth>
            <RoleHome />
          </RequireAuth>
        }
      />
      <Route
        path="/rating"
        element={
          <RequireAuth>
            <RatingPage />
          </RequireAuth>
        }
      />
      <Route
        path="/results"
        element={
          <RequireAuth>
            <ResultsPage />
          </RequireAuth>
        }
      />
      <Route
        path="/results/:sid"
        element={
          <RequireAuth>
            <ResultDetailPage />
          </RequireAuth>
        }
      />
      <Route
        path="/settings"
        element={
          <RequireAuth>
            <SettingsPage />
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
