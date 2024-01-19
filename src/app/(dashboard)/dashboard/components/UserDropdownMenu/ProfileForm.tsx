"use client";
import useValidationForm from "../../../../../hooks/useValidationForm";
import { FormProvider } from "@/components/ui/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import CustomFormField from "@/components/ui/Form/CustomFormField";
import { updateCurrentUser } from "../../services/updateCurrentUser";
import { z } from "zod";
import userSchema from "../../../../../schemas/userSchema";

type User = z.infer<typeof userSchema>;

interface AccountFormProps {
  onSuccess: (payload: any) => void;
  defaultValues: User;
}

const ProfileForm: React.FC<AccountFormProps> = ({
  onSuccess,
  defaultValues,
}) => {
  const form = useForm<User>({
    resolver: zodResolver(userSchema),
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
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-[inherit]"
          onSubmit={form.handleSubmit(onValid)}
        >
          <div className="mb-8">
            <CustomFormField
              control={form.control}
              name={"username"}
              label={"Nome"}
            />
          </div>

          <div className="mb-8">
            <CustomFormField
              control={form.control}
              name={"email"}
              label={"Email"}
            />
          </div>

          <Button className={"self-end"} type="submit">
            Salvar perfil
          </Button>
        </form>
      </FormProvider>
    </>
  );
};

export default ProfileForm;
