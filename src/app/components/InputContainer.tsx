import React from 'react';

interface InputContainerProps {
  children: React.ReactNode;
  className?: string;
}

const InputContainer: React.FC<InputContainerProps> = ({ children, className }) => {
  const defaultClassName = "relative w-[350px] rounded-[20px] p-0 max-[360px]:w-[300px] max-[315px]:w-[280px] max-[285px]:w-[250px]";

  if (className) {
    className = [defaultClassName, className].join(" ")
  } else {
    className = defaultClassName;
  }

  return (
    <div className={className}>
      {children}
    </div>
  )
};

export default InputContainer;
