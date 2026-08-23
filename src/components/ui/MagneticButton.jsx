import { useRef, useCallback, useEffect } from 'react'

/**
 * A button that subtly follows the cursor within its bounds ("magnetic" feel).
 * Disabled on touch devices — magnetism has no meaning without a hover cursor.
 *
 * Perf note: like TiltCard, this writes transform directly to the DOM
 * via a ref and throttles to one write per animation frame, rather
 * than re-rendering through React state on every mousemove.
 */
export default function MagneticButton({
  children,
  as: Tag = 'a',
  className = '',
  strength = 0.35,
  ...props
}) {
  const ref = useRef(null)
  const frame = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  const disabledRef = useRef(false)

  useEffect(() => {
    disabledRef.current = window.matchMedia?.('(hover: none)').matches
  }, [])

  const applyTransform = useCallback(() => {
    frame.current = null
    const el = ref.current
    if (!el) return
    el.style.transform = `translate(${target.current.x}px, ${target.current.y}px)`
  }, [])

  const handleMove = useCallback(
    (e) => {
      if (disabledRef.current) return
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      target.current = {
        x: (e.clientX - (rect.left + rect.width / 2)) * strength,
        y: (e.clientY - (rect.top + rect.height / 2)) * strength,
      }
      if (frame.current == null) {
        frame.current = requestAnimationFrame(applyTransform)
      }
    },
    [strength, applyTransform]
  )

  const reset = useCallback(() => {
    target.current = { x: 0, y: 0 }
    if (frame.current == null) {
      frame.current = requestAnimationFrame(applyTransform)
    }
  }, [applyTransform])

  useEffect(() => () => frame.current && cancelAnimationFrame(frame.current), [])

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={className}
      style={{ transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)', willChange: 'transform' }}
      {...props}
    >
      {children}
    </Tag>
  )
}
