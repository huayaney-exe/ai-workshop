-- ============================================
-- Workshop Lima - Fix NOT NULL Constraints
-- ============================================
-- Run this SQL in your Supabase SQL Editor
-- Project: gkecjrbkkfylduoriggl
-- ============================================
-- This fixes the professional fields that should be NOT NULL
-- but weren't properly set in the previous migration
-- ============================================

-- STEP 1: Clean up any existing NULL values
-- (This ensures the ALTER TABLE commands won't fail)
UPDATE "ai-workshop" SET empresa = '' WHERE empresa IS NULL;
UPDATE "ai-workshop" SET cargo = '' WHERE cargo IS NULL;
UPDATE "ai-workshop" SET experiencia = '' WHERE experiencia IS NULL;
UPDATE "ai-workshop" SET linkedin = '' WHERE linkedin IS NULL;

-- STEP 2: Set NOT NULL constraints
-- These will now succeed because we've eliminated NULL values
ALTER TABLE "ai-workshop" ALTER COLUMN empresa SET NOT NULL;
ALTER TABLE "ai-workshop" ALTER COLUMN cargo SET NOT NULL;
ALTER TABLE "ai-workshop" ALTER COLUMN experiencia SET NOT NULL;
ALTER TABLE "ai-workshop" ALTER COLUMN linkedin SET NOT NULL;

-- ============================================
-- STEP 3: Verification Query
-- ============================================
-- After running the above, verify the constraints are properly set:
-- All four columns should show is_nullable = 'NO'

SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'ai-workshop'
  AND column_name IN ('empresa', 'cargo', 'experiencia', 'linkedin')
ORDER BY column_name;

-- ============================================
-- Expected Result:
-- ============================================
-- column_name  | data_type | is_nullable | column_default
-- -------------|-----------|-------------|---------------
-- cargo        | text      | NO          | null
-- empresa      | text      | NO          | null
-- experiencia  | text      | NO          | null
-- linkedin     | text      | NO          | null
-- ============================================
