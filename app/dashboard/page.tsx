"use client"
import { Activity, TrendingUp, Briefcase, FileText, Bell, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

const chartData = [
  { name: "Jan", total: 1200 },
  { name: "Feb", total: 1900 },
  { name: "Mar", total: 1700 },
  { name: "Apr", total: 2400 },
  { name: "May", total: 2100 },
  { name: "Jun", total: 3200 },
]

const recentActivity = [
  { user: "Alex Thompson", action: "Signed new contract", time: "2h ago", icon: FileText, color: "text-blue-500" },
  { user: "Nexus Bot", action: "Portfolio updated", time: "5h ago", icon: Activity, color: "text-green-500" },
  { user: "Sarah Jenkins", action: "Inquiry received", time: "1d ago", icon: Bell, color: "text-amber-500" },
]

export default function DashboardPage() {
  return (
    <main className="flex-1 p-6 lg:p-10 space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Welcome, Partner</h1>
          <p className="text-sm text-muted-foreground">Here's what's happening with your projects today.</p>
        </div>
        <Button variant="outline" className="h-10 border-white/10 bg-transparent">
          View Public Profile
        </Button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "$45,231.89", sub: "+20.1% from last month", icon: TrendingUp },
          { label: "Active Projects", value: "12", sub: "3 pending delivery", icon: Briefcase },
          { label: "Client Satisf.", value: "98%", sub: "+2% increase", icon: Users },
          { label: "Live Apps", value: "8", sub: "All systems operational", icon: Activity },
        ].map((stat, idx) => (
          <Card key={idx} className="glass border-white/5">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground uppercase">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-[10px] text-muted-foreground mt-1">{stat.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 glass border-white/5">
          <CardHeader>
            <CardTitle>Growth Analytics</CardTitle>
            <CardDescription>Visualizing your business expansion over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "var(--color-muted-foreground)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="var(--color-primary)"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorTotal)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/5">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your network.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivity.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <div className={`mt-1 p-2 rounded-lg bg-accent/20 ${item.color}`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{item.user}</p>
                    <p className="text-xs text-muted-foreground">{item.action}</p>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 block">
                      {item.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 text-xs text-primary">
              View All Notifications
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
