"use client";
import React from 'react';
import LoginForm from './LoginForm';
import { useCookies } from 'react-cookie';

const Login: React.FC = () => {
  const [cookies, _] = useCookies(["token"]);

  if (cookies.token) {
    window.location.href = "/dashboard";
    return null;
  }

  return <div className="bg-[#2795DB] flex items-center justify-center w-[100%] min-h-[inherit] gap-[80px] max-[540px]:bg-[#ffffff] p-[5px]">
    <img src="/images/side-image.svg" className="w-[50%] max-[1060px]:hidden" />
    <div className="w-fit bg-[#ffffff] flex flex-col justify-center items-center gap-[60px] rounded-[40px] h-fit p-[60px] max-[540px]:p-0 max-[540px]:w-4/5">
        <a href="/">
            <div className="flex justify-center items-center gap-[20px] font-light text-[30px]">
                <img className="max-[540px]:w-[40px]" src="/images/Logo.svg" alt="LinkBox logo" />
                <p className="text-[2em] font-bold max-[540px]:text-[24px]">LinkBox</p>
            </div>
        </a>
        <LoginForm />
    </div>
  </div>
};

export default Login;
