import { NextResponse } from "next/server"

/* -------------------- FORMATTER -------------------- */

function formatStructuredReply(raw: string, topic: string) {
  const lines = raw
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean)

  const steps: string[] = []

  for (const line of lines) {
    if (steps.length >= 6) break
    const cleaned = line.replace(/^\d+[\).\s-]*/, "")
    if (cleaned.length > 5) steps.push(cleaned)
  }

  while (steps.length < 6) {
    steps.push("Relevant explanation related to the topic.")
  }

  return (
    `Title: ${topic}\n` +
    `Steps:\n` +
    steps.map((s, i) => `${i + 1}. ${s}`).join("\n") +
    `\n\nExample:\nSimple example related to ${topic}.`
  )
}

/* -------------------- ROUTE -------------------- */

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({
        reply: "Please enter a valid message."
      })
    }

    const topic = message.trim()

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { reply: "Groq API key missing." },
        { status: 500 }
      )
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          temperature: 0,
          max_tokens: 250,
          messages: [
            {
              role: "system",
              content: `
You are a computer science tutor.

User topic is FIXED.
Do NOT change the topic.
Do NOT invent a title.

Respond only with learning steps and one example.

Rules:
- Maximum six steps
- One sentence per step
- Short and clear
- No markdown
`
            },
            {
              role: "user",
              content: topic
            }
          ]
        })
      }
    )

    const data = await response.json()

    const raw =
      data?.choices?.[0]?.message?.content || ""

    const finalReply = formatStructuredReply(raw, topic)

    return NextResponse.json({ reply: finalReply })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { reply: "AI service error." },
      { status: 500 }
    )
  }
}
