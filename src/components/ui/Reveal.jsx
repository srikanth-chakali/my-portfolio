import { motion } from 'framer-motion'

/**
 * Consistent scroll-triggered reveal used across every section so
 * motion feels orchestrated rather than scattered per-component.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className = '',
  once = true,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
