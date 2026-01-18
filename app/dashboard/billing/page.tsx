"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Download,
  CreditCard,
  DollarSign,
  Clock,
  CheckCircle2,
  X,
} from "lucide-react"

type Invoice = {
  _id: string
  invoiceNumber: string
  client: string
  amount: number
  status: string
  date: string
}

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [open, setOpen] = useState(false)
  const [client, setClient] = useState("")
  const [amount, setAmount] = useState("")
  const [status, setStatus] = useState("Pending")

  // ======================
  // LOAD INVOICES
  // ======================
  const loadInvoices = async () => {
    const res = await fetch("/api/invoices", { cache: "no-store" })
    const data = await res.json()
    setInvoices(data)
  }

  useEffect(() => {
    loadInvoices()
  }, [])

  // ======================
  // CREATE
  // ======================
  const createInvoice = async () => {
    if (!client || !amount) {
      alert("Fill all fields")
      return
    }

    await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client,
        amount: Number(amount),
        status,
      }),
    })

    setClient("")
    setAmount("")
    setStatus("Pending")
    setOpen(false)

    loadInvoices()
  }

  // ======================
  // DELETE
  // ======================
  const deleteInvoice = async (id: string) => {
    if (!confirm("Delete invoice?")) return

    await fetch(`/api/invoices/${id}`, {
      method: "DELETE",
    })

    setInvoices((prev) => prev.filter((i) => i._id !== id))
  }

  // ======================
  // DOWNLOAD
  // ======================
  const downloadInvoice = (id: string) => {
    window.open(`/api/invoices/${id}`, "_blank")
  }

  // ======================
  // CALCULATIONS
  // ======================
  const totalRevenue = invoices.reduce(
    (a, b) => a + b.amount,
    0
  )

  const paid = invoices
    .filter((i) => i.status === "Paid")
    .reduce((a, b) => a + b.amount, 0)

  const pending = invoices
    .filter((i) => i.status === "Pending")
    .reduce((a, b) => a + b.amount, 0)

  return (
    <main className="flex-1 p-6 lg:p-10 space-y-8">

      {/* HEADER */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Billing</h1>
          <p className="text-sm text-muted-foreground">
            Track invoices, payments, and revenue
          </p>
        </div>

        <Button onClick={() => setOpen(true)} className="glow-primary">
          <CreditCard className="h-4 w-4 mr-2" />
          New Invoice
        </Button>
      </header>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-sm">Total Revenue</CardTitle>
            <DollarSign className="text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue}</div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-sm">Paid</CardTitle>
            <CheckCircle2 className="text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${paid}</div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-sm">Pending</CardTitle>
            <Clock className="text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pending}</div>
          </CardContent>
        </Card>
      </div>

      {/* RECENT INVOICES */}
      <Card className="glass">
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {invoices.map((invoice) => (
            <div
              key={invoice._id}
              className="flex justify-between items-center p-4 rounded-lg border border-white/10"
            >
              <div>
                <p className="font-semibold">{invoice.invoiceNumber}</p>
                <p className="text-xs text-muted-foreground">
                  {invoice.client}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold">${invoice.amount}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(invoice.date).toDateString()}
                  </p>
                </div>

                <Badge>{invoice.status}</Badge>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => downloadInvoice(invoice._id)}
                >
                  <Download className="h-4 w-4" />
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  className="text-red-500"
                  onClick={() => deleteInvoice(invoice._id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Invoice</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Client name"
              value={client}
              onChange={(e) => setClient(e.target.value)}
            />

            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <select
              className="w-full border rounded-md bg-background p-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Pending</option>
              <option>Paid</option>
            </select>

            <Button className="w-full" onClick={createInvoice}>
              Save Invoice
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
