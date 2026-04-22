import Link from 'next/link'

interface TagBadgeProps {
  tag: string
}

export default function TagBadge({ tag }: TagBadgeProps) {
  return (
    <Link
      href={`/tags#${tag.toLowerCase()}`}
className="inline-block px-2.5 py-0.5 text-xs rounded-md font-medium transition-all duration-150"
      style={{
        background: 'rgba(59,130,246,0.1)',
        border: '1px solid rgba(59,130,246,0.2)',
        color: '#93c5fd',
      }}
    >
      {tag}
    </Link>
  )
}
