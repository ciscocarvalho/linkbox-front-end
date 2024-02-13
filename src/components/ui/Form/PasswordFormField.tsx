import { useState } from "react";
import { FieldValues } from "react-hook-form";
import Icon from "../../Icon";
import CustomFormField, { CustomFormFieldProps } from "./CustomFormField";
import { cn } from "../../../lib/utils";

type PasswordFormFieldProps<T extends FieldValues> = CustomFormFieldProps<T>;

const PasswordFormField = <T extends FieldValues>({
  disabled,
  ...props
}: PasswordFormFieldProps<T>) => {
  const [inputType, setInputType] = useState<"text" | "password">("password");
  const iconName = inputType === "password" ? "visibility" : "visibility_off";

  const toggleInputType = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <CustomFormField
      type={inputType}
      disabled={disabled}
      rightIcon={
        <button
          type="button"
          onClick={toggleInputType}
          disabled={disabled}
          className={cn(
            disabled !== true && "pointer-events-auto",
            "flex items-center justify-center"
          )}
        >
          <Icon name={iconName} />
        </button>
      }
      {...props}
    />
  );
};

export default PasswordFormField;
