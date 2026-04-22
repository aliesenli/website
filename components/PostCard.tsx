import Link from 'next/link'
import TagBadge from './TagBadge'
import type { PostMeta } from '@/lib/posts'

interface PostCardProps {
  post: PostMeta
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="post-card">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
        <div className="flex-1 min-w-0">
          <Link href={`/blog/${post.slug}`} className="block group">
            <h2 className="text-text-primary font-semibold text-base leading-snug mb-2 group-hover:text-accent transition-colors duration-200">
              {post.title}
            </h2>
          </Link>
          <p className="text-text-muted text-sm leading-relaxed mb-3 line-clamp-2">{post.description}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        </div>
        <span className="text-xs text-text-muted shrink-0 sm:text-right">{post.date}</span>
      </div>
    </article>
  )
}
