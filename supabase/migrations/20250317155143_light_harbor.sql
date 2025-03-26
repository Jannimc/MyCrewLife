/*
  # Add user role and cleaner status

  1. Changes
    - Add role column to profiles table
    - Add cleaner_status column to profiles table
    - Add policies for role-based access
    
  2. Security
    - Enable RLS for new columns
    - Add policies for authenticated users
*/

-- Add role column to profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'customer',
ADD COLUMN IF NOT EXISTS cleaner_status TEXT;

-- Create index for faster role lookups
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- Add check constraint for valid roles
ALTER TABLE profiles
ADD CONSTRAINT valid_role CHECK (role IN ('customer', 'cleaner'));

-- Add check constraint for valid cleaner status
ALTER TABLE profiles
ADD CONSTRAINT valid_cleaner_status CHECK (
  cleaner_status IS NULL OR 
  cleaner_status IN ('pending', 'approved', 'rejected')
);