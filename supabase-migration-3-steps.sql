-- Migration: Update ai-workshop table schema for 3-step form
-- This script updates the table to include new fields for the 3-step registration form

-- Step 1: Drop the old table (CAREFUL: This deletes all data!)
-- If you want to preserve data, use ALTER TABLE instead
DROP TABLE IF EXISTS "ai-workshop" CASCADE;

-- Step 2: Create new table with updated schema
CREATE TABLE "ai-workshop" (
  id BIGSERIAL PRIMARY KEY,

  -- Step 1: Professional Information
  empresa TEXT NOT NULL,
  experiencia TEXT NOT NULL,
  cargo TEXT NOT NULL,
  linkedin TEXT NOT NULL,

  -- Step 2: Personal Information
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  fue_referido BOOLEAN DEFAULT FALSE,
  referido_por TEXT,

  -- Step 3: Confirmation
  confirmacion BOOLEAN DEFAULT TRUE,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 3: Create indexes for better query performance
CREATE INDEX idx_ai_workshop_email ON "ai-workshop"(email);
CREATE INDEX idx_ai_workshop_created_at ON "ai-workshop"(created_at DESC);
CREATE INDEX idx_ai_workshop_empresa ON "ai-workshop"(empresa);
CREATE INDEX idx_ai_workshop_experiencia ON "ai-workshop"(experiencia);

-- Step 4: Enable Row Level Security
ALTER TABLE "ai-workshop" ENABLE ROW LEVEL SECURITY;

-- Step 5: Create RLS policies
-- Allow anonymous users to insert (for public form submissions)
CREATE POLICY "Allow public inserts" ON "ai-workshop"
  FOR INSERT TO anon WITH CHECK (true);

-- Allow authenticated users to read all records (for admin access)
CREATE POLICY "Allow authenticated reads" ON "ai-workshop"
  FOR SELECT TO authenticated USING (true);

-- Step 6: Verify the table was created successfully
-- Run this query to check the table structure:
-- SELECT column_name, data_type, is_nullable, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'ai-workshop'
-- ORDER BY ordinal_position;
