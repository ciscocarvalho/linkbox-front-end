import { DashboardFolder } from "../../types";
import { Button } from "@/components/ui/Button";
import { FormProvider } from "@/components/ui/Form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useValidationForm from "@/hooks/useValidationForm";
import folderSchema from "../../utils/folderSchema";
import CustomFormField from "@/components/ui/Form/CustomFormField";

interface ItemFormProps {
  editItem: Function;
}

type FolderFormProps = ItemFormProps & { folder: DashboardFolder };


export type FolderForm = z.infer<typeof folderSchema>;

const FolderForm: React.FC<FolderFormProps> = ({ editItem, folder }) => {
  const form = useForm<FolderForm>({
    resolver: zodResolver(folderSchema),
    defaultValues: folder,
  });

  const { onValid, errorModal } = useValidationForm({
    form,
    getPayload: async (data: FolderForm) => {
      return await editItem({ name: data.name.trim() });
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
          <div className="space-y-6">
            <h3 className="text-xl">Editar pasta</h3>
          </div>

          <div className="mb-8">
            <CustomFormField
              control={form.control}
              name={"name"}
              label={"Nome"}
            />
          </div>

          <Button className={"self-end"} type="submit">Salvar</Button>
        </form>
      </FormProvider>
    </>
  );
};

export default FolderForm;
