"use client";
import React, { useEffect } from 'react';
import LoginForm from './LoginForm';
import fetchJsonPayload from '../../Services/fetchJsonPayload';
import { useToken } from '../../hooks/useToken';

const Login: React.FC = () => {
  const { getToken } = useToken();

  useEffect(() => {
    (async () => {
      const token = getToken();

      if (!token) {
        return;
      }

      const payload = await fetchJsonPayload("get", "/me");

      if (payload?.data?.user) {
        window.location.href = "/dashboard";
      }
    })();
  }, []);

  return <div className="bg-[#2795DB] flex items-center justify-center w-[100%] min-h-[inherit] gap-[80px] max-[540px]:bg-[#ffffff] p-[5px]">
    <img src="/images/side-image.svg" className="w-[40%] max-[1060px]:hidden" />
    <div className="w-fit bg-[#ffffff] flex flex-col justify-center items-center gap-[20px] rounded-[40px] h-fit p-[40px] max-[540px]:p-0 max-[540px]:w-4/5">
        <a href="/">
            <div className="flex justify-center items-center gap-[20px] font-light text-[30px]">
                <img className="max-[540px]:w-[40px]" src="/images/Logo.svg" alt="LinkBox logo" />
                <p className="text-[48px] font-bold max-[540px]:text-[28px]">LinkBox</p>
            </div>
        </a>
        <LoginForm />
    </div>
  </div>
};

export default Login;
