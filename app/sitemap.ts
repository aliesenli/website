export const dynamic = 'force-static'
import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import siteConfig from '@/siteConfig'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const postEntries = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: siteConfig.url, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${siteConfig.url}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteConfig.url}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteConfig.url}/tags`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    ...postEntries,
  ]
}
