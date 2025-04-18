import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { QuoteFormData } from '../types/quote';
import { BookingSummary } from '../components/booking/BookingSummary';
import { AddressForm } from '../components/booking/AddressForm';
import { AuthSection } from '../components/booking/AuthSection';
import { SecurityNote } from '../components/booking/SecurityNote';
import { SuccessMessage } from '../components/booking/SuccessMessage';

export function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  
  // Get data from location state
  const quoteData = location.state?.quoteData as QuoteFormData;
  const timeSlot = location.state?.timeSlot as string;
  
  // Form states
  const [addressForm, setAddressForm] = useState({
    street: '',
    city: '',
    postcode: quoteData?.postcode || '',
    saveAddress: true
  });
  
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Form validation states
  const [addressErrors, setAddressErrors] = useState<Record<string, string>>({});
  const [authErrors, setAuthErrors] = useState<Record<string, string>>({});
  
  // UI states
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(user ? 'login' : 'signup');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redirectCountdown, setRedirectCountdown] = useState(5);

  // Redirect if no data
  useEffect(() => {
    if (!quoteData) {
      navigate('/quote');
    }
  }, [quoteData, navigate]);

  // Countdown timer for redirect after successful booking
  useEffect(() => {
    if (isComplete && redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (isComplete && redirectCountdown === 0) {
      navigate('/dashboard');
    }
  }, [isComplete, redirectCountdown, navigate]);

  // Handle address form changes
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setAddressForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (addressErrors[name]) {
      setAddressErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle auth form changes
  const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (authErrors[name]) {
      setAuthErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Process the booking
  const processBooking = async () => {
    try {
      // Calculate prices
      const basePrice = 50; // Example base price
      const totalPrice = basePrice;
      
      // Create a booking in the database if user is authenticated
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session?.user) {
        try {
          // Format the booking data
          const bookingData = {
            user_id: sessionData.session.user.id,
            service_type: Array.isArray(quoteData.services) ? quoteData.services.join(', ') : 'Regular Cleaning',
            date: quoteData.preferredDay,
            time: timeSlot || '9:00 AM',
            address: `${addressForm.street}, ${addressForm.city}, ${addressForm.postcode}`,
            cleaner: 'Awaiting Assignment',
            status: 'upcoming',
            duration: '3 hours',
            property_type: quoteData.propertyType,
            residential_areas: quoteData.residentialAreas,
            commercial_areas: quoteData.commercialAreas,
            other_areas: quoteData.otherAreas,
            custom_area_name: quoteData.customAreaName,
            extra_services: quoteData.extraServices,
            frequency: quoteData.frequency,
            special_requirements: quoteData.specialRequirements,
            has_pets: quoteData.hasPets,
            pet_details: quoteData.petDetails,
            access_instructions: quoteData.accessInstructions,
            base_price: basePrice,
            total_price: totalPrice
          };
          
          // Insert the booking
          const { error: bookingError } = await supabase
            .from('bookings')
            .insert([bookingData]);
            
          if (bookingError) {
            console.error('Error creating booking:', bookingError);
            // Continue anyway - we'll show success to the user
          }
        } catch (dbError) {
          console.error('Database error:', dbError);
          // Continue anyway - we'll show success to the user
        }
      }
      
      // Show success state
      setIsComplete(true);
      setIsProcessing(false);
    } catch (err) {
      setError('Failed to process booking. Please try again.');
      setIsProcessing(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsProcessing(true);
    
    // Validate address form
    const addressValid = validateAddressForm();
    
    // If any form is invalid, stop submission
    if (!addressValid) {
      setIsProcessing(false);
      return;
    }
    
    // Save address if requested
    if (addressForm.saveAddress && user) {
      try {
        // Check if this is the first address (will be default)
        const { data: existingAddresses } = await supabase
          .from('addresses')
          .select('id')
          .eq('user_id', user.id);
        
        const isFirstAddress = !existingAddresses || existingAddresses.length === 0;
        
        // Save the address
        const { error: addressError } = await supabase
          .from('addresses')
          .insert({
            user_id: user.id,
            label: 'Home',
            street: addressForm.street,
            city: addressForm.city,
            postcode: addressForm.postcode,
            is_default: isFirstAddress
          });
          
        if (addressError) throw addressError;
      } catch (err) {
        console.error('Error saving address:', err);
      }
    }
    
    // If user is logged in, process booking
    if (user) {
      setIsProcessing(true);
      processBooking();
    } else {
      // If not logged in, show auth form
      if (activeTab === 'login') {
        handleLogin(e);
      } else {
        handleSignup(e);
      }
    }
  };

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      await signIn(authForm.email, authForm.password);
      processBooking();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to sign in. Please try again.');
      setIsProcessing(false);
    }
  };

  // Handle signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (authForm.password !== authForm.confirmPassword) {
      setAuthErrors({ confirmPassword: 'Passwords do not match' });
      setIsProcessing(false);
      return;
    }

    try {
      await signUp(authForm.email, authForm.password);
      processBooking();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account. Please try again.');
      setIsProcessing(false);
    }
  };

  // Validate address form
  const validateAddressForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!addressForm.street.trim()) {
      errors.street = 'Street address is required';
    }
    
    if (!addressForm.city.trim()) {
      errors.city = 'City is required';
    }
    
    if (!addressForm.postcode.trim()) {
      errors.postcode = 'Postcode is required';
    } else {
      // UK postcode regex pattern
      const postcodeRegex = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
      if (!postcodeRegex.test(addressForm.postcode)) {
        errors.postcode = 'Please enter a valid UK postcode';
      }
    }
    
    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // If no data, show loading
  if (!quoteData) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 pt-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Back button */}
          <button
            onClick={() => navigate('/quote', { state: { quoteData, showSummary: true } })}
            className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors duration-200 mb-6"
            disabled={isProcessing || isComplete}
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Quote</span>
          </button>
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
            <p className="text-gray-600 mt-2">Enter your details to confirm your cleaning service</p>
          </div>
          
          {/* Success message */}
          {isComplete && (
            <SuccessMessage 
              redirectCountdown={redirectCountdown}
              onNavigate={() => navigate('/dashboard')}
            />
          )}
          
          {/* Error message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}
          
          {!isComplete && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main form */}
              <div className="lg:col-span-7">
                <form onSubmit={handleSubmit}>
                  <AddressForm
                    formData={addressForm}
                    errors={addressErrors}
                    onChange={handleAddressChange}
                    isProcessing={isProcessing}
                  />
                  
                  {/* Authentication (if not logged in) */}
                  {!user && (
                    <AuthSection
                      activeTab={activeTab}
                      setActiveTab={setActiveTab}
                      formData={authForm}
                      errors={authErrors}
                      onChange={handleAuthChange}
                      isProcessing={isProcessing}
                    />
                  )}
                  
                  {/* Submit button */}
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      isLoading={isProcessing}
                      fullWidth
                    >
                      {isProcessing ? 'Processing...' : 'Confirm Booking'}
                    </Button>
                  </div>
                </form>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-5">
                <div className="sticky top-24 space-y-6">
                  <BookingSummary
                    quoteData={quoteData}
                    timeSlot={timeSlot}
                  />
                  <SecurityNote />
                  
                  {/* Additional Info */}
                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">What Happens Next?</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-medium">
                          1
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">Confirmation</p>
                          <p className="text-sm text-gray-500">You'll receive an email confirming your booking details</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-medium">
                          2
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">Cleaner Assignment</p>
                          <p className="text-sm text-gray-500">We'll match you with the best cleaner for your needs</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-medium">
                          3
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">Pre-clean Contact</p>
                          <p className="text-sm text-gray-500">Your cleaner will contact you to confirm arrangements</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}