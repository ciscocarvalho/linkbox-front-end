import { Metadata } from 'next';
import React from 'react';
import '../reset.css';
import './login.css';

export const metadata: Metadata = {
  title: 'Login',
  icons: [{ rel: 'short icon', url: 'images/Logo.svg' } ],
}

const page: React.FC = () => {
  return <>
    <script src="scripts/login.js" defer></script>

    <img src="images/side-image.svg" className="side-img" />

    <div className="container">
        <a href="/">
            <div className="brand">
                <img className="logo" src="images/Logo.svg" alt="LinkBox logo" />
                <p className="website-name">LinkBox</p>
            </div>
        </a>

    
        <form>
            <div className="input-container">
                <input type="email" placeholder="Email" className="email" id="inputEmail" />
                <label htmlFor="inputEmail">
                    <span className="material-symbols-outlined">mail</span>
                    <small className="emails"></small>
                </label>
            </div>

            <div className="input-container">
                <label htmlFor="inputSenha">
                    <input type="password" placeholder="Senha" id="inputSenha" />
                    <small className="passwordd"></small>
                </label>
                <button className="icon-btn visibilidade-senha-btn">
                    <span className="material-symbols-outlined">visibility_off</span>
                </button>
            </div>

            <button type="submit" className="regular-btn"><span>Entrar</span></button>
        </form>
        <div className="lin">
            <div className="google-bt">
                <button className="regular-btn google-btn"><img src="images/Google logo.svg" />Continuar com o Google</button>
            </div>
            <div className="redes">
                <a href="cadastro" className="link-cadastro">
                    Ainda não possui conta? Cadastrar
                </a>
            </div>
        </div>
    </div>
  </>
};

export default page;
