import { Metadata } from 'next';
import React from 'react';
import '../reset.css';
import './login.css';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Login',
  icons: [{ rel: 'short icon', url: 'images/Logo.svg' } ],
}

const Page: React.FC = () => {
  return <>
    <img src="images/side-image.svg" className="side-img" />
    <div className="container">
        <a href="/">
            <div className="brand">
                <img className="logo" src="images/Logo.svg" alt="LinkBox logo" />
                <p className="website-name">LinkBox</p>
            </div>
        </a>
        <LoginForm />
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

export default Page;
