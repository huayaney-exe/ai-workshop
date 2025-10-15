-- Alternative migration: Update existing table by adding new columns
-- This preserves existing data if you have any

-- Step 1: Add new columns if they don't exist
ALTER TABLE "ai-workshop"
ADD COLUMN IF NOT EXISTS empresa TEXT,
ADD COLUMN IF NOT EXISTS cargo TEXT,
ADD COLUMN IF NOT EXISTS fue_referido BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS confirmacion BOOLEAN DEFAULT TRUE;

-- Step 2: Update existing columns that might have different types
-- (Skip if column doesn't exist)
DO $$
BEGIN
    -- Make sure nombre exists and is TEXT
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'ai-workshop' AND column_name = 'nombre') THEN
        ALTER TABLE "ai-workshop" ADD COLUMN nombre TEXT;
    END IF;

    -- Make sure email exists and is TEXT
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'ai-workshop' AND column_name = 'email') THEN
        ALTER TABLE "ai-workshop" ADD COLUMN email TEXT;
    END IF;

    -- Make sure experiencia exists and is TEXT
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'ai-workshop' AND column_name = 'experiencia') THEN
        ALTER TABLE "ai-workshop" ADD COLUMN experiencia TEXT;
    END IF;

    -- Make sure linkedin exists and is TEXT
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'ai-workshop' AND column_name = 'linkedin') THEN
        ALTER TABLE "ai-workshop" ADD COLUMN linkedin TEXT;
    END IF;

    -- Make sure referido_por exists and is TEXT
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'ai-workshop' AND column_name = 'referido_por') THEN
        ALTER TABLE "ai-workshop" ADD COLUMN referido_por TEXT;
    END IF;
END $$;

-- Step 3: Drop old columns that are no longer needed
-- Comment out if you want to keep old data
-- ALTER TABLE "ai-workshop" DROP COLUMN IF EXISTS motivacion;

-- Step 4: Make required columns NOT NULL (after ensuring they exist)
-- Run these one by one if you have existing data with nulls
-- ALTER TABLE "ai-workshop" ALTER COLUMN empresa SET NOT NULL;
-- ALTER TABLE "ai-workshop" ALTER COLUMN cargo SET NOT NULL;
-- ALTER TABLE "ai-workshop" ALTER COLUMN nombre SET NOT NULL;
-- ALTER TABLE "ai-workshop" ALTER COLUMN email SET NOT NULL;
-- ALTER TABLE "ai-workshop" ALTER COLUMN experiencia SET NOT NULL;
-- ALTER TABLE "ai-workshop" ALTER COLUMN linkedin SET NOT NULL;

-- Step 5: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ai_workshop_empresa ON "ai-workshop"(empresa);
CREATE INDEX IF NOT EXISTS idx_ai_workshop_cargo ON "ai-workshop"(cargo);
CREATE INDEX IF NOT EXISTS idx_ai_workshop_email_new ON "ai-workshop"(email);

-- Step 6: Verify the table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'ai-workshop'
ORDER BY ordinal_position;
