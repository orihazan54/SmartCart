import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import heJSON from './locales/he.json';
import arJSON from './locales/ar.json';
import ruJSON from './locales/ru.json';
import enJSON from './locales/en.json';

import type { SupportedLanguage } from '../lib/types';

export type { SupportedLanguage };

export type LanguageOption = {
  code: SupportedLanguage;
  nativeName: string;
  dir: 'rtl' | 'ltr';
};

export const LANGUAGES: LanguageOption[] = [
  { code: 'he', nativeName: 'עברית', dir: 'rtl' },
  { code: 'ar', nativeName: 'العربية', dir: 'rtl' },
  { code: 'ru', nativeName: 'Русский', dir: 'ltr' },
  { code: 'en', nativeName: 'English', dir: 'ltr' },
];

export function applyLanguageSideEffects(lang: string): void {
  const isRTL = lang === 'he' || lang === 'ar';
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;

  document.body.classList.remove('font-heebo', 'font-cairo', 'font-inter');
  if (lang === 'he') document.body.classList.add('font-heebo');
  else if (lang === 'ar') document.body.classList.add('font-cairo');
  else document.body.classList.add('font-inter');
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      he: { translation: heJSON },
      ar: { translation: arJSON },
      ru: { translation: ruJSON },
      en: { translation: enJSON },
    },
    fallbackLng: 'he',
    supportedLngs: ['he', 'ar', 'ru', 'en'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'smartcart_lang',
    },
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', applyLanguageSideEffects);

applyLanguageSideEffects(i18n.language || 'he');

export default i18n;
