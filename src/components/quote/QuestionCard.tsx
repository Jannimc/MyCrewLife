import React from 'react';
import { Question } from '../../types/quote';
import { QuestionInput } from './QuestionInput';

interface QuestionCardProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
  onAddressSelect?: (address: Address) => void;
}

export function QuestionCard({
  question,
  value,
  onChange,
  onAddressSelect
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-1 text-center">
        {question.title}
      </h2>
      {question.description && (
        <p className="text-gray-500 mb-6 text-sm text-center">{question.description}</p>
      )}

      <div>
        <QuestionInput
          question={question}
          value={value}
          onChange={onChange}
          onAddressSelect={onAddressSelect}
        />
      </div>
    </div>
  );
}