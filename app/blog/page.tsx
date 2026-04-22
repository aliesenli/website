import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary mb-8">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-text-muted">No posts yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
