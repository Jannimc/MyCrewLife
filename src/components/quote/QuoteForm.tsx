import React, { useState } from 'react';
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
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
  };

  const isAnswered = () => {
    const value = formData[currentQuestion.id as keyof QuoteFormData];
    
    if (currentQuestion.validation?.required) {
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
    </>
  );
}