import { Github, ExternalLink } from 'lucide-react'
import Reveal from './ui/Reveal'
import TiltCard from './ui/TiltCard'
import { projects } from '../data/resumeData'

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-36 px-6 sm:px-10 lg:px-16 xl:px-20">
      <div className="absolute inset-0 -z-10 bg-grad-radial-violet opacity-40" />
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <span className="font-mono text-xs text-cyan tracking-widest uppercase">
            Projects
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mt-3 tracking-tight text-text max-w-2xl">
            Selected work.
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-7">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.12}>
              <TiltCard maxTilt={7} className="h-full">
                <div className="glass rounded-2xl p-7 h-full flex flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-xl font-semibold text-text leading-snug">
                      {project.title}
                    </h3>
                    <span className="font-mono text-xs text-text-dim whitespace-nowrap mt-1">
                      {project.date}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-ink-surface border border-ink-border text-xs font-mono text-cyan"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="text-text-muted text-sm leading-relaxed mt-5">
                    {project.description}
                  </p>

                  <ul className="mt-4 space-y-2.5">
                    {project.points.map((point) => (
                      <li
                        key={point}
                        className="text-sm text-text-muted leading-relaxed flex gap-2.5"
                      >
                        <span className="text-violet-soft mt-1.5 flex-shrink-0">▪</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-5 border-t border-ink-border flex items-center gap-5">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors"
                    >
                      <Github size={16} /> Code
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-sm text-text-muted hover:text-cyan transition-colors"
                    >
                      <ExternalLink size={15} /> Live Demo
                    </a>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
