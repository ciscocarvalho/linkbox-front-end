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
import signup from "../../Services/Auth/signup";
import { useCookies } from "react-cookie";

const CadastroForm: React.FC = () => {
  const passwordInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const usernameInput = useRef<HTMLInputElement>(null);
  const check = useRef<HTMLInputElement>(null);

  const [usernameError, setUsernameError] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [_, setCookie] = useCookies(["token"]);

  return (
    <form
      className="flex flex-col justify-center items-center w-[100%] h-[60%] gap-[inherit] max-[540px]:h-fit"
      onSubmit={async (e) => {
        e.preventDefault();

        const username = usernameInput.current!.value;
        const email = emailInput.current!.value;
        const password = passwordInput.current!.value

        const newUsernameError = getUsernameError(username);
        const newEmailError = getEmailError(email);
        const newPasswordError = getPasswordError(password);

        if (newUsernameError || newEmailError || newPasswordError || !check.current!.checked) {
          setUsernameError(newUsernameError);
          setEmailError(newEmailError);
          setPasswordError(newPasswordError);
          return;
        }

        const data = await signup(email, password);

        if (data.auth) {
          setCookie("token", data.token);
          window.location.href = "/dashboard";
        } else {
          console.error(data.msg);
          alert("Ocorreu um erro ao cadastrar");
        }
      }}
    >
      <div className="flex flex-col gap-[10px] py-[20px] w-full">
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
        <div className="w-full h-full">
          <h2 className="text-[clamp(12px,4vw,18px)]">
            Li e concordo com os termos de uso
          </h2>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-[10px]">
        <PrimaryButton type="submit">
          Criar conta
        </PrimaryButton>

        <a href="#">
          <GooglePrimaryButton />
        </a>
      </div>

      <div className="text-[15px]">
        <a href="/login" className="text-[#2795DB]">
          Já possui conta? Entrar
        </a>
      </div>
    </form>
  );
};

export default CadastroForm;
