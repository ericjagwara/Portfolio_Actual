# Eric Portfolio — Supabase Backend Setup Guide

## What Changed

### Database (Supabase "Eric Portfolio" - zbifymfxbbtlorzexylh)
- **blog_posts** table: 100 posts migrated (metadata). Content will be populated via the seed edge function.
- **research_papers** table: Empty, ready for you to add papers via admin dashboard.
- **admin_users** table: Admin user created.
- All tables have Row Level Security (RLS) enabled with public read / service role write policies.

### Edge Functions Deployed
1. **admin-api** — Handles authentication, blog CRUD, research papers CRUD
2. **seed-blogs** — Batch upsert blog posts with full content

### New/Modified Source Files
- `src/lib/supabase.ts` — Supabase client + API helpers
- `src/components/pages/BlogPage.tsx` — Fetches from Supabase instead of static posts.ts
- `src/components/pages/BlogPostPage.tsx` — Fetches individual post from Supabase
- `src/components/pages/ResearchPage.tsx` — New "Research Papers" section between ORCID and Research Areas
- `src/components/pages/AdminPage.tsx` — Full admin dashboard (login + blog CRUD + papers CRUD)
- `src/App.tsx` — Added /admin route (no nav/footer for admin pages)
- `.env` — Supabase URL and anon key

### Preserved
- All existing SEO schema (JSON-LD, Open Graph, Twitter cards, FAQPage)
- All favicons, logos, images
- All existing pages (Home, Experience, Research, Community, Open Source, Blog, Events)
- Netlify _redirects SPA config
- Sitemap generation scripts

## Admin Dashboard

Access at: `https://ericjagwara.online/admin`

**Login credentials:**
- Email: `ericjagwara@gmail.com`
- Password: `EricAdmin2026!`

**IMPORTANT:** Change your password after first login by updating it in the Supabase dashboard SQL editor:
```sql
UPDATE public.admin_users 
SET password_hash = crypt('YOUR_NEW_PASSWORD', gen_salt('bf')) 
WHERE email = 'ericjagwara@gmail.com';
```

### Features
- **Blog Management:** Create, edit, delete, publish/unpublish blog posts
- **Research Papers:** Add/edit/remove research papers that appear on the Research page
- Markdown content editor for blog posts

## Netlify Environment Variables

Set these in Netlify → Site Settings → Environment Variables:
```
VITE_SUPABASE_URL=https://zbifymfxbbtlorzexylh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiaWZ5bWZ4YmJ0bG9yemV4eWxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5OTI5ODUsImV4cCI6MjA5MDU2ODk4NX0.YtlHeJHG62WXAB2wB_6kMtfqQBUBb3SLQfxEpwNA_eE
```

## Populating Blog Content

The 100 blog posts currently have metadata (title, date, tags, description) but the full article content needs to be seeded. 

Run this from your local machine to seed the full content via the edge function:

```bash
# From your local project directory
node -e "
const fs = require('fs');
// ... or use the admin dashboard to edit individual posts
"
```

Or use the admin dashboard at `/admin` to edit each post's content individually.

## Tech Stack
- React + Vite + TypeScript
- Supabase (PostgreSQL + Edge Functions)
- Tailwind CSS
- React Router
- Netlify hosting
