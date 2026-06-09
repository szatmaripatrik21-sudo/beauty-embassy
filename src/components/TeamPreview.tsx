import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { team, img } from '@/data/salonData'

const ease = [0.22, 1, 0.36, 1] as const

export default function TeamPreview() {
  return (
    <section className="section-pad bg-ink px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">A Nagykövetek</p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] font-light leading-[1.02] text-ivory">
              Művészek, akik szánnak rád időt
            </h2>
          </div>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-luxe-sm text-champagne transition-colors hover:text-champagne-light"
          >
            Ismerd meg a csapatot
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <motion.figure
              key={member.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease, delay: i * 0.1 }}
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
              <figcaption className="mt-5">
                <p className="font-display text-2xl font-light text-ivory">{member.name}</p>
                <p className="mt-1 font-body text-xs uppercase tracking-luxe-sm text-champagne">
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
