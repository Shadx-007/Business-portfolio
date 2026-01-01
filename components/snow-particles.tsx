"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function SnowParticles() {
  const [particles, setParticles] = useState<
    { id: number; x: string; delay: number; duration: number; size: number }[]
  >([])

  useEffect(() => {
    // Generate static particles on mount to avoid hydration mismatch
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
      size: 2 + Math.random() * 4,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-[-10px] rounded-full bg-white/40 blur-[1px]"
          initial={{ x: p.x, y: "-10%" }}
          animate={{
            y: "110vh",
            x: [`${Number.parseFloat(p.x)}%`, `${Number.parseFloat(p.x) + (Math.random() * 10 - 5)}%`],
          }}
          transition={{
            duration: p.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: p.delay,
            ease: "linear",
          }}
          style={{
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  )
}
