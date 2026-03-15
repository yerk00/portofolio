import type { PropsWithChildren } from 'react'
import { classNames } from '../../utils/classNames'

interface SectionContainerProps extends PropsWithChildren {
  id?: string
  className?: string
}

export function SectionContainer({ id, className, children }: SectionContainerProps) {
  return (
    <section id={id} className={classNames('px-4 py-16 sm:px-6 md:px-10', className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}