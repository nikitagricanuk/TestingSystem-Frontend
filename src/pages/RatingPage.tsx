import { AppLayout } from "../routes/AppLayout";
import { LeaderboardTable } from "../components/LeaderboardTable";

import styles from "./RatingPage.module.css";

export function RatingPage() {
  return (
    <AppLayout>
      <div className={styles.page}>
        <h1 className={styles.title}>Рейтинг</h1>
        <LeaderboardTable />
      </div>
    </AppLayout>
  );
}
