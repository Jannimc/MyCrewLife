import React from 'react';
import { User, AlertCircle } from 'lucide-react';

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  phone?: string;
}

interface AuthSectionProps {
  activeTab: 'login' | 'signup' | 'guest';
  setActiveTab: (tab: 'login' | 'signup' | 'guest') => void;
  formData: AuthFormData;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isProcessing: boolean;
  error?: string;
}

export function AuthSection({
  activeTab,
  setActiveTab,
  formData,
  errors,
  onChange,
  isProcessing,
  error
}: AuthSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <User className="w-5 h-5 text-emerald-500 mr-2" />
        Continue Your Booking
      </h2>
      
      <div className="flex border-b border-gray-200 mb-6">
        <button
          type="button"
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'login'
              ? 'text-emerald-600 border-b-2 border-emerald-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('login')}
          disabled={isProcessing}
        >
          Sign In
        </button>
        <button
          type="button"
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'signup'
              ? 'text-emerald-600 border-b-2 border-emerald-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('signup')}
          disabled={isProcessing}
        >
          Create Account
        </button>
        <button
          type="button"
          className={`py-2 px-4 font-medium text-sm ${
            activeTab === 'guest'
              ? 'text-emerald-600 border-b-2 border-emerald-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('guest')}
          disabled={isProcessing}
        >
          Guest
        </button>
      </div>
      
      <div className="space-y-4">
        {activeTab === 'signup' && (
          <>
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name || ''}
                onChange={onChange}
                className={`block w-full px-4 py-2 border ${errors.first_name ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200`}
                placeholder="John"
                required
                disabled={isProcessing}
              />
              {errors.first_name && (
                <p className="mt-1 text-sm text-red-600">{errors.first_name}</p>
              )}
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name || ''}
                onChange={onChange}
                className={`block w-full px-4 py-2 border ${errors.last_name ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200`}
                placeholder="Doe"
                required
                disabled={isProcessing}
              />
              {errors.last_name && (
                <p className="mt-1 text-sm text-red-600">{errors.last_name}</p>
              )}
            </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone || ''}
              onChange={onChange}
              className={`block w-full px-4 py-2 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200`}
              placeholder="+44 123 456 7890"
              required
              disabled={isProcessing}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
          </>
        )}

        {activeTab === 'guest' && (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={onChange}
                className={`block w-full px-4 py-2 border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200`}
                placeholder="John Doe"
                required
                disabled={isProcessing}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              className={`block w-full px-4 py-2 border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200`}
              placeholder="+44 123 456 7890"
              required
              disabled={isProcessing}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
            
          </>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className={`block w-full px-4 py-2 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200`}
            placeholder="you@example.com"
            required
            disabled={isProcessing}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        
        {activeTab !== 'guest' && <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            className={`block w-full px-4 py-2 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200`}
            placeholder="••••••••"
            required
            disabled={isProcessing}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>}
        
        {activeTab === 'signup' && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChange}
              className={`block w-full px-4 py-2 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200`}
              placeholder="••••••••"
              required
              disabled={isProcessing}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
        )}
        
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}