/*
  # Fix user metadata handling in trigger function

  1. Changes
    - Update handle_new_user trigger to properly store first/last name
    - Ensure metadata is properly extracted from auth.users
    
  2. Security
    - Maintain existing RLS policies
*/

-- Update the handle_new_user trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    first_name,
    last_name,
    phone,
    avatar_url,
    created_at,
    updated_at
  )
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'first_name', ''),
    COALESCE(new.raw_user_meta_data->>'last_name', ''),
    COALESCE(new.raw_user_meta_data->>'phone', ''),
    new.raw_user_meta_data->>'avatar_url',
    now(),
    now()
  );
  
  INSERT INTO public.loyalty_points (user_id, points, tier)
  VALUES (new.id, 0, 'Bronze');
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;