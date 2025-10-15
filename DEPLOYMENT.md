# Deployment Guide

## Quick Deploy to GitHub + Vercel

### Step 1: Create GitHub Repository

```bash
# Create a new repository on GitHub (e.g., workshop-lima-landing)
# Then push this code:

git remote add origin https://github.com/YOUR_USERNAME/workshop-lima-landing.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

**That's it!** Your site will be live in ~2 minutes.

### Optional: Custom Domain

In Vercel dashboard:
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `workshop-lima.getprisma.io`)
3. Follow DNS configuration instructions

### Environment Variables (Optional)

If you need custom configuration:

1. In Vercel dashboard → Settings → Environment Variables
2. Add: `NEXT_PUBLIC_SITE_URL` = `https://your-domain.com`

---

## Alternative: Deploy to Netlify

### Via Git

1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your repository
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
5. Deploy!

### Via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

---

## Alternative: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects Next.js
6. Click "Deploy"

---

## Alternative: Deploy to Render

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your repository
4. Build settings:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Deploy!

---

## Manual Build (Any Hosting)

```bash
# Build the application
npm run build

# This creates an optimized production build in .next/
# You can then deploy the entire directory to any Node.js host

# Start production server
npm start
```

### Static Export (Optional)

To generate a fully static site:

1. Modify `next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  output: 'export',
};
```

2. Build:
```bash
npm run build
```

3. Deploy the `out/` directory to any static host (Netlify, Vercel, S3, etc.)

**Note**: Static export limitations:
- No dynamic API routes
- No server-side rendering
- Image optimization requires external service

---

## Post-Deployment Checklist

- [ ] Verify all images load correctly
- [ ] Test application form submission
- [ ] Check countdown timer displays correctly
- [ ] Verify responsive design on mobile
- [ ] Test Open Graph images in social share preview
- [ ] Check custom domain DNS propagation (if applicable)
- [ ] Set up analytics (optional)
- [ ] Configure form submission endpoint or mailto

---

## Monitoring & Analytics

### Add PostHog (Optional)

```bash
npm install posthog-js
```

Add to `src/app/layout.tsx`:

```typescript
import posthog from 'posthog-js'

if (typeof window !== 'undefined') {
  posthog.init('YOUR_API_KEY', {
    api_host: 'https://app.posthog.com'
  })
}
```

### Add Google Analytics (Optional)

Use `next/script` in `src/app/layout.tsx`:

```typescript
import Script from 'next/script'

// In <head>:
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

---

## Troubleshooting

### Build Fails

1. Check Node.js version (requires 18+)
2. Delete `node_modules` and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Images Not Loading

1. Verify images are in `/public` directory
2. Check image paths start with `/` (e.g., `/logo-4dkbg.svg`)
3. Ensure proper Next.js Image configuration

### Form Not Submitting

The form currently simulates submission. To implement real submission:

1. **Option A: API Route**
   - Create `/src/app/api/apply/route.ts`
   - Handle POST request with form data
   - Send to your database or email service

2. **Option B: Email Submission**
   - Uncomment the `mailto` link in `workshop-application-form.tsx`
   - Or integrate with SendGrid/Resend

3. **Option C: Form Service**
   - Use Formspree, Tally, or Typeform
   - Redirect to external form

---

## Support

Issues? Contact: workshop@getprisma.io
