import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { CostSummary } from '../quote/CostSummary';
import { QuoteFormData } from '../../types/quote';

interface BookingSummaryProps {
  quoteData: QuoteFormData;
  timeSlot?: string;
}

export function BookingSummary({ quoteData, timeSlot }: BookingSummaryProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>
      
      <div className="space-y-6">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-emerald-500 mr-2" />
          <span>
            {quoteData.preferredDay?.charAt(0).toUpperCase() + quoteData.preferredDay?.slice(1) || 'Flexible'}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 text-emerald-500 mr-2" />
          <span>
            {timeSlot || 'Flexible'}
          </span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-emerald-500 mr-2" />
          <span>{quoteData.postcode}</span>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-100">
        <CostSummary formData={quoteData} />
      </div>
    </div>
  );
}