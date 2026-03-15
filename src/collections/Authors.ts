import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
  labels: {
    singular: 'Autor',
    plural: 'Autoři',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Obsah',
    defaultColumns: ['name', 'credentials', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Celé jméno',
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
      name: 'bio',
      type: 'textarea',
      required: true,
      label: 'Bio',
      admin: {
        description: 'Stručný životopis pro EEAT — max. 300 znaků.',
      },
    },
    {
      name: 'credentials',
      type: 'text',
      label: 'Credentials',
      admin: {
        description: 'např. "Cestovní spisovatel, 15 let v oboru"',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Profilová fotka',
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Sociální sítě',
      fields: [
        { name: 'instagram', type: 'text', label: 'Instagram URL' },
        { name: 'twitter', type: 'text', label: 'X / Twitter URL' },
        { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
        { name: 'website', type: 'text', label: 'Osobní web URL' },
      ],
    },
  ],
}
