"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import {
  Plus,
  Mail,
  Phone,
  Building2,
  Star,
} from "lucide-react"

type Client = {
  _id?: string
  name: string
  company: string
  email: string
  phone: string
  age: number
  skills: string[]
  github: string
  linkedin: string
  salary: number
  experience: number
  rating: number
  projectsCount: number
  status: string
}

export default function ClientsPage() {
  const router = useRouter()

  const [clients, setClients] = useState<Client[]>([])
  const [open, setOpen] = useState(false)

  const [form, setForm] = useState<any>({
    name: "",
    company: "",
    email: "",
    phone: "",
    age: 0,
    skills: "",
    github: "",
    linkedin: "",
    salary: 0,
    experience: 0,
    rating: 5,
    projectsCount: 0,
    status: "Active",
  })

  // LOAD CLIENTS
  const loadClients = async () => {
    const res = await fetch("/api/clients")
    const data = await res.json()
    setClients(data)
  }

  useEffect(() => {
    loadClients()
  }, [])

  // ADD CLIENT
  const addClient = async () => {
    await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        skills: form.skills.split(",").map((s: string) => s.trim()),
      }),
    })

    setOpen(false)
    loadClients()
  }

  return (
    <main className="flex-1 p-6 lg:p-10 space-y-8">

      {/* HEADER */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Clients</h1>
          <p className="text-sm text-muted-foreground">
            Manage your client relationships and partnerships
          </p>
        </div>

        <Button className="glow-primary" onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </header>

      {/* CLIENT CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clients.map((client) => (
          <Card
            key={client._id}
            className="glass border-white/5 hover:border-primary/20 transition-all"
          >
            <CardHeader>
              <div className="flex items-start space-x-4">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {client.company
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {client.company}
                    <Badge className="text-xs">{client.status}</Badge>
                  </CardTitle>

                  <p className="text-sm text-muted-foreground">
                    {client.name}
                  </p>
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
                    <span className="font-semibold">
                      {client.projectsCount}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      Projects
                    </span>
                  </div>

                  <div className="flex items-center">
                    <Star className="h-3 w-3 mr-1 text-amber-500 fill-amber-500" />
                    <span className="font-semibold">
                      {client.rating}.0
                    </span>
                  </div>
                </div>

                <div className="text-sm font-bold text-primary">
                  ₹{client.salary}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2 bg-transparent"
                onClick={() =>
                  router.push(`/dashboard/clients/${client._id}`)

                }
              >
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ADD CLIENT MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="glass p-6 rounded-xl w-full max-w-xl space-y-3 overflow-y-auto max-h-[90vh]">

            <h2 className="text-xl font-bold">Add Client</h2>

            {[
              ["Company Name", "company"],
              ["Full Name", "name"],
              ["Email", "email"],
              ["Phone", "phone"],
              ["Age", "age"],
              ["Skills (comma separated)", "skills"],
              ["GitHub URL", "github"],
              ["LinkedIn URL", "linkedin"],
              ["Salary", "salary"],
              ["Experience (years)", "experience"],
              ["Projects Count", "projectsCount"],
              ["Rating (1–5)", "rating"],
            ].map(([label, key]) => (
              <input
                key={key}
                placeholder={label}
                type={
                  ["age", "salary", "experience", "projectsCount", "rating"].includes(
                    key
                  )
                    ? "number"
                    : "text"
                }
                className="w-full p-2 rounded bg-black/40"
                value={(form as any)[key]}
                onChange={(e) =>
                  setForm({
                    ...form,
                    [key]:
                      e.target.type === "number"
                        ? Number(e.target.value)
                        : e.target.value,
                  })
                }
              />
            ))}

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>

              <Button onClick={addClient}>
                Save Client
              </Button>
            </div>

          </div>
        </div>
      )}
    </main>
  )
}
