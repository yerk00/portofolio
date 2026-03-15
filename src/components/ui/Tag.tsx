import { classNames } from '../../utils/classNames'

interface TagProps {
  label: string
  className?: string
}

export function Tag({ label, className }: TagProps) {
  return (
    <span
      className={classNames(
        'inline-flex max-w-full items-center rounded-full border px-3 py-1 text-xs font-medium',
        'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)]',
        className,
      )}
    >
      {label}
    </span>
  )
}