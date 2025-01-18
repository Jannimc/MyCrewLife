import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface CommercialAreasQuestionProps {
  value: Record<string, number>;
  onChange: (value: Record<string, number>) => void;
}

export function CommercialAreasQuestion({
  value,
  onChange
}: CommercialAreasQuestionProps) {
  const options = [
    { value: 'offices', label: 'Offices/Cubicles' },
    { value: 'meetingRooms', label: 'Meeting Rooms' },
    { value: 'breakRoom', label: 'Break Room/Kitchen' },
    { value: 'reception', label: 'Reception Area' },
    { value: 'storage', label: 'Storage/Stockroom' },
    { value: 'bathrooms', label: 'Bathrooms' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {options.map(option => {
        const count = value[option.value] || 0;
        
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
}