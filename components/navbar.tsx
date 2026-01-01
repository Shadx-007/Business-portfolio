"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Business", href: "/business" },
  { name: "Offers", href: "/offers" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Contact", href: "/contact" },
]

type User = {
  name: string
  email: string
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.href = "/"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-primary animate-pulse" />
            <span className="text-xl font-bold tracking-tight">NEXUS</span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center space-x-4">

            

            {/* AUTH */}
            <div className="hidden sm:flex items-center space-x-3">
              {!user ? (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm" className="glow-primary">
                      Join Nexus
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <div className="h-9 w-9 rounded-full bg-primary text-black flex items-center justify-center font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-muted-foreground hover:text-foreground"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/10 bg-background/95"
          >
            <div className="space-y-1 px-4 pb-6 pt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent"
                  )}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 space-y-2">
                {!user ? (
                  <>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </>
                ) : (
                  <Button className="w-full" onClick={handleLogout}>
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
