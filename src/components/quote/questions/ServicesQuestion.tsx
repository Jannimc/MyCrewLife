import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Home, Sparkles, Brush, Key, Box, Building, SprayCan, Hammer, Store } from 'lucide-react';

interface ServicesQuestionProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function ServicesQuestion({
  value,
  onChange
}: ServicesQuestionProps) {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const options = [
    {
      value: 'regular_home',
      label: 'Regular Home Cleaning',
      description: 'Weekly or bi-weekly cleaning to keep your home spotless',
      features: ['Dusting & wiping', 'Vacuuming & mopping', 'Kitchen & bathroom cleaning', 'Bed making'],
      icon: Home
    },
    {
      value: 'deep_cleaning',
      label: 'Deep Cleaning',
      description: 'Thorough cleaning of every nook and cranny',
      features: ['Inside cabinets', 'Behind appliances', 'Window cleaning', 'Deep carpet cleaning'],
      icon: Sparkles
    },
    {
      value: 'spring_cleaning',
      label: 'Spring Cleaning',
      description: 'Annual deep clean to refresh your space',
      features: ['Seasonal decluttering', 'Deep sanitization', 'Window washing', 'Furniture cleaning'],
      icon: Brush
    },
    {
      value: 'end_of_tenancy',
      label: 'End of Tenancy',
      description: 'Get your deposit back with our thorough cleaning',
      features: ['Full property cleaning', 'Oven & appliance cleaning', 'Carpet deep clean', 'Window cleaning'],
      icon: Key
    },
    {
      value: 'move_in_out',
      label: 'Move In/Out Cleaning',
      description: 'Start fresh in your new home',
      features: ['Pre-move cleaning', 'Post-move cleaning', 'Cabinet sanitization', 'Floor restoration'],
      icon: Box
    },
    {
      value: 'post_renovation',
      label: 'Post-Renovation Cleaning',
      description: 'Professional cleanup after construction or renovation',
      features: ['Construction debris removal', 'Dust & particle cleaning', 'Surface sanitization', 'Paint spot removal'],
      icon: Hammer
    },
    {
      value: 'office_cleaning',
      label: 'Office Cleaning',
      description: 'Professional cleaning services for workspaces',
      features: ['Workspace sanitization', 'Kitchen & break rooms', 'Meeting rooms', 'Reception areas'],
      icon: Building
    },
    {
      value: 'disinfection',
      label: 'Disinfection Service',
      description: 'Sanitization and disinfection of high-touch areas',
      features: ['Surface disinfection', 'Air purification', 'Touch point cleaning', 'EPA-approved products'],
      icon: SprayCan
    },
    {
      value: 'retail_cleaning',
      label: 'Retail Store Cleaning',
      description: 'Comprehensive cleaning for retail environments',
      features: ['Floor maintenance', 'Window cleaning', 'Display area dusting', 'High-touch sanitization'],
      icon: Store
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {options.map(option => {
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
                  {isSelected && (
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
                      {option.features.map((feature, index) => (
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