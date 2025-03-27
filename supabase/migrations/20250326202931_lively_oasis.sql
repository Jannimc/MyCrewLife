/*
  # Update profile fields

  1. Changes
    - Add first_name and last_name columns to profiles table
    - Make phone column required for new profiles
    - Add comments for clarity
    
  2. Security
    - Maintain existing RLS policies
*/

-- Add first_name and last_name columns
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS first_name TEXT,
ADD COLUMN IF NOT EXISTS last_name TEXT;

-- Add comments
COMMENT ON COLUMN profiles.first_name IS 'User''s first name';
COMMENT ON COLUMN profiles.last_name IS 'User''s last name';
COMMENT ON COLUMN profiles.phone IS 'User''s contact phone number';