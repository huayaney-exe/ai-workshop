# Progressive Lead Capture - Deployment Guide

## Pre-Deployment Checklist

- [ ] Review [PROGRESSIVE_LEAD_CAPTURE.md](./PROGRESSIVE_LEAD_CAPTURE.md) documentation
- [ ] Backup existing `ai-workshop` table data
- [ ] Test migration in development environment
- [ ] Verify Supabase environment variables in production

## Deployment Steps

### 1. Database Migration

**Option A: Using Supabase CLI** (Recommended)

```bash
# Ensure you're linked to the correct project
supabase link --project-ref gkecjrbkkfylduoriggl

# Apply migration
supabase db push --file supabase/migrations/20250116_progressive_lead_capture.sql

# Verify migration
supabase db pull
```

**Option B: Using Supabase Dashboard**

1. Go to https://supabase.com/dashboard/project/gkecjrbkkfylduoriggl
2. Navigate to SQL Editor
3. Copy contents of `supabase/migrations/20250116_progressive_lead_capture.sql`
4. Paste and execute
5. Verify success (no errors)

### 2. Verify Schema Changes

Run this verification query in SQL Editor:

```sql
-- Check all columns exist
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'ai-workshop'
ORDER BY ordinal_position;

-- Should include:
-- - status (text, YES)
-- - dropped_at_step (integer, YES)
-- - last_updated_at (timestamp with time zone, YES)
-- - lead_id (uuid, YES)
```

### 3. Deploy Application Code

```bash
# Build locally to test
npm run build

# If build succeeds, commit changes
git add .
git commit -m "Add progressive lead capture system

- Auto-save form data after each step
- Track drop-offs at pricing page
- Upsert logic to prevent duplicates
- Silent failures to avoid UX disruption"

# Push to repository
git push origin main
```

### 4. Vercel Deployment

Your Vercel project should auto-deploy on push. Verify:

1. Go to https://vercel.com/dashboard
2. Check deployment status
3. Review build logs for errors
4. Verify environment variables are set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 5. Post-Deployment Testing

**Test Scenario 1: Complete Flow**

1. Open production site
2. Fill Step 1 (professional info) → Click "Siguiente"
3. Open browser DevTools Console
4. Should see: `Progressive save completed: {...}`
5. Verify in Supabase:
   ```sql
   SELECT * FROM "ai-workshop"
   WHERE status = 'step_1_complete'
   ORDER BY created_at DESC
   LIMIT 1;
   ```

**Test Scenario 2: Pricing Drop-off**

1. Fill Steps 1 and 2
2. Reach pricing page (Step 3)
3. **Close tab without submitting**
4. Verify lead captured:
   ```sql
   SELECT nombre, email, empresa, status
   FROM "ai-workshop"
   WHERE status = 'step_2_complete'
   ORDER BY last_updated_at DESC
   LIMIT 1;
   ```

**Test Scenario 3: Full Submission**

1. Complete all 3 steps and submit
2. Verify status updated to "confirmed":
   ```sql
   SELECT nombre, email, status
   FROM "ai-workshop"
   WHERE email = 'your-test-email@example.com';
   -- Should show status = 'confirmed'
   ```

### 6. Monitoring Setup

**Create Dashboard View in Supabase**

```sql
-- Save this as a view for easy monitoring
CREATE OR REPLACE VIEW workshop_funnel_stats AS
SELECT
  COUNT(*) as total_leads,
  COUNT(*) FILTER (WHERE status = 'confirmed') as confirmed_applications,
  COUNT(*) FILTER (WHERE status = 'step_2_complete') as pricing_dropoffs,
  COUNT(*) FILTER (WHERE status = 'step_1_complete') as early_dropoffs,
  ROUND(COUNT(*) FILTER (WHERE status = 'confirmed') * 100.0 / NULLIF(COUNT(*), 0), 2) as conversion_rate
FROM "ai-workshop"
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days';

-- Query the view
SELECT * FROM workshop_funnel_stats;
```

### 7. Lead Follow-up Process

**Weekly Review Query**

