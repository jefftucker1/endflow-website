"use client"

import { sanityClient, urlFor } from '@/lib/sanity'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, User, Tag, Play, ExternalLink, Filter } from 'lucide-react'
import { useState, useEffect } from 'react'

// Helper function to extract plain text from PortableText
const getPlainTextFromPortableText = (content: any[]): string => {
  if (!content || !Array.isArray(content)) return ''
  
  return content
    .map((block) => {
      if (block._type === 'block' && block.children) {
        return block.children
          .filter((child: any) => child._type === 'span')
          .map((child: any) => child.text)
          .join('')
      }
      return ''
    })
    .join(' ')
    .trim()
}

// Helper function to clean markdown formatting from text
const cleanMarkdownText = (text: string): string => {
  if (!text) return ''
  
  return text
    // Remove bold (**text** or __text__)
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    // Remove italic (*text* or _text_)
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    // Remove headers (# ## ### etc.)
    .replace(/^#{1,6}\s+/gm, '')
    // Remove links [text](url)
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    // Remove inline code `code`
    .replace(/`([^`]+)`/g, '$1')
    // Remove strikethrough ~~text~~
    .replace(/~~(.*?)~~/g, '$1')
    // Remove extra whitespace and line breaks
    .replace(/\s+/g, ' ')
    .trim()
}

// Helper function to create excerpt from content or use existing excerpt
const createExcerpt = (post: any): string => {
  // Check if excerpt exists and clean it of markdown
  if (post.excerpt && typeof post.excerpt === 'string') {
    const cleanedExcerpt = cleanMarkdownText(post.excerpt)
    if (cleanedExcerpt && cleanedExcerpt.length > 0) {
      return cleanedExcerpt.length > 160 
        ? cleanedExcerpt.substring(0, 160) + '...'
        : cleanedExcerpt
    }
  }
  
  // Otherwise, extract from content
  if (post.content) {
    const plainText = getPlainTextFromPortableText(post.content)
    const cleanedText = cleanMarkdownText(plainText)
    return cleanedText.length > 160 
      ? cleanedText.substring(0, 160) + '...'
      : cleanedText
  }
  
  return 'Read more to discover insights...'
}

// GROQ query to get all published posts with author and category data
const postsQuery = `
  *[_type == "post" && publishedAt <= now()] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    mainImage,
    "author": author->{
      name,
      slug,
      image,
      role
    },
    "categories": categories[]->{
      title,
      slug,
      color,
      icon
    },
    "tags": tags[]->{
      title,
      slug
    }
  }
