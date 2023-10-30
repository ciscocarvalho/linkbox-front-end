"use client";
import React, { useRef, useState } from "react";
import {
  getPasswordError,
  getUsernameError,
  getEmailError,
} from "../Util/AuthForm";
import PasswordVisibilityToggler from "../components/PasswordVisibilityToggler";
import GooglePrimaryButton from "../components/GooglePrimaryButton";
import PrimaryButton from "../components/PrimaryButton";
import InputContainer from "../components/InputContainer";
import Input from "../components/Input";
import InputIcon from "../components/InputIcon";
import FormInputError from "../components/FormInputError";

const CadastroForm: React.FC = () => {
  const passwordInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const usernameInput = useRef<HTMLInputElement>(null);
  const check = useRef<HTMLInputElement>(null);

  const [usernameError, setUsernameError] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();

  return (
    <form
      className="flex flex-col justify-center items-center w-[100%] h-[60%] gap-[20px] max-[540px]:h-fit"
      onSubmit={(e) => {
        e.preventDefault();

        const newUsernameError = getUsernameError(usernameInput.current!.value);
        const newEmailError = getEmailError(emailInput.current!.value);
        const newPasswordError = getPasswordError(passwordInput.current!.value);

        if (newUsernameError || newEmailError || newPasswordError || !check.current!.checked) {
          setUsernameError(newUsernameError);
          setEmailError(newEmailError);
          setPasswordError(newPasswordError);
          return;
        }

        alert("Você foi cadastrado");
        window.location.href = "login";
      }}
    >
      <div className="flex flex-col gap-[20px] p-[20px]">
        <InputContainer>
          <label htmlFor="input-nome">
            <Input
              type="text"
              placeholder="Nome"
              id="input-nome"
              ref={usernameInput}
            />
            <FormInputError message={usernameError} />
          </label>
          <label htmlFor="input-nome">
            <InputIcon name="edit" />
          </label>
        </InputContainer>
        <InputContainer>
          <div>
            <Input
              type="email"
              placeholder="Email"
              id="input-email"
              ref={emailInput}
            />
            <FormInputError message={emailError} />
          </div>
          <label htmlFor="input-email">
            <InputIcon name="mail" />
          </label>
        </InputContainer>
        <InputContainer>
          <label>
            <Input
              type="password"
              placeholder="Senha"
              id="input-senha"
              ref={passwordInput}
            />
            <FormInputError message={passwordError} />
          </label>
          <PasswordVisibilityToggler passwordInputRef={passwordInput} />
        </InputContainer>
      </div>
      <div className="flex gap-[10px]">
        <input className="w-[20px]" type="checkbox" ref={check} />
        <h2 className="text-[18px] max-[356px]:text-[15px] max-[292px]:text-[12px]">
          Li e concordo com os termos de uso
        </h2>
      </div>
      <div className="flex flex-col justify-center items-center gap-[40px] max-[656px]:gap-[20px] max-[481px]:gap-[10px]">
        <PrimaryButton type="submit">
          Criar conta
        </PrimaryButton>

        <a href="#">
          <GooglePrimaryButton className="flex justify-center items-center h-[60px] w-[279px] border-none rounded-[20px] bg-[#90CDF4] gap-[20px] max-[540px]:w-0" type="button">
            <img src="images/Google logo.svg" />
            <p className="max-[540px]:hidden">Continuar com o Google</p>
          </GooglePrimaryButton>
        </a>

        <div className="text-[15px]">
          <a href="login" className="text-[#2795DB]">
            Já possui conta? Entrar
          </a>
        </div>
      </div>
    </form>
  );
};

export default CadastroForm;
