import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  apiVersion: '2024-01-01', // Use today's date or your preferred version
  useCdn: process.env.NODE_ENV === 'production',
}

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config)

// Set up a helper function for generating Image URLs with only the asset reference data in your documents.
// Read more: https://www.sanity.io/docs/image-url
export const urlFor = (source: SanityImageSource) => imageUrlBuilder(config).image(source)

// Helper function to get the URL for a post
export const getPostUrl = (slug: string) => `/blog/${slug}`

// Helper function to get the URL for an author
export const getAuthorUrl = (slug: string) => `/blog/author/${slug}`

// Helper function to get the URL for a category
export const getCategoryUrl = (slug: string) => `/blog/category/${slug}` 