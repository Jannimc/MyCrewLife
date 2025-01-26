import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EmptyStateProps {
  type?: 'upcoming' | 'past';
}

export function EmptyState({ type = 'upcoming' }: EmptyStateProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-emerald-100 rounded-full flex items-center justify-center">
        <Calendar className="w-8 h-8 text-emerald-600" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {type === 'upcoming' 
          ? 'No Upcoming Bookings'
          : 'No Past Bookings'
        }
      </h3>
      <p className="text-gray-500 mb-6">
        {type === 'upcoming'
          ? 'Book your first cleaning service and experience the MyCrew difference.'
          : 'You haven\'t completed any bookings yet. Start by booking your first cleaning service.'
        }
      </p>
      <button
        onClick={() => navigate('/quote')}
        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity duration-200"
      >
        Book Now
        <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
}