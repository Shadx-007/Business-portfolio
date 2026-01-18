export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Invoice from "@/models/Invoice"

export async function GET() {
  await connectDB()
  const invoices = await Invoice.find().sort({ createdAt: -1 })
  return NextResponse.json(invoices)
}

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()

  const invoice = await Invoice.create({
    invoiceNumber: "INV-" + Math.floor(1000 + Math.random() * 9000),
    client: body.client,
    amount: body.amount,
    status: body.status,
    date: new Date(),
  })

  return NextResponse.json(invoice)
}
