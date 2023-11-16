import { Metadata } from 'next';
import React from 'react';
import '../reset.css';

export const metadata: Metadata = {
  title: 'Server Down',
  icons: [{ rel: 'short icon', url: 'images/Logo.svg' } ],
}

const page: React.FC = () => {
  return <div className="bg-[#2795DB] flex justify-center items-center flex-col h-[100%]">
    <header className="flex mt-[50px] mb-[30px]">
        <img src="/images/Logo.svg" className="w-[80px] h-[80px]" />
        <p className="w-[224px] h-[75px] text-[64px] leading-[75px] font-bold">LinkBox</p>
    </header>
    <section className="flex flex-col justify-between items-center">
        <img src="/images/server_down.svg" className="w-[858.4px] h-[470px]" />
        <p className="font-bold text-[48px] leading-[56px] mt-[20px]">Ocorreu algum erro no servidor!</p>
    </section>
  </div>
};

export default page;
