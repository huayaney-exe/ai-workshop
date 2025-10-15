-- ============================================
-- Workshop Lima - Supabase Table Setup
-- ============================================
-- Run this SQL in your Supabase SQL Editor
-- Project: gkecjrbkkfylduoriggl
-- ============================================

-- Drop existing table if you need to recreate it
-- DROP TABLE IF EXISTS "ai-workshop";

-- Create the ai-workshop table
CREATE TABLE IF NOT EXISTS "ai-workshop" (
  id BIGSERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  linkedin TEXT NOT NULL,
  referido_por TEXT,
  experiencia TEXT NOT NULL,
  motivacion TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_ai_workshop_email ON "ai-workshop"(email);

-- Add index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_ai_workshop_created_at ON "ai-workshop"(created_at DESC);

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

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

-- ============================================
-- Verification Query
-- ============================================
-- After running the above, verify the table structure:

-- Check table columns
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'ai-workshop'
ORDER BY ordinal_position;

-- Check if RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'ai-workshop';
