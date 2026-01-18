import { cookies } from "next/headers"
import connectToDatabase from "@/lib/mongodb"
import User from "@/models/User"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = cookies().get("session")?.value
  if (!session) return NextResponse.json({}, { status: 401 })

  const preferences = await req.json()
  await connectToDatabase()

  await User.findByIdAndUpdate(session, preferences)
  return NextResponse.json({ success: true })
}
