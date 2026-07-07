import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, UserCircle, ChevronLeft } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAuth } from '../../contexts/AuthContext';

type AppHeaderProps = {
  title?: string;
  showBack?: boolean;
};

function ProfileButton() {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (isLoading) return <div className="w-8 h-8" />;

  const isAnonymous = user?.isAnonymous ?? true;
  const displayName = profile?.displayName ?? profile?.email ?? null;
  const initial = displayName?.[0]?.toUpperCase() ?? null;

  return (
    <button
      onClick={() => navigate('/settings')}
      aria-label={t('settings.title')}
      className={
        isAnonymous || !initial
          ? 'w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary-400 hover:text-primary-500 transition-colors'
          : 'w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-bold hover:bg-primary-600 transition-colors'
      }
    >
      {isAnonymous || !initial ? <UserCircle size={20} /> : initial}
    </button>
  );
}

export function AppHeader({ title, showBack }: AppHeaderProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const displayBack = showBack ?? location.pathname !== '/';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto">
        {/* Start side: back button or logo */}
        <div className="flex items-center gap-1">
          {displayBack && (
            <button
              onClick={() => navigate(-1)}
              aria-label={t('common.back')}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors -ms-1 me-0.5"
            >
              <ChevronLeft size={22} className="rtl:rotate-180" />
            </button>
          )}
          <Link
            to="/"
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors"
          >
            <ShoppingCart size={22} strokeWidth={2.5} />
            <span className="font-bold text-base tracking-tight">
              {title ?? t('common.appName')}
            </span>
          </Link>
        </div>

        {/* End side: profile + language */}
        <div className="flex items-center gap-2">
          <ProfileButton />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
