"use client"
import React from "react";
import { Trans, useTranslation } from "react-i18next";

const Slogan: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <p className="text-[40px] text-center font-bold max-[950px]:text-[20px] max-[280px]:text-[20px] max-[280px]:h-auto">
          <Trans
            defaults={t("page.home.slogan")}
            components={[<span key={0} className="text-[#90CDF4]" />]}
          />
      </p>
      <p className="text-[20px] text-center max-[950px]:text-[16px]">
        {t("page.home.slogan-sub")}
      </p>
    </>
  );
};

export default Slogan;
