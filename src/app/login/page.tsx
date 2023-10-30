import { Metadata } from 'next';
import React from 'react';
import '../reset.css';
import LoginForm from './LoginForm';
import GooglePrimaryButton from '../components/GooglePrimaryButton';

export const metadata: Metadata = {
  title: 'Login',
  icons: [{ rel: 'short icon', url: 'images/Logo.svg' } ],
}

const Page: React.FC = () => {
  return <div className="bg-[#2795DB] flex items-center justify-center w-[100%] h-[100vh] gap-[80px] max-[445px]:bg-[#ffffff] max-[445px]:h-fit">
    <img src="images/side-image.svg" className="w-[50%] max-[1060px]:hidden" />
    <div className="w-[50%] bg-[#ffffff] flex justify-center items-center flex-col rounded-[40px] h-fit my-[60px] mr-[50px] p-[70px] gap-[30px] max-[1060px]:w-[80%] max-[1060px]:mr-0 max-[445px]:w-[100%] max-[445px]:mt-0 max-[445px]:mb-0 max-[445px]:max-h-fit max-[445px]:gap-[100px]">
        <a href="/">
            <div className="flex justify-center items-center gap-[10px] font-light text-[30px]">
                <img className="max-[445px]:w-[40px]" src="images/Logo.svg" alt="LinkBox logo" />
                <p className="text-[2em] font-bold max-[445px]:text-[24px]">LinkBox</p>
            </div>
        </a>
        <LoginForm />
        <div className="flex flex-col">
            <div className="max-[445px]:hidden">
                <GooglePrimaryButton>
                    <img src="images/Google logo.svg" />
                    <p>Continuar com o Google</p>
                </GooglePrimaryButton>
            </div>
            <div className="flex w-[279px] h-[60px] justify-center items-center">
                <a href="cadastro" className="text-[#2795DB]">
                    Ainda não possui conta? Cadastrar
                </a>
            </div>
        </div>
    </div>
  </div>
};

export default Page;
