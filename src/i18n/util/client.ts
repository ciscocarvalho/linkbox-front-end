import { LANGUAGE_COOKIE_NAME } from "../options";
import { Cookies } from "react-cookie";

export const setLanguageCookie = (language: string) => {
  const ONE_DAY_IN_SECONDS = 24 * 60 * 60;

  new Cookies().set(LANGUAGE_COOKIE_NAME, language, {
    maxAge: 400 * ONE_DAY_IN_SECONDS,
  });
};

export const getLanguageDisplayName = (languageCode: string) => {
  try {
    const languageDisplayName = new Intl.DisplayNames(languageCode, {
      type: "language",
    }).of(languageCode);

    return languageDisplayName;
  } catch (error) {
    return languageCode;
  }
};
