import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, User, ChevronDown } from 'lucide-react';
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number>();

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
    }, 200); // Match this with the animation duration
  };

  const renderUserDropdown = () => (
    <div className="relative" ref={dropdownRef}>
      <button
        onMouseEnter={handleOpenDropdown}
        className="flex items-center space-x-2 rounded-full bg-gray-100 hover:bg-emerald-50 text-gray-600 hover:text-emerald-600 transition-all duration-200 p-2.5"
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <User className="w-full h-full" />
        </div>
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div 
          onMouseLeave={handleCloseDropdown}
          className={`absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 origin-top ${
            isAnimating ? 'slide-enter' : 'slide-exit'
          }`}
        >
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Already have an account?</h3>
          </div>
          <div className="p-4">
            <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-4 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity duration-200 mb-4">
              Log in
            </button>
            <div className="text-center">
              <span className="text-gray-600">No Account? </span>
              <a href="#signup" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Start here
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-1 flex items-center">
              <div className="flex-shrink-0">
                <span 
                  onClick={() => navigate('/')}
                  className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent cursor-pointer"
                >
                  MyCrew
                </span>
              </div>
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
                  
                  {renderUserDropdown()}

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
                {renderUserDropdown()}
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
            <div className="px-3 py-2 space-y-2">
              <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-4 py-2 rounded-lg font-medium">
                Log in
              </button>
              <div className="text-center py-2">
                <span className="text-gray-600">No Account? </span>
                <a href="#signup" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Start here
                </a>
              </div>
            </div>
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