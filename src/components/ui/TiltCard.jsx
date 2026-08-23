import { useRef, useCallback, useEffect } from 'react'

/**
 * Wraps children in a card that tilts in 3D toward the cursor and
 * casts a soft directional glow. Falls back to a flat card on touch
 * devices and when the user prefers reduced motion.
 *
 * Perf note: transforms are written straight to the DOM via refs and
 * throttled to one update per animation frame, instead of driving
 * this through React state — with several cards on a page, a
 * state-per-mousemove approach re-renders the whole tree on every
 * pixel of mouse movement, which is what caused the lag.
 */
export default function TiltCard({ children, className = '', maxTilt = 10 }) {
  const wrapRef = useRef(null)
  const cardRef = useRef(null)
  const glowRef = useRef(null)
  const frame = useRef(null)
  const target = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, opacity: 0 })
  const disabledRef = useRef(false)

  useEffect(() => {
    disabledRef.current =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia?.('(hover: none)').matches
  }, [])

  const applyStyles = useCallback(() => {
    frame.current = null
    const card = cardRef.current
    const glow = glowRef.current
    if (!card) return
    const { rx, ry, gx, gy, opacity } = target.current
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`
    if (glow) {
      glow.style.opacity = opacity
      glow.style.background = `radial-gradient(320px circle at ${gx}% ${gy}%, rgba(124,92,255,0.18), transparent 60%)`
    }
  }, [])

  const handleMove = useCallback(
    (e) => {
      if (disabledRef.current) return
      const el = wrapRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      target.current = {
        rx: (0.5 - py) * maxTilt * 2,
        ry: (px - 0.5) * maxTilt * 2,
        gx: px * 100,
        gy: py * 100,
        opacity: 1,
      }
      if (frame.current == null) {
        frame.current = requestAnimationFrame(applyStyles)
      }
    },
    [maxTilt, applyStyles]
  )

  const reset = useCallback(() => {
    if (disabledRef.current) return
    target.current = { ...target.current, rx: 0, ry: 0, opacity: 0 }
    if (frame.current == null) {
      frame.current = requestAnimationFrame(applyStyles)
    }
  }, [applyStyles])

  useEffect(() => () => frame.current && cancelAnimationFrame(frame.current), [])

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`relative ${className}`}
    >
      <div
        ref={cardRef}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
          willChange: 'transform',
          height: '100%',
        }}
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
        />
        {children}
      </div>
    </div>
  )
}
