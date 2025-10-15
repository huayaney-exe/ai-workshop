-- Fix: Remove NOT NULL constraint from motivacion column
-- This allows the 3-step form to work without providing motivacion field

-- Make motivacion column optional (allows NULL)
ALTER TABLE "ai-workshop" ALTER COLUMN motivacion DROP NOT NULL;

-- Verify the change
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'ai-workshop' AND column_name = 'motivacion';
