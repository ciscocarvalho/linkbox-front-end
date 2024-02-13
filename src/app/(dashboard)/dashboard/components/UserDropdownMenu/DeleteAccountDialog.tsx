"use client";
import React, { useState } from "react";
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
import { useTranslation } from "react-i18next";
import { t } from "i18next";

const passwordConfirmationSchema = z.object({
  password: z.string().min(1, t("shared.input.error.password.required")),
})

type PasswordConfirmation = z.infer<typeof passwordConfirmationSchema>;

interface DeleteAccountFormProps {}

const DeleteAccountForm: React.FC<DeleteAccountFormProps> = ({}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const form = useForm<PasswordConfirmation>({
    resolver: zodResolver(passwordConfirmationSchema),
    defaultValues: { password: "" },
  });

  const { errorModal, onValid } = useValidationForm<PasswordConfirmation>({
    form,
    onSuccess: () => {},
    getPayload: ({ password }) => deleteAccount(password),
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
          className={"flex flex-col gap-5"}
          onSubmit={form.handleSubmit(onValid)}
        >
          <h3 className="text-destructive">
            {t("shared.warn.delete-account")}
          </h3>

          <div className="mb-8">
            <PasswordFormField
              label={t("shared.input.label.password-before-deleting-account")}
              control={form.control}
              name="password"
              disabled={loading}
            />
          </div>

          <Button
            className={"self-end"}
            variant={"destructive"}
            type={"submit"}
            disabled={loading}
          >
            {t("shared.button.delete-account")}
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
