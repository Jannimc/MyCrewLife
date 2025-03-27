/*
  # Add detailed pricing columns to bookings table

  1. New Columns
    - `service_prices` (jsonb) - Individual prices for each selected service
    - `area_charges` (jsonb) - Charges for each area type
    - `subtotal_price` (numeric) - Total before discount
    - `pricing_context` (jsonb) - Metadata about pricing (currency, frequency, etc)
    
  2. Security
    - Maintain existing RLS policies
    - Add constraints for valid prices
*/

-- Add new pricing columns
ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS service_prices JSONB,
ADD COLUMN IF NOT EXISTS area_charges JSONB,
ADD COLUMN IF NOT EXISTS subtotal_price NUMERIC(10,2),
ADD COLUMN IF NOT EXISTS pricing_context JSONB;

-- Add constraint for subtotal price
ALTER TABLE bookings
ADD CONSTRAINT valid_subtotal_price CHECK (subtotal_price >= 0);

-- Add comments
COMMENT ON COLUMN bookings.service_prices IS 'JSON object containing individual prices for each selected service';
COMMENT ON COLUMN bookings.area_charges IS 'JSON object containing charges for each area type';
COMMENT ON COLUMN bookings.subtotal_price IS 'Total price before discount';
COMMENT ON COLUMN bookings.pricing_context IS 'Metadata about pricing (currency, frequency, timestamp)';