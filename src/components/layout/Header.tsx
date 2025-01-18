import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, User, ChevronDown, LogOut, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Logo } from '../common/Logo';

interface HeaderProps {
  showBackButton?: boolean;
  onGetQuote?: () => void;
}

export function Header({ showBackButton = false, onGetQuote }: HeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number>();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        handleCloseDropdown();
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
    setIsAnimating(true);
  };

  const handleCloseDropdown = () => {
    setIsAnimating(false);
    timeoutRef.current = window.setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  const handleLogin = () => {
    handleCloseDropdown();
    navigate('/login');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      handleCloseDropdown();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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
            isAnimating ? 'slide-enter' : 'slide-exit'
          }`}
        >
          {user ? (
            <>
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm text-gray-500">Signed in as</p>
                <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </button>
            </>
          ) : (
            <>
              <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Already have an account?</h3>
              </div>
              <div className="p-4">
                <button
                  onClick={handleLogin}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-4 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity duration-200 mb-4"
                >
                  Log in
                </button>
                <div className="text-center">
                  <span className="text-gray-600">No Account? </span>
                  <Link to="/signup" className="text-emerald-600 hover:text-emerald-700 font-medium">
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
    <header className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button
                onClick={() => navigate(-1)}
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <Logo />
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {location.pathname === '/' && (
              <>
                <a href="#how" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm font-medium">
                  How it works
                </a>
                <a href="#professionals" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm font-medium">
                  Professionals
                </a>
                <a href="#services" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm font-medium">
                  Services
                </a>
                <a href="#reviews" className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm font-medium">
                  Reviews
                </a>
              </>
            )}
            
            {!isAuthPage && renderUserDropdown()}

            {onGetQuote && !isAuthPage && (
              <button 
                onClick={onGetQuote}
                className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-emerald-500/25 text-sm font-medium"
              >
                Get a quote
              </button>
            )}
          </div>

          {!isAuthPage && (
            <div className="md:hidden">
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

      {/* Mobile Menu */}
      {isMenuOpen && !isAuthPage && (
        <div className="md:hidden bg-white border-b">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {location.pathname === '/' && (
              <>
                <a href="#how" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-emerald-600">
                  How it works
                </a>
                <a href="#professionals" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-emerald-600">
                  Professionals
                </a>
                <a href="#services" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-emerald-600">
                  Services
                </a>
                <a href="#reviews" className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-emerald-600">
                  Reviews
                </a>
              </>
            )}
            
            {user ? (
              <div className="px-3 py-2 space-y-2 border-t border-gray-100">
                <p className="text-sm text-gray-500">Signed in as</p>
                <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center px-3 py-2 text-base font-medium text-gray-600 hover:text-emerald-600"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="px-3 py-2 space-y-2">
                <button
                  onClick={handleLogin}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Log in
                </button>
                <div className="text-center py-2">
                  <span className="text-gray-600">No Account? </span>
                  <Link to="/signup" className="text-emerald-600 hover:text-emerald-700 font-medium">
                    Start here
                  </Link>
                </div>
              </div>
            )}

            {onGetQuote && (
              <button
                onClick={onGetQuote}
                className="block w-full px-3 py-2 text-base font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-500 rounded-lg"
              >
                Get a quote
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}