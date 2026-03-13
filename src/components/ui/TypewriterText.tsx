import { useMemo } from 'react'
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
  reserveSpace?: boolean
}

export function TypewriterText({
  texts,
  options,
  className = '',
  caretClassName = '',
  reserveSpace = true,
}: TypewriterTextProps) {
  const { displayed } = useTypewriter({ texts, ...(options ?? {}) })

  const longestText = useMemo(() => {
    return texts.reduce((max, t) => (t.length > max.length ? t : max), '')
  }, [texts])


  return (
    <span className={reserveSpace ? 'inline-grid align-baseline' : 'inline'}>
      {reserveSpace ? (
        <span className="invisible whitespace-nowrap">{longestText}</span>
      ) : null}

      <span
        className={[
          reserveSpace ? 'col-start-1 row-start-1 whitespace-nowrap' : 'whitespace-nowrap',
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
    </span>
  )
}