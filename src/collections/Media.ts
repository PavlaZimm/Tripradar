import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Médium',
    plural: 'Média',
  },
  admin: {
    useAsTitle: 'alt',
    group: 'Obsah',
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'public/media',
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt text (SEO + a11y)',
      admin: {
        description: 'Povinný! Popisuje obsah obrázku pro screenreadery a Google.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Popisek',
    },
    {
      name: 'credit',
      type: 'text',
      label: 'Zdroj / fotograf',
      admin: {
        description: 'např. "© Jan Novák / Unsplash"',
      },
    },
  ],
}
