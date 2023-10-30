"use client";
import React, { useState } from 'react';
import InputIcon from './InputIcon';

interface PasswordVisibilityTogglerProps {
 passwordInputRef: React.RefObject<HTMLInputElement>
}

const PasswordVisibilityToggler: React.FC<PasswordVisibilityTogglerProps> = ({ passwordInputRef }) => {
  const [visible, setVisible] = useState(false);

  return (
    <button onClick={(e) => {
      e.preventDefault()
      if (!passwordInputRef.current) {
        return;
      }
      setVisible(!visible)
      passwordInputRef.current.type = visible ? "password" : "text";
      passwordInputRef.current.focus();
    }}>
      <InputIcon name={visible ? "visibility_off" : "visibility"} />
    </button>
  );
};

export default PasswordVisibilityToggler;
