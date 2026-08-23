import { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Signature visual: an interactive 3D knowledge-graph / circuit network.
 * Represents "full-stack" as literal connection — nodes for
 * languages/frameworks/tools linked by edges, drifting and responding
 * to the cursor. Renders behind the hero content.
 *
 * Performance: node/edge count scales down on smaller viewports, the
 * animation loop is paused when the tab is hidden, and everything is
 * skipped in favor of a static gradient when the user prefers reduced
 * motion.
 */
export default function NodeNetwork({ className = '' }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (prefersReduced) return undefined

    const isMobile = window.innerWidth < 768
    const NODE_COUNT = isMobile ? 26 : 55
    const MAX_DIST = isMobile ? 3.6 : 4.2
    const CONNECT_DIST = isMobile ? 1.9 : 2.2

    const width = container.clientWidth
    const height = container.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100)
    camera.position.z = 9

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'low-power',
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5))
    container.appendChild(renderer.domElement)

    // --- Nodes ---
    const nodePositions = []
    for (let i = 0; i < NODE_COUNT; i++) {
      const v = new THREE.Vector3(
        (Math.random() - 0.5) * MAX_DIST * 2,
        (Math.random() - 0.5) * MAX_DIST * 2,
        (Math.random() - 0.5) * MAX_DIST
      )
      nodePositions.push(v)
    }

    const nodeGeometry = new THREE.BufferGeometry()
    const posArray = new Float32Array(NODE_COUNT * 3)
    nodePositions.forEach((v, i) => {
      posArray[i * 3] = v.x
      posArray[i * 3 + 1] = v.y
      posArray[i * 3 + 2] = v.z
    })
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

    const nodeMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.06 : 0.07,
      color: 0x9b82ff,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(nodeGeometry, nodeMaterial)
    scene.add(points)

    // --- Edges (precomputed once — positions are static, only rotation animates) ---
    const edgeVerts = []
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < CONNECT_DIST) {
          edgeVerts.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          )
        }
      }
    }
    const edgeGeometry = new THREE.BufferGeometry()
    edgeGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(edgeVerts), 3)
    )
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.14,
    })
    const lines = new THREE.LineSegments(edgeGeometry, edgeMaterial)
    scene.add(lines)

    const group = new THREE.Group()
    group.add(points)
    group.add(lines)
    scene.add(group)

    // --- Mouse parallax ---
    const mouse = { x: 0, y: 0 }
    const handlePointerMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', handlePointerMove, { passive: true })

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
      group.rotation.y = t * 0.05 + mouse.x * 0.3
      group.rotation.x = t * 0.02 + mouse.y * 0.15
      camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.03
      camera.position.y += (mouse.y * 0.4 - camera.position.y) * 0.03
      camera.lookAt(0, 0, 0)
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
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
      observer.disconnect()
      nodeGeometry.dispose()
      edgeGeometry.dispose()
      nodeMaterial.dispose()
      edgeMaterial.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className={className} aria-hidden="true" />
}
