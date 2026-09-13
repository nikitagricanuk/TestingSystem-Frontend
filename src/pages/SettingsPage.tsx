import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { AppLayout } from "../routes/AppLayout";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Autocomplete } from "../components/ui/Autocomplete";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { updateProfile, changePassword } from "../lib/api/settings";
import { searchSettlements, searchSchools, type Settlement, type School } from "../lib/api/geo";
import type { ApiError } from "../lib/api/types";

import styles from "./SettingsPage.module.css";

const profileSchema = z.object({
  full_name: z.string().min(3, "Введите ФИО"),
  age: z.string().optional(),
  phone: z.string().optional(),
});
type ProfileValues = z.infer<typeof profileSchema>;

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Введите текущий пароль"),
    newPassword: z.string().min(8, "Минимум 8 символов"),
    confirmPassword: z.string().min(1, "Повторите новый пароль"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });
type PasswordValues = z.infer<typeof passwordSchema>;

export function SettingsPage() {
  const { data: user } = useCurrentUser();
  const queryClient = useQueryClient();

  const [settlementQuery, setSettlementQuery] = useState("");
  const [selectedSettlement, setSelectedSettlement] = useState<Settlement | null>(null);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [schoolQuery, setSchoolQuery] = useState("");
  const [profileMessage, setProfileMessage] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    formState: { errors: profileErrors, isSubmitting: profileSubmitting },
  } = useForm<ProfileValues>({ resolver: zodResolver(profileSchema) });

  useEffect(() => {
    if (user) {
      resetProfile({
        full_name: user.full_name || "",
        age: user.age != null ? String(user.age) : "",
        phone: user.phone || "",
      });
      if (user.school) {
        setSelectedSchool(user.school);
      }
    }
  }, [user, resetProfile]);

  const profileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (updated) => {
      queryClient.setQueryData(["me"], updated);
      setProfileMessage("Данные сохранены");
      setProfileError(null);
    },
    onError: (err) => {
      const detail = (err as AxiosError<ApiError>).response?.data?.detail;
      setProfileError(detail ?? "Не удалось сохранить изменения");
      setProfileMessage(null);
    },
  });

  function onProfileSubmit(values: ProfileValues) {
    profileMutation.mutate({
      full_name: values.full_name,
      age: values.age ? Number(values.age) : null,
      phone: values.phone || undefined,
      school: selectedSchool ? { id: selectedSchool.id } : undefined,
    });
  }

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors, isSubmitting: passwordSubmitting },
  } = useForm<PasswordValues>({ resolver: zodResolver(passwordSchema) });

  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const passwordMutation = useMutation({
    mutationFn: (values: PasswordValues) => changePassword(values.currentPassword, values.newPassword),
    onSuccess: () => {
      setPasswordMessage("Пароль изменён");
      setPasswordError(null);
      resetPassword({ currentPassword: "", newPassword: "", confirmPassword: "" });
    },
    onError: (err) => {
      const detail = (err as AxiosError<ApiError>).response?.data?.detail;
      setPasswordError(detail ?? "Не удалось изменить пароль");
      setPasswordMessage(null);
    },
  });

  return (
    <AppLayout>
      <div className={styles.page}>
        <h1 className={styles.title}>Настройки</h1>

        <Card className={styles.card}>
          <h2 className={styles.cardTitle}>Личные данные</h2>
          <form onSubmit={handleProfileSubmit(onProfileSubmit)} className={styles.form} noValidate>
            <Input label="ФИО" error={profileErrors.full_name?.message} {...registerProfile("full_name")} />
            <div className={styles.row}>
              <Input label="Возраст" type="number" {...registerProfile("age")} />
              <Input label="Телефон" type="tel" {...registerProfile("phone")} />
            </div>

            <Autocomplete
              label="Город"
              placeholder="Начните вводить название"
              value={selectedSettlement ? selectedSettlement.name : settlementQuery}
              onQueryChange={(q) => {
                setSettlementQuery(q);
                setSelectedSettlement(null);
                setSchoolQuery("");
                setSelectedSchool(null);
              }}
              onSearch={searchSettlements}
              getLabel={(s) => s.name}
              onSelect={setSelectedSettlement}
            />
            <Autocomplete
              label="Учебное заведение"
              placeholder={selectedSettlement ? "Начните вводить название" : "Сначала выберите город"}
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

            {profileMessage && <p className={styles.success}>{profileMessage}</p>}
            {profileError && <p className={styles.error}>{profileError}</p>}
            <div className={styles.actions}>
              <Button type="submit" disabled={profileSubmitting}>
                {profileSubmitting ? "Сохраняем…" : "Сохранить"}
              </Button>
            </div>
          </form>
        </Card>

        <Card className={styles.card}>
          <h2 className={styles.cardTitle}>Смена пароля</h2>
          {user?.is_guest ? (
            <p className={styles.hint}>Гостевым аккаунтам смена пароля недоступна.</p>
          ) : (
            <form onSubmit={handlePasswordSubmit((v) => passwordMutation.mutate(v))} className={styles.form} noValidate>
              <Input
                label="Текущий пароль"
                type="password"
                error={passwordErrors.currentPassword?.message}
                {...registerPassword("currentPassword")}
              />
              <Input
                label="Новый пароль"
                type="password"
                error={passwordErrors.newPassword?.message}
                {...registerPassword("newPassword")}
              />
              <Input
                label="Повторите новый пароль"
                type="password"
                error={passwordErrors.confirmPassword?.message}
                {...registerPassword("confirmPassword")}
              />
              {passwordMessage && <p className={styles.success}>{passwordMessage}</p>}
              {passwordError && <p className={styles.error}>{passwordError}</p>}
              <div className={styles.actions}>
                <Button type="submit" disabled={passwordSubmitting}>
                  {passwordSubmitting ? "Сохраняем…" : "Изменить пароль"}
                </Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </AppLayout>
  );
}
