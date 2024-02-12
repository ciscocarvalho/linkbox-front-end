import NextHeaders from "next/headers";
import { CustomDetector } from "i18next-browser-languagedetector";

const ServerSideCookieLanguageDetector: CustomDetector = {
  name: "server-side-cookie",
  lookup(options) {
    const { lookupCookie } = options;

    if (!lookupCookie) {
      return;
    }

    const { cookies } = require("next/headers") as typeof NextHeaders;
    const result = cookies().get(lookupCookie)?.value;
    return result ? [result] : undefined;
  },
} as const;

export default ServerSideCookieLanguageDetector;
