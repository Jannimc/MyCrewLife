import React from 'react';
import { Shield } from 'lucide-react';

export function SecurityNote() {
  return (
    <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
      <div className="flex items-start space-x-3">
        <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-medium text-emerald-900">Secure Booking</h3>
          <p className="text-sm text-emerald-700 mt-1">
            Your information is encrypted and securely processed. We never store sensitive data.
          </p>
        </div>
      </div>
    </div>
  );
}