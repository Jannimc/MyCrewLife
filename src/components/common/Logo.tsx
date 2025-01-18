import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const location = useLocation();

  const handleClick = () => {
    // If we're already on the home page, scroll to top
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Link 
      to="/"
      onClick={handleClick}
      className={cn(
        "text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent",
        className
      )}
    >
      MyCrew
    </Link>
  );
}