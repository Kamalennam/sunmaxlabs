import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

// import banner1 from '../../assets/banner1.webp'
import banner2 from '../../assets/banner2.webp'
import banner3 from '../../assets/banner3.jpg'
import banner4 from '../../assets/banner4.jpg'

type HeroSlide = {
  id: number
  image: string
  headline: string
  description: string
  highlight: string
  ctaPrimary: string
  ctaSecondary: string
}

const slides: HeroSlide[] = [
  /*
  {
    id: 1,
    image: banner1,
    headline: 'Ensuring people live longer, healthier and more active lives.',
    description:
      'Sunmax Laboratories delivers WHO-GMP compliant manufacturing that blends tradition with next-gen therapeutics across antibiotics, injectables, pediatrics, and specialty care.',
    highlight: 'Established 1998 · Hyderabad, India',
    ctaPrimary: 'Explore Divisions',
    ctaSecondary: 'Request Portfolio',
  },
  */
  {
    id: 2,
    image: banner2,
    headline: 'Research-driven formulations that scale with your franchise ambitions.',
    description:
      'Partner with a laboratory ecosystem that offers process analytical controls, rapid regulatory support, and GMP-certified results.',
    highlight: 'Quality First · WHO-GMP | GLP | ISO',
    ctaPrimary: 'Partner With Us',
    ctaSecondary: 'View Certifications',
  },
  {
    id: 3,
    image: banner3,
    headline: 'Innovation labs aligned to global safety benchmarks.',
    description:
      'From discovery through distribution, Sunmax Laboratories empowers healthcare entrepreneurs with precision manufacturing, traceability, and responsive franchise support.',
    highlight: 'Trusted by 1000+ partners',
    ctaPrimary: 'Start a Project',
    ctaSecondary: 'Talk to Our Team',
  },
  {
    id: 4,
    image: banner4,
    headline: 'Precision pharmaceuticals backed by heritage and innovation.',
    description:
      'Our advanced facilities and strict GMP frameworks ensure consistency, safety, and scalable growth for healthcare brands worldwide.',
    highlight: 'Global Standards · Modern Facilities',
    ctaPrimary: 'Our Capabilities',
    ctaSecondary: 'Request Brochure',
  },
]

const slideDuration = 7000

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setActiveIndex((prev) => (prev + 1) % slides.length), slideDuration)
    return () => clearInterval(timer)
  }, [])

  const activeSlide = slides[activeIndex]

  return (
    <section className="relative h-[calc(100vh-96px)] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img src={activeSlide.image} alt={activeSlide.headline} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full flex-col justify-center gap-10 px-6 sm:px-12 lg:px-20">
        <motion.span
          key={activeSlide.highlight}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex text-xs font-semibold uppercase tracking-[0.28em] text-white/80"
        >
          {activeSlide.highlight}
        </motion.span>

        <motion.h1
          key={activeSlide.headline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
        >
          {activeSlide.headline}
        </motion.h1>

        <motion.p
          key={`${activeSlide.id}-desc`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl text-base text-slate-200 sm:text-lg"
        >
          {activeSlide.description}
        </motion.p>

        <motion.div
          key={`${activeSlide.id}-actions`}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Button className="rounded-full bg-[hsl(var(--brand-secondary))] px-6 py-3 text-base text-slate-950 shadow-lg hover:bg-[hsl(var(--brand-secondary))]/90">
            {activeSlide.ctaPrimary}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-base text-white hover:bg-white/20">
            {activeSlide.ctaSecondary}
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-20 mx-auto flex w-full max-w-lg items-center gap-3 px-10">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-1.5 flex-1 rounded-full transition ${
              index === activeIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

