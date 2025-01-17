import React from 'react';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  onGetQuote: () => void;
}

export function Navigation({ isMenuOpen, setIsMenuOpen, onGetQuote }: NavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isQuotePage = location.pathname === '/quote';

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              {isQuotePage && (
                <button
                  onClick={() => navigate('/')}
                  className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors duration-200"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to home
                </button>
              )}
              <span 
                onClick={() => navigate('/')}
                className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent cursor-pointer"
              >
                MyCrew
              </span>
            </div>
            {!isQuotePage ? (
              <>
                <div className="hidden md:flex items-center space-x-6">
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
                  <button className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm font-medium">
                    Log in
                  </button>
                  <button 
                    onClick={onGetQuote}
                    className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-6 py-2.5 rounded-lg hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-emerald-500/25 text-sm font-medium"
                  >
                    Get a quote
                  </button>
                </div>
                <div className="md:hidden flex items-center">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
                  >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm font-medium">
                  Need help?
                </button>
                <button className="text-gray-600 hover:text-emerald-600 transition-colors duration-200 text-sm font-medium">
                  Save quote
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Only show on home page */}
      {!isQuotePage && isMenuOpen && (
        <div className="md:hidden bg-white border-b">
          <div className="px-2 pt-2 pb-3 space-y-1">
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
            <button className="block w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-emerald-600">
              Log in
            </button>
            <button 
              onClick={onGetQuote}
              className="block w-full px-3 py-2 text-base font-medium text-white bg-gradient-to-r from-emerald-600 to-teal-500 rounded-lg"
            >
              Get a quote
            </button>
          </div>
        </div>
      )}
    </>
  );
}