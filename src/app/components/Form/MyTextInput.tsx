import { TextInput } from "flowbite-react";

type MyTextInputProps = React.ComponentProps<typeof TextInput> & {
  name: string;
  value: string;
  setValue: Function;
  error: string;
};

const MyTextInput: React.FC<MyTextInputProps> = ({ name, value, setValue, error, ...props }) => {
  const children = props.children;
  delete props.children;

  return <div className="h-[80px]">
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
