"use client";
import React from "react";
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

const formSchema = z.object({
  email: z.string().email("Insira um email válido."),
  password: z.string(),
});

type LoginForm = z.infer<typeof formSchema>;

const LoginForm: React.FC = () => {
  const defaultValues: LoginForm = { email: "", password: "" };
  const form = useForm<LoginForm>({ resolver: zodResolver(formSchema), defaultValues });

  const { onValid, errorModal } = useValidationForm({
    form,
    getPayload: (form) => login(form.email, form.password),
    onSuccess: useOnSuccess(),
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
              placeholder="Email"
              rightIcon={<Icon name="mail" />}
            />

            <PasswordFormField control={form.control} name={"password"} placeholder="Senha" />
          </div>

          <Button type="submit" className={"w-full"}>Entrar</Button>

          <a href="/signup" className="text-[#2795DB] mt-[30px]">
            Ainda não possui conta? Cadastrar
          </a>
        </form>
      </FormProvider>
    </>
  );
};

export default LoginForm;
