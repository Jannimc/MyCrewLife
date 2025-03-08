import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { QuoteForm } from '../components/quote/QuoteForm';
import { Header as QuoteHeader } from '../components/quote/Header';
import { CostSummary } from '../components/quote/CostSummary';
import { QuickFAQs } from '../components/quote/QuickFAQs';
import { QuoteFormData } from '../types/quote';

/**
 * Quote page component
 * Handles the quote form and related components
 */
export function Quote() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data from location state
  const postcode = location.state?.postcode || '';
  const initialShowSummary = location.state?.showSummary || false;
  const stateQuoteData = location.state?.quoteData;

  // Default form data
  const defaultFormData: QuoteFormData = {
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

  // State for form data and summary view
  const [formData, setFormData] = useState<QuoteFormData>(stateQuoteData || defaultFormData);
  const [showSummary, setShowSummary] = useState(initialShowSummary);

  // Set showSummary based on location state
  useEffect(() => {
    if (initialShowSummary) {
      setShowSummary(true);
    }
  }, [initialShowSummary]);

  // Update form data from child component
  const handleFormUpdate = (newData: QuoteFormData) => {
    setFormData(newData);
  };

  return (
    <MainLayout>
      <div className="relative">
        {/* Back button */}
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

        {/* Quote header */}
        <QuoteHeader />
        
        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quote form */}
            <div className="lg:col-span-2">
              <QuoteForm 
                initialFormData={formData} 
                onUpdate={handleFormUpdate}
                initialShowSummary={showSummary}
              />
            </div>
            
            {/* Sidebar */}
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