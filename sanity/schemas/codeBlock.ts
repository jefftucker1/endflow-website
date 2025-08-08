import { defineType } from 'sanity'

export default defineType({
  name: 'code',
  title: 'Code',
  type: 'object',
  fields: [
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'JSON', value: 'json' },
          { title: 'Python', value: 'python' },
          { title: 'Bash', value: 'bash' },
          { title: 'Plain Text', value: 'text' },
        ],
      },
    },
    {
      name: 'filename',
      title: 'Filename',
      type: 'string',
    },
    {
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 20,
    },
  ],
  preview: {
    select: {
      language: 'language',
      code: 'code',
      filename: 'filename',
    },
    prepare(selection) {
      const { language, code, filename } = selection
      return {
        title: filename || language || 'Code block',
        subtitle: code ? `${code.substring(0, 30)}...` : 'No code',
      }
    },
  },
})