import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqItems = [
  {
    question: "How do I book a cleaning service?",
    answer: "You can book a cleaning service by clicking the 'Book Now' button and following our simple booking process. Enter your postcode, select your preferred service and time, and we'll match you with a trusted cleaner."
  },
  {
    question: "What's included in a standard clean?",
    answer: "A standard clean includes dusting, vacuuming, mopping, bathroom cleaning, kitchen cleaning, and making beds. We focus on high-traffic areas and ensure all visible surfaces are cleaned."
  },
  {
    question: "How do you screen your cleaners?",
    answer: "All our cleaners undergo thorough background checks, in-person interviews, and reference checks. They must also complete our comprehensive training program before joining MyCrew."
  },
  {
    question: "What if I need to reschedule?",
    answer: "You can reschedule your booking up to 24 hours before the scheduled time through your account dashboard. There's no fee for rescheduling with adequate notice."
  },
  {
    question: "Are your services insured?",
    answer: "Yes, all our cleaning services are fully insured. We provide coverage for any accidental damage that may occur during the cleaning process."
  }
];

export function SupportFAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>

      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-25 transition duration-200" />
            <div className="relative bg-white rounded-xl border border-gray-200 hover:border-emerald-200 transition-colors duration-200">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full px-4 py-3 flex items-center justify-between focus:outline-none"
              >
                <span className="text-base font-medium text-gray-900">{item.question}</span>
                {activeIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-emerald-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-emerald-500" />
                )}
              </button>
              
              {activeIndex === index && (
                <div className="px-4 pb-4 animate-fade-in">
                  <div className="h-px bg-gradient-to-r from-emerald-500/40 via-emerald-500/20 to-transparent mb-3" />
                  <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}