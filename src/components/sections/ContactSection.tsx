import { useMemo, useState } from 'react'
import { profile } from '../../data/profile.data'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import { sendContactMessage } from '../../services/contact.service'
import { SectionContainer } from '../layout/SectionContainer'
import { SectionHeading } from '../ui/SectionHeading'

type ContactFormState = {
  name: string
  email: string
  message: string
  company: string
}

type SubmitStatus = 'idle' | 'sending' | 'success' | 'error'

const INITIAL_STATE: ContactFormState = {
  name: '',
  email: '',
  message: '',
  company: '',
}

function isValidEmail(value: string) {
  return value.includes('@') && value.includes('.')
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  name,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: 'text' | 'email'
  name: string
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold tracking-wide text-[rgba(248,250,252,0.70)]">
        {label}
      </span>

      <input
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={[
          'w-full rounded-2xl border border-[rgba(148,163,184,0.18)]',
          'bg-[rgba(255,255,255,0.06)] px-4 py-3 text-sm',
          'text-[var(--color-text)] placeholder:text-[rgba(148,163,184,0.70)]',
          'outline-none transition',
          'focus:border-[rgba(24,208,184,0.55)] focus:ring-4 focus:ring-[rgba(24,208,184,0.12)]',
        ].join(' ')}
      />
    </label>
  )
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
  name,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  name: string
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold tracking-wide text-[rgba(248,250,252,0.70)]">
        {label}
      </span>

      <textarea
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={6}
        className={[
          'w-full resize-none rounded-2xl border border-[rgba(148,163,184,0.18)]',
          'bg-[rgba(255,255,255,0.06)] px-4 py-3 text-sm',
          'text-[var(--color-text)] placeholder:text-[rgba(148,163,184,0.70)]',
          'outline-none transition',
          'focus:border-[rgba(24,208,184,0.55)] focus:ring-4 focus:ring-[rgba(24,208,184,0.12)]',
        ].join(' ')}
      />
    </label>
  )
}

export function ContactSection() {
  const { ref, isInView } = useInViewOnce<HTMLDivElement>({ threshold: 0.15 })
  const [form, setForm] = useState<ContactFormState>(INITIAL_STATE)
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [submitError, setSubmitError] = useState<string>('')

  const errors = useMemo(() => {
    const next: Partial<Record<keyof ContactFormState, string>> = {}

    if (form.name.trim().length < 2) next.name = 'Escribe tu nombre (mín. 2 caracteres).'
    if (!isValidEmail(form.email.trim())) next.email = 'Escribe un email válido.'
    if (form.message.trim().length < 10) next.message = 'Tu mensaje debe tener al menos 10 caracteres.'

    return next
  }, [form.email, form.message, form.name])

  const isFormValid = Object.keys(errors).length === 0
  const isSending = status === 'sending'

  function update<K extends keyof ContactFormState>(key: K, value: ContactFormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isFormValid || isSending) return

    setStatus('sending')
    setSubmitError('')

    const result = await sendContactMessage({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      company: form.company,
    })

    if (result.ok) {
      setStatus('success')
      setForm(INITIAL_STATE)
      return
    }

    setStatus('error')
    setSubmitError(result.errorMessage ?? 'Ocurrió un error al enviar.')
  }

  return (
    <SectionContainer id="contact">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          title="Contact"
          subtitle="Envíame un mensaje y te respondo lo antes posible."
        />

        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-border)] bg-[rgba(255,255,255,0.05)] px-4 py-2 text-xs text-[var(--color-muted)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          Respuesta por email
        </div>
      </div>

      <div
        ref={ref}
        className={[
          'mt-8',
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
          'transition duration-500 motion-reduce:transform-none',
        ].join(' ')}
      >
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[var(--color-border)] bg-[rgba(0,0,0,0.16)] p-6 shadow-[0_18px_70px_rgba(0,0,0,0.35)] md:p-7"
        >
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[rgba(248,250,252,0.20)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[rgba(248,250,252,0.16)]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[rgba(248,250,252,0.12)]" />
            <span className="ml-3 font-mono text-xs text-[rgba(148,163,184,0.75)]">
              send-message.ts
            </span>

            <span className="ml-auto text-xs text-[var(--color-muted)]">
              or email: <a className="hover:text-[var(--color-accent)]" href={`mailto:${profile.email}`}>{profile.email}</a>
            </span>
          </div>

          <input
            type="text"
            name="company"
            value={form.company}
            onChange={(e) => update('company', e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div>
              <Input
                name="name"
                label="Your name"
                value={form.name}
                onChange={(v) => update('name', v)}
                placeholder="Tu nombre"
              />
              {errors.name ? (
                <p className="mt-2 text-xs text-[rgba(251,113,133,0.90)]">{errors.name}</p>
              ) : null}
            </div>

            <div>
              <Input
                name="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={(v) => update('email', v)}
                placeholder="tuemail@ejemplo.com"
              />
              {errors.email ? (
                <p className="mt-2 text-xs text-[rgba(251,113,133,0.90)]">{errors.email}</p>
              ) : null}
            </div>
          </div>

          <div className="mt-4">
            <Textarea
              name="message"
              label="Message"
              value={form.message}
              onChange={(v) => update('message', v)}
              placeholder="Cuéntame qué necesitas y en qué puedo ayudarte…"
            />
            {errors.message ? (
              <p className="mt-2 text-xs text-[rgba(251,113,133,0.90)]">{errors.message}</p>
            ) : null}
          </div>

          {status === 'success' ? (
            <div className="mt-5 rounded-2xl border border-[rgba(24,208,184,0.35)] bg-[rgba(24,208,184,0.10)] px-4 py-3 text-sm text-[rgba(248,250,252,0.85)]">
              Mensaje enviado. Gracias. Te responderé al correo que dejaste.
            </div>
          ) : null}

          {status === 'error' ? (
            <div className="mt-5 rounded-2xl border border-[rgba(251,113,133,0.35)] bg-[rgba(251,113,133,0.10)] px-4 py-3 text-sm text-[rgba(248,250,252,0.85)]">
              {submitError || 'No se pudo enviar. Intenta de nuevo o escríbeme por email.'}
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={!isFormValid || isSending}
              className={[
                'rounded-xl px-5 py-3 text-sm font-semibold transition',
                isFormValid && !isSending
                  ? 'bg-[var(--color-accent)] text-[rgba(0,0,0,0.85)] hover:brightness-110'
                  : 'cursor-not-allowed bg-[rgba(255,255,255,0.10)] text-[rgba(248,250,252,0.55)]',
              ].join(' ')}
            >
              {isSending ? 'Sending…' : 'Send message'}
            </button>

            <a
              href={`mailto:${profile.email}`}
              className="rounded-xl border border-[rgba(148,163,184,0.20)] bg-[rgba(255,255,255,0.06)] px-5 py-3 text-sm font-semibold text-[rgba(248,250,252,0.80)] hover:bg-[rgba(255,255,255,0.10)]"
            >
              Email me
            </a>

            <span className="text-xs text-[var(--color-muted)]">
              Envío de mensaje.
            </span>
          </div>
        </form>
      </div>
    </SectionContainer>
  )
}