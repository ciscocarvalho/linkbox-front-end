import { Metadata } from 'next';
import React from 'react';
import './reset.css';

export const metadata: Metadata = {
  title: 'Erro 404',
  icons: [{ rel: 'short icon', url: 'images/Logo.svg' } ],
}

const page: React.FC = () => {
  return <div className="bg-[#2795DB] flex justify-center items-center flex-col min-h-[inherit] gap-[50px] p-[5px]">
    <a href="/">
        <div className="flex items-center gap-[20px] w-fit">
            <img src="/images/Logo.svg" className="w-[80px] max-[540px]:w-[60px]" />
            <p className="font-bold text-[48px] max-[540px]:text-[36px]">LinkBox</p>
        </div>
    </a>

    <section className="flex flex-col justify-between items-center">
        <img src="/images/erro 404 img.svg" className="select-none max-w-[500px] w-[90%]" />
    </section>

    <p className="font-bold text-[clamp(20px,8vw,40px)] text-center">Página não encontrada!</p>
  </div>
};

export default page;
