import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Emoji or icon name for the category',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Color code for the category (e.g., #FF0000)',
      validation: (Rule) => Rule.regex(/^#[0-9A-Fa-f]{6}$/).error('Must be a valid hex color code')
    }),
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
    },
    prepare(selection) {
      const { icon } = selection
      return { ...selection, subtitle: icon }
    },
  },
})