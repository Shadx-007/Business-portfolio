"use client"
import { motion } from "framer-motion"
import { ArrowRight, Star, Layers, Cpu, Globe, Users, Trophy, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const stats = [
  { label: "Successful Projects", value: "250+", icon: Trophy },
  { label: "Happy Clients", value: "120+", icon: Users },
  { label: "Years Experience", value: "10+", icon: Star },
  { label: "Global Reach", value: "25+", icon: Globe },
]

const services = [
  {
    title: "Web Development",
    description: "Enterprise-grade web applications built with Next.js and high-performance architectures.",
    icon: Globe,
  },
  {
    title: "UI/UX Design",
    description: "Modern, intuitive interfaces focused on user experience and brand identity.",
    icon: Layers,
  },
  {
    title: "AI & Automation",
    description: "Integrating intelligent agents and automated workflows to streamline operations.",
    icon: Cpu,
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,var(--color-primary)_0%,transparent_100%)] opacity-20" />
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8"
          >
            <Star className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold tracking-wider uppercase text-primary">Nexus v2.0 is live</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground"
          >
            Business • Technology • Innovation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance"
          >
            We build high-performance digital products that scale with your vision. Elevate your brand with Nexus.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/portfolio">
              <Button size="lg" className="h-12 px-8 glow-primary">
                View Portfolio <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent border-white/10">
                Contact Me
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center space-y-2"
              >
                <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Services Preview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Strategic Solutions</h2>
              <p className="text-muted-foreground">
                We combine technical expertise with creative vision to deliver results that matter.
              </p>
            </div>
            <Link href="/services">
              <Button variant="link" className="text-primary p-0 h-auto font-semibold group">
                All Services <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl glass hover:border-primary/50 transition-colors"
              >
                <service.icon className="h-10 w-10 text-primary mb-6" />
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 container mx-auto px-4">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-primary px-6 py-20 md:px-20 md:py-24 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-accent)_0%,transparent_100%)] opacity-30 mix-blend-overlay" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <Rocket className="h-12 w-12 text-primary-foreground mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
              Ready to scale your business?
            </h2>
            <p className="text-primary-foreground/80 mb-10 text-lg">
              Join 100+ businesses that have transformed their digital presence with Nexus.
            </p>
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="h-12 px-10 text-base font-bold">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
