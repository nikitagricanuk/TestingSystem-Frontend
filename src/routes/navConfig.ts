import type { Role } from "../lib/api/types";

export interface NavItem {
  label: string;
  to: string;
}

export interface NavGroup {
  title: string | null;
  items: NavItem[];
}

const STUDENT_NAV: NavGroup[] = [
  {
    title: null,
    items: [
      { label: "Главная", to: "/" },
      { label: "Рейтинг", to: "/rating" },
      { label: "Мои результаты", to: "/results" },
    ],
  },
];

const TEACHER_NAV: NavGroup[] = [
  {
    title: "ТЕСТИРОВАНИЕ",
    items: [
      { label: "Мои тесты", to: "/teacher/tests" },
      { label: "Банк вопросов", to: "/teacher/questions" },
    ],
  },
];

const ADMIN_NAV: NavGroup[] = [
  {
    title: null,
    items: [{ label: "Дашборд", to: "/admin/dashboard" }],
  },
  {
    title: "ТЕСТИРОВАНИЕ",
    items: [
      { label: "Мои тесты", to: "/teacher/tests" },
      { label: "Банк вопросов", to: "/teacher/questions" },
    ],
  },
  {
    title: "АДМИНИСТРИРОВАНИЕ",
    items: [{ label: "Пользователи", to: "/admin/users" }],
  },
];

const ADMISSIONS_NAV: NavGroup[] = [
  {
    title: "ПРИЁМНАЯ КОМИССИЯ",
    items: [{ label: "Общий рейтинг", to: "/admissions/rating" }],
  },
];

export function navForRole(role: Role | null): NavGroup[] {
  switch (role) {
    case "teacher":
      return TEACHER_NAV;
    case "admin":
      return ADMIN_NAV;
    case "admissions_committee":
      return ADMISSIONS_NAV;
    case "student":
    default:
      return STUDENT_NAV;
  }
}
