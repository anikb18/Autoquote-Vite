import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enUSTranslation from './locales/en-US.json';
import frCATranslation from './locales/fr-CA.json';

const resources = {
  'en-US': {
    translation: enUSTranslation,
  },
  'fr-CA': {
    translation: frCATranslation,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr-CA', // default language for Quebec
    fallbackLng: ['fr-CA', 'en-US'],
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
