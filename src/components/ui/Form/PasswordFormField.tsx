import { useState } from "react";
import { FieldValues } from "react-hook-form";
import Icon from "../../Icon";
import CustomFormField, { CustomFormFieldProps } from "./CustomFormField";

type PasswordFormFieldProps<T extends FieldValues> = CustomFormFieldProps<T>;

const PasswordFormField = <T extends FieldValues>(
  props: PasswordFormFieldProps<T>
) => {
  const [inputType, setInputType] = useState<"text" | "password">("password");
  const iconName = inputType === "password" ? "visibility" : "visibility_off";

  const toggleInputType = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <CustomFormField
      type={inputType}
      rightIcon={
        <div
          onClick={toggleInputType}
          className={
            "cursor-pointer pointer-events-auto select-none flex items-center justify-center"
          }
        >
          <Icon name={iconName} />
        </div>
      }
      {...props}
    />
  );
};

export default PasswordFormField;
