import { DashboardLink } from "../../types";
import { FormProvider } from "@/components/ui/Form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useValidationForm from "@/hooks/useValidationForm";
import { Button } from "@/components/ui/Button";
import { LinkSchema, getLinkSchema } from "../../utils/linkSchema";
import CustomFormField from "@/components/ui/Form/CustomFormField";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export type LinkForm = z.infer<LinkSchema>;

interface ItemFormProps {
  editItem: Function;
}

type LinkFormProps = ItemFormProps & { link: DashboardLink };

const LinkForm: React.FC<LinkFormProps> = ({ editItem, link }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const form = useForm<LinkForm>({
    resolver: zodResolver(getLinkSchema()),
    defaultValues: link,
  });

  const { onValid, errorModal } = useValidationForm({
    form,
    getPayload: async (data: LinkForm) => {
      return await editItem({
        title: data.title.trim(),
        url: data.title.trim(),
      });
    },
    onSuccess: () => {},
    onLoadingStart: () => setLoading(true),
    onLoadingEnd: () => setLoading(false),
    expectedErrorType: "ITEM_ERROR",
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
              {t("page.dashboard.dialog.edit-item.title.link")}
            </h3>
          </div>

          <div className="mb-8">
            <CustomFormField
              control={form.control}
              name={"url"}
              label={t("page.dashboard.form.link.label.url")}
            />
          </div>

          <div className="mb-8">
            <CustomFormField
              control={form.control}
              name={"title"}
              label={t("page.dashboard.form.link.label.title")}
            />
          </div>

          <Button
            className={"self-end"}
            type={"submit"}
            loading={loading}
            disabled={loading}
          >
            {t("page.dashboard.dialog.edit-item.save.link")}
          </Button>
        </form>
      </FormProvider>
    </>
  );
};

export default LinkForm;
