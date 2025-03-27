import React from 'react';

interface BookingStatusProps {
  status: string;
  size?: 'sm' | 'md';
}

export function BookingStatus({ status, size = 'sm' }: BookingStatusProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-emerald-100 text-emerald-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span 
      className={`inline-flex items-center rounded-lg font-medium ${getStatusColor(status)} ${
        size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-4 py-2 text-sm'
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}