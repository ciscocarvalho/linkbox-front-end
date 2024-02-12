import NextHeaders from "next/headers";
import Negotiator from "negotiator";
import { CustomDetector } from "i18next-browser-languagedetector";

const parseAcceptLanguage = (acceptLanguage?: string) => {
  const headers = { "accept-language": acceptLanguage };
  return new Negotiator({ headers }).languages();
};

const HeaderLanguageDetector: CustomDetector = {
  name: "header",
  lookup() {
    const { headers } = require("next/headers") as typeof NextHeaders;
    const acceptLanguage = headers().get("Accept-Language") ?? undefined;
    return parseAcceptLanguage(acceptLanguage);
  },
} as const;

export default HeaderLanguageDetector;
