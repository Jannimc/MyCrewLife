import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Clock } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { SupportFAQ } from '../components/support/SupportFAQ';
import { ContactForm } from '../components/support/ContactForm';
import { LiveChat } from '../components/support/LiveChat';

export function Support() {
  const navigate = useNavigate();

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

            {/* FAQ Section */}
            <SupportFAQ />

            {/* Contact Form */}
            <ContactForm />

            {/* Live Chat Widget */}
            <LiveChat />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}