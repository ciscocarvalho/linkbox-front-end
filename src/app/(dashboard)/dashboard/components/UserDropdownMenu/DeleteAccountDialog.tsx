import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "../../../../../components/ui/Dialog";
import useValidationForm from "../../../../../hooks/useValidationForm";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../../../../../components/ui/Button";
import { deleteAccount } from "../../services/deleteAccount";
import PasswordFormField from "../../../../../components/ui/Form/PasswordFormField";
import { zodResolver } from "@hookform/resolvers/zod";

const passwordConfirmationSchema = z.object({
  password: z.string().min(1, "A senha é obrigatória."),
})

type PasswordConfirmation = z.infer<typeof passwordConfirmationSchema>;

interface DeleteAccountFormProps {}

const DeleteAccountForm: React.FC<DeleteAccountFormProps> = ({}) => {
  const form = useForm<PasswordConfirmation>({
    resolver: zodResolver(passwordConfirmationSchema),
    defaultValues: { password: "" },
  });

  const { errorModal, onValid } = useValidationForm<PasswordConfirmation>({
    form,
    onSuccess: () => {},
    getPayload: ({ password }) => deleteAccount(password),
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
          className={"flex flex-col gap-5"}
          onSubmit={form.handleSubmit(onValid)}
        >
          <h3 className="text-destructive">
            Você está prestes a excluir sua conta, isso é uma ação
            irreversível. Tenha certeza do que está fazendo antes de
            prosseguir, você não poderá recuperar sua conta depois.
          </h3>

          <div className="mb-8">
            <PasswordFormField
              label="Digite sua senha"
              control={form.control}
              name="password"
            />
          </div>

          <Button
            className={"self-end"}
            variant={"destructive"}
            type={"submit"}
          >
            Excluir conta
          </Button>
        </form>
      </FormProvider>
    </>
  );
};

interface DeleteAccountDialogProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteAccountDialog: React.FC<DeleteAccountDialogProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader />
      <DialogContent>
        <div className="space-y-6">
          <DeleteAccountForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountDialog;
