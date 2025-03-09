import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase credentials are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials missing or invalid. Please connect to Supabase using the "Connect to Supabase" button in the top right corner.');
} else {
  console.log('✅ Supabase credentials found.');
}

// Create and export the Supabase client
export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      debug: false, // Disable debug logs
      // Silently handle auth errors
      onError: (error) => {
        if (error.name === 'AuthError' || error.name === 'AuthApiError') {
          return;
        }
        if (process.env.NODE_ENV === 'development') {
          console.warn('Supabase error:', error.message);
        }
      },
      // Handle auth state changes silently
      onAuthStateChange: (event, session) => {
        // Intentionally empty to suppress logs
      }
    }
  }
);

/**
 * Test the Supabase connection
 * @returns Object with success status and message
 */
export const testSupabaseConnection = async () => {
  try {
    // Use a simple auth check instead of querying a table
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      return { 
        success: false, 
        message: `Connection error: ${error.message}`,
        error 
      };
    }
    
    return { 
      success: true, 
      message: 'Successfully connected to Supabase!' 
    };
  } catch (err: any) {
    return { 
      success: false, 
      message: `Failed to connect to Supabase: ${err.message}`,
      error: err 
    };
  }
};