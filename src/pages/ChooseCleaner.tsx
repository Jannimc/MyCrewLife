import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Star, Award, Calendar, Clock, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import { QuoteFormData } from '../types/quote';

interface CleanerProfile {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  experience: string;
  specialties: string[];
  availability: {
    nextAvailable: string;
    slots: string[];
  };
  bio: string;
  completedJobs: number;
  languages: string[];
}

/**
 * Choose Cleaner page component
 * Allows users to select a cleaner after completing the quote form
 */
export function ChooseCleaner() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCleaner, setSelectedCleaner] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Get quote data from location state
  const quoteData = location.state?.quoteData as QuoteFormData;

  // Redirect to quote page if no quote data is available
  if (!quoteData) {
    navigate('/quote');
    return null;
  }

  // Mock data for available cleaners
  const availableCleaners: CleanerProfile[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
      rating: 4.9,
      reviews: 156,
      experience: '8 years',
      specialties: ['Deep Cleaning', 'End of Tenancy', 'Commercial Spaces'],
      availability: {
        nextAvailable: 'Tomorrow',
        slots: ['9:00 AM', '2:00 PM', '4:00 PM']
      },
      bio: 'Professional cleaner with expertise in deep cleaning and end of tenancy services. Known for attention to detail and excellent customer service.',
      completedJobs: 450,
      languages: ['English', 'Spanish']
    },
    {
      id: '2',
      name: 'Michael Chen',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
      rating: 4.8,
      reviews: 132,
      specialties: ['Office Cleaning', 'Post-Construction', 'Commercial Spaces'],
      experience: '6 years',
      availability: {
        nextAvailable: 'Today',
        slots: ['11:00 AM', '3:00 PM']
      },
      bio: 'Specialized in commercial and office cleaning with extensive experience in post-construction cleanup. Strong focus on safety and efficiency.',
      completedJobs: 380,
      languages: ['English', 'Mandarin']
    },
    {
      id: '3',
      name: 'Emma Wilson',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
      rating: 4.9,
      reviews: 98,
      specialties: ['Eco-Friendly Cleaning', 'Residential', 'Pet-Friendly'],
      experience: '5 years',
      availability: {
        nextAvailable: 'Tomorrow',
        slots: ['10:00 AM', '1:00 PM', '5:00 PM']
      },
      bio: 'Eco-conscious cleaner using only environmentally friendly products. Great with pets and specialized in creating healthy living spaces.',
      completedJobs: 290,
      languages: ['English', 'French']
    }
  ];

  /**
   * Handle booking confirmation
   */
  const handleConfirmBooking = () => {
    if (!selectedCleaner || !selectedSlot) return;
    
    // Navigate to confirmation/payment page with selected cleaner and slot
    navigate('/booking-confirmation', {
      state: {
        quoteData,
        cleanerId: selectedCleaner,
        timeSlot: selectedSlot
      }
    });
  };

  /**
   * Handle back to quote button click
   */
  const handleBackToQuote = () => {
    // Navigate back to quote page with the summary view active
    navigate('/quote', {
      state: {
        quoteData,
        showSummary: true
      }
    });
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={handleBackToQuote}
              className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Back to Quote</span>
            </button>
            
            <h1 className="text-3xl font-bold text-gray-900">Choose Your Cleaner</h1>
            <p className="mt-2 text-gray-600">Select from our top-rated cleaning professionals</p>
          </div>

          {/* Cleaners Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {availableCleaners.map((cleaner) => (
              <div 
                key={cleaner.id}
                className={`relative group cursor-pointer ${
                  selectedCleaner === cleaner.id ? 'ring-2 ring-emerald-500' : ''
                }`}
                onClick={() => setSelectedCleaner(cleaner.id)}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-0 group-hover:opacity-25 transition duration-200" />
                <div className="relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start space-x-4">
                    {/* Profile Image */}
                    <img
                      src={cleaner.image}
                      alt={cleaner.name}
                      className="w-24 h-24 rounded-xl object-cover"
                    />

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">{cleaner.name}</h3>
                        <div className="flex items-center">
                          <Star className="w-5 h-5 text-emerald-500 fill-current" />
                          <span className="ml-1 text-gray-900 font-medium">{cleaner.rating}</span>
                          <span className="ml-1 text-gray-500">({cleaner.reviews} reviews)</span>
                        </div>
                      </div>

                      <div className="mt-2 space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Award className="w-4 h-4 text-emerald-500 mr-2" />
                          {cleaner.experience} experience • {cleaner.completedJobs}+ jobs completed
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {cleaner.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Availability Section */}
                  {selectedCleaner === cleaner.id && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Available Time Slots</h4>
                      <div className="flex flex-wrap gap-2">
                        {cleaner.availability.slots.map((slot) => (
                          <button
                            key={slot}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSlot(slot);
                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                              selectedSlot === slot
                                ? 'bg-emerald-500 text-white'
                                : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action Bar */}
          {selectedCleaner && selectedSlot && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-emerald-500 mr-2" />
                      <span>Next Available: Tomorrow</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-emerald-500 mr-2" />
                      <span>Selected Time: {selectedSlot}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleConfirmBooking}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity duration-200"
                  >
                    Continue to Booking
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}