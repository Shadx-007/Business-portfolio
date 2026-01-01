"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<
    { id: number; left: string; delay: number; duration: number; size: number }[]
  >([])

  useEffect(() => {
    const newSnowflakes = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
      size: 2 + Math.random() * 4,
    }))
    setSnowflakes(newSnowflakes)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute top-[-10px] rounded-full bg-white opacity-40 blur-[1px]"
          initial={{ y: -20, x: flake.left }}
          animate={{
            y: "110vh",
            x: [flake.left, `${Number.parseFloat(flake.left) + (Math.random() * 20 - 10)}%`],
          }}
          transition={{
            duration: flake.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: flake.delay,
            ease: "linear",
          }}
          style={{
            width: flake.size,
            height: flake.size,
          }}
        />
      ))}
    </div>
  )
}
