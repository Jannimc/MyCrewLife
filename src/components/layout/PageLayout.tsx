import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  showBackButton?: boolean;
  contentClassName?: string;
}

/**
 * Standard page layout component with consistent spacing and structure
 */
export function PageLayout({
  children,
  title,
  subtitle,
  action,
  showBackButton = true,
  contentClassName = ''
}: PageLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors duration-200 mt-8 mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back</span>
          </button>
        )}

        {/* Optional Header */}
        {(title || subtitle || action) && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                {title && <h1 className="text-2xl font-bold text-gray-900">{title}</h1>}
                {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
              </div>
              {action && <div>{action}</div>}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={contentClassName}>
          {children}
        </div>
      </div>
    </div>
  );
}