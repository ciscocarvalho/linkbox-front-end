import { Metadata } from 'next';
import React from 'react';
import '../reset.css';
import './serverError.css';

export const metadata: Metadata = {
  title: 'Server Down',
  icons: [{ rel: 'short icon', url: 'images/Logo.svg' } ],
}

const page: React.FC = () => {
  return <>
    <header>
        <img src="images/Logo.svg" className="logo" />
        <p className="website-name">LinkBox</p>
    </header>
    <section>
        <img src="images/server_down.svg" className="erro" />
        <p className="error-message">Ocorreu algum erro no servidor!</p>
    </section>
  </>
};

export default page;
