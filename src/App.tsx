import { Navigate, Route, Routes } from "react-router-dom";

import { LoginPage } from "./pages/auth/LoginPage";
import { SignupWizard } from "./pages/auth/SignupWizard";
import { RoleHome } from "./pages/RoleHome";
import { RatingPage } from "./pages/RatingPage";
import { ResultsPage } from "./pages/ResultsPage";
import { ResultDetailPage } from "./pages/ResultDetailPage";
import { SettingsPage } from "./pages/SettingsPage";
import { TestSessionPage } from "./pages/TestSessionPage";
import { TestFinishedPage } from "./pages/TestFinishedPage";
import { TeacherTestsPage } from "./pages/teacher/TeacherTestsPage";
import { TestDetailPage } from "./pages/teacher/TestDetailPage";
import { QuestionBankPage } from "./pages/teacher/QuestionBankPage";
import { QuestionEditorPage } from "./pages/teacher/QuestionEditorPage";
import { AdminDashboardPage } from "./pages/admin/AdminDashboardPage";
import { AdminUsersPage } from "./pages/admin/AdminUsersPage";
import { AdmissionsRatingPage } from "./pages/admissions/AdmissionsRatingPage";
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
        path="/session/:sid"
        element={
          <RequireAuth>
            <TestSessionPage />
          </RequireAuth>
        }
      />
      <Route
        path="/session/:sid/finished"
        element={
          <RequireAuth>
            <TestFinishedPage />
          </RequireAuth>
        }
      />
      <Route
        path="/teacher/tests"
        element={
          <RequireAuth>
            <TeacherTestsPage />
          </RequireAuth>
        }
      />
      <Route
        path="/teacher/tests/:testId"
        element={
          <RequireAuth>
            <TestDetailPage />
          </RequireAuth>
        }
      />
      <Route
        path="/teacher/questions"
        element={
          <RequireAuth>
            <QuestionBankPage />
          </RequireAuth>
        }
      />
      <Route
        path="/teacher/questions/new"
        element={
          <RequireAuth>
            <QuestionEditorPage />
          </RequireAuth>
        }
      />
      <Route
        path="/teacher/questions/:questionId"
        element={
          <RequireAuth>
            <QuestionEditorPage />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <RequireAuth>
            <AdminDashboardPage />
          </RequireAuth>
        }
      />
      <Route
        path="/admin/users"
        element={
          <RequireAuth>
            <AdminUsersPage />
          </RequireAuth>
        }
      />
      <Route
        path="/admissions/rating"
        element={
          <RequireAuth>
            <AdmissionsRatingPage />
          </RequireAuth>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
