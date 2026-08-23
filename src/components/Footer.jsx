import { motion } from 'framer-motion'
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data/resumeData'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-ink-border px-6 md:px-8 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-display font-semibold text-text">
          S<span className="text-gradient">C</span>
        </span>

        <div className="flex items-center gap-4">
          <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-text-muted hover:text-cyan transition-colors">
            <Github size={18} />
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-text-muted hover:text-cyan transition-colors">
            <Linkedin size={18} />
          </a>
          <a href={profile.links.email} aria-label="Email" className="text-text-muted hover:text-cyan transition-colors">
            <Mail size={18} />
          </a>

          <motion.a
            href="#top"
            whileHover={{ y: -3 }}
            aria-label="Back to top"
            className="ml-2 w-9 h-9 rounded-full glass border border-ink-border flex items-center justify-center text-text-muted hover:text-cyan hover:border-cyan/40 transition-colors"
          >
            <ArrowUp size={15} />
          </motion.a>
        </div>
      </div>

      <p className="max-w-6xl mx-auto mt-6 text-xs text-text-dim font-mono">
        © {year} {profile.name}. All rights reserved.
      </p>
    </footer>
  )
}
