"use client"
import { motion } from "framer-motion"
import { Cpu, Users, Award } from "lucide-react"

const skills = [
  { name: "Frontend Architecture", level: 95 },
  { name: "Backend Scalability", level: 88 },
  { name: "AI Integration", level: 82 },
  { name: "UX Strategy", level: 90 },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20 space-y-32">
      <section className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Pioneering the Digital Frontier.</h1>
          <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
            Founded in 2015, Nexus has been at the forefront of the technological revolution. We believe in building
            tools that empower creators and enterprises to solve the world's most complex challenges.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-6">
            <div className="flex items-center space-x-3">
              <Users className="text-primary h-5 w-5" />
              <span className="text-sm font-semibold">50+ Global Talent</span>
            </div>
            <div className="flex items-center space-x-3">
              <Award className="text-primary h-5 w-5" />
              <span className="text-sm font-semibold">12 Industry Awards</span>
            </div>
          </div>
        </motion.div>
        <div className="relative">
          <div className="aspect-square rounded-[3rem] overflow-hidden glass border-white/10 p-8 flex flex-col justify-between">
            <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Cpu className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Core Competencies</h3>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs font-bold mb-1 uppercase tracking-widest opacity-60">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-primary/20 blur-3xl -z-10 rounded-full" />
        </div>
      </section>
    </div>
  )
}
