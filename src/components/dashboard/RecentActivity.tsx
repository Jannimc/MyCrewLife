import React from 'react';
import { Calendar, MapPin, Star, ArrowRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../../hooks/useUserData';
import { Card } from '../common/Card';
import { BookingStatus } from '../common/BookingStatus';
import { AddressDisplay } from '../common/AddressDisplay';
import { LoadingSkeleton } from '../common/LoadingSkeleton';
import { formatDate } from '../../utils/date';

export function RecentActivity() {
  const { bookings, loading } = useUserData();
  const navigate = useNavigate();
  const [recentBookings, setRecentBookings] = React.useState(bookings);
  
  const getRecentBookings = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const sortedBookings = [...bookings].sort((a, b) => {
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
    
    return sortedBookings.slice(0, 5);
  };

  React.useEffect(() => {
    setRecentBookings(getRecentBookings());
  }, [bookings]);

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

  if (loading) {
    return (
      <Card className="p-6">
        <LoadingSkeleton items={2} type="list" />
      </Card>
    );
  }

  return (
    <Card 
      className="p-6"
      title="Recent Activity"
      action={
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/bookings')}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            View All
          </button>
        </div>
      }
    >
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
                    <span className="text-base font-medium text-gray-900 mr-2">
                      {formatServiceType(booking.service_type)}
                    </span>
                    <BookingStatus status={booking.status} />
                    {booking.status === 'completed' && booking.rating && (
                      <div className="flex items-center ml-2">
                        {[...Array(booking.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-emerald-500 fill-current" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-emerald-500" />
                      <span className="text-sm">{formatDate(booking.date)} at {booking.time}</span>
                    </div>
                    <AddressDisplay address={booking.address} />
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
    </Card>
  );
}