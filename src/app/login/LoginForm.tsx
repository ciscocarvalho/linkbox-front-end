"use client";
import React, { useRef, useState } from 'react';
import { getPasswordError, getEmailError } from "../Util/AuthForm";
import PasswordVisibilityToggler from '../components/PasswordVisibilityToggler';
import PrimaryButton from '../components/PrimaryButton';
import InputContainer from '../components/InputContainer';
import Input from '../components/Input';
import InputIcon from '../components/InputIcon';
import FormInputError from '../components/FormInputError';

const LoginForm: React.FC = () => {
  const password = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<string | undefined>();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
      const newEmailError = getEmailError(email.current!.value);
      const newPasswordError = getPasswordError(password.current!.value);

      if (newEmailError || newPasswordError) {
          setEmailError(newEmailError);
          setPasswordError(newPasswordError);
          return;
      }

      window.location.href = "dashboard";
  }

  return <form className="flex gap-[20px] flex-col justify-center items-center w-[70%] mt-[60px]" onSubmit={handleSubmit}>
      <InputContainer>
          <Input type="email" placeholder="Email" id="inputEmail" ref={email} />
          <label htmlFor="inputEmail">
              <InputIcon name="mail" />
              <FormInputError message={emailError} />
          </label>
      </InputContainer>

      <InputContainer>
          <Input type="password" placeholder="Senha" id="input-senha" ref={password} />
          <label htmlFor="input-senha">
              <FormInputError message={passwordError} />
          </label>
          <PasswordVisibilityToggler passwordInputRef={password} />
      </InputContainer>

      <PrimaryButton type="submit">
          <span>Entrar</span>
      </PrimaryButton>
  </form>
};

export default LoginForm;
