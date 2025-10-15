# Quick Start Guide

## ✅ Status: Ready for Deployment!

The workshop landing page is fully extracted and ready to deploy independently.

## 📦 What's Included

✅ Complete standalone Next.js 15 application
✅ All workshop components and UI elements
✅ PRISMA design system (glass cards, gradient mesh, film grain)
✅ Application form with validation
✅ Countdown timer to registration deadline
✅ Testimonials, instructor profile, agenda
✅ All required assets (logos, images)
✅ Production build tested and working

## 🚀 Deploy to GitHub + Vercel (5 minutes)

### Step 1: Create GitHub Repository

```bash
# Navigate to the standalone directory
cd /Users/luishuayaney/prisma-saas-nextjs/workshop-lima-standalone

# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/workshop-lima-landing.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and log in
2. Click **"New Project"**
3. Import your GitHub repository
4. Vercel auto-detects Next.js settings
5. Click **"Deploy"**

🎉 **Done!** Your workshop landing page will be live in ~2 minutes at a vercel.app URL.

### Optional: Add Custom Domain

1. In Vercel dashboard → Project Settings → Domains
2. Add: `workshop-lima.getprisma.io`
3. Update your DNS with the provided records

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3000
```

## 📝 Customization

### Update Workshop Date/Deadline

Edit [src/components/workshop/countdown-timer.tsx](src/components/workshop/countdown-timer.tsx):

```typescript
const targetDate = new Date("2025-11-01T13:00:00-05:00").getTime();
```

### Connect Application Form

Edit [src/components/workshop/workshop-application-form.tsx](src/components/workshop/workshop-application-form.tsx):

**Option A**: Connect to API
```typescript
const response = await fetch('/api/apply', {
  method: 'POST',
  body: JSON.stringify(data),
});
```

**Option B**: Use mailto (temporary solution)
```typescript
const body = `Nombre: ${data.nombre}\nEmail: ${data.email}...`;
window.location.href = `mailto:workshop@getprisma.io?subject=Application&body=${encodeURIComponent(body)}`;
```

### Change Content

Main content is in [src/app/workshop-client.tsx](src/app/workshop-client.tsx)

## 📊 Project Structure

```
workshop-lima-standalone/
├── src/
│   ├── app/                    # Next.js pages
│   ├── components/
│   │   ├── prisma/            # Design system
│   │   ├── ui/                # UI components
│   │   └── workshop/          # Workshop components
│   └── lib/utils.ts           # Utilities
├── public/                     # Static assets
├── README.md                   # Full documentation
├── DEPLOYMENT.md              # Deployment guide
└── package.json
```

## 🔗 Next Steps

1. ✅ Push to GitHub
2. ✅ Deploy to Vercel
3. 📧 Connect form submission (API or mailto)
4. 🌐 Add custom domain (optional)
5. 📊 Add analytics (optional)

## 📚 Documentation

- **Full README**: [README.md](README.md)
- **Deployment Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)

## ❓ Need Help?

Contact: workshop@getprisma.io
