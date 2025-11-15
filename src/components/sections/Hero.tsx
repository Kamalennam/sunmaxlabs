// import { useEffect, useState } from 'react'
// import { AnimatePresence, motion } from 'framer-motion'
// import { ArrowRight, Microscope, Shield, Sparkles } from 'lucide-react'

// import { Button } from '@/components/ui/button'

// type HeroSlide = {
//   id: number
//   image: string
//   headline: string
//   description: string
//   highlight: string
//   ctaPrimary: string
//   ctaSecondary: string
// }

// const slides: HeroSlide[] = [
//   {
//     id: 1,
//     image:
//       'https://images.unsplash.com/photo-1581093588401-22afc5c4a9c3?auto=format&fit=crop&w=1800&q=80',
//     headline: 'Ensuring people live longer, healthier and more active lives.',
//     description:
//       'Sunmax Laboratories delivers WHO-GMP compliant manufacturing that blends tradition with next-gen therapeutics across antibiotics, injectables, pediatrics, and specialty care.',
//     highlight: 'Established 1998 · Hyderabad, India',
//     ctaPrimary: 'Explore Divisions',
//     ctaSecondary: 'Request Portfolio',
//   },
//   {
//     id: 2,
//     image:
//       'https://images.unsplash.com/photo-1579156429584-4c039c85f31f?auto=format&fit=crop&w=1800&q=80',
//     headline: 'Research-driven formulations that scale with your franchise ambitions.',
//     description:
//       'Partner with a laboratory ecosystem that mirrors the integrated excellence of Plena Remedies—process analytical controls, rapid regulatory support, and GMP-certified results.',
//     highlight: 'Quality First · WHO-GMP | GLP | ISO',
//     ctaPrimary: 'Partner With Us',
//     ctaSecondary: 'View Certifications',
//   },
//   {
//     id: 3,
//     image:
//       'https://images.unsplash.com/photo-1568640347023-5b77a5d7f1c1?auto=format&fit=crop&w=1800&q=80',
//     headline: 'Innovation labs aligned to global safety benchmarks.',
//     description:
//       'From discovery through distribution, Sunmax Laboratories empowers healthcare entrepreneurs with precision manufacturing, traceability, and responsive franchise support.',
//     highlight: 'Trusted by 1000+ partners',
//     ctaPrimary: 'Start a Project',
//     ctaSecondary: 'Talk to Our Team',
//   },
// ]

// const slideDuration = 7000

// export function Hero() {
//   const [activeIndex, setActiveIndex] = useState(0)

//   useEffect(() => {
//     const timer = setInterval(
//       () => setActiveIndex((prev) => (prev + 1) % slides.length),
//       slideDuration
//     )
//     return () => clearInterval(timer)
//   }, [])

//   const activeSlide = slides[activeIndex]

//   return (
//     <section className="relative w-full overflow-hidden bg-slate-950 text-white">
//       <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
//       <div className="relative mx-auto flex w-full flex-col gap-6 px-4 pb-16 pt-10 sm:px-8 lg:px-12 lg:pb-20 lg:pt-14">
//         <div className="relative isolate overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeSlide.id}
//               initial={{ opacity: 0, scale: 1.05 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 1.03 }}
//               transition={{ duration: 0.8, ease: 'easeInOut' }}
//               className="absolute inset-0"
//             >
//               <img
//                 src={activeSlide.image}
//                 alt={activeSlide.headline}
//                 className="h-full w-full object-cover"
//                 loading="lazy"
//               />
//               <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/70 to-slate-950/40" />
//             </motion.div>
//           </AnimatePresence>

//           <div className="relative z-10 grid gap-12 px-6 py-12 sm:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:px-16 lg:py-16">
//             <div className="space-y-8">
//               <motion.span
//                 key={activeSlide.highlight}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.28em] text-slate-100"
//               >
//                 <Sparkles className="h-4 w-4 text-[hsl(var(--brand-accent))]" />
//                 {activeSlide.highlight}
//               </motion.span>

//               <motion.h1
//                 key={activeSlide.headline}
//                 initial={{ opacity: 0, y: 18 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.05 }}
//                 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
//               >
//                 {activeSlide.headline}
//               </motion.h1>

//               <motion.p
//                 key={activeSlide.id + '-desc'}
//                 initial={{ opacity: 0, y: 24 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.1 }}
//                 className="max-w-3xl text-base text-slate-200 sm:text-lg"
//               >
//                 {activeSlide.description}
//               </motion.p>

