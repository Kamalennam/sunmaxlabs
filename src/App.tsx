import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Factory, GraduationCap, Microscope, Shield, Sparkles } from 'lucide-react'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Contact } from '@/components/sections/Contact'
import { ProductsSection } from '@/components/sections/ProductsSection'
import { getProductBySlug, type Product, type ProductSlug } from '@/data/products'
import { Button } from '@/components/ui/button'
import aboutImage from '@/assets/about_img.jpg'

const specialties = [
  {
    icon: Microscope,
    title: 'Research-Led Formulations',
    description:
      'Insights-driven development inspired by Sunmax Laboratories’ 25+ years of therapeutic expertise.',
  },
  {
    icon: Shield,
    title: 'WHO-GMP Compliance',
    description:
      'Quality-by-design processes audited to stringent global manufacturing benchmarks.',
  },
  {
    icon: Factory,
    title: 'Integrated Manufacturing',
    description:
      'Dedicated antibiotic, pediatric, and injectables lines with rapid scale-up for franchise partners.',
  },
]

const aboutHighlights = [
  {
    icon: Sparkles,
    title: 'Vision',
    description:
      'To get into the core values of pharmacy with utmost diligence and become the most trusted name in the industry.',
  },
  {
    icon: GraduationCap,
    title: 'Mission',
    description:
      'To achieve the highest standards in the practice of pharmacy while promoting public health and safety across India.',
  },
  {
    icon: Shield,
    title: 'Quality',
    description:
      'To maintain every manufacturing standard, follow industrial policies, and prove that quality people deliver quality products.',
  },
]

function useProductRouting() {
  const [route, setRoute] = useState<'home' | 'product'>('home')
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleLocation = () => {
      const path = window.location.pathname
      const match = path.match(/\/products\/([^/]+)$/)
      if (match) {
        const slug = match[1] as ProductSlug
        const product = getProductBySlug(slug)
        setRoute('product')
        setActiveProduct(product ?? null)
      } else {
        setRoute('home')
        setActiveProduct(null)
      }
    }

    handleLocation()
    window.addEventListener('popstate', handleLocation)
    return () => window.removeEventListener('popstate', handleLocation)
  }, [])

  const openProduct = (product: Product) => {
    if (typeof window !== 'undefined') {
      const newPath = `/products/${product.slug}`
      window.history.pushState(null, '', newPath)
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    }
    setRoute('product')
    setActiveProduct(product)
  }

  const goHome = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/')
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    }
    setRoute('home')
    setActiveProduct(null)
  }

  return { route, activeProduct, openProduct, goHome }
}

interface ProductImageZoomProps {
  product: Product
  onHoverChange: (hover: boolean) => void
  onMove: (coords: { x: number; y: number }) => void
}

function ProductImageZoom({ product, onHoverChange, onMove }: ProductImageZoomProps) {
  const mainImage = product.images[0]

  const handleMove = (event: any) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    onMove({ x, y })
  }

  return (
    <div className="relative flex justify-end">
      <motion.div
        className="flex h-[420px] w-full items-center justify-center rounded-3xl border border-border bg-white p-4 shadow-md lg:h-[460px]"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
        onMouseMove={handleMove}
      >
        <img
          src={mainImage}
          alt={product.name}
          className="max-h-full w-auto object-contain"
        />
      </motion.div>
    </div>
  )
}

interface ProductDetailLayoutProps {
  product: Product
  onEnquiry: () => void
}

