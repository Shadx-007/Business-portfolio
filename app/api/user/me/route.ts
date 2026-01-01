import { cookies } from "next/headers"
import connectToDatabase from "@/lib/mongodb"
import User from "@/models/User"
import { NextResponse } from "next/server"

export async function GET() {
  const session = cookies().get("session")?.value
  if (!session) return NextResponse.json(null)

  await connectToDatabase()
  const user = await User.findById(session).select("-password")

  return NextResponse.json(user)
}
