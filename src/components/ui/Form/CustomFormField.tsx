import * as React from "react"
import {
  Control,
  FieldValues,
  Path,
} from "react-hook-form"

import { Input } from "../Input"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "."

export interface CustomFormFieldProps<T extends FieldValues>
  extends React.ComponentProps<typeof Input> {
  control: Control<T>,
  name: Path<T>,
  placeholder?: string,
  type?: React.HTMLInputTypeAttribute,
  label?: string,
  wrapper?: React.ComponentProps<typeof FormItem>["wrapper"];
}

const CustomFormField = <T extends FieldValues>({
  control,
  name,
  placeholder,
  type,
  wrapper,
  label,
  ...props
}: CustomFormFieldProps<T>) => {
  return <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem wrapper={wrapper}>
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <Input placeholder={placeholder} type={type} {...field} {...props} />
        </FormControl>
        <FormMessage className="mt-2" />
      </FormItem>
    )}
  />;
};


export default CustomFormField;
