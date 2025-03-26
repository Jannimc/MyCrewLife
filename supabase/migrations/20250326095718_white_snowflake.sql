/*
  # Fix RLS policies for cleaner applications

  1. Changes
    - Allow public access for submitting cleaner applications
    - Update existing policies to handle null user_id
    - Add policy for public submissions
    
  2. Security
    - Enable RLS
    - Allow unauthenticated submissions
    - Maintain existing authenticated user policies
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert own applications" ON cleaner_applications;
DROP POLICY IF EXISTS "Users can view own applications" ON cleaner_applications;
DROP POLICY IF EXISTS "Users can update own applications" ON cleaner_applications;

-- Create new policies that handle both authenticated and public submissions
CREATE POLICY "Anyone can submit cleaner applications"
  ON cleaner_applications FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view own applications"
  ON cleaner_applications FOR SELECT
  TO authenticated
  USING (
    CASE 
      WHEN auth.uid() IS NOT NULL THEN user_id = auth.uid()
      ELSE false
    END
  );

CREATE POLICY "Users can update own applications"
  ON cleaner_applications FOR UPDATE
  TO authenticated
  USING (
    CASE 
      WHEN auth.uid() IS NOT NULL THEN user_id = auth.uid()
      ELSE false
    END
  );

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_cleaner_applications_user_id ON cleaner_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_cleaner_applications_status ON cleaner_applications(status);