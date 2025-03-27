import React from 'react';
import { Calendar, MapPin, Star, ArrowRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../../hooks/useUserData';

export function RecentActivity() {
  const { bookings, loading } = useUserData();
  const navigate = useNavigate();
  const [recentBookings, setRecentBookings] = React.useState(bookings);
  
  // Get recent bookings (upcoming and past)
  const getRecentBookings = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Get all bookings sorted by date
    const sortedBookings = [...bookings].sort((a, b) => {
      // Get the most recent activity timestamp for each booking
      const getActivityTime = (booking: any) => {
        if (booking.cancelled_at) {
          return new Date(booking.cancelled_at).getTime();
        }
        return new Date(booking.created_at).getTime();
      }
      
      const timeA = getActivityTime(a);
      const timeB = getActivityTime(b);
      return timeB - timeA; // Most recent activity first
    });
    
    // Get the 5 most recent bookings
    return sortedBookings.slice(0, 5);
  };

  // Update recent bookings when bookings change
  React.useEffect(() => {
    setRecentBookings(getRecentBookings());
  }, [bookings]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      month: 'long',
      day: 'numeric',
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

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="relative group animate-pulse">
              <div className="bg-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-5 bg-gray-200 rounded w-24"></div>
                    <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/bookings')}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            View All
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {recentBookings.length > 0 ? (
          recentBookings.map((booking, index) => (
            <div
              key={booking.id}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur opacity-0 group-hover:opacity-25 transition duration-200" />
              <div className="relative bg-white rounded-xl border border-gray-200 p-4 hover:border-emerald-200 transition-all duration-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-base font-medium text-gray-900">
                      {formatServiceType(booking.service_type)}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  {booking.status === 'completed' && booking.rating && (
                    <div className="flex items-center">
                      {[...Array(booking.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-emerald-500 fill-current" />
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-emerald-500" />
                      <span className="text-sm">{formatDate(booking.date)} at {booking.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-emerald-500" />
                      <span className="text-sm truncate">{booking.address}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    {booking.status === 'upcoming' ? (
                      <button 
                        onClick={() => navigate(`/bookings/${booking.id}`)}
                        className="px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
                      > 
                        View Details
                      </button>
                    ) : (
                      <button 
                        onClick={() => navigate('/quote')}
                        className="px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
                      >
                        Book Again
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">No recent activity</p>
            <button
              onClick={() => navigate('/quote')}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-200"
            >
              Book Your First Cleaning
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}