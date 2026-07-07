import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, User, ChevronLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Logo } from '../../components/brand/Logo';
import { LanguageSwitcher } from '../../components/layout/LanguageSwitcher';

function getErrorKey(code: string): string {
  if (code === 'auth/invalid-email') return 'auth.errors.invalidEmail';
  if (code === 'auth/weak-password') return 'auth.errors.weakPassword';
  if (
    code === 'auth/email-already-in-use' ||
    code === 'auth/credential-already-in-use'
  )
    return 'auth.errors.emailInUse';
  return 'auth.errors.generic';
}

export function UpgradeAccount() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { linkAnonymousToEmail, user, isAnonymous, isLoading } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && user && !isAnonymous) navigate('/settings', { replace: true });
  }, [user, isAnonymous, isLoading, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await linkAnonymousToEmail(email.trim(), password, displayName.trim() || undefined);
      navigate('/shop', { replace: true });
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      setError(t(getErrorKey(code)));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary-50 via-white to-white">
      {/* Top bar */}
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto w-full">
        <button
          onClick={() => navigate(-1)}
          aria-label={t('common.back')}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft size={22} className="rtl:rotate-180" />
        </button>
        <LanguageSwitcher />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-5 py-8 max-w-sm mx-auto w-full">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Logo size="md" />
          <h1 className="text-2xl font-bold text-neutral-900 mt-4 text-center">
            {t('auth.upgradeTitle')}
          </h1>
          <p className="text-sm text-neutral-500 mt-1 text-center">
            {t('auth.upgradeSubtitle')}
          </p>
        </div>

        <Card variant="elevated" className="w-full">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              label={t('auth.displayNameOptional')}
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              icon={<User size={16} />}
              autoComplete="name"
            />
            <Input
              type="email"
              label={t('auth.email')}
              value={email}
              onChange={e => setEmail(e.target.value)}
              icon={<Mail size={16} />}
              autoComplete="email"
              required
            />
            <Input
              type="password"
              label={t('auth.password')}
              value={password}
              onChange={e => setPassword(e.target.value)}
              icon={<Lock size={16} />}
              autoComplete="new-password"
              required
            />

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            <Button type="submit" variant="primary" size="lg" fullWidth glow disabled={submitting}>
              {submitting ? t('common.loading') : t('auth.upgradeButton')}
            </Button>
          </form>

          <button
            onClick={() => navigate('/shop')}
            className="mt-4 w-full text-sm text-gray-400 hover:text-gray-600 transition-colors text-center"
          >
            {t('auth.continueAsGuest')}
          </button>
        </Card>
      </main>
    </div>
  );
}
