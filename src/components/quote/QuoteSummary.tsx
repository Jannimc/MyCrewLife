import React from 'react';
import { Edit2, Check, ArrowRight } from 'lucide-react';
import { QuoteFormData } from '../../types/quote';
import { CostSummary } from './CostSummary';

interface QuoteSummaryProps {
  formData: QuoteFormData;
  onEdit: (questionId: string) => void;
  onContinue: () => void;
}

export function QuoteSummary({ formData, onEdit, onContinue }: QuoteSummaryProps) {
  // Helper function to format values for display
  const formatValue = (id: string, value: any): string => {
    if (value === undefined || value === null || value === '') {
      return 'Not specified';
    }

    if (id === 'services') {
      return (value as string[]).map(service => {
        return service.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      }).join(', ');
    }

    if (id === 'extraServices') {
      if ((value as string[]).length === 0) return 'None';
      return (value as string[]).map(service => {
        return service.charAt(0).toUpperCase() + service.slice(1);
      }).join(', ');
    }

    if (id === 'otherAreas') {
      if ((value as string[]).length === 0) return 'None';
      return (value as string[]).map(area => {
        return area.charAt(0).toUpperCase() + area.slice(1);
      }).join(', ');
    }

    if (id === 'residentialAreas' || id === 'commercialAreas') {
      const areas = value as Record<string, number>;
      if (Object.keys(areas).length === 0) return 'None';
      
      return Object.entries(areas)
        .filter(([_, count]) => count > 0)
        .map(([area, count]) => {
          const formattedArea = area
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
          return `${formattedArea}: ${count}`;
        })
        .join(', ');
    }

    if (id === 'hasPets') {
      return value ? 'Yes' : 'No';
    }

    if (id === 'frequency') {
      switch (value) {
        case 'oneTime': return 'One-time cleaning';
        case 'weekly': return 'Weekly';
        case 'biweekly': return 'Bi-weekly';
        case 'monthly': return 'Monthly';
        default: return value;
      }
    }

    if (id === 'preferredTime') {
      switch (value) {
        case 'morning': return '8:00 AM - 12:00 PM';
        case 'afternoon': return '12:00 PM - 4:00 PM';
        case 'evening': return '4:00 PM - 8:00 PM';
        default: return value;
      }
    }

    if (id === 'preferredDay') {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }

    if (id === 'propertyType') {
      if (value.startsWith('custom:')) {
        return `Custom: ${value.substring(7)}`;
      }
      return value.charAt(0).toUpperCase() + value.slice(1);
    }

    return value.toString();
  };

  // Group questions by category for better organization
  const sections = [
    {
      title: 'Service Details',
      questions: [
        { id: 'postcode', label: 'Postcode' },
        { id: 'services', label: 'Selected Services' },
        { id: 'propertyType', label: 'Property Type' },
      ]
    },
    {
      title: 'Areas to Clean',
      questions: [
        { id: 'residentialAreas', label: 'Residential Areas', condition: () => formData.propertyType === 'house' || formData.propertyType === 'apartment' },
        { id: 'commercialAreas', label: 'Commercial Areas', condition: () => formData.propertyType === 'office' || formData.propertyType === 'retail' },
        { id: 'otherAreas', label: 'Other Areas', condition: () => formData.propertyType === 'other' || formData.propertyType?.startsWith('custom:') },
        { id: 'customAreaName', label: 'Custom Area Description', condition: () => formData.propertyType === 'other' || formData.propertyType?.startsWith('custom:') },
        { id: 'extraServices', label: 'Extra Services' },
      ]
    },
    {
      title: 'Schedule',
      questions: [
        { id: 'frequency', label: 'Cleaning Frequency' },
        { id: 'preferredDay', label: 'Preferred Day' },
        { id: 'preferredTime', label: 'Preferred Time' },
      ]
    },
    {
      title: 'Additional Information',
      questions: [
        { id: 'hasPets', label: 'Has Pets' },
        { id: 'petDetails', label: 'Pet Details', condition: () => formData.hasPets === true },
        { id: 'accessInstructions', label: 'Access Instructions' },
        { id: 'specialRequirements', label: 'Special Requirements' },
      ]
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">Quote Summary</h2>
      <p className="text-gray-500 mb-6 text-sm text-center">
        Please review your selections below. You can edit any section if needed.
      </p>

      <div className="space-y-8">
        {sections.map((section, sectionIndex) => {
          const visibleQuestions = section.questions.filter(q => !q.condition || q.condition());
          
          if (visibleQuestions.length === 0) return null;
          
          return (
            <div key={sectionIndex} className="border border-gray-100 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>
              <div className="space-y-3">
                {visibleQuestions.map((question) => (
                  <div key={question.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-700">{question.label}</p>
                      <p className="text-base text-gray-900">
                        {formatValue(question.id, formData[question.id as keyof QuoteFormData])}
                      </p>
                    </div>
                    <button
                      onClick={() => onEdit(question.id)}
                      className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors duration-200"
                      aria-label={`Edit ${question.label}`}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-emerald-600">
            <Check className="w-5 h-5 mr-2" />
            <span className="font-medium">All information looks correct</span>
          </div>
          <button
            onClick={onContinue}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity duration-200"
          >
            Continue to Checkout
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}