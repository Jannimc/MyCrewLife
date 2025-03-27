/*
  # Add email column to profiles table

  1. Changes
    - Add email column to profiles table
    - Update handle_new_user trigger to store email
    - Add comment for documentation
    
  2. Security
    - Maintain existing RLS policies
    - Email is stored alongside other profile information
*/

-- Add email column if it doesn't exist
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS email TEXT;

-- Add comment
COMMENT ON COLUMN profiles.email IS 'User''s email address';

-- Update the handle_new_user trigger function to include email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    first_name,
    last_name,
    phone,
    avatar_url
  )
  VALUES (
    new.id,
    new.email, -- Store the email from auth.users
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'avatar_url'
  );
  
  INSERT INTO public.loyalty_points (user_id, points, tier)
  VALUES (new.id, 0, 'Bronze');
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;