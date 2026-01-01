"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Briefcase, Users, CreditCard, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarItems = [
  { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Projects", icon: Briefcase, href: "/dashboard/projects" },
  { name: "Clients", icon: Users, href: "/dashboard/clients" },
  { name: "Billing", icon: CreditCard, href: "/dashboard/billing" },
  { name: "Settings", icon: Settings, href: "/dashboard/settings" },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-white/5 p-6 space-y-8">
      <div className="flex items-center space-x-2 px-2">
        <LayoutDashboard className="h-5 w-5 text-primary" />
        <span className="font-bold">Console</span>
      </div>
      <nav className="space-y-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
