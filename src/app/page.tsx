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
        <header className="w-[80%] h-[10%] flex justify-between items-center mb-[30px] max-[500px]:mb-0 max-[500px]:w-[100%]">
            <a className="max-[500px]:text-[20px]" href="/">
                <div className="flex items-center">
                <img className="w-[48px] h-[48px] mr-[10px] max-[500px]:ml-[10px]" src="/images/Logo.svg" alt="LinkBox logo" />
                    <p className="text-[2rem] font-bold max-[310px]:text-[30px] max-[280px]:text-[20px]">LinkBox</p>
                </div>
            </a>
            <nav>
            <li className="m-[5px]"><a href="/login" className="max-[500px]:text-[20px] border-b-[2px] border-solid border-[#00000000] duration-[.2s] hover:duration-[.2s] hover:border-b-[black]">Entrar</a></li>
                <li className="m-[5px]"><a className="max-[500px]:text-[20px]" href="/cadastro"><span className="bg-[#90CDF4] p-[15px] rounded-[10px] duration-[.2s] hover:duration-[.2s] hover:bg-[#52a2d4] max-[500px]:hidden">Começe agora</span></a></li>

            </nav>
        </header>
        <section className="flex w-[100%] h-[90%] justify-around items-center max-[500px]:flex-col max-[500px]:justify-center max-[500px]:items-center">
        <div className="flex flex-col justify-center items-center ml-[100px] w-[50%] gap-[20px] max-[950px]:ml-[20px] max-[653px]:w-fit max-[500px]:w-auto max-[500px]:ml-0 max-[500px]:mt-0">
            <p className="text-[72px] text-center font-bold max-[950px]:text-[20px] max-[500px]:hidden max-[500px]:text-[30px] max-[500px]:w-[100%] max-[500px]:h-[250px] max-[280px]:text-[20px] max-[280px]:h-auto">O melhor lugar para organizar seus links!</p>
                <p className="text-[30px] max-[950px]:text-[20px] max-[500px]:hidden">Use o LinkBox para uma organização sem dor de cabeça</p>
                <a className="max-[500px]:text-[20px]" href="/cadastro">
                    <span className="bg-[#90CDF4] p-[15px] rounded-[10px] duration-[.2s] hover:duration-[.2s] hover:bg-[#52a2d4] max-[500px]:text-[20px] max-[500px]:p-[20px] max-[500px]:px-[60px] max-[500px]:mb-[30px] max-[280px]:p-[15px]">Começe agora</span>
                </a>
            </div>
            <div className="max-[653px]:hidden">
                <img className="w-[500px] max-[950px]:w-[350px]" src="/images/links.svg" />
            </div>
            
            <a href="/login" className="hidden max-[500px]:text-[20px] max-[500px]:flex max-[500px]:mb-[20px] max-[500px]:text-[#52a2d4]">Já possui conta? Entrar</a>
        </section>
    </div>
  </>
};

export default page;