//               <motion.div
//                 key={activeSlide.id + '-actions'}
//                 initial={{ opacity: 0, y: 28 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: 0.15 }}
//                 className="flex flex-wrap items-center gap-4"
//               >
//                 <Button className="rounded-full bg-[hsl(var(--brand-secondary))] px-6 py-2 text-base text-slate-950 shadow-lg shadow-[hsla(var(--brand-secondary)/0.25)] hover:bg-[hsl(var(--brand-secondary))]/90">
//                   {activeSlide.ctaPrimary}
//                   <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//                 <Button className="rounded-full border border-white/20 bg-white/10 px-6 py-2 text-base text-white hover:bg-white/20">
//                   {activeSlide.ctaSecondary}
//                 </Button>
//               </motion.div>
//             </div>

//             <motion.div
//               key={activeSlide.id + '-insight'}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1"
//             >
//               <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
//                 <h3 className="flex items-center gap-3 text-base font-semibold text-white">
//                   <Microscope className="h-5 w-5 text-[hsl(var(--brand-accent))]" />
//                   Research-first focus
//                 </h3>
//                 <p className="mt-3 text-sm text-slate-200">
//                   Integrated discovery labs with digital traceability from molecule to market.
//                 </p>
//               </div>
//               <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
//                 <h3 className="flex items-center gap-3 text-base font-semibold text-white">
//                   <Shield className="h-5 w-5 text-[hsl(var(--brand-primary))]" />
//                   Regulatory confidence
//                 </h3>
//                 <p className="mt-3 text-sm text-slate-200">
//                   WHO-GMP, GLP, and ISO-aligned quality frameworks that mirror leading franchise labs.
//                 </p>
//               </div>
//             </motion.div>
//           </div>

//           <div className="relative z-10 flex items-center gap-3 bg-black/20 px-6 py-4 sm:px-10">
//             {slides.map((slide, index) => (
//               <button
//                 key={slide.id}
//                 type="button"
//                 onClick={() => setActiveIndex(index)}
//                 className={`h-1.5 flex-1 rounded-full transition ${
//                   index === activeIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/60'
//                 }`}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }


import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

// import banner1 from '@/assets/banner1.webp'
// import banner2 from '@/assets/banner2.webp'
// import banner3 from '@/assets/banner3.jpg'
// import banner4 from '@/assets/banner4.jpg'

import banner1 from '../../assets/banner1.webp'
import banner2 from '../../assets/banner2.webp'
import banner3 from '../../assets/banner3.jpg'
import banner4 from '../../assets/banner4.jpg'


type HeroSlide = {
  id: number
  image: any
  headline: string
  description: string
  highlight: string
  ctaPrimary: string
  ctaSecondary: string
}

const slides: HeroSlide[] = [
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
  {
    id: 2,
    image: banner2,
    headline: 'Research-driven formulations that scale with your franchise ambitions.',
    description:
      'Partner with a laboratory ecosystem that mirrors integrated excellence—process analytical controls, rapid regulatory support, and GMP-certified results.',
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
    const timer = setInterval(
      () => setActiveIndex((prev) => (prev + 1) % slides.length),
      slideDuration
    )
    return () => clearInterval(timer)
  }, [])

  const activeSlide = slides[activeIndex]
  console.log(activeSlide.image);

  return (
    <section
      className="
        relative w-full overflow-hidden text-white 
        bg-gradient-to-br 
        from-[hsl(var(--brand-deep))] 
        via-[hsl(var(--brand-primary))]/90 
        to-[hsl(var(--brand-secondary))]/80
        h-[calc(100vh-96px)]
      "
    >
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
            <img
              src={activeSlide.image}
              alt={activeSlide.headline}
              className="h-full w-full object-cover"
            />

            {/* Darkened overlay based on brand gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/40 to-slate-950/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full flex-col justify-center gap-10 px-6 sm:px-12 lg:px-20">
        <motion.span
          key={activeSlide.highlight}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.28em] text-slate-100"
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
          key={activeSlide.id + '-desc'}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl text-base text-slate-200 sm:text-lg"
        >
          {activeSlide.description}
        </motion.p>

        <motion.div
          key={activeSlide.id + '-actions'}
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
            className={`h-1.5 flex-1 rounded-full transition 
              ${index === activeIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/70'}
            `}
          />
        ))}
      </div>
    </section>
  )
}
