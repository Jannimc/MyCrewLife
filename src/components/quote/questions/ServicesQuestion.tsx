import React, { useState } from 'react';
import { CheckCircle2, CheckCircle } from 'lucide-react';
import { questions } from '../../../data/quoteQuestions';
import { useQuoteStore } from '../../../store/quoteStore';
import { useEffect } from 'react';

interface ServicesQuestionProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function ServicesQuestion({
  value,
  onChange
}: ServicesQuestionProps) {
  const propertyType = useQuoteStore(state => state.formData.propertyType);
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  useEffect(() => {
    console.log('Current property type:', propertyType);
  }, [propertyType]);

  // Get services from questions array
  const servicesQuestion = questions.find(q => q.id === 'services');
  const services = servicesQuestion?.options || [];

  // Filter services based on property type
  const filteredServices = propertyType ? services.filter(service => 
    service.showFor?.includes(propertyType)
  ) : [];

  console.log('Property Type:', propertyType);
  console.log('Filtered Services:', filteredServices);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredServices.map(option => {
        const Icon = option.icon;
        const isSelected = value?.includes(option.value);
        const isHovered = hoveredService === option.value;

        return (
          <div key={option.value} className="relative">
            <div
              onClick={() => {
                const currentValues = value || [];
                const newValues = currentValues.includes(option.value)
                  ? currentValues.filter(v => v !== option.value)
                  : [...currentValues, option.value];
                onChange(newValues);
              }}
              onMouseEnter={() => setHoveredService(option.value)}
              onMouseLeave={() => setHoveredService(null)}
              className="relative group cursor-pointer transform transition-all duration-300 hover:scale-102 h-[88px]"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-0 group-hover:opacity-25 transition duration-200" />
              <div className={`relative h-full bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 flex items-center ${
                isSelected ? 'border-2 border-emerald-500 bg-emerald-50' : 'border-2 border-gray-200 hover:border-emerald-200'
              }`}>
                <div className="flex items-center w-full">
                  <div className={`flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white group-hover:scale-110 transition-transform duration-200 flex-shrink-0 ${
                    isSelected ? 'scale-110' : ''
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="ml-4 flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 truncate">{option.label}</h3>
                  </div>
                  {value?.includes(option.value) && (
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 ml-2" />
                  )}
                </div>
              </div>
            </div>

            {/* Tooltip - Appears below on mobile, to the right on desktop */}
            {isHovered && (
              <div className="absolute z-20 w-full lg:w-72 lg:left-full lg:top-0 lg:ml-4 mt-2 lg:mt-0 transform transition-all duration-200 animate-fade-in">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-25"></div>
                  <div className="relative bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                    <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                    <ul className="space-y-2">
                      {option.features?.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
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