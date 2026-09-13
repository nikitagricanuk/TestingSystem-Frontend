import { type ButtonHTMLAttributes, forwardRef } from "react";

import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", fullWidth, className, ...rest }, ref) => {
    const classes = [styles.button, styles[variant], fullWidth ? styles.fullWidth : ""]
      .filter(Boolean)
      .join(" ");
    return <button ref={ref} className={className ? `${classes} ${className}` : classes} {...rest} />;
  },
);

Button.displayName = "Button";
