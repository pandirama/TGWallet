import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './translations/en.json';
import vi from './translations/vi.json';
import ind from './translations/in.json';
import ph from './translations/ph.json';

const resources = {
  en: en,
  vi: vi,
  in: ind,
  ph: ph,
};

const fallbackLng = ['en'];

i18n.use(initReactI18next).init({
  fallbackLng,
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
