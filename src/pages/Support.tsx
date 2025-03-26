import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Clock, Phone, Mail, MapPin, Shield, Star, CheckCircle2 } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { SupportFAQ } from '../components/support/SupportFAQ';
import { ContactForm } from '../components/support/ContactForm';
import { LiveChat } from '../components/support/LiveChat';

export function Support() {
  const navigate = useNavigate();
  
  const handleGetQuote = () => {
    navigate('/quote');
  };

  return (
    <MainLayout onGetQuote={handleGetQuote}>
      <div className="min-h-screen bg-gray-50 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back</span>
          </button>

          {/* Header Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-900">How can we help you today?</h1>
              <p className="text-gray-500 mt-2">
                Get quick answers from our FAQ, chat with our support team, or send us a message
              </p>
            </div>

            {/* Support Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="bg-emerald-50 rounded-xl p-4 flex items-start space-x-4">
                <div className="bg-white rounded-lg p-2">
                  <MessageSquare className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Live Chat Support</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Chat with our team for immediate assistance
                  </p>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-4 flex items-start space-x-4">
                <div className="bg-white rounded-lg p-2">
                  <Clock className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Support Hours</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Mon-Fri, 9 AM - 5 PM GMT
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2 space-y-6">
              <ContactForm />
              <SupportFAQ />
            </div>

            {/* Sidebar - Right Side */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-emerald-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">+44 (0) 20 1234 5678</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-emerald-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">support@mycrew.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-emerald-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">123 Cleaning Street<br />London, SW1A 1AA</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Why Choose Us</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 text-emerald-500 mr-3 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Trusted Service</p>
                      <p className="text-sm text-gray-600">All our cleaners are vetted and insured</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Star className="w-5 h-5 text-emerald-500 mr-3 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Rated 4.9/5</p>
                      <p className="text-sm text-gray-600">Based on 10,000+ reviews</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 mt-1" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Satisfaction Guaranteed</p>
                      <p className="text-sm text-gray-600">100% satisfaction or your money back</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Hours */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Support Hours</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="text-gray-900">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="text-gray-900">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="text-gray-900">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Chat Widget */}
          <LiveChat />
        </div>
      </div>
    </MainLayout>
  );
}