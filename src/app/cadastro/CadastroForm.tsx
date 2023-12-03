"use client";
import React, { useState } from "react";
import {
  getPasswordError,
  getUsernameError,
  getEmailError,
} from "../Util/validateUser";
import PrimaryButton from "../components/PrimaryButton";
import signup from "../../Services/Auth/signup";
import Icon from "../components/Icon";
import MyTextInput from "../components/Form/MyTextInput";
import { useToken } from "../../hooks/useToken";
import { Form } from "../../hooks/useForm";
import { useValidationForm } from "../../hooks/useValidationForm";

const CadastroForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setToken } = useToken();

  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  }

  const errorType = "AUTH_ERROR";

  const form = {
    username: { value: "", validate: getUsernameError },
    email: { value: "", validate: getEmailError },
    password: { value: "", validate: getPasswordError },
  };

  const getPayload = async (form: Form) => {
    const payload = await signup({
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
    });

    if (payload?.data?.auth) {
      setToken(payload.data.token);
      window.location.href = "/dashboard";
      return;
    }

    return payload;
  }

  const { context, errorModal } = useValidationForm(getPayload, errorType, form);
  const { onSubmit, getValue, getError, setters } = context;

  return (
    <>
      {errorModal}
      <form className="flex flex-col justify-center items-center gap-[inherit] w-[100%] h-[60%] max-[540px]:h-fit"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col pt-[20px] w-full h-fit">
          <div>
            <MyTextInput
              placeholder="Nome"
              id="username"
              name="username"
              value={getValue("username")}
              setValue={setters.username}
              error={getError("username")}
              rightIcon={() => <Icon name="edit" />}
            />
          </div>
          <div>
            <MyTextInput
              placeholder="Email"
              id="email"
              name="email"
              value={getValue("email")}
              setValue={setters.email}
              error={getError("email")}
              rightIcon={() => <Icon name="mail" />}
            />
          </div>
          {/* flowbite-react doesn't provide a straightforward way to handle onClick on TextInput icon: https://github.com/themesberg/flowbite-react/issues/734 */}
          <div className="relative">
            <MyTextInput
              placeholder="Senha"
              id="password"
              name="password"
              value={getValue("password")}
              setValue={setters.password}
              error={getError("password")}
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
        <div className="flex flex-col justify-center items-center gap-[10px]">
          <PrimaryButton type="submit">
            Criar conta
          </PrimaryButton>
        </div>

        <a href="/login" className="text-[15px] text-[#2795DB] mt-[30px]">
          Já possui conta? Entrar
        </a>
      </form>
    </>
  );
};

export default CadastroForm;
