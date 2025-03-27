import React, { useState, useEffect } from 'react';
import { PostcodeInput } from '../../common/PostcodeInput';

interface PostcodeQuestionProps {
  value: string;
  onChange: (value: string) => void;
  onAddressSelect?: (address: Address) => void;
}

export function PostcodeQuestion({ value, onChange, onAddressSelect }: PostcodeQuestionProps) {
  const [error, setError] = useState<string | null>(null);

  // Clear error when input changes
  useEffect(() => {
    setError(null);
  }, [value]);

  const handleValidate = () => {
    // Only set error if there's a value and it's not a valid postcode format
    if (value && !/^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i.test(value)) {
      setError('Please enter a valid UK postcode');
    } else {
      setError(null);
    } 
  };

  return (
    <div className="max-w-xl mx-auto">
      <PostcodeInput
        value={value}
        onChange={onChange}
        onAddressSelect={(address) => {
          // Update both postcode and selected address
          onChange({
            postcode: address.postcode,
            selectedAddress: address
          });
          onAddressSelect?.(address);
        }}
        error={error}
        onValidate={handleValidate}
      />
      <p className="mt-3 text-sm text-gray-500 text-center">
        Enter your postcode to find available cleaners in your area
      </p>
    </div>
  );
}