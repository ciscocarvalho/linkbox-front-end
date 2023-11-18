import { Metadata } from 'next';
import React from 'react';
import './reset.css';

export const metadata: Metadata = {
  icons: [{ rel: 'short icon', url: 'images/Logo.svg' } ],
  manifest: 'manifest.json'
}

const page: React.FC = () => {

  return <>
    <script src="/scripts/main.js" defer></script>
    <div className="bg-[#f4f4f4] flex justify-center items-center flex-col h-[100vh]">
        <header className="w-[80%] h-[10%] flex justify-between items-center mb-[30px]">
            <a className="max-[500px]:text-[20px]" href="/">
                <div className="flex items-center">
                <img className="w-[48px] h-[48px] mr-[10px]" src="/images/Logo.svg" alt="LinkBox logo" />
                    <p className="text-[2rem] font-bold max-[310px]:text-[30px] max-[280px]:text-[20px]">LinkBox</p>
                </div>
            </a>
            <nav>
            <li className="m-[5px]"><a href="/login" className="border-b-[2px] border-solid border-[#00000000] duration-[.2s] hover:duration-[.2s] hover:border-b-[black]">Entrar</a></li>
            <li className="m-[5px]"><a href="/cadastro"><span className="bg-[#90CDF4] p-[15px] rounded-[10px] duration-[.2s] hover:duration-[.2s] hover:bg-[#52a2d4] max-[500px]:hidden">Começar agora</span></a></li>

            </nav>
        </header>
        <section className="flex w-[100%] h-[90%] justify-around items-center gap-[40px] p-[40px]">
            <div className="flex flex-col justify-center items-center w-[50%] gap-[20px] max-[653px]:w-fit">
                <p className="text-[40px] text-center font-bold max-[950px]:text-[20px] max-[280px]:text-[20px] max-[280px]:h-auto">O melhor lugar para organizar seus links!</p>
                <p className="text-[20px] text-center max-[950px]:text-[16px]">Use o LinkBox para uma organização sem dor de cabeça</p>
                <a href="/cadastro">
                    <span className="bg-[#90CDF4] p-[15px] rounded-[10px] duration-[.2s] hover:duration-[.2s] hover:bg-[#52a2d4] max-[280px]:p-[15px]">Começar agora</span>
                </a>
            </div>
            <img className="max-w-[500px] w-fit max-[950px]:hidden" src="/images/links.svg" />
        </section>
    </div>
  </>
};

export default page;
