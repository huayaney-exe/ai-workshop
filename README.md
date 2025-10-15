# Workshop Lima - Product Management AI Native

Standalone landing page for the AI-Native Product Management Workshop in Lima.

## Overview

This is a standalone Next.js 15 application for the PRISMA AI-Native Product Management Workshop landing page. It includes:

- Workshop information and agenda
- Instructor profile
- Application form (2-step process)
- Testimonials
- Countdown timer to registration deadline

## Tech Stack

- **Framework**: Next.js 15.4.3
- **React**: 19.1.0
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Radix UI primitives
- **Forms**: React Hook Form + Zod validation
- **TypeScript**: 5.x

## Getting Started

### Prerequisites

- Node.js 18+ or higher
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Run development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Optional: Custom site URL (defaults to localhost:3000 in dev)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/workshop-lima-standalone)

1. Push this repository to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Set environment variables if needed
5. Deploy!

### Deploy to Other Platforms

This is a standard Next.js application and can be deployed to:

- **Netlify**: Add `next.config.ts` and deploy
- **Cloudflare Pages**: Compatible with Next.js
- **Railway**: One-click deploy
- **Render**: Static site or web service
- **AWS Amplify**: Full Next.js support

## Project Structure

```
workshop-lima-standalone/
├── public/                      # Static assets
│   ├── logo-4dkbg.svg          # PRISMA logo
│   ├── prisma-og-image.jpg     # OG image
│   ├── profile.jpeg            # Instructor photo
│   └── *.jpeg                  # Testimonial photos
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page
│   │   ├── workshop-client.tsx # Workshop client component
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── prisma/             # PRISMA design system
│   │   │   ├── prisma-card.tsx
│   │   │   ├── gradient-mesh.tsx
│   │   │   └── film-grain-overlay.tsx
│   │   ├── ui/                 # Shadcn UI components
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   └── textarea.tsx
│   │   └── workshop/           # Workshop-specific components
│   │       ├── countdown-timer.tsx
│   │       ├── workshop-application-form.tsx
│   │       ├── testimonial-carousel.tsx
│   │       ├── comparison-section.tsx
│   │       ├── agenda-timeline.tsx
│   │       ├── instructor-hero.tsx
│   │       └── qualification-grid.tsx
│   └── lib/
│       └── utils.ts            # Utility functions
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── README.md
```

## Key Features

### Workshop Application Form

- **Multi-step form**: 2-step application process
- **Validation**: Zod schema validation
- **Form state**: React Hook Form
- **Success state**: Confirmation message after submission

### Countdown Timer

- Real-time countdown to registration deadline (Nov 1, 2025, 1 PM Lima time)
- Updates every second
- Responsive design

### Design System

- **Glass morphism cards**: Modern frosted glass effect
- **Gradient mesh background**: Animated gradient orbs
- **Film grain overlay**: Subtle texture for premium feel
- **PRISMA brand colors**: #47FFBF, #286CFF, #8376FF, #FF48C7

### SEO & Metadata

- Open Graph tags for social sharing
- Twitter Card metadata
- Structured data for search engines
- Semantic HTML

## Customization

### Update Workshop Details

Edit dates, pricing, or content in:
- [src/components/workshop/countdown-timer.tsx](src/components/workshop/countdown-timer.tsx) - Registration deadline
- [src/app/page.tsx](src/app/page.tsx) - Meta description and title
- [src/app/workshop-client.tsx](src/app/workshop-client.tsx) - Main content

### Modify Application Form

Form validation schema in:
- [src/components/workshop/workshop-application-form.tsx](src/components/workshop/workshop-application-form.tsx)

To connect to an actual backend:
1. Replace the `onSubmit` function with your API endpoint
2. Or use the commented `mailto` link for email submissions

### Change Branding

Update colors in [src/app/globals.css](src/app/globals.css) CSS variables section.

## License

© 2025 PRISMA. All rights reserved.

## Support

For issues or questions, contact: workshop@getprisma.io
