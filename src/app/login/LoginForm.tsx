"use client";
import React, { useEffect, useState } from 'react';
import { getPasswordError, getEmailError } from "../Util/AuthForm";
import PrimaryButton from '../components/PrimaryButton';
import { useCookies } from 'react-cookie';
import login from '../../Services/Auth/login';
import MyTextInput from '../components/Form/MyTextInput';
import Icon from '../components/Icon';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [_, setCookie] = useCookies(["token"]);

  const setErrors = (force: boolean = false) => {
    if (email !== null || force) {
      setEmailError(getEmailError(email ?? ""));
    }
    if (password !== null || force) {
      setPasswordError(getPasswordError(password ?? ""));
    }
  }

  useEffect(setErrors, [email, password]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setErrors(true);

    if (emailError || passwordError) {
      return;
    }

    const data = await login(email!, password!);

    if (data.auth) {
      setCookie("token", data.token);
      window.location.href = "/dashboard";
    } else {
      console.error(data.msg);
      alert("Ocorreu um erro ao entrar");
    }
  }

  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  }

  return <form className="flex pt-[20px] gap-[inherit] flex-col justify-center items-center w-full" onSubmit={handleSubmit}>
      <div className="w-full gap-[10px] flex flex-col">
        <div>
          <MyTextInput
            placeholder="Email"
            id="email"
            name="email"
            value={email ?? ""}
            setValue={setEmail}
            error={emailError}
            rightIcon={() => <Icon name="mail" />}
          />
        </div>
        {/* flowbite-react doesn't provide a straightforward way to handle onClick on TextInput icon: https://github.com/themesberg/flowbite-react/issues/734 */}
        <div className="relative">
          <MyTextInput
            placeholder="Senha"
            id="password"
            name="password"
            value={password ?? ""}
            setValue={setPassword}
            error={passwordError}
            type={showPassword ? "text" : "password"}
          />
          <div
            onClick={toggleShowPassword}
            className={`absolute top-[10px] right-[10px] hover:cursor-pointer select-none`}
          >
            <Icon name={showPassword ? "visibility_off" : "visibility"}/>
          </div>
        </div>
      </div>

      <div className="w-full gap-[10px] flex flex-col justify-center items-center">
        <PrimaryButton type="submit">
            <span>Entrar</span>
        </PrimaryButton>
      </div>

      <div className="flex w-[279px] h-[60px] justify-center items-center">
          <a href="/cadastro" className="text-[#2795DB]">
              Ainda não possui conta? Cadastrar
          </a>
      </div>
  </form>
};

export default LoginForm;
