# LinkSnip — URL Shortener + Analytics

Free URL shortener with deep analytics. Next.js + Neon + NextAuth + Tailwind.

## Features
- Shorten URLs instantly (no login required for guests)
- Deep analytics: clicks, country, device, browser, referrer
- Light / Dark theme toggle
- English & Bengali (bn) language support
- Mobile responsive
- Google OAuth login
- 100% Free stack

## Quick Setup

### 1. Install
```bash
npm install
```

### 2. Create .env.local
```
DATABASE_URL=postgresql://...  # from neon.tech
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=run: openssl rand -base64 32
GOOGLE_CLIENT_ID=from Google Cloud Console
GOOGLE_CLIENT_SECRET=from Google Cloud Console
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run DB migrations
```bash
npm run db:push
```

### 4. Start
```bash
npm run dev
```

## Deploy to Vercel
1. Push to GitHub
2. Import repo at vercel.com
3. Add all env vars
4. Deploy!

## Tech Stack
| | |
|---|---|
| Framework | Next.js 14 App Router |
| Database | Neon (PostgreSQL) + Drizzle ORM |
| Auth | NextAuth.js v5 (Google) |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Redirect | Vercel Edge Middleware |
| Email | Resend (optional) |

## Free Limits
- Neon: 3GB storage, always-on
- Vercel: Hobby plan, unlimited deploys
- ip-api.com: 45 req/min geo lookup
- Total cost: $0/month
