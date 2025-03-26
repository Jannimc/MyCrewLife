import React, { useState, useCallback } from 'react';
import { MapPin, Plus, Pencil, Trash2, AlertCircle, X } from 'lucide-react';
import { AddressModal } from './AddressModal';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';

interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  postcode: string;
  isDefault: boolean;
}

export function AddressManager() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch addresses on mount
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('addresses')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setAddresses(data || []);
      } catch (err) {
        console.error('Error fetching addresses:', err);
        setError('Failed to load addresses');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, [user]);

  const handleAddNew = () => {
    setEditingAddress(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setShowDeleteConfirm(id);
  };

  const confirmDelete = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setAddresses(prev => prev.filter(addr => addr.id !== id));
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error('Error deleting address:', err);
      setError('Failed to delete address');
    }
  };

  const handleSave = async (addressData: Omit<Address, 'id'>) => {
    if (!user) return;

    try {
      setError(null);

      // Start a transaction if setting as default
      if (addressData.isDefault) {
        const { error: updateError } = await supabase
          .from('addresses')
          .update({ is_default: false })
          .eq('user_id', user.id);

        if (updateError) throw updateError;
      }

      if (editingAddress) {
        // Update existing address
        const { error: updateError } = await supabase
          .from('addresses')
          .update({
            label: addressData.label,
            street: addressData.street,
            city: addressData.city,
            postcode: addressData.postcode,
            is_default: addressData.isDefault,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingAddress.id)
          .eq('user_id', user.id);

        if (updateError) throw updateError;

        // Update local state
        setAddresses(prev => prev.map(addr =>
          addr.id === editingAddress.id
            ? { ...addressData, id: addr.id }
            : addressData.isDefault ? { ...addr, isDefault: false } : addr
        ));
      } else {
        // Add new address
        const { data, error: insertError } = await supabase
          .from('addresses')
          .insert({
            user_id: user.id,
            label: addressData.label,
            street: addressData.street,
            city: addressData.city,
            postcode: addressData.postcode,
            is_default: addressData.isDefault || addresses.length === 0 // Make first address default
          })
          .select()
          .single();

        if (insertError) throw insertError;

        // Update local state
        setAddresses(prev => [
          ...prev.map(addr => addressData.isDefault ? { ...addr, isDefault: false } : addr),
          data
        ]);
      }

      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving address:', err);
      setError('Failed to save address. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Saved Addresses</h2>
        <button
          onClick={handleAddNew}
          className="flex items-center text-sm text-emerald-600 hover:text-emerald-700"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add New
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
      <div className="space-y-4">
        {addresses.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No addresses saved yet. Click "Add New" to add your first address.
          </div>
        ) : (
          addresses.map((address) => (
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
                  <button
                    onClick={() => handleEdit(address)}
                    className="p-2 text-gray-400 hover:text-emerald-600 transition-colors duration-200 rounded-full hover:bg-emerald-50"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200 rounded-full hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      )}

      {/* Add/Edit Address Modal */}
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAddress(undefined);
        }}
        onSave={handleSave}
        address={editingAddress}
        title={editingAddress ? 'Edit Address' : 'Add New Address'}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 relative animate-fade-in">
            <button
              onClick={() => setShowDeleteConfirm(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Address</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this address? This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
              >
                Delete Address
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}