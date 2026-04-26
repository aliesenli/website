import type { Metadata } from 'next'
import { getAllTags } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export const metadata: Metadata = {
  title: 'Tags',
  alternates: { canonical: '/tags' },
}

export default function TagsPage() {
  const tagMap = getAllTags()
  const tags = Object.keys(tagMap).sort()

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary mb-8">Tags</h1>
      {tags.map((tag) => (
        <section key={tag} id={tag.toLowerCase()} className="mb-10">
          <h2 className="text-lg font-semibold text-accent mb-4">{tag}</h2>
          <div className="flex flex-col gap-4">
            {tagMap[tag].map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
