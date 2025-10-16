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
-- Make Professional Fields NOT NULL
-- ============================================
-- Set NOT NULL constraints for mandatory professional information fields

-- First, update any existing NULL values to empty string (if any exist)
UPDATE "ai-workshop" SET empresa = '' WHERE empresa IS NULL;
UPDATE "ai-workshop" SET experiencia = '' WHERE experiencia IS NULL;
UPDATE "ai-workshop" SET cargo = '' WHERE cargo IS NULL;
UPDATE "ai-workshop" SET linkedin = '' WHERE linkedin IS NULL;

-- Now set NOT NULL constraints
ALTER TABLE "ai-workshop" ALTER COLUMN empresa SET NOT NULL;
ALTER TABLE "ai-workshop" ALTER COLUMN experiencia SET NOT NULL;
ALTER TABLE "ai-workshop" ALTER COLUMN cargo SET NOT NULL;
ALTER TABLE "ai-workshop" ALTER COLUMN linkedin SET NOT NULL;

-- ============================================
-- Verification Query
-- ============================================
-- After running the above, verify the new columns and constraints:

SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'ai-workshop'
  AND column_name IN ('precio_final', 'codigo_cupon', 'telefono', 'codigo_pais', 'empresa', 'experiencia', 'cargo', 'linkedin')
ORDER BY ordinal_position;
