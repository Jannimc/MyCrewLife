/*
  # Add cancelled_at timestamp to bookings

  1. Changes
    - Add cancelled_at timestamp column to bookings table
    - Add index for faster sorting of recent activity
    
  2. Security
    - Maintain existing RLS policies
*/

-- Add cancelled_at column to bookings table
ALTER TABLE bookings
ADD COLUMN cancelled_at TIMESTAMPTZ;

-- Create index for sorting recent activity
CREATE INDEX idx_bookings_activity_sort ON bookings(
  COALESCE(cancelled_at, created_at) DESC
);