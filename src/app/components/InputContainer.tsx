import React from 'react';

interface InputContainerProps {
  children: React.ReactNode;
  className?: string;
}

const InputContainer: React.FC<InputContainerProps> = ({ children, className }) => {
  return (
    <div
      className={`relative rounded-[20px] p-0 w-[350px] max-[360px]:w-[300px] max-[315px]:w-[280px] max-[285px]:w-[250px]${className ? " " + className : ""}`}
    >
      {children}
    </div>
  )
};

export default InputContainer;
