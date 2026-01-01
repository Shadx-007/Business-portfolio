"use client"
import { motion } from "framer-motion"
import { Globe, Layout, Cpu, Database, ShieldCheck, BarChart3 } from "lucide-react"

const services = [
  { title: "Web Dev", icon: Globe, desc: "High-performance Next.js apps." },
  { title: "UI/UX", icon: Layout, desc: "Conversion-optimized design." },
  { title: "AI Models", icon: Cpu, desc: "Custom LLM integrations." },
  { title: "Cloud", icon: Database, desc: "Scalable AWS/Vercel infra." },
  { title: "Security", icon: ShieldCheck, desc: "Enterprise-grade protection." },
  { title: "Analytics", icon: BarChart3, desc: "Data-driven growth tools." },
]

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-16">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="p-8 rounded-[2rem] glass border-white/5 text-left hover:border-primary/50 transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <s.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
