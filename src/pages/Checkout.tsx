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

export function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  
  // Get data from location state
  const quoteData = location.state?.quoteData as QuoteFormData;
  const selectedAddress = quoteData?.selectedAddress;
  const timeSlot = location.state?.timeSlot as string;
  
  // Redirect if no quote data
  useEffect(() => {
    if (!quoteData) {
      navigate('/quote');
    }
  }, [quoteData, navigate]);

  // Form states
  const [addressForm, setAddressForm] = useState({
    street: selectedAddress?.street || '',
    city: selectedAddress?.city || '',
    postcode: quoteData?.postcode || '',
    saveAddress: true
  });
  
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    phone: ''
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

  // Countdown timer for redirect after successful booking
  useEffect(() => {
    if (isComplete && redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (isComplete && redirectCountdown === 0) {
      // Redirect to homepage for guests, dashboard for logged in users
      navigate(user ? '/dashboard' : '/');
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
      // Calculate base service prices
      const basePrice = calculateBasePrice(quoteData);
      
      // Calculate area charges
      const areaCharges = calculateAreaCharges(quoteData);
      
      // Calculate extra services price
      const extraServicesPrice = calculateExtraServicesPrice(quoteData);
      
      // Calculate subtotal before discount
      const subtotalPrice = basePrice + areaCharges.total + extraServicesPrice.total;
      
      // Calculate discount
      const { discountPercentage, discountAmount } = calculateDiscount(quoteData, subtotalPrice);
      
      const totalPrice = subtotalPrice - discountAmount;
      
      // Create a booking in the database if user is authenticated
      const { data: sessionData } = await supabase.auth.getSession();
      
      try {
        // Format the booking data
        const bookingData = {
          user_id: sessionData.session?.user?.id || null,
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
          service_prices: calculateServicePrices(quoteData),
          area_charges: areaCharges.details,
          extra_services_price: extraServicesPrice.details,
          subtotal_price: subtotalPrice,
          discount_percentage: discountPercentage,
          discount_amount: discountAmount,
          total_price: totalPrice,
          is_guest: !sessionData.session?.user,
          guest_name: authForm.name || null,
          guest_email: authForm.email || null,
          guest_phone: authForm.phone || null,
          pricing_context: {
            currency: 'GBP',
            frequency: quoteData.frequency || 'one-time',
            timestamp: new Date().toISOString()
          }
        };
        
        // Insert the booking
        const { error: bookingError } = await supabase
          .from('bookings')
          .insert([bookingData]);
          
        if (bookingError) {
          throw bookingError;
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
        throw new Error('Failed to create booking. Please try again.');
      }
      
      // Show success state
      setIsComplete(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError('Failed to process booking. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Calculate base price from selected services
  const calculateBasePrice = (data: QuoteFormData): number => {
    // Base price for each service type
    const servicePrices = {
      regular_home: 30,
      deep_cleaning: 45,
      spring_cleaning: 50,
      end_of_tenancy: 60,
      move_in_out: 55,
      post_renovation: 65,
      office_cleaning: 40,
      disinfection: 35,
      retail_cleaning: 45
    };

    return data.services?.reduce((total, service) => 
      total + (servicePrices[service as keyof typeof servicePrices] || 0), 0
    ) || 0;
  };

  // Calculate individual service prices
  const calculateServicePrices = (data: QuoteFormData): Record<string, number> => {
    const servicePrices = {
      regular_home: 30,
      deep_cleaning: 45,
      spring_cleaning: 50,
      end_of_tenancy: 60,
      move_in_out: 55,
      post_renovation: 65,
      office_cleaning: 40,
      disinfection: 35,
      retail_cleaning: 45
    };

    return data.services?.reduce((prices, service) => ({
      ...prices,
      [service]: servicePrices[service as keyof typeof servicePrices] || 0
    }), {}) || {};
  };

  // Calculate area charges with details
  const calculateAreaCharges = (data: QuoteFormData): { total: number; details: Record<string, number> } => {
    const charges: Record<string, number> = {};
    let total = 0;

    // Residential areas
    if (data.residentialAreas && Object.keys(data.residentialAreas).length > 0) {
      Object.entries(data.residentialAreas).forEach(([area, count]) => {
        const areaCharge = count * 15;
        charges[area] = areaCharge;
        total += areaCharge;
      });
    }

    // Commercial areas
    if (data.commercialAreas && Object.keys(data.commercialAreas).length > 0) {
      Object.entries(data.commercialAreas).forEach(([area, count]) => {
        const areaCharge = count * 20;
        charges[area] = areaCharge;
        total += areaCharge;
      });
    }

    return { total, details: charges };
  };

  // Calculate extra services price
  const calculateExtraServicesPrice = (data: QuoteFormData): { total: number; details: Record<string, number> } => {
    const prices = {
      ironing: 15,
      laundry: 20,
      fridge: 25,
      oven: 30,
      windows: 20
    };

    const details: Record<string, number> = {};
    let total = 0;

    data.extraServices?.forEach(service => {
      const price = prices[service as keyof typeof prices] || 0;
      details[service] = price;
      total += price;
    });

    return { total, details };
  };

  // Calculate discount based on frequency
  const calculateDiscount = (data: QuoteFormData, subtotal: number): { discountPercentage: number, discountAmount: number } => {
    let discountPercentage = 0;

    switch (data.frequency) {
      case 'weekly':
        discountPercentage = 15;
        break;
      case 'biweekly':
        discountPercentage = 10;
        break;
      case 'monthly':
        discountPercentage = 5;
        break;
    }

    const discountAmount = (subtotal * discountPercentage) / 100;

    return {
      discountPercentage,
      discountAmount
    };
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
    
    // If user is logged in, process booking
    if (user) {
      // Save address if requested
      if (addressForm.saveAddress) {
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
      
      processBooking();
    } else {
      // If not logged in, show auth form
      if (activeTab === 'guest') {
        // Process as guest booking
        processBooking();
      } else if (activeTab === 'login') {
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
    setAuthErrors({});
    setIsProcessing(true);
    
    try {
      if (!authForm.email || !authForm.password) {
        setError('Please enter both email and password');
        setIsProcessing(false);
        return;
      }

      await signIn(authForm.email, authForm.password);
      // Only process booking after successful login
      await processBooking();
    } catch (err) {
      // Handle specific error messages
      const errorMessage = err instanceof Error ? err.message : '';
      if (errorMessage.includes('Invalid login credentials')) {
        setError('Incorrect email or password. Please try again.');
      } else if (errorMessage.includes('Email not confirmed')) {
        setError('Please verify your email address before signing in.');
      } else {
        setError('Failed to sign in. Please try again.');
      }
      setIsProcessing(false);
    }
  };

  // Handle signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsProcessing(true);
    
    // Validate required fields
    if (!authForm.first_name?.trim()) {
      setAuthErrors({ first_name: 'First name is required' });
      setIsProcessing(false);
      return;
    }

    if (!authForm.last_name?.trim()) {
      setAuthErrors({ last_name: 'Last name is required' });
      setIsProcessing(false);
      return;
    }

    if (!authForm.phone?.trim()) {
      setAuthErrors({ phone: 'Phone number is required' });
      setIsProcessing(false);
      return;
    }
    
    if (authForm.password !== authForm.confirmPassword) {
      setAuthErrors({ confirmPassword: 'Passwords do not match' });
      setIsProcessing(false);
      return;
    }

    try {
      if (!authForm.email || !authForm.password) {
        throw new Error('Please enter both email and password');
      }

      // Validate required fields
      if (!authForm.first_name?.trim()) {
        throw new Error('First name is required');
      }

      if (!authForm.last_name?.trim()) {
        throw new Error('Last name is required');
      }

      if (!authForm.phone?.trim()) {
        throw new Error('Phone number is required');
      }

      await signUp(authForm.email, authForm.password, {
        data: {
          first_name: authForm.first_name,
          last_name: authForm.last_name,
          phone: authForm.phone
        }
      });
      // Only process booking after successful signup
      await processBooking();
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
      <div className="min-h-screen bg-gray-50 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
            <p className="text-gray-600">Enter your details to confirm your cleaning service</p>
          </div>
          
          {/* Success message */}
          {isComplete && (
            <SuccessMessage 
              isGuest={!user}
              redirectCountdown={redirectCountdown}
              onNavigate={() => navigate(user ? '/dashboard' : '/')}
            />
          )}
          
          {!isComplete && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main form */}
              <div className="lg:col-span-8">
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
                  <div className="flex flex-col space-y-3">
                    {/* Error message */}
                    {error && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-sm">
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />
                          <p className="text-red-700">{error}</p>
                        </div>
                      </div>
                    )}
                    {/* Submit button */}
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
              <div className="lg:col-span-4">
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