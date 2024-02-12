import { InitOptions } from "i18next";
import resources from "./resources";
import isServerSide from "../lib/isServerSide";
import { NODE_ENV } from "../constants";

const languagesWithCimodeInDev = <const T extends readonly string[]>(languages: T) => {
  if (NODE_ENV === "development") {
    return [...languages, "cimode"] as const;
  }

  return languages;
};

const runsOnServerSide = isServerSide();

const fallbackLanguage = "en";

// NOTE: i18next implicitly extends `supportedLngs` with cimode (and ATM that
// is not documented and can't be changed), so in order to get the actual
// supported languages we have to use an export.
export const SUPPORTED_LANGUAGES = languagesWithCimodeInDev([fallbackLanguage, "pt-br"]);

export const LANGUAGE_COOKIE_NAME = "language";

const I18nOptions = {
  fallbackLng: fallbackLanguage,
  debug: false,
  // `cleanCode` means language-only codes ("en", "pt", ...) will be lowercased.
  // `lowerCaseLng` means that codes with language and locale ("en-US",
  // "pt-BR", ...) *and* language-only codes will be lowercased.
  lowerCaseLng: true,
  ns: Object.keys(resources) as readonly (keyof typeof resources)[],
  defaultNS: "common",
  // NOTE: setting `fallbackNS` affects type inference and autocompletion,
  // making it harder to use the right keys.
  fallbackNS: undefined,
  keySeparator: ".",
  nsSeparator: ":",
  pluralSeparator: "_",
  contextSeparator: "_",
  detection: {
    order: runsOnServerSide ? ["server-side-cookie", "header"] : ["cookie", "navigator"],
    lookupCookie: LANGUAGE_COOKIE_NAME,
  },
  supportedLngs: SUPPORTED_LANGUAGES,
  preload: runsOnServerSide ? SUPPORTED_LANGUAGES : [],
} as const satisfies InitOptions;

export default I18nOptions;
