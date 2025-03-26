/*
  # Add quote form fields to bookings table

  1. Changes
    - Add columns for all quote form data
    - Add property type and areas information
    - Add extra services and requirements
    - Add pet information
    - Add frequency and scheduling preferences
    
  2. Security
    - Maintain existing RLS policies
    - No changes to access control needed
*/

-- Add new columns to bookings table
ALTER TABLE bookings
ADD COLUMN IF NOT EXISTS property_type TEXT,
ADD COLUMN IF NOT EXISTS residential_areas JSONB,
ADD COLUMN IF NOT EXISTS commercial_areas JSONB,
ADD COLUMN IF NOT EXISTS other_areas TEXT[],
ADD COLUMN IF NOT EXISTS custom_area_name TEXT,
ADD COLUMN IF NOT EXISTS extra_services TEXT[],
ADD COLUMN IF NOT EXISTS frequency TEXT,
ADD COLUMN IF NOT EXISTS special_requirements TEXT,
ADD COLUMN IF NOT EXISTS has_pets BOOLEAN,
ADD COLUMN IF NOT EXISTS pet_details TEXT,
ADD COLUMN IF NOT EXISTS access_instructions TEXT;

-- Add comments to explain the columns
COMMENT ON COLUMN bookings.property_type IS 'Type of property (house, apartment, office, etc)';
COMMENT ON COLUMN bookings.residential_areas IS 'Number of rooms by type for residential properties';
COMMENT ON COLUMN bookings.commercial_areas IS 'Number of areas by type for commercial properties';
COMMENT ON COLUMN bookings.other_areas IS 'Array of other areas to be cleaned';
COMMENT ON COLUMN bookings.custom_area_name IS 'Name/description of custom area if applicable';
COMMENT ON COLUMN bookings.extra_services IS 'Array of additional services requested';
COMMENT ON COLUMN bookings.frequency IS 'Cleaning frequency (one-time, weekly, etc)';
COMMENT ON COLUMN bookings.special_requirements IS 'Any special cleaning requirements';
COMMENT ON COLUMN bookings.has_pets IS 'Whether the property has pets';
COMMENT ON COLUMN bookings.pet_details IS 'Details about pets if present';
COMMENT ON COLUMN bookings.access_instructions IS 'Instructions for accessing the property';

-- Create indexes for commonly queried fields
CREATE INDEX IF NOT EXISTS idx_bookings_property_type ON bookings(property_type);
CREATE INDEX IF NOT EXISTS idx_bookings_frequency ON bookings(frequency);