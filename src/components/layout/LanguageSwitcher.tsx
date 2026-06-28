import React, { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { Dropdown } from '../ui/Dropdown';
import type { SupportedLanguage } from '../../lib/types';

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, languages } = useLanguage();

  const items = languages.map(lang => ({
    key: lang.code,
    label: lang.nativeName,
    iconEnd:
      lang.code === language ? (
        <Check size={14} className="text-primary-600" />
      ) : undefined,
  }));

  return (
    <div className="relative">
      <button
        aria-label="Switch language"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center justify-center w-10 h-10 rounded-xl text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
      >
        <Globe size={20} />
      </button>

      <Dropdown
        items={items}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={key => setLanguage(key as SupportedLanguage)}
        align="end"
      />
    </div>
  );
}
