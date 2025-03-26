import React from 'react';
import { Calendar, Clock, MapPin, User, Star, AlertCircle, XCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Booking, useUserData } from '../../hooks/useUserData';
import { useNavigate } from 'react-router-dom';

interface BookingsListProps {
  bookings: Booking[];
  type: 'upcoming' | 'past' | 'cancelled';
  onCountChange?: (count: number) => void;
}

export function BookingsList({ bookings, type, onCountChange }: BookingsListProps) {
  const [cancellingId, setCancellingId] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = React.useState<string | null>(null);
  const [localBookings, setLocalBookings] = React.useState<Booking[]>(bookings);
  const { refetchUserData } = useUserData();
  const navigate = useNavigate();

  // Update local bookings when props change
  React.useEffect(() => {
    // Filter bookings based on type
    const filteredBookings = bookings.filter(booking => {
      if (type === 'upcoming') return booking.status === 'upcoming';
      if (type === 'past') return booking.status === 'completed';
      if (type === 'cancelled') return booking.status === 'cancelled';
      return false;
    });
    setLocalBookings(filteredBookings);
    // Update count for upcoming bookings
    if (type === 'upcoming' && onCountChange) {
      onCountChange(filteredBookings.length);
    }
  }, [bookings]);

  // Scroll to top when showing success message
  React.useEffect(() => {
    if (success) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [success]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatServiceType = (serviceType: string) => {
    return serviceType
      .split(',')
      .map(service => 
        service
          .trim()
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      )
      .join(', ');
  };

  const handleCancelClick = (bookingId: string) => {
    setShowConfirmation(bookingId);
    setError(null);
    setSuccess(null);
  };

  const handleCancel = async (bookingId: string) => {
    try {
      setCancellingId(bookingId);
      setError(null);
      setSuccess(null);
      setShowConfirmation(null);
      
      // Update the booking status to cancelled
      const { error: updateError } = await supabase
        .from('bookings')
        .update({ 
          status: 'cancelled',
          cancelled_at: new Date().toISOString()
        })
        .eq('id', bookingId);

      if (updateError) throw updateError;
      
      // Show success message
      setSuccess('Booking cancelled successfully');
      
      // Update local state immediately
      setLocalBookings(prevBookings => 
        prevBookings.filter(booking => booking.id !== bookingId)
      );

      // Update count for upcoming bookings
      if (type === 'upcoming' && onCountChange) {
        onCountChange(localBookings.length - 1);
      }
      
      // Refresh bookings list after showing success message
      await refetchUserData();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to cancel booking. Please try again.');
      console.error('Error cancelling booking:', err);
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}
      
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-emerald-700">{success}</p>
          </div>
        </div>
      )}
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 relative animate-fade-in">
            <button
              onClick={() => setShowConfirmation(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <XCircle className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cancel Booking</h3>
              <p className="text-gray-600">
                Are you sure you want to cancel this booking? This action cannot be undone.
              </p>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmation(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                No, Keep Booking
              </button>
              <button
                onClick={() => handleCancel(showConfirmation)}
                disabled={cancellingId === showConfirmation}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
              >
                {cancellingId === showConfirmation ? 'Cancelling...' : 'Yes, Cancel Booking'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {localBookings.map((booking) => (
        <div
          key={booking.id}
          className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="p-6">
            {/* Service Type & Duration */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-base font-semibold text-gray-900">{formatServiceType(booking.service_type)}</span>
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
              <button
                onClick={() => navigate(`/bookings/${booking.id}`)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                View Details
              </button>
              {type === 'upcoming' ? (
                <button
                  onClick={() => handleCancelClick(booking.id)}
                  className="px-4 py-2 border border-red-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  Cancel
                </button>
              ) : type === 'past' && booking.status === 'completed' ? (
                <button
                  onClick={() => {}}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-200"
                >
                  Book Again
                </button>
              ) : type === 'cancelled' && (
                <button
                  onClick={() => navigate('/quote')}
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