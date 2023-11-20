import React from 'react';

interface InputContainerProps {
  children: React.ReactNode;
  className?: string;
}

const InputContainer: React.FC<InputContainerProps> = ({ children, className }) => {
  return (
    <div
      className={`relative rounded-[20px] p-0 w-[100%]${className ? " " + className : ""}`}
    >
      {children}
    </div>
  )
};

export default InputContainer;
