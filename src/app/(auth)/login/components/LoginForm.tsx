"use client";
import React, { useState } from "react";
import login from "../../services/login";
import Icon from "../../../../components/Icon";
import { useToken } from "../../../../hooks/useToken";
import useValidationForm from "../../../../hooks/useValidationForm";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import CustomFormField from "@/components/ui/Form/CustomFormField";
import PasswordFormField from "@/components/ui/Form/PasswordFormField";
import { useTranslation } from "react-i18next";
import { t } from "i18next";

const useOnSuccess = () => {
  const { setToken } = useToken();

  const onSuccess = async (payload: any) => {
    if (payload.data?.auth) {
      setToken(payload.data.token);
      window.location.href = "/dashboard";
      return;
    }
  }

  return onSuccess;
}

const getFormSchema = () => {
  return z.object({
    email: z.string().email(t("shared.input.error.email.invalid")),
    password: z.string(),
  });
};

type LoginForm = z.infer<ReturnType<typeof getFormSchema>>;

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const formSchema = getFormSchema();
  const defaultValues: LoginForm = { email: "", password: "" };
  const form = useForm<LoginForm>({ resolver: zodResolver(formSchema), defaultValues });
  const [loading, setLoading] = useState(false);

  const { onValid, errorModal } = useValidationForm({
    form,
    getPayload: (form) => login(form.email, form.password),
    onSuccess: useOnSuccess(),
    onLoadingStart: () => setLoading(true),
    onLoadingEnd: () => setLoading(false),
    expectedErrorType: "AUTH_ERROR",
  });

  form.watch((_, info) => { form.trigger(info.name) });

  return (
    <>
      {errorModal}
      <FormProvider {...form}>
        <form
          className="flex pt-[20px] gap-[inherit] flex-col justify-center items-center w-full"
          onSubmit={form.handleSubmit(onValid)}
        >
          <div className="w-full gap-[10px] flex flex-col">
            <CustomFormField
              control={form.control}
              name={"email"}
              placeholder={t("shared.input.placeholder.email")}
              rightIcon={<Icon name="mail" />}
              disabled={loading}
            />

            <PasswordFormField
              control={form.control}
              name={"password"}
              placeholder={t("shared.input.placeholder.password")}
              disabled={loading}
            />
          </div>

          <Button
            type="submit"
            className={"w-full"}
            disabled={loading}
          >
            {t("shared.button.login")}
          </Button>

          <a href="/signup" className="text-[#2795DB] mt-[30px]">
            {t("shared.link.signup")}
          </a>
        </form>
      </FormProvider>
    </>
  );
};

export default LoginForm;
