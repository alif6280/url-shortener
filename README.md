<div align="center">

# ✂️ LinkSnip

**A modern, fast and powerful URL Shortener**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-linksnip--io.vercel.app-6366f1?style=for-the-badge)](https://linksnip-io.vercel.app)

[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=flat-square)](https://orm.drizzle.team/)
[![Neon](https://img.shields.io/badge/Neon-PostgreSQL-00E5BE?style=flat-square)](https://neon.tech/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[🌐 Live Demo](https://linksnip-io.vercel.app) · [🐛 Report Bug](https://github.com/alif6280/url-shortener/issues) · [✨ Request Feature](https://github.com/alif6280/url-shortener/issues)

</div>

---

## 🌐 Live Demo

👉 **[https://linksnip-io.vercel.app](https://linksnip-io.vercel.app)**

---

## 👤 Without an Account

> No login required to get started!

- ✅ Shorten any long URL instantly
- ✅ Set a custom alias (e.g. `/my-portfolio`)
- ✅ Copy short link with one click
- ✅ View basic analytics
- ✅ Generate & download QR Codes

---

## 🔐 What You Get After Login

> Sign in with **GitHub** in one click — no password needed!

### 🔗 Link Management

| Feature | Description |
|---------|-------------|
| **Unlimited Links** | Create as many links as you want |
| **Custom Alias** | Set your own slug like `/my-blog` |
| **Enable / Disable** | Toggle any link on or off anytime |
| **Delete Links** | Remove links you no longer need |
| **Link History** | View and manage all your links in one place |

### 📊 Advanced Analytics

Every link comes with a detailed analytics dashboard:

| Analytics | Description |
|-----------|-------------|
| **Total Clicks** | Total number of times your link was clicked |
| **Unique Visitors** | Number of unique visitors |
| **Clicks Over Time** | Daily click chart with trends |
| **By Country** | See which countries your traffic comes from |
| **By Device** | Mobile / Desktop / Tablet breakdown |
| **By Browser** | Chrome, Firefox, Safari and more |
| **By Referrer** | Which websites are sending you traffic |
| **Top Country** | Your highest traffic source country |

### 📱 QR Code

- Auto-generated QR Code for every link
- Download as **PNG** format
- Perfect for print, posters, or sharing

---

## ✨ Features at a Glance

```
✂️  URL Shortening          — Shorten any long URL in seconds
🎯  Custom Alias            — Create branded short URLs your way
📊  Deep Analytics          — Track clicks, country, device & browser
📱  QR Code Generator       — Auto QR for every link, PNG download included
🔐  GitHub OAuth Login      — Secure, passwordless authentication
🌙  Dark / Light Mode       — Beautiful theme toggle
🌍  Bilingual Support       — English and Bengali language support
⚡  ~30ms Redirect Speed    — Powered by Vercel Edge Network
🔒  Privacy First           — IP addresses are hashed, never stored raw
⏸️  Enable / Disable Links  — Control which links are active
🗑️  Delete Links            — Clean up links anytime
📋  One-click Copy          — Copy your short URL instantly
```

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 + Radix UI |
| **Database** | Neon PostgreSQL (Serverless) |
| **ORM** | Drizzle ORM |
| **Auth** | NextAuth v5 (GitHub OAuth) |
| **Charts** | Recharts |
| **i18n** | next-intl (EN + BN) |
| **Deployment** | Vercel Edge Network |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Neon PostgreSQL database
- GitHub OAuth App

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/alif6280/url-shortener.git
cd url-shortener
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**
```bash
cp .env.example .env.local
```

```env
DATABASE_URL=your_neon_database_url

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**4. Push database schema**
```bash
npm run db:push
```

**5. Start the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## ⚙️ Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `NEXTAUTH_URL` | Your app URL (e.g. http://localhost:3000) |
| `NEXTAUTH_SECRET` | Random secret — run `openssl rand -base64 32` |
| `GITHUB_CLIENT_ID` | GitHub OAuth App Client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth App Client Secret |
| `NEXT_PUBLIC_APP_URL` | Public-facing URL of your app |

---

## 📁 Project Structure

```
url-shortener/
├── app/
│   ├── api/
│   │   ├── auth/          # NextAuth endpoints
│   │   ├── links/         # Link CRUD + click tracking
│   │   └── analytics/     # Analytics data API
│   ├── dashboard/         # User dashboard + per-link analytics
│   ├── login/             # GitHub OAuth login page
│   └── [slug]/            # Short link redirect handler
├── components/
│   ├── analytics/         # Chart components (clicks, country, device)
│   ├── link-card.tsx      # Link card with all actions
│   ├── shorten-form.tsx   # URL shortening form
│   ├── hero-section.tsx   # Landing page hero
│   └── navbar.tsx         # Navigation bar
├── lib/
│   └── db/schema.ts       # Drizzle ORM schema
├── messages/              # i18n translations (EN + BN)
└── hooks/                 # Custom React hooks
```

---

## 📜 Available Scripts

```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run start         # Start production server
npm run db:push       # Push schema to Neon database
npm run db:studio     # Open Drizzle Studio (DB GUI)
npm run db:generate   # Generate migrations
```

---

## 🚢 Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/alif6280/url-shortener)

1. Click the button above
2. Add all environment variables
3. Hit Deploy ✅

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---

<div align="center">

Made with ❤️ by [MD. Montasir Monir Alif](https://github.com/alif6280)

**⭐ Star this repo if you find it helpful!**

</div>
