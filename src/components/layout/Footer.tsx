import { motion } from 'framer-motion'

import logo from '@/assets/logo.jpeg'
import { NAV_ITEMS } from '@/components/layout/Header'

interface FooterProps {
  goHome?: () => void
  isProductPage?: boolean
}

export function Footer({ goHome, isProductPage = false }: FooterProps) {
  const handleNavigation = (href: string) => {
    const hash = href.startsWith('#') ? href.substring(1) : href
    const targetId = hash || 'contact'
    
    // If on product page, navigate home first
    if (isProductPage && goHome) {
      // Scroll to top immediately to prevent footer jump
      window.scrollTo({ top: 0, behavior: 'instant' })
      goHome()
      // Wait for React to re-render and DOM to update, then scroll to target
      setTimeout(() => {
        const element = document.getElementById(targetId)
        if (element) {
          // Scroll element into view with offset for header
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - 100 // 100px offset for header
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 150)
    } else {
      // On home page, just scroll to target
      const element = document.getElementById(targetId)
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - 100 // 100px offset for header
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }
  return (
    <footer className="relative overflow-hidden text-slate-100 drop-shadow-[0_-2px_18px_rgba(0,0,0,0.5)]">
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[hsl(var(--brand-deep))] via-[hsl(var(--brand-primary))]/85 to-[hsl(var(--brand-secondary))]" />
      <div className="absolute inset-0 -z-10 bg-black/40" />
      <div className="container relative z-10 flex flex-col gap-10 py-12 drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)] lg:flex-row lg:items-start lg:justify-between">
        <motion.div
          className="flex max-w-sm flex-col gap-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <a 
            href="/"
            onClick={(e) => {
              e.preventDefault()
              if (isProductPage && goHome) {
                goHome()
                // Scroll to top after navigation
                requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  })
                })
              } else {
                // On home page, just scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
            className="flex items-center gap-4 cursor-pointer"
          >
            <img
              src={logo}
              alt="Sunmax Laboratories logo"
              className="h-16 w-auto rounded-full border border-white/40 bg-white/85 object-contain shadow-lg md:h-20"
              loading="lazy"
            />
            <span className="text-xl font-semibold tracking-tight">Sunmax Laboratories Pvt. Ltd.</span>
          </a>
          <p className="text-sm leading-relaxed text-slate-300">
            3-6-207/1, 2nd Floor, Sai Rasmi, Street No. 15, AP State Housing Board, Himayatnagar,
            Hyderabad-500029, Telangana, India.
          </p>
          <div className="text-sm text-slate-300">
            <p>Phone: +91 63023 08515</p>
            <p>Email: info@sunmaxlabs.com</p>
          </div>
        </motion.div>

        <div className="grid gap-8 text-sm text-slate-300 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h4 className="text-base font-semibold text-white">Navigation</h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a 
                    className="transition hover:text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)] cursor-pointer" 
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation(item.href)
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h4 className="text-base font-semibold text-white">Product Portfolio</h4>
            <ul className="space-y-2">
              <li>Antibiotics &amp; Injectables</li>
              <li>Pediatric Range &amp; Hematinics</li>
              <li>Anti-Inflammatory &amp; Anti-Allergic</li>
              <li>Neurology &amp; Multivitamins</li>
            </ul>
          </motion.div>
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h4 className="text-base font-semibold text-white">Service Lines</h4>
            <ul className="space-y-2">
              <li>PCD Pharma Franchise</li>
              <li>Third-Party Manufacturing</li>
              <li>Custom Formulation Development</li>
              <li>Process Analytical Support</li>
            </ul>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 text-xs text-slate-400 sm:flex-row">
          <span>&copy; {new Date().getFullYear()} Sunmax Laboratories Pvt. Ltd. All rights reserved.</span>
          <span>Inspired by benchmark practices from Sunmax Laboratories and Plena Remedies Pvt. Ltd.</span>
        </div>
      </div>
    </footer>
  )
}

