/*
  # Update profile fields for auth

  1. Changes
    - Add first_name and last_name columns if not exists
    - Add phone column if not exists
    - Add comments for clarity
    
  2. Security
    - Maintain existing RLS policies
*/

-- Add name and phone columns if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'first_name'
  ) THEN
    ALTER TABLE profiles ADD COLUMN first_name TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'last_name'
  ) THEN
    ALTER TABLE profiles ADD COLUMN last_name TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'phone'
  ) THEN
    ALTER TABLE profiles ADD COLUMN phone TEXT;
  END IF;
END $$;

-- Add comments
COMMENT ON COLUMN profiles.first_name IS 'User''s first name';
COMMENT ON COLUMN profiles.last_name IS 'User''s last name';
COMMENT ON COLUMN profiles.phone IS 'User''s contact phone number';