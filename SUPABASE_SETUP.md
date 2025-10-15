# Supabase Setup Guide for Workshop Registration Form

## Overview
This guide will help you set up the Supabase database table to receive workshop registration submissions.

**Project:** gkecjrbkkfylduoriggl
**Table Name:** `ai-workshop`

---

## Step 1: Access Supabase SQL Editor

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: **gkecjrbkkfylduoriggl**
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**

---

## Step 2: Create the Table

Copy and paste the following SQL into the SQL Editor:

```sql
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

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_ai_workshop_email ON "ai-workshop"(email);
CREATE INDEX IF NOT EXISTS idx_ai_workshop_created_at ON "ai-workshop"(created_at DESC);
```

Click **Run** to execute the SQL.

---

## Step 3: Enable Row Level Security (RLS)

RLS ensures that only authorized users can access your data. Run this SQL:

```sql
-- Enable RLS
ALTER TABLE "ai-workshop" ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for form submissions)
CREATE POLICY "Allow public inserts" ON "ai-workshop"
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read all records (for your admin access)
CREATE POLICY "Allow authenticated reads" ON "ai-workshop"
  FOR SELECT
  TO authenticated
  USING (true);
```

**What this does:**
- ✅ Enables security on the table
- ✅ Allows anonymous users (website visitors) to INSERT data (submit forms)
- ✅ Allows only authenticated users (you) to SELECT (view) the data

---

## Step 4: Get Your Supabase Credentials

1. In Supabase Dashboard, go to **Settings** → **API**
2. Find these values:
   - **Project URL**: `https://gkecjrbkkfylduoriggl.supabase.co`
   - **anon/public key**: (long string starting with `eyJ...`)

3. Copy the **anon key** (NOT the service_role key)

---

## Step 5: Update Environment Variables

Edit your `.env.local` file and add your actual anon key:

```env
NEXT_PUBLIC_SUPABASE_URL=https://gkecjrbkkfylduoriggl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

**Important:** Replace `your_actual_anon_key_here` with the actual key you copied.

---

## Step 6: Verify the Setup

### Check Table Structure
Run this verification query in SQL Editor:

```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'ai-workshop'
ORDER BY ordinal_position;
```

**Expected output:**
```
column_name    | data_type                   | is_nullable
---------------|----------------------------|-------------
id             | bigint                     | NO
nombre         | text                       | NO
email          | text                       | NO
linkedin       | text                       | NO
referido_por   | text                       | YES
experiencia    | text                       | NO
motivacion     | text                       | NO
created_at     | timestamp with time zone   | YES
```

### Check RLS Policies
```sql
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'ai-workshop';
```

Should show `rowsecurity = true`

---

## Step 7: Test the Form Submission

1. Make sure your dev server is running: `npm run dev`
2. Open [http://localhost:3000](http://localhost:3000)
3. Fill out the workshop application form with test data
4. Submit the form
5. Check your browser console for success message
6. Verify data in Supabase:

```sql
SELECT * FROM "ai-workshop" ORDER BY created_at DESC LIMIT 5;
```

---

## Troubleshooting

### Issue: "Missing Supabase environment variables"
**Solution:** Check that `.env.local` exists and has both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Issue: "Failed to submit application"
**Solution:**
1. Check browser console for detailed error
2. Verify RLS policies are created
3. Make sure you're using the `anon` key, not `service_role` key

### Issue: "Can't see submitted data in Supabase"
**Solution:**
1. Make sure the "Allow authenticated reads" policy exists
2. Log in to Supabase dashboard to view data
3. Run: `SELECT * FROM "ai-workshop";` in SQL Editor

### Issue: Table already exists but has different columns
**Solution:** Drop and recreate the table:
```sql
DROP TABLE IF EXISTS "ai-workshop" CASCADE;
-- Then run the CREATE TABLE command again
```

---

## Data Access

### View All Submissions
```sql
SELECT
  id,
  nombre,
  email,
  experiencia,
  created_at
FROM "ai-workshop"
ORDER BY created_at DESC;
```

### Export to CSV
1. Run the query above in SQL Editor
2. Click the **Download** button
3. Choose CSV format

### Filter by Date
```sql
SELECT * FROM "ai-workshop"
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

---

## Security Best Practices

✅ **DO:**
- Use the `anon` key in your frontend code
- Enable RLS on all tables
- Limit INSERT policy to only allow specific columns
- Regularly review submitted data

❌ **DON'T:**
- Never commit `.env.local` to git (it's in `.gitignore`)
- Never use `service_role` key in frontend code
- Never disable RLS on production tables
- Never share your API keys publicly

---

## Need Help?

If you encounter issues:
1. Check the [Supabase Documentation](https://supabase.com/docs)
2. Review the SQL error messages in the Supabase SQL Editor
3. Check your browser console for client-side errors
4. Verify your environment variables are loaded correctly

---

## Summary

✅ Table created: `ai-workshop`
✅ Columns: 8 fields (id, nombre, email, linkedin, referido_por, experiencia, motivacion, created_at)
✅ RLS enabled with policies
✅ Form connected via API route
✅ Ready to receive submissions!

🎉 Your workshop registration form is now connected to Supabase!
