interface SectionHeadingProps {
  title: string
  subtitle?: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-10">
      <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text)]">
        {title}
      </h2>

      {subtitle ? (
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}