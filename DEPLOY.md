# Stacko — Resend + Vercel Deployment Guide

Follow these steps in order.

---

## Part 1: Resend setup (email notifications)

### Step 1 — Create a Resend account

1. Go to **[https://resend.com/signup](https://resend.com/signup)**
2. Sign up (use any email you can access)
3. Verify your email when Resend sends the confirmation link

### Step 2 — Create an API key

1. Log in to **[https://resend.com/api-keys](https://resend.com/api-keys)**
2. Click **Create API Key**
3. Name it: `stacko-production`
4. Permission: **Sending access** (Full access is fine)
5. Click **Create**
6. **Copy the key immediately** — it starts with `re_` and is shown only once

### Step 3 — Important: Resend testing limit

On the free plan, when using the default sender `onboarding@resend.dev`:

- You can only send emails **to the same email address you used to sign up for Resend**
- For testing, either:
  - Sign up for Resend with `sani123456@protonmail.com`, **OR**
  - Temporarily set `NOTIFY_EMAIL` to your Resend signup email for testing, **OR**
  - Add and verify your own domain in Resend (best for production)

### Step 4 — Create `.env.local` on your computer

In the project folder `d:\app project\INVEST01`, create a file named `.env.local`:

```env
NOTIFY_EMAIL=sani123456@protonmail.com
RESEND_API_KEY=re_paste_your_key_here
RESEND_FROM=Stacko <onboarding@resend.dev>
```

Replace `re_paste_your_key_here` with your real API key.

### Step 5 — Test email locally

```bash
cd "d:\app project\INVEST01"
npm run dev
```

1. Open **http://localhost:3000**
2. Sign up or sign in with any account
3. Check your inbox at `sani123456@protonmail.com` (or your Resend signup email if testing)
4. Also check the terminal — if Resend fails, an error will appear there

---

## Part 2: Push to GitHub

### Step 6 — Create a GitHub repository

1. Go to **[https://github.com/new](https://github.com/new)**
2. Repository name: `stacko` (or `INVEST01`)
3. Set to **Private** or **Public** (your choice)
4. **Do NOT** add README, .gitignore, or license (project already has them)
5. Click **Create repository**
6. Copy the repo URL — e.g. `https://github.com/YOUR_USERNAME/stacko.git`

### Step 7 — Push the code (run in terminal)

Replace `YOUR_USERNAME` and `stacko` with your actual GitHub username and repo name:

```bash
cd "d:\app project\INVEST01"
git init
git add .
git commit -m "Initial Stacko app — banking UI with onboarding and Resend email"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/stacko.git
git push -u origin main
```

---

## Part 3: Deploy on Vercel

### Step 8 — Import the project

1. Go to **[https://vercel.com/dashboard](https://vercel.com/dashboard)**
2. Click **Add New…** → **Project**
3. Under **Import Git Repository**, find your `stacko` repo
4. Click **Import**

### Step 9 — Configure the project

Vercel should auto-detect **Next.js**. Keep defaults:

| Setting | Value |
|---------|-------|
| Framework | Next.js |
| Root Directory | `./` |
| Build Command | `npm run build` |
| Output Directory | (leave default) |

### Step 10 — Add environment variables (CRITICAL)

Before clicking **Deploy**, expand **Environment Variables** and add:

| Name | Value |
|------|-------|
| `NOTIFY_EMAIL` | `sani123456@protonmail.com` |
| `RESEND_API_KEY` | `re_your_actual_key` |
| `RESEND_FROM` | `Stacko <onboarding@resend.dev>` |

Apply to: **Production**, **Preview**, and **Development**

### Step 11 — Deploy

1. Click **Deploy**
2. Wait 1–3 minutes for the build to finish
3. Vercel gives you a live URL like: `https://stacko-xxxxx.vercel.app`

### Step 12 — Test live email

1. Open your live Vercel URL
2. Sign up with a new test email
3. Check `sani123456@protonmail.com` for the notification
4. Complete onboarding and confirm you receive the form submission email too

---

## Part 4: Custom domain (optional, later)

1. In Vercel → your project → **Settings** → **Domains**
2. Add your domain (e.g. `app.stacko.com`)
3. In Resend → **Domains** → add the same domain and verify DNS records
4. Update `RESEND_FROM` to: `Stacko <noreply@yourdomain.com>`
5. Update the env var in Vercel and redeploy

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| No email received | Check Vercel **Logs** → Functions for errors |
| Resend 403 / validation error | `NOTIFY_EMAIL` must match your Resend signup email when using `resend.dev` |
| Build fails on Vercel | Check build logs; run `npm run build` locally first |
| Env vars not working | Redeploy after adding variables: **Deployments** → **⋯** → **Redeploy** |

---

## Quick checklist

- [ ] Resend account created
- [ ] API key copied
- [ ] `.env.local` created locally
- [ ] Email works locally
- [ ] Code pushed to GitHub
- [ ] Vercel project imported
- [ ] 3 env vars added in Vercel
- [ ] Live deploy tested
