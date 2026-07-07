import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MapPin, Languages, AlignJustify, ArrowRight, Briefcase } from 'lucide-react';
import { Logo } from '../components/brand/Logo';
import { Card } from '../components/ui/Card';
import { LanguageSwitcher } from '../components/layout/LanguageSwitcher';

const FEATURES = [
  { Icon: AlignJustify, key: 'landing.feature1' },
  { Icon: MapPin, key: 'landing.feature2' },
  { Icon: Languages, key: 'landing.feature3' },
] as const;

export function Landing() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary-50 via-white to-white">
      {/* Top bar */}
      <div className="flex justify-end px-4 pt-4">
        <LanguageSwitcher />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-5 py-8 max-w-sm mx-auto w-full">
        {/* Hero */}
        <div className="flex flex-col items-center text-center mb-8">
          <Logo size="lg" />
          <h1 className="text-3xl font-bold text-neutral-900 mt-5 mb-2 leading-tight">
            {t('common.appName')}
          </h1>
          <p className="text-base text-neutral-500 leading-relaxed">
            {t('landing.tagline')}
          </p>
        </div>

        {/* Feature chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {FEATURES.map(({ Icon, key }) => (
            <div
              key={key}
              className="flex items-center gap-1.5 bg-white border border-neutral-200 rounded-full px-3 py-1.5 shadow-sm"
            >
              <Icon size={13} className="text-primary-500 shrink-0" />
              <span className="text-xs font-medium text-neutral-600">{t(key)}</span>
            </div>
          ))}
        </div>

        {/* CTA cards */}
        <div className="w-full space-y-3">
          <Card
            variant="gradient"
            className="cursor-pointer active:scale-[0.98] transition-transform select-none"
            onClick={() => navigate('/shop')}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && navigate('/shop')}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-bold text-primary-800">{t('landing.startNow')}</p>
                <p className="text-xs text-primary-600 mt-0.5">{t('landing.guestHint')}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center shadow-glow shrink-0">
                <ArrowRight size={18} className="text-white rtl:rotate-180" />
              </div>
            </div>
          </Card>

          <Card
            variant="outlined"
            className="cursor-pointer active:scale-[0.98] transition-transform select-none"
            onClick={() => navigate('/auth/sign-in')}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && navigate('/auth/sign-in')}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-bold text-primary-700">{t('landing.haveAccount')}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{t('landing.accountHint')}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center shrink-0">
                <ArrowRight size={18} className="text-primary-500 rtl:rotate-180" />
              </div>
            </div>
          </Card>
        </div>

        {/* Staff footer link */}
        <button
          onClick={() => navigate('/employee/login')}
          className="mt-8 flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          <Briefcase size={13} />
          <span>{t('landing.staffAccess')}</span>
        </button>
      </main>
    </div>
  );
}
