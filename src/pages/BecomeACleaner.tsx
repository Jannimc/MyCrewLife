import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { MainLayout } from '../components/layout/MainLayout';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Header } from '../components/cleaner/Header';
import { QuickInfo } from '../components/cleaner/QuickInfo';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
  experience: string;
  availability: string[];
  preferredAreas: string[];
  hasTransport: boolean;
  rightToWork: boolean;
  criminalRecord: boolean;
  references: boolean;
  about: string;
  resume: File | null;
}

export function BecomeACleaner() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    experience: '',
    availability: [],
    preferredAreas: [],
    hasTransport: false,
    rightToWork: false,
    criminalRecord: false,
    references: false,
    about: '',
    resume: null
  });

  const availabilityOptions = [
    'Weekday mornings',
    'Weekday afternoons',
    'Weekday evenings',
    'Weekend mornings',
    'Weekend afternoons',
    'Weekend evenings'
  ];

  const areaOptions = [
    'North London',
    'South London',
    'East London',
    'West London',
    'Central London'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    let error = null;
    
    if (!user) {
      navigate('/login', { state: { from: '/become-cleaner' } });
      return;
    }

    try {
      // Validate required fields
      if (formData.availability.length === 0) {
        throw new Error('Please select at least one availability option');
      }
      if (formData.preferredAreas.length === 0) {
        throw new Error('Please select at least one preferred area');
      }

      // Submit application to Supabase
      const { error: submitError } = await supabase
        .from('cleaner_applications')
        .insert({
          user_id: user?.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postcode: formData.postcode,
          experience: formData.experience,
          availability: formData.availability,
          preferred_areas: formData.preferredAreas,
          has_transport: formData.hasTransport,
          right_to_work: formData.rightToWork,
          criminal_record: formData.criminalRecord,
          has_references: formData.references,
          about: formData.about
        });

      if (submitError) throw submitError;

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 pt-6">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h2>
              <p className="text-gray-600 mb-8">
                Thank you for your interest in joining MyCrew. Our team will review your application and get back to you within 2-3 business days.
              </p>
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity duration-200"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="relative">
        {/* Back button */}
        <div className="absolute top-6 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back</span>
          </button>
          </div>
        </div>

        {/* Header */}
        <Header />

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Application form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Address</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                        <input
                          type="text"
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                          <input
                            type="text"
                            required
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
                          <input
                            type="text"
                            required
                            value={formData.postcode}
                            onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Experience</h2>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Previous Cleaning Experience</label>
                      <textarea
                        required
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        rows={4}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Please describe your cleaning experience..."
                      />
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Availability</h2>
                    <div className="space-y-2">
                      {availabilityOptions.map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.availability.includes(option)}
                            onChange={(e) => {
                              const newAvailability = e.target.checked
                                ? [...formData.availability, option]
                                : formData.availability.filter(item => item !== option);
                              setFormData({ ...formData, availability: newAvailability });
                            }}
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Areas */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Preferred Areas</h2>
                    <div className="space-y-2">
                      {areaOptions.map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.preferredAreas.includes(option)}
                            onChange={(e) => {
                              const newAreas = e.target.checked
                                ? [...formData.preferredAreas, option]
                                : formData.preferredAreas.filter(item => item !== option);
                              setFormData({ ...formData, preferredAreas: newAreas });
                            }}
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          required
                          checked={formData.hasTransport}
                          onChange={(e) => setFormData({ ...formData, hasTransport: e.target.checked })}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-gray-700">I have reliable transport</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          required
                          checked={formData.rightToWork}
                          onChange={(e) => setFormData({ ...formData, rightToWork: e.target.checked })}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-gray-700">I have the right to work in the UK</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          required
                          checked={formData.criminalRecord}
                          onChange={(e) => setFormData({ ...formData, criminalRecord: e.target.checked })}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-gray-700">I agree to undergo a criminal record check</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          required
                          checked={formData.references}
                          onChange={(e) => setFormData({ ...formData, references: e.target.checked })}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-gray-700">I can provide two professional references</span>
                      </label>
                    </div>
                  </div>

                  {/* About You */}
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">About You</h2>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tell us why you'd be a great addition to our team</label>
                      <textarea
                        required
                        value={formData.about}
                        onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                        rows={4}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Share your motivation, relevant skills, and what makes you stand out..."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                          Submitting...
                        </div>
                      ) : (
                        'Submit Application'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <QuickInfo />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}