import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Download } from 'lucide-react'
import { nav, profile } from '../data/resumeData'

export default function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div
          className={`mx-auto max-w-6xl px-5 flex items-center justify-between rounded-2xl transition-all duration-300 ${
            scrolled ? 'glass px-5 py-2.5 shadow-lg shadow-black/20' : ''
          }`}
        >
          <a
            href="#top"
            className="font-display font-semibold text-lg tracking-tight text-text dark:text-text"
          >
            S<span className="text-gradient">C</span>
            <span className="sr-only">{profile.name}</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-text-muted">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative hover:text-text transition-colors group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-grad-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full flex items-center justify-center border border-ink-border text-text-muted hover:text-text hover:border-violet/50 transition-colors"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a
              href={profile.resumeFile}
              download
              className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-grad-primary text-white hover:opacity-90 transition-opacity"
            >
              <Download size={15} /> Resume
            </a>
          </div>

          <button
            className="md:hidden text-text"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/98 backdrop-blur-xl flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display font-semibold text-lg">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X size={26} className="text-text" />
              </button>
            </div>
            <nav className="flex flex-col gap-2 px-6 mt-4">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="text-3xl font-display font-medium py-3 border-b border-ink-border text-text"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-auto px-6 pb-10 flex items-center justify-between">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 text-text-muted"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </button>
              <a
                href={profile.resumeFile}
                download
                className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-grad-primary text-white"
              >
                <Download size={15} /> Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
