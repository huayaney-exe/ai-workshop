# Progressive Lead Capture Documentation

## Overview

The progressive lead capture system automatically saves user data as they complete each step of the workshop application form. This ensures we don't lose leads when users drop off before final submission (e.g., after seeing the pricing).

## How It Works

### User Journey

1. **Step 1 - Professional Info**: User fills empresa, experiencia, cargo, linkedin
   - ⏭️ Validate → Next (no save)

2. **Step 2 - Personal Info**: User fills nombre, email, telefono
   - ✅ **Auto-saved** after validation with status: `step_2_complete`
   - **Critical moment**: Before user sees pricing

3. **Step 3 - Pricing & Confirmation**: User sees price (S/ 670), applies coupon, confirms
   - Drop-off → ⭐⭐ Lead captured with complete contact info
   - Confirms → ✅ **Updated to confirmed** with status: `confirmed`

### Silent Save Behavior

- **No UI changes**: Users don't see any "saving" indicators
- **Non-blocking**: If save fails, form progression continues normally
- **Idempotent**: Uses email as unique key - updates existing record if found
- **Privacy-respecting**: Data stored securely in Supabase with RLS policies

## Database Schema

### New Columns in `ai-workshop` table:

```sql
status TEXT DEFAULT 'step_2_complete'
  -- Values: 'step_2_complete', 'confirmed'

dropped_at_step INTEGER
  -- Tracks where user stopped: 2, or NULL if confirmed

last_updated_at TIMESTAMPTZ DEFAULT NOW()
  -- Auto-updated on each save

lead_id UUID DEFAULT gen_random_uuid()
  -- Unique identifier for tracking across saves
```

### Existing Schema (No Changes Required):

```sql
-- Core fields (all NOT NULL)
nombre TEXT NOT NULL
email TEXT NOT NULL
empresa TEXT NOT NULL
experiencia TEXT NOT NULL
cargo TEXT NOT NULL
linkedin TEXT NOT NULL
telefono TEXT NOT NULL DEFAULT ''
codigo_pais TEXT NOT NULL DEFAULT '+51'

-- Optional fields (nullable)
motivacion TEXT NULL
confirmacion BOOLEAN NULL DEFAULT TRUE
referido_por TEXT NULL
fue_referido BOOLEAN NULL DEFAULT FALSE
precio_final NUMERIC(10,2) NULL
codigo_cupon TEXT NULL
```

## API Endpoints

### 1. `/api/workshop/save-progress` (NEW)

**Purpose**: Progressive save after each step

**Method**: POST

**Request Body**:
```json
{
  "step": 1 | 2,
  "empresa": "string",
  "experiencia": "string",
  "cargo": "string",
  "linkedin": "string",
  "nombre": "string",
  "email": "string",
  "telefono": "string",
  "codigoPais": "string",
  "fueReferido": boolean,
  "referidoPor": "string"
}
```

**Response** (Always 200, even on failure):
```json
{
  "success": true,
  "saved": true | false,
  "lead_id": "uuid",
  "status": "step_1_complete" | "step_2_complete",
  "message": "string"
}
```

**Key Features**:
- Upserts by email (insert or update)
- Silent failures (returns success to avoid UX disruption)
- Returns lead_id for tracking

### 2. `/api/workshop/apply` (MODIFIED)

**Changes**:
- Now accepts optional `leadId` parameter
- Upserts instead of pure insert
- Sets `status: 'confirmed'` on final submission
- Uses email as conflict key for upsert

## Lead Status Analysis

### Query Examples

```sql
-- Total leads (including drops)
SELECT COUNT(*) FROM "ai-workshop";

-- Confirmed applications only
SELECT COUNT(*) FROM "ai-workshop"
WHERE status = 'confirmed';

-- Pricing page drop-offs (interested but price-sensitive)
SELECT
  nombre,
  email,
  empresa,
  cargo,
  last_updated_at
FROM "ai-workshop"
WHERE status = 'step_2_complete'
ORDER BY last_updated_at DESC;

-- Conversion funnel analysis
SELECT
  status,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM "ai-workshop"), 2) as percentage
FROM "ai-workshop"
GROUP BY status
ORDER BY
  CASE status
    WHEN 'confirmed' THEN 1
    WHEN 'step_2_complete' THEN 2
    WHEN 'step_1_complete' THEN 3
  END;

-- Recent drop-offs (last 7 days)
SELECT
  nombre,
  email,
  empresa,
  status,
  last_updated_at
FROM "ai-workshop"
WHERE
  status != 'confirmed'
  AND last_updated_at >= NOW() - INTERVAL '7 days'
ORDER BY last_updated_at DESC;
```

### Lead Quality Tiers

1. ⭐⭐⭐ **CONFIRMED** (`status = 'confirmed'`)
   - Completed all steps
   - Saw pricing and confirmed interest
   - Highest intent - ready for follow-up

2. ⭐⭐ **STEP 2 COMPLETE** (`status = 'step_2_complete'`)
   - Provided professional + personal info
   - Dropped at pricing page
   - Good lead - price-sensitive, needs nurturing

3. ⭐ **STEP 1 COMPLETE** (`status = 'step_1_complete'`)
   - Professional info only
   - Early exploration stage
   - Lower intent - monitor for patterns

## Migration Instructions

### Step 1: Apply Database Migration

```bash
# Using Supabase CLI
supabase db push --file supabase/migrations/20250116_progressive_lead_capture.sql

# OR using SQL Editor in Supabase Dashboard
# Copy and paste the migration file contents
```

### Step 2: Verify Schema Changes

```sql
-- Check new columns exist
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'ai-workshop'
ORDER BY ordinal_position;

-- Check RLS policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'ai-workshop';
```

