import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const navigate = useNavigate();
  const { user, signIn, signUp, signOut, signInWithGoogle } = useAuthStore();

  const handleSignIn = useCallback(async (email: string, password: string) => {
    try {
      await signIn(email, password);
      navigate('/');
    } catch (error) {
      throw error;
    }
  }, [signIn, navigate]);

  const handleSignUp = useCallback(async (email: string, password: string) => {
    try {
      await signUp(email, password);
      navigate('/login');
    } catch (error) {
      throw error;
    }
  }, [signUp, navigate]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      throw error;
    }
  }, [signOut, navigate]);

  const handleGoogleSignIn = useCallback(async () => {
    try {
      await signInWithGoogle();
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