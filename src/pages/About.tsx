import { motion } from 'framer-motion'
import Seo from '@/components/site/Seo'
import PageHeader from '@/components/site/PageHeader'
import BrandStory from '@/components/BrandStory'
import FinalCTA from '@/components/FinalCTA'
import ReadMore from '@/components/site/ReadMore'
import { values, stats, team, img } from '@/data/salonData'

const ease = [0.22, 1, 0.36, 1] as const

function Values() {
  return (
    <section className="section-pad bg-ink px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl sm:mb-14">
          <p className="eyebrow">Amiben hiszünk</p>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] font-light leading-[1.02] text-ivory">
            Másféle szépségház
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-md border border-ivory/12 bg-ivory/12 sm:grid-cols-3">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              className="bg-ink p-8 sm:p-10"
            >
              <span className="font-display text-4xl text-champagne">{`0${i + 1}`}</span>
              <h3 className="mt-5 font-display text-2xl font-light text-ivory">{v.title}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-ivory-dim">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="border-y border-ivory/12 bg-surface px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 text-center sm:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease, delay: i * 0.07 }}
          >
            <p className="font-display text-[clamp(2.6rem,6vw,4rem)] font-light leading-none text-champagne">
              {s.value}
            </p>
            <p className="mt-2 font-body text-xs uppercase tracking-luxe-sm text-stone">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function TeamFull() {
  return (
    <section className="section-pad bg-ink px-5 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl sm:mb-14">
          <p className="eyebrow">A Nagykövetek</p>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] font-light leading-[1.02] text-ivory">
            Az emberek minden alkalom mögött
          </h2>
        </div>
        <div className="grid gap-12 md:grid-cols-2">
          {team.map((member, i) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, ease, delay: (i % 2) * 0.1 }}
              className="grid grid-cols-[7.5rem_1fr] gap-5 sm:grid-cols-[10rem_1fr] sm:gap-7"
            >
              <div className="overflow-hidden rounded-md ring-1 ring-ivory/10">
                <img
                  src={img(member.image)}
                  alt={`${member.name}, ${member.role}`}
                  loading="lazy"
                  className="img-grade aspect-[3/4] w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-display text-2xl font-light text-ivory">{member.name}</h3>
                <p className="mt-1 font-body text-xs uppercase tracking-luxe-sm text-champagne">
                  {member.role}
                </p>
                {/* Bio clamps to 3 lines on mobile (ReadMore reveals the rest);
                    always fully shown on ≥sm so desktop is unchanged. */}
                <ReadMore lines={3} className="mt-4 font-body text-sm leading-relaxed text-ivory-dim">
                  {member.bio}
                </ReadMore>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {member.specialties.map((sp) => (
                    <li
                      key={sp}
                      className="rounded-full border border-ivory/15 px-3 py-1 font-body text-[0.65rem] uppercase tracking-luxe-sm text-stone"
                    >
                      {sp}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <>
      <Seo
        title="Rólunk"
        description="A Beauty Embassy története — nyugodt rezidencia Budapesten, ahol a bőrt, a hajat és önmagadat csendes, igényes gondoskodás fogadja."
        path="/rolunk"
      />
      <PageHeader
        eyebrow="A Nagykövetség"
        title="Menedék önmagadnak, a város szívében"
        intro="A 2016-ban alapított Beauty Embassy klinikai szintű gondoskodást hoz egy privát rezidencia hangulatú környezetbe."
        image="lounge"
      />
      <BrandStory showCta={false} />
      <Stats />
      <Values />
      <TeamFull />
      <FinalCTA />
    </>
  )
}
