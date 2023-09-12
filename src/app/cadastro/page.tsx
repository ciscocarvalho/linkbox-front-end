import { Metadata } from 'next';
import React from 'react';
import '../reset.css';
import './cadastro.css';

export const metadata: Metadata = {
  title: 'Cadastro',
  icons: [{ rel: 'short icon', url: 'images/Logo.svg' } ],
}

const page: React.FC = () => {
  return <>
    <script src="scripts/cadastro.js" defer></script>

    <section>
      <div className="container">
        <a href="/">
          <div className="brand">
            <img className="logo" src="images/Logo.svg" alt="LinkBox logo" />
            <p className="website-name">LinkBox</p>
          </div>
        </a>
        <form>
          <div className="form-inputs">
            <div className="input-container">
              <label htmlFor="input-nome">
                <input type="text" placeholder="Nome" id="input-nome" />
                <small className="smallUsernamee"></small>
              </label>
              <label htmlFor="input-nome">
                <span className="material-symbols-outlined">edit</span>
              </label>
            </div>
            <div className="input-container">
              <div>
                <input type="email" placeholder="Email" id="input-email" />
                <small className="smalEmails"></small>
              </div>
              <label htmlFor="input-email">
                <span className="material-symbols-outlined">mail</span>
              </label>
            </div>
            <div className="input-container">
              <label>
                <input type="password" placeholder="Senha" id="input-senha" />
                <small className="smallPasswordd"></small>
              </label>
              <button className="icon-btn visibilidade-senha-btn">
                <span className="material-symbols-outlined">visibility_off</span>
              </button>
            </div>
          </div>
          <div className="termos">
            <input type="checkbox" id="sla" />
            <h2>Li e concordo com os termos de uso</h2>
          </div>
          <div className="texto">
            <button className="regular-btn" type="submit">Criar conta</button>

            <a href="#" className="sla">
              <button className="regular-btn text-above google-btn" type="button">
                <img src="images/Google logo.svg" className="google-logo" />
                <p>Continuar com o Google</p>
              </button>
            </a>

            <div className="text-bellow">
              <a href="login" className="link-login"
                >Já possui conta? Entrar</a
              >
            </div>
          </div>
        </form>
      </div>
      <img src="images/Cadastro image.svg" className="side-img" />
    </section>
  </>
};

export default page;
