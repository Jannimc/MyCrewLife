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
  const [scrollPosition, setScrollPosition] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number>();
  const headerRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
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
  const isMainPage = location.pathname === '/' || 
                     location.pathname === '/what-we-offer' || 
                     location.pathname === '/meet-my-crew' || 
                     location.pathname === '/about-us' || 
                     location.pathname === '/support' ||
                     location.pathname === '/become-cleaner' ||
                     location.pathname === '/quote' || 
                     location.pathname === '/booking-confirmation' ||
                     isAuthPage;

  const isDashboardPage = location.pathname === '/dashboard' ||
                         location.pathname === '/profile' ||
                         location.pathname === '/bookings' ||
                         location.pathname === '/payment-methods' ||
                         location.pathname.startsWith('/bookings/');

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

  const headerHeight = scrollPosition > 100 ? 'h-14' : 'h-16';
  const headerPadding = scrollPosition > 100 ? 'py-2' : 'py-3';
  const headerShadow = scrollPosition > 50 ? 'shadow-md' : 'shadow-sm';

  return (
    <header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100 transition-all duration-300 ${headerShadow}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-12 items-center transition-all duration-300 ${headerHeight} ${headerPadding}`}>
          {/* Logo - Left */}
          <div className="col-span-2">
            <Logo />
          </div>

          {/* Navigation - Center */}
          <div className="hidden md:block col-span-6">
            {(isMainPage || isAuthPage) && (
              <div className="flex items-center justify-center space-x-8 w-full">
                <Link to="/" className={`text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm font-medium ${location.pathname === '/' ? 'text-emerald-600' : ''}`}>
                  Home
                </Link>
                <Link to="/what-we-offer" className={`text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm font-medium ${location.pathname === '/what-we-offer' ? 'text-emerald-600' : ''}`}>
                  What We Offer
                </Link>
                <Link to="/meet-my-crew" className={`text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm font-medium ${location.pathname === '/meet-my-crew' ? 'text-emerald-600' : ''}`}>
                  Meet My Crew
                </Link>
                <Link to="/about-us" className={`text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm font-medium ${location.pathname === '/about-us' ? 'text-emerald-600' : ''}`}>
                  About Us
                </Link>
                <Link to="/support" className={`text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm font-medium ${location.pathname === '/support' ? 'text-emerald-600' : ''}`}>
                  Contact Us
                </Link>
              </div>
            )}
            
            {isDashboardPage && user && (
              <div className="flex items-center justify-center space-x-8">
                <Link to="/dashboard" className={`text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm font-medium ${location.pathname === '/dashboard' ? 'text-emerald-600' : ''}`}>
                  Dashboard
                </Link>
                <Link to="/bookings" className={`text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm font-medium ${location.pathname.startsWith('/bookings') ? 'text-emerald-600' : ''}`}>
                  My Bookings
                </Link>
                <Link to="/profile" className={`text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm font-medium ${location.pathname === '/profile' ? 'text-emerald-600' : ''}`}>
                  Profile
                </Link>
              </div>
            )}
          </div>

          {/* Actions - Right */}
          <div className="hidden md:flex items-center justify-end space-x-6 col-span-4">
              <div className="flex items-center space-x-4 min-w-[280px] justify-end">
                {onGetQuote && (
                  <>
                    <button
                      onClick={() => navigate('/become-cleaner')}
                      className={`bg-white border-2 border-emerald-500 text-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-all duration-200 text-sm font-medium h-[38px] whitespace-nowrap ${
                        location.pathname === '/become-cleaner' ? 'hidden' : ''
                      }`}
                    >
                      Become a Cleaner
                    </button>
                    <button 
                      onClick={onGetQuote}
                      className={`bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-emerald-500/25 text-sm font-medium h-[38px] whitespace-nowrap ${
                        location.pathname === '/quote' || location.pathname === '/booking-confirmation' ? 'hidden' : ''
                      }`}
                    >
                      Get a quote
                    </button>
                  </>
                )}
                {!onGetQuote && isMainPage && (
                  <>
                    <button
                      onClick={() => navigate('/become-cleaner')}
                      className={`bg-white border-2 border-emerald-500 text-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-all duration-200 text-sm font-medium h-[38px] whitespace-nowrap ${
                        location.pathname === '/become-cleaner' ? 'hidden' : ''
                      }`}
                    >
                      Become a Cleaner
                    </button>
                    <button 
                      onClick={() => navigate('/quote')}
                      className={`bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-emerald-500/25 text-sm font-medium h-[38px] whitespace-nowrap ${
                        location.pathname === '/quote' || location.pathname === '/booking-confirmation' ? 'hidden' : ''
                      }`}
                    >
                      Get a quote
                    </button>
                  </>
                )}
                {isDashboardPage && (
                  <button 
                    onClick={() => navigate('/quote')}
                    className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-emerald-500/25 text-sm font-medium h-[38px] whitespace-nowrap"
                  >
                    Get a quote
                  </button>
                )}
                {renderUserDropdown()}
              </div>
          </div>

          <div className="md:hidden flex items-center justify-end col-span-10">
              <>
                {onGetQuote && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigate('/become-cleaner')}
                      className={`bg-white border-2 border-emerald-500 text-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-all duration-200 text-sm font-medium h-[38px] whitespace-nowrap ${
                        location.pathname === '/become-cleaner' ? 'hidden' : ''
                      }`}
                    >
                      Join Us
                    </button>
                    <button
                      onClick={onGetQuote}
                      className={`bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200 text-sm font-medium h-[38px] whitespace-nowrap ${
                        location.pathname === '/quote' ? 'hidden' : ''
                      }`}
                    >
                      Get a quote
                    </button>
                  </div>
                )}
                {!onGetQuote && isMainPage && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate('/become-cleaner');
                      }}
                      className={`bg-white border-2 border-emerald-500 text-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-all duration-200 text-sm font-medium h-[38px] whitespace-nowrap ${
                        location.pathname === '/become-cleaner' ? 'hidden' : ''
                      }`}
                    >
                      Join Us
                    </button>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate('/quote');
                      }}
                      className={`bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity duration-200 text-sm font-medium h-[38px] whitespace-nowrap ${
                        location.pathname === '/quote' ? 'hidden' : ''
                      }`}
                    >
                      Get a quote
                    </button>
                  </div>
                )}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </>
          </div>
        </div>
      </div>

      {/* Mobile Menu Popup */}
      {isMenuOpen && !isAuthPage && (
        <div
          ref={mobileMenuRef}
          className="absolute right-4 top-[4.5rem] w-64 bg-white rounded-xl shadow-lg border border-gray-100 animate-fade-in z-50 md:hidden"
        >
          <div className="p-4">
            {isMainPage && (
              <div className="flex flex-col items-center space-y-2 mb-4">
                <Link to="/" className={`w-full text-center px-3 py-2 text-base font-medium ${location.pathname === '/' ? 'text-emerald-600 bg-emerald-50' : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'} rounded-lg`}>
                  Home
                </Link>
                <Link to="/what-we-offer" className={`w-full text-center px-3 py-2 text-base font-medium ${location.pathname === '/what-we-offer' ? 'text-emerald-600 bg-emerald-50' : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'} rounded-lg`}>
                  What We Offer
                </Link>
                <Link to="/meet-my-crew" className={`w-full text-center px-3 py-2 text-base font-medium ${location.pathname === '/meet-my-crew' ? 'text-emerald-600 bg-emerald-50' : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'} rounded-lg`}>
                  Meet My Crew
                </Link>
                <Link to="/about-us" className={`w-full text-center px-3 py-2 text-base font-medium ${location.pathname === '/about-us' ? 'text-emerald-600 bg-emerald-50' : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'} rounded-lg`}>
                  About Us
                </Link>
                <Link to="/support" className={`w-full text-center px-3 py-2 text-base font-medium ${location.pathname === '/support' ? 'text-emerald-600 bg-emerald-50' : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'} rounded-lg`}>
                  Contact Us
                </Link>
              </div>
            )}
            
            {isDashboardPage && user && (
              <div className="flex flex-col items-center space-y-2 mb-4">
                <Link to="/dashboard" className={`w-full text-center px-3 py-2 text-base font-medium ${location.pathname === '/dashboard' ? 'text-emerald-600 bg-emerald-50' : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'} rounded-lg`}>
                  Dashboard
                </Link>
                <Link to="/bookings" className={`w-full text-center px-3 py-2 text-base font-medium ${location.pathname === '/bookings' ? 'text-emerald-600 bg-emerald-50' : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'} rounded-lg`}>
                  My Bookings
                </Link>
                <Link to="/profile" className={`w-full text-center px-3 py-2 text-base font-medium ${location.pathname === '/profile' ? 'text-emerald-600 bg-emerald-50' : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'} rounded-lg`}>
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    navigate('/quote');
                  }}
                  className="w-full text-center px-3 py-2 text-base font-medium bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg hover:opacity-90 transition-opacity duration-200"
                >
                  Get a quote
                </button>
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