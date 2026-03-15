import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { Articles } from './src/collections/Articles'
import { Authors } from './src/collections/Authors'
import { Categories } from './src/collections/Categories'
import { Destinations } from './src/collections/Destinations'
import { EBooks } from './src/collections/EBooks'
import { MysteryTrips } from './src/collections/MysteryTrips'
import { Media } from './src/collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Admin panel
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— TripRadar Admin',
      favicon: '/favicon.ico',
    },
    // Skupiny v levém panelu
    components: {},
  },

  // Kolekce
  collections: [
    Articles,
    Destinations,
    Categories,
    Authors,
    EBooks,
    MysteryTrips,
    Media,
    // Users kolekce — auto-generována Payloadem pro admin přístup
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
        group: 'Admin',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Celé jméno',
        },
        {
          name: 'role',
          type: 'select',
          defaultValue: 'author',
          options: [
            { label: 'Admin', value: 'admin' },
            { label: 'Editor', value: 'editor' },
            { label: 'Autor', value: 'author' },
          ],
          admin: {
            position: 'sidebar',
          },
        },
      ],
    },
  ],

  // Výchozí Lexical editor
  editor: lexicalEditor({}),

  // PostgreSQL via Supabase / Neon
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),

  // Tajný klíč pro šifrování tokenů
  secret: process.env.PAYLOAD_SECRET!,

  // TypeScript types output
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // CORS pro frontend
  cors: [
    'http://localhost:3000',
    process.env.NEXT_PUBLIC_BASE_URL ?? 'https://tripradar.cz',
  ].filter(Boolean),

  // CSRF protection
  csrf: [
    'http://localhost:3000',
    process.env.NEXT_PUBLIC_BASE_URL ?? 'https://tripradar.cz',
  ].filter(Boolean),

  // Upload — Vercel Blob nebo lokální v dev
  upload: {
    limits: {
      fileSize: 10_000_000, // 10 MB
    },
  },

  // Lokalizace (budoucí rozšíření)
  // localization: { locales: ['cs'], defaultLocale: 'cs' },
})
