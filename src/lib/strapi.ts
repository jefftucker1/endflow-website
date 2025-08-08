// Strapi CMS integration utilities

export interface StrapiImage {
  id: number;
  attributes: {
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
    url: string;
  };
}

export interface StrapiAuthor {
  id: number;
  attributes: {
    name: string;
    bio: string;
    avatar?: {
      data: StrapiImage;
    };
    twitter?: string;
    linkedin?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiCategory {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description: string;
    color: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiBlogPost {
  id: number;
  attributes: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image?: {
      data: StrapiImage;
    };
    author: {
      data: StrapiAuthor;
    };
    categories: {
      data: StrapiCategory[];
    };
    tags: string[];
    meta_title: string;
    meta_description: string;
    published_at: string;
    featured: boolean;
    utm_campaign?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
  try {
    // Merge default and user options
    const mergedOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      },
      ...options,
    };

    // Build request URL
    const queryString = new URLSearchParams(urlParamsObject).toString();
    const requestUrl = `${STRAPI_URL}/api${path}${
      queryString ? `?${queryString}` : ''
    }`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Strapi API error:', error);
    throw error;
  }
}

// Get multiple blog posts
export async function getBlogPosts(
  limit = 10,
  start = 0,
  featured?: boolean
): Promise<StrapiResponse<StrapiBlogPost[]>> {
  const params: any = {
    'populate[0]': 'featured_image',
    'populate[1]': 'author',
    'populate[2]': 'author.avatar',
    'populate[3]': 'categories',
    'sort[0]': 'published_at:desc',
    'pagination[start]': start.toString(),
    'pagination[limit]': limit.toString(),
  };

  if (featured !== undefined) {
    params['filters[featured][$eq]'] = featured.toString();
  }

  return await fetchAPI('/posts', params);
}

// Get a single blog post by slug
export async function getBlogPost(slug: string): Promise<StrapiResponse<StrapiBlogPost[]>> {
  return await fetchAPI('/posts', {
    'filters[slug][$eq]': slug,
    'populate[0]': 'featured_image',
    'populate[1]': 'author',
    'populate[2]': 'author.avatar',
    'populate[3]': 'categories',
  });
}

// Get blog posts by category
export async function getBlogPostsByCategory(
  categorySlug: string,
  limit = 10,
  start = 0
): Promise<StrapiResponse<StrapiBlogPost[]>> {
  return await fetchAPI('/posts', {
    'filters[categories][slug][$eq]': categorySlug,
    'populate[0]': 'featured_image',
    'populate[1]': 'author',
    'populate[2]': 'author.avatar',
    'populate[3]': 'categories',
    'sort[0]': 'published_at:desc',
    'pagination[start]': start.toString(),
    'pagination[limit]': limit.toString(),
  });
}

// Get blog posts by author
export async function getBlogPostsByAuthor(
  authorId: number,
  limit = 10,
  start = 0
): Promise<StrapiResponse<StrapiBlogPost[]>> {
  return await fetchAPI('/posts', {
    'filters[author][id][$eq]': authorId.toString(),
    'populate[0]': 'featured_image',
    'populate[1]': 'author',
    'populate[2]': 'author.avatar',
    'populate[3]': 'categories',
    'sort[0]': 'published_at:desc',
    'pagination[start]': start.toString(),
    'pagination[limit]': limit.toString(),
  });
}

// Get all categories
export async function getCategories(): Promise<StrapiResponse<StrapiCategory[]>> {
  return await fetchAPI('/categories', {
    'sort[0]': 'name:asc',
  });
}

// Get all authors
export async function getAuthors(): Promise<StrapiResponse<StrapiAuthor[]>> {
  return await fetchAPI('/authors', {
    'populate[0]': 'avatar',
    'sort[0]': 'name:asc',
  });
}

// Helper function to get image URL
export function getStrapiImageUrl(image: StrapiImage | undefined, size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'original'): string {
  if (!image) return '';
  
  if (size === 'original') {
    return `${STRAPI_URL}${image.attributes.url}`;
  }
  
  const format = image.attributes.formats[size];
  return format ? `${STRAPI_URL}${format.url}` : `${STRAPI_URL}${image.attributes.url}`;
}

// Helper function to calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Helper function to format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}