"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useEffect } from "react"
import {
  SparklesIcon,
  Star,
  Check,
  ArrowRight,
  TreePine,
  Gift,
  Zap,
  Globe,
  Layout,
  Cpu,
  TrendingUp,
  HelpCircle,
  PartyPopper,
  Rocket,
  Target,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Snowfall } from "@/components/snowfall"
import { Sparkles } from "@/components/sparkles"
import { FestiveDivider } from "@/components/festive-divider"

const festiveOffers = [
  {
    title: "Christmas Starter",
    description: "The perfect gift for your business this holiday season.",
    price: "$1,999",
    originalPrice: "$4,999",
    discount: "60% HOLIDAY DISCOUNT",
    features: [
      "Premium Next.js Website",
      "Festive UI/UX Design",
      "AI Chatbot Integration",
      "New Year SEO Boost",
      "3 Months Free Support",
    ],
    tag: "HOLIDAY SPECIAL",
    icon: TreePine,
    gradient: "festive-gradient-green-gold",
  },
  {
    title: "New Year Scale",
    description: "Start 2025 with a complete digital transformation.",
    price: "$4,999",
    originalPrice: "$11,999",
    discount: "BEST NEW YEAR DEAL",
    features: [
      "Full-Stack Application",
      "Advanced Dashboard",
      "AI Workflow Automation",
      "Priority Support 24/7",
      "Q1 Strategy Session",
    ],
    tag: "MOST POPULAR",
    popular: true,
    icon: PartyPopper,
    gradient: "festive-gradient-red-gold",
  },
  {
    title: "Enterprise Celebration",
    description: "Ring in success with enterprise-grade technology.",
    price: "Custom",
    originalPrice: "",
    discount: "EXCLUSIVE OFFER",
    features: [
      "Custom Cloud Architecture",
      "Legacy System Migration",
      "Dedicated Tech Lead",
      "Unlimited Revisions",
      "2025 Growth Roadmap",
    ],
    tag: "STRATEGIC",
    icon: Gift,
    gradient: "festive-gradient-green-gold",
  },
]

const services = [
  {
    icon: Globe,
    title: "Web Development",
    desc: "Next-generation web applications to kickstart your 2025 growth.",
  },
  {
    icon: Layout,
    title: "UI/UX Design",
    desc: "Festive, modern interfaces that convert visitors into customers.",
  },
  {
    icon: Cpu,
    title: "AI Integration",
    desc: "Smart automation to give you a competitive edge in the new year.",
  },
  {
    icon: Zap,
    title: "Optimization",
    desc: "Performance tuning and SEO to dominate your market in 2025.",
  },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CEO @ TechFlow",
    content: "Partnering with Nexus during the holiday season was the best decision. They delivered magic!",
    rating: 5,
  },
  {
    name: "Marcus Thorne",
    role: "Director @ Arca",
    content: "Their New Year offer transformed our entire operation. Absolutely worth every penny.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Founder @ Lumina",
    content: "Premium quality with festive timing. They made our business goals for 2025 a reality early.",
    rating: 5,
  },
]

const faqs = [
  {
    question: "When does this festive offer expire?",
    answer:
      "Our Christmas & New Year special offers are valid until January 15, 2025. After that, prices return to standard rates.",
  },
  {
    question: "Can I start the project after the holidays?",
    answer:
      "You can secure the festive pricing now and schedule the project kickoff for any date that works for you in Q1 2025.",
  },
  {
    question: "Are there any hidden fees?",
    answer:
      "No hidden fees whatsoever. The festive price includes everything mentioned in the package. Any additional features would be discussed upfront.",
  },
  {
    question: "Do you provide ongoing support?",
    answer:
      "Yes! All festive packages include extended support periods. The Christmas Starter includes 3 months, and Scale packages include 6 months of priority support.",
  },
  {
    question: "Why are these offers so discounted?",
    answer:
      "We celebrate the holidays by sharing our success with visionary businesses. It's our way of helping you start 2025 on the strongest possible footing.",
  },
]

