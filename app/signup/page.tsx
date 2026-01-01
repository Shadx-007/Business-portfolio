"use client"

import { motion } from "framer-motion"
import { Zap, Mail, Lock, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Signup failed")
        return
      }

      // ✅ signup success → go to login
      router.push("/login")
    } catch (err) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-[2rem] glass border-white/10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Zap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-black">NEXUS</span>
          </Link>
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-sm text-muted-foreground">
            Join the Nexus business ecosystem
          </p>
        </div>

        {error && (
          <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Full Name"
              className="pl-10 h-12 bg-white/5 border-white/10"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email Address"
              className="pl-10 h-12 bg-white/5 border-white/10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Password"
              className="pl-10 h-12 bg-white/5 border-white/10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Confirm Password"
              className="pl-10 h-12 bg-white/5 border-white/10"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl glow-primary font-bold"
          >
            {loading ? "Creating account..." : "Create Account"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
