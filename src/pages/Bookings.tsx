import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, User, AlertCircle } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { BookingsList } from '../components/bookings/BookingsList';
import { EmptyState } from '../components/bookings/EmptyState';

// Mock data - replace with actual data from your backend
const mockBookings = [
  {
    id: '1',
    date: '2024-03-15',
    time: '09:00 AM',
    address: '123 Main St, London SW1A 1AA',
    cleaner: 'Sarah Johnson',
    status: 'upcoming',
    service: 'Regular Cleaning',
    duration: '3 hours'
  },
  {
    id: '2',
    date: '2024-03-10',
    time: '02:00 PM',
    address: '456 Park Ave, London E1 6AN',
    cleaner: 'Michael Brown',
    status: 'completed',
    service: 'Deep Cleaning',
    duration: '5 hours',
    rating: 5
  }
];

export function Bookings() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const navigate = useNavigate();

  const upcomingBookings = mockBookings.filter(booking => booking.status === 'upcoming');
  const pastBookings = mockBookings.filter(booking => booking.status === 'completed');

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back</span>
          </button>

          <div className="space-y-6">
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
                  <p className="text-sm text-gray-500 mt-1">View and manage your cleaning appointments</p>
                </div>
                <button
                  onClick={() => navigate('/quote')}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-200"
                >
                  Book New Cleaning
                </button>
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
                  Upcoming ({upcomingBookings.length})
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === 'past'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Past Bookings ({pastBookings.length})
                </button>
              </div>
            </div>

            {/* Bookings List or Empty State */}
            {activeTab === 'upcoming' ? (
              upcomingBookings.length > 0 ? (
                <BookingsList bookings={upcomingBookings} type="upcoming" />
              ) : (
                <EmptyState />
              )
            ) : (
              pastBookings.length > 0 ? (
                <BookingsList bookings={pastBookings} type="past" />
              ) : (
                <EmptyState type="past" />
              )
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}