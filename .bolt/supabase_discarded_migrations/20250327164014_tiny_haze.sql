/*
  # Fix user creation trigger function

  1. Changes
    - Add better error handling to trigger function
    - Add fallback values for required fields
    - Ensure proper data type conversions
    - Add logging for debugging
    - Handle null metadata gracefully
    
  2. Security
    - Maintain existing security settings
    - Keep function as security definer
*/

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  first_name_val TEXT;
  last_name_val TEXT;
  phone_val TEXT;
  meta_data JSONB;
BEGIN
  -- Safely get metadata with fallback
  meta_data := COALESCE(new.raw_user_meta_data, '{}'::jsonb);
  
  -- Log metadata for debugging
  RAISE LOG 'Raw metadata: %', meta_data;
  
  -- Extract and clean metadata values with better null handling
  first_name_val := NULLIF(TRIM(COALESCE(meta_data->>'first_name', '')), '');
  last_name_val := NULLIF(TRIM(COALESCE(meta_data->>'last_name', '')), '');
  phone_val := NULLIF(TRIM(COALESCE(meta_data->>'phone', '')), '');

  -- Log extracted values
  RAISE LOG 'Extracted values - first_name: %, last_name: %, phone: %', 
    first_name_val, last_name_val, phone_val;

  BEGIN
    -- Create the profile record with proper error handling
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
      COALESCE(NULLIF(TRIM(new.email), ''), 'no-email'),
      first_name_val,
      last_name_val,
      CASE 
        WHEN first_name_val IS NOT NULL OR last_name_val IS NOT NULL 
        THEN CONCAT_WS(' ', first_name_val, last_name_val)
        ELSE NULL
      END,
      phone_val,
      meta_data->>'avatar_url',
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
      -- Log the specific error
      RAISE LOG 'Error in handle_new_user profile creation: %', SQLERRM;
      
      -- Create minimal profile as fallback
      INSERT INTO public.profiles (
        id,
        email,
        created_at,
        updated_at,
        role
      )
      VALUES (
        new.id,
        COALESCE(NULLIF(TRIM(new.email), ''), 'no-email'),
        now(),
        now(),
        'customer'
      );
      
      -- Create minimal loyalty points
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
  END;
EXCEPTION
  WHEN OTHERS THEN
    -- Log any outer block errors
    RAISE LOG 'Fatal error in handle_new_user: %', SQLERRM;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;