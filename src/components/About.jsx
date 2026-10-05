import { GraduationCap, Database, ShieldCheck, Sparkles } from 'lucide-react'
import Reveal from './ui/Reveal'
import { profile, education } from '../data/resumeData'

const strengths = [
  {
    icon: Database,
    title: 'Database-first thinking',
    body: 'Designs relational schemas with retrieval and filtering performance in mind, not just storage.',
  },
  {
    icon: ShieldCheck,
    title: 'Security-conscious',
    body: 'Builds authentication with bcrypt hashing and JWT, and isolates user data by design.',
  },
  {
    icon: Sparkles,
    title: 'Ships end to end',
    body: 'Comfortable across the stack — from Flask APIs and PostgreSQL to React interfaces.',
  },
]

export default function About() {
  const primaryEd = education[0]

  return (
    <section id="about" className="relative py-28 md:py-36 px-6 sm:px-10 lg:px-16 xl:px-20">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <span className="font-mono text-xs text-cyan tracking-widest uppercase">
            About
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mt-3 tracking-tight text-text max-w-2xl">
            Building systems that connect, not just interfaces that render.
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-[1fr,1fr] gap-12 items-start">
          <Reveal delay={0.1}>
            <p className="text-text-muted text-lg leading-relaxed">
              {profile.tagline} {profile.summary}
            </p>

            <div className="mt-8 glass rounded-2xl p-6 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-grad-primary flex items-center justify-center flex-shrink-0">
                <GraduationCap size={20} className="text-white" />
              </div>
              <div>
                <p className="font-medium text-text">{primaryEd.degree}</p>
                <p className="text-sm text-text-muted mt-1">
                  {primaryEd.school} · {primaryEd.date}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {strengths.map((s, i) => (
              <Reveal key={s.title} delay={0.15 + i * 0.1}>
                <div className="glass rounded-2xl p-5 flex items-start gap-4 hover:border-violet/40 border border-transparent transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-ink-surface flex items-center justify-center flex-shrink-0 border border-ink-border">
                    <s.icon size={18} className="text-violet-soft" />
                  </div>
                  <div>
                    <p className="font-medium text-text">{s.title}</p>
                    <p className="text-sm text-text-muted mt-1 leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
