import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import mongoose from "mongoose"

/* ---------------- MODEL ---------------- */
const ContactSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
  },
  { timestamps: true }
)

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema)

/* ---------------- ROUTE ---------------- */
export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      )
    }

    await connectToDatabase()

    await Contact.create({ name, email, message })

    return NextResponse.json({
      message: "Message sent successfully",
    })
  } catch (error) {
    console.error("CONTACT ERROR:", error)
    return NextResponse.json(
      { message: "Failed to send message" },
      { status: 500 }
    )
  }
}
