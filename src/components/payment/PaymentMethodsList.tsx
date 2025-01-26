import React from 'react';
import { CreditCard, Trash2, Star, StarOff } from 'lucide-react';

// Mock data - replace with actual data from your backend
const mockPaymentMethods = [
  {
    id: '1',
    type: 'visa',
    last4: '4242',
    expMonth: 12,
    expYear: 2024,
    isDefault: true
  },
  {
    id: '2',
    type: 'mastercard',
    last4: '8888',
    expMonth: 3,
    expYear: 2025,
    isDefault: false
  }
];

export function PaymentMethodsList() {
  const getCardIcon = (type: string) => {
    return `https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat/${type.toLowerCase()}.svg`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
      {mockPaymentMethods.map((method) => (
        <div
          key={method.id}
          className="p-6 hover:bg-gray-50 transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-8 flex items-center justify-center">
                <img
                  src={getCardIcon(method.type)}
                  alt={`${method.type} card`}
                  className="h-8 w-auto"
                />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-medium text-gray-900">
                    •••• {method.last4}
                  </p>
                  {method.isDefault && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-0.5">
                  Expires {method.expMonth}/{method.expYear}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {!method.isDefault && (
                <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors duration-200">
                  <Star className="w-5 h-5" />
                </button>
              )}
              <button className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}