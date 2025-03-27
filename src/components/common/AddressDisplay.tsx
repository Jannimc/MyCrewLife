import React from 'react';
import { MapPin } from 'lucide-react';

interface AddressDisplayProps {
  address: string;
  className?: string;
}

export function AddressDisplay({ address, className }: AddressDisplayProps) {
  return (
    <div className={`flex items-center text-gray-600 ${className}`}>
      <MapPin className="w-4 h-4 mr-2 text-emerald-500" />
      <span className="text-sm truncate">{address}</span>
    </div>
  );
}