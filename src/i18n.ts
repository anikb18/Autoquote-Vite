import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your translation files
import enTranslations from '@/i18n/locales/en-US.json';
import frTranslations from '@/i18n/locales/fr-CA.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      'en-US': enTranslations,
      'fr-CA': frTranslations,
    },
    defaultNS: 'translation',
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
    ns: ['translation', 'Pricing', 'ProgressBar', 'Common', 'Navigation', 'Auth', 'TradeIn'],
  });

export default i18n;
