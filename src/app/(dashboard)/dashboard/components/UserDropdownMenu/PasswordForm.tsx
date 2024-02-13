"use client"
import React, { useState } from "react";
import { z } from "zod";
import { getAccountSchema } from "../../../../../schemas/accountSchema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useValidationForm from "../../../../../hooks/useValidationForm";
import { Button } from "../../../../../components/ui/Button";
import { updateCurrentUser } from "../../services/updateCurrentUser";
import PasswordFormField from "../../../../../components/ui/Form/PasswordFormField";
import { changePassword } from "../../services/changePassword";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

interface PasswordFormProps {
  onSuccess: (payload: any) => void;
}

const getSchema = () => {
  const accountSchema = getAccountSchema();

  return z
    .object({
      currentPassword: z.string().min(1, t("shared.input.error.password.required")),
      newPassword: accountSchema.shape.password,
      confirmNewPassword: z.string(),
    })
    .refine(
      ({ newPassword, confirmNewPassword }) => {
        return newPassword === confirmNewPassword;
      },
      {
        message: t("page.dashboard.dialog.account.options.password.mismatch-error"),
        path: ["confirmNewPassword"],
      }
    );
};

type Schema = z.infer<ReturnType<typeof getSchema>>;

const PasswordForm: React.FC<PasswordFormProps> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const schema = getSchema();

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { onValid, errorModal } = useValidationForm({
    form,
    onSuccess,
    getPayload: async ({ currentPassword, newPassword }) => {
      return changePassword({ currentPassword, newPassword });
    },
    onLoadingStart: () => setLoading(true),
    onLoadingEnd: () => setLoading(false),
    expectedErrorType: "AUTH_ERROR",
  });

  form.watch((_, info) => {
    form.trigger(info.name);
  });

  return (
    <>
      {errorModal}
      <FormProvider {...form}>
        <form
          className={"flex flex-col gap-[inherit]"}
          onSubmit={form.handleSubmit(onValid)}
        >
          <div className={"mb-8"}>
            <PasswordFormField
              control={form.control}
              name={"currentPassword"}
              label={t("shared.input.placeholder.current-password")}
              disabled={loading}
            />
          </div>

          <div className={"mb-8"}>
            <PasswordFormField
              control={form.control}
              name={"newPassword"}
              label={t("shared.input.placeholder.new-password")}
              disabled={loading}
            />
          </div>

          <div className={"mb-8"}>
            <PasswordFormField
              control={form.control}
              name={"confirmNewPassword"}
              label={t("shared.input.placeholder.confirm-new-password")}
              disabled={loading}
            />
          </div>

          <Button className={"self-end"} disabled={loading}>
            {t("shared.button.update-password")}
          </Button>
        </form>
      </FormProvider>
    </>
  );
};

export default PasswordForm;
