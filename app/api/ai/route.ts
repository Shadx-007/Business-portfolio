import { NextResponse } from "next/server"

/* -------------------- HELPERS -------------------- */

// Detect vague / teaching-style topics
function isVagueTopic(topic: string) {
  const t = topic.toLowerCase()
  return (
    t.startsWith("teach me") ||
    t.startsWith("learn") ||
    t.startsWith("explain") ||
    t.split(" ").length <= 3
  )
}

// Force strict structured output
function normalizeReply(raw: string, topic: string) {
  const lines = raw
    .split("\n")
    .map(l => l.trim())
    .filter(Boolean)

  const steps: string[] = []

  for (const line of lines) {
    if (steps.length >= 6) break
    const cleaned = line.replace(/^\d+[\).\s-]*/, "")
    if (cleaned.length > 3) steps.push(cleaned)
  }

  while (steps.length < 6) {
    steps.push("Relevant explanation of the topic.")
  }

  return (
    `Title: ${topic}\n` +
    `Steps:\n` +
    steps.map((s, i) => `${i + 1}. ${s}`).join("\n") +
    `\n\nExample:\nExample related to ${topic}.`
  )
}

/* -------------------- ROUTE -------------------- */

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({
        reply:
          "Title: Error\n" +
          "Steps:\n" +
          "1. Invalid input.\n" +
          "2. Please enter a valid topic.\n" +
          "3. Avoid empty messages.\n" +
          "4. Try again.\n" +
          "5. \n" +
          "6. \n\n" +
          "Example:\nNone.",
      })
    }

    const topic = message.trim()

    /* ---------- HARD OVERRIDE FOR VAGUE TOPICS ---------- */
    if (isVagueTopic(topic)) {
      return NextResponse.json({
        reply:
          `Title: ${topic}\n` +
          `Steps:\n` +
          `1. Understand what the topic refers to.\n` +
          `2. Learn its purpose and use cases.\n` +
          `3. Study its core components.\n` +
          `4. See how it works with examples.\n` +
          `5. Practice basic usage.\n` +
          `6. Explore advanced concepts.\n\n` +
          `Example:\nBasic example related to ${topic}.`,
      })
    }

    /* ---------- GROQ CALL ---------- */
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { reply: "AI configuration error." },
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
          max_tokens: 200,
          messages: [
            {
              role: "system",
              content:
                "You are a STRICT computer science tutor.\n" +
                "RULES:\n" +
                "1. Answer ONLY the given topic.\n" +
                "2. Do NOT write paragraphs.\n" +
                "3. Use short, clear sentences.\n" +
                "4. No markdown.\n" +
                "5. Maximum six steps.\n" +
                "6. Each step must be one sentence.",
            },
            {
              role: "user",
              content: topic,
            },
          ],
        }),
      }
    )

    const data = await response.json()
    const rawReply =
      data?.choices?.[0]?.message?.content || "No response."

    const finalReply = normalizeReply(rawReply, topic)

    return NextResponse.json({ reply: finalReply })
  } catch (error) {
    console.error("AI error:", error)
    return NextResponse.json(
      { reply: "AI service error. Please try again." },
      { status: 500 }
    )
  }
}
