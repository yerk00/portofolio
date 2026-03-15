import type { Project } from '../../types/project.types'
import { Tag } from '../ui/Tag'

interface ProjectCardProps {
  project: Project
  index: number
  animateIn: boolean
}

function ActionLink({
  href,
  label,
  variant = 'secondary',
}: {
  href: string
  label: string
  variant?: 'primary' | 'secondary'
}) {
  const base =
    'inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs font-semibold transition'
  const primary =
    'bg-[var(--color-accent)] text-[rgba(0,0,0,0.85)] hover:brightness-110'
  const secondary =
    'border border-[rgba(148,163,184,0.20)] bg-[rgba(255,255,255,0.06)] text-[rgba(248,250,252,0.80)] hover:bg-[rgba(255,255,255,0.10)]'

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={[base, variant === 'primary' ? primary : secondary].join(' ')}
    >
      {label}
    </a>
  )
}

function ProjectPreview({ project }: { project: Project }) {
  if (project.imageUrl) {
    return (
      <div className="relative h-44 overflow-hidden rounded-2xl border border-[rgba(148,163,184,0.18)] bg-[rgba(0,0,0,0.18)]">
        <img
          src={project.imageUrl}
          alt={`${project.title} preview`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(250,204,21,0.38),transparent_55%)]" />
      </div>
    )
  }

  return (
    <div className="relative h-44 overflow-hidden rounded-2xl border border-[rgba(148,163,184,0.18)] bg-[rgba(0,0,0,0.18)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(250,204,21,0.38),transparent_55%)]" />
      <div className="absolute inset-0 opacity-70">
        <div className="p-4 font-mono text-[11px] leading-5 text-[rgba(248,250,252,0.55)]">
          <div>{`// ${project.title}`}</div>
          <div className="mt-2">{`const build = () => {`}</div>
          <div className="ml-4">{`return "clean UI + scalable code";`}</div>
          <div>{`}`}</div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-[rgba(248,250,252,0.70)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
        preview
      </div>
    </div>
  )
}

export function ProjectCard({ project, index, animateIn }: ProjectCardProps) {
  const delayMs = Math.min(index * 70, 420)

  return (
    <article
      className={[
        'group relative rounded-3xl border border-[var(--color-border)]',
        'bg-[var(--color-surface)] p-6',
        'shadow-[0_18px_70px_rgba(0,0,0,0.35)]',
        'transition duration-300',
        'hover:-translate-y-1 hover:border-[rgba(250,204,21,0.38)] hover:bg-[rgba(255,255,255,0.08)]',
        animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
        'motion-reduce:transform-none motion-reduce:transition-none',
      ].join(' ')}
      style={{ transitionDelay: animateIn ? `${delayMs}ms` : '0ms' }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition group-hover:opacity-100">
        <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_25%_15%,rgba(250,204,21,0.20),transparent_60%)]" />
      </div>

      <div className="relative flex flex-col gap-5">
        <ProjectPreview project={project} />

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-[var(--color-text)]">
            {project.title}
          </h3>

          {project.featured ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(250,204,21,0.38)] bg-[rgba(200,100,21,0.38)] px-3 py-1 text-xs font-semibold text-[var(--color-accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              Featured
            </span>
          ) : null}
        </div>

        {/* Description */}
        <p className="text-sm leading-7 text-[var(--color-muted)]">
          {project.description}
        </p>

        {/* Tech */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Tag
              key={tech}
              label={tech}
              className="border-[rgba(148,163,184,0.20)] bg-[rgba(255,255,255,0.06)] text-[rgba(248,250,252,0.78)]"
            />
          ))}
        </div>

        {/* Actions */}
        {(project.repositoryUrl || project.liveDemoUrl) ? (
          <div className="mt-1 flex flex-wrap gap-3">
            {project.liveDemoUrl ? (
              <ActionLink href={project.liveDemoUrl} label="Live Demo" variant="primary" />
            ) : null}

            {project.repositoryUrl ? (
              <ActionLink href={project.repositoryUrl} label="Repository" />
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  )
}