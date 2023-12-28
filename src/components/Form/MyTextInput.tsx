import { TextInput } from "flowbite-react";

type MyTextInputProps = React.ComponentProps<typeof TextInput> & {
  name: string;
  value: string;
  setValue: Function;
  error: string;
  variant?: "normal" | "small";
};

const MyTextInput: React.FC<MyTextInputProps> = ({
  name,
  value,
  setValue,
  error,
  variant = "normal",
  ...props
}) => {
  const children = props.children;
  delete props.children;

  return <div className={variant === "normal" ? "h-[80px]" : "h-[60px]"}>
    <TextInput
      type="text"
      name={name}
      value={value}
      onInput={(e: any) => setValue(e.target.value)}
      color={error ? "failure" : undefined}
      helperText={<span>{error ?? ""}</span>}
      className={"relative"}
      {...props}
    />
    {children}
  </div>
}

export default MyTextInput;
