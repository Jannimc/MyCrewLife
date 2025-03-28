import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (e: React.FormEvent) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  firstName?: string;
  setFirstName?: (value: string) => void;
  lastName?: string;
  setLastName?: (value: string) => void;
  phone?: string;
  setPhone?: (value: string) => void;
  confirmPassword?: string;
  setConfirmPassword?: (value: string) => void;
  error?: string;
  isLoading: boolean;
  onGoogleClick: () => void;
}

/**
 * Reusable authentication form for login and signup
 */
export function AuthForm({
  type,
  onSubmit,
  email,
  setEmail,
  password,
  setPassword,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phone,
  setPhone,
  confirmPassword,
  setConfirmPassword,
  error,
  isLoading,
  onGoogleClick
}: AuthFormProps) {
  const isLogin = type === 'login';

  return (
    <>
      {/* Form Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {isLogin ? 'Welcome back' : 'Create your account'}
        </h2>
        <p className="text-gray-600">
          {isLogin 
            ? 'Sign in to manage your cleaning services'
            : 'Join MyCrew and find your perfect cleaner'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-6">
        {type === 'signup' && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                value={firstName || ''}
                onChange={(e) => setFirstName?.(e.target.value)}
                placeholder="John"
                required
              />
              <Input
                label="Last Name"
                type="text"
                value={lastName || ''}
                onChange={(e) => setLastName?.(e.target.value)}
                placeholder="Doe"
                required
              />
            </div>
            
            <Input
              label="Phone Number"
              type="tel"
              value={phone || ''}
              onChange={(e) => setPhone?.(e.target.value)}
              placeholder="+44 123 456 7890"
              required
            />
          </>
        )}

        <Input
          label="Email address"
          type="email"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />

        <Input
          label="Password"
          type="password"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        {!isLogin && setConfirmPassword && (
          <Input
            label="Confirm Password"
            type="password"
            icon={Lock}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        )}

        {isLogin && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-emerald-600 hover:text-emerald-700">
                Forgot password?
              </Link>
            </div>
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

        <Button
          type="submit"
          isLoading={isLoading}
          fullWidth
        >
          {isLogin ? 'Sign in' : 'Create account'}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
          </div>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={onGoogleClick}
          fullWidth
        >
          <img
            src="https://www.google.com/favicon.ico"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Google
        </Button>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link
              to={isLogin ? "/signup" : "/login"}
              className="font-medium text-emerald-600 hover:text-emerald-700"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </Link>
          </p>
        </div>
      </form>

      {!isLogin && (
        <div className="mt-8 text-center text-sm text-gray-500">
          By signing up, you agree to our{' '}
          <Link to="/terms" className="text-emerald-600 hover:text-emerald-700">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-emerald-600 hover:text-emerald-700">
            Privacy Policy
          </Link>
        </div>
      )}
    </>
  );
}