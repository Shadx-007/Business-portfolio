"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  // ✅ STATE
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [mobile, setMobile] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState("")

  // ✅ ADDED: DOWNLOAD FUNCTION (ONLY ADD)
  const downloadForm = () => {
    const content =
      `FEEDBACK FORM\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Mobile: ${mobile}\n` +
      `Message: ${message}`

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "feedback.txt"
    a.click()

    URL.revokeObjectURL(url)
  }

  // ✅ SUBMIT HANDLER (ONLY ADDED AUTO DOWNLOAD)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus("")

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const mobileRegex = /^[+]?[0-9]{10,15}$/

    if (!emailRegex.test(email)) {
      setStatus("Invalid email address ❌")
      setLoading(false)
      return
    }

    if (mobile && !mobileRegex.test(mobile)) {
      setStatus("Invalid mobile number ❌")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, mobile, message }),
      })

      const data = await res.json()

      if (!res.ok) {
        setStatus(data.message || "Something went wrong ❌")
        return
      }

      setStatus("Message sent successfully ✅")

      // ✅ ADDED: AUTO DOWNLOAD AFTER SUCCESS
      downloadForm()

      setName("")
      setEmail("")
      setMobile("")
      setMessage("")
    } catch {
      setStatus("Server error. Try again ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* LEFT INFO */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-6xl font-bold mb-8">Feedback</h1>
          <p className="text-muted-foreground mb-12">
            Let's discuss your next project. Our team is ready to help you navigate the digital landscape.
          </p>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Mail className="text-primary h-6 w-6" />
              <span>hello@nexus.tech</span>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="text-primary h-6 w-6" />
              <span>+1 (555) 000-1234</span>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="text-primary h-6 w-6" />
              <span>San Francisco, CA</span>
            </div>
          </div>
        </motion.div>

        {/* FORM */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-8 rounded-[2rem] space-y-4"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="Name"
            className="bg-white/5 border-white/10"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            placeholder="Email"
            type="email"
            className="bg-white/5 border-white/10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            placeholder="Mobile Number"
            type="tel"
            className="bg-white/5 border-white/10"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <Textarea
            placeholder="Message"
            className="bg-white/5 border-white/10 min-h-[150px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          {status && (
            <p className="text-sm text-center text-primary">{status}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 glow-primary font-bold"
          >
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </motion.form>
      </div>
    </div>
  )
}
