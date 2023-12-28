"use client";
import React, { useState } from "react";
import { getEmailError } from "../utils/validateUser";
import PrimaryButton from "../../../../components/PrimaryButton";
import login from "../../services/login";
import MyTextInput from "../../../../components/Form/MyTextInput";
import Icon from "../../../../components/Icon";
import { useToken } from "../../../../hooks/useToken";
import { Form } from "../../../../hooks/useForm";
import { useValidationForm } from "../../../../hooks/useValidationForm";

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setToken } = useToken();

  const getPayload = async (form: Form) => {
    const payload = await login(form.email.value, form.password.value);

    if (payload.data?.auth) {
      setToken(payload.data.token);
      window.location.href = "/dashboard";
      return;
    }

    return payload;
  };

  const form = {
    email: { value: "", validate: getEmailError },
    password: { value: "" },
  };

  const { context, errorModal } = useValidationForm(
    getPayload,
    "AUTH_ERROR",
    form
  );
  const { onSubmit, getValue, getError, setters } = context;

  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <>
      {errorModal}
      <form
        className="flex pt-[20px] gap-[inherit] flex-col justify-center items-center w-full"
        onSubmit={onSubmit}
      >
        <div className="w-full gap-[10px] flex flex-col">
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
              <Icon name={showPassword ? "visibility_off" : "visibility"} />
            </div>
          </div>
        </div>

        <div className="w-full gap-[10px] flex flex-col justify-center items-center">
          <PrimaryButton type="submit">
            <span>Entrar</span>
          </PrimaryButton>
        </div>

        <a href="/signup" className="text-[#2795DB] mt-[30px]">
          Ainda não possui conta? Cadastrar
        </a>
      </form>
    </>
  );
};

export default LoginForm;
