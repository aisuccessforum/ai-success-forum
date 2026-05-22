# AI Success Forum — Complete Setup Guide

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ ([download](https://nodejs.org))
- Git ([download](https://git-scm.com))
- A GitHub account
- A Cloudflare account (free)

### Step 1: Install Dependencies
```bash
cd ai-success-forum
npm install
```

### Step 2: Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) — you're live!

---

## 📁 Folder Structure

```
ai-success-forum/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (header + footer)
│   ├── page.tsx                # Homepage
│   ├── blog/
│   │   ├── page.tsx            # Blog listing
│   │   └── [slug]/page.tsx     # Individual post
│   ├── categories/
│   │   ├── page.tsx            # All categories
│   │   └── [slug]/page.tsx     # Category posts
│   ├── affiliate/page.tsx      # Affiliate picks
│   ├── resources/page.tsx      # Free resources
│   ├── about/page.tsx          # About page
│   └── contact/page.tsx        # Contact form
│
├── components/                 # Reusable components
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── blog/
│   │   └── PostCard.tsx
│   ├── affiliate/
│   │   └── AffiliateCard.tsx
│   └── ui/
│       ├── NewsletterCTA.tsx
│       ├── SearchBar.tsx
│       └── ShareButtons.tsx
│
├── content/
│   └── posts/                  # ← YOUR ARTICLES GO HERE (.md files)
│       └── example-post.md
│
├── data/                       # ← EDIT THESE JSON FILES
│   ├── site.json               # Site name, social links, newsletter copy
│   ├── categories.json         # Category names, icons, descriptions
│   └── affiliates.json         # Affiliate products and links
│
├── lib/                        # Utility functions
│   ├── posts.ts                # Markdown post utilities
│   ├── affiliates.ts           # Affiliate helpers
│   └── seo.ts                  # SEO metadata generator
│
├── public/
│   └── images/
│       └── posts/              # ← PUT ARTICLE IMAGES HERE
│
├── styles/
│   └── globals.css             # Global CSS + dark theme
│
├── types/index.ts              # TypeScript types
├── next.config.js              # Next.js config (static export)
├── tailwind.config.js          # Tailwind + neon theme
└── README.md                   # This file
```

---

## ✍️ Publishing an Article (No HTML Required)

### 1. Create a new file in `content/posts/`
Name it: `your-article-title.md`

### 2. Add the frontmatter at the top:
```markdown
---
title: "Your Article Title"
description: "One sentence describing the article (used for SEO)."
date: "2025-02-15"
author: "Your Name"
category: "ai-tools"         # see valid categories below
tags: ["chatgpt", "review"]  # comma-separated list
featured: false               # true = appears in featured section
coverImage: "/images/posts/your-image.jpg"   # optional
affiliate: ["chatgpt-plus"]  # optional — keys from affiliates.json
---

Your article content starts here in regular Markdown...
```

### 3. Valid categories:
- `ai-tools`
- `career-growth`
- `business-income`
- `productivity`
- `motivation`
- `courses`
- `laptops`

### 4. Add your cover image (optional):
Place the image in `public/images/posts/` and reference it as `/images/posts/filename.jpg`

### 5. Run locally to preview:
```bash
npm run dev
```

### 6. Push to GitHub to deploy automatically.

---

## 💰 Managing Affiliate Links

All affiliate links live in `data/affiliates.json`.

### To add a new product:
```json
{
  "products": {
    "your-product-key": {
      "key": "your-product-key",
      "name": "Product Name",
      "tagline": "Short tagline",
      "description": "2-3 sentence description for the affiliate card.",
      "url": "https://your-affiliate-link.com",
      "cta": "Try It Free",
      "badge": "Top Pick",       // optional label
      "price": "$29/mo",         // optional
      "rating": 4.7,             // optional (1-5)
      "category": "ai-tools",    // category slug or "general"
      "tags": ["writing", "ai"],
      "featured": true,          // shows on homepage
      "nofollow": true           // always set to true for affiliate links
    }
  }
}
```

### To use in an article, add the key to frontmatter:
```markdown
affiliate: ["your-product-key"]
```
The affiliate card will automatically appear in the article!

---

## 🌐 GitHub Setup

```bash
# 1. Initialize git (if not already done)
git init

# 2. Create a .gitignore
echo "node_modules/\n.next/\n.env*\nout/" > .gitignore

# 3. Add and commit all files
git add .
git commit -m "Initial commit — AI Success Forum"

# 4. Create a new repo on GitHub: https://github.com/new
# Name it: ai-success-forum

# 5. Connect and push
git remote add origin https://github.com/YOUR_USERNAME/ai-success-forum.git
git branch -M main
git push -u origin main
```

---

## ☁️ Cloudflare Pages Deployment

### Step 1: Login to Cloudflare
Go to [dash.cloudflare.com](https://dash.cloudflare.com)

### Step 2: Create a Pages Project
1. Click **Workers & Pages** → **Create Application** → **Pages**
2. Click **Connect to Git** → Select **GitHub**
3. Authorize Cloudflare to access your GitHub
4. Select your `ai-success-forum` repository

### Step 3: Configure Build Settings
| Setting | Value |
|---------|-------|
| Framework preset | `Next.js (Static HTML Export)` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js version | `18` |

### Step 4: Add Environment Variables (optional)
Click **Environment variables** → Add any needed variables.

### Step 5: Deploy
Click **Save and Deploy**. Your site will be live in 2-3 minutes!

### Step 6: Add Custom Domain (optional)
1. In your Pages project, click **Custom domains**
2. Add your domain (e.g., `aisuccessforum.com`)
3. Follow Cloudflare's DNS setup instructions

### Auto-deployment
Every `git push` to `main` automatically redeploys your site. Publishing an article = push the markdown file = live in minutes.

---

## 🔧 Customization Quick Reference

| What to change | File to edit |
|----------------|-------------|
| Site name, tagline, email | `data/site.json` |
| Navigation links | `components/layout/Header.tsx` |
| Footer content | `components/layout/Footer.tsx` |
| Category list | `data/categories.json` |
| Affiliate products | `data/affiliates.json` |
| Theme colors | `tailwind.config.js` + `styles/globals.css` |
| Newsletter copy | `data/site.json` → `newsletter` section |

---

## 📧 Newsletter Integration

The newsletter form in `components/ui/NewsletterCTA.tsx` is ready to connect to any service.

**Recommended options:**
- **[ConvertKit](https://convertkit.com)** — Best for creators
- **[Mailchimp](https://mailchimp.com)** — Popular, free tier
- **[Beehiiv](https://beehiiv.com)** — Modern, SEO-friendly

Replace the `handleSubmit` function with the API call from your provider.

---

## 📬 Contact Form Integration

The contact form in `app/contact/page.tsx` needs a backend. Easy options:

- **[Web3Forms](https://web3forms.com)** — Free, no backend needed
- **[Formspree](https://formspree.io)** — Simple form handling
- **[EmailJS](https://emailjs.com)** — Client-side email sending

---

## 🏗️ Build for Production

```bash
npm run build      # Generates static files in /out
```

The `/out` folder contains your complete static website, ready for Cloudflare Pages.

---

## 📈 SEO Best Practices

- **Title**: Keep post titles under 60 characters
- **Description**: 120–160 characters, include main keyword
- **Images**: Use descriptive filenames (`best-ai-tools-2025.jpg` not `image1.jpg`)
- **Date**: Always include date in frontmatter for freshness signals
- **Tags**: Use 3–6 relevant tags per post
- **Featured**: Mark 3–6 evergreen posts as `featured: true`

---

*Built with Next.js 14, Tailwind CSS, and hosted on Cloudflare Pages.*
