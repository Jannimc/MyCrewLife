import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { QuoteForm } from '../components/quote/QuoteForm';
import { Header as QuoteHeader } from '../components/quote/Header';
import { QuickFAQs } from '../components/quote/QuickFAQs';
import { QuoteFormData } from '../types/quote';

const initialFormData: QuoteFormData = {
  postcode: '',
  propertyType: '',
  residentialAreas: {},
  commercialAreas: {},
  otherAreas: [],
  customAreaName: '',
  extraServices: [],
  frequency: '',
  preferredDay: '',
  preferredTime: '',
  specialRequirements: '',
  hasPets: undefined,
  petDetails: '',
  accessInstructions: ''
};

export function Quote() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="absolute mt-4 flex items-center text-gray-600 hover:text-emerald-600 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back</span>
          </button>
        </div>

        <QuoteHeader />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <QuoteForm initialFormData={initialFormData} />
            </div>
            <div className="lg:col-span-1">
              <QuickFAQs />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}