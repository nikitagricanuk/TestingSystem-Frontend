import type { Role } from "./api/types";

export const ROLE_LABELS: Record<Role, string> = {
  admin: "Администратор",
  teacher: "Преподаватель",
  admissions_committee: "Приёмная комиссия",
  student: "Абитуриент",
};
