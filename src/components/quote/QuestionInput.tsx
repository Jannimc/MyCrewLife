import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Question, QuestionOption } from '../../types/quote';
import { OtherDropdown } from './OtherDropdown';
import { PostcodeQuestion } from './questions/PostcodeQuestion';
import { PropertyTypeQuestion } from './questions/PropertyTypeQuestion';
import { ResidentialAreasQuestion } from './questions/ResidentialAreasQuestion';
import { CommercialAreasQuestion } from './questions/CommercialAreasQuestion';
import { OtherAreasQuestion } from './questions/OtherAreasQuestion';
import { CustomAreaQuestion } from './questions/CustomAreaQuestion';
import { ServicesQuestion } from './questions/ServicesQuestion';
import { ExtraServicesQuestion } from './questions/ExtraServicesQuestion';
import { PreferredDayQuestion } from './questions/PreferredDayQuestion';
import { PreferredTimeQuestion } from './questions/PreferredTimeQuestion';
import { FrequencyQuestion } from './questions/FrequencyQuestion';

interface QuestionInputProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
  onAddressSelect?: (address: Address) => void;
}

export function QuestionInput({ question, value, onChange, onAddressSelect }: QuestionInputProps) {
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
        return <PostcodeQuestion value={value as string} onChange={onChange} onAddressSelect={onAddressSelect} />;
      }

      if (question.id === 'customAreaName') {
        return <CustomAreaQuestion value={value as string} onChange={onChange} />;
      }

      return (
        <textarea
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
          placeholder="Type your answer here..."
        />
      );

    case 'select':
    case 'radio':
      if (question.id === 'frequency') {
        return <FrequencyQuestion value={value as string} onChange={onChange} />;
      }
      if (question.id === 'preferredDay') {
        return <PreferredDayQuestion value={value as string} onChange={onChange} />;
      }
      if (question.id === 'preferredTime') {
        return <PreferredTimeQuestion value={value as string} onChange={onChange} />;
      }
      if (question.id === 'propertyType') {
        return (
          <PropertyTypeQuestion
            value={value as string}
            onChange={onChange}
            customValue={customValues['other'] || ''}
            onCustomValueChange={(newValue) => handleCustomValueChange('other', newValue)}
          />
        );
      }
      // Handle other select/radio questions here...
      return null;

    case 'multiselect':
      if (question.id === 'services') {
        return <ServicesQuestion value={value as string[]} onChange={onChange} />;
      }
      if (question.id === 'otherAreas') {
        return <OtherAreasQuestion value={value as string[]} onChange={onChange} />;
      }
      if (question.id === 'extraServices') {
        return <ExtraServicesQuestion value={value as string[]} onChange={onChange} />;
      }
      // Handle other multiselect questions here...
      return null;

    case 'counter':
      if (question.id === 'residentialAreas') {
        return <ResidentialAreasQuestion value={value as Record<string, number>} onChange={onChange} />;
      }
      if (question.id === 'commercialAreas') {
        return <CommercialAreasQuestion value={value as Record<string, number>} onChange={onChange} />;
      }
      return null;

    case 'boolean':
      return (
        <div className="flex justify-center gap-4 max-w-md mx-auto">
          {[
            { value: true, label: 'Yes' },
            { value: false, label: 'No' }
          ].map(option => (
            <div
              key={String(option.value)}
              onClick={() => onChange(option.value)}
              className="relative group cursor-pointer transform transition-all duration-200 hover:scale-102 flex-1"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-25 transition duration-200" />
              <div className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                value === option.value
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 bg-white hover:border-emerald-200'
              }`}>
                <div className="flex items-center justify-center space-x-2">
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