'use client'

import {useEffect, useRef, useState} from 'react'

/**
 * Subtle entrance for the portfolio section — content rises ~20px as it
 * scrolls into view. Intersection Observer, no library (handoff §4.3).
 */
export default function Reveal({children}: {children: React.ReactNode}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Browsers without IntersectionObserver simply skip the animation.
    if (typeof IntersectionObserver === 'undefined') {
      const frame = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      {threshold: 0.12},
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal${visible ? ' is-visible' : ''}`}>
      {children}
    </div>
  )
}
