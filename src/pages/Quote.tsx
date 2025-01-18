import React from 'react';
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
  return (
    <MainLayout showBackButton>
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
    </MainLayout>
  );
}