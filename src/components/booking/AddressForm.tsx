import React from 'react';
import { MapPin } from 'lucide-react';

interface AddressFormData {
  street: string;
  city: string;
  postcode: string;
  saveAddress: boolean;
}

interface AddressFormProps {
  formData: AddressFormData;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isProcessing: boolean;
}

export function AddressForm({ formData, errors, onChange, isProcessing }: AddressFormProps) {
  return (
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
            value={formData.street}
            onChange={onChange}
            className={`block w-full px-4 py-2 border ${errors.street ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200`}
            placeholder="123 Main Street"
            required
            disabled={isProcessing}
          />
          {errors.street && (
            <p className="mt-1 text-sm text-red-600">{errors.street}</p>
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
              value={formData.city}
              onChange={onChange}
              className={`block w-full px-4 py-2 border ${errors.city ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200`}
              placeholder="London"
              required
              disabled={isProcessing}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city}</p>
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
              value={formData.postcode}
              onChange={onChange}
              className={`block w-full px-4 py-2 border ${errors.postcode ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200`}
              placeholder="SW1A 1AA"
              required
              disabled={isProcessing}
            />
            {errors.postcode && (
              <p className="mt-1 text-sm text-red-600">{errors.postcode}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="saveAddress"
            name="saveAddress"
            checked={formData.saveAddress}
            onChange={onChange}
            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            disabled={isProcessing}
          />
          <label htmlFor="saveAddress" className="ml-2 text-sm text-gray-600">
            Save address for future bookings
          </label>
        </div>
      </div>
    </div>
  );
}