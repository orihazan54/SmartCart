import { useTranslation } from 'react-i18next';
import { BarChart2 } from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { Card } from '../../components/ui/Card';

export function Dashboard() {
  const { t } = useTranslation();
  return (
    <AppShell headerTitle={t('manager.title')}>
      <div className="px-4 py-8 max-w-sm mx-auto">
        <Card variant="gradient" padding="lg" className="flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center">
            <BarChart2 size={30} className="text-primary-500" />
          </div>
          <div>
            <p className="text-lg font-bold text-neutral-800">{t('common.comingSoonTitle')}</p>
            <p className="text-sm text-neutral-500 mt-1">{t('common.comingSoonDesc')}</p>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
