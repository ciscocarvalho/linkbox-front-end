"use client";
import useValidationForm from "../../../../../hooks/useValidationForm";
import { FormProvider } from "@/components/ui/Form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { LinkSchema, getLinkSchema } from "../../utils/linkSchema";
import CustomFormField from "@/components/ui/Form/CustomFormField";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface ItemFormProps {
  addItem: Function;
}

type LinkForm = z.infer<LinkSchema>;

const LinkForm: React.FC<ItemFormProps> = ({ addItem }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const getPayload = async (data: LinkForm) => {
    return await addItem({
      title: data.title.trim(),
      url: data.url.trim(),
    });
  };

  const defaultValues: LinkForm = { title: "", url: "" };
  const form = useForm<LinkForm>({
    resolver: zodResolver(getLinkSchema()),
    defaultValues,
  });

  const { onValid, errorModal } = useValidationForm<LinkForm>({
    getPayload,
    expectedErrorType: "ITEM_ERROR",
    onSuccess: () => {},
    onLoadingStart: () => setLoading(true),
    onLoadingEnd: () => setLoading(false),
    form,
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
              name={"url"}
              label={t("page.dashboard.form.link.label.url")}
              disabled={loading}
            />
          </div>

          <div className="mb-8">
            <CustomFormField
              control={form.control}
              label={t("page.dashboard.form.link.label.title")}
              name={"title"}
              disabled={loading}
            />
          </div>

          <Button
            className={"self-end"}
            type="submit"
            loading={loading}
            disabled={loading}
          >
            {t("page.dashboard.dialog.add-item.save.link")}
          </Button>
        </form>
      </FormProvider>
    </>
  );
};

export default LinkForm;
