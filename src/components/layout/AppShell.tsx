import { type ReactNode } from 'react';
import { AppHeader } from './AppHeader';

type AppShellProps = {
  children: ReactNode;
  headerTitle?: string;
  showBack?: boolean;
};

export function AppShell({ children, headerTitle, showBack }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AppHeader title={headerTitle} showBack={showBack} />
      <main className="flex-1 max-w-lg mx-auto w-full">{children}</main>
    </div>
  );
}
