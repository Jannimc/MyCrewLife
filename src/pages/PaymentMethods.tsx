import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, CreditCard, Lock } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { PaymentMethodsList } from '../components/payment/PaymentMethodsList';
import { AddPaymentForm } from '../components/payment/AddPaymentForm';

export function PaymentMethods() {
  const [isAddingNew, setIsAddingNew] = useState(false);
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

            {/* Payment Methods List or Add New Form */}
            {isAddingNew ? (
              <AddPaymentForm onCancel={() => setIsAddingNew(false)} />
            ) : (
              <PaymentMethodsList />
            )}

            {/* Security Note */}
            <div className="bg-emerald-50 rounded-2xl p-4">
              <div className="flex items-start space-x-3">
                <Lock className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-emerald-800">Secure Payment Processing</h3>
                  <p className="text-sm text-emerald-600 mt-1">
                    Your payment information is encrypted and securely stored. We never store your full card details on our servers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}