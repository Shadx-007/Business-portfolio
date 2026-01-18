import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Client from "@/models/Client"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB()

  const client = await Client.findOne({
    _id: params.id,
  })

  return NextResponse.json(client)
}
