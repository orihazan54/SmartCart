import React from 'react';
import { useTranslation } from 'react-i18next';
import { Briefcase } from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';

export function EmployeeLogin() {
  const { t } = useTranslation();
  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
        <Briefcase size={40} className="text-gray-200" />
        <p className="font-medium">{t('employee.login')}</p>
        <p className="text-sm">{t('employee.comingSoon')}</p>
      </div>
    </AppShell>
  );
}
