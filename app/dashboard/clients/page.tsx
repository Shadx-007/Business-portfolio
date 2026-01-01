"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Mail, Phone, Building2, Star } from "lucide-react"

const clients = [
  {
    id: 1,
    name: "Tech Innovations Inc.",
    contact: "Sarah Johnson",
    email: "sarah@techinnovations.com",
    phone: "+1 (555) 123-4567",
    projects: 3,
    revenue: "$125,000",
    rating: 5,
    status: "Active",
  },
  {
    id: 2,
    name: "Retail Solutions Ltd.",
    contact: "Michael Chen",
    email: "michael@retailsolutions.com",
    phone: "+1 (555) 234-5678",
    projects: 2,
    revenue: "$89,500",
    rating: 5,
    status: "Active",
  },
  {
    id: 3,
    name: "FinanceFirst Bank",
    contact: "Emily Rodriguez",
    email: "emily@financefirst.com",
    phone: "+1 (555) 345-6789",
    projects: 1,
    revenue: "$210,000",
    rating: 4,
    status: "Active",
  },
  {
    id: 4,
    name: "MediCare Systems",
    contact: "David Thompson",
    email: "david@medicare.com",
    phone: "+1 (555) 456-7890",
    projects: 1,
    revenue: "$45,000",
    rating: 5,
    status: "New",
  },
]

export default function ClientsPage() {
  return (
    <main className="flex-1 p-6 lg:p-10 space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Clients</h1>
          <p className="text-sm text-muted-foreground">Manage your client relationships and partnerships</p>
        </div>
        <Button className="glow-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clients.map((client) => (
          <Card key={client.id} className="glass border-white/5 hover:border-primary/20 transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {client.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {client.name}
                      <Badge variant={client.status === "Active" ? "default" : "secondary"} className="text-xs">
                        {client.status}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{client.contact}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  {client.email}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  {client.phone}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center space-x-4 text-xs">
                  <div className="flex items-center">
                    <Building2 className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span className="font-semibold">{client.projects}</span>
                    <span className="text-muted-foreground ml-1">Projects</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 mr-1 text-amber-500 fill-amber-500" />
                    <span className="font-semibold">{client.rating}.0</span>
                  </div>
                </div>
                <div className="text-sm font-bold text-primary">{client.revenue}</div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent">
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