export default function OffersPage() {
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 12, minutes: 30, seconds: 15 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        if (prev.days > 0) return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background selection:bg-festive-gold/30 overflow-x-hidden">
      <Snowfall />
      <Sparkles />

      {/* 1️⃣ FESTIVE HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden festive-bokeh">
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] rounded-full bg-festive-red/30 blur-[150px]" />
          <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full bg-festive-gold/30 blur-[150px]" />
          <div className="absolute top-1/3 left-1/3 w-[40%] h-[40%] rounded-full bg-festive-green/20 blur-[120px]" />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10 text-center py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 mb-8 px-6 py-2.5 rounded-full border-2 festive-border-animate bg-background/80 backdrop-blur-sm"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <TreePine className="h-5 w-5 text-festive-green" />
              <span className="text-sm font-black tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-festive-red via-festive-gold to-festive-green">
                Christmas & New Year Special
              </span>
              <SparklesIcon className="h-5 w-5 text-festive-gold" />
            </motion.div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter leading-[0.85]">
              <span className="block text-balance">Christmas & New Year</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-festive-red via-festive-gold to-festive-green mt-4">
                Business Offers
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Celebrate the season with exclusive technology packages. Limited-time festive discounts to help your
              business thrive in 2025.
            </p>

            <div className="flex items-center justify-center gap-4 mb-12 flex-wrap">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center w-20 h-20 rounded-2xl glass border border-festive-gold/30 glow-festive-gold"
                >
                  <span className="text-2xl font-black text-festive-gold">{String(item.value).padStart(2, "0")}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="h-16 px-10 rounded-full text-lg font-black bg-festive-red hover:bg-festive-red-light glow-festive-red transition-all hover:scale-105 active:scale-95 border-2 border-festive-red-light"
              >
                Claim Holiday Deal <Gift className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-16 px-10 rounded-full text-lg font-black border-2 border-festive-gold/50 hover:bg-festive-gold/10 glow-festive-gold transition-all bg-transparent text-festive-gold"
              >
                View All Offers <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-festive-gold"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
            <Star className="h-6 w-6 fill-festive-gold" />
          </motion.div>
        </motion.div>
      </section>

      <FestiveDivider />

      {/* 2️⃣ FEATURED FESTIVE OFFERS */}
      <section className="py-32 container mx-auto px-4">
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-festive-green/20 text-festive-green border-festive-green/30 text-sm font-black tracking-wider">
            LIMITED HOLIDAY CAPACITY
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Festive Business Packages</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Premium technology at holiday prices. Only 5 spots available before New Year.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {festiveOffers.map((offer, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.7 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`relative group p-10 rounded-[3rem] border-2 ${offer.popular ? "border-festive-gold glow-festive-gold" : "border-white/10"} glass overflow-hidden transition-all`}
            >
              <div
                className={`absolute inset-0 ${offer.gradient} opacity-30 group-hover:opacity-50 transition-opacity duration-500`}
              />

              {offer.popular && (
                <div className="absolute top-8 -right-12 rotate-45 bg-festive-gold text-background px-16 py-2 text-xs font-black tracking-widest shadow-lg">
                  BEST DEAL
                </div>
              )}

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <Badge
                    className={`${offer.popular ? "bg-festive-gold text-background border-transparent" : "bg-festive-green/20 text-festive-green border-festive-green/30"} font-black`}
                  >
                    {offer.tag}
                  </Badge>
                  <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center">
                    <offer.icon className="h-6 w-6 text-festive-gold" />
                  </div>
                </div>

                <h3 className="text-3xl font-black mb-3 leading-tight">{offer.title}</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">{offer.description}</p>

                <div className="mb-10">
                  <div className="flex items-center gap-2 text-festive-red font-black text-sm mb-2 italic">
                    <Gift className="h-5 w-5 fill-festive-red" />
                    <span className="tracking-wider">{offer.discount}</span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-black tracking-tighter text-festive-gold">{offer.price}</span>
                    {offer.originalPrice && (
                      <span className="text-muted-foreground line-through text-2xl font-bold decoration-festive-red/60 decoration-2">
                        {offer.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-12">
                  {offer.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 font-medium">
                      <div className="h-6 w-6 rounded-full bg-festive-green/20 flex items-center justify-center shrink-0 border border-festive-green/30">
                        <Check className="h-4 w-4 text-festive-green" />
                      </div>
                      <span className="text-foreground/90">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full h-14 rounded-2xl text-base font-black transition-all ${offer.popular ? "bg-festive-gold text-background hover:bg-festive-gold-light glow-festive-gold" : "bg-festive-green hover:bg-festive-green-light text-white glow-festive-green"} hover:scale-[1.02] active:scale-95`}
                >
                  Claim Holiday Deal
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <FestiveDivider />

      {/* 3️⃣ WHY FESTIVE OFFERS */}
      <section className="py-32 bg-white/[0.01] border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-square rounded-3xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-festive-red/20 via-festive-gold/20 to-festive-green/20 opacity-60" />
                <img
                  src="/founder-portrait.png?height=600&width=600"
                  alt="Founder"
                  className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-festive-gold flex items-center justify-center">
                      <SparklesIcon className="h-6 w-6 text-background" />
                    </div>
                    <div>
                      <p className="font-black text-lg">Alexander Thorne</p>
                      <p className="text-sm text-muted-foreground">Founder & Chief Architect</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Badge className="mb-6 bg-festive-red/20 text-festive-red border-festive-red/30 font-black">
                  HOLIDAY MESSAGE
                </Badge>
                <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-tight">
                  Celebrate Growth, New Beginnings & Success
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    The holiday season represents fresh starts, reflection, and bold moves forward. We created these
                    special offers to empower visionary businesses to enter 2025 with unstoppable momentum.
                  </p>
                  <p>
                    Whether you're launching a new venture or scaling an established business, this is your moment to
                    invest in technology that delivers real results.
                  </p>
                  <p className="text-foreground font-bold italic text-xl border-l-4 border-festive-gold pl-6">
                    "Let's make 2025 your most successful year yet."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FestiveDivider />

      {/* 4️⃣ SERVICES INCLUDED (FESTIVE STYLED) */}
      <section className="py-32 container mx-auto px-4">
        <div className="text-center mb-20">
          <TreePine className="h-12 w-12 text-festive-green mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">Everything You Need to Win</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Premium services wrapped and ready for your success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative p-8 rounded-3xl border-2 border-festive-gold/20 bg-gradient-to-br from-festive-gold/5 to-transparent hover:border-festive-gold/50 transition-all group overflow-hidden"
            >
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <SparklesIcon className="h-16 w-16 text-festive-gold" />
              </div>
              <div className="relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-festive-gold/20 border-2 border-festive-gold/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <service.icon className="h-7 w-7 text-festive-gold" />
                </div>
                <h3 className="text-xl font-black mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <FestiveDivider />

      {/* 5️⃣ FESTIVE COMPARISON TABLE */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Festive Pricing Breakdown</h2>
            <p className="text-xl text-muted-foreground">See how much you save this holiday season.</p>
          </div>

          <div className="max-w-5xl mx-auto rounded-3xl border-2 border-festive-gold/30 overflow-hidden glass">
            <Table>
              <TableHeader className="bg-gradient-to-r from-festive-red/10 via-festive-gold/10 to-festive-green/10">
                <TableRow className="border-festive-gold/20 hover:bg-transparent">
                  <TableHead className="w-[300px] font-black uppercase tracking-widest text-sm h-20 px-8 text-festive-gold">
                    Feature
                  </TableHead>
                  <TableHead className="text-center font-black uppercase tracking-widest text-sm">
                    Normal Price
                  </TableHead>
                  <TableHead className="text-center font-black uppercase tracking-widest text-sm text-festive-gold">
                    Festive Price
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ["Premium Web App", "$4,999", "$1,999"],
                  ["Timeline", "8-12 Weeks", "4-6 Weeks"],
                  ["Design Revisions", "3 Included", "Unlimited"],
                  ["AI Integration", "$2,000 Extra", "Included Free"],
                  ["Support Period", "1 Month", "3-6 Months"],
                  ["New Year Strategy", "Not Included", "Free Session"],
                ].map(([feature, normal, festive], i) => (
                  <TableRow key={i} className="border-festive-gold/10 hover:bg-festive-gold/5 transition-colors">
                    <TableCell className="font-bold py-6 px-8">{feature}</TableCell>
                    <TableCell className="text-center text-muted-foreground font-medium">{normal}</TableCell>
                    <TableCell className="text-center text-festive-gold font-black text-lg">{festive}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="text-center mt-12">
            <p className="text-2xl font-black text-festive-red">
              Average Savings: <span className="text-4xl">$5,000+</span> per package
            </p>
          </div>
        </div>
      </section>

      <FestiveDivider />

      {/* 6️⃣ CLIENT LOVE (FESTIVE MOOD) */}
      <section className="py-32 border-t border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-8 w-8 fill-festive-gold text-festive-gold" />
              ))}
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">Loved by Visionaries</h2>
            <p className="text-xl text-muted-foreground">Real results from real businesses.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-8 rounded-3xl border-2 border-festive-gold/20 bg-gradient-to-br from-festive-gold/5 to-transparent hover:border-festive-gold/50 transition-all group"
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <SparklesIcon className="h-8 w-8 text-festive-gold" />
                </div>
                <div className="flex text-festive-gold mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-lg italic mb-6 leading-relaxed text-foreground/90">"{t.content}"</p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                  <img
                    src={`/.jpg?height=48&width=48&query=${t.name}`}
                    alt={t.name}
                    className="h-12 w-12 rounded-full object-cover border-2 border-festive-gold/30"
                  />
                  <div>
                    <p className="font-black">{t.name}</p>
                    <p className="text-sm text-muted-foreground font-medium">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-8 mt-16">
            <div className="text-center">
              <p className="text-4xl font-black text-festive-gold mb-2">500+</p>
              <p className="text-sm uppercase tracking-wider text-muted-foreground font-bold">Happy Clients</p>
            </div>
            <div className="h-16 w-px bg-festive-gold/30" />
            <div className="text-center">
              <p className="text-4xl font-black text-festive-gold mb-2">4.9/5</p>
              <p className="text-sm uppercase tracking-wider text-muted-foreground font-bold">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      <FestiveDivider />

      {/* 7️⃣ NEW YEAR SUCCESS PROMISE */}
      <section className="py-32 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Rocket className="h-16 w-16 text-festive-gold mx-auto mb-8" />
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-tight">
            Your 2025 Success Starts Now
          </h2>
          <p className="text-2xl text-muted-foreground mb-12 leading-relaxed">
            The new year represents fresh opportunities, ambitious goals, and transformative growth. Partner with us to
            turn your vision into reality.
          </p>

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {[
              { label: "Growth Target", value: "10x ROI", icon: Target },
              { label: "Launch Speed", value: "30 Days", icon: Zap },
              { label: "Success Rate", value: "98%", icon: TrendingUp },
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-festive-red/20 to-festive-gold/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border-2 border-festive-gold/30">
                  <stat.icon className="h-10 w-10 text-festive-gold" />
                </div>
                <p className="text-5xl font-black mb-2 text-festive-gold">{stat.value}</p>
                <p className="text-sm uppercase tracking-wider text-muted-foreground font-bold">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="p-10 rounded-3xl border-2 border-festive-green/30 bg-gradient-to-br from-festive-green/10 to-transparent">
            <h3 className="text-2xl font-black mb-4 text-festive-green">Our New Year Commitment</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              We guarantee measurable results in Q1 2025. If your project doesn't deliver on our agreed KPIs, we'll work
              additional hours at no cost until it does.
            </p>
            <Calendar className="h-8 w-8 text-festive-green mx-auto" />
          </div>
        </div>
      </section>

      <FestiveDivider />

      {/* 8️⃣ FESTIVE FAQ */}
      <section className="py-32 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-center gap-4 mb-16">
            <HelpCircle className="h-10 w-10 text-festive-gold" />
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Holiday Questions</h2>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-2 border-festive-gold/20 rounded-2xl px-6 bg-gradient-to-br from-festive-gold/5 to-transparent hover:border-festive-gold/50 transition-all"
              >
                <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-festive-gold transition-colors py-6">
                  <span className="flex items-center gap-3">
                    <SparklesIcon className="h-5 w-5 text-festive-gold" />
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <FestiveDivider />

      {/* 9️⃣ FINAL FESTIVE CTA */}
      <section className="py-32 container mx-auto px-4">
        <div className="relative max-w-5xl mx-auto rounded-[3rem] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-festive-red/30 via-festive-gold/30 to-festive-green/30 opacity-40" />
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-festive-red/40 blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-festive-gold/40 blur-[100px]" />

          <div className="relative z-10 px-8 py-20 md:px-20 md:py-32 text-center glass border-2 border-festive-gold/30">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <PartyPopper className="h-16 w-16 text-festive-gold mx-auto mb-8" />
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">
                Start the New Year With a <span className="text-festive-gold">Winning Business</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Don't let this opportunity pass. Secure your festive pricing today and enter 2025 with the technology
                advantage you need to dominate your market.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <Button
                  size="lg"
                  className="h-16 px-12 rounded-full text-xl font-black bg-festive-gold text-background hover:bg-festive-gold-light glow-festive-gold transition-all hover:scale-105 active:scale-95"
                >
                  Get Started Now <Rocket className="ml-2 h-6 w-6" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-16 px-12 rounded-full text-xl font-black border-2 border-festive-green/50 hover:bg-festive-green/10 text-festive-green bg-transparent glow-festive-green transition-all"
                >
                  Schedule a Call <Calendar className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center justify-center gap-8 flex-wrap text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-festive-green" />
                  <span>No hidden fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-festive-green" />
                  <span>Flexible payment plans</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-festive-green" />
                  <span>100% satisfaction guarantee</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="py-16 text-center border-t border-festive-gold/20">
        <p className="text-muted-foreground mb-2">Limited spots available • Offer expires January 15, 2025</p>
        <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">
          Happy Holidays from the Nexus Team
        </p>
      </div>
    </div>
  )
}
