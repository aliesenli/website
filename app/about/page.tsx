export default function AboutPage() {
  const skills = [
    'C#, ASP.NET Core',
    'TypeScript & JavaScript',
    'React',
    'Angular',
    'HTML & CSS',
    'PostgreSQL',
    'Git',
    'Docker',
  ]

  return (
    <div className="py-10 sm:py-12 max-w-2xl">
      <p className="text-text-muted text-xs sm:text-sm uppercase tracking-widest mb-3 font-medium">About me</p>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary mb-5 sm:mb-6 leading-tight">
        Building software<br />
        <span style={{ color: '#60a5fa' }}>with purpose.</span>
      </h1>
      <p className="text-text-muted leading-relaxed mb-10 sm:mb-12 text-sm sm:text-base">
        I&apos;m a software developer based in Switzerland with a passion for building clean, reliable software.
        I enjoy working across the stack and care about both developer experience and end-user quality.
      </p>

      <div
        className="h-px mb-8 sm:mb-10"
        style={{ background: 'linear-gradient(90deg, rgba(59,130,246,0.4), transparent)' }}
      />

      <h2 className="text-base sm:text-lg font-semibold text-text-primary mb-4 sm:mb-6 tracking-tight">Skills</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {skills.map((skill) => (
          <li
            key={skill}
            className="px-4 py-3 rounded-xl text-sm text-text-subtle"
            style={{
              background: 'rgba(13,21,38,0.8)',
              border: '1px solid rgba(26,45,80,0.8)',
            }}
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}
