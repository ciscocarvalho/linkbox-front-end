import { Metadata } from 'next';
import React from 'react';
import '../reset.css';
import CadastroForm from './CadastroForm';

export const metadata: Metadata = {
  title: 'Cadastro',
  icons: [{ rel: 'short icon', url: 'images/Logo.svg' } ],
}

const Page: React.FC = () => {

  return <div className="w-[100%] h-[100vh] bg-[#2795DB] max-[540px]:bg-[#ffff]">
    <section className="w-[100%] h-[100vh] flex justify-center gap-[70px] items-center">
      <div className="bg-[#ffff] w-fit h-fit flex flex-col justify-center items-center rounded-[20px] p-[50px] max-[540px]:w-[100%] max-[540px]:h-[100%] max-[540px]:rounded-0 max-[540px]:gap-[100px] max-[540px]:p-0 max-[540px]:mb-[250px] max-[656px]:gap-[50px] max-[481px]:gap-0">
        <a href="/">
          <div className="flex justify-center items-center gap-[20px]">
            <img className="w-[80px] h-[80px] max-[540px]:width-[40px]" src="/images/Logo.svg" alt="LinkBox logo" />
            <p className="text-[48px] font-bold max-[540px]:text-[28px]">LinkBox</p>
          </div>
        </a>
        <CadastroForm />
      </div>
      <img src="/images/Cadastro image.svg" className="w-[40%] max-[970px]:hidden" />
    </section>
  </div>
};

export default Page;
