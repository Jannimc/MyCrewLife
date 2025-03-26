import React from 'react';
import { Calendar, Briefcase, Shield, Star } from 'lucide-react';

export function QuickInfo() {
  return (
    <div className="sticky top-24 space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Join MyCrew?</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 p-2 bg-emerald-50 rounded-lg">
              <Calendar className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-900">Flexible Schedule</h4>
              <p className="text-sm text-gray-500">Choose your own hours and work when it suits you</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 p-2 bg-emerald-50 rounded-lg">
              <Briefcase className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-900">Competitive Pay</h4>
              <p className="text-sm text-gray-500">Earn up to £20/hour with bonuses and tips</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 p-2 bg-emerald-50 rounded-lg">
              <Shield className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-900">Full Support</h4>
              <p className="text-sm text-gray-500">Training, equipment, and insurance provided</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-emerald-600 to-teal-500 rounded-2xl shadow-sm p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Cleaner Success Story</h3>
        <p className="text-sm mb-4">
          "I started with MyCrew 2 years ago and it's been amazing. The flexible hours allow me to balance work with my family life, and I've built great relationships with my regular clients."
        </p>
        <div className="flex items-center">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
            alt="Sarah"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <p className="text-sm font-medium">Sarah Johnson</p>
            <p className="text-xs opacity-75">Professional Cleaner</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Process</h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-medium">
              1
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">Submit Application</p>
              <p className="text-xs text-gray-500">Complete the online form</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-medium">
              2
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">Background Check</p>
              <p className="text-xs text-gray-500">Pass our verification process</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-medium">
              3
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">Training</p>
              <p className="text-xs text-gray-500">Complete our training program</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-medium">
              4
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">Start Working</p>
              <p className="text-xs text-gray-500">Begin accepting cleaning jobs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}