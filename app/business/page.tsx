"use client"
import { motion } from "framer-motion"
import { Briefcase, Target, TrendingUp, Download, ArrowRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const caseStudies = [
  {
    company: "TechFlow Systems",
    outcome: "+40% Operational Efficiency",
    description: "Cloud infrastructure overhaul and custom ERP implementation.",
    image: "/enterprise-cloud-infrastructure.jpg",
  },
  {
    company: "GreenData Inc.",
    outcome: "2.4M Yearly Savings",
    description: "AI-driven energy optimization platform for data centers.",
    image: "/ai-data-center-optimization.jpg",
  },
]

export default function BusinessPage() {
  return (
    <div className="container mx-auto px-4 py-20 space-y-32">
      {/* Overview Section */}
      <section className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center space-x-2 text-primary font-semibold mb-4">
            <Briefcase className="h-5 w-5" />
            <span className="uppercase tracking-widest text-sm">Business Strategy</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Scale Smarter, Not Harder.</h1>
          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Nexus provides the strategic framework and technical execution needed for rapid growth in the digital
            economy. We don't just build apps; we architect business outcomes.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="glow-primary">
              Download Profile <Download className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent">
              Our Vision
            </Button>
          </div>
        </motion.div>
        <div className="grid grid-cols-2 gap-4">
          <Card className="glass border-white/5">
            <CardHeader className="pb-2">
              <Target className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Core Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Efficiency, Scalability, and Global Impact.</p>
            </CardContent>
          </Card>
          <Card className="glass border-white/5 mt-8">
            <CardHeader className="pb-2">
              <TrendingUp className="h-8 w-8 text-accent mb-2" />
              <CardTitle className="text-lg">Revenue Model</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Predictable SaaS-based growth architecture.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Case Studies */}
      <section>
        <h2 className="text-3xl font-bold mb-12 text-center">Impact & Results</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-accent/5 aspect-video"
            >
              <img
                src={study.image || "/placeholder.svg"}
                alt={study.company}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent p-8 flex flex-col justify-end">
                <span className="text-primary font-bold text-sm mb-2">{study.outcome}</span>
                <h3 className="text-2xl font-bold mb-2">{study.company}</h3>
                <p className="text-muted-foreground text-sm max-w-md">{study.description}</p>
                <Button variant="link" className="text-primary p-0 w-fit mt-4 group">
                  Full Case Study <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary/5 rounded-[3rem] p-12 md:p-24 border border-primary/10">
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="h-12 w-12 text-primary mx-auto mb-8 opacity-50" />
          <h2 className="text-2xl md:text-4xl font-medium italic mb-12 text-balance leading-tight">
            "Nexus completely transformed our technical architecture. Within six months, we saw a 300% increase in user
            engagement and a massive reduction in operational overhead."
          </h2>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 mb-4 border border-primary/30" />
            <h4 className="font-bold">Sarah Chen</h4>
            <p className="text-sm text-muted-foreground">CTO at TechFlow Systems</p>
          </div>
        </div>
      </section>
    </div>
  )
}
