import React from 'react';
import { cn } from '../../utils/cn';
import { AlertCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  isProcessing?: boolean;
}

export function FormInput({
  label,
  error,
  icon: Icon,
  className,
  disabled,
  isProcessing,
  ...props
}: FormInputProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className={`h-5 w-5 ${error ? 'text-red-400' : 'text-gray-400'}`} />
          </div>
        )}
        <input
          className={cn(
            'block w-full border rounded-lg focus:ring-2 transition-all duration-200',
            Icon ? 'pl-10' : 'pl-3',
            'pr-3 py-2',
            error
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-emerald-500 focus:border-emerald-500',
            disabled || isProcessing ? 'bg-gray-50 cursor-not-allowed' : '',
            className
          )}
          disabled={disabled || isProcessing}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}