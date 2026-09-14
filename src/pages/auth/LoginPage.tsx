import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

import { AuthLayout } from "../../routes/AuthLayout";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { login, loginAsGuest, fetchCurrentUser } from "../../lib/api/auth";
import { useAuthStore } from "../../store/auth";
import type { ApiError } from "../../lib/api/types";
import badge from "../../assets/irnitu-badge.png";

import styles from "./LoginPage.module.css";

const schema = z.object({
  email: z.string().email("Введите корректный e-mail"),
  password: z.string().min(1, "Введите пароль"),
});

type FormValues = z.infer<typeof schema>;

export function LoginPage() {
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const [guestLoading, setGuestLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function completeLogin(tokens: Awaited<ReturnType<typeof login>>) {
    useAuthStore.getState().setTokens(tokens);
    const user = await fetchCurrentUser();
    setSession(tokens, user);
    navigate("/", { replace: true });
  }

  async function onSubmit(values: FormValues) {
    setFormError(null);
    try {
      const tokens = await login(values.email, values.password);
      await completeLogin(tokens);
    } catch (err) {
      const detail = (err as AxiosError<ApiError>).response?.data?.detail;
      setFormError(detail ?? "Не удалось войти. Проверьте почту и пароль.");
    }
  }

  async function onGuest() {
    setFormError(null);
    setGuestLoading(true);
    try {
      const tokens = await loginAsGuest();
      await completeLogin(tokens);
    } catch {
      setFormError("Не удалось войти как гость. Попробуйте ещё раз.");
    } finally {
      setGuestLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className={styles.brand}>
        <img src={badge} alt="" className={styles.logo} aria-hidden="true" />
        <span className={styles.brandName}>
          Система тестирования
          <br />
          ИрНИТУ
        </span>
      </div>

      <div className={styles.headerRow}>
        <h1 className={styles.title}>Войти</h1>
        <button type="button" className={styles.guestLink} onClick={onGuest} disabled={guestLoading}>
          {guestLoading ? "Входим…" : "Продолжить как гость"}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
        <Input
          label="Почта"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Пароль"
          type="password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />

        {formError && <p className={styles.formError}>{formError}</p>}

        <div className={styles.actionsRow}>
          <label className={styles.remember}>
            <input type="checkbox" defaultChecked />
            Запомнить меня
          </label>
          <Button type="submit" variant="outline" disabled={isSubmitting}>
            {isSubmitting ? "Входим…" : "Войти"}
          </Button>
        </div>
      </form>

      <div className={styles.links}>
        <button type="button" className={styles.textLink} disabled>
          Забыли пароль?
        </button>
        <span className={styles.linksSecondary}>
          Нет аккаунта? <Link to="/signup">Зарегистрироваться</Link>
        </span>
      </div>

      <div className={styles.divider}>
        <span>или</span>
      </div>

      <p className={styles.socialLabel}>Войти с помощью</p>
      <div className={styles.socialRow}>
        {["VK", "Я", "GH", "Госуслуги"].map((label) => (
          <button key={label} type="button" className={styles.socialButton} disabled title="Пока недоступно">
            {label}
          </button>
        ))}
      </div>

    </AuthLayout>
  );
}
