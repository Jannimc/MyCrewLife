import React from 'react';
import { Clock, Calendar, Shield } from 'lucide-react';

export function Header() {
  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Get Your Personalized Quote
          </h1>
          <p className="text-base text-gray-600">
            Tell us about your space and preferences
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <div className="flex items-center space-x-1.5 bg-white rounded-lg px-3 py-1.5 shadow-sm">
              <Clock className="w-4 h-4 text-emerald-500" />
              <span className="text-sm text-gray-600">2 min to complete</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-white rounded-lg px-3 py-1.5 shadow-sm">
              <Calendar className="w-4 h-4 text-emerald-500" />
              <span className="text-sm text-gray-600">Book within 60 seconds</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-white rounded-lg px-3 py-1.5 shadow-sm">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span className="text-sm text-gray-600">Secure & confidential</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}