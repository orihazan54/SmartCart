import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserCircle, LogOut, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { AppShell } from '../../components/layout/AppShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../hooks/useLanguage';
import type { SupportedLanguage } from '../../lib/types';

export function Settings() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, profile, isAnonymous, signOut, updateSettings } = useAuth();
  const { language, setLanguage, languages } = useLanguage();

  const displayName = profile?.displayName ?? profile?.email ?? null;
  const saveHistory = profile?.settings.saveHistory ?? false;

  async function handleToggleHistory() {
    await updateSettings({ saveHistory: !saveHistory });
  }

  async function handleSignOut() {
    await signOut();
    toast(t('settings.signedOut'));
    navigate('/', { replace: true });
  }

  return (
    <AppShell headerTitle={t('settings.title')}>
      <div className="px-4 py-6 space-y-4">

        {/* Account card */}
        <Card>
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0
              ${isAnonymous ? 'bg-gray-100' : 'bg-primary-100'}`}
            >
              {isAnonymous || !displayName ? (
                <UserCircle size={28} className={isAnonymous ? 'text-gray-400' : 'text-primary-500'} />
              ) : (
                <span className="text-lg font-bold text-primary-600">
                  {displayName[0].toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">
                {displayName ?? t('settings.anonymous')}
              </p>
              {!isAnonymous && profile?.email && displayName !== profile.email && (
                <p className="text-sm text-gray-400 truncate">{profile.email}</p>
              )}
              {isAnonymous && (
                <p className="text-xs text-gray-400">{t('settings.anonymous')}</p>
              )}
            </div>
          </div>

          {/* Upgrade banner for anonymous users */}
          {isAnonymous && (
            <div
              className="mt-4 rounded-xl bg-primary-50 border border-primary-100 p-3 flex items-start gap-3 cursor-pointer hover:bg-primary-100 transition-colors"
              onClick={() => navigate('/auth/upgrade')}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && navigate('/auth/upgrade')}
            >
              <ShieldCheck size={20} className="text-primary-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-primary-700">{t('settings.upgradePrompt')}</p>
                <p className="text-xs text-primary-500 mt-0.5">{t('settings.upgradeHint')}</p>
              </div>
            </div>
          )}
        </Card>

        {/* Language card */}
        <Card>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            {t('settings.language')}
          </p>
          <div className="flex flex-wrap gap-2">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code as SupportedLanguage)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  language === lang.code
                    ? 'bg-primary-500 text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {lang.nativeName}
              </button>
            ))}
          </div>
        </Card>

        {/* Privacy section — only for registered users */}
        {!isAnonymous && (
          <Card>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              {t('settings.privacy')}
            </p>
            <label className="flex items-start gap-3 cursor-pointer">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={saveHistory}
                  onChange={handleToggleHistory}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 rounded-full bg-gray-200 peer-checked:bg-primary-500 transition-colors" />
                <div className="absolute top-0.5 start-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5 rtl:peer-checked:-translate-x-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{t('settings.saveHistory')}</p>
                <p className="text-xs text-gray-400 mt-0.5">{t('settings.saveHistoryHint')}</p>
              </div>
            </label>
          </Card>
        )}

        {/* Sign out */}
        {user && (
          <Button
            variant="outline"
            size="lg"
            fullWidth
            icon={<LogOut size={18} />}
            onClick={handleSignOut}
            className="text-red-500 border-red-200 hover:bg-red-50"
          >
            {t('settings.signOut')}
          </Button>
        )}

      </div>
    </AppShell>
  );
}
