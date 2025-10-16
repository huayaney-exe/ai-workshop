-- Progressive Lead Capture Migration
-- Strategy: Save lead data after Step 2 (before price reveal)
-- This captures users who drop off after seeing the pricing

-- Step 1: Add progressive tracking columns
ALTER TABLE "ai-workshop"
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'step_2_complete',
  ADD COLUMN IF NOT EXISTS dropped_at_step INTEGER,
  ADD COLUMN IF NOT EXISTS last_updated_at TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS lead_id UUID DEFAULT gen_random_uuid();

-- NOTE: No changes to existing columns needed
-- Current schema already has:
-- - motivacion: TEXT NULL (already nullable)
-- - confirmacion: BOOLEAN NULL DEFAULT TRUE (already nullable)
-- - All other fields properly set as NOT NULL or nullable

-- Step 2: Create indexes for efficient lead tracking and queries
CREATE INDEX IF NOT EXISTS idx_ai_workshop_status ON "ai-workshop"(status);
CREATE INDEX IF NOT EXISTS idx_ai_workshop_lead_id ON "ai-workshop"(lead_id);
CREATE INDEX IF NOT EXISTS idx_ai_workshop_last_updated ON "ai-workshop"(last_updated_at DESC);

-- Step 3: Add unique constraint on email for upsert operations
-- Using plain email (not LOWER) since we lowercase in application layer
CREATE UNIQUE INDEX IF NOT EXISTS idx_ai_workshop_email_unique ON "ai-workshop"(email);

-- Step 4: Add RLS policy to allow public updates for progressive saves
CREATE POLICY IF NOT EXISTS "Allow public updates for progress" ON "ai-workshop"
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Step 6: Create trigger to auto-update last_updated_at
CREATE OR REPLACE FUNCTION update_ai_workshop_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_ai_workshop_timestamp_trigger ON "ai-workshop";
CREATE TRIGGER update_ai_workshop_timestamp_trigger
  BEFORE UPDATE ON "ai-workshop"
  FOR EACH ROW
  EXECUTE FUNCTION update_ai_workshop_timestamp();

-- Verification queries (commented out, run manually if needed)
-- SELECT column_name, data_type, is_nullable
-- FROM information_schema.columns
-- WHERE table_name = 'ai-workshop'
-- ORDER BY ordinal_position;
