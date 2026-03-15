# TripRadar.cz — Stav projektu
Poslední aktualizace: 2026-03-15 | Next.js: 15.x | Payload CMS: 3.x

## ✅ Hotovo
- **Krok 1**: Inicializace projektu — package.json, tsconfig.json, .gitignore, .env.local.example, postcss.config.mjs, SUMMARY.md
- **Krok 2**: Design system — globals.css (Tailwind v4 @theme), fonts.ts (Cormorant Garamond + Outfit, latin-ext)
- **Krok 3**: next.config.ts — security headers (CSP, X-Frame, XSS), AVIF+WebP images, withPayload

## 🔄 Aktuálně pracuji na
- **Krok 4**: types/index.ts — TypeScript interfaces

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
