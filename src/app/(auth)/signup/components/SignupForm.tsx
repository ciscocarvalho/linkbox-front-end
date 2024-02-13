"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/Button"
import { FormProvider } from "@/components/ui/Form";
import { z } from "zod";
import Icon from "@/components/Icon";
import { useToken } from "@/hooks/useToken";
import signup from "../../services/signup";
import useValidationForm from "@/hooks/useValidationForm";
import CustomFormField from "@/components/ui/Form/CustomFormField";
import PasswordFormField from "@/components/ui/Form/PasswordFormField";
import { AccountSchema, getAccountSchema } from "../../../../schemas/accountSchema";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const useOnSuccess = () => {
  const { setToken } = useToken();

  const onSuccess = (payload: any) => {
    if (payload?.data?.auth) {
      setToken(payload.data.token);
      window.location.href = "/dashboard";
      return;
    }
  }

  return onSuccess;
}

type SignupForm = z.infer<AccountSchema>;

const SignupForm: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const formSchema = getAccountSchema();
  const defaultValues: SignupForm = { email: "", username: "", password: "" };
  const form = useForm<SignupForm>({ resolver: zodResolver(formSchema), defaultValues });

  const { onValid, errorModal } = useValidationForm({
    form,
    getPayload: signup,
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
          onSubmit={form.handleSubmit(onValid)}
          className="flex pt-[20px] flex-col justify-center items-center gap-[inherit] w-[100%] h-[60%] max-[540px]:h-fit"
        >
          <CustomFormField
            control={form.control}
            name={"username"}
            placeholder={t("shared.input.placeholder.username")}
            rightIcon={<Icon name="edit" />}
            disabled={loading}
          />

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

          <Button
            type="submit"
            className={"w-full"}
            disabled={loading}
          >
            {t("shared.button.signup")}
          </Button>

          <a href="/login" className="text-[15px] text-[#2795DB] mt-[30px]">
            {t("shared.link.login")}
          </a>
        </form>
      </FormProvider>
    </>
  );
};

export default SignupForm;
