import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { team, img } from '@/data/salonData'

const ease = [0.22, 1, 0.36, 1] as const

export default function TeamPreview() {
  return (
    <section className="section-pad bg-ink px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col items-start justify-between gap-3 sm:mb-14 sm:flex-row sm:items-end sm:gap-4">
          <div>
            <p className="eyebrow">A Nagykövetek</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[1.04] text-ivory sm:mt-4 sm:leading-[1.02]">
              Művészek, akik szánnak rád időt
            </h2>
          </div>
          <Link
            to="/rolunk"
            className="inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-luxe-sm text-champagne transition-colors hover:text-champagne-light"
          >
            Ismerd meg a csapatot
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-4">
          {team.map((member, i) => (
            <motion.figure
              key={member.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease, delay: (i % 2) * 0.1 }}
              className="group"
            >
              <div className="overflow-hidden rounded-md ring-1 ring-ivory/10">
                <img
                  src={img(member.image)}
                  alt={`${member.name}, ${member.role}`}
                  loading="lazy"
                  className="img-grade aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </div>
              <figcaption className="mt-4 sm:mt-5">
                <p className="font-display text-xl font-light text-ivory sm:text-2xl">{member.name}</p>
                <p className="mt-1 font-body text-[0.65rem] uppercase tracking-luxe-sm text-champagne sm:text-xs">
                  {member.role}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
