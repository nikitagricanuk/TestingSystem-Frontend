import type { ComponentType, SVGProps } from "react";

import styles from "./IconTabs.module.css";

export interface IconTabItem<T extends string> {
  key: T;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

interface IconTabsProps<T extends string> {
  items: IconTabItem<T>[];
  active: T;
  onChange: (key: T) => void;
}

export function IconTabs<T extends string>({ items, active, onChange }: IconTabsProps<T>) {
  return (
    <div className={styles.tabs}>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.key === active;
        return (
          <button
            key={item.key}
            type="button"
            className={isActive ? styles.pillActive : styles.pill}
            onClick={() => onChange(item.key)}
            title={item.label}
          >
            <Icon className={styles.icon} />
            {isActive && <span>{item.label}</span>}
          </button>
        );
      })}
    </div>
  );
}
