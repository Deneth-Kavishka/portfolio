# 🚀 Deploying to Vercel — Step-by-Step Guide

This guide walks you through deploying your portfolio to [Vercel](https://vercel.com) for free.

---

## Prerequisites

- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account (sign up free with GitHub)
- Your portfolio code pushed to a GitHub repository

---

## Step 1: Push Code to GitHub

If you haven't already, create a GitHub repo and push your code:

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Portfolio website"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

> **Tip**: Make sure `.next/`, `node_modules/`, and `.env.local` are in your `.gitignore` (they should be by default).

---

## Step 2: Import Project on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your GitHub account and find your `portfolio` repository
4. Click **"Import"**

---

## Step 3: Configure Project Settings

Vercel auto-detects Next.js. Verify these settings:

| Setting | Value |
|---------|-------|
| **Framework Preset** | Next.js |
| **Root Directory** | `./` (default) |
| **Build Command** | `next build` (auto-detected) |
| **Output Directory** | `.next` (auto-detected) |
| **Node.js Version** | 20.x |

### Environment Variables

If you're using EmailJS, add these environment variables:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Your EmailJS service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Your EmailJS template ID |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Your EmailJS public key |

Click **"Add"** for each variable.

---

## Step 4: Deploy

Click **"Deploy"** and wait ~1-2 minutes. Vercel will:

1. Clone your repository
2. Install dependencies (`npm install`)
3. Build the project (`next build`)
4. Deploy to their edge network

You'll get a URL like: `https://portfolio-xxxxx.vercel.app`

---

## Step 5: Custom Domain (Optional)

1. Go to your project **Settings → Domains**
2. Enter your custom domain (e.g., `deneth.dev`)
3. Click **"Add"**
4. Update your domain's DNS records:
   - **For root domain** (`deneth.dev`): Add an `A` record pointing to `76.76.21.21`
   - **For www subdomain** (`www.deneth.dev`): Add a `CNAME` record pointing to `cname.vercel-dns.com`
5. Wait for DNS propagation (usually 5-30 minutes)
6. Vercel auto-provisions SSL/HTTPS ✅

---

## Step 6: Enable Vercel Analytics

Analytics is already integrated in the code (`@vercel/analytics`). To enable the dashboard:

1. Go to your project on Vercel
2. Click **"Analytics"** tab
3. Click **"Enable"**
4. Your site will start collecting real visitor analytics

---

## Automatic Deployments

Every push to `main` will automatically trigger a new deployment. Vercel also creates **preview deployments** for pull requests.

```
main branch  →  Production deployment (deneth.dev)
PR branches  →  Preview deployments (unique URL)
```

---

## Useful Vercel CLI Commands

Install the Vercel CLI for manual deployments:

```bash
# Install globally
npm i -g vercel

# Login
vercel login

# Deploy (preview)
vercel

# Deploy to production
vercel --prod

# Check deployment status
vercel ls
```

---

## Troubleshooting

### Build fails
- Check the build logs on Vercel dashboard
- Ensure `npm run build` works locally before pushing
- Check Node.js version matches (use 20.x)

### Environment variables not working
- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- After adding/changing env vars, **redeploy** the project

### Slow initial page load
- Your portfolio uses code-splitting and lazy loading — first load after deploy may be slightly slow (cold start)
- Subsequent visits use Vercel's CDN cache and will be fast

### Custom domain not working
- Verify DNS records are correct
- Wait up to 48 hours for DNS propagation
- Check Vercel's domain configuration page for errors

---

## Project Structure for Vercel

```
portfolio/
├── public/            # Static assets (images, CV, etc.)
│   ├── avatar.png     # Your profile photo
│   ├── cv.pdf         # Your CV/resume
│   └── og-image.png   # Open Graph social image (1200x630)
├── src/               # Source code
├── package.json
├── next.config.ts
└── .env.local         # Local env vars (NOT pushed to GitHub)
```

> **Important**: Add your profile photo as `public/avatar.png` and CV as `public/cv.pdf` before deploying!

---

## Quick Deploy Checklist

- [ ] Update personal data in `src/lib/constants.ts`
- [ ] Add your profile photo to `public/avatar.png`
- [ ] Add your CV to `public/cv.pdf`
- [ ] Create `public/og-image.png` (1200x630px social preview)
- [ ] Set up EmailJS and add env variables
- [ ] Push to GitHub
- [ ] Import project on Vercel
- [ ] Add custom domain (optional)
- [ ] Enable Vercel Analytics
