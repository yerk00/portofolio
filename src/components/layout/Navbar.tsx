import { useEffect, useMemo, useState } from 'react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { HiOutlineMail, HiOutlineMenu, HiOutlineX } from 'react-icons/hi'

/**
 *elemento de navegacion del navbar
 */
type NavItem = {
  label: string
  href: `#${string}`
}

/**
 * Lista de enlaces de navegación mostrados en el navbar
 */
const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#top' },
  { label: 'Portfolio', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

/**
 * Props para el componente 
 */
interface SocialIconLinkProps {
  label: string
  href: string
  children: React.ReactNode
}

/**
 * Componente reutilizable para mostrar iconos de las redes sociales
 * con un enlace externo
 */
function SocialIconLink({ label, href, children }: SocialIconLinkProps) {
  return (
    <a
      aria-label={label}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 text-xs text-[var(--color-muted)] hover:text-[var(--color-text)]"
    >
      <span className="text-base">{children}</span>
      <span className="hidden lg:inline">{label}</span>
    </a>
  )
}

/**
 * Hook que bloquea el scroll del body
 * cuando el menú movil esta abierto.
 */
function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [locked])
}

function getActiveHref(items: NavItem[]): NavItem['href'] {
  return items[0].href
}


export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
 
  const activeHref = useMemo(() => getActiveHref(NAV_ITEMS), [])

  useLockBodyScroll(isMobileMenuOpen)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsMobileMenuOpen(false)
    }

    if (isMobileMenuOpen) window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])


  function closeMobileMenu() {
    setIsMobileMenuOpen(false)
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen((prev) => !prev)
  }

  return (
    <header className="sticky top-0 z-50 relative overflow-x-clip border-b border-[var(--color-border)] bg-[rgba(0,0,0,0.22)] backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* logo dev */}
        <a href="#top" className="min-w-0 flex items-center gap-3 font-semibold tracking-tight">
    <span className="shrink-0 text-[var(--color-accent)]">{'<C/>'}</span>
    <span className="min-w-0 truncate">Dev</span>
  </a>

        <nav className="hidden items-center gap-8 text-sm md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={
                item.href === activeHref
                  ? 'text-[var(--color-accent)]'
                  : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
              }
            >
              {item.href === activeHref ? `<${item.label}>` : item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-5 md:flex">
            <SocialIconLink label="LinkedIn" href="https://linkedin.com/usuario">
              <FaLinkedinIn />
            </SocialIconLink>

            <SocialIconLink label="Github" href="https://github.com/yerk00">
              <FaGithub />
            </SocialIconLink>

            <a
              aria-label="Email"
              href="#contact"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-accent)] ring-1 ring-[var(--color-border)] hover:brightness-110"
            >
              <HiOutlineMail />
            </a>
          </div>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-surface)] text-[var(--color-text)] ring-1 ring-[var(--color-border)] hover:brightness-110 md:hidden"
          >
            {isMobileMenuOpen ? <HiOutlineX className="text-xl" /> : <HiOutlineMenu className="text-xl" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="md:hidden">

          <button
            type="button"
            aria-label="Close menu backdrop"
            onClick={closeMobileMenu}
            className="fixed inset-0 z-40 cursor-default bg-black/40"
          />

          <div className="fixed left-0 right-0 top-[65px] z-50 border-b border-[var(--color-border)] bg-[rgba(0,0,0,0.55)] backdrop-blur">
            <div className="mx-auto max-w-6xl px-6 py-5">

              <nav className="flex flex-col gap-3">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-[var(--color-text)] hover:bg-white/5"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              <div className="mt-5 flex items-center gap-4 border-t border-[var(--color-border)] pt-5">
                <a
                  href="https://linkedin.com/in/tuusuario"
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMobileMenu}
                  className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-text)]"
                >
                  <FaLinkedinIn /> LinkedIn
                </a>

                <a
                  href="https://github.com/tuusuario"
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMobileMenu}
                  className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-text)]"
                >
                  <FaGithub /> GitHub
                </a>

                <a
                  href="#contact"
                  onClick={closeMobileMenu}
                  className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-accent)] ring-1 ring-[var(--color-border)] hover:brightness-110"
                  aria-label="Email"
                >
                  <HiOutlineMail />
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}