`

// Sample YouTube videos data (you can move this to Sanity later)
const youtubeVideos = [
  {
    id: 1,
    title: "How to Build GTM Data Pipelines with AI",
    description: "Learn how to use Endflow to create automated data pipelines that find prospects, enrich contacts, and feed your tools automatically.",
    thumbnail: "https://img.youtube.com/vi/SAMPLE1/maxresdefault.jpg",
    videoId: "SAMPLE1",
    duration: "12:34",
    publishedAt: "2025-01-15",
    views: "2.1K",
    category: "Tutorial"
  },
  {
    id: 2,
    title: "The Future of Sales Intelligence",
    description: "Discover how AI is transforming the way we approach sales intelligence and lead generation.",
    thumbnail: "https://img.youtube.com/vi/SAMPLE2/maxresdefault.jpg",
    videoId: "SAMPLE2",
    duration: "8:45",
    publishedAt: "2025-01-10",
    views: "1.8K",
    category: "Insights"
  },
  {
    id: 3,
    title: "Endflow Product Demo: Jobs Data",
    description: "See how Endflow's jobs data can help you identify companies with immediate hiring intent.",
    thumbnail: "https://img.youtube.com/vi/SAMPLE3/maxresdefault.jpg",
    videoId: "SAMPLE3",
    duration: "15:22",
    publishedAt: "2025-01-05",
    views: "3.2K",
    category: "Demo"
  }
]

export default function ContentPage() {
  const [posts, setPosts] = useState([])
  const [activeFilter, setActiveFilter] = useState('all') // 'all', 'articles', 'videos'
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await sanityClient.fetch(postsQuery)
        setPosts(fetchedPosts)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              Endflow <span className="text-primary">Content</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Insights, tutorials, and strategies for building better GTM data pipelines
            </p>
            <div className="flex justify-center space-x-4 mt-8">
              <Button 
                variant={activeFilter === 'all' ? 'outline' : 'ghost'} 
                className="px-6"
                onClick={() => setActiveFilter('all')}
              >
                <Filter className="mr-2 h-4 w-4" />
                All Content
              </Button>
              <Button 
                variant={activeFilter === 'articles' ? 'outline' : 'ghost'} 
                className="px-6"
                onClick={() => setActiveFilter('articles')}
              >
                Articles
              </Button>
              <Button 
                variant={activeFilter === 'videos' ? 'outline' : 'ghost'} 
                className="px-6"
                onClick={() => setActiveFilter('videos')}
              >
                Videos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-6 sm:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading content...</p>
              </div>
            ) : (
              <>
                {/* YouTube Videos Section */}
                {(activeFilter === 'all' || activeFilter === 'videos') && (
                  <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-3xl font-bold">Latest Videos</h2>
                      <Link href="https://www.youtube.com/@endflowai" target="_blank">
                        <Button variant="outline">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View All Videos
                        </Button>
                      </Link>
                    </div>
                  
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {youtubeVideos.map((video) => (
                        <article
                          key={video.id}
                          className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
                        >
                          {/* Video Thumbnail */}
                          <div className="relative aspect-video overflow-hidden">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="bg-white/90 rounded-full p-3 group-hover:bg-white transition-colors duration-300">
                                <Play className="h-6 w-6 text-black ml-1" />
                              </div>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                              {video.duration}
                            </div>
                          </div>

                          {/* Video Content */}
                          <div className="p-6">
                            {/* Category */}
                            <div className="flex items-center justify-between mb-3">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                {video.category}
                              </span>
                              <span className="text-xs text-muted-foreground">{video.views} views</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                              <Link href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank">
                                {video.title}
                              </Link>
                            </h3>

                            {/* Description */}
                            <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                              {video.description}
                            </p>

                            {/* Meta Information */}
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {new Date(video.publishedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>

                              <Link href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank">
                                <Button variant="ghost" size="sm" className="group-hover:text-primary">
                                  Watch
                                  <ExternalLink className="ml-1 h-4 w-4" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )}

                {/* Blog Posts Section */}
                {(activeFilter === 'all' || activeFilter === 'articles') && (
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-3xl font-bold">Latest Articles</h2>
                      {posts.length > 0 && (
                        <Link href="/content/articles">
                          <Button variant="outline">
                            View All Articles
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </div>

                    {posts.length === 0 ? (
                      <div className="text-center py-20">
                        <h3 className="text-2xl font-bold mb-4">No articles yet</h3>
                        <p className="text-muted-foreground mb-8">
                          We're working on some great content. Check back soon!
                        </p>
                        <Link href="/studio">
                          <Button>
                            Add Your First Article
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.slice(0, 6).map((post: any) => (
                          <article
                            key={post._id}
                            className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
                          >
                            {/* Post Image */}
                            {post.mainImage && (
                              <div className="aspect-video overflow-hidden">
                                <img
                                  src={urlFor(post.mainImage).width(600).height(400).url()}
                                  alt={post.mainImage.alt || post.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            )}

                            {/* Post Content */}
                            <div className="p-6">
                              {/* Categories */}
                              {post.categories && post.categories.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {post.categories.slice(0, 2).map((category: any) => (
                                    category && (
                                      <span
                                        key={category.slug?.current || category.title}
                                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                                        style={{
                                          backgroundColor: category.color ? `${category.color}20` : undefined,
                                          color: category.color || undefined
                                        }}
                                      >
                                        {category.icon && <span className="mr-1">{category.icon}</span>}
                                        {category.title}
                                      </span>
                                    )
                                  ))}
                                </div>
                              )}

                              {/* Title */}
                                                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                            <Link href={`/content/${post.slug.current}`}>
                              {post.title}
                            </Link>
                          </h3>

                              {/* Excerpt */}
                              <p className="text-muted-foreground mb-4 line-clamp-3">
                                {createExcerpt(post)}
                              </p>

                              {/* Meta Information */}
                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center space-x-4">
                                  {/* Author */}
                                  {post.author && (
                                    <div className="flex items-center space-x-2">
                                      <User className="h-4 w-4" />
                                      <span>{post.author.name}</span>
                                    </div>
                                  )}
                                  
                                  {/* Date */}
                                  <div className="flex items-center space-x-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>
                                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                      })}
                                    </span>
                                  </div>
                                </div>

                                {/* Read More */}
                                                            <Link href={`/content/${post.slug.current}`}>
                              <Button variant="ghost" size="sm" className="group-hover:text-primary">
                                Read More
                                <ArrowRight className="ml-1 h-4 w-4" />
                              </Button>
                            </Link>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}