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

const formSchema = z.object({
  email: z
    .string()
    .min(1, "O email é obrigatório.")
    .email("Insira um email válido."),
  username: z.string().min(1, "O nome de usuário é obrigatório."),
  password: z
    .string()
    .min(1, "A senha é obrigatória.")
    .min(7, "A senha precisa ter mais de 6 caracteres."),
});

type SignupForm = z.infer<typeof formSchema>;

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

const SignupForm: React.FC = () => {
  const defaultValues: SignupForm = { email: "", username: "", password: "" };
  const form = useForm<SignupForm>({ resolver: zodResolver(formSchema), defaultValues });
  const { onValid, errorModal } = useValidationForm({
    form,
    getPayload: signup,
    onSuccess: useOnSuccess(),
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
            placeholder={"Nome"}
            rightIcon={<Icon name="edit" />}
          />

          <CustomFormField
            control={form.control}
            name={"email"}
            placeholder="Email"
            rightIcon={<Icon name="mail" />}
          />

          <PasswordFormField control={form.control} name={"password"} placeholder="Senha" />

          <Button type="submit" className={"w-full"}>Criar conta</Button>

          <a href="/login" className="text-[15px] text-[#2795DB] mt-[30px]">
            Já possui conta? Entrar
          </a>
        </form>
      </FormProvider>
    </>
  );
};

export default SignupForm;
