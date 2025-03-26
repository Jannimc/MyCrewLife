/*
  # Fix RLS policies for contact messages and cleaner applications

  1. Changes
    - Add missing RLS policies for cleaner applications
    - Update contact messages policies
    - Add user_id column to contact messages for tracking
    
  2. Security
    - Enable RLS
    - Add policies for authenticated and public users
*/

-- Add user_id to contact messages
ALTER TABLE contact_messages 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Users can view own applications" ON cleaner_applications;
DROP POLICY IF EXISTS "Users can insert own applications" ON cleaner_applications;
DROP POLICY IF EXISTS "Users can update own applications" ON cleaner_applications;

-- Create new contact messages policies
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view own messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create new cleaner applications policies
CREATE POLICY "Users can insert own applications"
  ON cleaner_applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own applications"
  ON cleaner_applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own applications"
  ON cleaner_applications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);