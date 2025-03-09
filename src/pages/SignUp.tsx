import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { AuthForm } from '../components/auth/AuthForm';
import { useAuth } from '../hooks/useAuth';
import { testSupabaseConnection } from '../lib/supabase';

export function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      await signUp(email, password);
      // Navigate to login page with success message
      navigate('/login', { 
        state: { 
          successMessage: 'Account created successfully! Please sign in with your new credentials.' 
        } 
      });
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mt-8 flex items-center text-gray-600 hover:text-emerald-600 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back</span>
        </button>

        {connectionStatus && !connectionStatus.success && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
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

        <div className="flex-1 flex items-center justify-center py-12">
          <div className="max-w-md w-full">
            <AuthForm
              type="signup"
              onSubmit={handleSubmit}
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
    </MainLayout>
  );
}