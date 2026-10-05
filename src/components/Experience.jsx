import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import Reveal from './ui/Reveal'
import { experience } from '../data/resumeData'

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-36 px-6 sm:px-10 lg:px-16 xl:px-20">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <span className="font-mono text-xs text-cyan tracking-widest uppercase">
            Experience
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mt-3 tracking-tight text-text max-w-2xl">
            Where I've worked.
          </h2>
        </Reveal>

        <div className="mt-16 relative">
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-violet via-cyan to-transparent" />

          {experience.map((exp, i) => (
            <Reveal key={exp.company} delay={i * 0.1}>
              <div className="relative pl-14 pb-4">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 18 }}
                  className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-grad-primary flex items-center justify-center shadow-lg shadow-violet/30"
                >
                  <Briefcase size={17} className="text-white" />
                </motion.div>

                <div className="glass rounded-2xl p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-lg font-semibold text-text">
                      {exp.role}
                    </h3>
                    <span className="font-mono text-xs text-cyan">{exp.date}</span>
                  </div>
                  <p className="text-sm text-text-muted mt-1">
                    {exp.company} · {exp.location}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {exp.points.map((point) => (
                      <li
                        key={point}
                        className="text-sm text-text-muted leading-relaxed flex gap-2.5"
                      >
                        <span className="text-violet-soft mt-1.5 flex-shrink-0">▪</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
