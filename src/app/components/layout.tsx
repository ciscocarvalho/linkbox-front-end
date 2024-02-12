"use client";
import '../../styles/global.css'
import { IsClientCtxProvider } from '../../contexts/IsClientContext'
import i18next from 'i18next';
import isServerSide from '../../lib/isServerSide';
import { Cookies } from "react-cookie";
import { useEffect } from 'react';
import { LANGUAGE_COOKIE_NAME } from '../../i18n/options';
import { initializeI18nextOrChangeLanguage } from '../../i18n/initialize';

initializeI18nextOrChangeLanguage();

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  if (isServerSide()) {
    i18next.changeLanguage();
  }

  useEffect(() => {
    new Cookies().addChangeListener(({ name }) => {
      if (name === LANGUAGE_COOKIE_NAME) {
        i18next.changeLanguage();
      }
    });
  }, [])

  return (
    <html lang={i18next.language}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
      </head>

      <body>
        <IsClientCtxProvider>{children}</IsClientCtxProvider>
      </body>
    </html>
  );
};

export default Layout;
