/*
  # Add pricing information to bookings table if not exists

  1. Changes
    - Add pricing columns if they don't exist
    - Add constraints for valid price ranges
    - Add comments for clarity
    
  2. Security
    - Use DO blocks to safely check and add columns
    - Add constraints only if columns are added
*/

-- Add pricing columns if they don't exist
DO $$
BEGIN
  -- Check and add base_price
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'base_price'
  ) THEN
    ALTER TABLE bookings ADD COLUMN base_price NUMERIC(10,2);
    ALTER TABLE bookings ADD CONSTRAINT valid_base_price CHECK (base_price >= 0);
  END IF;

  -- Check and add extra_services_price
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'extra_services_price'
  ) THEN
    ALTER TABLE bookings ADD COLUMN extra_services_price JSONB;
  END IF;

  -- Check and add discount_percentage
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'discount_percentage'
  ) THEN
    ALTER TABLE bookings ADD COLUMN discount_percentage NUMERIC(5,2);
    ALTER TABLE bookings ADD CONSTRAINT valid_discount_percentage 
      CHECK (discount_percentage >= 0 AND discount_percentage <= 100);
  END IF;

  -- Check and add discount_amount
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'discount_amount'
  ) THEN
    ALTER TABLE bookings ADD COLUMN discount_amount NUMERIC(10,2);
    ALTER TABLE bookings ADD CONSTRAINT valid_discount_amount CHECK (discount_amount >= 0);
  END IF;

  -- Check and add total_price
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'bookings' AND column_name = 'total_price'
  ) THEN
    ALTER TABLE bookings ADD COLUMN total_price NUMERIC(10,2);
    ALTER TABLE bookings ADD CONSTRAINT valid_total_price CHECK (total_price >= 0);
  END IF;
END $$;

-- Add comments
COMMENT ON COLUMN bookings.base_price IS 'Base price for the cleaning service';
COMMENT ON COLUMN bookings.extra_services_price IS 'JSON object containing prices for each extra service';
COMMENT ON COLUMN bookings.discount_percentage IS 'Percentage of discount applied';
COMMENT ON COLUMN bookings.discount_amount IS 'Total amount of discount applied';
COMMENT ON COLUMN bookings.total_price IS 'Final total price after discounts';