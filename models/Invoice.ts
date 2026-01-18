import mongoose, { Schema, models } from "mongoose"

const InvoiceSchema = new Schema(
  {
    invoiceNumber: String,
    client: String,
    amount: Number,
    status: String,
    date: Date,
  },
  { timestamps: true }
)

export default models.Invoice || mongoose.model("Invoice", InvoiceSchema)
