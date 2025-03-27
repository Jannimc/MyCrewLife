import React from 'react';

interface ActionButtonsProps {
  onViewDetails?: () => void;
  onBookAgain?: () => void;
  onCancel?: () => void;
  type: 'upcoming' | 'past' | 'cancelled';
}

export function ActionButtons({ onViewDetails, onBookAgain, onCancel, type }: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-end space-x-3">
      <button
        onClick={onViewDetails}
        className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
      >
        View Details
      </button>
      {type === 'upcoming' ? (
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-red-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
        >
          Cancel
        </button>
      ) : (
        <button
          onClick={onBookAgain}
          className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-200"
        >
          Book Again
        </button>
      )}
    </div>
  );
}