import { cookies } from "next/headers"
import connectToDatabase from "@/lib/mongodb"
import User from "@/models/user"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = cookies().get("session")?.value
  if (!session) return NextResponse.json({}, { status: 401 })

  const { name, company } = await req.json()
  await connectToDatabase()

  await User.findByIdAndUpdate(session, { name, company })
  return NextResponse.json({ success: true })
}
