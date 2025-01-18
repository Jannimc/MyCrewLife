import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, CheckCircle } from 'lucide-react';
import { QuestionOption } from '../../types/quote';

interface OtherDropdownProps {
  option: QuestionOption;
  value: string;
  onChange: (value: string) => void;
  customValue: string;
  onCustomValueChange: (value: string) => void;
}

export function OtherDropdown({
  option,
  value,
  onChange,
  customValue,
  onCustomValueChange
}: OtherDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSelectedLabel = (): string => {
    if (value?.startsWith('custom:')) {
      return 'Custom';
    }
    
    const selectedOption = option.subOptions?.find(sub => sub.value === value);
    return selectedOption?.label || option.label;
  };

  const isSelected = value?.startsWith('custom:') || option.subOptions?.some(sub => value === sub.value);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative group cursor-pointer transform transition-all duration-200 hover:scale-102"
      >
        <div className={`absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-25 transition duration-200 ${
          isSelected ? 'opacity-25' : ''
        }`} />
        <div className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
          isSelected
            ? 'border-emerald-500 bg-emerald-50'
            : 'border-gray-200 bg-white hover:border-emerald-200'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-base font-medium text-gray-900">{getSelectedLabel()}</span>
            <div className="flex items-center space-x-2">
              {isSelected && (
                <CheckCircle className="w-5 h-5 text-emerald-500" />
              )}
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                isOpen ? 'transform rotate-180' : ''
              }`} />
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-25"></div>
            <div className="relative bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
              <div className="py-1">
                {option.subOptions?.map(subOption => (
                  <div
                    key={subOption.value}
                    onClick={() => {
                      if (subOption.value === 'custom') {
                        onCustomValueChange('');
                        onChange('custom:');
                      } else {
                        onChange(subOption.value);
                        onCustomValueChange('');
                      }
                      setIsOpen(false);
                    }}
                    className={`px-4 py-3 cursor-pointer transition-all duration-200 ${
                      (value === subOption.value || (subOption.value === 'custom' && value?.startsWith('custom:')))
                        ? 'bg-emerald-50 text-emerald-900'
                        : 'hover:bg-gray-50 text-gray-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-medium">{subOption.label}</span>
                      {(value === subOption.value || (subOption.value === 'custom' && value?.startsWith('custom:'))) && (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {value?.startsWith('custom:') && (
        <div className="lg:absolute lg:left-full lg:ml-4 lg:top-0 w-full lg:w-full mt-4 lg:mt-0">
          <input
            type="text"
            value={customValue}
            onChange={(e) => {
              const newValue = e.target.value;
              onCustomValueChange(newValue);
              onChange('custom:' + newValue);
            }}
            placeholder="Type your custom selection..."
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
            style={{ height: '56px' }}
          />
        </div>
      )}
    </div>
  );
}