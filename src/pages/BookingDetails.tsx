import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, User, Star, CheckCircle2, AlertCircle, CreditCard } from 'lucide-react';
import { useUserData } from '../hooks/useUserData';

export function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookings, loading } = useUserData();
  
  // Find the specific booking
  const booking = bookings.find(b => b.id === id);

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
      <MainLayout>
        <div className="min-h-screen bg-gray-50 pt-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-32"></div>
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
                <div className="space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-6 bg-gray-200 rounded w-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!booking) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 pt-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Booking Not Found</h2>
              <p className="text-gray-600 mb-6">The booking you're looking for doesn't exist or has been removed.</p>
              <button
                onClick={() => navigate('/bookings')}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Bookings
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 pt-6">
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
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Booking Details</h1>
                  <p className="text-sm text-gray-500 mt-1">View and manage your cleaning appointment</p>
                </div>
                <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {/* Main Details */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <Calendar className="w-5 h-5 text-emerald-500 mr-2" />
                    Service Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Service Type</p>
                        <p className="text-gray-600">{booking.service_type ? formatServiceType(booking.service_type) : 'Not specified'}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-900">Duration</p>
                        <p className="text-gray-600">{booking.duration || 'Not specified'}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-900">Frequency</p>
                        <p className="text-gray-600">{booking.frequency || 'Not specified'}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-900">Extra Services</p>
                        {booking.extra_services && booking.extra_services.length > 0 ? (
                          <ul className="mt-1 space-y-1">
                            {booking.extra_services.map((service, index) => (
                              <li key={index} className="flex items-center text-gray-600">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" />
                                {service.charAt(0).toUpperCase() + service.slice(1)}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-600">No extra services selected</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Property Type</p>
                        <p className="text-gray-600">{booking.property_type || 'Not specified'}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-900">Residential Areas</p>
                        {booking.residential_areas && Object.keys(booking.residential_areas).length > 0 ? (
                          <ul className="mt-1 space-y-1">
                            {Object.entries(booking.residential_areas).map(([area, count]) => (
                              <li key={area} className="flex items-center text-gray-600">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" />
                                {area.replace(/([A-Z])/g, ' $1').trim()}: {count}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-600">No residential areas specified</p>
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-900">Commercial Areas</p>
                        {booking.commercial_areas && Object.keys(booking.commercial_areas).length > 0 ? (
                          <ul className="mt-1 space-y-1">
                            {Object.entries(booking.commercial_areas).map(([area, count]) => (
                              <li key={area} className="flex items-center text-gray-600">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" />
                                {area.replace(/([A-Z])/g, ' $1').trim()}: {count}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-600">No commercial areas specified</p>
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-900">Other Areas</p>
                        {booking.other_areas && booking.other_areas.length > 0 ? (
                          <ul className="mt-1 space-y-1">
                            {booking.other_areas.map((area, index) => (
                              <li key={index} className="flex items-center text-gray-600">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" />
                                {area}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-600">No other areas specified</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Schedule & Location */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <Calendar className="w-5 h-5 text-emerald-500 mr-2" />
                    Schedule & Location
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-5 h-5 text-emerald-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Date</p>
                          <p>{formatDate(booking.date)}</p>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Clock className="w-5 h-5 text-emerald-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Time</p>
                          <p>{booking.time}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-5 h-5 text-emerald-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Location</p>
                          <p>{booking.address}</p>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <User className="w-5 h-5 text-emerald-500 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Cleaner</p>
                          <p>{booking.cleaner}</p>
                        </div>
                      </div>

                      {booking.rating && (
                        <div>
                          <p className="text-sm font-medium text-gray-900">Rating</p>
                          <div className="flex items-center mt-1">
                            {[...Array(booking.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-emerald-500 fill-current" />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2" />
                    Requirements & Access
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Special Requirements</p>
                        <p className="text-gray-600 mt-1">{booking.special_requirements || 'No special requirements specified'}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Access Instructions</p>
                        <p className="text-gray-600 mt-1">{booking.access_instructions || 'No access instructions provided'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pet Information */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2" />
                    Pet Information
                  </h2>
                    
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Has Pets</p>
                      <p className="text-gray-600 mt-1">{booking.has_pets ? 'Yes' : 'No'}</p>
                    </div>
                    {booking.has_pets && (
                      <div>
                        <p className="text-sm font-medium text-gray-900">Pet Information</p>
                        <p className="text-gray-600 mt-1">{booking.pet_details}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Price Information */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 text-emerald-500 mr-2" />
                  Price Details
                </h2>
                <div className="space-y-3">
                  {booking.base_price && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Base Service</span>
                      <span className="font-medium text-gray-900">£{booking.base_price.toFixed(2)}</span>
                    </div>
                  )}

                  {/* Extra Services with prices */}
                  {booking.extra_services_price && Object.keys(booking.extra_services_price).length > 0 && (
                    <>
                      {(() => {
                        const totalExtraServices = Object.values(booking.extra_services_price as Record<string, number>)
                          .reduce((sum, price) => sum + (price || 0), 0);
                        return (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Extra Services</span>
                            <span className="font-medium text-gray-900">
                              £{totalExtraServices.toFixed(2)}
                            </span>
                          </div>
                        );
                      })()}
                      <div className="pl-4 space-y-1">
                        {Object.entries(booking.extra_services_price as Record<string, number>).map(([service, price]) => (
                          <div key={service} className="flex justify-between text-xs text-gray-500">
                            <span>{service.charAt(0).toUpperCase() + service.slice(1)}</span>
                            <span>£{(price || 0).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  
                  {/* Frequency Discount */}
                  {booking.discount_amount && booking.discount_amount > 0 && booking.discount_percentage && (
                    <div className="flex justify-between text-sm text-emerald-600">
                      <span>Frequency Discount ({booking.discount_percentage}%)</span>
                      <span>-£{booking.discount_amount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {/* Total */}
                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex justify-between text-base">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="font-semibold text-emerald-600">
                        £{(booking.total_price || 0).toFixed(2)}
                      </span>
                    </div>
                    {booking.frequency && booking.frequency !== 'oneTime' && (
                      <p className="text-xs text-gray-500 mt-1 text-right">
                        per {booking.frequency.replace('ly', '')} clean
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Status */}
              <div className="bg-emerald-50 rounded-2xl p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-emerald-900">Payment Complete</h3>
                    <p className="text-sm text-emerald-700 mt-1">
                      Paid via Credit Card ending in •••• 4242
                    </p>
                  </div>
                </div>
              </div>

              {/* Need Help Section */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 text-emerald-500 mr-2" />
                  Need Help?
                </h2>
                <p className="text-gray-600 mb-4">
                  Having issues with your booking? Our support team is here to help.
                </p>
                <button
                  onClick={() => navigate('/support')}
                  className="w-full px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity duration-200"
                >
                  Contact Support
                </button>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <ArrowRight className="w-5 h-5 text-emerald-500 mr-2" />
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/quote')}
                    className="w-full px-4 py-2 border border-emerald-500 text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition-colors duration-200"
                  >
                    Book New Cleaning
                  </button>
                </div>
              </div>

              {/* Booking Tips */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Star className="w-5 h-5 text-emerald-500 mr-2" />
                  Booking Tips
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>• Book at least 24 hours in advance for the best availability</p>
                  <p>• Regular bookings get priority scheduling</p>
                  <p>• You can cancel up to 24 hours before your appointment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}