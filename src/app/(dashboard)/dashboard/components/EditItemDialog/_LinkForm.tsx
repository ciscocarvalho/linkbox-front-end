import { DashboardLink } from "../../types";
import { FormProvider } from "@/components/ui/Form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useValidationForm from "@/hooks/useValidationForm";
import { Button } from "@/components/ui/Button";
import linkSchema from "../../utils/linkSchema";
import CustomFormField from "@/components/ui/Form/CustomFormField";

export type LinkForm = z.infer<typeof linkSchema>;

interface ItemFormProps {
  editItem: Function;
}

type LinkFormProps = ItemFormProps & { link: DashboardLink };

const LinkForm: React.FC<LinkFormProps> = ({ editItem, link }) => {
  const form = useForm<LinkForm>({
    resolver: zodResolver(linkSchema),
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
            <h3 className="text-xl">Editar link</h3>
          </div>

          <div className="mb-8">
            <CustomFormField
              control={form.control}
              name={"url"}
              label={"URL"}
            />
          </div>

          <div className="mb-8">
            <CustomFormField
              control={form.control}
              name={"title"}
              label={"Título"}
            />
          </div>

          <Button type={"submit"} className={"self-end"}>
            Salvar
          </Button>
        </form>
      </FormProvider>
    </>
  );
};

export default LinkForm;
