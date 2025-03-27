/*
  # Update handle_new_user trigger function

  1. Changes
    - Update trigger function to store first_name and last_name separately
    - Add phone number storage
    - Keep existing functionality
    
  2. Security
    - Maintain SECURITY DEFINER setting
    - No changes to access control needed
*/

-- Update the handle_new_user trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    first_name,
    last_name,
    phone,
    avatar_url
  )
  VALUES (
    new.id,
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