import React, { useState } from 'react';
import { Plus, Minus, CheckCircle, Info, X, MapPin, Search } from 'lucide-react';
import { Question, QuestionOption } from '../../types/quote';
import { OtherDropdown } from './OtherDropdown';

interface QuestionInputProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
}

export function QuestionInput({ question, value, onChange }: QuestionInputProps) {
  const [customValues, setCustomValues] = useState<Record<string, string>>({});
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const handleCustomValueChange = (optionValue: string, newValue: string) => {
    setCustomValues(prev => ({
      ...prev,
      [optionValue]: newValue
    }));
  };

  switch (question.type) {
    case 'text':
      if (question.id === 'postcode') {
        return (
          <div className="max-w-xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-200" />
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={value as string}
                  onChange={(e) => onChange(e.target.value.toUpperCase())}
                  className="block w-full pl-11 pr-20 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg font-medium placeholder:text-gray-400"
                  placeholder="e.g. SW1A 1AA"
                  maxLength={8}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <Search className="h-5 w-5 text-emerald-500" />
                </div>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-500 text-center">
              Enter your postcode to find available cleaners in your area
            </p>
          </div>
        );
      }

      return (
        <textarea
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
          placeholder={question.id === 'customAreaName' ? "Describe the area (e.g., gym, warehouse, event hall, etc.)" : "Type your answer here..."}
        />
      );

    case 'select':
    case 'radio':
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {question.options?.map(option => (
            option.subOptions ? (
              <OtherDropdown
                key={option.value}
                option={option}
                value={value}
                onChange={onChange}
                customValue={customValues[option.value] || ''}
                onCustomValueChange={(newValue) => handleCustomValueChange(option.value, newValue)}
              />
            ) : (
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
            )
          ))}
        </div>
      );

    case 'multiselect':
      if (question.id === 'services') {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {question.options?.map(option => {
              const Icon = (option as any).icon;
              const isSelected = (value as string[])?.includes(option.value);
              const isHovered = hoveredService === option.value;

              return (
                <div
                  key={option.value}
                  onClick={() => {
                    const currentValues = value as string[] || [];
                    const newValues = currentValues.includes(option.value)
                      ? currentValues.filter(v => v !== option.value)
                      : [...currentValues, option.value];
                    onChange(newValues);
                  }}
                  onMouseEnter={() => setHoveredService(option.value)}
                  onMouseLeave={() => setHoveredService(null)}
                  className="relative group cursor-pointer"
                >
                  {/* Main Card */}
                  <div className="relative transform transition-all duration-200 hover:scale-102 h-24">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-25 transition duration-200" />
                    <div className={`relative h-full p-6 rounded-xl border-2 transition-all duration-200 flex items-center ${
                      isSelected ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 bg-white hover:border-emerald-200'
                    }`}>
                      <div className="flex items-center w-full">
                        {Icon && (
                          <div className={`flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white group-hover:scale-110 transition-transform duration-200 flex-shrink-0 ${
                            isSelected ? 'scale-110' : ''
                          }`}>
                            <Icon className="h-6 w-6" />
                          </div>
                        )}
                        <div className="ml-4 flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-900 truncate">{option.label}</h3>
                        </div>
                        {isSelected && (
                          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 ml-2" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover Details */}
                  {isHovered && (
                    <div className="absolute z-20 left-full ml-4 top-0 w-72 transform transition-all duration-200 animate-fade-in">
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-25"></div>
                        <div className="relative bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                          <p className="text-gray-600 text-sm mb-4">{(option as any).description}</p>
                          {(option as any).features && (
                            <ul className="space-y-2">
                              {(option as any).features.map((feature: string, index: number) => (
                                <li key={index} className="text-sm text-gray-600 flex items-center">
                                  <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      }

      // Regular multiselect for other questions
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {question.options?.map(option => (
            <div
              key={option.value}
              onClick={() => {
                const currentValues = value as string[] || [];
                const newValues = currentValues.includes(option.value)
                  ? currentValues.filter(v => v !== option.value)
                  : [...currentValues, option.value];
                onChange(newValues);
              }}
              className="relative group cursor-pointer transform transition-all duration-200 hover:scale-102"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-25 transition duration-200" />
              <div className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                (value as string[])?.includes(option.value)
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 bg-white hover:border-emerald-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-gray-900">{option.label}</span>
                  {(value as string[])?.includes(option.value) && (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      );

    case 'counter':
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {question.options?.map(option => {
            const count = (value as Record<string, number>)?.[option.value] || 0;
            
            return (
              <div key={option.value} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-25 transition duration-200" />
                <div className="relative bg-white p-4 rounded-xl border-2 border-gray-200 hover:border-emerald-200 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-900">{option.label}</span>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => {
                          if (count > 0) {
                            onChange({
                              ...value,
                              [option.value]: count - 1
                            });
                          }
                        }}
                        className={`p-1.5 rounded-lg transition-all duration-200 ${
                          count === 0
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-emerald-600 hover:bg-emerald-50'
                        }`}
                        disabled={count === 0}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center text-base font-semibold text-gray-900">
                        {count}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          onChange({
                            ...value,
                            [option.value]: count + 1
                          });
                        }}
                        className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-all duration-200"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );

    case 'boolean':
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { value: true, label: 'Yes' },
            { value: false, label: 'No' }
          ].map(option => (
            <div
              key={String(option.value)}
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

    default:
      return null;
  }
}