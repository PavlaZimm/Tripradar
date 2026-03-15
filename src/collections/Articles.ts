import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: {
    singular: 'Článek',
    plural: 'Články',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Obsah',
    defaultColumns: ['title', 'category', 'author', 'status', 'date'],
    preview: (doc) => `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/article/${doc.slug}`,
  },
  access: {
    read: ({ req }) => {
      // Publikované články — veřejné; drafty jen pro adminy
      if (req.user) return true
      return { status: { equals: 'published' } }
    },
  },
  versions: {
    drafts: {
      autosave: {
        interval: 30000, // 30 sekund
      },
    },
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        // On-demand ISR revalidace po publikování
        if (operation === 'update' && doc.status === 'published') {
          const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
          await fetch(`${baseUrl}/api/revalidate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug: doc.slug, type: 'article' }),
          }).catch(console.error)
        }
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titulek',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL slug',
      admin: {
        description: 'URL-safe identifikátor — jen malá písmena, číslice a pomlčky',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Meta description',
      admin: {
        description: 'Max. 160 znaků. Zobrazuje se ve výsledcích Google.',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Publikováno', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      label: 'Datum publikace',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'updatedDate',
      type: 'date',
      label: 'Datum aktualizace',
      admin: {
        position: 'sidebar',
        description: 'EEAT signál — vyplň při výrazné aktualizaci',
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Kategorie',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      required: true,
      label: 'Autor',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tagy',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Hero obrázek',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Obsah článku',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          // Defaultní Lexical features zahrnují: headings, bold, italic,
          // lists, links, images, horizontal rule, upload, quote, code
        ],
      }),
    },
    {
      name: 'affiliate',
      type: 'group',
      label: 'Affiliate box',
      admin: {
        description: 'Vložen po 3. odstavci pokud je vyplněn.',
      },
      fields: [
        { name: 'label', type: 'text', label: 'Popisek (např. "Ubytování v destinaci")' },
        {
          name: 'provider',
          type: 'select',
          label: 'Partner',
          options: [
            { label: 'Stay22', value: 'Stay22' },
            { label: 'Booking.com', value: 'Booking' },
            { label: 'Cestovní pojištění', value: 'Pojisteni' },
          ],
        },
        { name: 'url', type: 'text', label: 'Affiliate URL' },
        { name: 'cta', type: 'text', label: 'Text tlačítka (např. "Hledat ubytování")' },
      ],
    },
    {
      name: 'faq',
      type: 'array',
      label: 'FAQ sekce',
      admin: {
        description: 'Generuje FAQPage structured data pro Google.',
      },
      fields: [
        { name: 'question', type: 'text', required: true, label: 'Otázka' },
        { name: 'answer', type: 'textarea', required: true, label: 'Odpověď' },
      ],
    },
    {
      name: 'relatedArticles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
      label: 'Související články',
      admin: {
        description: 'Max. 3 články. Pokud prázdné, systém vybere ze stejné kategorie.',
      },
    },
    {
      name: 'noIndex',
      type: 'checkbox',
      label: 'noIndex (nezobrazovat v Google)',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Zaškrtni pro draft preview nebo duplicitní obsah.',
      },
    },
  ],
}
