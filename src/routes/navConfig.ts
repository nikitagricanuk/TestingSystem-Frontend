import type { ComponentType, SVGProps } from "react";

import type { Role } from "../lib/api/types";
import { GridIcon, StarIcon, HistoryIcon, ChecklistIcon, ListIcon, PersonIcon, GlobeIcon, CalendarIcon } from "../components/icons";

export interface NavItem {
  label: string;
  to: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface NavGroup {
  title: string | null;
  items: NavItem[];
}

const STUDENT_NAV: NavGroup[] = [
  {
    title: null,
    items: [
      { label: "Главная", to: "/", icon: GridIcon },
      { label: "Рейтинг", to: "/rating", icon: StarIcon },
      { label: "Мои результаты", to: "/results", icon: HistoryIcon },
    ],
  },
];

const TEACHER_NAV: NavGroup[] = [
  {
    title: "ТЕСТИРОВАНИЕ",
    items: [
      { label: "Мои тесты", to: "/teacher/tests", icon: ChecklistIcon },
      { label: "Банк вопросов", to: "/teacher/questions", icon: ListIcon },
    ],
  },
];

const ADMIN_NAV: NavGroup[] = [
  {
    title: null,
    items: [{ label: "Дашборд", to: "/admin/dashboard", icon: CalendarIcon }],
  },
  {
    title: "ТЕСТИРОВАНИЕ",
    items: [
      { label: "Мои тесты", to: "/teacher/tests", icon: ChecklistIcon },
      { label: "Банк вопросов", to: "/teacher/questions", icon: ListIcon },
    ],
  },
  {
    title: "АДМИНИСТРИРОВАНИЕ",
    items: [{ label: "Пользователи", to: "/admin/users", icon: PersonIcon }],
  },
];

const ADMISSIONS_NAV: NavGroup[] = [
  {
    title: "ПРИЁМНАЯ КОМИССИЯ",
    items: [{ label: "Общий рейтинг", to: "/admissions/rating", icon: GlobeIcon }],
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
