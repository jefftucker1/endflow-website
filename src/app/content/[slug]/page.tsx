import { sanityClient, urlFor } from '@/lib/sanity'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, User, Tag, Share2, Twitter, Linkedin } from 'lucide-react'
import { PortableText } from '@portabletext/react'

// GROQ query to get a single post with all related data
const postQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage,
    content,
    "author": author->{
      name,
      slug,
      image,
      role,
      bio,
      social
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
    },
    seo
  }
`

// GROQ query to get all post slugs for static generation
const slugsQuery = `
  *[_type == "post" && publishedAt <= now()] {
    slug
  }
`

export async function generateStaticParams() {
  const posts = await sanityClient.fetch(slugsQuery)
  return posts.map((post: any) => ({
    slug: post.slug.current,
  }))
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await sanityClient.fetch(postQuery, { slug: params.slug })

  if (!post) {
    notFound()
  }

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://endflow.com'}/blog/${post.slug.current}`
  const shareText = encodeURIComponent(post.title)

  return (
    <div className="min-h-screen bg-background">
      {/* Back to Blog */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.categories.map((category: any) => (
                  <Link
                    key={category.slug.current}
                    href={`/blog/category/${category.slug.current}`}
                  >
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      style={{
                        backgroundColor: category.color ? `${category.color}20` : undefined,
                        color: category.color || undefined
                      }}
                    >
                      {category.icon && <span className="mr-2">{category.icon}</span>}
                      {category.title}
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex items-center justify-between py-6 border-t border-b border-border">
              <div className="flex items-center space-x-6">
                {/* Author */}
                {post.author && (
                  <div className="flex items-center space-x-3">
                    {post.author.image && (
                      <img
                        src={urlFor(post.author.image).width(40).height(40).url()}
                        alt={post.author.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <div className="font-medium">{post.author.name}</div>
                      {post.author.role && (
                        <div className="text-sm text-muted-foreground">{post.author.role}</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Date */}
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Share:</span>
                <Link
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="sm">
                    <Twitter className="h-4 w-4" />
                  </Button>
                </Link>
                <Link
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="sm">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.mainImage && (
        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <img
                src={urlFor(post.mainImage).width(1200).height(600).url()}
                alt={post.mainImage.alt || post.title}
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <article className="prose prose-lg max-w-none">
              <PortableText
                value={post.content}
                components={{
                  types: {
                    image: ({ value }) => (
                      <div className="my-8">
                        <img
                          src={urlFor(value).width(800).url()}
                          alt={value.alt || ''}
                          className="w-full h-auto rounded-lg"
                        />
                        {value.caption && (
                          <p className="text-sm text-muted-foreground text-center mt-2">
                            {value.caption}
                          </p>
                        )}
                      </div>
                    ),
                    code: ({ value }) => (
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        <code>{value.code}</code>
                      </pre>
                    ),
                  },
                }}
              />
            </article>
          </div>
        </div>
      </section>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <section className="py-8 border-t border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="flex items-center space-x-2 mb-4">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Tags:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: any) => (
                  <Link
                    key={tag.slug.current}
                    href={`/blog/tag/${tag.slug.current}`}
                  >
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground hover:bg-muted/80 transition-colors">
                      #{tag.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Author Bio */}
      {post.author && post.author.bio && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="bg-card rounded-xl p-8 border border-border">
                <div className="flex items-start space-x-4">
                  {post.author.image && (
                    <img
                      src={urlFor(post.author.image).width(80).height(80).url()}
                      alt={post.author.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">About {post.author.name}</h3>
                    <p className="text-muted-foreground mb-4">{post.author.bio}</p>
                    {post.author.social && (
                      <div className="flex space-x-2">
                        {post.author.social.twitter && (
                          <Link href={post.author.social.twitter} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="sm">
                              <Twitter className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                        {post.author.social.linkedin && (
                          <Link href={post.author.social.linkedin} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="sm">
                              <Linkedin className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}