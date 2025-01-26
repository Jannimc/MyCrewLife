import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, User, ChevronDown, CreditCard, Calendar, LifeBuoy, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Logo } from '../common/Logo';

interface HeaderProps {
  onGetQuote?: () => void;
}

export function Header({ onGetQuote }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleCloseDropdown();
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleOpenDropdown = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  const handleCloseDropdown = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsDropdownOpen(false);
    }, 100);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      handleCloseDropdown();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  const dropdownItems = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      description: 'View your dashboard'
    },
    {
      label: 'Profile',
      icon: User,
      href: '/profile',
      description: 'View and edit your details'
    },
    {
      label: 'Bookings',
      icon: Calendar,
      href: '/bookings',
      description: 'View upcoming and past bookings'
    },
    {
      label: 'Payment Methods',
      icon: CreditCard,
      href: '/payment-methods',
      description: 'Manage your payment options'
    },
    {
      label: 'Support',
      icon: LifeBuoy,
      href: '/support',
      description: 'Get help or contact us'
    }
  ];

  const renderUserDropdown = () => (
    <div 
      className="relative" 
      ref={dropdownRef}
      onMouseEnter={handleOpenDropdown}
      onMouseLeave={handleCloseDropdown}
    >
      <button
        className="flex items-center space-x-2 rounded-full bg-gray-100 hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 transition-all duration-200 p-2.5"
      >
        <User className="w-5 h-5" />
        <ChevronDown className="w-4 h-4" />
      </button>

      {isDropdownOpen && (
        <div 
          className={`absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 origin-top ${
            isDropdownOpen ? 'slide-enter' : 'slide-exit'
          }`}
        >
          {user ? (
            <>
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm text-gray-500">Signed in as</p>
                <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
              </div>
              
              <div className="py-2">
                {dropdownItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={index}
                      to={item.href}
                      className="group flex items-center px-4 py-2.5 hover:bg-gray-50"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <div className="flex-shrink-0">
                        <Icon className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors duration-200" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-600 transition-colors duration-200">
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="border-t border-gray-100 pt-2 mt-2">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center px-4 py-2.5 text-left hover:bg-gray-50 group"
                >
                  <LogOut className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors duration-200" />
                  <span className="ml-3 text-sm font-medium text-gray-900 group-hover:text-emerald-600 transition-colors duration-200">
                    Sign out
                  </span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Already have an account?</h3>
              </div>
              <div className="p-4">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    navigate('/login');
                  }}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-4 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity duration-200 mb-4"
                >
                  Log in
                </button>
                <div className="text-center">
                  <span className="text-gray-600">No Account? </span>
                  <Link 
                    to="/signup"
                    onClick={() => setIsDropdownOpen(false)}
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Start here
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-4">
            <Logo />
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {location.pathname === '/' && (
              <>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm font-medium">
                  Home
                </a>
                <Link to="/what-we-offer" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm font-medium">
                  What We Offer
                </Link>
                <Link to="/meet-my-crew" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm font-medium">
                  Meet My Crew
                </Link>
                <a href="#" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm font-medium">
                  About Us
                </a>
              </>
            )}
            
            {!isAuthPage && (
              <>
                {onGetQuote && (
                  <button 
                    onClick={onGetQuote}
                    className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-emerald-500/25 text-sm font-medium"
                  >
                    Get a quote
                  </button>
                )}
                {renderUserDropdown()}
              </>
            )}
          </div>

          {!isAuthPage && (
            <div className="md:hidden flex items-center space-x-3">
              {onGetQuote && (
                <button
                  onClick={onGetQuote}
                  className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200 text-sm font-medium"
                >
                  Get a quote
                </button>
              )}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Popup */}
      {isMenuOpen && !isAuthPage && (
        <div
          ref={mobileMenuRef}
          className="absolute right-4 top-[4.5rem] w-64 bg-white rounded-xl shadow-lg border border-gray-100 animate-fade-in z-50 md:hidden"
        >
          <div className="p-4">
            {location.pathname === '/' && (
              <div className="flex flex-col items-center space-y-2 mb-4">
                <a href="#" className="w-full text-center px-3 py-2 text-base font-medium text-gray-600 hover:text-emerald-600 hover:bg-gray-50 rounded-lg">
                  Home
                </a>
                <Link to="/what-we-offer" className="w-full text-center px-3 py-2 text-base font-medium text-gray-600 hover:text-emerald-600 hover:bg-gray-50 rounded-lg">
                  What We Offer
                </Link>
                <Link to="/meet-my-crew" className="w-full text-center px-3 py-2 text-base font-medium text-gray-600 hover:text-emerald-600 hover:bg-gray-50 rounded-lg">
                  Meet My Crew
                </Link>
                <a href="#" className="w-full text-center px-3 py-2 text-base font-medium text-gray-600 hover:text-emerald-600 hover:bg-gray-50 rounded-lg">
                  About Us
                </a>
              </div>
            )}
            
            {user ? (
              <div className="border-t border-gray-100 pt-4">
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-500">Signed in as</p>
                  <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                </div>
                {dropdownItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={index}
                      to={item.href}
                      className="w-full flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-emerald-600 hover:bg-gray-50 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="w-5 h-5 mr-2" />
                      {item.label}
                    </Link>
                  );
                })}
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-emerald-600 hover:bg-gray-50 rounded-lg mt-2"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-100 pt-4">
                <div className="flex flex-col items-center space-y-3">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/login');
                    }}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-4 py-2 rounded-lg font-medium text-center"
                  >
                    Log in
                  </button>
                  <div className="text-center">
                    <span className="text-gray-600">No Account? </span>
                    <Link 
                      to="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Start here
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}