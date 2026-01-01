"use client"

import { motion } from "framer-motion"
import { SparklesIcon } from "lucide-react"

export function FestiveDivider() {
  return (
    <div className="relative py-12 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-red-500/20" />
      </div>
      <div className="relative flex justify-center items-center gap-4 bg-background px-4">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          transition={{ duration: 1 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-red-500"
        />
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <SparklesIcon className="w-6 h-6 text-gold-500" />
        </motion.div>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          transition={{ duration: 1 }}
          className="h-[1px] bg-gradient-to-l from-transparent via-gold-500 to-red-500"
        />
      </div>
    </div>
  )
}
