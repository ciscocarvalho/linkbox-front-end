import { DashboardFolder } from "../../types";
import { Button } from "@/components/ui/Button";
import { FormProvider } from "@/components/ui/Form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useValidationForm from "@/hooks/useValidationForm";
import { FolderSchema, getFolderSchema } from "../../utils/folderSchema";
import CustomFormField from "@/components/ui/Form/CustomFormField";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface ItemFormProps {
  editItem: Function;
}

type FolderFormProps = ItemFormProps & { folder: DashboardFolder };


export type FolderForm = z.infer<FolderSchema>;

const FolderForm: React.FC<FolderFormProps> = ({ editItem, folder }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const form = useForm<FolderForm>({
    resolver: zodResolver(getFolderSchema()),
    defaultValues: folder,
  });

  const { onValid, errorModal } = useValidationForm({
    form,
    getPayload: async (data: FolderForm) => {
      return await editItem({ name: data.name.trim() });
    },
    onSuccess: () => {},
    onLoadingStart: () => setLoading(true),
    onLoadingEnd: () => setLoading(false),
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
            <h3 className="text-xl">
              {t("page.dashboard.dialog.edit-item.title.folder")}
            </h3>
          </div>

          <div className="mb-8">
            <CustomFormField
              control={form.control}
              name={"name"}
              label={t("page.dashboard.form.folder.label.name")}
            />
          </div>

          <Button
            className={"self-end"}
            type="submit"
            loading={loading}
            disabled={loading}
          >
            {t("page.dashboard.dialog.edit-item.save.folder")}
          </Button>
        </form>
      </FormProvider>
    </>
  );
};

export default FolderForm;
