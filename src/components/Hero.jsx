import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Download, Code2 } from 'lucide-react'
import NodeNetwork from './three/NodeNetwork'
import MagneticButton from './ui/MagneticButton'
import { profile } from '../data/resumeData'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-grid"
    >
      {/* signature 3D node network */}
      <NodeNetwork className="absolute inset-0 -z-10 opacity-70" />
      <div className="absolute inset-0 -z-10 bg-grad-radial-violet" />
      <div className="absolute inset-0 -z-10 bg-grad-radial-cyan" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-transparent to-ink" />

      <div className="max-w-6xl mx-auto px-6 md:px-8 pt-28 pb-20 w-full grid md:grid-cols-[1.15fr,0.85fr] gap-12 items-center">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono text-cyan mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse-glow" />
            Open to internships &amp; new-grad roles
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display font-semibold text-[clamp(2.6rem,7vw,4.6rem)] leading-[1.02] tracking-tight text-text"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 font-display text-xl md:text-2xl text-gradient font-medium"
          >
            {profile.headline}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-text-muted text-base md:text-lg leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-grad-primary text-white font-medium text-sm shadow-lg shadow-violet/20 hover:shadow-violet/40 transition-shadow"
            >
              <Code2 size={17} /> View Projects
            </MagneticButton>
            <MagneticButton
              href={profile.resumeFile}
              download
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full glass text-text font-medium text-sm border border-ink-border hover:border-violet/50 transition-colors"
            >
              <Download size={17} /> Download Resume
            </MagneticButton>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-5">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-text-muted hover:text-cyan transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-text-muted hover:text-cyan transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <span className="w-px h-4 bg-ink-border" />
            <span className="font-mono text-xs text-text-dim">{profile.location}</span>
          </motion.div>
        </motion.div>

        {/* 3D-tilted profile card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -8 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto md:mx-0 w-full max-w-[340px]"
          style={{ perspective: 1000 }}
        >
          <div className="absolute -inset-4 bg-grad-primary rounded-[2rem] opacity-20 blur-2xl animate-pulse-glow" />
          <motion.div
            whileHover={{ rotateY: 6, rotateX: -4 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="relative glass rounded-[1.75rem] p-3 shadow-2xl shadow-black/40"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="rounded-[1.4rem] overflow-hidden aspect-[4/5] relative">
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            </div>
            {/* <div className="absolute bottom-6 left-6 right-6 glass rounded-xl px-4 py-3 font-mono text-xs text-cyan">
              CSE '27 · Kurnool, AP
            </div> */}
          </motion.div>
          <motion.div
            className="absolute -top-6 -right-6 w-16 h-16 rounded-2xl glass border border-violet/30 animate-float"
            aria-hidden="true"
          />
          <motion.div
            className="absolute -bottom-8 -left-6 w-12 h-12 rounded-full glass border border-cyan/30 animate-float-slow"
            aria-hidden="true"
          />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-text-dim text-xs font-mono"
        aria-label="Scroll to About"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <ArrowDown size={14} />
        </motion.span>
      </motion.a>
    </section>
  )
}
