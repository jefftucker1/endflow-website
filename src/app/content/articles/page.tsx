import { sanityClient, urlFor } from '@/lib/sanity'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, User, ArrowLeft } from 'lucide-react'

// GROQ query to get all published posts with author and category data
const postsQuery = `
  *[_type == "post" && publishedAt <= now()] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
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

export default async function ArticlesPage() {
  const posts = await sanityClient.fetch(postsQuery)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex justify-center mb-6">
              <Link href="/content">
                <Button variant="ghost" className="mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Content
                </Button>
              </Link>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              Endflow <span className="text-primary">Articles</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Deep insights, strategies, and tips for building better GTM data pipelines
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">No articles yet</h2>
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
                {posts.map((post: any) => (
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
                            <span
                              key={category.slug.current}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                              style={{
                                backgroundColor: category.color ? `${category.color}20` : undefined,
                                color: category.color || undefined
                              }}
                            >
                              {category.icon && <span className="mr-1">{category.icon}</span>}
                              {category.title}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                                              <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                          <Link href={`/content/${post.slug.current}`}>
                            {post.title}
                          </Link>
                        </h2>

                      {/* Excerpt */}
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
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
        </div>
      </section>
    </div>
  )
} 