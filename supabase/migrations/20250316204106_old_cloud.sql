/*
  # Create cleaner applications table

  1. New Tables
    - `cleaner_applications` - Stores cleaner application information
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `phone` (text)
      - `address` (text)
      - `city` (text)
      - `postcode` (text)
      - `experience` (text)
      - `availability` (text[])
      - `preferred_areas` (text[])
      - `has_transport` (boolean)
      - `right_to_work` (boolean)
      - `criminal_record` (boolean)
      - `has_references` (boolean)
      - `about` (text)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Create cleaner applications table
CREATE TABLE IF NOT EXISTS cleaner_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postcode TEXT NOT NULL,
  experience TEXT NOT NULL,
  availability TEXT[] NOT NULL,
  preferred_areas TEXT[] NOT NULL,
  has_transport BOOLEAN NOT NULL,
  right_to_work BOOLEAN NOT NULL,
  criminal_record BOOLEAN NOT NULL,
  has_references BOOLEAN NOT NULL,
  about TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE cleaner_applications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own applications"
  ON cleaner_applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own applications"
  ON cleaner_applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own applications"
  ON cleaner_applications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_cleaner_applications_user_id ON cleaner_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_cleaner_applications_status ON cleaner_applications(status);