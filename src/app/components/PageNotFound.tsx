"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import useTitle from "./useTitle";

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  useTitle(t("page.page-not-found.title"));

  return (
    <div className="bg-[#2795DB] flex justify-center items-center flex-col min-h-[inherit] gap-[50px] p-[5px]">
      <a href="/">
        <div className="flex items-center gap-[20px] w-fit">
          <img
            src="/images/logo/logo.svg"
            className="w-[80px] max-[540px]:w-[60px]"
          />
          <p className="font-bold text-[48px] max-[540px]:text-[36px]">
            LinkBox
          </p>
        </div>
      </a>

      <section className="flex flex-col justify-between items-center">
        <img
          src="/images/illustrations/page-not-found-illustration.svg"
          className="select-none max-w-[500px] w-[90%]"
        />
      </section>

      <p className="font-bold text-[clamp(20px,8vw,40px)] text-center">
        {t("page.page-not-found.message")}
      </p>
    </div>
  );
};

export default NotFound;
