import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { BookingsList } from '../components/bookings/BookingsList';
import { EmptyState } from '../components/bookings/EmptyState';
import { useUserData } from '../hooks/useUserData';
import { useEffect } from 'react';

export function Bookings() {
  const [activeTab, setActiveTab] = React.useState<'upcoming' | 'past'>('upcoming');
  const [upcomingCount, setUpcomingCount] = React.useState(0);
  const [cancelledCount, setCancelledCount] = React.useState(0);
  const navigate = useNavigate();
  const { upcomingBookings, pastBookings, cancelledBookings, loading } = useUserData();

  // Update upcoming count when bookings change
  useEffect(() => {
    setUpcomingCount(upcomingBookings.length);
    setCancelledCount(cancelledBookings.length);
  }, [upcomingBookings, cancelledBookings]);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Header Section */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
                  <p className="text-sm text-gray-500 mt-1">View and manage your cleaning appointments</p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === 'upcoming'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Upcoming ({loading ? '...' : upcomingCount})
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === 'past'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Past Bookings ({loading ? '...' : pastBookings.length})
                </button>
                <button
                  onClick={() => setActiveTab('cancelled')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === 'cancelled'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Cancelled ({loading ? '...' : cancelledCount})
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Loading State */}
              {loading && (
                <div className="space-y-4">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="h-5 bg-gray-200 rounded w-32"></div>
                        <div className="mx-2 h-4 bg-gray-200 rounded w-4"></div>
                        <div className="h-5 bg-gray-200 rounded w-16"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                      <div className="h-10 bg-gray-200 rounded w-24"></div>
                      <div className="h-10 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                ))}
              </div>
              )}

              {/* Bookings List or Empty State */}
              {!loading && (
                activeTab === 'upcoming' ? (
                  upcomingBookings.length > 0 ? (
                    <BookingsList 
                      bookings={upcomingBookings}
                      type="upcoming"
                      onCountChange={setUpcomingCount}
                    />
                  ) : (
                    <EmptyState />
                  )
                ) : activeTab === 'past' ? (
                  pastBookings.length > 0 ? (
                    <BookingsList 
                      bookings={pastBookings} 
                      type="past" 
                    />
                  ) : (
                    <EmptyState type="past" />
                  )
                ) : (
                  cancelledBookings.length > 0 ? (
                    <BookingsList
                      bookings={cancelledBookings}
                      type="cancelled"
                    />
                  ) : (
                    <EmptyState type="cancelled" />
                  )
                )
              )}
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Tips</h2>
                <div className="space-y-4 text-gray-600">
                  <p>• Book at least 24 hours in advance for the best availability</p>
                  <p>• Regular bookings get priority scheduling</p>
                  <p>• You can reschedule up to 24 hours before your appointment</p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h2>
                <p className="text-gray-600 mb-4">
                  Our support team is here to assist you with any questions about your bookings.
                </p>
                <button
                  onClick={() => navigate('/support')}
                  className="w-full px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity duration-200"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}