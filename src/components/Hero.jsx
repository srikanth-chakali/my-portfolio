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

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 pt-32 sm:pt-36 pb-20 sm:pb-24 w-full grid lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-14 items-center justify-between">
        {/* Left column - Bold, spacious, anchored to the left */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-8 xl:col-span-8 flex flex-col items-start justify-center text-left"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass text-xs sm:text-sm font-mono text-cyan mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse-glow" />
            Open to internships &amp; new-grad roles
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display font-bold text-[clamp(2.75rem,5.8vw,5.2rem)] leading-[1.03] tracking-tight text-text"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 sm:mt-5 font-display text-xl sm:text-2xl md:text-3xl text-gradient font-semibold tracking-tight"
          >
            {profile.headline}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-text-muted text-base sm:text-lg md:text-xl leading-relaxed"
          >
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-9 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto">
            <MagneticButton
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-grad-primary text-white font-medium text-sm sm:text-base shadow-xl shadow-violet/25 hover:shadow-violet/40 transition-all hover:scale-[1.02]"
            >
              <Code2 size={18} /> View Projects
            </MagneticButton>
            <MagneticButton
              href={profile.resumeFile}
              download
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full glass text-text font-medium text-sm sm:text-base border border-ink-border hover:border-violet/50 hover:bg-ink-surface/80 transition-all hover:scale-[1.02]"
            >
              <Download size={18} /> Download Resume
            </MagneticButton>
          </motion.div>

          <motion.div variants={item} className="mt-8 sm:mt-10 flex items-center gap-6">
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-text-muted hover:text-cyan transition-all hover:scale-110"
            >
              <Github size={22} />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-text-muted hover:text-cyan transition-all hover:scale-110"
            >
              <Linkedin size={22} />
            </a>
            <span className="w-px h-5 bg-ink-border" />
            <span className="font-mono text-xs sm:text-sm text-text-dim">{profile.location}</span>
          </motion.div>
        </motion.div>

        {/* Right column - Sleek portrait card, anchored to the right on desktop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -8 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-4 xl:col-span-4 flex justify-center lg:justify-end w-full"
          style={{ perspective: 1000 }}
        >
          <div className="relative w-full max-w-[260px] sm:max-w-[290px] lg:max-w-[310px] xl:max-w-[330px]">
            <div className="absolute -inset-4 bg-grad-primary rounded-[2.2rem] opacity-25 blur-2xl animate-pulse-glow" />
            <motion.div
              whileHover={{ rotateY: 5, rotateX: -3 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              className="relative glass rounded-[1.75rem] p-3 sm:p-3.5 shadow-2xl shadow-black/50 border border-white/10"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="rounded-[1.35rem] overflow-hidden aspect-[4/5] relative">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Decorative ambient float badges */}
            <motion.div
              className="absolute -top-4 -right-4 sm:-top-5 sm:-right-5 w-11 h-11 sm:w-12 sm:h-12 rounded-xl glass border border-violet/40 animate-float shadow-lg shadow-violet/20"
              aria-hidden="true"
            />
            <motion.div
              className="absolute -bottom-5 -left-4 sm:-bottom-5 sm:-left-5 w-9 h-9 sm:w-10 sm:h-10 rounded-full glass border border-cyan/40 animate-float-slow shadow-lg shadow-cyan/20"
              aria-hidden="true"
            />
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-text-dim text-xs font-mono"
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
