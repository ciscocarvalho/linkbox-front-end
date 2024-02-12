"use client";
import React from 'react';
import '../../styles/reset.css';
import { Button } from '../../components/ui/Button';
import Slogan from '../components/Slogan';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';

const Page: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#f4f4f4] min-h-[inherit] flex flex-col justify-between">
        <header className="w-full h-[10%] py-[20px] px-[5%] flex justify-between items-center gap-2">
            <a className="max-[500px]:text-[20px]" href="/">
                <div className="flex items-center min-w-max">
                <img className="w-[48px] h-[48px] mr-[10px]" src="/images/logo/logo.svg" alt="LinkBox logo" />
                <p className="text-[2rem] font-bold max-[380px]:hidden max-[480px]:text-[20px] max-[510px]:text-[30px]">LinkBox</p>
                </div>
            </a>
            <nav className={"flex justify-center items-center overflow-hidden p-1 gap-[inherit] min-w-0 [&_*]:min-w-0"}>
            <li>
                <LanguageSwitcher />
            </li>

            <li className="flex flex-shrink-0 max-w-[min(200px,40%)]">
                <Button asChild variant={"ghost"} className="hover:bg-transparent">
                    <a
                        href="/login"
                        className={"max-w-[200px] [&>*]:hover:border-b-black"}
                    >
                        <div className={cn(
                            "border-b-[2px] border-solid",
                            "border-[#00000000] duration-[.2s]",
                            "hover:duration-[.2s]",
                            "truncate"
                        )}>
                            {t("page.home.button.login")}
                        </div>
                    </a>
                </Button>
            </li>

            <li className="max-[580px]:hidden flex">
                <Button className="max-w-[200px]" >
                    <a href="/signup" className="truncate">
                        {t("page.home.button.signup")}
                    </a>
                </Button>
            </li>
            </nav>
        </header>
        <div className="h-full flex grow justify-center items-center">
            <section className="flex w-[100%] h-[90%] justify-around items-center gap-[40px] p-[40px]">
                <div className="flex flex-col justify-center items-center w-[50%] gap-[20px] max-[653px]:w-fit">
                    <Slogan />
                    <Button asChild>
                        <a href="/signup">
                            {t("page.home.button.signup")}
                        </a>
                    </Button>
                </div>
                <img className="max-w-[500px] w-fit max-[950px]:hidden" src="/images/illustrations/home-illustration.svg" />
            </section>
        </div>
    </div>
  );
};

export default Page;
