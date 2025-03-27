/*
  # Fix user creation trigger function

  1. Changes
    - Update handle_new_user trigger function to properly handle metadata
    - Add better error handling and data validation
    - Ensure all required fields are properly extracted
    
  2. Security
    - Maintain existing security settings
    - Keep function as security definer
*/

-- Update the handle_new_user trigger function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  first_name_val TEXT;
  last_name_val TEXT;
  phone_val TEXT;
BEGIN
  -- Extract and clean metadata values with better null handling
  first_name_val := NULLIF(TRIM(COALESCE(new.raw_user_meta_data->>'first_name', '')), '');
  last_name_val := NULLIF(TRIM(COALESCE(new.raw_user_meta_data->>'last_name', '')), '');
  phone_val := NULLIF(TRIM(COALESCE(new.raw_user_meta_data->>'phone', '')), '');

  -- Create the profile record
  INSERT INTO public.profiles (
    id,
    email,
    first_name,
    last_name,
    full_name,
    phone,
    avatar_url,
    created_at,
    updated_at,
    role
  )
  VALUES (
    new.id,
    NULLIF(TRIM(COALESCE(new.email, '')), ''),
    first_name_val,
    last_name_val,
    CASE 
      WHEN first_name_val IS NOT NULL OR last_name_val IS NOT NULL 
      THEN CONCAT_WS(' ', first_name_val, last_name_val)
      ELSE NULL
    END,
    phone_val,
    NULLIF(TRIM(COALESCE(new.raw_user_meta_data->>'avatar_url', '')), ''),
    now(),
    now(),
    'customer'
  );
  
  -- Create loyalty points record
  INSERT INTO public.loyalty_points (
    user_id,
    points,
    tier,
    updated_at
  )
  VALUES (
    new.id,
    0,
    'Bronze',
    now()
  );
  
  RETURN new;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error (will appear in Supabase logs)
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;