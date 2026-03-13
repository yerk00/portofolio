import { useEffect, useMemo, useState } from 'react'

interface UseTypewriterOptions {
  texts: string[]
  typingSpeedMs?: number
  deletingSpeedMs?: number
  pauseAfterTypedMs?: number
  pauseAfterDeletedMs?: number
  loop?: boolean
}

export function useTypewriter({
  texts,
  typingSpeedMs = 95,
  deletingSpeedMs = 55,
  pauseAfterTypedMs = 1400,
  pauseAfterDeletedMs = 250,
  loop = true,
}: UseTypewriterOptions) {
  const safeTexts = useMemo(() => texts.filter((t) => t.trim().length > 0), [texts])
  const [textIndex, setTextIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (safeTexts.length === 0) return

    const fullText = safeTexts[textIndex] ?? ''
    const doneTyping = !isDeleting && displayed === fullText
    const doneDeleting = isDeleting && displayed.length === 0

    let delay = isDeleting ? deletingSpeedMs : typingSpeedMs
    if (doneTyping) delay = pauseAfterTypedMs
    if (doneDeleting) delay = pauseAfterDeletedMs

    const timer = window.setTimeout(() => {
      if (doneTyping) {
        setIsDeleting(true)
        return
      }

      if (doneDeleting) {
        setIsDeleting(false)
        setTextIndex((prev) => {
          const next = prev + 1
          if (next < safeTexts.length) return next
          return loop ? 0 : prev
        })
        return
      }

      const nextLength = isDeleting ? displayed.length - 1 : displayed.length + 1
      setDisplayed(fullText.slice(0, Math.max(0, nextLength)))
    }, delay)

    return () => window.clearTimeout(timer)
  }, [
    safeTexts,
    textIndex,
    displayed,
    isDeleting,
    typingSpeedMs,
    deletingSpeedMs,
    pauseAfterTypedMs,
    pauseAfterDeletedMs,
    loop,
  ])

  return { displayed }
}