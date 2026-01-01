"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function Sparkles() {
  const [sparkles, setSparkles] = useState<{ id: number; top: string; left: string; delay: number; size: number }[]>([])

  useEffect(() => {
    const newSparkles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      size: 2 + Math.random() * 3,
    }))
    setSparkles(newSparkles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden" aria-hidden="true">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-yellow-400"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: s.delay,
          }}
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            boxShadow: "0 0 10px 2px rgba(250, 204, 21, 0.4)",
          }}
        />
      ))}
    </div>
  )
}
