"use client"

import { useEffect, useRef } from "react"

export function BackgroundOrbs() {
  return (
    <>
      <div className="fixed pointer-events-none orbs" aria-hidden>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="bg-grid" aria-hidden />
    </>
  )
}

export function Particles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const colors = ["#ff6b35", "#00d4aa", "#a855f7", "#ff8c5a", "#00f5c4"]
    const fragments: HTMLDivElement[] = []

    for (let i = 0; i < 20; i++) {
      const el = document.createElement("div")
      const size = Math.random() * 5 + 2
      const color = colors[Math.floor(Math.random() * colors.length)]
      const duration = Math.random() * 18 + 12
      const delay = Math.random() * 12
      const left = Math.random() * 100

      el.className = "particle"
      el.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        box-shadow: 0 0 ${size * 3}px ${color};
      `
      container.appendChild(el)
      fragments.push(el)
    }

    return () => {
      fragments.forEach((f) => f.remove())
    }
  }, [])

  return <div ref={containerRef} className="particles-container" aria-hidden />
}
