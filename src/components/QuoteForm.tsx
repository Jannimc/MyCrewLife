import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Calendar, Shield } from 'lucide-react';
import { questions } from '../data/quoteQuestions';
import { QuoteFormData } from '../types/quote';
import { Navigation } from './Navigation';

const initialFormData: QuoteFormData = {
  propertyType: '',
  squareFootage: '',
  bedrooms: '',
  bathrooms: '',
  areas: [],
  frequency: '',
  preferredDay: '',
  preferredTime: '',
  specialRequirements: '',
  hasPets: false,
  petDetails: '',
  accessInstructions: ''
};

export function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredQuestions = questions.filter(question => {
    if (!question.conditional) return true;
    const { field, value } = question.conditional;
    return formData[field as keyof QuoteFormData] === value;
  });

  const totalSteps = filteredQuestions.length;
  const currentQuestion = filteredQuestions[currentStep];
  const isLastStep = currentStep === totalSteps - 1;

  const handleInputChange = (value: any) => {
    setFormData(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (isLastStep) {
      handleSubmit();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    // Navigate to summary page
  };

  const renderInput = () => {
    switch (currentQuestion.type) {
      case 'select':
        return (
          <select
            value={formData[currentQuestion.id as keyof QuoteFormData] as string}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Select an option</option>
            {currentQuestion.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'number':
        return (
          <input
            type="number"
            value={formData[currentQuestion.id as keyof QuoteFormData] as string}
            onChange={(e) => handleInputChange(e.target.value)}
            min={currentQuestion.validation?.min}
            max={currentQuestion.validation?.max}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        );

      case 'multiselect':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map(option => (
              <label key={option.value} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={(formData[currentQuestion.id as keyof QuoteFormData] as string[])?.includes(option.value)}
                  onChange={(e) => {
                    const currentValues = formData[currentQuestion.id as keyof QuoteFormData] as string[] || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option.value]
                      : currentValues.filter(v => v !== option.value);
                    handleInputChange(newValues);
                  }}
                  className="w-5 h-5 text-emerald-500 rounded focus:ring-emerald-500"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map(option => (
              <label key={option.value} className="flex items-center space-x-3">
                <input
                  type="radio"
                  value={option.value}
                  checked={formData[currentQuestion.id as keyof QuoteFormData] === option.value}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="w-5 h-5 text-emerald-500 focus:ring-emerald-500"
                />
                <span className="text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'boolean':
        return (
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={formData[currentQuestion.id as keyof QuoteFormData] === true}
                onChange={() => handleInputChange(true)}
                className="w-5 h-5 text-emerald-500 focus:ring-emerald-500"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={formData[currentQuestion.id as keyof QuoteFormData] === false}
                onChange={() => handleInputChange(false)}
                className="w-5 h-5 text-emerald-500 focus:ring-emerald-500"
              />
              <span>No</span>
            </label>
          </div>
        );

      case 'text':
        return (
          <textarea
            value={formData[currentQuestion.id as keyof QuoteFormData] as string}
            onChange={(e) => handleInputChange(e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} onGetQuote={() => {}} />
      
      {/* Header Section */}
      <div className="bg-gradient-to-b from-emerald-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Get Your Personalized Quote
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Tell us about your space and preferences, and we'll create a custom cleaning plan just for you.
            </p>
            
            {/* Feature badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-center space-x-2 bg-white rounded-lg px-4 py-3 shadow-sm">
                <Clock className="w-5 h-5 text-emerald-500" />
                <span className="text-sm text-gray-600">2 min to complete</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-white rounded-lg px-4 py-3 shadow-sm">
                <Calendar className="w-5 h-5 text-emerald-500" />
                <span className="text-sm text-gray-600">Book within 60 seconds</span>
              </div>
              <div className="flex items-center justify-center space-x-2 bg-white rounded-lg px-4 py-3 shadow-sm">
                <Shield className="w-5 h-5 text-emerald-500" />
                <span className="text-sm text-gray-600">Secure & confidential</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              Question {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-gray-500">
              {Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {currentQuestion.title}
          </h2>
          {currentQuestion.description && (
            <p className="text-gray-500 mb-6">{currentQuestion.description}</p>
          )}

          <div className="mb-8">{renderInput()}</div>

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center px-6 py-3 rounded-lg font-medium ${
                currentStep === 0
                  ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                  : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <button
              onClick={handleNext}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity duration-200"
            >
              {isLastStep ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Complete
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}