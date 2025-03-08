import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { AuthForm } from '../components/auth/AuthForm';
import { useAuth } from '../hooks/useAuth';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check for success message in location state
  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await signIn(email, password);
      
      // Check if there's a redirect path in location state
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while signing in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);
    try {
      await signInWithGoogle();
      // Navigation is handled after OAuth redirect
    } catch (err: any) {
      setError('Unable to sign in with Google. Please try again.');
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
        
        <div className="flex-1 flex items-center justify-center py-12">
          <div className="max-w-md w-full">
            {/* Success message */}
            {successMessage && (
              <div className="mb-6 p-4 rounded-lg bg-emerald-50 text-emerald-700">
                {successMessage}
              </div>
            )}
            
            {/* Error message */}
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 flex items-start">
                <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}
            
            <AuthForm
              type="login"
              onSubmit={handleSubmit}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              error={error}
              isLoading={isLoading}
              onGoogleClick={handleGoogleSignIn}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}