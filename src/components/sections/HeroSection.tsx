import { profile } from '../../data/profile.data'
import { FaAngular, FaJsSquare, FaPython } from 'react-icons/fa'
import { TypewriterText } from '../ui/TypewriterText'

interface TechBubbleProps {
  icon: React.ReactNode
  className: string
}

function TechBubble({ icon, className }: TechBubbleProps) {
  return (
    <div
      className={[
        'absolute flex h-16 w-16 items-center justify-center rounded-full',
        'bg-[rgba(0,0,0,0.18)] ring-1 ring-[var(--color-border)] backdrop-blur',
        'shadow-[0_14px_40px_rgba(0,0,0,0.35)]',
        className,
      ].join(' ')}
    >
      <div className="text-3xl text-[rgba(248,250,252,0.75)]">{icon}</div>
    </div>
  )
}

function CodeHints() {
  return (
    <>
      <div className="pointer-events-none absolute left-0 top-16 font-mono text-xs text-[rgba(148,163,184,0.22)]">
        <div>{'<html>'}</div>
        <div className="ml-4">{'<body>'}</div>
        <div className="ml-8">{'<h1>'}</div>
        <div className="ml-8 mt-10">{'<p>'}</div>
        <div className="ml-8 mt-24">{'</p>'}</div>
      </div>

      <div className="pointer-events-none absolute left-[55%] top-[45%] hidden font-mono text-xs text-[rgba(148,163,184,0.18)] lg:block">
        {'<h1/>'}
      </div>
    </>
  )
}

function Portrait() {
  const initials = profile.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('')

  return (
    <div className="relative mx-auto w-full max-w-[460px]">

      <div className="absolute inset-0 -z-10 rounded-full bg-[rgba(0,0,0,0.18)] blur-[0px]" />

      <div className="relative mx-auto aspect-square w-[360px] rounded-full overflow-hidden ring-1 ring-[var(--color-border)] shadow-[0_20px_80px_rgba(0,0,0,0.5)] md:w-[420px]">
  
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(250,204,21,0.38),transparent_55%)]" />

        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt={`${profile.name} portrait`}
            className="h-full w-full object-cover grayscale"
            loading="eager"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[rgba(255,255,255,0.04)]">
            <span className="text-5xl font-bold text-[rgba(248,250,252,0.65)]">
              {initials}
            </span>
          </div>
        )}
      </div>

      {/* bubbles tech */}
      <TechBubble icon={<FaPython />} className="right-2 top-24" />
      <TechBubble icon={<FaAngular />} className="left-6 bottom-10" />
      <TechBubble icon={<FaJsSquare />} className="right-8 bottom-6" />
    </div>
  )
}

export function HeroSection() {
  return (
    <section id="top" className="relative px-6 py-16 md:px-10 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* Left */}
        <div className="relative">
          <CodeHints />

          <p className="text-sm font-medium text-[var(--color-muted)]">
            {profile.role}
          </p>

          <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-[var(--color-text)] md:text-6xl">
            Hello <br />
            Im{' '}
            <span className="text-[var(--color-accent)]">
              {profile.name.split(' ')[0]}
            </span>
            , <br />
            <TypewriterText texts={['Web developer', 'Frontend developer', 'Full-stack developer']} />
          </h1>

          <p className="mt-8 font-mono text-sm text-[rgba(248,250,252,0.65)]">
            <TypewriterText
              texts={[
                profile.tagline ?? 'full stack developer',
                'clean code & architecture',
                'react • typescript • tailwind',
              ]}
            />
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="/cv.pdf"
              className="rounded-md border border-[var(--color-accent)] px-6 py-3 text-sm font-medium text-[var(--color-accent)] hover:bg-[rgba(24,208,184,0.08)]"
            >
              View my CV
            </a>

            <a
              href="#contact"
              className="text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              Booking
            </a>
          </div>
        </div>

        {/* Right */}
        <div className="relative">
          <Portrait />
        </div>
      </div>
    </section>
  )
}