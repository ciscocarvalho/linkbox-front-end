"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  getPasswordError,
  getUsernameError,
  getEmailError,
} from "../Util/AuthForm";
import PrimaryButton from "../components/PrimaryButton";
import signup from "../../Services/Auth/signup";
import { useCookies } from "react-cookie";
import Icon from "../components/Icon";
import MyTextInput from "../components/Form/MyTextInput";

const CadastroForm: React.FC = () => {
  const check = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [_, setCookie] = useCookies(["token"]);

  const setErrors = (force: boolean = false) => {
    if (username !== null || force) {
      setUsernameError(getUsernameError(username ?? ""));
    }
    if (email !== null || force) {
      setEmailError(getEmailError(email ?? ""));
    }
    if (password !== null || force) {
      setPasswordError(getPasswordError(password ?? ""));
    }
  }

  useEffect(() => {
    setErrors();
  }, [username, email, password]);

  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  }

  return (
    <form className="flex flex-col justify-center items-center gap-[inherit] w-[100%] h-[60%] max-[540px]:h-fit"
      onSubmit={async (e) => {
        e.preventDefault();

        setErrors(true);

        if (usernameError || emailError || passwordError || !check.current!.checked) {
          return;
        }

        const data = await signup(email!, password!);

        if (data.auth) {
          setCookie("token", data.token);
          window.location.href = "/dashboard";
        } else {
          console.error(data.msg);
          alert("Ocorreu um erro ao cadastrar");
        }
      }}
    >
      <div className="flex flex-col pt-[20px] w-full h-fit">
        <div>
          <MyTextInput
            placeholder="Nome"
            id="username"
            name="username"
            value={username ?? ""}
            setValue={setUsername}
            error={usernameError}
            rightIcon={() => <Icon name="edit" />}
          />
        </div>
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
