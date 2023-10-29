import React from 'react';

interface InputContainerProps {
  children: React.ReactNode;
}

const InputContainer: React.FC<InputContainerProps> = ({ children }) => {
  return (
    <div className="input-container relative w-[350px] rounded-[20px] p-0 max-[360px]:w-[300px] max-[315px]:w-[280px] max-[285px]:w-[250px]">
      {children}
    </div>
  )
};

export default InputContainer;
