import type { Metadata } from "next";
import Layout from "./components/layout";
import i18next from "i18next";
import { initializeI18nextOrChangeLanguage } from "../i18n/initialize";

export const dynamic = "force-dynamic";

export async function generateMetadata({}): Promise<Metadata> {
  initializeI18nextOrChangeLanguage();

  return {
    title: 'LinkBox',
    applicationName: "LinkBox",
    description: i18next.t("page.home.description"),
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
