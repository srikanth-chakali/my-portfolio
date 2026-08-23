import { useEffect, useRef, useState } from 'react'

/**
 * Dot + trailing ring cursor. Only mounts its listeners on devices
 * with a fine pointer (mouse/trackpad) — touch devices never see it,
 * per the "remove custom cursor on mobile" requirement.
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setEnabled(canHover)
    if (!canHover) return undefined

    let ringX = 0
    let ringY = 0
    let mouseX = 0
    let mouseY = 0
    let raf = null

    const handleMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
      }
      const target = e.target
      setHovering(!!target.closest('a, button, [data-cursor-hover]'))
    }

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    tick()

    return () => {
      window.removeEventListener('pointermove', handleMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={
          hovering
            ? { width: 52, height: 52, borderColor: 'rgba(34,211,238,0.8)' }
            : undefined
        }
      />
    </>
  )
}
