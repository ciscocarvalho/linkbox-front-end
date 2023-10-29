import { Metadata } from 'next';
import React from 'react';
import '../reset.css';

export const metadata: Metadata = {
  title: 'Erro 404',
  icons: [{ rel: 'short icon', url: 'images/Logo.svg' } ],
}

const page: React.FC = () => {
  return <div className="bg-[#2795DB] flex justify-center items-center flex-col h-[100vh] gap-[50px]">
    <a href="/">
        <div className="flex gap-[20px]">
            <img src="images/Logo.svg" className="w-[80px] h-[80px]" />
            <p className="font-bold w-[224px] h-[75px] text-[64px] leading-[75px]">LinkBox</p>
        </div>
    </a>

    <section className="flex flex-col justify-between items-center">
        <img src="images/erro 404 img.svg" className="select-none w-[858.4px] h-[470px]" />
    </section>

    <p className="text-[2rem] font-bold">Página não encontrada!</p>
  </div>
};

export default page;
