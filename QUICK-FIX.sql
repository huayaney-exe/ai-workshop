-- QUICK FIX: Run this in Supabase Dashboard > SQL Editor
-- This will add the missing columns to your existing table

-- Add missing columns
ALTER TABLE "ai-workshop" ADD COLUMN IF NOT EXISTS empresa TEXT;
ALTER TABLE "ai-workshop" ADD COLUMN IF NOT EXISTS cargo TEXT;
ALTER TABLE "ai-workshop" ADD COLUMN IF NOT EXISTS fue_referido BOOLEAN DEFAULT FALSE;
ALTER TABLE "ai-workshop" ADD COLUMN IF NOT EXISTS confirmacion BOOLEAN DEFAULT TRUE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ai_workshop_empresa ON "ai-workshop"(empresa);
CREATE INDEX IF NOT EXISTS idx_ai_workshop_cargo ON "ai-workshop"(cargo);

-- Verify the columns were added
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'ai-workshop'
ORDER BY ordinal_position;
