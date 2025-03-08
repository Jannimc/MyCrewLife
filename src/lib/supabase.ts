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
  supabaseAnonKey || 'placeholder'
);

/**
 * Test the Supabase connection
 * @returns Object with success status and message
 */
export const testSupabaseConnection = async () => {
  try {
    const { error } = await supabase.from('_dummy_query').select('*').limit(1);
    
    if (error && error.code === '42P01') {
      // This is actually good - it means we connected but the table doesn't exist
      return { success: true, message: 'Successfully connected to Supabase!' };
    } else if (error) {
      return { 
        success: false, 
        message: `Connection error: ${error.message}`,
        error 
      };
    }
    
    return { success: true, message: 'Successfully connected to Supabase!' };
  } catch (err: any) {
    return { 
      success: false, 
      message: `Failed to connect to Supabase: ${err.message}`,
      error: err 
    };
  }
};