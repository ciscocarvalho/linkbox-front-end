"use client";
import useValidationForm from "../../../../../hooks/useValidationForm";
import { FormProvider } from "@/components/ui/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import CustomFormField from "@/components/ui/Form/CustomFormField";
import { updateCurrentUser } from "../../services/updateCurrentUser";
import { z } from "zod";
import { UserSchema, getUserSchema } from "../../../../../schemas/userSchema";
import DeleteAccountDialog from "./DeleteAccountDialog";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type User = z.infer<UserSchema>;

interface AccountFormProps {
  onSuccess: (payload: any) => void;
  defaultValues: User;
}

const ProfileForm: React.FC<AccountFormProps> = ({
  onSuccess,
  defaultValues,
}) => {
  const { t } = useTranslation();
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);

  const form = useForm<User>({
    resolver: zodResolver(getUserSchema()),
    defaultValues,
  });

  const { onValid, errorModal } = useValidationForm<User>({
    getPayload: async (data) => {
      return updateCurrentUser(data);
    },
    expectedErrorType: "AUTH_ERROR",
    onSuccess,
    form,
  });

  form.watch((_, info) => {
    form.trigger(info.name);
  });

  return (
    <>
      {errorModal}
      <DeleteAccountDialog
        open={openDeleteAccountDialog}
        onOpenChange={setOpenDeleteAccountDialog}
      />
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-[inherit]"
          onSubmit={form.handleSubmit(onValid)}
        >
          <div className="mb-8">
            <CustomFormField
              control={form.control}
              name={"username"}
              label={t("shared.input.label.username")}
            />
          </div>

          <div className="mb-8">
            <CustomFormField
              control={form.control}
              name={"email"}
              label={t("shared.input.label.email")}
            />
          </div>

          <div className="flex gap-[inherit] self-end">
            <Button
              type={"button"}
              variant={"destructive"}
              onClick={() => setOpenDeleteAccountDialog(true)}
            >
              {t("shared.button.delete-account")}
            </Button>

            <Button type="submit">
              {t("shared.button.update-profile")}
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default ProfileForm;
