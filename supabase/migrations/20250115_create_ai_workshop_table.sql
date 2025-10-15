-- Drop existing table if it exists
DROP TABLE IF EXISTS "ai-workshop" CASCADE;

-- Create the ai-workshop table
CREATE TABLE "ai-workshop" (
  id BIGSERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  linkedin TEXT NOT NULL,
  referido_por TEXT,
  experiencia TEXT NOT NULL,
  motivacion TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX idx_ai_workshop_email ON "ai-workshop"(email);
CREATE INDEX idx_ai_workshop_created_at ON "ai-workshop"(created_at DESC);

-- Enable RLS
ALTER TABLE "ai-workshop" ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public inserts (for form submissions)
CREATE POLICY "Allow public inserts" ON "ai-workshop"
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to read all records
CREATE POLICY "Allow authenticated reads" ON "ai-workshop"
  FOR SELECT
  TO authenticated
  USING (true);
