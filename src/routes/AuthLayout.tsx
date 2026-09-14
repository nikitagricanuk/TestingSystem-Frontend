import type { ReactNode } from "react";

import styles from "./AuthLayout.module.css";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={styles.page}>
      <div className={styles.body}>
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
      <footer className={styles.footer}>
        <span>Политика конфиденциальности</span>
        <span aria-hidden="true">•</span>
        <span>Поддержка</span>
        <span aria-hidden="true">•</span>
        <span>Контакты</span>
      </footer>
    </div>
  );
}
