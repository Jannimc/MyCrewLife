import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

/**
 * Hook for authentication functionality
 * Provides methods for sign in, sign up, sign out, and Google sign in
 */
export function useAuth() {
  const navigate = useNavigate();
  const { user, signIn, signUp, signOut, signInWithGoogle } = useAuthStore();

  // Handle sign in with email and password
  const handleSignIn = useCallback(async (email: string, password: string) => {
    try {
      await signIn(email, password);
      return true;
    } catch (error) {
      throw error;
    }
  }, [signIn]);

  // Handle sign up with email and password
  const handleSignUp = useCallback(async (email: string, password: string) => {
    try {
      await signUp(email, password);
      return true;
    } catch (error) {
      throw error;
    }
  }, [signUp]);

  // Handle sign out
  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      throw error;
    }
  }, [signOut, navigate]);

  // Handle Google sign in
  const handleGoogleSignIn = useCallback(async () => {
    try {
      await signInWithGoogle();
      // Navigation happens automatically after OAuth redirect
    } catch (error) {
      throw error;
    }
  }, [signInWithGoogle]);

  return {
    user,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    signInWithGoogle: handleGoogleSignIn,
    isAuthenticated: !!user
  };
}