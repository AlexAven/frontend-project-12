import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/languages.js';

i18next.use(initReactI18next).init({
  resources,
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
  debug: false,
});

export default i18next;
