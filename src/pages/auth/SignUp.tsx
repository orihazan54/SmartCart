import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Mail, Lock, User, ChevronLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { LanguageSwitcher } from '../../components/layout/LanguageSwitcher';

function getErrorKey(code: string): string {
  if (code === 'auth/invalid-email') return 'auth.errors.invalidEmail';
  if (code === 'auth/weak-password') return 'auth.errors.weakPassword';
  if (code === 'auth/email-already-in-use') return 'auth.errors.emailInUse';
  return 'auth.errors.generic';
}

export function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signUpWithEmail, user, isAnonymous, isLoading } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && user && !isAnonymous) navigate('/shop', { replace: true });
  }, [user, isAnonymous, isLoading, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signUpWithEmail(email.trim(), password, displayName.trim() || undefined);
      navigate('/shop', { replace: true });
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      setError(t(getErrorKey(code)));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary-50 to-white">
      <div className="flex items-center justify-between h-14 px-4 max-w-lg mx-auto w-full">
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate(-1)}
            aria-label={t('common.back')}
            className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition-colors -ms-1 me-0.5"
          >
            <ChevronLeft size={22} className="rtl:rotate-180" />
          </button>
          <Link to="/" className="flex items-center gap-2 text-primary-600">
            <ShoppingCart size={22} strokeWidth={2.5} />
            <span className="font-bold text-base tracking-tight">{t('common.appName')}</span>
          </Link>
        </div>
        <LanguageSwitcher />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8 max-w-sm mx-auto w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          {t('auth.signUpTitle')}
        </h1>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
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

          <Button type="submit" variant="primary" size="lg" fullWidth disabled={submitting}>
            {submitting ? t('common.loading') : t('auth.signUpButton')}
          </Button>
        </form>

        <div className="mt-6 flex items-center gap-3 w-full">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm text-gray-400">{t('common.or')}</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <p className="mt-4 text-sm text-gray-500 text-center">
          {t('auth.haveAccount')}{' '}
          <Link to="/auth/sign-in" className="text-primary-600 font-medium hover:underline">
            {t('auth.signInLink')}
          </Link>
        </p>
      </main>
    </div>
  );
}
