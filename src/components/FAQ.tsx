import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { faqs } from '../data/faqs';

interface FAQProps {
  activeFaq: number | null;
  setActiveFaq: (index: number | null) => void;
}

export function FAQ({ activeFaq, setActiveFaq }: FAQProps) {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-b from-white via-emerald-100 to-white py-16 sm:py-24" id="faq">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMxMGI5ODEiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <span className="text-emerald-600 font-medium mb-4 block">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-500">Everything you need to know about our cleaning services</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-25 transition duration-200" />
              <div className="relative bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/50 hover:border-emerald-200/50 transition-colors duration-200">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-medium text-gray-900 text-left pr-4">{faq.question}</span>
                  {activeFaq === index ? (
                    <Minus className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  )}
                </button>
                {activeFaq === index && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-5 animate-fade-in">
                    <div className="h-px bg-gradient-to-r from-emerald-500/40 via-emerald-500/20 to-transparent mb-4" />
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button 
            onClick={() => navigate('/support')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-emerald-500/25"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}