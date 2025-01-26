import React, { useState, useRef, useEffect } from 'react';
import { questions } from '../../data/quoteQuestions';
import { QuoteFormData } from '../../types/quote';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import { NavigationButtons } from './NavigationButtons';
import { AlertCircle } from 'lucide-react';

interface QuoteFormProps {
  initialFormData: QuoteFormData;
  onUpdate: (formData: QuoteFormData) => void;
}

export function QuoteForm({ initialFormData, onUpdate }: QuoteFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData);
  const [postcodeValid, setPostcodeValid] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Only run on mount if there's an initial postcode
    if (isInitialMount.current && initialFormData.postcode) {
      validatePostcode(initialFormData.postcode);
      isInitialMount.current = false;
    }
  }, [initialFormData.postcode]);

  useEffect(() => {
    // Update parent component with form data changes
    onUpdate(formData);
  }, [formData, onUpdate]);

  const validatePostcode = async (postcode: string) => {
    setIsValidating(true);
    try {
      const response = await fetch(`https://api.postcodes.io/postcodes/${postcode}`);
      const data = await response.json();
      
      if (data.status === 200) {
        // Check if the postcode is in London
        const isLondon = data.result.region === "London" || 
                        data.result.admin_district?.includes("London") ||
                        data.result.nhs_ha?.includes("London");
        
        if (isLondon) {
          setPostcodeValid(true);
          setError(null);
          setCurrentStep(prev => prev + 1);
        } else {
          setPostcodeValid(false);
          setError("Sorry, we currently only operate in London. We're expanding to other areas soon!");
        }
      } else {
        setPostcodeValid(false);
        setError('Please enter a valid UK postcode');
      }
    } catch (err) {
      setPostcodeValid(false);
      setError('Unable to verify postcode. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

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

    // Only reset error when changing postcode
    if (currentQuestion.id === 'postcode') {
      setError(null);
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

  const handleNext = async () => {
    // For postcode question, validate before proceeding
    if (currentQuestion.id === 'postcode') {
      await validatePostcode(formData.postcode);
      return;
    }

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
      // For postcode, just check if it's not empty
      if (currentQuestion.id === 'postcode') {
        return Boolean(value) && !isValidating;
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
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}
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