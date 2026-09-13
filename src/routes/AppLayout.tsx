import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/auth";
import { logout as apiLogout } from "../lib/api/auth";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { navForRole } from "./navConfig";
import { ROLE_LABELS } from "../lib/roleLabels";

import styles from "./AppLayout.module.css";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const refreshToken = useAuthStore((s) => s.refreshToken);
  const clear = useAuthStore((s) => s.clear);
  const groups = navForRole(user?.role ?? null);

  async function handleLogout() {
    try {
      if (refreshToken) await apiLogout(refreshToken);
    } catch {
      // best effort — clear local session regardless
    }
    clear();
    navigate("/login", { replace: true });
  }

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles.logo} aria-hidden="true">
            95
          </div>
          <span>
            Система тестирования
            <br />
            ИрНИТУ
          </span>
        </div>

        <nav className={styles.nav}>
          {groups.map((group, i) => (
            <div key={i} className={styles.navGroup}>
              {group.title && <div className={styles.navGroupTitle}>{group.title}</div>}
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <NavLink to="/settings" className={styles.navItem}>
            Настройки
          </NavLink>
          <button type="button" className={styles.logoutButton} onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </aside>

      <div className={styles.main}>
        <header className={styles.topbar}>
          <div />
          <div className={styles.userChip}>
            <div className={styles.avatar} aria-hidden="true">
              {(user?.full_name || user?.nickname || "?").slice(0, 1).toUpperCase()}
            </div>
            <div>
              <div className={styles.userName}>{user?.full_name || user?.nickname}</div>
              <div className={styles.userRole}>{ROLE_LABELS[user?.role ?? "student"]}</div>
            </div>
          </div>
        </header>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
