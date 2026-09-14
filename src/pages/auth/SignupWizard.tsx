import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

import { AuthLayout } from "../../routes/AuthLayout";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Autocomplete } from "../../components/ui/Autocomplete";
import { signup, login, fetchCurrentUser } from "../../lib/api/auth";
import { searchSettlements, searchSchools, type Settlement, type School } from "../../lib/api/geo";
import { useAuthStore } from "../../store/auth";
import type { ApiError } from "../../lib/api/types";
import badge from "../../assets/irnitu-badge.png";

import styles from "./SignupWizard.module.css";

const STEP_COUNT = 5;

const schema = z.object({
  fullName: z.string().min(3, "Введите фамилию, имя и отчество"),
  birthDate: z.string().min(1, "Введите дату рождения"),
  email: z.string().email("Введите корректный e-mail"),
  phone: z.string().min(5, "Введите номер телефона"),
  password: z.string().min(8, "Минимум 8 символов"),
  passwordConfirm: z.string(),
});

type FormValues = z.infer<typeof schema>;

function computeAge(birthDate: string): number | null {
  const dob = new Date(birthDate);
  if (Number.isNaN(dob.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const monthDiff = now.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) age--;
  return age;
}

function deriveNickname(fullName: string): string {
  // Russian ФИО order is Фамилия(surname) Имя(first name) Отчество(patronymic);
  // greet by the first name (second token) when it's given in full.
  const parts = fullName.trim().split(/\s+/);
  return (parts.length >= 2 ? parts[1] : parts[0]) || fullName;
}

export function SignupWizard() {
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);

  const [step, setStep] = useState(0);
  const [settlementQuery, setSettlementQuery] = useState("");
  const [selectedSettlement, setSelectedSettlement] = useState<Settlement | null>(null);
  const [schoolQuery, setSchoolQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [otpCode, setOtpCode] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    trigger,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: "onSubmit" });

  const fullName = watch("fullName");

  async function goNext() {
    if (step === 0) {
      if (!(await trigger(["fullName", "birthDate"]))) return;
    } else if (step === 1) {
      if (!selectedSettlement || !selectedSchool) {
        setGeoError("Выберите город и учебное заведение из списка");
        return;
      }
      setGeoError(null);
    } else if (step === 2) {
      if (!(await trigger(["email", "phone"]))) return;
    } else if (step === 3) {
      // No real OTP backend yet — this step is UI-only and always accepts.
    }
    setStep((s) => Math.min(s + 1, STEP_COUNT - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function onSubmit(values: FormValues) {
    if (values.password !== values.passwordConfirm) {
      return;
    }
    setSubmitError(null);
    setSubmitting(true);
    try {
      await signup({
        full_name: values.fullName,
        nickname: deriveNickname(values.fullName),
        age: computeAge(values.birthDate),
        email: values.email,
        phone: values.phone,
        password: values.password,
        school: selectedSchool ? { id: selectedSchool.id } : null,
      });
      const tokens = await login(values.email, values.password);
      useAuthStore.getState().setTokens(tokens);
      const user = await fetchCurrentUser();
      setSession(tokens, user);
      navigate("/", { replace: true });
    } catch (err) {
      const detail = (err as AxiosError<ApiError>).response?.data?.detail;
      setSubmitError(detail ?? "Не удалось завершить регистрацию. Попробуйте ещё раз.");
      setSubmitting(false);
    }
  }

  const passwordConfirmMismatch =
    watch("password") && watch("passwordConfirm") && watch("password") !== watch("passwordConfirm")
      ? "Пароли не совпадают"
      : undefined;

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

      <div className={styles.progress}>
        {Array.from({ length: STEP_COUNT }).map((_, i) => (
          <span key={i} className={i <= step ? styles.progressSegmentActive : styles.progressSegment} />
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {step === 0 && (
          <div className={styles.step}>
            <h1 className={styles.title}>Привет! Давай знакомиться</h1>
            <Input
              label="Фамилия, имя и отчество"
              hint="Нужны нам для идентификации в системе"
              error={errors.fullName?.message}
              {...register("fullName")}
            />
            <Input
              label="Дата рождения"
              type="date"
              hint="Информация доступна только приёмной комиссии — не передаётся никому"
              error={errors.birthDate?.message}
              {...register("birthDate")}
            />
          </div>
        )}

        {step === 1 && (
          <div className={styles.step}>
            <h1 className={styles.title}>
              {fullName ? `Приятно познакомиться, ${deriveNickname(fullName)}!` : "Приятно познакомиться!"}
              <br />
              Расскажи, где ты учишься
            </h1>
            <Autocomplete
              label="Город"
              placeholder="Начните вводить название"
              hint="Выбери подходящее из списка"
              value={selectedSettlement ? selectedSettlement.name : settlementQuery}
              onQueryChange={(q) => {
                setSettlementQuery(q);
                setSelectedSettlement(null);
                setSelectedSchool(null);
                setSchoolQuery("");
              }}
              onSearch={searchSettlements}
              getLabel={(s) => s.name}
              onSelect={setSelectedSettlement}
            />
            <Autocomplete
              label="Учебное заведение"
              placeholder={selectedSettlement ? "Начните вводить название" : "Сначала выберите город"}
              hint="Нужна для составления рейтинга"
              value={selectedSchool ? selectedSchool.short_name || selectedSchool.full_name : schoolQuery}
              disabled={!selectedSettlement}
              onQueryChange={(q) => {
                setSchoolQuery(q);
                setSelectedSchool(null);
              }}
              onSearch={(q) => (selectedSettlement ? searchSchools(selectedSettlement.id, q) : Promise.resolve([]))}
              getLabel={(s) => s.short_name || s.full_name}
              onSelect={setSelectedSchool}
            />
            {geoError && <p className={styles.formError}>{geoError}</p>}
          </div>
        )}

        {step === 2 && (
          <div className={styles.step}>
            <h1 className={styles.title}>
              Осталось немного
              <br />
              Расскажи как с тобой связаться
            </h1>
            <Input
              label="Почта"
              type="email"
              hint="На неё придёт сертификат"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Телефон"
              type="tel"
              hint="С помощью него мы сможем с тобой связаться"
              error={errors.phone?.message}
              {...register("phone")}
            />
          </div>
        )}

        {step === 3 && (
          <div className={styles.step}>
            <h1 className={styles.title}>
              Проверь свою почту
              <br />
              Мы отправили код на {watch("email")} — введи его ниже
            </h1>
            <Input
              label="OTP код"
              hint="Он нужен, чтобы убедиться, что адрес рабочий"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
            />
          </div>
        )}

        {step === 4 && (
          <div className={styles.step}>
            <h1 className={styles.title}>
              Остался последний шаг
              <br />
              Придумай надёжный пароль
            </h1>
            <Input
              label="Пароль"
              type="password"
              hint="Минимум 8 символов"
              error={errors.password?.message}
              {...register("password")}
            />
            <Input
              label="Пароль ещё раз"
              type="password"
              hint="Чтобы не ошибиться"
              error={errors.passwordConfirm?.message || passwordConfirmMismatch}
              {...register("passwordConfirm")}
            />
            {submitError && <p className={styles.formError}>{submitError}</p>}
          </div>
        )}

        <div className={styles.actions}>
          {step > 0 && (
            <Button type="button" variant="secondary" onClick={goBack}>
              Назад
            </Button>
          )}
          <div className={styles.spacer} />
          {step < STEP_COUNT - 1 ? (
            <Button type="button" variant="outline" onClick={goNext}>
              Продолжить
            </Button>
          ) : (
            <Button type="submit" variant="outline" disabled={submitting}>
              {submitting ? "Завершаем…" : "Завершить"}
            </Button>
          )}
        </div>
      </form>

      <p className={styles.footer}>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </AuthLayout>
  );
}
