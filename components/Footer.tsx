import siteConfig from '@/siteConfig'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(26,45,80,0.5)' }}>
      <div className="max-w-content mx-auto px-6 py-8 flex items-center justify-between">
        <span className="text-text-muted text-sm">
          © {new Date().getFullYear()} <span className="text-text-subtle">{siteConfig.name}</span>
        </span>
        <a
          href={`https://github.com/${siteConfig.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-text-muted hover:text-accent transition-colors duration-200"
        >
          GitHub ↗
        </a>
      </div>
    </footer>
  )
}
