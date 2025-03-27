/*
  # Fix user signup trigger function

  1. Changes
    - Update handle_new_user trigger to properly handle metadata
    - Add full_name concatenation from first and last name
    - Ensure proper NULL handling
    - Fix metadata extraction
    
  2. Security
    - Maintain existing security model
    - No changes to RLS policies needed
*/

-- Update the handle_new_user trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  first_name_val TEXT;
  last_name_val TEXT;
BEGIN
  -- Extract and clean first name and last name
  first_name_val := NULLIF(TRIM(COALESCE(new.raw_user_meta_data->>'first_name', '')), '');
  last_name_val := NULLIF(TRIM(COALESCE(new.raw_user_meta_data->>'last_name', '')), '');

  INSERT INTO public.profiles (
    id,
    email,
    first_name,
    last_name,
    full_name,
    phone,
    avatar_url,
    created_at,
    updated_at
  )
  VALUES (
    new.id,
    NULLIF(TRIM(new.email), ''),
    first_name_val,
    last_name_val,
    CASE 
      WHEN first_name_val IS NOT NULL AND last_name_val IS NOT NULL 
        THEN first_name_val || ' ' || last_name_val
      WHEN first_name_val IS NOT NULL 
        THEN first_name_val
      WHEN last_name_val IS NOT NULL 
        THEN last_name_val
      ELSE NULL
    END,
    NULLIF(TRIM(COALESCE(new.raw_user_meta_data->>'phone', '')), ''),
    NULLIF(TRIM(COALESCE(new.raw_user_meta_data->>'avatar_url', '')), ''),
    now(),
    now()
  );
  
  INSERT INTO public.loyalty_points (user_id, points, tier)
  VALUES (new.id, 0, 'Bronze');
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;