import { create } from 'zustand';
import { User, AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string, options?: { data?: Record<string, any> }) => Promise<void>;
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
      // Wrap the Supabase call in a try-catch to handle network errors silently
      const response = await supabase.auth.signInWithPassword({ email, password })
        .catch(() => ({
          error: new Error('Unable to connect to authentication service'),
          data: { user: null, session: null }
        }));
      
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
      }

      set({ user: data.user });
    } catch (error) {
      // Silently handle the error and throw a user-friendly message
      if (error instanceof Error && error.message.includes('Invalid login credentials')) {
        throw new Error('Incorrect email or password. Please try again.');
      }
      throw new Error('Failed to sign in. Please try again.');
    }
  },

  // Sign in with Google OAuth
  signInWithGoogle: async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) {
        throw new Error('Unable to sign in with Google. Please try again.');
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
  signUp: async (email: string, password: string, options?: { data?: Record<string, any> }) => {
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
    console.log("SIGNUP METADATA:", options?.data);

    // Validate required metadata
    if (!options?.data?.first_name?.trim() || !options?.data?.last_name?.trim() || !options?.data?.phone?.trim()) {
      throw new Error('Please fill in all required fields');
    }
    try {
      let response;
      try {
        response = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: `${window.location.origin}/auth/callback`,
    data: {
      first_name: options?.data?.first_name,
      last_name: options?.data?.last_name,
      phone: options?.data?.phone,
      full_name: `${options?.data?.first_name} ${options?.data?.last_name}`.trim()
    }
  }
});
      } catch (e) {
        // Silently handle network errors
        throw new Error('Unable to connect to authentication service. Please try again.');
      }
      
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
      }
      
      // If we have a user, sign them in immediately
      if (data.user) {
        try {
          let signInResponse;
          try {
            signInResponse = await supabase.auth.signInWithPassword({
              email,
              password
            });
          } catch (e) {
            throw new Error('Failed to sign in after signup');
          }
          
          const { error: signInError, data: signInData } = signInResponse;
          
          if (signInError) {
            throw signInError;
          }

          if (signInData.user) {
            set({ user: signInData.user });
          }
        } catch (error) {
          throw error;
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
      
      if (error) {
        throw new Error('Unable to sign out. Please try again.');
      }
      
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