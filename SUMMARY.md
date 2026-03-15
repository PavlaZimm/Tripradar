# TripRadar.cz — Stav projektu
Poslední aktualizace: 2026-03-15 | Next.js: 15.x | Payload CMS: 3.x

## ✅ Hotovo — Všech 17 kroků dokončeno

- **Krok 1**: Inicializace projektu — package.json (Next.js 15, Payload 3, Supabase, Stripe, Tailwind v4), tsconfig.json (strict), .gitignore, .env.local.example, postcss.config.mjs
- **Krok 2**: Design system — globals.css (Tailwind v4 `@theme {}`, CSS custom properties, typografická škála), fonts.ts (Cormorant Garamond + Outfit, latin-ext)
- **Krok 3**: next.config.ts — security headers (CSP, X-Frame, XSS, Referrer, Permissions), AVIF+WebP image optimalizace, withPayload integrace
- **Krok 4**: types/index.ts — kompletní TypeScript interfaces: Article, Author, Category, Destination, EBook, MysteryTrip, Profile, Subscription, Purchase, Subscriber, API response shapes
- **Krok 5**: lib/ — utils.ts (cn, formatDate, formatPrice, calculateReadingTime, blurDataUrl), supabase.ts (browser+server+admin klienti), stripe.ts, ecomail.ts, resend.ts (3 transakční emaily), validators.ts (Zod), payload.ts (Local API helpers)
- **Krok 6**: Payload CMS — payload.config.ts (PostgreSQL, CORS, secret), 7 kolekcí: Articles (Lexical, draft/published, ISR hook, affiliate, FAQ), Destinations, Categories, Authors (EEAT), EBooks (Stripe), MysteryTrips, Media + admin routes
- **Krok 7**: shadcn/ui — components.json, Button (6 variant), Card, Badge, Input, Separator, Dialog, Sheet (mobile nav), Tabs
- **Krok 8**: Layout — Header (sticky, CSS dropdown nav, search CTA), Footer (4 sloupce, affiliate disclaimer), MobileNav (Radix Dialog/Sheet), layout.tsx (OG metadata, Speculation Rules API, skip-to-content a11y)
- **Krok 9**: Homepage — Hero (full-screen, oversized serif), FeaturedGrid (asymetrický 60/40), CategoryBar (horizontální scroll), ArticleGrid (3 sloupce ISR), MysteryTeaser (dark gradient sekce), EbookGrid (3 featured), FAQ, WebSite+SearchAction JSON-LD
- **Krok 10**: Article template — ArticleHero (full-bleed, priority LCP), TOC (sticky/collapsible, IntersectionObserver), ReadingProgress (scroll bar), AffiliateBox (nofollow), AuthorBox (EEAT), RelatedArticles, ArticleCard (sm/md/lg), Article+FAQ+BreadcrumbList JSON-LD
- **Krok 11**: SEO komponenty — ArticleSchema (@graph), FAQSchema, BreadcrumbSchema, DestinationSchema (TouristDestination)
- **Krok 12**: Commerce — /ebooks katalog (ISR 1800), /ebooks/[slug] detail (Product JSON-LD, trust badges), /mystery landing (SSG, testimonials, FAQ, FAQSchema), /mystery/confirm
- **Krok 13**: Stripe — checkout/ebook (form+JSON, automatic_tax), checkout/mystery (subscription, trial 7 dní, allow_promotion_codes), webhooks/stripe (req.text()!, 4 events: completed/updated/deleted/payment_failed + Supabase upsert + Ecomail tagy), download/[id] (auth → purchase check → signed URL 60s)
- **Krok 14**: Newsletter — NewsletterForm (Client, inline+centered), /api/newsletter (Zod + Ecomail + Supabase)
- **Krok 15**: Auth — /login, /register, /account (subscription + purchases, SSR), middleware.ts (session refresh, /account + /mystery/content ochrana)
- **Krok 16**: /api/revalidate (Payload ISR webhook, Bearer token auth)
- **Krok 17**: vercel.json (deploy config, fra1 region), finální SUMMARY.md

## 🔄 Aktuálně pracuji na
- Projekt je kompletní — připraven k deployi

## ⏳ Zbývá (pro produkci)
- Vyplnit .env.local (všechny API klíče)
- `npm run dev` — ověřit že server startuje
- Připojit Supabase projekt + spustit SQL migrace
- Nastavit Stripe produkty a price IDs
- Deploy na Vercel (vercel deploy nebo GitHub CI)
- Ověřit Google Search Console

