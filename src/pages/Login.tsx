import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { AuthForm } from '../components/auth/AuthForm';
import { useAuth } from '../hooks/useAuth';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

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
    } catch (err: any) {
      // Handle the error message from the auth store
      setError(err.message || 'An error occurred while signing in. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setError('Unable to sign in with Google. Please try again.');
      console.error('Google sign in error:', err);
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