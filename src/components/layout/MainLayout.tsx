import React from 'react';
import { Header } from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
  onGetQuote?: () => void;
}

export function MainLayout({ children, onGetQuote }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header onGetQuote={onGetQuote} />
      <main>
        {children}
      </main>
    </div>
  );
}