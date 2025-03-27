import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ElementType;
  action?: React.ReactNode;
}

export function Card({ children, className, title, icon: Icon, action }: CardProps) {
  return (
    <div className={cn("bg-white rounded-2xl shadow-sm", className)}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-6">
          {title && (
            <div className="flex items-center">
              {Icon && <Icon className="w-5 h-5 text-emerald-500 mr-2" />}
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            </div>
          )}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}