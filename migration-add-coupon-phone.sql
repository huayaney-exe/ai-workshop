-- ============================================
-- Workshop Lima - Add Coupon and Phone Fields
-- ============================================
-- Run this SQL in your Supabase SQL Editor
-- Project: gkecjrbkkfylduoriggl
-- ============================================

-- Add precio_final column (stores the final committed price after discount)
ALTER TABLE "ai-workshop"
ADD COLUMN IF NOT EXISTS precio_final NUMERIC(10,2);

-- Add codigo_cupon column (stores the coupon code used, if any)
ALTER TABLE "ai-workshop"
ADD COLUMN IF NOT EXISTS codigo_cupon TEXT;

-- Add telefono column (stores the phone number)
ALTER TABLE "ai-workshop"
ADD COLUMN IF NOT EXISTS telefono TEXT NOT NULL DEFAULT '';

-- Add codigo_pais column (stores the country code, defaults to Peru +51)
ALTER TABLE "ai-workshop"
ADD COLUMN IF NOT EXISTS codigo_pais TEXT NOT NULL DEFAULT '+51';

-- ============================================
-- Verification Query
-- ============================================
-- After running the above, verify the new columns:

SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'ai-workshop'
  AND column_name IN ('precio_final', 'codigo_cupon', 'telefono', 'codigo_pais')
ORDER BY ordinal_position;
