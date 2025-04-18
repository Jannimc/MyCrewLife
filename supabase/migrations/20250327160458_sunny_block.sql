/*
  # Fix profile creation and querying

  1. Changes
    - Add ON CONFLICT clause to profile creation
    - Update handle_new_user function to be more robust
    - Add trigger to ensure profile exists
    
  2. Security
    - Maintain existing RLS policies
    - Add policies for profile initialization
*/

-- Create function to ensure profile exists for a user
CREATE OR REPLACE FUNCTION ensure_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    created_at,
    updated_at,
    role
  )
  VALUES (
    NEW.id,
    NEW.email,
    now(),
    now(),
    'customer'
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to ensure profile exists
DROP TRIGGER IF EXISTS ensure_profile_trigger ON auth.users;
CREATE TRIGGER ensure_profile_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION ensure_profile();

-- Update handle_new_user function with better error handling
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

  -- Create or update the profile record
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
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    full_name = EXCLUDED.full_name,
    phone = EXCLUDED.phone,
    avatar_url = EXCLUDED.avatar_url,
    updated_at = now();
  
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
    -- Create minimal profile on error
    INSERT INTO public.profiles (id, email, created_at, updated_at, role)
    VALUES (new.id, new.email, now(), now(), 'customer')
    ON CONFLICT (id) DO NOTHING;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update profile policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);