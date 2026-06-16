# Stacko — Digital Banking App

RAK Bank–inspired digital banking app built with Next.js App Router, React, TypeScript, and Tailwind CSS.

---

## Quick start (local)

```bash
cd "d:\app project\INVEST01"
npm install
npm run dev
```

Open **http://localhost:3000**

---

## App flow

| Screen | Route | Description |
|--------|-------|-------------|
| Welcome slideshow | `/` | RAKBank-style carousel → Sign in / Sign up |
| Sign in | `/login` | Existing users → dashboard |
| Sign up | `/signup` | New users → onboarding |
| Onboarding | `/onboarding` | Profile form → 500 AED bonus |
| Dashboard | `/dashboard` | Main banking home |
| Accounts | `/accounts` | Account list & balances |
| Cards | `/cards` | Debit/credit cards, freeze |
| Transfers | `/transfers` | Send money form |
| Profile | `/profile` | User details & settings |

### Demo account (skips onboarding)

- Email: `demo@stacko.com`
- Password: `demo123`

---

## Why you did NOT receive email

**Emails are not sent automatically until you configure email delivery.**

Right now, without `.env.local` settings, the app only **logs** emails to the terminal where `npm run dev` is running. Nothing is sent to `sani123456@protonmail.com` until you complete one of the setups below.

### What you need to do (pick ONE option)

#### Option A — Resend (recommended for going live)

1. Sign up at [resend.com](https://resend.com) (free tier available)
2. Copy your API key
3. Create `.env.local`:

```env
NOTIFY_EMAIL=sani123456@protonmail.com
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM=Stacko <onboarding@resend.dev>
```

4. Restart the dev server (`npm run dev`)

#### Option B — Gmail SMTP

1. Enable 2FA on your Gmail account
2. Create an [App Password](https://myaccount.google.com/apppasswords)
3. Create `.env.local`:

```env
NOTIFY_EMAIL=sani123456@protonmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your-16-char-app-password
SMTP_FROM=Stacko <your@gmail.com>
```

4. Restart the dev server

> **Note:** ProtonMail cannot receive SMTP-sent mail from the app directly unless you use **Proton Mail Bridge** (desktop app) or forward from another SMTP provider. Easiest path: use Resend or Gmail to *send* notifications *to* your ProtonMail inbox.

---

## Change your logo

### Image logo (recommended)

1. Put your logo file in `public/` — e.g. `public/logo.png`
2. Edit `config/brand.ts`:

```ts
export const brand = {
  name: 'Stacko',
  logoImage: '/logo.png',   // ← set this
  logoLetter: 'S',
  welcomeText: 'Welcome to Stacko',
}
```

### Letter logo (default)

Leave `logoImage: null` — shows red square with letter `S`. Change `logoLetter` and `name` in the same file.

---

## Slideshow images

**Folder:** `public/slideshow/`

| File | Purpose |
|------|---------|
| `slide-1.png` | First welcome slide |
| `slide-2.png` | Second welcome slide |
| `slide-3.png` | Third welcome slide |

Replace these files with your own images (PNG, JPG, or WebP). Update filenames in `config/brand.ts` if needed.

Slides auto-advance every 5 seconds. Tap left/right or use the progress bars to switch manually.

Your RAKBank reference images are already copied into this folder.

---

## Run the app LIVE (production)

### Option 1 — Vercel (easiest, free tier)

1. Push the project to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Add environment variables (same as `.env.local`):
   - `NOTIFY_EMAIL`
   - `RESEND_API_KEY` or `SMTP_*`
4. Deploy — you get a live URL like `https://stacko.vercel.app`

```bash
# Or deploy from CLI:
npm i -g vercel
vercel
```

### Option 2 — Your own server (VPS)

```bash
npm run build
npm start
```

Runs on port 3000. Use Nginx or Caddy as reverse proxy + SSL (Let's Encrypt).

### Option 3 — Docker (optional)

```bash
docker build -t stacko .
docker run -p 3000:3000 --env-file .env.local stacko
```

---

## Environment variables summary

| Variable | Required | Description |
|----------|----------|-------------|
| `NOTIFY_EMAIL` | Yes | Where alerts are sent (`sani123456@protonmail.com`) |
| `RESEND_API_KEY` | Option A | Resend API key |
| `RESEND_FROM` | Option A | Sender address |
| `SMTP_HOST` | Option B | SMTP server |
| `SMTP_PORT` | Option B | Usually `587` |
| `SMTP_USER` | Option B | SMTP username |
| `SMTP_PASS` | Option B | SMTP password / app password |
| `SMTP_FROM` | Option B | Sender address |

Copy `.env.example` to `.env.local` and fill in values.

---

## Design

- Primary Red: `#C11114`
- Background: `#FAF8F8`
- Font: Inter
- Layout: Bento grid, sidebar (desktop), bottom nav (mobile)

---

## Tech stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Lucide React
- Nodemailer + Resend (email)
