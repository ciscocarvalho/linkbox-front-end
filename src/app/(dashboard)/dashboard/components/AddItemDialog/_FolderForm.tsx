"use client";
import useValidationForm from "../../../../../hooks/useValidationForm";
import { FormProvider } from "@/components/ui/Form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import folderSchema from "../../utils/folderSchema";
import CustomFormField from "@/components/ui/Form/CustomFormField";

interface ItemFormProps {
  addItem: Function;
}

type FolderForm = z.infer<typeof folderSchema>;

const FolderForm: React.FC<ItemFormProps> = ({ addItem }) => {
  const defaultValues: FolderForm = { name: "" };
  const form = useForm<FolderForm>({
    resolver: zodResolver(folderSchema),
    defaultValues,
  });

  const { onValid, errorModal } = useValidationForm({
    form,
    getPayload: async (data: FolderForm) => {
      return await addItem({ name: data.name.trim(), items: [] });
    },
    onSuccess: () => {},
    expectedErrorType: "ITEM_ERROR",
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
              name={"name"}
              label={"Nome"}
            />
          </div>

          <Button className={"self-end"} type="submit">
            Adicionar pasta
          </Button>
        </form>
      </FormProvider>
    </>
  );
};

export default FolderForm;
