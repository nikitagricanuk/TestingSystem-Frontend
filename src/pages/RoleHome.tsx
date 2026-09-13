import { Navigate } from "react-router-dom";

import { useCurrentUser } from "../hooks/useCurrentUser";
import { StudentDashboard } from "./StudentDashboard";

const ROLE_HOME: Record<string, string> = {
  teacher: "/teacher/tests",
  admin: "/admin/dashboard",
  admissions_committee: "/admissions/rating",
};

export function RoleHome() {
  const { data: user } = useCurrentUser();

  if (user?.role && ROLE_HOME[user.role]) {
    return <Navigate to={ROLE_HOME[user.role]} replace />;
  }
  return <StudentDashboard />;
}