## 📁 Vytvořené soubory
| Soubor | Popis |
|--------|-------|
| `package.json` | Závislosti — Next.js 15, Payload 3, Supabase, Stripe, Tailwind v4 |
| `tsconfig.json` | TypeScript strict mode, path aliases (@/*) |
| `.gitignore` | Standard Next.js + Payload CMS |
| `.env.local.example` | Šablona všech 15 environment proměnných |
| `postcss.config.mjs` | PostCSS pro Tailwind CSS v4 |
| `vercel.json` | Vercel deploy konfigurace (fra1, installCommand) |
| `components.json` | shadcn/ui konfigurace (Tailwind v4, @/ aliasy) |
| `payload.config.ts` | Payload CMS — PostgreSQL, kolekce, CORS, secret |
| `next.config.ts` | Security headers, AVIF+WebP, withPayload |
| `src/app/globals.css` | Tailwind v4 @theme — barvy, typografická škála, utility třídy |
| `src/app/fonts.ts` | Cormorant Garamond + Outfit, latin-ext |
| `src/app/layout.tsx` | Root layout — OG metadata, Speculation Rules API |
| `src/app/page.tsx` | Homepage — ISR 120s, 7 sekcí |
| `src/app/(magazine)/article/[slug]/page.tsx` | Article template — ISR 3600s, JSON-LD |
| `src/app/(commerce)/ebooks/page.tsx` | E-book katalog — ISR 1800s |
| `src/app/(commerce)/ebooks/[slug]/page.tsx` | E-book detail — Product JSON-LD |
| `src/app/(commerce)/mystery/page.tsx` | Mystery landing — SSG |
| `src/app/(commerce)/mystery/confirm/page.tsx` | Post-purchase confirm |
| `src/app/(auth)/login/page.tsx` | Login — Supabase Auth |
| `src/app/(auth)/register/page.tsx` | Register + email ověření |
| `src/app/(auth)/account/page.tsx` | Account — SSR, subscription + purchases |
| `src/app/(payload)/admin/[[...segments]]/page.tsx` | Payload admin panel |
| `src/app/(payload)/api/[...slug]/route.ts` | Payload REST API |
| `src/app/api/checkout/ebook/route.ts` | Stripe Checkout Session (payment) |
| `src/app/api/checkout/mystery/route.ts` | Stripe Checkout Session (subscription) |
| `src/app/api/webhooks/stripe/route.ts` | Stripe webhook handler (4 events) |
| `src/app/api/download/[id]/route.ts` | Signed URL download (auth + check) |
| `src/app/api/newsletter/route.ts` | Newsletter subscribe (Ecomail + Supabase) |
| `src/app/api/revalidate/route.ts` | Payload ISR webhook |
| `src/middleware.ts` | Session refresh + route protection |
| `src/types/index.ts` | Všechny TypeScript interfaces |
| `src/lib/utils.ts` | cn(), formatDate, formatPrice, blurDataUrl |
| `src/lib/supabase.ts` | Browser + server + admin Supabase klienti |
| `src/lib/stripe.ts` | Stripe server client |
| `src/lib/ecomail.ts` | Ecomail API helper |
| `src/lib/resend.ts` | Transakční emaily (3 typy) |
| `src/lib/validators.ts` | Zod schémata |
| `src/lib/payload.ts` | Payload Local API helpers |
| `src/collections/Articles.ts` | Kolekce článků (Lexical, drafty, ISR hook) |
| `src/collections/Destinations.ts` | Destinace hub pages |
| `src/collections/Categories.ts` | Kategorie |
| `src/collections/Authors.ts` | Autoři — EEAT |
| `src/collections/EBooks.ts` | E-booky — Stripe Price ID |
| `src/collections/MysteryTrips.ts` | Mystery výlety — subscriber only |
| `src/collections/Media.ts` | Media library — alt, caption, credit |
| `src/components/ui/button.tsx` | Button — 6 variant, 4 size |
| `src/components/ui/card.tsx` | Card + Header/Title/Description/Content/Footer |
| `src/components/ui/badge.tsx` | Badge — 5 variant |
| `src/components/ui/input.tsx` | Input |
| `src/components/ui/separator.tsx` | Separator |
| `src/components/ui/dialog.tsx` | Dialog (Radix) |
| `src/components/ui/sheet.tsx` | Sheet — side panel (MobileNav) |
| `src/components/ui/tabs.tsx` | Tabs (Radix) |
| `src/components/layout/Header.tsx` | Navigace — sticky, dropdown, search |
| `src/components/layout/Footer.tsx` | Footer — 4 sloupce, affiliate disclaimer |
| `src/components/layout/MobileNav.tsx` | Hamburger menu (Sheet) |
| `src/components/article/ArticleHero.tsx` | Full-bleed hero — LCP priority |
| `src/components/article/ArticleCard.tsx` | Karta článku — sm/md/lg variant |
| `src/components/article/TableOfContents.tsx` | TOC — sticky desktop / collapsible mobile |
| `src/components/article/ReadingProgress.tsx` | Scroll progress bar |
| `src/components/article/AffiliateBox.tsx` | Affiliate CTA box |
| `src/components/article/AuthorBox.tsx` | EEAT autor box |
| `src/components/article/RelatedArticles.tsx` | 3 related karty |
| `src/components/sections/FeaturedGrid.tsx` | Homepage editorial grid 60/40 |
| `src/components/sections/ArticleGrid.tsx` | Responzivní grid článků |
| `src/components/sections/MysteryTeaser.tsx` | Dark sekce — Mystery CTA |
| `src/components/sections/EbookGrid.tsx` | E-book karty s cenou |
| `src/components/sections/NewsletterForm.tsx` | Email capture (inline + centered) |
| `src/components/sections/FAQ.tsx` | FAQ accordion |
| `src/components/seo/ArticleSchema.tsx` | JSON-LD Article + BreadcrumbList + Person |
| `src/components/seo/FAQSchema.tsx` | JSON-LD FAQPage |
| `src/components/seo/BreadcrumbSchema.tsx` | JSON-LD BreadcrumbList |
| `src/components/seo/DestinationSchema.tsx` | JSON-LD TouristDestination |

## ⚙️ Prostředí
- [ ] .env.local vytvořen a vyplněn
- [ ] Payload CMS inicializován (npm run dev → /admin)
- [ ] Supabase projekt připojen + SQL migrace spuštěny
- [ ] Stripe produkty vytvořeny (mystery monthly/yearly price IDs)
- [ ] Ecomail API klíč a list ID nastaveny
- [ ] Resend API klíč nastaven
- [ ] Vercel deploy a custom domain

## ⚠️ Poznámky a klíčová rozhodnutí
- **Tailwind CSS v4**: `@theme {}` v globals.css, žádný tailwind.config.ts
- **MDX vypuštěn**: Payload Lexical editor je dostatečný
- **Next.js 15.x**: "16.1" ze zadání neexistovalo
- **create-payload-app nepoužit**: Manuální setup (není interaktivní shell)
- **Stripe webhook**: KRITICKY `req.text()` PŘED parsováním — jinak selže podpis!
- **SUPABASE_SERVICE_ROLE_KEY**: NIKDY s NEXT_PUBLIC_ prefixem
- **latin-ext subset**: Povinný pro českou diakritiku v Google Fonts

## 📊 Supabase SQL migrace (spustit ručně)
\`\`\`sql
-- profiles
CREATE TABLE profiles (id UUID PRIMARY KEY REFERENCES auth.users(id), email TEXT, full_name TEXT, avatar_url TEXT, stripe_customer_id TEXT);

-- subscriptions
CREATE TABLE subscriptions (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES auth.users(id), stripe_subscription_id TEXT UNIQUE, stripe_price_id TEXT, status TEXT, tier TEXT, current_period_start TIMESTAMPTZ, current_period_end TIMESTAMPTZ, cancel_at_period_end BOOLEAN DEFAULT false);

-- purchases
CREATE TABLE purchases (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES auth.users(id), product_id TEXT, stripe_session_id TEXT UNIQUE, amount INTEGER, currency TEXT, file_path TEXT, slug TEXT, created_at TIMESTAMPTZ DEFAULT now());

-- subscribers
CREATE TABLE subscribers (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email TEXT UNIQUE, source TEXT, ecomail_id TEXT, tags TEXT[], gdpr_consent BOOLEAN DEFAULT true, created_at TIMESTAMPTZ DEFAULT now());

-- RLS pro mystery obsah
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own subscriptions" ON subscriptions FOR SELECT TO authenticated USING (user_id = auth.uid());
\`\`\`
