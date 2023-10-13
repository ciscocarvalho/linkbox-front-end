"use client";
import React, { useRef } from "react";
import {
  checkPasswordInput,
  checkUsernameInput,
  checkEmailInput,
} from "../Util/AuthForm";
import PasswordVisibilityToggler from "../components/PasswordVisibilityToggler";

const CadastroForm: React.FC = () => {
  const passwordInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const usernameInput = useRef<HTMLInputElement>(null);
  const smallEmail = useRef<HTMLElement>(null);
  const smallPassword = useRef<HTMLElement>(null);
  const smallUsername = useRef<HTMLElement>(null);
  const check = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        checkUsernameInput(usernameInput.current!);
        checkEmailInput(emailInput.current!);
        checkPasswordInput(passwordInput.current!);

        if (
          smallEmail.current?.classList.contains("success") &&
          smallPassword.current?.classList.contains("success") &&
          smallUsername.current?.classList.contains("success") &&
          check.current?.checked
        ) {
          alert("Você foi cadastrado");
          window.location.href = "login";
        }
      }}
    >
      <div className="form-inputs">
        <div className="input-container">
          <label htmlFor="input-nome">
            <input
              type="text"
              placeholder="Nome"
              id="input-nome"
              ref={usernameInput}
            />
            <small ref={smallUsername}></small>
          </label>
          <label htmlFor="input-nome">
            <span className="material-symbols-outlined">edit</span>
          </label>
        </div>
        <div className="input-container">
          <div>
            <input
              type="email"
              placeholder="Email"
              id="input-email"
              ref={emailInput}
            />
            <small ref={smallEmail}></small>
          </div>
          <label htmlFor="input-email">
            <span className="material-symbols-outlined">mail</span>
          </label>
        </div>
        <div className="input-container">
          <label>
            <input
              type="password"
              placeholder="Senha"
              id="input-senha"
              ref={passwordInput}
            />
            <small ref={smallPassword}></small>
          </label>
          <PasswordVisibilityToggler passwordInputRef={passwordInput} />
        </div>
      </div>
      <div className="termos">
        <input type="checkbox" ref={check} />
        <h2>Li e concordo com os termos de uso</h2>
      </div>
      <div className="texto">
        <button className="regular-btn" type="submit">
          Criar conta
        </button>

        <a href="#" className="sla">
          <button className="regular-btn text-above google-btn" type="button">
            <img src="images/Google logo.svg" className="google-logo" />
            <p>Continuar com o Google</p>
          </button>
        </a>

        <div className="text-bellow">
          <a href="login" className="link-login">
            Já possui conta? Entrar
          </a>
        </div>
      </div>
    </form>
  );
};

export default CadastroForm;
