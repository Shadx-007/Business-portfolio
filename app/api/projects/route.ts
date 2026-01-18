import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Project from "@/models/Project"

export async function GET() {
  await connectDB()
  const projects = await Project.find().sort({ createdAt: -1 })
  return NextResponse.json(projects)
}

export async function POST(req: Request) {
  const body = await req.json()
  await connectDB()
  const project = await Project.create(body)
  return NextResponse.json(project)
}
