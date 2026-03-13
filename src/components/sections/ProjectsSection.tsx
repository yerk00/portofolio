import { useMemo } from 'react'
import { projects } from '../../data/projects.data'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import { SectionContainer } from '../layout/SectionContainer'
import { SectionHeading } from '../ui/SectionHeading'
import { ProjectCard } from '../project/ProjectCard'

export function ProjectsSection() {
  const { ref, isInView } = useInViewOnce<HTMLDivElement>({ threshold: 0.12 })

  const sortedProjects = useMemo(() => {
    return [...projects].sort((a, b) => {
      const featuredDiff = Number(Boolean(b.featured)) - Number(Boolean(a.featured))
      if (featuredDiff !== 0) return featuredDiff
      return a.title.localeCompare(b.title)
    })
  }, [])

  return (
    <SectionContainer id="projects">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          title="Projects"
          subtitle="Proyectos seleccionados con foco en UI limpia, arquitectura y buenas prácticas."
        />

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.05)] px-4 py-2 text-xs text-[var(--color-muted)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          {sortedProjects.length} projects
        </div>
      </div>

      <div
        ref={ref}
        className="mt-8 grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]"
      >
        {sortedProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            animateIn={isInView}
          />
        ))}
      </div>
    </SectionContainer>
  )
}