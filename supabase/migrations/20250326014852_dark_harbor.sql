/*
  # Add automatic booking completion function

  1. New Function
    - Creates a function to automatically mark bookings as completed
    - Updates 'upcoming' bookings that are in the past
    - Can be called manually or by external scheduler
    
  2. Security
    - Function runs with security definer to bypass RLS
    - Only updates bookings with appropriate status
*/

-- Create function to update completed bookings
CREATE OR REPLACE FUNCTION update_completed_bookings()
RETURNS integer -- Returns number of bookings updated
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  updated_count integer;
BEGIN
  -- Update bookings that are in the past and still marked as upcoming
  WITH updated_rows AS (
    UPDATE bookings
    SET 
      status = 'completed'
    WHERE 
      status = 'upcoming'
      AND (
        date < CURRENT_DATE 
        OR (
          date = CURRENT_DATE 
          AND CAST(SUBSTRING(time FROM 1 FOR 5) AS time) < CURRENT_TIME
        )
      )
    RETURNING id
  )
  SELECT COUNT(*) INTO updated_count FROM updated_rows;

  -- Return number of bookings updated
  RETURN updated_count;
END;
$$;

-- Create index to improve performance of the status updates
CREATE INDEX IF NOT EXISTS idx_bookings_status_date ON bookings(status, date);

-- Run the function immediately to update any existing bookings
SELECT update_completed_bookings();