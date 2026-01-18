import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Client from "@/models/Client"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB()

  const client = await Client.findById(params.id)

  if (!client) {
    return new NextResponse("Client not found", { status: 404 })
  }

  return NextResponse.json(client)
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB()
  await Client.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}
