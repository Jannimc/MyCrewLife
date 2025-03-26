import React from 'react';
import { Clock } from 'lucide-react';

interface PreferredTimeQuestionProps {
  value: string;
  onChange: (value: string) => void;
}

const formatTime = (time: string) => {
  try {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch (e) {
    return time;
  }
};

export function PreferredTimeQuestion({
  value,
  onChange
}: PreferredTimeQuestionProps) {
  // Convert AM/PM time to 24-hour format for input
  const getInitialTime = () => {
    if (!value) return '09:00';
    try {
      const [time, period] = value.split(' ');
      const [hours, minutes] = time.split(':');
      let hour = parseInt(hours);
      
      if (period === 'PM' && hour !== 12) {
        hour += 12;
      } else if (period === 'AM' && hour === 12) {
        hour = 0;
      }
      
      return `${hour.toString().padStart(2, '0')}:${minutes}`;
    } catch (e) {
      return '09:00';
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-200" />
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="time"
            value={getInitialTime()}
            onChange={(e) => {
              const formattedTime = formatTime(e.target.value);
              onChange(formattedTime);
            }}
            min="08:00"
            max="20:00"
            step="900"
            className="block w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg font-medium text-center cursor-pointer"
            style={{
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              appearance: 'none'
            }}
          />
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-500 text-center">
        Choose any time between 8:00 AM and 8:00 PM
      </p>
    </div>
  );
}