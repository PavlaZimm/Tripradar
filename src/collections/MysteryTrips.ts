import type { CollectionConfig } from 'payload'

export const MysteryTrips: CollectionConfig = {
  slug: 'mystery-trips',
  labels: {
    singular: 'Mystery výlet',
    plural: 'Mystery výlety',
  },
  admin: {
    useAsTitle: 'title',
    group: 'Commerce',
    defaultColumns: ['title', 'revealDate', 'updatedAt'],
  },
  access: {
    // Číst mohou jen přihlášení uživatelé — RLS na úrovni Supabase pro fullDescription
    read: ({ req }) => !!req.user,
    // Veřejně dostupná jsou jen title, description, coverImage (ne fullDescription)
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Název výletu (bez spoilerů)',
      admin: {
        description: 'např. "Mystery výlet #12 — únor 2026"',
      },
    },
    {
      name: 'destination',
      type: 'text',
      required: true,
      label: 'Skutečná destinace',
      admin: {
        description: 'Tato hodnota se ukazuje jen aktivním předplatitelům po revealDate.',
      },
    },
    {
      name: 'revealDate',
      type: 'date',
      required: true,
      label: 'Datum odhalení destinace',
      admin: {
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Veřejný popis (bez spoilerů)',
      admin: {
        description: 'Zobrazuje se všem — nezmiňuj destinaci ani zemi!',
      },
    },
    {
      name: 'fullDescription',
      type: 'textarea',
      label: 'Plný popis (jen pro předplatitele)',
      admin: {
        description: 'Zobrazuje se jen aktivním Mystery předplatitelům.',
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Obrázek (bez odhalení destinace)',
    },
    {
      name: 'price',
      type: 'number',
      label: 'Cena výletu (informativní, v haléřích)',
      admin: {
        description: 'Není pro přímý prodej — jen informativně.',
      },
    },
  ],
}
