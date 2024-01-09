import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form"
import { useRef, useState } from "react";
import AuthErrorModal from "@/app/(auth)/signup/components/AuthErrorModal";

type ServerFieldError<T extends FieldValues, Field = FieldPath<T>> = {
  type: string;
  field: Field;
  userMessage: string;
};

type FailHandler<T extends FieldValues> = (errors: ServerFieldError<T>[]) => void;
type ValidHandler<T extends FieldValues> = (data: T) => void;

const useForceUpdate = () => {
  const [_, setValue] = useState(false);
  return () => setValue((value) => !value);
}

const useOnFail = <T extends FieldValues>(form: UseFormReturn<T>, expectedErrorType: string) => {
  const forceUpdate = useForceUpdate();
  const unexpectedErrorMessage = useRef("");
  const failedWithUnexpectedError = useRef(false);

  if (failedWithUnexpectedError.current) {
    failedWithUnexpectedError.current = false;
  } else {
    unexpectedErrorMessage.current = "";
  }

  const onFail: FailHandler<T> = (errors) => {
    unexpectedErrorMessage.current = "";

    errors.forEach((error) => {
      const { field, userMessage: message } = error;
      const errorIsExpected = error.type === expectedErrorType;

      if (errorIsExpected) {
        form.setError(field, { message });
      } else {
        unexpectedErrorMessage.current = message;
      }
    });

    if (unexpectedErrorMessage.current) {
      failedWithUnexpectedError.current = true;
      forceUpdate();
    }
  }

  const errorModal = <AuthErrorModal error={unexpectedErrorMessage.current} />;
  return { onFail, errorModal };
};

const useOnValid = <T extends FieldValues>({
  onFail,
  onSuccess,
  getPayload,
}: {
  onFail: FailHandler<T>;
  onSuccess: (payload: any) => void;
  getPayload: (data: T) => any;
}) => {
  const onValid: ValidHandler<T> = async (data) => {
    const payload = await getPayload(data);
    let errors = payload?.errors;

    if (errors) {
      onFail(errors);
    } else {
      onSuccess(payload);
    }
  }

  return { onValid };
}

const useValidationForm = <T extends FieldValues>({
  form,
  getPayload,
  onSuccess,
  expectedErrorType,
}: {
  form: UseFormReturn<T>;
  getPayload: (data: T) => any;
  onSuccess: (payload: any) => void;
  expectedErrorType: string;
}) => {
  const { onFail, errorModal } = useOnFail(form, expectedErrorType);
  const { onValid } = useOnValid<T>({ onFail, onSuccess, getPayload });
  return { onValid, errorModal };
};

export default useValidationForm;
