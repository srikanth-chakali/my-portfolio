import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * A few slow-drifting wireframe polyhedra used as ambient background
 * texture behind non-hero sections. Cheap to render (low poly count,
 * no shadows) and skipped entirely under reduced-motion or on mobile
 * to keep scroll performance smooth.
 */
export default function FloatingShapes({ className = '' }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return undefined

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const isMobile = window.innerWidth < 768
    if (prefersReduced || isMobile) return undefined

    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
    camera.position.z = 12

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'low-power',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25))
    container.appendChild(renderer.domElement)

    const shapes = []
    const geometries = [
      new THREE.IcosahedronGeometry(1.1, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TorusGeometry(0.8, 0.28, 8, 24),
    ]
    const colors = [0x7c5cff, 0x22d3ee, 0x9b82ff]

    geometries.forEach((geo, i) => {
      const mat = new THREE.MeshBasicMaterial({
        color: colors[i % colors.length],
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(
        (i - 1) * 5.5 + (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 3
      )
      mesh.userData.speed = 0.15 + Math.random() * 0.15
      mesh.userData.driftOffset = Math.random() * Math.PI * 2
      scene.add(mesh)
      shapes.push(mesh)
    })

    let raf = null
    let tabVisible = true
    let inView = true
    const handleVisibility = () => {
      tabVisible = document.visibilityState === 'visible'
    }
    document.addEventListener('visibilitychange', handleVisibility)

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
      },
      { threshold: 0 }
    )
    observer.observe(container)

    const clock = new THREE.Clock()
    const animate = () => {
      raf = requestAnimationFrame(animate)
      if (!tabVisible || !inView) return
      const t = clock.getElapsedTime()
      shapes.forEach((mesh) => {
        mesh.rotation.x = t * mesh.userData.speed
        mesh.rotation.y = t * mesh.userData.speed * 0.8
        mesh.position.y += Math.sin(t * 0.4 + mesh.userData.driftOffset) * 0.0025
      })
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
      observer.disconnect()
      geometries.forEach((g) => g.dispose())
      shapes.forEach((m) => m.material.dispose())
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className={className} aria-hidden="true" />
}
