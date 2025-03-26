import { create } from 'zustand';
import { User, AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * Zustand store for authentication state and methods
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  
  // Set the current user
  setUser: (user) => set({ user }),
  
  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    // Input validation
    if (!email || !password) {
      throw new Error('Please enter both email and password');
    }

    if (!validateEmail(email)) {
      throw new Error('Please enter a valid email address');
    }

    if (!validatePassword(password)) {
      throw new Error('Password must be at least 6 characters long');
    }

    try {
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      }).catch(() => ({
        error: new Error('Unable to connect to authentication service'),
        data: { user: null, session: null }
      }));
      
<<<<<<< HEAD
      const { error: signInError, data } = response;
      
      if (signInError) {
        // Handle specific error cases
        const message = signInError instanceof Error ? signInError.message : '';
        switch (message) {
          case 'Invalid login credentials':
            throw new Error('Invalid email or password');
          case 'Email not confirmed':
            throw new Error('Please verify your email address before signing in');
          default:
            throw new Error(message || 'Unable to sign in. Please try again.');
        }
      }
      
      if (!data.user) {
        throw new Error('No user data received');
=======
      if (error) {
        if (error.message === 'Invalid login credentials') {
          throw new Error('The email or password you entered is incorrect');
        }
        if (error.message.includes('Failed to fetch')) {
          throw new Error('Unable to connect to authentication service. Please check your internet connection and try again.');
        }
        throw error;
      }
      
      if (data.user) {
        set({ user: data.user });
>>>>>>> 7249e5a810fa2fa4154e67656d1b1489b80295e8
      }

      set({ user: data.user });
    } catch (error) {
      // Throw a user-friendly error without logging to console
      throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  },

  // Sign in with Google OAuth
  signInWithGoogle: async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          }
        },
      });
      
      if (error) {
<<<<<<< HEAD
        throw new Error('Unable to sign in with Google. Please try again.');
=======
        if (error.message.includes('Failed to fetch')) {
          throw new Error('Unable to connect to authentication service. Please check your internet connection and try again.');
        }
        throw error;
>>>>>>> 7249e5a810fa2fa4154e67656d1b1489b80295e8
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  },

  // Sign up with email and password
  signUp: async (email: string, password: string) => {
    // Input validation
    if (!email || !password) {
      throw new Error('Please enter both email and password');
    }

    if (!validateEmail(email)) {
      throw new Error('Please enter a valid email address');
    }

    if (!validatePassword(password)) {
      throw new Error('Password must be at least 6 characters long');
    }

    try {
<<<<<<< HEAD
      let response;
      try {
        response = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            data: {
              email_confirm: true
            }
=======
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            email_confirm: true
>>>>>>> 7249e5a810fa2fa4154e67656d1b1489b80295e8
          }
        });
      } catch (e) {
        // Silently handle network errors
        throw new Error('Unable to connect to authentication service. Please try again.');
      }
      
<<<<<<< HEAD
      const { error: signUpError, data } = response;
      
      if (signUpError) {
        // Handle specific signup errors
        switch (signUpError.message) {
          case 'User already registered':
            throw new Error('An account with this email already exists');
          case 'Password is too short':
            throw new Error('Password must be at least 6 characters long');
          case 'Unable to validate email address: invalid format':
            throw new Error('Please enter a valid email address');
          default:
            throw new Error('Unable to create account. Please try again.');
        }
=======
      if (error) {
        if (error.message.includes('Failed to fetch')) {
          throw new Error('Unable to connect to authentication service. Please check your internet connection and try again.');
        }
        throw error;
>>>>>>> 7249e5a810fa2fa4154e67656d1b1489b80295e8
      }
      
      if (data.user) {
<<<<<<< HEAD
        try {
          let signInResponse;
          try {
            signInResponse = await supabase.auth.signInWithPassword({
              email,
              password
            });
          } catch (e) {
            // Silently handle network errors during auto-login
            return;
          }
          
          const { error: signInError, data: signInData } = signInResponse;
          
          if (signInError) {
            // Don't throw, just return - user can sign in manually
            return;
          }

          if (signInData.user) {
            set({ user: signInData.user });
          }
        } catch (error) {
          // Don't throw on auto-login failure, let user sign in manually
          return;
=======
        const { error: signInError, data: signInData } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (signInError) {
          console.error('Auto sign in after signup failed:', signInError);
        } else if (signInData.user) {
          set({ user: signInData.user });
>>>>>>> 7249e5a810fa2fa4154e67656d1b1489b80295e8
        }
      }
    } catch (error) {
      // Don't log to console, just throw the error
      throw error instanceof Error ? error : new Error('An unexpected error occurred');
    }
  },

  // Sign out the current user
  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
<<<<<<< HEAD
      
      if (error) {
        throw new Error('Unable to sign out. Please try again.');
      }
      
=======
      if (error) {
        if (error.message.includes('Failed to fetch')) {
          throw new Error('Unable to connect to authentication service. Please check your internet connection and try again.');
        }
        throw error;
      }
>>>>>>> 7249e5a810fa2fa4154e67656d1b1489b80295e8
      set({ user: null });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('An unexpected error occurred');
      }
    }
  },
}));