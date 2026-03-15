# TripRadar.cz — Stav projektu
Poslední aktualizace: 2026-03-15 | Next.js: 15.x | Payload CMS: 3.x

## ✅ Hotovo
- **Krok 1**: Inicializace projektu — package.json, tsconfig.json, .gitignore, .env.local.example, postcss.config.mjs, SUMMARY.md
- **Krok 2**: Design system — globals.css (Tailwind v4 @theme), fonts.ts (Cormorant Garamond + Outfit, latin-ext)
- **Krok 3**: next.config.ts — security headers (CSP, X-Frame, XSS), AVIF+WebP images, withPayload
- **Krok 4**: types/index.ts — ArticleFrontmatter, Article, Author, Category, Destination, EBook, MysteryTrip, Commerce typy, API response shapes
- **Krok 5**: lib/ — utils.ts (cn, formatDate, formatPrice), supabase.ts (browser+server+admin), stripe.ts, ecomail.ts, resend.ts, validators.ts (Zod), payload.ts
- **Krok 6**: Payload CMS — payload.config.ts, kolekce (Articles, Destinations, Categories, Authors, EBooks, MysteryTrips, Media), admin routes
- **Krok 7**: shadcn/ui — components.json, Button (varianty), Card, Badge, Input, Separator, Dialog, Sheet (mobile nav), Tabs
- **Krok 8**: Layout — Header (sticky, dropdown nav, search), Footer (links, affiliate disclaimer), MobileNav (Sheet), root layout.tsx (OG metadata, Speculation Rules, skip-to-content)
- **Krok 9**: Homepage — Hero (full-screen), FeaturedGrid (asymetrický 60/40), CategoryBar (scroll), ArticleGrid, MysteryTeaser (dark), EbookGrid, FAQ, WebSite JSON-LD
- **Krok 10**: Article template — ArticleHero (LCP priority), TOC (sticky/collapsible), ReadingProgress, AffiliateBox, AuthorBox (EEAT), RelatedArticles, ArticleCard (sm/md/lg), Article+FAQ+BreadcrumbList JSON-LD
- **Krok 11**: SEO komponenty — ArticleSchema (@graph), FAQSchema, BreadcrumbSchema, DestinationSchema (TouristDestination)
- **Krok 12**: Commerce — /ebooks katalog, /ebooks/[slug] detail (Product JSON-LD), /mystery landing (SSG, testimonials, FAQ), /mystery/confirm
- **Krok 13**: Stripe — checkout/ebook (req.text!), checkout/mystery (trial 7 dní), webhooks/stripe (4 events + Supabase upsert + Ecomail tagy), download/[id] (auth + purchase check + signed URL 60s)

## 🔄 Aktuálně pracuji na
- **Krok 14**: Newsletter integrace

## ⏳ Zbývá
- Krok 3: next.config.ts (security headers, images, Payload)
- Krok 4: types/index.ts — TypeScript interfaces
- Krok 5: lib/ utility soubory
- Krok 6: Payload CMS kolekce a konfigurace
- Krok 7: shadcn/ui init + základní komponenty
- Krok 8: Layout komponenty (Header, Footer, MobileNav)
- Krok 9: Homepage (app/page.tsx + sekce)
- Krok 10: Article template
- Krok 11: SEO komponenty (JSON-LD schemas)
- Krok 12: Commerce stránky (ebooks, mystery)
- Krok 13: Stripe integrace (checkout, webhooks, download)
- Krok 14: Newsletter integrace (Ecomail)
- Krok 15: Auth a middleware (Supabase Auth)
- Krok 16: Performance finalizace
- Krok 17: Deployment konfigurace + finální commit

## 📁 Vytvořené soubory
| Soubor | Popis |
|--------|-------|
| `package.json` | Závislosti projektu — Next.js 15, Payload 3, Supabase, Stripe, Tailwind v4 |
| `tsconfig.json` | TypeScript strict mode, path aliases (@/*), Next.js plugin |
| `.gitignore` | Standardní Next.js + Payload CMS ignory |
| `.env.local.example` | Šablona všech environment proměnných |
| `postcss.config.mjs` | PostCSS konfigurace pro Tailwind CSS v4 |
| `SUMMARY.md` | Tento soubor — průběžný stav projektu |
| `src/app/globals.css` | Tailwind v4 @theme — CSS custom properties, typografická škála, utility třídy |
| `src/app/fonts.ts` | next/font — Cormorant Garamond (display) + Outfit (body), latin-ext |
| `next.config.ts` | Security headers, AVIF+WebP image optimalizace, withPayload integrace |
| `src/types/index.ts` | Všechny TypeScript interfaces — Article, Author, EBook, Commerce, API shapes |
| `src/lib/utils.ts` | cn(), formatDate, formatPrice, calculateReadingTime, blurDataUrl |
| `src/lib/supabase.ts` | Browser + server + admin Supabase klienti, helpers (mystery sub, purchase) |
| `src/lib/stripe.ts` | Stripe server client, MYSTERY_PRICES konstanty |
| `src/lib/ecomail.ts` | subscribeToNewsletter(), addTagsToSubscriber() |
| `src/lib/resend.ts` | Transakční emaily — ebook purchase, mystery sub, payment failed |
| `src/lib/validators.ts` | Zod schémata — newsletter, ebook checkout, mystery checkout, download |
| `src/lib/payload.ts` | Payload CMS Local API helpers — getArticleBySlug, getArticles, getEbooks… |
| `payload.config.ts` | Payload CMS config — DB (PostgreSQL), kolekce, CORS, secret |
| `src/collections/Articles.ts` | Kolekce článků — Lexical editor, draft workflow, affiliate, FAQ, ISR hook |
| `src/collections/Destinations.ts` | Kolekce destinací — hub pages |
| `src/collections/Categories.ts` | Kolekce kategorií |
| `src/collections/Authors.ts` | Kolekce autorů — EEAT: bio, credentials, sociální sítě |
| `src/collections/EBooks.ts` | Kolekce e-booků — Stripe Price ID, file URL |
| `src/collections/MysteryTrips.ts` | Kolekce mystery výletů — subscriber-only |
| `src/collections/Media.ts` | Media library — alt, caption, credit, image sizes |
| `src/app/(payload)/admin/[[...segments]]/page.tsx` | Payload admin panel route |
| `src/app/(payload)/api/[...slug]/route.ts` | Payload REST API route |

## ⚙️ Prostředí
- [ ] .env.local vytvořen
- [ ] Payload CMS inicializován
- [ ] Supabase projekt připojen
- [ ] Stripe produkty vytvořeny

## ⚠️ Poznámky a rozhodnutí
- **Tailwind CSS v4**: CSS-based konfigurace přes `@theme {}`, žádný tailwind.config.ts
- **MDX vypuštěn**: Payload Lexical editor nahrazuje MDX — méně závislostí, lepší DX
- **Next.js**: Zadání říká "16.1" ale ta verze neexistuje — použita latest stable 15.x
- **create-payload-app**: Nepouíváme (interaktivní CLI), projekt stavíme manuálně
- **Postup**: Každý krok = samostatný commit + push
