import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { products, type Product } from '@/data/products'
import { Button } from '@/components/ui/button'

interface ProductsPanelProps {
  isOpen: boolean
  onClose: () => void
  onEnquiry: (product: Product) => void
  onViewProduct: (product: Product) => void
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
      className="h-32 w-full rounded-2xl border border-border object-contain bg-white/80 p-2 shadow-sm"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    />
  )
}

export function ProductsPanel({ isOpen, onClose, onEnquiry, onViewProduct }: ProductsPanelProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-40 flex items-start justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="mt-24 w-full max-w-5xl rounded-3xl border border-border bg-background/95 p-6 shadow-2xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-primary/80">Products</p>
                <h2 className="text-lg font-semibold leading-tight sm:text-xl">Evidence-led formulations for growth</h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Select a product to view full details or raise an enquiry for franchise / third-party manufacturing.
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

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.slug}
                  className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-muted/40 p-3 text-xs shadow-sm"
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

                  <div className="mt-auto flex flex-wrap gap-2 pt-1">
                    <Button
                      type="button"
                      size="sm"
                      className="h-7 rounded-full px-3 text-[11px]"
                      onClick={() => {
                        onClose()
                        onEnquiry(product)
                      }}
                    >
                      Enquiry
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-7 rounded-full px-3 text-[11px]"
                      onClick={() => onViewProduct(product)}
                    >
                      View more
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
