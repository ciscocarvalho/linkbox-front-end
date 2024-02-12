import { Metadata } from "next";
import React from "react";
import "../../../styles/reset.css";
import i18next from "i18next";
import SignUp from "./components/SignUp";

export async function generateMetadata({}): Promise<Metadata> {
  const { t } = i18next;

  return {
    title: t("page.signup.title"),
    icons: [{ rel: "short icon", url: "images/logo/logo.svg" }],
  };
}

const Page: React.FC = () => {
  return <SignUp />;
};

export default Page;
