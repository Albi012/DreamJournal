import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import hu from '../locales/hu.json';
import en from '../locales/en.json';
import de from '../locales/de.json';

export const SUPPORTED = ['hu', 'en', 'de'];
export const LANGUAGE_NAMES = { hu: 'Magyar', en: 'English', de: 'Deutsch' };

// Pick the device language if we support it, else English.
function deviceLanguage() {
  const code = getLocales?.()[0]?.languageCode;
  return SUPPORTED.includes(code) ? code : 'en';
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      hu: { translation: hu },
      en: { translation: en },
      de: { translation: de },
    },
    lng: deviceLanguage(),
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    returnNull: false,
  });
}

export function setLanguage(lang) {
  if (SUPPORTED.includes(lang)) i18n.changeLanguage(lang);
}

export default i18n;
