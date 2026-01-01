"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Folder, Clock, CheckCircle2, AlertCircle } from "lucide-react"

const projects = [
  {
    id: 1,
    name: "Nexus AI Platform",
    client: "Tech Innovations Inc.",
    status: "In Progress",
    progress: 75,
    deadline: "Dec 31, 2025",
    statusColor: "text-blue-500",
    icon: AlertCircle,
  },
  {
    id: 2,
    name: "E-Commerce Revamp",
    client: "Retail Solutions Ltd.",
    status: "Completed",
    progress: 100,
    deadline: "Nov 15, 2025",
    statusColor: "text-green-500",
    icon: CheckCircle2,
  },
  {
    id: 3,
    name: "Mobile Banking App",
    client: "FinanceFirst Bank",
    status: "In Progress",
    progress: 45,
    deadline: "Jan 20, 2026",
    statusColor: "text-amber-500",
    icon: Clock,
  },
  {
    id: 4,
    name: "Healthcare Dashboard",
    client: "MediCare Systems",
    status: "Planning",
    progress: 15,
    deadline: "Feb 10, 2026",
    statusColor: "text-purple-500",
    icon: Folder,
  },
]

export default function ProjectsPage() {
  return (
    <main className="flex-1 p-6 lg:p-10 space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-muted-foreground">Manage and track all your active projects</p>
        </div>
        <Button className="glow-primary">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="glass border-white/5 hover:border-primary/20 transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`mt-1 p-2 rounded-lg bg-accent/20 ${project.statusColor}`}>
                    <project.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription>{project.client}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold">{project.progress}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
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
        ))}
      </div>
    </main>
  )
}
