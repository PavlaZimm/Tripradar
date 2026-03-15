import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Destinations: CollectionConfig = {
  slug: 'destinations',
  labels: {
    singular: 'Destinace',
    plural: 'Destinace',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Obsah',
    defaultColumns: ['name', 'country', 'updatedAt'],
    preview: (doc) => `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/destination/${doc.slug}`,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Název destinace',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL slug',
    },
    {
      name: 'country',
      type: 'text',
      required: true,
      label: 'Stát / region',
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      label: 'Popis destinace',
      admin: {
        description: 'Komplexní průvodce destinací (3 000–5 000 slov) — hub page.',
      },
      editor: lexicalEditor({}),
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Hlavní obrázek',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero obrázek (full-bleed)',
    },
    {
      name: 'articles',
      type: 'relationship',
      relationTo: 'articles',
      hasMany: true,
      label: 'Spoke články',
      admin: {
        description: 'Tematické články linkující na tento hub.',
      },
    },
  ],
}