```sql
-- Get pricing drop-offs from last week
SELECT
  nombre,
  email,
  empresa,
  cargo,
  telefono,
  codigo_pais,
  last_updated_at,
  EXTRACT(DAY FROM NOW() - last_updated_at) as days_since_dropout
FROM "ai-workshop"
WHERE
  status = 'step_2_complete'
  AND last_updated_at >= NOW() - INTERVAL '7 days'
ORDER BY last_updated_at DESC;
```

**Export for CRM**

```sql
-- Export to CSV for email campaigns
SELECT
  nombre as "Nombre",
  email as "Email",
  empresa as "Empresa",
  cargo as "Cargo",
  telefono as "Teléfono",
  status as "Estado",
  CASE
    WHEN status = 'step_2_complete' THEN 'Interesado - Precio'
    WHEN status = 'step_1_complete' THEN 'Exploración inicial'
    ELSE 'Confirmado'
  END as "Segmento"
FROM "ai-workshop"
WHERE status != 'confirmed'
ORDER BY last_updated_at DESC;
```

## Rollback Plan

If issues occur, rollback with:

```sql
-- Rollback migration (removes new columns)
ALTER TABLE "ai-workshop"
  DROP COLUMN IF EXISTS status,
  DROP COLUMN IF EXISTS dropped_at_step,
  DROP COLUMN IF EXISTS last_updated_at,
  DROP COLUMN IF EXISTS lead_id;

-- Restore original constraints
ALTER TABLE "ai-workshop"
  ALTER COLUMN motivacion SET NOT NULL,
  ALTER COLUMN confirmacion SET NOT NULL;

-- Remove unique email constraint
DROP INDEX IF EXISTS idx_ai_workshop_email_unique;

-- Remove update policy
DROP POLICY IF EXISTS "Allow public updates for progress" ON "ai-workshop";

-- Remove trigger
DROP TRIGGER IF EXISTS update_ai_workshop_timestamp_trigger ON "ai-workshop";
DROP FUNCTION IF EXISTS update_ai_workshop_timestamp();
```

Then redeploy previous application version:

```bash
git revert HEAD
git push origin main
```

## Success Criteria

✅ **Deployment Successful If**:

1. All 3 test scenarios pass
2. No errors in Vercel build logs
3. Browser console shows progressive saves
4. Database records created with correct status values
5. Existing functionality (full form submission) still works

❌ **Deployment Failed If**:

1. Form submission returns errors
2. Progressive saves don't create records
3. Duplicate records created on submission
4. Build fails or runtime errors occur

## Post-Deployment Monitoring (First 48 Hours)

**Check Daily**:

```sql
-- Daily stats
SELECT
  DATE(created_at) as date,
  COUNT(*) as total_leads,
  COUNT(*) FILTER (WHERE status = 'confirmed') as confirmed,
  COUNT(*) FILTER (WHERE status = 'step_2_complete') as pricing_dropoff
FROM "ai-workshop"
WHERE created_at >= CURRENT_DATE - 2
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

**Watch For**:

- Unexpected increase in error logs
- Zero progressive saves (indicates feature broken)
- Duplicate email records (upsert not working)
- Performance degradation (check query times)

## Support Contacts

**Technical Issues**:
- Check Vercel logs: https://vercel.com/dashboard
- Check Supabase logs: https://supabase.com/dashboard/project/gkecjrbkkfylduoriggl/logs

**Documentation**:
- [PROGRESSIVE_LEAD_CAPTURE.md](./PROGRESSIVE_LEAD_CAPTURE.md) - Full feature documentation
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Database setup guide

## Next Steps After Successful Deployment

1. **Week 1**: Monitor funnel stats, verify data quality
2. **Week 2**: Export pricing drop-offs, test follow-up email
3. **Week 3**: Analyze conversion rates, optimize messaging
4. **Month 1**: Review ROI of progressive capture vs. regular form

## Notes

- **No User-Facing Changes**: Users won't notice any difference
- **Backward Compatible**: Existing form submissions work exactly as before
- **Safe Failures**: If progressive save fails, form still works
- **Privacy Compliant**: Data stored securely, users can request deletion
