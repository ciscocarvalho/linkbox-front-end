import React from "react";
import { z } from "zod";
import { rawAccountSchema } from "../../../../../schemas/accountSchema";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useValidationForm from "../../../../../hooks/useValidationForm";
import { Button } from "../../../../../components/ui/Button";
import { updateCurrentUser } from "../../services/updateCurrentUser";
import PasswordFormField from "../../../../../components/ui/Form/PasswordFormField";
import { changePassword } from "../../services/changePassword";

const schema = z
  .object({
    currentPassword: z.string().min(1, "A senha é obrigatória."),
    newPassword: rawAccountSchema["password"],
    confirmNewPassword: z.string(),
  })
  .refine(
    ({ newPassword, confirmNewPassword }) => {
      return newPassword === confirmNewPassword;
    },
    {
      message: "As senhas não coincidem",
      path: ["confirmNewPassword"],
    }
  );

type Schema = z.infer<typeof schema>;

interface PasswordFormProps {
  onSuccess: (payload: any) => void;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ onSuccess }) => {
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
              label={"Senha atual"}
            />
          </div>

          <div className={"mb-8"}>
            <PasswordFormField
              control={form.control}
              name={"newPassword"}
              label={"Nova senha"}
            />
          </div>

          <div className={"mb-8"}>
            <PasswordFormField
              control={form.control}
              name={"confirmNewPassword"}
              label={"Confirme a nova senha"}
            />
          </div>

          <Button className={"self-end"}>Salvar senha</Button>
        </form>
      </FormProvider>
    </>
  );
};

export default PasswordForm;
