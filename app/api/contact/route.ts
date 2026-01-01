import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import mongoose from "mongoose"

/* ---------------- MODEL ---------------- */
const ContactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
    mobile: String, // ✅ ADDED (optional)
  },
  { timestamps: true }
)

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema)

/* ---------------- ROUTE ---------------- */
export async function POST(req: Request) {
  try {
    const { name, email, message, mobile } = await req.json()

    // ❌ REQUIRED FIELD CHECK
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      )
    }

    // ❌ EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      )
    }

    // ❌ MOBILE VALIDATION (OPTIONAL)
    if (mobile) {
      const mobileRegex = /^[+]?[0-9]{10,15}$/
      if (!mobileRegex.test(mobile)) {
        return NextResponse.json(
          { message: "Invalid mobile number" },
          { status: 400 }
        )
      }
    }

    // 🔗 CONNECT DB
    await connectToDatabase()

    // 💾 SAVE TO DB
    await Contact.create({
      name,
      email,
      message,
      mobile,
    })

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("CONTACT ERROR:", error)
    return NextResponse.json(
      { message: "Failed to send message" },
      { status: 500 }
    )
  }
}
