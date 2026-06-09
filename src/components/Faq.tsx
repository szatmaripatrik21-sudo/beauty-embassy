import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faq } from '@/data/salonData'

const ease = [0.22, 1, 0.36, 1] as const

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <ul className="mx-auto max-w-3xl">
      {faq.map((item, i) => {
        const isOpen = open === i
        return (
          <li key={item.q} className="border-b border-ivory/12 first:border-t">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="font-display text-xl font-light text-ivory sm:text-2xl">
                {item.q}
              </span>
              <Plus
                className={`h-5 w-5 shrink-0 text-champagne transition-transform duration-300 ${
                  isOpen ? 'rotate-45' : ''
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="overflow-hidden"
                >
                  <p
                    className="max-w-xl pb-6 font-body text-sm leading-relaxed text-ivory-dim"
                    dangerouslySetInnerHTML={{
                      __html: item.a.replace(
                        /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
                        '<a href="mailto:$1" class="text-champagne hover:underline">$1</a>'
                      ),
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}
