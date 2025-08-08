import { type SchemaTypeDefinition } from 'sanity'

import post from './schemas/post'
import author from './schemas/author'
import category from './schemas/category'
import tag from './schemas/tag'
import codeBlock from './schemas/codeBlock'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category, tag, codeBlock],
}