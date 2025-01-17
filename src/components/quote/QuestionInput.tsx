import React from 'react';
import { Plus, Minus, CheckCircle } from 'lucide-react';
import { Question } from '../../types/quote';

interface QuestionInputProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
}

export function QuestionInput({ question, value, onChange }: QuestionInputProps) {
  switch (question.type) {
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

    case 'multiselect':
    case 'select':
    case 'radio':
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {question.options?.map(option => (
            <div
              key={option.value}
              onClick={() => {
                if (question.type === 'multiselect') {
                  const currentValues = value as string[] || [];
                  const newValues = currentValues.includes(option.value)
                    ? currentValues.filter(v => v !== option.value)
                    : [...currentValues, option.value];
                  onChange(newValues);
                } else {
                  onChange(option.value);
                }
              }}
              className="relative group cursor-pointer transform transition-all duration-200 hover:scale-102"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-25 transition duration-200" />
              <div className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                question.type === 'multiselect'
                  ? (value as string[])?.includes(option.value)
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 bg-white hover:border-emerald-200'
                  : value === option.value
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-gray-200 bg-white hover:border-emerald-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-gray-900">{option.label}</span>
                  {((question.type === 'multiselect' && (value as string[])?.includes(option.value)) ||
                    (question.type !== 'multiselect' && value === option.value)) && (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
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

    case 'text':
      return (
        <textarea
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
          placeholder={question.id === 'customAreaName' ? "Describe the area (e.g., gym, warehouse, event hall, etc.)" : "Type your answer here..."}
        />
      );

    default:
      return null;
  }
}