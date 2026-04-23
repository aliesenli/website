import { getAllPosts, getPostBySlug } from '@/lib/posts'
import TagBadge from '@/components/TagBadge'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const posts = getAllPosts()
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const posts = getAllPosts()
  const exists = posts.find((p) => p.slug === slug)
  if (!exists) notFound()

  const post = await getPostBySlug(slug)

  return (
    <article className="py-8 sm:py-10 max-w-2xl">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-accent transition-colors mb-8 sm:mb-10"
      >
        ← Blog
      </Link>

      <header className="mb-8 sm:mb-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary leading-snug mb-3">
          {post.title}
        </h1>
        <p className="text-text-muted text-sm">{post.date}</p>
      </header>

      <div
        className="h-px mb-8 sm:mb-10"
        style={{ background: 'linear-gradient(90deg, rgba(59,130,246,0.4), transparent)' }}
      />

      <div className="prose" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  )
}
