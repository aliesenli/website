import Link from 'next/link'
import siteConfig from '@/siteConfig'

export default function Nav() {
  return (
    <nav
      className="sticky top-0 z-50"
      style={{
        background: 'rgba(6, 11, 24, 0.7)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(26, 45, 80, 0.6)',
      }}
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="text-text-primary font-semibold tracking-tight hover:text-accent transition-colors duration-200 shrink-0 text-sm sm:text-base"
        >
          {siteConfig.name}
          <span className="text-accent">.</span>
        </Link>
        <div className="flex items-center gap-4 sm:gap-8">
          <Link
            href="/blog"
            className="text-text-muted text-sm hover:text-text-primary transition-colors duration-200"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="text-text-muted text-sm hover:text-text-primary transition-colors duration-200"
          >
            About
          </Link>
          <a
            href={`https://github.com/${siteConfig.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex text-xs px-3 py-1.5 rounded-md border border-border text-text-muted hover:border-accent hover:text-accent transition-all duration-200"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </nav>
  )
}
