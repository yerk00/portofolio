import { useTypewriter } from '../../hooks/useTypewriter'

interface TypewriterOptions {
  typingSpeedMs?: number
  deletingSpeedMs?: number
  pauseAfterTypedMs?: number
  pauseAfterDeletedMs?: number
  loop?: boolean
}

interface TypewriterTextProps {
  texts: string[]
  options?: TypewriterOptions
  className?: string
  caretClassName?: string
  singleLine?: boolean
}

export function TypewriterText({
  texts,
  options,
  className = '',
  caretClassName = '',
  singleLine = false,
}: TypewriterTextProps) {
  const { displayed } = useTypewriter({ texts, ...(options ?? {}) })

  return (
    <span
      className={[
        'max-w-full',
        singleLine ? 'whitespace-nowrap' : 'whitespace-normal break-words',
        className,
      ].join(' ')}
    >
      {displayed}
      <span
        className={[
          'ml-1 inline-block w-[10px] translate-y-[1px] bg-[var(--color-accent)]',
          'animate-[pulse_1.3s_ease-in-out_infinite]',
          caretClassName,
        ].join(' ')}
        aria-hidden="true"
      >
        &nbsp;
      </span>
    </span>
  )
}