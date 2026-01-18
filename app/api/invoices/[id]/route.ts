export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import Invoice from "@/models/Invoice"

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB()
  await Invoice.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB()

  const invoice = await Invoice.findById(params.id)

  if (!invoice)
    return new NextResponse("Invoice not found", { status: 404 })

  const textInvoice = `
==============================
        NEXUS CORPORATION
==============================

Invoice No : ${invoice.invoiceNumber}
Client     : ${invoice.client}
Date       : ${invoice.date.toDateString()}
Status     : ${invoice.status}

--------------------------------
Amount     : $${invoice.amount}
--------------------------------

TOTAL      : $${invoice.amount}

Thank you for doing business ❤️
`

  return new NextResponse(textInvoice, {
    headers: {
      "Content-Type": "text/plain",
      "Content-Disposition": `attachment; filename=${invoice.invoiceNumber}.txt`,
    },
  })
}
