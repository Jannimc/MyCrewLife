import React from 'react';
import { Header } from './Header';
import { ScrollToTop } from '../ScrollToTop';
import { LiveChat } from '../support/LiveChat';
import { Footer } from '../Footer';
import { useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: React.ReactNode;
  onGetQuote?: () => void;
}

export function MainLayout({ children, onGetQuote }: MainLayoutProps) {
  const location = useLocation();
  
  // Pages where we want to show the live chat
  const showChatPages = ['/', '/what-we-offer', '/meet-my-crew', '/about-us', '/support'];
  
  const shouldShowChat = showChatPages.includes(location.pathname);
  const isDashboardPage = location.pathname === '/dashboard' ||
                         location.pathname === '/profile' ||
                         location.pathname === '/bookings' ||
                         location.pathname === '/payment-methods';

  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollToTop />
      <Header onGetQuote={onGetQuote} />
      <main className={`${isDashboardPage ? 'pt-14' : 'pt-16'}`}>
        {children}
        {shouldShowChat && <LiveChat />}
      </main>
      <Footer />
    </div>
  );
}