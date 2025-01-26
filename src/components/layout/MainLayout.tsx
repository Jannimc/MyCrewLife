import React from 'react';
import { Header } from './Header';
import { ScrollToTop } from '../ScrollToTop';

interface MainLayoutProps {
  children: React.ReactNode;
  onGetQuote?: () => void;
}

export function MainLayout({ children, onGetQuote }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollToTop />
      <Header onGetQuote={onGetQuote} />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}