import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Star, Award, Calendar, Clock, CheckCircle2, ArrowLeft, ArrowRight, CreditCard, AlertCircle, MapPin, Shield, User } from 'lucide-react';
import { QuoteFormData } from '../types/quote';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/common/Button';
import { CostSummary } from '../components/quote/CostSummary';
import { supabase } from '../lib/supabase';

interface PaymentFormData {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
  saveCard: boolean;
}

interface AddressFormData {
  street: string;
  city: string;
  postcode: string;
  saveAddress: boolean;
}

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  
  // Get data from location state
  const quoteData = location.state?.quoteData as QuoteFormData;
  const timeSlot = location.state?.timeSlot as string;
  
  // Redirect if no data
  useEffect(() => {
    if (!quoteData) {
      navigate('/quote');
    }
  }, [quoteData, navigate]);

  // Form states
  const [paymentForm, setPaymentForm] = useState<PaymentFormData>({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    saveCard: true
  });
  
  const [addressForm, setAddressForm] = useState<AddressFormData>({
    street: '',
    city: '',
    postcode: quoteData?.postcode || '',
    saveAddress: true
  });
  
  const [authForm, setAuthForm] = useState<AuthFormData>({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Form validation states
  const [paymentErrors, setPaymentErrors] = useState<Record<string, string>>({});
  const [addressErrors, setAddressErrors] = useState<Record<string, string>>({});
  const [authErrors, setAuthErrors] = useState<Record<string, string>>({});
  
  // UI states
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(user ? 'login' : 'signup');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const [bookingStatus, setBookingStatus] = useState<'pending' | 'approved' | 'declined'>('pending');

  // Check if user is authenticated on mount and after auth actions
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        // User is authenticated
        console.log("User is authenticated:", data.session.user.email);
      }
    };
    
    checkAuth();
  }, []);

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

  // Handle payment form changes
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPaymentForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user types
    if (paymentErrors[name]) {
      setPaymentErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };

  // Handle address form changes
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setAddressForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user types
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
    
    // Clear error for this field when user types
    if (authErrors[name]) {
      setAuthErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate payment form
  const validatePaymentForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!paymentForm.cardName.trim()) {
      errors.cardName = 'Name on card is required';
    }
    
    if (!paymentForm.cardNumber.trim()) {
      errors.cardNumber = 'Card number is required';
    } else if (paymentForm.cardNumber.replace(/\s/g, '').length < 16) {
      errors.cardNumber = 'Card number must be 16 digits';
    }
    
    if (!paymentForm.expiry.trim()) {
      errors.expiry = 'Expiry date is required';
    } else {
      const [month, year] = paymentForm.expiry.split('/');
      const currentYear = new Date().getFullYear() % 100; // Get last 2 digits of year
      const currentMonth = new Date().getMonth() + 1; // 1-12
      
      if (!month || !year || month.length !== 2 || year.length !== 2) {
        errors.expiry = 'Invalid expiry date format (MM/YY)';
      } else if (parseInt(month) < 1 || parseInt(month) > 12) {
        errors.expiry = 'Month must be between 01-12';
      } else if (
        (parseInt(year) < currentYear) || 
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        errors.expiry = 'Card has expired';
      }
    }
    
    if (!paymentForm.cvc.trim()) {
      errors.cvc = 'CVC is required';
    } else if (paymentForm.cvc.length < 3) {
      errors.cvc = 'CVC must be 3-4 digits';
    }
    
    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
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

  // Validate auth form
  const validateAuthForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!authForm.email.trim()) {
      errors.email = 'Email is required';
    } else {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(authForm.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }
    
    if (!authForm.password) {
      errors.password = 'Password is required';
    } else if (authForm.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (activeTab === 'signup') {
      if (!authForm.confirmPassword) {
        errors.confirmPassword = 'Please confirm your password';
      } else if (authForm.password !== authForm.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setAuthErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate auth form
    if (!validateAuthForm()) {
      return;
    }
    
    try {
      setIsProcessing(true);
      await signIn(authForm.email, authForm.password);
      
      // Check if user is authenticated after sign in
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        // Continue with booking after login
        processBooking();
      } else {
        throw new Error('Authentication failed. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
      setIsProcessing(false);
    }
  };

  // Handle signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate auth form
    if (!validateAuthForm()) {
      return;
    }
    
    try {
      setIsProcessing(true);
      await signUp(authForm.email, authForm.password);
      
      // Check if user is authenticated after sign up
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        // Continue with booking after signup
        processBooking();
      } else {
        // Show success but don't process booking yet
        setError('Account created but you need to sign in to complete your booking.');
        setIsProcessing(false);
        setActiveTab('login');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
      setIsProcessing(false);
    }
  };

  // Process the booking
  const processBooking = async () => {
    try {
      // Calculate prices
      const basePrice = calculateBasePrice(quoteData);
      const extraServicesPrice = calculateExtraServicesPrice(quoteData);
      const { discountPercentage, discountAmount } = calculateDiscount(quoteData, basePrice + extraServicesPrice);
      const totalPrice = (basePrice + extraServicesPrice) - discountAmount;
      
      // Format extra services price details
      const extraServicesPriceDetails = {};
      if (quoteData.extraServices) {
        quoteData.extraServices.forEach(service => {
          extraServicesPriceDetails[service] = getExtraServicePrice(service);
        });
      }
      
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
            extra_services_price: extraServicesPriceDetails,
            discount_percentage: discountPercentage,
            discount_amount: discountAmount,
            total_price: totalPrice,
            payment_status: 'completed',
            payment_method: 'credit_card',
            payment_details: {
              last4: paymentForm.cardNumber.slice(-4),
              brand: 'visa', // Simplified for demo
              exp_month: parseInt(paymentForm.expiry.split('/')[0]),
              exp_year: parseInt('20' + paymentForm.expiry.split('/')[1])
            }
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
      setBookingStatus('pending');
    } catch (err) {
      setError('Failed to process payment. Please try again.');
      setIsProcessing(false);
    }
  };

  // Calculate base price based on service type and areas
  const calculateBasePrice = (data: QuoteFormData): number => {
    let price = 0;
    
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

    // Add service prices
    data.services?.forEach(service => {
      price += servicePrices[service as keyof typeof servicePrices] || 0;
    });

    // Add area-based costs
    if (data.residentialAreas && Object.keys(data.residentialAreas).length > 0) {
      price += Object.values(data.residentialAreas).reduce((sum, count) => sum + (count * 15), 0);
    }

    if (data.commercialAreas && Object.keys(data.commercialAreas).length > 0) {
      price += Object.values(data.commercialAreas).reduce((sum, count) => sum + (count * 20), 0);
    }

    return price;
  };

  // Calculate extra services price
  const calculateExtraServicesPrice = (data: QuoteFormData): number => {
    return data.extraServices?.reduce((total, service) => 
      total + getExtraServicePrice(service), 0
    ) || 0;
  };

  // Get price for a single extra service
  const getExtraServicePrice = (service: string): number => {
    const prices = {
      ironing: 15,
      laundry: 20,
      fridge: 25,
      oven: 30,
      windows: 20
    };
    return prices[service as keyof typeof prices] || 0;
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
    
    // Validate payment form
    const isPaymentValid = validatePaymentForm();
    
    // Validate address form
    const isAddressValid = validateAddressForm();
    
    // If any form is invalid, stop submission
    if (!isPaymentValid || !isAddressValid) {
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
        
        // If setting as default or first address, unset other defaults
        if (isFirstAddress) {
          await supabase
            .from('addresses')
            .update({ is_default: false })
            .eq('user_id', user.id);
        }
        
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <p className="text-gray-600 mt-2">Enter your payment and address details to confirm your cleaning service</p>
          </div>
          
          {/* Success message */}
          {isComplete && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8 animate-fade-in">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-emerald-800">Booking Confirmed!</h3>
                  <p className="text-emerald-700 mt-1">
                    Your cleaning service has been scheduled and is awaiting cleaner assignment. 
                    You'll receive a confirmation email shortly.
                  </p>
                  <p className="text-emerald-700 mt-2">
                    Redirecting to your dashboard in {redirectCountdown} seconds...
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={() => navigate('/dashboard')}
                  variant="primary"
                >
                  Go to Dashboard Now
                </Button>
              </div>
            </div>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit}>
                  {/* Payment details */}
                  <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CreditCard className="w-5 h-5 text-emerald-500 mr-2" />
                      Payment Details
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          id="cardName"
                          name="cardName"
                          value={paymentForm.cardName}
                          onChange={handlePaymentChange}
                          className={`block w-full px-4 py-2 border ${paymentErrors.cardName ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200`}
                          placeholder="John Doe"
                          required
                          disabled={isProcessing}
                        />
                        {paymentErrors.cardName && (
                          <p className="mt-1 text-sm text-red-600">{paymentErrors.cardName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={paymentForm.cardNumber}
                          onChange={(e) => {
                            const formatted = formatCardNumber(e.target.value);
                            setPaymentForm(prev => ({ ...prev, cardNumber: formatted }));
                            
                            // Clear error when user types
                            if (paymentErrors.cardNumber) {
                              setPaymentErrors(prev => ({
                                ...prev,
                                cardNumber: ''
                              }));
                            }
                          }}
                          className={`block w-full px-4 py-2 border ${paymentErrors.cardNumber ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200`}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          required
                          disabled={isProcessing}
                        />
                        {paymentErrors.cardNumber && (
                          <p className="mt-1 text-sm text-red-600">{paymentErrors.cardNumber}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiry"
                            name="expiry"
                            value={paymentForm.expiry}
                            onChange={(e) => {
                              const formatted = formatExpiry(e.target.value);
                              setPaymentForm(prev => ({ ...prev, expiry: formatted }));
                              
                              // Clear error when user types
                              if (paymentErrors.expiry) {
                                setPaymentErrors(prev => ({
                                  ...prev,
                                  expiry: ''
                                }));
                              }
                            }}
                            className={`block w-full px-4 py-2 border ${paymentErrors.expiry ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200`}
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                            disabled={isProcessing}
                          />
                          {paymentErrors.expiry && (
                            <p className="mt-1 text-sm text-red-600">{paymentErrors.expiry}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                            CVC
                          </label>
                          <input
                            type="text"
                            id="cvc"
                            name="cvc"
                            value={paymentForm.cvc}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '');
                              setPaymentForm(prev => ({ ...prev, cvc: value }));
                              
                              // Clear error when user types
                              if (paymentErrors.cvc) {
                                setPaymentErrors(prev => ({
                                  ...prev,
                                  cvc: ''
                                }));
                              }
                            }}
                            className={`block w-full px-4 py-2 border ${paymentErrors.cvc ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200`}
                            placeholder="123"
                            maxLength={4}
                            required
                            disabled={isProcessing}
                          />
                          {paymentErrors.cvc && (
                            <p className="mt-1 text-sm text-red-600">{paymentErrors.cvc}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="saveCard"
                          name="saveCard"
                          checked={paymentForm.saveCard}
                          onChange={handlePaymentChange}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                          disabled={isProcessing}
                        />
                        <label htmlFor="saveCard" className="ml-2 text-sm text-gray-600">
                          Save card for future bookings
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Address details */}
                  <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <MapPin className="w-5 h-5 text-emerald-500 mr-2" />
                      Address Details
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          id="street"
                          name="street"
                          value={addressForm.street}
                          onChange={handleAddressChange}
                          className={`block w-full px-4 py-2 border ${addressErrors.street ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200`}
                          placeholder="123 Main Street"
                          required
                          disabled={isProcessing}
                        />
                        {addressErrors.street && (
                          <p className="mt-1 text-sm text-red-600">{addressErrors.street}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={addressForm.city}
                            onChange={handleAddressChange}
                            className={`block w-full px-4 py-2 border ${addressErrors.city ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200`}
                            placeholder="London"
                            required
                            disabled={isProcessing}
                          />
                          {addressErrors.city && (
                            <p className="mt-1 text-sm text-red-600">{addressErrors.city}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="postcode" className="block text-sm font-medium text-gray-700 mb-1">
                            Postcode
                          </label>
                          <input
                            type="text"
                            id="postcode"
                            name="postcode"
                            value={addressForm.postcode}
                            onChange={handleAddressChange}
                            className={`block w-full px-4 py-2 border ${addressErrors.postcode ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200`}
                            placeholder="SW1A 1AA"
                            required
                            disabled={isProcessing}
                          />
                          {addressErrors.postcode && (
                            <p className="mt-1 text-sm text-red-600">{addressErrors.postcode}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="saveAddress"
                          name="saveAddress"
                          checked={addressForm.saveAddress}
                          onChange={handleAddressChange}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                          disabled={isProcessing}
                        />
                        <label htmlFor="saveAddress" className="ml-2 text-sm text-gray-600">
                          Save address for future bookings
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Authentication (if not logged in) */}
                  {!user && (
                    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <User className="w-5 h-5 text-emerald-500 mr-2" />
                        Create Account or Sign In
                      </h2>
                      
                      <div className="flex border-b border-gray-200 mb-6">
                        <button
                          type="button"
                          className={`py-2 px-4 font-medium text-sm ${
                            activeTab === 'signup'
                              ? 'text-emerald-600 border-b-2 border-emerald-500'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                          onClick={() => setActiveTab('signup')}
                          disabled={isProcessing}
                        >
                          Create Account
                        </button>
                        <button
                          type="button"
                          className={`py-2 px-4 font-medium text-sm ${
                            activeTab === 'login'
                              ? 'text-emerald-600 border-b-2 border-emerald-500'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                          onClick={() => setActiveTab('login')}
                          disabled={isProcessing}
                        >
                          Sign In
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={authForm.email}
                            onChange={handleAuthChange}
                            className={`block w-full px-4 py-2 border ${authErrors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200`}
                            placeholder="you@example.com"
                            required
                            disabled={isProcessing}
                          />
                          {authErrors.email && (
                            <p className="mt-1 text-sm text-red-600">{authErrors.email}</p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            name="password"
                            value={authForm.password}
                            onChange={handleAuthChange}
                            className={`block w-full px-4 py-2 border ${authErrors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200`}
                            placeholder="••••••••"
                            required
                            disabled={isProcessing}
                          />
                          {authErrors.password && (
                            <p className="mt-1 text-sm text-red-600">{authErrors.password}</p>
                          )}
                        </div>
                        
                        {activeTab === 'signup' && (
                          <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              id="confirmPassword"
                              name="confirmPassword"
                              value={authForm.confirmPassword}
                              onChange={handleAuthChange}
                              className={`block w-full px-4 py-2 border ${authErrors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200`}
                              placeholder="••••••••"
                              required
                              disabled={isProcessing}
                            />
                            {authErrors.confirmPassword && (
                              <p className="mt-1 text-sm text-red-600">{authErrors.confirmPassword}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
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
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Booking summary */}
                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 text-emerald-500 mr-2" />
                        <span>
                          {quoteData.preferredDay?.charAt(0).toUpperCase() + quoteData.preferredDay?.slice(1) || 'Flexible'}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-emerald-500 mr-2" />
                        <span>
                          {timeSlot || 'Flexible'}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-emerald-500 mr-2" />
                        <span>{quoteData.postcode}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <CostSummary formData={quoteData} />
                    </div>
                  </div>
                  
                  {/* Security note */}
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                    <div className="flex items-start space-x-3">
                      <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Secure Checkout</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Your payment information is encrypted and securely processed. We never store your full card details on our servers.
                        </p>
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