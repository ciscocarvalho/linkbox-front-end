import { useState } from "react";
import { useForm, Form } from "./useForm";
import AuthErrorModal from "../app/(auth)/signup/components/AuthErrorModal";

export const useValidationForm = (
  getPayload: (form: Form) => any,
  errorType: string,
  initialForm: Form
) => {
  const [unhandledErrorMessage, setUnhandledErrorMessage] = useState();
  const [openErrorModal, setOpenErrorModal] = useState(false);

  const context = useForm(async (e, { form, errorSetters }) => {
    const payload = await getPayload(form);
    const errors = payload?.errors;

    if (!errors) {
      return;
    }

    let unhandledError;

    errors.forEach((error: any) => {
      if (error.type === errorType) {
        const setError = (errorSetters as any)[error.field] ?? null;

        if (setError) {
          setError(error.userMessage);
          return;
        }
      }

      unhandledError = error.userMessage ?? true;
    });

    if (unhandledError) {
      setUnhandledErrorMessage(
        unhandledError === true ? undefined : unhandledError
      );
      setOpenErrorModal(true);
    }
  }, initialForm);

  const errorModal = <AuthErrorModal
    openModal={openErrorModal}
    setOpenModal={setOpenErrorModal}
    error={unhandledErrorMessage}
  />

  return { context, unhandledErrorMessage, openErrorModal, setOpenErrorModal, errorModal };
};
