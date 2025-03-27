-- Update the handle_new_user trigger function to properly handle empty strings
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    first_name,
    last_name,
    phone,
    avatar_url,
    created_at,
    updated_at
  )
  VALUES (
    new.id,
    NULLIF(TRIM(new.email), ''),
    NULLIF(TRIM(COALESCE(new.raw_user_meta_data->>'first_name', '')), ''),
    NULLIF(TRIM(COALESCE(new.raw_user_meta_data->>'last_name', '')), ''),
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