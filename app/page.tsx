import Image from 'next/image'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import siteConfig from '@/siteConfig'

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="pt-14 pb-16 sm:pt-20 sm:pb-24 text-center">
        {/* Avatar with glow ring */}
        <div className="relative inline-block mb-6 sm:mb-8">
          <div
            className="absolute inset-0 rounded-full blur-xl opacity-40"
            style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
          />
          <Image
            src={siteConfig.avatar}
            alt={siteConfig.name}
            width={96}
            height={96}
            className="relative rounded-full sm:w-[110px] sm:h-[110px]"
            style={{ border: '2px solid rgba(59,130,246,0.5)', boxShadow: '0 0 30px rgba(59,130,246,0.2)' }}
          />
        </div>

        {/* Greeting */}
        <p className="text-text-muted text-xs sm:text-sm uppercase tracking-widest mb-3 font-medium">
          Hey, I&apos;m
        </p>

        {/* Name with gradient */}
        <h1
          className="text-4xl sm:text-5xl font-bold tracking-tight mb-5 sm:mb-6 px-2"
          style={{
            background: 'linear-gradient(135deg, #f1f5f9 30%, #60a5fa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {siteConfig.name}
        </h1>

        {/* Bio */}
        <p className="text-text-muted max-w-sm sm:max-w-md mx-auto leading-relaxed text-sm sm:text-base px-2">
          {siteConfig.bio}
        </p>

        {/* CTA links */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-7 sm:mt-8 flex-wrap px-4">
          <Link
            href="/blog"
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-white"
            style={{ background: '#3b82f6', boxShadow: '0 0 20px rgba(59,130,246,0.3)' }}
          >
            Read Blog →
          </Link>
          <Link
            href="/about"
            className="px-5 py-2.5 rounded-lg text-sm font-medium border border-border text-text-muted hover:border-accent hover:text-accent transition-all duration-200"
          >
            About Me
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px mb-10 sm:mb-12" style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.3), transparent)' }} />

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="pb-16 sm:pb-20">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-text-primary tracking-tight">Recent Posts</h2>
            <Link href="/blog" className="text-sm text-accent hover:text-accent-hover transition-colors">
              View all →
            </Link>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
