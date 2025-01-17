import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/quoteQuestions';
import { QuoteFormData } from '../types/quote';
import { Navigation } from './Navigation';
import { Header } from './quote/Header';
import { BackButton } from './quote/BackButton';
import { ProgressBar } from './quote/ProgressBar';
import { QuestionCard } from './quote/QuestionCard';
import { NavigationButtons } from './quote/NavigationButtons';
import { QuickFAQs } from './quote/QuickFAQs';

const initialFormData: QuoteFormData = {
  propertyType: '',
  squareFootage: '',
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

export function QuoteForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const filteredQuestions = questions.filter(question => {
    if (!question.conditional) return true;
    const { field, value } = question.conditional;
    if (Array.isArray(value)) {
      return value.includes(formData[field as keyof QuoteFormData]);
    }
    return formData[field as keyof QuoteFormData] === value;
  });

  const totalSteps = filteredQuestions.length;
  const currentQuestion = filteredQuestions[currentStep];
  const isLastStep = currentStep === totalSteps - 1;
  const isFirstStep = currentStep === 0;

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
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const isAnswered = () => {
    const value = formData[currentQuestion.id as keyof QuoteFormData];
    if (currentQuestion.validation?.required) {
      if (currentQuestion.type === 'counter') {
        return Object.values(value as Record<string, number>).some(count => count > 0);
      }
      if (currentQuestion.type === 'multiselect') {
        return (value as string[])?.length > 0;
      }
      if (currentQuestion.type === 'boolean') {
        return value !== undefined;
      }
      return Boolean(value);
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} onGetQuote={() => {}} />
      <Header />
      <BackButton />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            <QuestionCard
              question={currentQuestion}
              value={formData[currentQuestion.id as keyof QuoteFormData]}
              onChange={handleInputChange}
            />
            <NavigationButtons
              onBack={handleBack}
              onNext={handleNext}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              isAnswered={isAnswered()}
            />
          </div>
          
          <div className="lg:col-span-1">
            <QuickFAQs />
          </div>
        </div>
      </div>
    </div>
  );
}