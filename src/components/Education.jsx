import { GraduationCap, Award, Trophy } from 'lucide-react'
import Reveal from './ui/Reveal'
import { education, certifications, achievements } from '../data/resumeData'

export default function Education() {
  return (
    <section id="education" className="relative py-28 md:py-36 px-6 sm:px-10 lg:px-16 xl:px-20">
      <div className="absolute inset-0 -z-10 bg-grad-radial-cyan opacity-40" />
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <span className="font-mono text-xs text-cyan tracking-widest uppercase">
            Education &amp; Certifications
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mt-3 tracking-tight text-text max-w-2xl">
            Foundations &amp; continuous learning.
          </h2>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-[1fr,1fr] gap-8">
          {/* Education */}
          <Reveal delay={0.05}>
            <div className="space-y-5">
              <h3 className="font-mono text-xs text-violet-soft uppercase tracking-widest flex items-center gap-2">
                <GraduationCap size={15} /> Education
              </h3>
              {education.map((ed) => (
                <div key={ed.school} className="glass rounded-2xl p-6">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-display font-semibold text-text">{ed.school}</p>
                    <span className="font-mono text-xs text-cyan whitespace-nowrap">
                      {ed.date}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted mt-2">{ed.degree}</p>
                  <p className="text-xs text-text-dim mt-1">{ed.location}</p>
                </div>
              ))}

              <h3 className="font-mono text-xs text-violet-soft uppercase tracking-widest flex items-center gap-2 pt-4">
                <Trophy size={15} /> Achievements
              </h3>
              <div className="glass rounded-2xl p-6 space-y-3">
                {achievements.map((a) => (
                  <p key={a} className="text-sm text-text-muted leading-relaxed flex gap-2.5">
                    <span className="text-cyan mt-1.5 flex-shrink-0">▪</span>
                    {a}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Certifications */}
          <Reveal delay={0.15}>
            <h3 className="font-mono text-xs text-violet-soft uppercase tracking-widest flex items-center gap-2 mb-5">
              <Award size={15} /> Certifications
            </h3>
            <div className="space-y-3">
              {certifications.map((cert, i) => (
                <Reveal key={cert.name} delay={0.15 + i * 0.06} y={12}>
                  <div className="glass rounded-xl p-4 flex items-center gap-4 hover:border-cyan/40 border border-transparent transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-ink-surface border border-ink-border flex items-center justify-center flex-shrink-0">
                      <Award size={15} className="text-cyan" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-text truncate">{cert.name}</p>
                      <p className="text-xs text-text-dim mt-0.5">
                        {cert.issuer} · {cert.date}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
