import type { ReactNode } from 'react'
import { techStack, type TechKey, type TechStackItem } from '../../data/techStack.data'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import { SectionContainer } from '../layout/SectionContainer'
import { SectionHeading } from '../ui/SectionHeading'

import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiVite,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiPostman,
} from 'react-icons/si'

const ICONS: Record<TechKey, ReactNode> = {
  react: <SiReact />,
  typescript: <SiTypescript />,
  javascript: <SiJavascript />,
  tailwind: <SiTailwindcss />,
  vite: <SiVite />,
  node: <SiNodedotjs />,
  git: <SiGit />,
  github: <SiGithub />,
  postman: <SiPostman />,
}

/**
 * Colores tech
 * dark UI.
 */
const TECH_STYLES: Record<TechKey, { iconColor: string; glow: string }> = {
  react: { iconColor: 'rgba(97,218,251,0.95)', glow: 'rgba(97,218,251,0.20)' },
  typescript: { iconColor: 'rgba(49,120,198,0.95)', glow: 'rgba(49,120,198,0.22)' },
  javascript: { iconColor: 'rgba(247,223,30,0.95)', glow: 'rgba(247,223,30,0.18)' },
  tailwind: { iconColor: 'rgba(56,189,248,0.95)', glow: 'rgba(56,189,248,0.18)' },
  vite: { iconColor: 'rgba(167,139,250,0.95)', glow: 'rgba(167,139,250,0.18)' },
  node: { iconColor: 'rgba(34,197,94,0.95)', glow: 'rgba(34,197,94,0.18)' },
  git: { iconColor: 'rgba(249,115,22,0.95)', glow: 'rgba(249,115,22,0.18)' },
  github: { iconColor: 'rgba(248,250,252,0.80)', glow: 'rgba(248,250,252,0.10)' },
  postman: { iconColor: 'rgba(251,113,133,0.95)', glow: 'rgba(251,113,133,0.16)' },
}

function TechChip({
  item,
  index,
  animateIn,
}: {
  item: TechStackItem
  index: number
  animateIn: boolean
}) {
  const styles = TECH_STYLES[item.key]
  const delayMs = Math.min(index * 55, 420) 

  return (
    <div
      className={[
        'group relative flex items-center gap-3 rounded-2xl',
        'border border-[var(--color-border)] bg-[rgba(255,255,255,0.05)]',
        'px-3 py-2', 
        'transition duration-300',
        'hover:-translate-y-0.5 hover:border-[rgba(24,208,184,0.50)] hover:bg-[rgba(255,255,255,0.08)]',
        'focus-within:-translate-y-0.5',
      
        animateIn
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-2',
        'motion-reduce:transform-none motion-reduce:transition-none',
      ].join(' ')}
      style={{ transitionDelay: animateIn ? `${delayMs}ms` : '0ms' }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition group-hover:opacity-100">
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${styles.glow}, transparent 60%)`,
          }}
        />
      </div>

      <div
        className={[
          'relative flex h-9 w-9 items-center justify-center rounded-full',
          'bg-[rgba(0,0,0,0.22)] ring-1 ring-[rgba(148,163,184,0.18)]',
          'text-lg',
          'transition duration-300',
          'group-hover:ring-[rgba(24,208,184,0.35)]',
          'motion-reduce:transition-none',
        ].join(' ')}
        style={{ color: styles.iconColor }}
        aria-hidden="true"
      >
        {ICONS[item.key]}
      </div>

      <p className="relative text-sm font-semibold text-[var(--color-text)]">
        {item.label}
      </p>
    </div>
  )
}

export function SkillsSection() {
  const { ref, isInView } = useInViewOnce<HTMLDivElement>({ threshold: 0.15 })

  return (
    <SectionContainer id="skills">
      <SectionHeading
        title="My Tech Stack"
        subtitle="Herramientas y tecnologías que uso para desarrollar interfaces modernas y funcionales."
      />

      <div
        ref={ref}
        className="rounded-3xl border border-[var(--color-border)] bg-[rgba(0,0,0,0.16)] p-5 shadow-[0_18px_70px_rgba(0,0,0,0.35)] md:p-6"
      >
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[rgba(248,250,252,0.20)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[rgba(248,250,252,0.16)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[rgba(248,250,252,0.12)]" />
          <span className="ml-3 font-mono text-xs text-[rgba(148,163,184,0.75)]">
            tech-stack.ts
          </span>
        </div>

        <div className="mt-5 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]">
          {techStack.map((item, index) => (
            <TechChip key={item.key} item={item} index={index} animateIn={isInView} />
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}