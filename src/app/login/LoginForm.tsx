"use client";
import React, { useRef } from 'react';
import { checkPasswordInput, checkEmailInput } from "../Util/AuthForm";
import PasswordVisibilityToggler from '../components/PasswordVisibilityToggler';

const LoginForm: React.FC = () => {
  const password = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const smallEmail = useRef<HTMLElement>(null);
  const smallPassword = useRef<HTMLElement>(null);

  return <form onSubmit={(e) => {
      e.preventDefault();
      checkEmailInput(email.current!);
      checkPasswordInput(password.current!);

      if (
          smallEmail.current?.classList.contains("success") &&
          smallPassword.current?.classList.contains("success")
      ) {
          window.location.href = "dashboard";
      }
  }}>
      <div className="input-container">
          <input type="email" placeholder="Email" className="email" id="inputEmail" ref={email} />
          <label htmlFor="inputEmail">
              <span className="material-symbols-outlined">mail</span>
              <small className="emails" ref={smallEmail}></small>
          </label>
      </div>

      <div className="input-container">
          <label htmlFor="input-senha">
              <input type="password" placeholder="Senha" id="input-senha" ref={password} />
              <small ref={smallPassword}></small>
          </label>
          <PasswordVisibilityToggler passwordInputRef={password} />
      </div>

      <button type="submit" className="regular-btn"><span>Entrar</span></button>
  </form>
};

export default LoginForm;
