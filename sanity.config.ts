/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schema } from './sanity/schema'
import { structure } from './sanity/desk/structure'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    deskTool({
      structure
    }),
    visionTool(),
  ],
  document: {
    // For blog posts, use the preview URL
    productionUrl: async (prev, context) => {
      const { document } = context
      if (document._type === 'post' && document.slug?.current) {
        return `/blog/${document.slug.current}`
      }
      return prev
    },
  },
})