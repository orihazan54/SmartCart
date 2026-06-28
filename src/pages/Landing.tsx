import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  UserCircle,
  UserPlus,
  Briefcase,
  BarChart2,
  LogIn,
} from 'lucide-react';
import { AppHeader } from '../components/layout/AppHeader';
import { Button } from '../components/ui/Button';

export function Landing() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary-50 to-white">
      <AppHeader />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 max-w-sm mx-auto w-full">
        {/* Hero */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-24 h-24 rounded-3xl bg-primary-600 flex items-center justify-center shadow-lg mb-6">
            <ShoppingCart size={44} className="text-white" strokeWidth={2} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
            {t('landing.title')}
          </h1>
          <p className="text-base text-gray-500 leading-relaxed">
            {t('landing.subtitle')}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 w-full">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            icon={<UserCircle size={20} />}
            onClick={() => navigate('/shop')}
          >
            {t('landing.loginCustomer')}
          </Button>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            icon={<UserPlus size={20} />}
            onClick={() => navigate('/shop')}
          >
            {t('landing.register')}
          </Button>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            icon={<Briefcase size={20} />}
            onClick={() => navigate('/employee/login')}
          >
            {t('landing.loginEmployee')}
          </Button>

          <Button
            variant="ghost"
            size="lg"
            fullWidth
            icon={<BarChart2 size={20} />}
            onClick={() => navigate('/manager')}
          >
            {t('landing.loginManager')}
          </Button>

          <Button
            variant="ghost"
            size="md"
            fullWidth
            icon={<LogIn size={18} />}
            onClick={() => navigate('/shop')}
            className="text-gray-400 mt-2"
          >
            {t('landing.loginGuest')}
          </Button>
        </div>
      </main>
    </div>
  );
}
