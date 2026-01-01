"use client"

import { motion } from "framer-motion"
import {
  Zap,
  Github,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Invalid credentials")
        return
      }

      // ✅ STORE USER FOR NAVBAR
      localStorage.setItem("user", JSON.stringify(data.user))

      // ✅ REDIRECT
      router.push("/dashboard")
    } catch (err) {
      setError("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-20 flex flex-col items-center p-4 space-y-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-[2rem] glass border-white/10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-16 -mt-16" />

        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Zap className="h-8 w-8 text-primary" />
            <span className="text-2xl font-black">NEXUS</span>
          </Link>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to manage your business portfolio
          </p>
        </div>

        {error && (
          <p className="mb-4 text-sm text-red-500 text-center">{error}</p>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
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

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl glow-primary font-bold"
          >
            {loading ? "Signing in..." : "Sign In"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link href="/signup" className="text-primary font-bold hover:underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
