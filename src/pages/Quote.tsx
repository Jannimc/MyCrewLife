import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { QuoteForm } from '../components/quote/QuoteForm';
import { Header as QuoteHeader } from '../components/quote/Header';
import { CostSummary } from '../components/quote/CostSummary';
import { QuickFAQs } from '../components/quote/QuickFAQs';
import { QuoteFormData } from '../types/quote';

export function Quote() {
  const navigate = useNavigate();
  const location = useLocation();
  const postcode = location.state?.postcode || '';

  const initialFormData: QuoteFormData = {
    postcode,
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
    accessInstructions: '',
    services: []
  };

  const [formData, setFormData] = React.useState<QuoteFormData>(initialFormData);

  const handleFormUpdate = (newData: QuoteFormData) => {
    setFormData(newData);
  };

  return (
    <MainLayout>
      <div className="relative">
        <div className="absolute top-6 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Back</span>
            </button>
          </div>
        </div>

        <QuoteHeader />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <QuoteForm 
                initialFormData={initialFormData} 
                onUpdate={handleFormUpdate}
              />
            </div>
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <div className="sticky top-24">
                  <CostSummary formData={formData} />
                  <div className="mt-6">
                    <QuickFAQs />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}