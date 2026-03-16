import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

// Middleware: POUZE session refresh + route protection
// Nesmí obsahovat security headers (ty jsou v next.config.ts)

// Chráněné routes
const PROTECTED_ROUTES = ['/account']
const SUBSCRIBER_ONLY_ROUTES = ['/mystery/content']

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  // Vytvoř Supabase client s cookie accessem
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: CookieOptions }>) {
          // Nastavíme cookies na request i response
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Session refresh — KRITICKÉ: getUser() musí být voláno pro refresh tokenů
  const { data: { user } } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Route protection — /account
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route)) && !user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Subscriber-only content — /mystery/content/*
  if (SUBSCRIBER_ONLY_ROUTES.some((route) => pathname.startsWith(route))) {
    if (!user) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
    // Kontrola předplatného je na straně Supabase RLS — middleware jen ověří přihlášení
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    // Přeskočíme statické soubory a Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
