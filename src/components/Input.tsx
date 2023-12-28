import React, { forwardRef } from 'react';

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { children, ...inputProps },
  ref
) {
  let className = "bg-[#E8E8E8] p-[20px] border-none h-[50px] w-[100%] rounded-[20px] outline-hidden focus:outline focus:outline-[2px] focus:outline-[grey] max-[651px]:bg-[#E8E8E8] max-[651px]:p-[20px] max-[651px]:border-none max-[651px]:w-[100%] max-[651px]:rounded-[20px] max-[651px]:outline-hidden";

  if (inputProps.className) {
    className = [inputProps.className, className].join(" ");
  }

  return (
    <input {...inputProps} className={className} ref={ref}>
      {children}
    </input>
  );
});

export default Input;
