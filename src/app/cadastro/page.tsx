import { Metadata } from 'next';
import React from 'react';
import '../reset.css';
import './cadastro.css';
import CadastroForm from './CadastroForm';

export const metadata: Metadata = {
  title: 'Cadastro',
  icons: [{ rel: 'short icon', url: 'images/Logo.svg' } ],
}

const Page: React.FC = () => {

  return <>
    <section>
      <div className="container">
        <a href="/">
          <div className="brand">
            <img className="logo" src="images/Logo.svg" alt="LinkBox logo" />
            <p className="website-name">LinkBox</p>
          </div>
        </a>
        <CadastroForm />
      </div>
      <img src="images/Cadastro image.svg" className="side-img" />
    </section>
  </>
};

export default Page;
