"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Folder,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"

const STATUS_UI: any = {
  "In Progress": {
    color: "text-blue-500",
    icon: AlertCircle,
  },
  Completed: {
    color: "text-green-500",
    icon: CheckCircle2,
  },
  Planning: {
    color: "text-purple-500",
    icon: Folder,
  },
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [open, setOpen] = useState(false)

  const [form, setForm] = useState({
    name: "",
    client: "",
    status: "In Progress",
    progress: 50,
    deadline: "",
  })

  // ✅ LOAD PROJECTS
  const loadProjects = async () => {
    const res = await fetch("/api/projects")
    const data = await res.json()

    // 🔥 seed demo projects if empty
    if (data.length === 0) {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Nexus AI Platform",
          client: "Tech Innovations Inc.",
          status: "In Progress",
          progress: 75,
          deadline: "2025-12-31",
        }),
      })

      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "E-Commerce Revamp",
          client: "Retail Solutions Ltd.",
          status: "Completed",
          progress: 100,
          deadline: "2025-11-15",
        }),
      })

      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Healthcare Dashboard",
          client: "MediCare Systems",
          status: "Planning",
          progress: 20,
          deadline: "2026-02-10",
        }),
      })

      return loadProjects()
    }

    setProjects(data)
  }

  useEffect(() => {
    loadProjects()
  }, [])

  // ✅ CREATE PROJECT
  const createProject = async () => {
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    setOpen(false)
    loadProjects()
  }

  return (
    <main className="flex-1 p-6 lg:p-10 space-y-8">

      {/* HEADER */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track all your active projects
          </p>
        </div>
{/* ===== ADD PROJECT MODAL ===== */}
{open && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="glass p-6 rounded-xl w-full max-w-md space-y-4">

      <h2 className="text-xl font-bold">Add New Project</h2>

      <input
        placeholder="Project name"
        className="w-full p-2 rounded bg-black/40"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Client name"
        className="w-full p-2 rounded bg-black/40"
        value={form.client}
        onChange={(e) => setForm({ ...form, client: e.target.value })}
      />

      <input
        type="date"
        className="w-full p-2 rounded bg-black/40"
        value={form.deadline}
        onChange={(e) => setForm({ ...form, deadline: e.target.value })}
      />

      <input
        type="number"
        placeholder="Progress %"
        className="w-full p-2 rounded bg-black/40"
        value={form.progress}
        onChange={(e) =>
          setForm({ ...form, progress: Number(e.target.value) })
        }
      />

      <select
        className="w-full p-2 rounded bg-black/40"
        value={form.status}
        onChange={(e) =>
          setForm({ ...form, status: e.target.value })
        }
      >
        <option>Planning</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      <div className="flex justify-end gap-3 pt-3">
        <Button variant="ghost" onClick={() => setOpen(false)}>
          Cancel
        </Button>

        <Button onClick={createProject}>
          Create Project
        </Button>
      </div>

    </div>
  </div>
)}

        <Button className="glow-primary" onClick={() => setOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </header>

      {/* PROJECT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => {
          const ui = STATUS_UI[project.status] || STATUS_UI["Planning"]
          const Icon = ui.icon

          return (
            <Card
              key={project._id}
              className="glass border-white/5 hover:border-primary/20 transition-all"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`mt-1 p-2 rounded-lg bg-accent/20 ${ui.color}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {project.name}
                      </CardTitle>
                      <CardDescription>
                        {project.client}
                      </CardDescription>
                    </div>
                  </div>

                  <Badge variant="outline" className="text-xs">
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">
                      {project.progress}%
                    </span>
                  </div>

                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    Due: {project.deadline}
                  </div>

                  <Button variant="ghost" size="sm" className="text-xs">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </main>
  )
}
