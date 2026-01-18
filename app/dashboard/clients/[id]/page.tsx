"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function ClientProfile() {
  const params = useParams()

  const id = Array.isArray(params.id)
    ? params.id[0]
    : params.id

  const [client, setClient] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    fetch(`/api/clients/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setClient(data)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    )
  }

  if (!client) {
    return (
      <div className="p-10 text-center text-red-500">
        Client not found
      </div>
    )
  }

  return (
    <main className="p-10 space-y-6">

      <h1 className="text-3xl font-bold">
        {client.company}
      </h1>

      <div className="grid md:grid-cols-2 gap-6 text-sm">

        <div><b>Name:</b> {client.name}</div>
        <div><b>Email:</b> {client.email}</div>
        <div><b>Phone:</b> {client.phone}</div>
        <div><b>Age:</b> {client.age}</div>

        <div><b>Skills:</b> {client.skills.join(", ")}</div>
        <div><b>Experience:</b> {client.experience} years</div>

        <div><b>GitHub:</b> {client.github}</div>
        <div><b>LinkedIn:</b> {client.linkedin}</div>

        <div><b>Salary:</b> ₹{client.salary}</div>
        <div><b>Rating:</b> ⭐ {client.rating}</div>

        <div><b>Projects:</b> {client.projectsCount}</div>
        <div><b>Status:</b> {client.status}</div>

      </div>
    </main>
  )
}
