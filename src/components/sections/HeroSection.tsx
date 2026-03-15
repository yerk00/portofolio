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
        'absolute flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16',
        'bg-[rgba(0,0,0,0.18)] ring-1 ring-[var(--color-border)] backdrop-blur',
        'shadow-[0_14px_40px_rgba(0,0,0,0.35)]',
        className,
      ].join(' ')}
    >
      <div className="text-2xl text-[rgba(248,250,252,0.75)] sm:text-3xl">{icon}</div>
    </div>
  )
}

function CodeHints() {
  return (
    <>
      <div className="pointer-events-none absolute left-0 top-16 hidden font-mono text-xs text-[rgba(148,163,184,0.22)] md:block">
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
    .map((part) => part[0]?.toUpperCase())
    .join('')

  return (
    <div className="relative mx-auto w-full max-w-[460px] overflow-hidden">
      <div className="absolute inset-0 -z-10 rounded-full bg-[rgba(0,0,0,0.18)]" />

      <div className="relative mx-auto aspect-square w-[clamp(240px,70vw,420px)] overflow-hidden rounded-full ring-1 ring-[var(--color-border)] shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
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

      <TechBubble icon={<FaPython />} className="right-2 top-20 sm:top-24" />
      <TechBubble
        icon={<FaAngular />}
        className="bottom-8 left-4 sm:bottom-10 sm:left-6"
      />
      <TechBubble
        icon={<FaJsSquare />}
        className="bottom-4 right-4 sm:bottom-6 sm:right-8"
      />
    </div>
  )
}

export function HeroSection() {
  return (
    <section id="top" className="relative px-4 py-16 sm:px-6 md:px-10 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div className="relative min-w-0">
          <CodeHints />

          <p className="text-sm font-medium text-[var(--color-muted)]">
            {profile.role}
          </p>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--color-text)] sm:text-5xl lg:text-6xl">
            Hello <br />
            Im{' '}
            <span className="text-[var(--color-accent)]">
              {profile.name.split(' ')[0]}
            </span>
            , <br />
            <span className="block min-h-[1.2em] max-w-full">
              <TypewriterText
                texts={['Web developer', 'Frontend developer', 'Full-stack developer']}
                options={{
                  typingSpeedMs: 105,
                  deletingSpeedMs: 55,
                  pauseAfterTypedMs: 1400,
                  pauseAfterDeletedMs: 250,
                }}
              />
            </span>
          </h1>

          <p className="mt-8 max-w-full font-mono text-sm text-[rgba(248,250,252,0.65)]">
            <span className="block min-h-[1.5rem]">
              <TypewriterText
                texts={[
                  profile.tagline ?? 'full stack developer',
                  'clean code & architecture',
                  'react • typescript • tailwind',
                ]}
                options={{
                  typingSpeedMs: 95,
                  deletingSpeedMs: 50,
                  pauseAfterTypedMs: 1400,
                  pauseAfterDeletedMs: 250,
                }}
              />
            </span>
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a
              href="/cv.pdf"
              className="rounded-md border border-[var(--color-accent)] px-6 py-3 text-sm font-medium text-[var(--color-accent)] transition hover:bg-[rgba(255,255,255,0.06)]"
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

        <div className="relative min-w-0">
          <Portrait />
        </div>
      </div>
    </section>
  )
}