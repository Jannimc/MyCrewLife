import React from 'react';
import { Header } from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  onGetQuote?: () => void;
}

export function MainLayout({ children, showBackButton = false, onGetQuote }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header showBackButton={showBackButton} onGetQuote={onGetQuote} />
      <main>
        {children}
      </main>
    </div>
  );
}