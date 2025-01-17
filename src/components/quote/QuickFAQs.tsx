import React from 'react';
import { HelpCircle } from 'lucide-react';

const quickFaqs = [
  {
    question: "How long does cleaning take?",
    answer: "A standard clean typically takes 2-3 hours for a 2-bedroom home."
  },
  {
    question: "Can I trust your cleaners?",
    answer: "All cleaners undergo thorough background checks and are fully insured."
  },
  {
    question: "What if I need to reschedule?",
    answer: "You can reschedule up to 24 hours before your appointment at no cost."
  }
];

export function QuickFAQs() {
  return (
    <div className="sticky top-24">
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <div className="flex items-center space-x-2 mb-4">
          <HelpCircle className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-semibold text-gray-900">Quick FAQs</h3>
        </div>
        <div className="space-y-4">
          {quickFaqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
              <h4 className="text-sm font-medium text-gray-900 mb-1">{faq.question}</h4>
              <p className="text-sm text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}