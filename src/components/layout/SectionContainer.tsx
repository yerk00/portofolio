import type { PropsWithChildren } from 'react'

interface SectionContainerProps extends PropsWithChildren {
  id?: string
  className?: string
}

export function SectionContainer({
  id,
  className = '',
  children,
}: SectionContainerProps) {
  return (
    <section id={id} className={`px-6 py-16 md:px-10 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}