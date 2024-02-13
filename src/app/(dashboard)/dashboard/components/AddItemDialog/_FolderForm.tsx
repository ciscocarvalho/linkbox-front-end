"use client";
import useValidationForm from "../../../../../hooks/useValidationForm";
import { FormProvider } from "@/components/ui/Form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { FolderSchema, getFolderSchema } from "../../utils/folderSchema";
import CustomFormField from "@/components/ui/Form/CustomFormField";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface ItemFormProps {
  addItem: Function;
}

type FolderForm = z.infer<FolderSchema>;

const FolderForm: React.FC<ItemFormProps> = ({ addItem }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const defaultValues: FolderForm = { name: "" };
  const form = useForm<FolderForm>({
    resolver: zodResolver(getFolderSchema()),
    defaultValues,
  });

  const { onValid, errorModal } = useValidationForm({
    form,
    getPayload: async (data: FolderForm) => {
      return await addItem({ name: data.name.trim(), items: [] });
    },
    onLoadingStart: () => setLoading(true),
    onLoadingEnd: () => setLoading(false),
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
              label={t("page.dashboard.form.folder.label.name")}
              disabled={loading}
            />
          </div>

          <Button
            className={"self-end"}
            type="submit"
            loading={loading}
            disabled={loading}
          >
            {t("page.dashboard.dialog.add-item.save.folder")}
          </Button>
        </form>
      </FormProvider>
    </>
  );
};

export default FolderForm;
