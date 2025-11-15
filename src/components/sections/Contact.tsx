import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Factory, Shield } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface ContactProps {
  onSuccess?: (message: string) => void
}

export function Contact({ onSuccess }: ContactProps) {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--brand-deep))] via-[hsl(var(--brand-primary))]/95 to-[hsl(var(--brand-secondary))] py-16 text-slate-100 sm:py-20"
    >
      <div className="absolute inset-0 opacity-40 mix-blend-soft-light">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-white/25 via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-black/20 px-4 py-1 text-xs uppercase tracking-[0.28em] text-slate-200">
            Partner With Sunmax Labs
          </span>

          <div className="space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Let&apos;s plan your next healthcare milestone.
            </h2>
            <p className="max-w-2xl text-sm text-slate-200 sm:text-base">
              Share your requirements for PCD pharma franchise, third-party manufacturing, or specialty formulations.
              Our team will align regulatory, manufacturing, and distribution support to your growth roadmap.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur">
              <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--brand-accent))] text-slate-950 shadow-md">
                <Factory className="h-4 w-4" />
              </span>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">Scale-ready manufacturing</h3>
                <p className="text-xs text-slate-200">
                  WHO-GMP aligned lines for antibiotics, injectables, pediatrics, and specialty therapies.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur">
              <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-[hsl(var(--brand-light))]">
                <Shield className="h-4 w-4" />
              </span>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white">Partner-first engagement</h3>
                <p className="text-xs text-slate-200">
                  Dedicated support for documentation, product selection, and franchise onboarding.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 text-sm sm:grid-cols-3">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Call</p>
              <a href="tel:+916302308515" className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[hsl(var(--brand-accent))]">
                <Phone className="h-4 w-4" />
                +91 63023 08515
              </a>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Email</p>
              <a
                href="mailto:info@sunmaxlabs.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[hsl(var(--brand-accent))]"
              >
                <Mail className="h-4 w-4" />
                info@sunmaxlabs.com
              </a>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-300">Location</p>
              <p className="flex items-start gap-2 text-xs text-slate-200">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" />
                Hyderabad · Telangana · India
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="rounded-3xl border border-white/15 bg-card/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <h3 className="text-lg font-semibold text-slate-900">Tell us about your requirement</h3>
            <p className="mt-2 text-xs text-muted-foreground">
              Share a few details so we can prepare a tailored response within 1–2 business days.
            </p>

            <form
              className="mt-6 space-y-4 text-sm"
              onSubmit={(event) => {
                event.preventDefault()
                const form = event.currentTarget as HTMLFormElement
                form.reset()
                onSuccess?.('Thank you for contacting Sunmax Laboratories. We will get back to you shortly.')
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-medium text-slate-900">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="Enter your name"
                    className="h-10 w-full rounded-xl border border-border bg-muted/40 px-3 text-xs text-slate-900 outline-none ring-offset-background placeholder:text-muted-foreground focus:border-[hsl(var(--brand-primary))] focus:ring-2 focus:ring-[hsl(var(--brand-primary))]/60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="company" className="text-xs font-medium text-slate-900">
                    Company / Organization
                  </label>
                  <input
                    id="company"
                    name="company"
                    placeholder="Your company name"
                    className="h-10 w-full rounded-xl border border-border bg-muted/40 px-3 text-xs text-slate-900 outline-none ring-offset-background placeholder:text-muted-foreground focus:border-[hsl(var(--brand-primary))] focus:ring-2 focus:ring-[hsl(var(--brand-primary))]/60"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-medium text-slate-900">
                    Work Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="h-10 w-full rounded-xl border border-border bg-muted/40 px-3 text-xs text-slate-900 outline-none ring-offset-background placeholder:text-muted-foreground focus:border-[hsl(var(--brand-primary))] focus:ring-2 focus:ring-[hsl(var(--brand-primary))]/60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-xs font-medium text-slate-900">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    placeholder="Include country code"
                    className="h-10 w-full rounded-xl border border-border bg-muted/40 px-3 text-xs text-slate-900 outline-none ring-offset-background placeholder:text-muted-foreground focus:border-[hsl(var(--brand-primary))] focus:ring-2 focus:ring-[hsl(var(--brand-primary))]/60"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="interest" className="text-xs font-medium text-slate-900">
                  I&apos;m interested in
                </label>
                <select
                  id="interest"
                  name="interest"
                  className="h-10 w-full rounded-xl border border-border bg-muted/40 px-3 text-xs text-slate-900 outline-none ring-offset-background focus:border-[hsl(var(--brand-primary))] focus:ring-2 focus:ring-[hsl(var(--brand-primary))]/60"
                  defaultValue="pcd"
                >
                  <option value="pcd">PCD Pharma Franchise</option>
                  <option value="third-party">Third-Party Manufacturing</option>
                  <option value="formulation">Custom Formulation Development</option>
                  <option value="quality">Quality &amp; Regulatory Support</option>
                  <option value="other">Other / General Inquiry</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-medium text-slate-900">
                  Briefly describe your requirement
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Share product segments, volumes, timelines, or any specific certifications required."
                  className="w-full rounded-xl border border-border bg-muted/40 px-3 py-2 text-xs text-slate-900 outline-none ring-offset-background placeholder:text-muted-foreground focus:border-[hsl(var(--brand-primary))] focus:ring-2 focus:ring-[hsl(var(--brand-primary))]/60"
                />
              </div>

              <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--brand-secondary))] px-6 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-[hsla(var(--brand-secondary)/0.28)] hover:bg-[hsl(var(--brand-secondary))]/90"
                >
                  Send message
                  <Send className="h-4 w-4" />
                </Button>
                <p className="max-w-xs text-[11px] text-muted-foreground">
                  By submitting this form, you agree to be contacted by Sunmax Laboratories regarding franchise or manufacturing
                  opportunities.
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
