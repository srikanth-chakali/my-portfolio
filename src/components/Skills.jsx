import { motion } from 'framer-motion'
import Reveal from './ui/Reveal'
import { skillGroups } from '../data/resumeData'

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36 px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <span className="font-mono text-xs text-cyan tracking-widest uppercase">
            Skills
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mt-3 tracking-tight text-text max-w-2xl">
            The stack, grouped the way I reach for it.
          </h2>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 0.08}>
              <div className="glass rounded-2xl p-6 h-full hover:-translate-y-1.5 transition-transform duration-300 border border-transparent hover:border-violet/30">
                <p className="font-mono text-xs text-violet-soft tracking-widest uppercase mb-4">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: gi * 0.08 + i * 0.04, duration: 0.4 }}
                      whileHover={{ scale: 1.06, y: -2 }}
                      className="px-3 py-1.5 rounded-full bg-ink-surface border border-ink-border text-sm text-text font-medium cursor-default hover:border-cyan/50 hover:text-cyan transition-colors"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
