import React from 'react';
import { CheckCircle } from 'lucide-react';

interface PreferredDayQuestionProps {
  value: string;
  onChange: (value: string) => void;
}

export function PreferredDayQuestion({
  value,
  onChange
}: PreferredDayQuestionProps) {
  const options = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {options.map(option => (
        <div
          key={option.value}
          onClick={() => onChange(option.value)}
          className="relative group cursor-pointer transform transition-all duration-200 hover:scale-102"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-25 transition duration-200" />
          <div className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
            value === option.value
              ? 'border-emerald-500 bg-emerald-50'
              : 'border-gray-200 bg-white hover:border-emerald-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-base font-medium text-gray-900">{option.label}</span>
              {value === option.value && (
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}