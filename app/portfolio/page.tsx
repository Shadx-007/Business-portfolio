"use client"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const projects = [
  { title: "Aether Platform", tag: "SaaS", image: "/futuristic-ui.jpg" },
  { title: "Zenith Crypto", tag: "Web3", image: "/crypto-dashboard.png" },
  { title: "Lumina AI", tag: "Machine Learning", image: "/futuristic-ai-interface.png" },
]

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl md:text-6xl font-bold mb-16">Recent Work</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <motion.div key={i} whileHover={{ scale: 1.02 }} className="group rounded-[2rem] overflow-hidden glass">
            <div className="aspect-video bg-muted relative overflow-hidden">
              <img
                src={p.image || "/placeholder.svg"}
                alt={p.title}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <Badge variant="outline" className="mb-4 border-primary/20 text-primary">
                {p.tag}
              </Badge>
              <h3 className="text-xl font-bold">{p.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
