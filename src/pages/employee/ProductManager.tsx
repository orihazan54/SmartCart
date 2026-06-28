import React from 'react';
import { useTranslation } from 'react-i18next';
import { AppShell } from '../../components/layout/AppShell';

export function ProductManager() {
  const { t } = useTranslation();
  return (
    <AppShell>
      <div className="flex items-center justify-center h-64 text-gray-400">
        {t('employee.comingSoon')}
      </div>
    </AppShell>
  );
}
