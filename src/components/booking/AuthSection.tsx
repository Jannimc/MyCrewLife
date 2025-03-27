import React from 'react';
import { User, AlertCircle } from 'lucide-react';
import { FormInput } from '../common/FormInput';

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
              <FormInput
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name || ''}
                onChange={onChange}
                placeholder="John"
                required
                isProcessing={isProcessing}
                label="First Name"
                error={errors.first_name}
              />
            </div>

            <div>
              <FormInput
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name || ''}
                onChange={onChange}
                placeholder="Doe"
                required
                isProcessing={isProcessing}
                label="Last Name"
                error={errors.last_name}
              />
            </div>

          <div>
            <FormInput
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone || ''}
              onChange={onChange}
              placeholder="+44 123 456 7890"
              required
              isProcessing={isProcessing}
              label="Phone Number"
              error={errors.phone}
            />
          </div>
          </>
        )}

        {activeTab === 'guest' && (
          <>
            <div>
              <FormInput
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={onChange}
                placeholder="John Doe"
                required
                isProcessing={isProcessing}
                label="Full Name"
                error={errors.name}
              />
            </div>

          <div>
            <FormInput
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              placeholder="+44 123 456 7890"
              required
              isProcessing={isProcessing}
              label="Phone Number"
              error={errors.phone}
            />
          </div>
            
          </>
        )}
        
        <div>
          <FormInput
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="you@example.com"
            required
            isProcessing={isProcessing}
            label="Email Address"
            error={errors.email}
          />
        </div>
        
        {activeTab !== 'guest' && <div>
          <FormInput
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            placeholder="••••••••"
            required
            isProcessing={isProcessing}
            label="Password"
            error={errors.password}
          />
        </div>}
        
        {activeTab === 'signup' && (
          <div>
            <FormInput
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChange}
              placeholder="••••••••"
              required
              isProcessing={isProcessing}
              label="Confirm Password"
              error={errors.confirmPassword}
            />
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