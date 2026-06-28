import { useTranslation } from 'react-i18next';
import { LANGUAGES, type LanguageOption } from '../i18n';
import type { SupportedLanguage } from '../lib/types';

type UseLanguageReturn = {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  languages: LanguageOption[];
  isRTL: boolean;
};

export function useLanguage(): UseLanguageReturn {
  const { i18n } = useTranslation();

  const rawLang = i18n.language?.slice(0, 2) ?? 'he';
  const language = (['he', 'ar', 'ru', 'en'].includes(rawLang)
    ? rawLang
    : 'he') as SupportedLanguage;

  const isRTL = language === 'he' || language === 'ar';

  const setLanguage = (lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
  };

  return { language, setLanguage, languages: LANGUAGES, isRTL };
}
