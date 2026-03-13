import { classNames } from '../../utils/classNames'

interface TagProps {
  label: string
  className?: string
}

export function Tag({ label, className }: TagProps) {
  return (
    <span
      className={classNames(
        'inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700',
        className,
      )}
    >
      {label}
    </span>
  )
}