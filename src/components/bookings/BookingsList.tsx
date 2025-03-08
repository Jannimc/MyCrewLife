import React from 'react';
import { Calendar, Clock, MapPin, User, Star, AlertCircle } from 'lucide-react';
import { Booking } from '../../hooks/useUserData';

interface BookingsListProps {
  bookings: Booking[];
  type: 'upcoming' | 'past';
}

export function BookingsList({ bookings, type }: BookingsListProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="p-6">
            {/* Service Type & Duration */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-base font-semibold text-gray-900">{booking.service_type}</span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-500">{booking.duration}</span>
              </div>
              {type === 'past' && booking.rating && (
                <div className="flex items-center">
                  {[...Array(booking.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-emerald-500 fill-current" />
                  ))}
                </div>
              )}
            </div>

            {/* Booking Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2 text-emerald-500" />
                  <span className="text-sm">{formatDate(booking.date)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2 text-emerald-500" />
                  <span className="text-sm">{booking.time}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2 text-emerald-500" />
                  <span className="text-sm">{booking.address}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <User className="w-5 h-5 mr-2 text-emerald-500" />
                  <span className="text-sm">{booking.cleaner}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex items-center justify-end space-x-3">
              {type === 'upcoming' ? (
                <>
                  <button
                    onClick={() => {}}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => {}}
                    className="px-4 py-2 border border-red-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {}}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-200"
                >
                  Book Again
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}