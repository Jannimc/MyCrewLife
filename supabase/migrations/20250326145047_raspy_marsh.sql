/*
  # Remove payment columns from bookings table

  1. Changes
    - Remove payment-related columns since we'll use Stripe instead
    - Keep price information for reference but remove payment processing details
    
  2. Security
    - No changes to RLS policies needed
    - Existing access controls remain unchanged
*/

-- Remove payment-related columns
ALTER TABLE bookings
DROP COLUMN IF EXISTS payment_method,
DROP COLUMN IF EXISTS payment_details,
DROP COLUMN IF EXISTS payment_status;

-- Drop related constraints
ALTER TABLE bookings
DROP CONSTRAINT IF EXISTS valid_payment_status;

-- Drop related indexes
DROP INDEX IF EXISTS idx_bookings_payment_status;