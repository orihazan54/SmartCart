import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';

type AppHeaderProps = {
  title?: string;
};

export function AppHeader({ title }: AppHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
        >
          <ShoppingCart size={22} strokeWidth={2.5} />
          <span className="font-bold text-base tracking-tight">
            {title ?? t('common.appName')}
          </span>
        </Link>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
