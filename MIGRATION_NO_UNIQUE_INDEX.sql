-- ============================================
-- Progressive Lead Capture Migration
-- NO UNIQUE INDEX - Allows duplicate emails
-- ============================================
-- Project: gkecjrbkkfylduoriggl
-- ============================================

-- Add Progressive Tracking Columns
ALTER TABLE "ai-workshop"
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'step_2_complete',
  ADD COLUMN IF NOT EXISTS dropped_at_step INTEGER,
  ADD COLUMN IF NOT EXISTS last_updated_at TIMESTAMPTZ DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS lead_id UUID DEFAULT gen_random_uuid();

-- Create Indexes (no unique constraint)
CREATE INDEX IF NOT EXISTS idx_ai_workshop_status
  ON "ai-workshop"(status);

CREATE INDEX IF NOT EXISTS idx_ai_workshop_lead_id
  ON "ai-workshop"(lead_id);

CREATE INDEX IF NOT EXISTS idx_ai_workshop_last_updated
  ON "ai-workshop"(last_updated_at DESC);

-- Add RLS Policy for Updates
DROP POLICY IF EXISTS "Allow public updates for progress" ON "ai-workshop";

CREATE POLICY "Allow public updates for progress"
  ON "ai-workshop"
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Create Auto-Update Timestamp Function
CREATE OR REPLACE FUNCTION update_ai_workshop_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create Trigger
DROP TRIGGER IF EXISTS update_ai_workshop_timestamp_trigger
  ON "ai-workshop";

CREATE TRIGGER update_ai_workshop_timestamp_trigger
  BEFORE UPDATE ON "ai-workshop"
  FOR EACH ROW
  EXECUTE FUNCTION update_ai_workshop_timestamp();

-- Verification
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'ai-workshop'
  AND column_name IN ('status', 'dropped_at_step', 'last_updated_at', 'lead_id');
