import type { CollectionConfig } from 'payload'

export const EBooks: CollectionConfig = {
  slug: 'ebooks',
  labels: {
    singular: 'E-book',
    plural: 'E-booky',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Commerce',
    defaultColumns: ['title', 'price', 'featured', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Název e-booku',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL slug',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Popis',
      admin: {
        description: 'Prodejní popis — co čtenář získá, komu je určen.',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Cover obrázek',
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Cena (v haléřích)',
      admin: {
        description: 'např. 29900 = 299 Kč. Stripe používá nejmenší jednotku měny.',
        step: 100,
      },
    },
    {
      name: 'currency',
      type: 'text',
      defaultValue: 'czk',
      label: 'Měna',
      admin: {
        description: 'ISO 4217 kód měny (malá písmena)',
      },
    },
    {
      name: 'stripePriceId',
      type: 'text',
      required: true,
      label: 'Stripe Price ID',
      admin: {
        description: 'Začíná "price_" — z Stripe Dashboard',
      },
    },
    {
      name: 'fileUrl',
      type: 'text',
      required: true,
      label: 'Soubor (Supabase Storage cesta)',
      admin: {
        description: 'Cesta v Supabase Storage — nikdy veřejná URL!',
      },
    },
    {
      name: 'previewUrl',
      type: 'text',
      label: 'Preview URL (veřejná ukázka)',
      admin: {
        description: 'Veřejný odkaz na ukázku (první stránky PDF)',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tagy',
      fields: [{ name: 'tag', type: 'text' }],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Doporučovaný produkt',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Zobrazit na homepage v EbookGrid',
      },
    },
  ],
}
