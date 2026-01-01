import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

const MOCK_HASH = bcrypt.hashSync("password123", 10)

export async function POST(req: Request) {
  const { currentPassword, newPassword } = await req.json()

  const valid = await bcrypt.compare(currentPassword, MOCK_HASH)
  if (!valid) {
    return NextResponse.json({ message: "Wrong password" }, { status: 401 })
  }

  console.log("Password updated to:", newPassword)
  return NextResponse.json({ success: true })
}
