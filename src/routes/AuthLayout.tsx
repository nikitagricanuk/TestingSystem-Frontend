import type { ReactNode } from "react";

import styles from "./AuthLayout.module.css";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.page}>
      <div className={styles.panel}>{children}</div>
      <div className={styles.hero}>
        <p className={styles.heroText}>
          Твой путь к
          <br />
          знаниям
          <br />
          начинается
          <br />
          здесь!
        </p>
      </div>
    </div>
  );
}
