import React, { useState } from 'react';
import { MapPin, Search, CheckCircle, XCircle } from 'lucide-react';

interface PostcodeQuestionProps {
  value: string;
  onChange: (value: string) => void;
}

export function PostcodeQuestion({ value, onChange }: PostcodeQuestionProps) {
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  // UK postcode regex pattern
  const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;

  const validatePostcode = async (postcode: string) => {
    setIsValidating(true);
    setError(null);

    try {
      const response = await fetch(`https://api.postcodes.io/postcodes/${postcode}/validate`);
      const data = await response.json();
      setIsValid(data.result);
      if (!data.result) {
        setError('Please enter a valid UK postcode');
      }
    } catch (err) {
      setIsValid(false);
      setError('Unable to verify postcode. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase();
    onChange(newValue);
    setIsValid(null);
    setError(null);

    // Only validate if the postcode matches the format
    if (postcodeRegex.test(newValue)) {
      validatePostcode(newValue);
    } else if (newValue) {
      setError('Please enter a valid UK postcode format');
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-200" />
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={value}
            onChange={handleChange}
            className={`block w-full pl-11 pr-20 py-4 border-2 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-lg font-medium placeholder:text-gray-400 ${
              isValid === true
                ? 'border-emerald-500 bg-emerald-50'
                : isValid === false
                ? 'border-red-300 bg-red-50'
                : 'border-gray-200'
            }`}
            placeholder="e.g. SW1A 1AA"
            maxLength={8}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            {isValidating ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-emerald-500" />
            ) : isValid === true ? (
              <CheckCircle className="h-5 w-5 text-emerald-500" />
            ) : isValid === false ? (
              <XCircle className="h-5 w-5 text-red-500" />
            ) : (
              <Search className="h-5 w-5 text-emerald-500" />
            )}
          </div>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 text-center">
          {error}
        </p>
      )}
      <p className="mt-3 text-sm text-gray-500 text-center">
        Enter your postcode to find available cleaners in your area
      </p>
    </div>
  );
}