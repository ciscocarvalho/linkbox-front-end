import { Metadata } from "next";
import React from "react";
import "../styles/reset.css";
import PageNotFound from "./components/PageNotFound";
import { t } from "i18next";

export async function generateMetadata({}): Promise<Metadata> {
  return {
    title: t("page.page-not-found.title"),
    icons: [{ rel: "short icon", url: "images/logo/logo.svg" }],
  };
}

const Page: React.FC = () => {
  return <PageNotFound />;
};

export default Page;
