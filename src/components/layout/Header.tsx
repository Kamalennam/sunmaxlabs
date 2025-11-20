import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

import logo from '@/assets/logo.jpeg'
import { cn } from '@/lib/utils'

export const NAV_ITEMS = [
  { label: 'About', href: '#about', key: 'about' },
  { label: 'Products', href: '#products', key: 'products' },
  { label: 'Certifications', href: '#divisions', key: 'quality' },
  { label: 'Contact', href: '#contact', key: 'contact' },
]

interface HeaderProps {
  className?: string
  goHome?: () => void
  isProductPage?: boolean
}

export function Header({ className, goHome, isProductPage = false }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)


  const handleNavigation = (href: string) => {
    const hash = href.startsWith('#') ? href.substring(1) : href
    const targetId = hash || 'contact'

    if (isProductPage && goHome) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      goHome()

      setTimeout(() => {
        const element = document.getElementById(targetId)
        if (element) {
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - 100
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
        }
      }, 150)
    } else {
      const element = document.getElementById(targetId)
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - 100
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
      }
    }

    setIsOpen(false)
  }

  return (
    <header className={cn('relative overflow-hidden -mb-4', className)}>
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-[hsl(var(--brand-deep))] via-[hsl(var(--brand-primary))]/70 to-[hsl(var(--brand-secondary))]" />
      <div className="absolute inset-x-0 bottom-0 -z-20 h-1/2 bg-gradient-to-t from-background/20 to-transparent" />

      <div className="relative z-10 pb-3 md:pb-4">
        <div className="flex w-full flex-col gap-6 rounded-3xl border border-black/10 bg-white/90 px-6 py-5 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.25)] backdrop-blur-md md:flex-row md:items-center md:justify-between">

          {/* LOGO + HAMBURGER ROW (mobile) */}
          <div className="flex w-full items-center justify-between md:w-auto">
            <motion.a
              href="/"
              onClick={(e) => {
                e.preventDefault()
                if (isProductPage && goHome) {
                  goHome()
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    })
                  })
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
              className="flex items-center gap-4 text-slate-900 cursor-pointer"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={logo}
                alt="Sunmax Laboratories logo"
                className="h-16 w-auto rounded-full border border-white/30 bg-white/85 object-contain shadow-lg md:h-20"
                loading="lazy"
              />
            </motion.a>

            {/* HAMBURGER - mobile only */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/90 text-slate-900 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 md:hidden"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden flex-1 items-center justify-end gap-4 text-sm font-medium text-slate-900 md:flex">
            {NAV_ITEMS.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation(item.href)
                }}
                className="rounded-full px-4 py-2 text-slate-900 transition hover:bg-black/5 cursor-pointer"
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>
        </div>
      </div>

      {/* MOBILE NAV DROPDOWN */}
      <AnimatePresence>
        {isOpen ? (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="container mb-4 drop-shadow-[0_6px_20px_rgba(0,0,0,0.35)] md:hidden"
          >
            <div className="rounded-3xl border border-black/10 bg-white px-6 py-4 text-sm text-slate-900 shadow-lg">
              <ul className="space-y-4">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault()
                        handleNavigation(item.href)
                      }}
                      className="flex items-center justify-between rounded-full px-3 py-2 text-slate-900 transition hover:bg-slate-100 cursor-pointer"
                    >
                      <span>{item.label}</span>
                      <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Go</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
