import { profile } from '../../data/profile.data'
import { SectionContainer } from '../layout/SectionContainer'
import { SectionHeading } from '../ui/SectionHeading'

function CodeCard() {
  return (
    <div className="min-w-0 rounded-2xl border border-[var(--color-border)] bg-[rgba(0,0,0,0.20)] p-6 shadow-[0_16px_60px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[rgba(248,250,252,0.20)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[rgba(248,250,252,0.16)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[rgba(248,250,252,0.12)]" />
        <span className="ml-3 text-xs text-[var(--color-muted)]">about.ts</span>
      </div>

      <pre className="mt-5 max-w-full whitespace-pre-wrap break-words font-mono text-xs leading-6 text-[rgba(248,250,252,0.78)]">
        <code>
{`export const profile = {
  name: "${profile.name}",
  role: "${profile.role}",
  location: "${profile.location ?? 'Remote'}",
  focus: ["clean code", "scalable UI", "product mindset"],
}`}
        </code>
      </pre>
    </div>
  )
}

export function AboutSection() {
  return (
    <SectionContainer id="about">
      <SectionHeading title="About" subtitle="Sobre mí." />

      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="min-w-0 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <p className="text-sm leading-7 text-[var(--color-muted)]">
            Soy <span className="font-semibold text-[var(--color-text)]">{profile.name}</span>,{' '}
            {profile.role}. Construyo productos web con foco en{' '}
            <span className="font-semibold text-[var(--color-text)]">
              JavaScript, React
            </span>{' '}
            y tecnologías modernas. Me gusta crear aplicaciones{' '}
            <span className="text-[var(--color-accent)]">claras</span>,{' '}
            <span className="text-[var(--color-accent)]">funcionales</span> y con{' '}
            <span className="text-[var(--color-accent)]">buen diseño</span>.
          </p>

          <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
            Busco oportunidades profesionales para{' '}
            <span className="font-semibold text-[var(--color-text)]">
              crecer y seguir aprendiendo
            </span>
            , aportar análisis y{' '}
            <span className="font-semibold text-[var(--color-text)]">
              soluciones
            </span>{' '}
            dentro del desarrollo de software.
          </p>
        </div>

        <div className="min-w-0">
          <CodeCard />
        </div>
      </div>
    </SectionContainer>
  )
}