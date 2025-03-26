import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, CreditCard, Lock, Shield, CheckCircle } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { PaymentMethodsList } from '../components/payment/PaymentMethodsList';
import { AddPaymentForm } from '../components/payment/AddPaymentForm';

export function PaymentMethods() {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 pt-8">
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
                  <h1 className="text-2xl font-bold text-gray-900">Payment Methods</h1>
                  <p className="text-sm text-gray-500 mt-1">Manage your saved payment options</p>
                </div>
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Card
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              {isAddingNew ? (
                <AddPaymentForm onCancel={() => setIsAddingNew(false)} />
              ) : (
                <PaymentMethodsList />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Security Info */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 text-emerald-500 mr-2" />
                  Payment Security
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Lock className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Encrypted Storage</p>
                      <p className="text-sm text-gray-600">Your card details are securely encrypted</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CreditCard className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">PCI Compliant</p>
                      <p className="text-sm text-gray-600">We follow strict security standards</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Automatic Updates</p>
                      <p className="text-sm text-gray-600">Card details are updated automatically</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Tips */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Tips</h2>
                <div className="space-y-3 text-gray-600">
                  <p>• Keep your default card up to date</p>
                  <p>• Remove unused payment methods</p>
                  <p>• Check expiry dates regularly</p>
                </div>
              </div>
              
              {/* Need Help */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h2>
                <p className="text-gray-600 mb-4">
                  Having trouble with payments? Our support team is here to help.
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