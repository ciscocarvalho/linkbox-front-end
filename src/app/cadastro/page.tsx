import { Metadata } from 'next';
import React from 'react';
import '../reset.css';
import CadastroForm from './CadastroForm';

export const metadata: Metadata = {
  title: 'Cadastro',
  icons: [{ rel: 'short icon', url: 'images/Logo.svg' } ],
}

const Page: React.FC = () => {
  return (<>
    <div className="w-full min-h-[inherit] bg-[#2795DB] max-[540px]:bg-[#ffff] flex justify-center gap-[80px] items-center p-[5px]">
      <div className="bg-[#ffff] w-fit h-fit flex flex-col justify-center items-center rounded-[20px] max-[540px]:w-[80%] p-[60px] max-[540px]:p-0 max-[540px]:h-[100%] max-[540px]:rounded-0 gap-[40px]">
        <a href="/">
          <div className="flex justify-center items-center gap-[20px]">
            <img className="max-[540px]:w-[40px]" src="/images/Logo.svg" alt="LinkBox logo" />
            <p className="text-[48px] font-bold max-[540px]:text-[28px]">LinkBox</p>
          </div>
        </a>
        <CadastroForm />
      </div>
      <img src="/images/Cadastro image.svg" className="w-[40%] max-[970px]:hidden" />
    </div>
  </>);
};

export default Page;
