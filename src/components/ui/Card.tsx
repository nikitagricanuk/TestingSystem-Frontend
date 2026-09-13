import type { HTMLAttributes } from "react";

import styles from "./Card.module.css";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...rest }: CardProps) {
  return <div className={className ? `${styles.card} ${className}` : styles.card} {...rest} />;
}
