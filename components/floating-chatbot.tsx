"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

type Message = {
  role: "user" | "assistant"
  content: string
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [input, setInput] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm the Nexus AI assistant. How can I help you elevate your business today?",
    },
  ])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = input
    setInput("")
    setLoading(true)

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ])

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await res.json()

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "No response from AI.",
        },
      ])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "AI service error. Please try again.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-80 sm:w-96 rounded-2xl glass overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
                <span className="font-semibold text-primary-foreground">
                  Nexus AI Assistant
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground/80 hover:text-primary-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4 bg-background/50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`p-3 text-sm max-w-[80%] rounded-2xl ${
                      msg.role === "user"
                        ? "bg-primary/20 border border-primary/20 rounded-tr-none"
                        : "bg-accent rounded-tl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="text-xs text-muted-foreground">
                  AI is typing...
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-background/80">
              <form
                className="flex space-x-2"
                onSubmit={(e) => {
                  e.preventDefault()
                  sendMessage()
                }}
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 bg-accent/30 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button
                  size="icon"
                  className="rounded-full h-9 w-9"
                  disabled={loading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg glow-primary"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>
    </div>
  )
}