function ProductDetailLayout({ product, onEnquiry }: ProductDetailLayoutProps) {
  const [isHover, setIsHover] = useState(false)
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 50, y: 50 })

  return (
    <section className="container mb-16 mt-10 space-y-10">
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1.1fr] lg:items-start">
        <motion.div
          className="relative space-y-5 rounded-3xl border border-border bg-card/90 p-6 shadow-lg min-h-[420px] lg:min-h-[460px]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="space-y-1 max-w-xl">
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-primary">
              Product Detail
            </span>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{product.name}</h1>
            <p className="text-sm text-muted-foreground">{product.tagline}</p>
          </div>

          <div className="grid gap-4 text-xs sm:grid-cols-2">
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Use in segment</p>
              <p className="text-muted-foreground">
                {product.indications[0] ?? 'As directed by the physician.'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Packing</p>
              <p className="text-muted-foreground">Blister / bottle packing as per product label.</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Composition</h2>
            <p className="rounded-2xl border border-border bg-muted/60 p-3 text-[13px] leading-relaxed text-foreground">
              {product.composition}
            </p>
          </div>

          <div className="space-y-2 text-sm">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Therapeutic uses</h2>
            <ul className="space-y-1.5 text-[13px] leading-relaxed text-foreground">
              {product.indications.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[6px] inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {product.dosageHighlights ? (
            <div className="space-y-2 text-sm">
              <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Dosage &amp; advice</h2>
              <p className="rounded-2xl border border-border bg-amber-50/90 p-3 text-[12px] leading-relaxed text-amber-900">
                {product.dosageHighlights}
              </p>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3 pt-1 text-xs text-muted-foreground">
            <span>Use only under medical supervision.</span>
            <span className="hidden sm:inline">Pack images are indicative and follow approved artwork.</span>
          </div>

          <div className="pt-3">
            <Button
              type="button"
              onClick={onEnquiry}
              className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--brand-secondary))] px-6 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-[hsla(var(--brand-secondary)/0.28)] hover:bg-[hsl(var(--brand-secondary))]/90"
            >
              Enquiry for this product
            </Button>
          </div>

          {isHover && (
            <div
              className="pointer-events-none absolute inset-0 hidden rounded-3xl bg-white/95 lg:block"
              style={{
                backgroundImage: `url(${product.images[0]})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: '220% 220%',
                backgroundPosition: `${coords.x}% ${coords.y}%`,
              }}
            />
          )}
        </motion.div>

        <ProductImageZoom
          product={product}
          onHoverChange={setIsHover}
          onMove={setCoords}
        />
      </div>
    </section>
  )
}

interface EnquiryModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
  onSuccess: (message: string) => void
}

function EnquiryModal({ isOpen, onClose, product, onSuccess }: EnquiryModalProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="mt-20 w-full max-w-lg rounded-3xl border border-border bg-card/95 p-6 shadow-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Send enquiry</h2>
                <p className="text-xs text-muted-foreground">
                  {product
                    ? `Share your requirement for ${product.name}. Our team will respond with detailed information and commercial support.`
                    : 'Share your requirement and our team will respond with detailed information and commercial support.'}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted text-xs font-medium text-foreground/70 hover:bg-muted/80"
              >
                ✕
              </button>
            </div>

            <form
              className="space-y-4 text-sm"
              onSubmit={(event) => {
                event.preventDefault()
                const form = event.currentTarget as HTMLFormElement
                form.reset()
                onClose()
                onSuccess('Enquiry submitted successfully. Our team will contact you shortly.')
              }}
            >
              {product ? (
                <div className="space-y-1.5">
                  <p className="text-[11px] font-medium text-muted-foreground">Selected product</p>
                  <p className="rounded-xl border border-border bg-muted/40 px-3 py-2 text-xs font-semibold text-foreground">
                    {product.name}
                  </p>
                </div>
              ) : null}

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="enquiry-name" className="text-xs font-medium text-slate-900">
                    Full Name
                  </label>
                  <input
                    id="enquiry-name"
                    name="name"
                    required
                    placeholder="Enter your name"
                    className="h-10 w-full rounded-xl border border-border bg-muted/40 px-3 text-xs text-slate-900 outline-none ring-offset-background placeholder:text-muted-foreground focus:border-[hsl(var(--brand-primary))] focus:ring-2 focus:ring-[hsl(var(--brand-primary))]/60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="enquiry-company" className="text-xs font-medium text-slate-900">
                    Company / Organization
                  </label>
                  <input
                    id="enquiry-company"
                    name="company"
                    placeholder="Your company name"
                    className="h-10 w-full rounded-xl border border-border bg-muted/40 px-3 text-xs text-slate-900 outline-none ring-offset-background placeholder:text-muted-foreground focus:border-[hsl(var(--brand-primary))] focus:ring-2 focus:ring-[hsl(var(--brand-primary))]/60"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="enquiry-email" className="text-xs font-medium text-slate-900">
                    Work Email
                  </label>
                  <input
                    id="enquiry-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="h-10 w-full rounded-xl border border-border bg-muted/40 px-3 text-xs text-slate-900 outline-none ring-offset-background placeholder:text-muted-foreground focus:border-[hsl(var(--brand-primary))] focus:ring-2 focus:ring-[hsl(var(--brand-primary))]/60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="enquiry-phone" className="text-xs font-medium text-slate-900">
                    Phone Number
                  </label>
                  <input
                    id="enquiry-phone"
                    name="phone"
                    placeholder="Include country code"
                    className="h-10 w-full rounded-xl border border-border bg-muted/40 px-3 text-xs text-slate-900 outline-none ring-offset-background placeholder:text-muted-foreground focus:border-[hsl(var(--brand-primary))] focus:ring-2 focus:ring-[hsl(var(--brand-primary))]/60"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="enquiry-message" className="text-xs font-medium text-slate-900">
                  Briefly describe your requirement
                </label>
                <textarea
                  id="enquiry-message"
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
                  Send enquiry
                </Button>
                <p className="max-w-xs text-[11px] text-muted-foreground">
                  By submitting this form, you agree to be contacted by Sunmax Laboratories regarding franchise or
                  manufacturing opportunities.
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false)
  const [enquiryProduct, setEnquiryProduct] = useState<Product | null>(null)
  const { route, activeProduct, openProduct, goHome } = useProductRouting()

  const showToast = (message: string) => {
    setToastMessage(message)
    window.setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current))
    }, 3000)
  }

  const openEnquiryForProduct = (product: Product) => {
    setEnquiryProduct(product)
    setIsEnquiryOpen(true)
  }

  const isHome = route === 'home'
  const isProductPage = route === 'product' && !!activeProduct

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header goHome={goHome} isProductPage={isProductPage} />

      <main
        className={`pb-16 ${isHome ? 'pt-0' : 'pt-12 md:pt-16'} space-y-16 md:space-y-20`}
      >
        {isHome && <Hero />}
        {isProductPage && activeProduct ? (
          <>
            <ProductDetailLayout
              product={activeProduct}
              onEnquiry={() => openEnquiryForProduct(activeProduct)}
            />
          </>
        ) : (
          <>
            <section
              id="about"
              className="mx-auto w-full max-w-7xl px-6 py-16 sm:py-20 md:px-10 lg:grid lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-12"
            >
              <div className="space-y-8">
                <motion.span
                  className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-primary"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  About Sunmax Laboratories
                </motion.span>

                <motion.h2
                  className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  Sunmax Laboratories Advantage
                </motion.h2>

                <motion.p
                  className="max-w-2xl text-base text-muted-foreground sm:text-lg"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  We strictly stick to the safest formulas and remain transparent while producing and supplying them. We
                  never deviate from any policies or standards because pharmacy safeguards the most important thing –
                  health. Our continuous recognition and repeated business are a clear indication of the quality and
                  hygiene we maintain across the supply chain.
                </motion.p>

                <motion.div
                  className="space-y-3 rounded-3xl border border-border bg-muted/40 p-6"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">What We Do</p>
                  <p className="text-base leading-relaxed text-foreground sm:text-lg">
                    We continue research to produce the best possible medicines without compromising on quality. With
                    support from our research and development team, we follow health surveys, understand people and the
                    market, and provide the best inputs for the best outputs in a suitable environment for both the
                    plant and the people.
                  </p>
                </motion.div>

                <motion.div
                  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {aboutHighlights.map(({ icon: Icon, title, description }) => (
                    <div key={title} className="flex flex-col gap-2 rounded-2xl border border-border bg-background/80 p-4">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-primary" />
                        <p className="text-sm font-semibold tracking-tight text-foreground">{title}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div
                className="relative mt-10 flex h-full min-h-[320px] items-center justify-center overflow-hidden rounded-3xl border border-border shadow-2xl lg:mt-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <motion.img
                  src={aboutImage}
                  alt="Quality-first manufacturing environment at Sunmax Laboratories"
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-6 text-sm text-white/80">
                  Continuous recognition across the supply chain reflects the hygiene and transparency we uphold at our
                  Hyderabad facility.
                </div>
              </motion.div>
            </section>

            <ProductsSection onProductClick={openProduct} />

            <section
              id="divisions"
              className="bg-gradient-to-br from-[hsl(var(--brand-deep))] via-[hsl(var(--brand-primary))]/90 to-[hsl(var(--brand-secondary))]/80 py-16 sm:py-20"
            >
              <div className="container space-y-10 text-slate-100">
                <motion.div
                  className="flex flex-col gap-4 text-center"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                >
                  <span className="text-xs uppercase tracking-[0.28em] text-sky-300">Specialty Divisions</span>
                  <h2 className="text-3xl font-semibold sm:text-4xl">Traditional expertise, future-ready science</h2>
                  <p className="mx-auto max-w-3xl text-sm text-slate-300">
                    We collaborate across antibiotic, pediatric, and specialty therapy lines to deliver responsive,
                    franchise-ready portfolios backed by decades of disciplined manufacturing practice.
                  </p>
                </motion.div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {specialties.map(({ icon: Icon, title, description }) => (
                    <motion.article
                      key={title}
                      className="group flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg.white/5 p-6 text-left shadow-lg backdrop-blur transition hover:-translate-y-2 hover:border-white/30 hover:bg.white/10"
                      initial={{ opacity: 0, y: 32 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="inline-flex items-center justify-center rounded-full bg.white/10 p-3 text-sky-200 transition group-hover:bg.white/20 group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{title}</h3>
                      <p className="text-sm text-slate-200/80 leading-relaxed">{description}</p>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>

            <Contact onSuccess={showToast} />
          </>
        )}
      </main>

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        product={enquiryProduct}
        onSuccess={showToast}
      />

      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 rounded-xl bg-slate-900 px-4 py-3 text-xs text-slate-50 shadow-lg">
          {toastMessage}
        </div>
      )}

      <Footer goHome={goHome} isProductPage={isProductPage} />
    </div>
  )
}
