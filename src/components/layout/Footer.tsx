import { profile } from '../../data/profile.data'
import { socialLinks } from '../../data/socialLinks.data'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'

const QUICK_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Tech Stack', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
] as const

function SocialIcon({ id }: { id: string }) {
  switch (id) {
    case 'github':
      return <FaGithub />
    case 'linkedin':
      return <FaLinkedinIn />
    default:
      return null
  }
}

function IconPillLink({
  href,
  label,
  icon,
}: {
  href: string
  label: string
  icon: React.ReactNode
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className={[
        'group inline-flex items-center gap-2 rounded-xl border border-[rgba(148,163,184,0.18)]',
        'bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm',
        'text-[var(--color-muted)] transition',
        'hover:-translate-y-0.5 hover:border-[rgba(250,204,21,0.38)] hover:bg-[rgba(255,255,255,0.07)] hover:text-[var(--color-accent)]',
        'motion-reduce:transform-none',
      ].join(' ')}
    >
      <span className="text-base text-[rgba(248,250,252,0.70)] group-hover:text-[var(--color-accent)]">
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </a>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--color-border)] bg-[rgba(0,0,0,0.18)]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <a
              href="#top"
              className="inline-flex items-center gap-3 font-semibold tracking-tight"
            >
              <span className="text-[var(--color-accent)]">{'<C/>'}</span>
              <span className="text-[var(--color-text)]">{profile.name}</span>
            </a>

            <p className="text-sm leading-6 text-[var(--color-muted)]">
              Portfolio construido con React + TypeScript + Vite + Tailwind.
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(148,163,184,0.18)] bg-[rgba(255,255,255,0.04)] px-3 py-1 text-xs text-[var(--color-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              Available for opportunities
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-wide text-[rgba(248,250,252,0.70)]">
              QUICK LINKS
            </p>

            <nav className="mt-4 flex flex-col gap-2">
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-wide text-[rgba(248,250,252,0.70)]">
              CONNECT
            </p>

            <div className="mt-4 rounded-2xl border border-[rgba(148,163,184,0.18)] bg-[rgba(255,255,255,0.04)] p-4">
              <p className="text-xs text-[var(--color-muted)]">Email</p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-[rgba(248,250,252,0.85)] hover:text-[var(--color-accent)]"
              >
                <HiOutlineMail className="text-lg text-[var(--color-accent)]" />
                {profile.email}
              </a>

              {profile.location ? (
                <p className="mt-2 text-xs text-[var(--color-muted)]">{profile.location}</p>
              ) : null}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <IconPillLink
                  key={link.id}
                  href={link.url}
                  label={link.label}
                  icon={<SocialIcon id={link.id} />}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-[rgba(148,163,184,0.16)] pt-6 text-xs text-[var(--color-muted)] md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>

          <p className="font-mono">
            built with <span className="text-[var(--color-accent)]">react</span> ·{' '}
            <span className="text-[var(--color-accent)]">ts</span> ·{' '}
            <span className="text-[var(--color-accent)]">vite</span>
          </p>
        </div>
      </div>
    </footer>
  )
}