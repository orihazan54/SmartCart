import React from 'react';
import { AppHeader } from './AppHeader';

type AppShellProps = {
  children: React.ReactNode;
  headerTitle?: string;
};

export function AppShell({ children, headerTitle }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AppHeader title={headerTitle} />
      <main className="flex-1 max-w-lg mx-auto w-full">{children}</main>
    </div>
  );
}
