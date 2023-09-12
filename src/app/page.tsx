import { Metadata } from 'next';
import React from 'react';
import './reset.css';
import './style.css';

export const metadata: Metadata = {
  icons: [{ rel: 'short icon', url: 'images/Logo.svg' } ],
  manifest: 'manifest.json'
}

const page: React.FC = () => {
  return <>
    <script src="scripts/main.js" defer></script>
    <header>
        <a href="/">
            <div className="brand">
                <img className="logo" src="images/Logo.svg" alt="LinkBox logo" />
                <p className="website-name">LinkBox</p>
            </div>
        </a>
        <nav>
            <li><a href="login" className="login-text">Entrar</a></li>
            <li><a href="cadastro"><span className="top">Começe agora</span></a></li>
        </nav>
    </header>
    <section>
        <div className="texto">
            <p className="headline">O melhor lugar para organizar seus links!</p>
            <p>Use o LinkBox para uma organização sem dor de cabeça</p>
            <a href="cadastro"><span>Começe agora</span></a>
        </div>
        <div className="img">
            <img src="images/links.svg" />
        </div>
        
        <a href="login" className="blue-text">Já possui conta? Entrar</a>
    </section>
  </>
};

export default page;
