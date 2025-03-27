/*
  # Add guest booking support

  1. Changes
    - Add isGuest column to bookings table
    - Add guest_name column to bookings table
    - Add guest_email column to bookings table
    - Add guest_phone column to bookings table
    
  2. Security
    - Maintain existing RLS policies
    - Allow guest bookings without authentication
*/

-- Add guest-related columns to bookings table
ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS is_guest BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS guest_name TEXT,
ADD COLUMN IF NOT EXISTS guest_email TEXT,
ADD COLUMN IF NOT EXISTS guest_phone TEXT;

-- Add comments
COMMENT ON COLUMN bookings.is_guest IS 'Whether this booking was made by a guest user';
COMMENT ON COLUMN bookings.guest_name IS 'Name of the guest who made the booking';
COMMENT ON COLUMN bookings.guest_email IS 'Email of the guest who made the booking';
COMMENT ON COLUMN bookings.guest_phone IS 'Phone number of the guest who made the booking';

-- Update RLS policies to handle guest bookings
DROP POLICY IF EXISTS "Users can view own bookings" ON bookings;
DROP POLICY IF EXISTS "Users can insert own bookings" ON bookings;

-- Create new policies that handle both authenticated and guest bookings
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  TO public
  USING (
    CASE 
      WHEN auth.uid() IS NOT NULL THEN user_id = auth.uid()
      WHEN is_guest = true THEN true
      ELSE false
    END
  );

CREATE POLICY "Anyone can insert bookings"
  ON bookings FOR INSERT
  TO public
  WITH CHECK (
    CASE 
      WHEN auth.uid() IS NOT NULL THEN user_id = auth.uid()
      WHEN is_guest = true THEN true
      ELSE false
    END
  );