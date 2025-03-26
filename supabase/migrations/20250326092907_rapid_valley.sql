/*
  # Add pricing information to bookings table

  1. New Columns
    - `base_price` (numeric) - Base price for the service
    - `extra_services_price` (jsonb) - Price breakdown for each extra service
    - `discount_percentage` (numeric) - Any applied discount percentage
    - `discount_amount` (numeric) - Total discount amount
    - `total_price` (numeric) - Final total price
    - `payment_status` (text) - Status of payment
    - `payment_method` (text) - Payment method used
    - `payment_details` (jsonb) - Additional payment details (e.g., last 4 digits)
    
  2. Security
    - Maintain existing RLS policies
    - Add constraints for valid price ranges and payment status
*/

-- Add pricing columns to bookings table
ALTER TABLE bookings
ADD COLUMN base_price NUMERIC(10,2),
ADD COLUMN extra_services_price JSONB,
ADD COLUMN discount_percentage NUMERIC(5,2),
ADD COLUMN discount_amount NUMERIC(10,2),
ADD COLUMN total_price NUMERIC(10,2),
ADD COLUMN payment_status TEXT DEFAULT 'pending',
ADD COLUMN payment_method TEXT,
ADD COLUMN payment_details JSONB;

-- Add constraints
ALTER TABLE bookings
ADD CONSTRAINT valid_base_price CHECK (base_price >= 0),
ADD CONSTRAINT valid_discount_percentage CHECK (discount_percentage >= 0 AND discount_percentage <= 100),
ADD CONSTRAINT valid_discount_amount CHECK (discount_amount >= 0),
ADD CONSTRAINT valid_total_price CHECK (total_price >= 0),
ADD CONSTRAINT valid_payment_status CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded'));

-- Add comments
COMMENT ON COLUMN bookings.base_price IS 'Base price for the cleaning service';
COMMENT ON COLUMN bookings.extra_services_price IS 'JSON object containing prices for each extra service';
COMMENT ON COLUMN bookings.discount_percentage IS 'Percentage of discount applied';
COMMENT ON COLUMN bookings.discount_amount IS 'Total amount of discount applied';
COMMENT ON COLUMN bookings.total_price IS 'Final total price after discounts';
COMMENT ON COLUMN bookings.payment_status IS 'Current status of payment';
COMMENT ON COLUMN bookings.payment_method IS 'Method used for payment';
COMMENT ON COLUMN bookings.payment_details IS 'Additional payment details like last 4 digits';

-- Create index for payment status
CREATE INDEX IF NOT EXISTS idx_bookings_payment_status ON bookings(payment_status);