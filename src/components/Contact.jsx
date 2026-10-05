import { Mail, Github, Linkedin, Code2, ArrowUpRight } from 'lucide-react'
import Reveal from './ui/Reveal'
import MagneticButton from './ui/MagneticButton'
import { profile } from '../data/resumeData'

const links = [
  { label: 'Email', value: profile.email, href: profile.links.email, icon: Mail },
  { label: 'GitHub', value: 'View profile', href: profile.links.github, icon: Github },
  { label: 'LinkedIn', value: 'View profile', href: profile.links.linkedin, icon: Linkedin },
  //{ label: 'LeetCode', value: 'View profile', href: profile.links.leetcode, icon: Code2 },
]

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-36 px-6 sm:px-10 lg:px-16 xl:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <span className="font-mono text-xs text-cyan tracking-widest uppercase">
            Contact
          </span>
          <h2 className="font-display text-3xl md:text-6xl font-semibold mt-3 tracking-tight text-text">
            Let's build something{' '}
            <span className="text-gradient">worth connecting</span>.
          </h2>
          <p className="mt-5 text-text-muted text-lg max-w-xl mx-auto">
            Open to internships and entry-level software roles. The fastest way to reach
            me is email.
          </p>

          <div className="mt-9">
            <MagneticButton
              href={profile.links.email}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-grad-primary text-white font-medium shadow-lg shadow-violet/25 hover:shadow-violet/40 transition-shadow"
            >
              <Mail size={18} /> {profile.email}
            </MagneticButton>
          </div>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-3 gap-4 text-left">
          {links.slice(1).map((link, i) => (
            <Reveal key={link.label} delay={0.1 + i * 0.08}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group glass rounded-2xl p-5 flex items-center justify-between hover:border-violet/40 border border-transparent transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-ink-surface border border-ink-border flex items-center justify-center">
                    <link.icon size={17} className="text-violet-soft" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text">{link.label}</p>
                    <p className="text-xs text-text-dim">{link.value}</p>
                  </div>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-text-dim group-hover:text-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
