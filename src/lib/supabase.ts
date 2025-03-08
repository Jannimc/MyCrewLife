import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create and export the Supabase client
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'x-application-name': 'mycrew'
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
    // Try to get the current session as a lightweight connection test
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