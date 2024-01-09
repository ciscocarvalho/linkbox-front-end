"use client";
import useValidationForm from "../../../../../hooks/useValidationForm";
import { FormProvider } from "@/components/ui/Form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import linkSchema from "../../utils/linkSchema";
import CustomFormField from "@/components/ui/Form/CustomFormField";

interface ItemFormProps {
  addItem: Function;
}

type LinkForm = z.infer<typeof linkSchema>;

const LinkForm: React.FC<ItemFormProps> = ({ addItem }) => {
  const getPayload = async (data: LinkForm) => {
    return await addItem({
      title: data.title.trim(),
      url: data.url.trim(),
    });
  };

  const defaultValues: LinkForm = { title: "", url: "" };
  const form = useForm<LinkForm>({
    resolver: zodResolver(linkSchema),
    defaultValues,
  });

  const { onValid, errorModal } = useValidationForm<LinkForm>({
    getPayload,
    expectedErrorType: "ITEM_ERROR",
    onSuccess: () => {},
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
              label={"URL"}
            />
          </div>

          <div className="mb-8">
            <CustomFormField
              control={form.control}
              label={"Título"}
              name={"title"}
            />
          </div>

          <Button className={"self-end"} type="submit">
            Adicionar link
          </Button>
        </form>
      </FormProvider>
    </>
  );
};

export default LinkForm;
