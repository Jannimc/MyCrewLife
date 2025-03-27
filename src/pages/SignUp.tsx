import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { PageLayout } from '../components/layout/PageLayout';
import { AuthForm } from '../components/auth/AuthForm';
import { useAuth } from '../hooks/useAuth';
import { testSupabaseConnection } from '../lib/supabase';

export function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{success: boolean, message: string} | null>(null);
  const { signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Test Supabase connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      const result = await testSupabaseConnection();
      setConnectionStatus(result);
      
      if (!result.success) {
        console.error('Supabase connection test failed:', result);
      }
    };
    
    checkConnection();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate required fields
    if (!firstName?.trim()) {
      setError('Please enter your first name');
      setIsLoading(false);
      return;
    }

    if (!lastName?.trim()) {
      setError('Please enter your last name');
      setIsLoading(false);
      return;
    }

    if (!phone?.trim()) {
      setError('Please enter your phone number');
      setIsLoading(false);
      return;
    }

    // Check Supabase connection first
    if (connectionStatus && !connectionStatus.success) {
      setError('Cannot connect to authentication service. Please try again later or contact support.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      await signUp(email, password, {
        data: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          phone: phone
        }
      });
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    // Check Supabase connection first
    if (connectionStatus && !connectionStatus.success) {
      setError('Cannot connect to authentication service. Please try again later or contact support.');
      return;
    }

    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError(err instanceof Error ? err.message : 'Failed to sign up with Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back</span>
          </button>

        <div className="flex-1 flex items-center justify-center">
          {connectionStatus && !connectionStatus.success && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-amber-800">Supabase Connection Issue</h3>
                  <p className="mt-1 text-sm text-amber-700">
                    There seems to be an issue connecting to our authentication service. 
                    Please make sure you've connected to Supabase using the "Connect to Supabase" button in the top right corner.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="max-w-md w-full">
            <AuthForm
              type="signup"
              onSubmit={handleSubmit}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              phone={phone}
              setPhone={setPhone}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              error={error}
              isLoading={isLoading}
              onGoogleClick={handleGoogleSignUp}
            />
          </div>
        </div>
        </div>
      </div>
    </MainLayout>
  );
}