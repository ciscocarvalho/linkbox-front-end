"use client";
import React, { useState } from "react";
import Icon from "./Icon";
import { cn } from "../lib/utils";
import { getLanguageDisplayName, setLanguageCookie } from "../i18n/util/client";
import { useTranslation } from "react-i18next";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/DropdownMenu";
import { Button } from "./ui/Button";
import { SUPPORTED_LANGUAGES } from "../i18n/options";

interface LanguageSwitcherTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  language: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface LanguageNameProps extends React.HTMLAttributes<HTMLSpanElement> {
  language: string;
}

const LanguageName: React.FC<LanguageNameProps> = ({
  language,
  className,
  ...props
}) => {
  return (
    <span className={cn(className, "truncate capitalize")} {...props}>
      {getLanguageDisplayName(language)}
    </span>
  );
};

const LanguageSwitcherTrigger: React.FC<LanguageSwitcherTriggerProps> = ({
  open,
  setOpen,
  language,
  className,
  ...props
}) => {
  return (
    <div className="flex">
      <Button
        asChild
        variant={"ghost"}
        className="hover:bg-accent"
      >
        <DropdownMenuTrigger>
          <div
            className={cn(
              className,
              "h-full flex justify-center items-center",
            )}
            {...props}
          >
            <div className="inline-flex items-center overflow-hidden">
              <Icon name="language" className="!min-w-fit mr-2" />
              <LanguageName language={language} className="max-w-[200px]" />
              <Icon name="arrow_drop_down" className="!min-w-fit" />
            </div>
          </div>
        </DropdownMenuTrigger>
      </Button>
    </div>
  );
};

interface LanguageItemProps {
  isCurrent: boolean;
  language: string;
}

const LanguageItem: React.FC<LanguageItemProps> = ({ isCurrent, language }) => {
  return (
    <DropdownMenuItem
      className={cn(
        "cursor-pointer text-center mb-1 last:mb-0 rounded-sm px-5 py-2 max-w-[min(200px,60vw)]",
        isCurrent && "bg-primary focus:bg-primary"
      )}
      onClick={(e) => {
        e.preventDefault();

        if (!isCurrent) {
          setLanguageCookie(language);
        }
      }}
    >
      <LanguageName language={language} className="mx-auto" />
    </DropdownMenuItem>
  );
};

interface LanguageSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ ...props }) => {
  const [open, setOpen] = useState(false);
  const { i18n: { language: currentLanguage } } = useTranslation();
  const sortedSupportedLanguages = [...SUPPORTED_LANGUAGES].sort();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <LanguageSwitcherTrigger
        open={open}
        language={currentLanguage}
        setOpen={setOpen}
        {...props}
      />

      <DropdownMenuContent className="w-fit p-2">
        <div className="flex flex-col">
          {sortedSupportedLanguages
            ? sortedSupportedLanguages.map((language: string, i: number) => (
                <LanguageItem
                  isCurrent={currentLanguage === language}
                  language={language}
                  key={i}
                />
              ))
            : null}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
