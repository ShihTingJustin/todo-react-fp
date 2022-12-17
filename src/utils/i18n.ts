import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enGeneral from '../locales/en/general.json';
import zhGeneral from '../locales/zh/general.json';

export enum Language {
  EN = 'en',
  ZH = 'zh'
}

const resources = {
  en: {
    general: enGeneral
  },
  zh: {
    general: zhGeneral
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage']
    },
    resources,
    fallbackLng: 'en',
    ns: ['general'],
    defaultNS: 'general',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
