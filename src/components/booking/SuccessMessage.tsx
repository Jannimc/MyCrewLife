import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';

interface SuccessMessageProps {
  isGuest?: boolean;
  redirectCountdown: number;
  onNavigate: () => void;
}

export function SuccessMessage({ isGuest, redirectCountdown, onNavigate }: SuccessMessageProps) {
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8 animate-fade-in">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <CheckCircle2 className="h-8 w-8 text-emerald-500" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-emerald-800">Booking Confirmed!</h3>
          <p className="text-emerald-700 mt-1">
            Your cleaning service has been scheduled and is awaiting cleaner assignment. 
            You'll receive a confirmation email shortly.
          </p>
          <p className="text-emerald-700 mt-2">
            {isGuest 
              ? `Redirecting to homepage in ${redirectCountdown} seconds...`
              : `Redirecting to your dashboard in ${redirectCountdown} seconds...`
            }
          </p>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <Button onClick={onNavigate}>
          {isGuest ? 'Return to Homepage' : 'Go to Dashboard Now'}
        </Button>
      </div>
    </div>
  );
}