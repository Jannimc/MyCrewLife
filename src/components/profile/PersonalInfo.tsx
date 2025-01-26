import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { User as UserIcon, Mail, Phone, Pencil, Check, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface PersonalInfoProps {
  user: User;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export function PersonalInfo({ user, isEditing, setIsEditing }: PersonalInfoProps) {
  const [formData, setFormData] = useState({
    fullName: user.user_metadata?.full_name || '',
    email: user.email || '',
    phone: user.user_metadata?.phone || ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        email: formData.email,
        data: {
          full_name: formData.fullName,
          phone: formData.phone
        }
      });

      if (updateError) throw updateError;
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center text-sm text-emerald-600 hover:text-emerald-700"
          >
            <Pencil className="w-4 h-4 mr-1" />
            Edit
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                disabled={!isEditing || isLoading}
                className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200 ${
                  isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing || isLoading}
                className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200 ${
                  isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing || isLoading}
                className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200 ${
                  isEditing ? 'border-gray-300' : 'border-transparent bg-gray-50'
                }`}
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                disabled={isLoading}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                <X className="w-4 h-4 mr-1" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                ) : (
                  <Check className="w-4 h-4 mr-1" />
                )}
                Save Changes
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}