/*
  # Create user profiles and related tables

  1. New Tables
    - `profiles` - Stores user profile information
      - `id` (uuid, primary key, references auth.users)
      - `full_name` (text)
      - `avatar_url` (text)
      - `phone` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `bookings` - Stores user booking information
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `service_type` (text)
      - `date` (date)
      - `time` (text)
      - `address` (text)
      - `cleaner` (text)
      - `status` (text)
      - `duration` (text)
      - `created_at` (timestamptz)
      - `rating` (integer)
    
    - `loyalty_points` - Stores user loyalty information
      - `user_id` (uuid, primary key, references profiles)
      - `points` (integer)
      - `tier` (text)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read/write their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  address TEXT NOT NULL,
  cleaner TEXT NOT NULL,
  status TEXT NOT NULL,
  duration TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  rating INTEGER,
  CONSTRAINT valid_rating CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5))
);

-- Create loyalty points table
CREATE TABLE IF NOT EXISTS loyalty_points (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  points INTEGER DEFAULT 0,
  tier TEXT DEFAULT 'Bronze',
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_points ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create policies for bookings
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for loyalty points
CREATE POLICY "Users can view own loyalty points"
  ON loyalty_points FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create trigger to create profile and loyalty points entry when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  
  INSERT INTO public.loyalty_points (user_id, points, tier)
  VALUES (new.id, 0, 'Bronze');
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample data for testing (will only be used for development)
DO $$
BEGIN
  -- Only insert sample data if the tables are empty
  IF NOT EXISTS (SELECT 1 FROM profiles LIMIT 1) THEN
    -- Sample bookings for testing
    INSERT INTO bookings (user_id, service_type, date, time, address, cleaner, status, duration, rating)
    SELECT 
      auth.uid(),
      'Regular Cleaning',
      CURRENT_DATE + INTERVAL '10 days',
      '9:00 AM',
      '123 Main St, London SW1A 1AA',
      'Sarah Johnson',
      'upcoming',
      '3 hours',
      NULL
    WHERE EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid());
    
    INSERT INTO bookings (user_id, service_type, date, time, address, cleaner, status, duration, rating)
    SELECT 
      auth.uid(),
      'Deep Cleaning',
      CURRENT_DATE - INTERVAL '5 days',
      '2:00 PM',
      '456 Park Ave, London E1 6AN',
      'Michael Brown',
      'completed',
      '5 hours',
      5
    WHERE EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid());
    
    -- Update loyalty points for the current user
    UPDATE loyalty_points
    SET points = 250, tier = 'Silver'
    WHERE user_id = auth.uid() AND EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid());
  END IF;
END
$$;