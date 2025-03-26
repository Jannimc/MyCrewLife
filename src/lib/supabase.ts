import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create and export the Supabase client
export const supabase = createClient<Database>(
<<<<<<< HEAD
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder',
=======
  supabaseUrl,
  supabaseAnonKey,
>>>>>>> 7249e5a810fa2fa4154e67656d1b1489b80295e8
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
<<<<<<< HEAD
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
=======
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'x-application-name': 'mycrew'
>>>>>>> 7249e5a810fa2fa4154e67656d1b1489b80295e8
      }
    }
  }
);

/**
 * Test the Supabase connection
 * @returns Object with success status and message
 */
export const testSupabaseConnection = async () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return {
      success: false,
      message: 'Supabase credentials missing. Please connect to Supabase using the "Connect to Supabase" button.'
    };
  }

  try {
<<<<<<< HEAD
    // Use a simple auth check instead of querying a table
=======
    // Try to get the current session as a lightweight connection test
>>>>>>> 7249e5a810fa2fa4154e67656d1b1489b80295e8
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

// Initialize connection test
testSupabaseConnection().then(result => {
  if (!result.success) {
    console.warn('⚠️ ' + result.message);
  } else {
    console.log('✅ ' + result.message);
  }
});