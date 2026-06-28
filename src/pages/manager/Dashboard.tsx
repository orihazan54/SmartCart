import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart2 } from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';

export function Dashboard() {
  const { t } = useTranslation();
  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
        <BarChart2 size={40} className="text-gray-200" />
        <p className="font-medium">{t('manager.title')}</p>
        <p className="text-sm">{t('manager.comingSoon')}</p>
      </div>
    </AppShell>
  );
}
