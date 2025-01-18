import React, { useState, useRef } from 'react';
import { questions } from '../../data/quoteQuestions';
import { QuoteFormData } from '../../types/quote';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import { NavigationButtons } from './NavigationButtons';

interface QuoteFormProps {
  initialFormData: QuoteFormData;
}

export function QuoteForm({ initialFormData }: QuoteFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData);
  const [postcodeValid, setPostcodeValid] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

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

    // Reset postcode validation when postcode changes
    if (currentQuestion.id === 'postcode') {
      setPostcodeValid(false);
      validatePostcode(value);
    }
  };

  const validatePostcode = async (postcode: string) => {
    try {
      const response = await fetch(`https://api.postcodes.io/postcodes/${postcode}/validate`);
      const data = await response.json();
      setPostcodeValid(data.result);
    } catch (err) {
      setPostcodeValid(false);
    }
  };

  const scrollToProgress = () => {
    if (progressBarRef.current) {
      const header = document.querySelector('header');
      const headerHeight = header?.offsetHeight || 0;
      const yOffset = -headerHeight - 24; // Add extra padding
      const y = progressBarRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      handleSubmit();
    } else {
      setCurrentStep(prev => prev + 1);
      // Scroll to progress bar after state update
      setTimeout(scrollToProgress, 100);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
      // Scroll to progress bar after state update
      setTimeout(scrollToProgress, 100);
    }
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  const isAnswered = () => {
    const value = formData[currentQuestion.id as keyof QuoteFormData];
    
    if (currentQuestion.validation?.required) {
      // Special handling for postcode validation
      if (currentQuestion.id === 'postcode') {
        return postcodeValid;
      }

      // Special handling for property type with custom option
      if (currentQuestion.id === 'propertyType' && value?.startsWith('custom:')) {
        return value.length > 7; // 'custom:' is 7 characters, so we need more than that
      }

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
    <>
      <div ref={progressBarRef} className="mb-8">
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </div>
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
    </>
  );
}