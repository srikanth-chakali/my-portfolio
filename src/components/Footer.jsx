import { motion } from 'framer-motion'
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data/resumeData'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-ink-border px-6 sm:px-10 lg:px-16 xl:px-20 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
        {/* Left side brand / monogram & copyright */}
        <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-4 sm:gap-6 text-center sm:text-left">
          <a
            href="#top"
            className="font-display font-bold text-2xl tracking-tight text-text hover:opacity-90 transition-opacity"
          >
            S<span className="text-gradient">C</span>
          </a>
          <span className="hidden sm:inline-block w-px h-4 bg-ink-border" />
          <p className="text-xs sm:text-sm text-text-dim font-mono">
            © {year} <span className="text-text-muted font-medium">{profile.name}</span>. All rights reserved.
          </p>
        </div>

        {/* Right side social links & Back to Top */}
        <div className="flex items-center gap-4 sm:gap-5">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="w-10 h-10 rounded-full glass border border-ink-border flex items-center justify-center text-text-muted hover:text-cyan hover:border-cyan/40 transition-all hover:scale-110"
          >
            <Github size={18} />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="w-10 h-10 rounded-full glass border border-ink-border flex items-center justify-center text-text-muted hover:text-cyan hover:border-cyan/40 transition-all hover:scale-110"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={profile.links.email}
            aria-label="Email"
            className="w-10 h-10 rounded-full glass border border-ink-border flex items-center justify-center text-text-muted hover:text-cyan hover:border-cyan/40 transition-all hover:scale-110"
          >
            <Mail size={18} />
          </a>

          <motion.a
            href="#top"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
            className="ml-2 px-4 py-2.5 rounded-full glass border border-ink-border flex items-center gap-2 text-xs font-mono text-text-muted hover:text-cyan hover:border-cyan/40 transition-all"
          >
            <span>Top</span>
            <ArrowUp size={14} />
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
