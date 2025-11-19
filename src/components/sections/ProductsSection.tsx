import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { products, type Product } from '@/data/products'
import { Button } from '@/components/ui/button'

interface ProductsSectionProps {
  onProductClick: (product: Product) => void
}

function AutoImage({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 2600)

    return () => clearInterval(interval)
  }, [images.length])

  const current = images[index] ?? images[0]

  return (
    <motion.img
      key={current}
      src={current}
      alt={name}
      className="h-36 w-full rounded-2xl border border-border object-contain bg-white/95 p-2 shadow-sm md:h-40 lg:h-44"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    />
  )
}

export function ProductsSection({ onProductClick }: ProductsSectionProps) {
  return (
    <section id="products" className="bg-muted/10 py-16 sm:py-20">
      <div className="container space-y-8">
        <div className="space-y-3 text-center md:text-left">
          <motion.span
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-[11px] uppercase tracking-[0.24em] text-primary shadow-sm"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.3 }}
          >
            Product Portfolio
          </motion.span>
          <motion.h2
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            Evidence-led brands for franchise and third-party partners.
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-xs text-muted-foreground sm:text-sm"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            Explore Sunmax Laboratories&apos; key formulations across neuropathy, analgesics, and hematinics. Select a
            product card to view its full profile or raise an enquiry instantly.
          </motion.p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <motion.article
              key={product.slug}
              className="group flex h-full cursor-pointer flex-col gap-3 rounded-2xl border border-border bg-gradient-to-br from-background via-card to-muted/60 p-3 text-xs shadow-sm transition hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-lg"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, delay: 0.05 * index }}
              onClick={() => onProductClick(product)}
            >
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <AutoImage images={product.images} name={product.name} />
                </AnimatePresence>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-foreground">{product.name}</h3>
                <p className="text-[11px] text-muted-foreground line-clamp-2">{product.tagline}</p>
              </div>

              <div className="mt-auto flex items-center justify-between pt-1 text-[11px] text-muted-foreground">
                <span>Click to view details</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-[11px] text-primary hover:bg-primary/10"
                  onClick={(event) => {
                    event.stopPropagation()
                    onProductClick(product)
                  }}
                >
                  View more
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
