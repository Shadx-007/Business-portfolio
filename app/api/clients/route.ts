import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Client from "@/models/Client"

export async function GET() {
  await connectDB()
  const clients = await Client.find().sort({ createdAt: -1 })
  return NextResponse.json(clients)
}

export async function POST(req: Request) {
  const body = await req.json()
  await connectDB()
  const client = await Client.create(body)
  return NextResponse.json(client)
}
