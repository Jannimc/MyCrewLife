import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

interface NavigationButtonsProps {
  onBack: () => void;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isAnswered: boolean;
}

export function NavigationButtons({
  onBack,
  onNext,
  isFirstStep,
  isLastStep,
  isAnswered
}: NavigationButtonsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 mt-4">
      <div className="flex justify-between">
        <button
          onClick={onBack}
          disabled={isFirstStep}
          className={`flex items-center px-4 py-2 rounded-lg font-medium ${
            isFirstStep
              ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
              : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
          }`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!isAnswered}
          className={`flex items-center px-4 py-2 rounded-lg font-medium ${
            isAnswered
              ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white hover:opacity-90 transition-opacity duration-200'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isLastStep ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Complete
            </>
          ) : (
            <>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}