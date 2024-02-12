import { initReactI18next } from 'react-i18next/initReactI18next';
import I18nOptions from '../i18n/options';
import UniversalLanguageDetector from '../i18n/UniversalLanguageDetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import i18next from 'i18next';

const initializeI18next = () => {
  i18next
    .use(initReactI18next)
    .use(UniversalLanguageDetector)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
        import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(I18nOptions);
};

export const initializeI18nextOrChangeLanguage = () => {
  if (i18next.isInitialized) {
    i18next.changeLanguage();
  } else {
    initializeI18next();
  }
};

export default initializeI18next;
