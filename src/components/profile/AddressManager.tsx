import React, { useState } from 'react';
import { MapPin, Plus, Pencil, Trash2 } from 'lucide-react';

interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  postcode: string;
  isDefault: boolean;
}

export function AddressManager() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      label: 'Home',
      street: '123 Main Street',
      city: 'London',
      postcode: 'SW1A 1AA',
      isDefault: true
    }
  ]);
  const [isAddingNew, setIsAddingNew] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Saved Addresses</h2>
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center text-sm text-emerald-600 hover:text-emerald-700"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add New
        </button>
      </div>

      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="relative group border border-gray-200 rounded-lg p-4 hover:border-emerald-200 transition-colors duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-medium text-gray-900">{address.label}</h3>
                    {address.isDefault && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{address.street}</p>
                  <p className="text-sm text-gray-600">{address.city}, {address.postcode}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button className="p-1 text-gray-400 hover:text-emerald-600 transition-colors duration-200">
                  <Pencil className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}