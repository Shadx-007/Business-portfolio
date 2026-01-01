"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, CreditCard, DollarSign, Clock, CheckCircle2 } from "lucide-react"

const invoices = [
  {
    id: "INV-001",
    client: "Tech Innovations Inc.",
    amount: "$45,000",
    status: "Paid",
    date: "Dec 15, 2025",
    statusColor: "text-green-500",
    icon: CheckCircle2,
  },
  {
    id: "INV-002",
    client: "Retail Solutions Ltd.",
    amount: "$32,500",
    status: "Paid",
    date: "Dec 10, 2025",
    statusColor: "text-green-500",
    icon: CheckCircle2,
  },
  {
    id: "INV-003",
    client: "FinanceFirst Bank",
    amount: "$78,000",
    status: "Pending",
    date: "Dec 20, 2025",
    statusColor: "text-amber-500",
    icon: Clock,
  },
  {
    id: "INV-004",
    client: "MediCare Systems",
    amount: "$15,000",
    status: "Pending",
    date: "Dec 28, 2025",
    statusColor: "text-amber-500",
    icon: Clock,
  },
]

export default function BillingPage() {
  return (
    <main className="flex-1 p-6 lg:p-10 space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Billing</h1>
          <p className="text-sm text-muted-foreground">Track invoices, payments, and revenue</p>
        </div>
        <Button className="glow-primary">
          <CreditCard className="h-4 w-4 mr-2" />
          New Invoice
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass border-white/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$170,500</div>
            <p className="text-[10px] text-green-500 mt-1">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card className="glass border-white/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Paid Invoices</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$77,500</div>
            <p className="text-[10px] text-muted-foreground mt-1">2 invoices cleared</p>
          </CardContent>
        </Card>
        <Card className="glass border-white/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Pending</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$93,000</div>
            <p className="text-[10px] text-muted-foreground mt-1">2 invoices awaiting</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-white/5">
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>A list of your recent billing transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-4 rounded-lg border border-white/5 hover:bg-white/5 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg bg-accent/20 ${invoice.statusColor}`}>
                    <invoice.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{invoice.id}</p>
                    <p className="text-xs text-muted-foreground">{invoice.client}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-bold">{invoice.amount}</p>
                    <p className="text-xs text-muted-foreground">{invoice.date}</p>
                  </div>
                  <Badge
                    variant={invoice.status === "Paid" ? "default" : "secondary"}
                    className={invoice.status === "Paid" ? "bg-green-500/10 text-green-500" : ""}
                  >
                    {invoice.status}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
