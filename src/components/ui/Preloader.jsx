import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Preloader({ onComplete }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const timer = setTimeout(() => {
      document.body.style.overflow = previousOverflow
      onComplete?.()
    }, 4300)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = previousOverflow
    }
  }, [onComplete])

  const path = `
    M 25 60
    L 345 60
    C 370 60 389 48 400 16
    C 411 48 430 60 455 60
    C 430 60 411 72 400 104
    C 389 72 370 60 345 60
    L 775 60
  `

  const drawTransition = {
    duration: 3.4,
    ease: [0.16, 0.72, 0.18, 1],
  }

  const popEase = [0.22, 1, 0.36, 1]

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.5,
          ease: 'easeOut',
        },
      }}
      className="
        fixed inset-0 z-[999999]
        flex items-center justify-center
        overflow-hidden
        bg-[#080B13]
        px-5
        select-none
      "
      style={{
        contain: 'strict',
        transform: 'translate3d(0,0,0)',
        backfaceVisibility: 'hidden',
      }}
      role="status"
      aria-label="Loading"
    >
      {/* Ambient background */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2 top-1/2
          h-[300px] w-[300px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-violet/10
          blur-[100px]
        "
        style={{ willChange: 'transform' }}
      />

      <div className="relative z-10 w-full max-w-[820px]">
        <svg
          viewBox="0 0 800 120"
          className="block h-auto w-full overflow-visible pointer-events-none"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          shapeRendering="geometricPrecision"
        >
          <defs>
            <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#715CFF" />
              <stop offset="32%" stopColor="#8E7AFF" />
              <stop offset="55%" stopColor="#A99CFF" />
              <stop offset="78%" stopColor="#4CC9F0" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>

            <linearGradient id="movingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="46%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="54%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="20%" stopColor="#CFFBFF" stopOpacity="0.9" />
              <stop offset="45%" stopColor="#22D3EE" stopOpacity="0.5" />
              <stop offset="75%" stopColor="#7C5CFF" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0" />
            </radialGradient>

            {/* OPTIMIZATION: Drastically reduced filter areas to prevent GPU lag */}
            <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" />
            </filter>

            <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. VERY FAINT TRACK */}
          <path
            d={path}
            fill="none"
            stroke="#171E30"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.55"
          />

          {/* 2. SOFT GLOW UNDER THE DRAWING */}
          <motion.path
            d={path}
            fill="none"
            stroke="#7C5CFF"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#lineGlow)"
            style={{ willChange: 'stroke-dasharray, stroke-dashoffset, opacity' }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: [0, 0.18, 0.14, 0.08] 
            }}
            transition={{
              ...drawTransition,
              times: [0, 0.15, 0.55, 1]
            }}
          />

          {/* 3. MAIN DRAWING */}
          <motion.path
            d={path}
            fill="none"
            stroke="url(#mainGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ willChange: 'stroke-dasharray, stroke-dashoffset' }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={drawTransition}
          />

          {/* 4. WHITE INNER CORE */}
          <motion.path
            d={path}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ willChange: 'stroke-dasharray, stroke-dashoffset' }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={drawTransition}
          />

          {/* 5. TRAVELING LIGHT */}
          <motion.path
            d={path}
            fill="none"
            stroke="url(#movingGradient)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#lineGlow)"
            strokeDasharray="0.025 0.975"
            pathLength={1}
            style={{ willChange: 'stroke-dashoffset, opacity' }}
            initial={{ strokeDashoffset: 1, opacity: 0 }}
            animate={{ 
              strokeDashoffset: 0, 
              opacity: [0, 0.85, 1, 1, 0.7, 0] 
            }}
            transition={{
              ...drawTransition,
              times: [0, 0.08, 0.2, 0.8, 0.94, 1]
            }}
          />

          {/* 6. CENTER BLOOM */}
          <motion.circle
            cx="400"
            cy="60"
            r="30"
            fill="url(#centerGlow)"
            style={{ 
              transformBox: 'fill-box', 
              transformOrigin: 'center',
              willChange: 'transform, opacity'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.15, 0.96, 1], 
              opacity: [0, 0.8, 0.55, 0.7] 
            }}
            transition={{
              delay: 2.05,
              duration: 1.2,
              ease: popEase,
              times: [0, 0.45, 0.7, 1]
            }}
          />

          {/* 7. CENTER STAR */}
          <motion.path
            d="
              M 400 41
              C 402 53 407 58 419 60
              C 407 62 402 67 400 79
              C 398 67 393 62 381 60
              C 393 58 398 53 400 41
              Z
            "
            fill="#FFFFFF"
            filter="url(#starGlow)"
            style={{ 
              transformBox: 'fill-box', 
              transformOrigin: 'center',
              willChange: 'transform, opacity'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 0.96, 1], 
              opacity: [0, 1, 0.95, 1] 
            }}
            transition={{
              delay: 2.12,
              duration: 0.9,
              ease: popEase,
              times: [0, 0.45, 0.7, 1]
            }}
          />

          {/* Tiny center point */}
          <motion.circle
            cx="400"
            cy="60"
            r="2.5"
            fill="#FFFFFF"
            style={{ 
              transformBox: 'fill-box', 
              transformOrigin: 'center',
              willChange: 'transform, opacity'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.4, 1], 
              opacity: [0, 1, 0.9] 
            }}
            transition={{
              delay: 2.2,
              duration: 0.7,
              ease: popEase,
              times: [0, 0.5, 1]
            }}
          />

          {/* 8. TINY SPARKLES */}
          <motion.g
            style={{ 
              transformBox: 'fill-box', 
              transformOrigin: 'center',
              willChange: 'transform, opacity'
            }}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: [0, 1, 0.6] 
            }}
            transition={{
              delay: 2.2,
              duration: 1.1,
              ease: 'easeOut',
              times: [0, 0.5, 1]
            }}
          >
            <circle cx="374" cy="40" r="1.4" fill="#9B8CFF" />
            <circle cx="426" cy="40" r="1.4" fill="#50DFFF" />
            <circle cx="374" cy="80" r="1.3" fill="#7C5CFF" />
            <circle cx="426" cy="80" r="1.3" fill="#22D3EE" />
          </motion.g>
        </svg>
      </div>
    </motion.div>
  )
}