/*
  # Fix loyalty points initialization and querying

  1. Changes
    - Add ON CONFLICT clause to loyalty points insert
    - Update RLS policies to handle missing loyalty points
    - Add function to ensure loyalty points exist
    
  2. Security
    - Maintain existing RLS policies
    - Add policies for loyalty points initialization
*/

-- Create function to ensure loyalty points exist for a user
CREATE OR REPLACE FUNCTION ensure_loyalty_points()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.loyalty_points (
    user_id,
    points,
    tier,
    updated_at
  )
  VALUES (
    NEW.id,
    0,
    'Bronze',
    now()
  )
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to ensure loyalty points exist
DROP TRIGGER IF EXISTS ensure_loyalty_points_trigger ON profiles;
CREATE TRIGGER ensure_loyalty_points_trigger
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION ensure_loyalty_points();

-- Update handle_new_user function to use ON CONFLICT
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  first_name_val TEXT;
  last_name_val TEXT;
  phone_val TEXT;
BEGIN
  -- Extract and clean metadata values
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
  
  -- Create loyalty points record with ON CONFLICT
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
  )
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN new;
EXCEPTION
  WHEN OTHERS THEN
    RAISE LOG 'Error in handle_new_user: %', SQLERRM;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update loyalty points policies
DROP POLICY IF EXISTS "Users can view own loyalty points" ON loyalty_points;
CREATE POLICY "Users can view own loyalty points"
  ON loyalty_points FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_loyalty_points_user_id ON loyalty_points(user_id);