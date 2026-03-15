import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Kategorie',
    plural: 'Kategorie',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Obsah',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Název',
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
      label: 'Popis',
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Ikona (Lucide název nebo emoji)',
      admin: {
        description: 'např. "Globe" nebo "🌍"',
      },
    },
  ],
}
