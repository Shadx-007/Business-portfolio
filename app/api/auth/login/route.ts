import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"
import User from "@/models/User"
import connectToDatabase from "@/lib/mongodb"
console.log("🔥 LOGIN ROUTE HIT")

export async function POST(request: Request) {
  try {
    // 🔍 Read body
    const body = await request.json()
    console.log("LOGIN BODY 👉", body)

    const { email, password } = body

    // ❌ Missing fields
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      )
    }

    // 🔗 Connect DB
    await connectToDatabase()

    // 🔍 Find user
    const user = await User.findOne({ email })

    if (!user || !user.password) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      )
    }

    // 🔐 Compare password (FIXED)
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password.toString()
    )

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      )
    }

    // ✅ Success
    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("🔥 LOGIN ERROR:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
