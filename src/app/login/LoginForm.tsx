"use client";
import React, { useRef, useState } from 'react';
import { getPasswordError, getEmailError } from "../Util/AuthForm";
import PasswordVisibilityToggler from '../components/PasswordVisibilityToggler';
import PrimaryButton from '../components/PrimaryButton';
import InputContainer from '../components/InputContainer';
import Input from '../components/Input';
import InputIcon from '../components/InputIcon';
import FormInputError from '../components/FormInputError';
import { useCookies } from 'react-cookie';
import login from '../../Services/Auth/login';

const LoginForm: React.FC = () => {
  const password = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<string | undefined>();
  const [_, setCookie] = useCookies(["token"]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();
      const newEmail = email.current!.value;
      const newPassword = password.current!.value;

      const newEmailError = getEmailError(newEmail);
      const newPasswordError = getPasswordError(newPassword);

      if (newEmailError || newPasswordError) {
          setEmailError(newEmailError);
          setPasswordError(newPasswordError);
          return;
      }

      const data = await login(newEmail, newPassword);

      if (data.auth) {
        setCookie("token", data.token);
        window.location.href = "/dashboard";
      } else {
        console.error(data.msg);
        alert("Ocorreu um erro ao entrar");
      }
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