### Step 3: Test Progressive Save

1. Fill Step 1 → Click "Siguiente"
   - Check browser console for save confirmation
   - Query: `SELECT * FROM "ai-workshop" WHERE status = 'step_1_complete' ORDER BY created_at DESC LIMIT 1;`

2. Fill Step 2 → Click "Siguiente"
   - Check console again
   - Query: `SELECT * FROM "ai-workshop" WHERE status = 'step_2_complete' ORDER BY last_updated_at DESC LIMIT 1;`

3. Complete Step 3 → Submit form
   - Verify status updated to `confirmed`
   - Query: `SELECT * FROM "ai-workshop" WHERE status = 'confirmed' ORDER BY last_updated_at DESC LIMIT 1;`

## Follow-Up Strategies

### For `step_2_complete` Leads (Pricing Drop-offs)

**Email Campaign**:
```
Subject: ¿Tienes preguntas sobre el Workshop AI Native?

Hola [nombre],

Notamos que iniciaste tu aplicación para el Workshop AI Native.

¿Tienes alguna pregunta sobre el programa o la inversión?

Ofrecemos opciones de pago y descuentos especiales para aplicaciones tempranas.

¿Te gustaría una llamada de 15 minutos para resolver tus dudas?
```

**Discount Offer**:
- Send special discount code
- Limited time offer (creates urgency)
- Emphasize value and ROI

### For `step_1_complete` Leads (Early Drop-offs)

**Nurture Campaign**:
```
Subject: Recursos gratuitos: Cómo empezar con IA en producto

Hola [nombre],

Vimos tu interés en nuestro Workshop AI Native.

Antes de decidir, te compartimos algunos recursos gratuitos:
- Guía: 10 casos de uso de IA en gestión de producto
- Webinar grabado: Introducción a herramientas IA
- Checklist: ¿Estás listo para IA-native?

[Links a recursos]
```

## Privacy & Compliance

### Data Protection

- ✅ All data encrypted at rest (Supabase default)
- ✅ RLS policies prevent unauthorized access
- ✅ Email stored in lowercase for consistency
- ✅ No sensitive data collected in early steps

### User Rights

Users can request:
- **Data access**: Provide all stored information
- **Data deletion**: Remove from database
- **Opt-out**: Stop follow-up communications

### Best Practices

1. **Transparency**: Privacy notice mentions data storage
2. **Minimal data**: Only collect what's needed for each step
3. **Secure storage**: Supabase with proper RLS policies
4. **Respectful follow-up**: Don't spam, provide value

## Troubleshooting

### Progressive Save Not Working

**Check 1: Browser Console**
```javascript
// Should see these logs after each step:
"Progressive save completed: {...}"
// OR
"Progressive save not completed: {...}"
```

**Check 2: Database**
```sql
-- Check if records are being created
SELECT * FROM "ai-workshop"
WHERE email = 'test@example.com';
```

**Check 3: API Logs**
```bash
# Check Vercel/server logs for errors
# Look for "Progressive save error (non-blocking)"
```

### Duplicate Records

**Cause**: Email uniqueness constraint not working

**Fix**:
```sql
-- Verify unique index exists
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'ai-workshop'
  AND indexname LIKE '%email%';

-- If missing, create it
CREATE UNIQUE INDEX IF NOT EXISTS idx_ai_workshop_email_unique
ON "ai-workshop"(LOWER(email));
```

### Status Not Updating

**Cause**: Upsert not finding existing record

**Debug**:
```sql
-- Find records that should be updated
SELECT id, email, status, last_updated_at
FROM "ai-workshop"
WHERE LOWER(email) = 'test@example.com';
```

**Fix**: Ensure email is lowercased in both save-progress and apply endpoints

## Performance Considerations

### Database Impact

- **Writes**: 2-3x increase (1 per step vs 1 total)
- **Storage**: Minimal (partial records temporary)
- **Indexes**: Email index ensures fast upserts

### Optimization

```sql
-- Add composite index if needed
CREATE INDEX IF NOT EXISTS idx_ai_workshop_status_updated
ON "ai-workshop"(status, last_updated_at DESC);

-- For funnel analysis queries
CREATE INDEX IF NOT EXISTS idx_ai_workshop_funnel
ON "ai-workshop"(status, created_at DESC)
WHERE status != 'confirmed';
```

## Success Metrics

### Expected Outcomes

**Before Progressive Save**:
- Drop-off rate at pricing: 30-40%
- Lead capture rate: ~60-70%

**After Progressive Save**:
- Drop-off rate at pricing: 30-40% (unchanged)
- Lead capture rate: ~95-98% (significant increase)

**Value**:
- Capture 60-70% more leads
- Identify price-sensitive prospects
- Enable targeted follow-up campaigns

### Monitoring

```sql
-- Weekly dashboard query
SELECT
  DATE_TRUNC('week', created_at) as week,
  COUNT(*) FILTER (WHERE status = 'confirmed') as confirmed,
  COUNT(*) FILTER (WHERE status = 'step_2_complete') as pricing_dropoff,
  COUNT(*) FILTER (WHERE status = 'step_1_complete') as early_dropoff,
  COUNT(*) as total_leads,
  ROUND(COUNT(*) FILTER (WHERE status = 'confirmed') * 100.0 / COUNT(*), 2) as conversion_rate
FROM "ai-workshop"
WHERE created_at >= NOW() - INTERVAL '4 weeks'
GROUP BY week
ORDER BY week DESC;
```

## Support

For questions or issues:
1. Check browser console for client-side errors
2. Check Vercel logs for server-side errors
3. Query database to verify data flow
4. Review this documentation for common solutions
