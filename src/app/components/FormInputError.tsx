import React from 'react';

interface FormInputErrorProps {
  message?: string;
}

const FormInputError: React.FC<FormInputErrorProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return <small className="text-[#e34141]">{message}</small>;
};

export default FormInputError;
