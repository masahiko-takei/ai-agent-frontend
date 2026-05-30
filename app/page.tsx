"use client"

import { useState } from "react"
import ChatMessage from "@/components/ChatMessage"
import ChatInput from "@/components/ChatInput"

type Message = {
  text: string
  role: "user" | "ai"
}

export default function Home() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])

  const handleSend = async () => {
    if (message.trim() === "") return

    const userMessage: Message = { text: message, role: "user" }
    setMessages(prev => [...prev, userMessage])
    setMessage("")

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    })

    const data = await response.json()
    const aiMessage: Message = { text: data.reply, role: "ai" }
    setMessages(prev => [...prev, aiMessage])
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">AI Agent App</h1>
        <p className="text-gray-400">学習用AIエージェントアプリ</p>
      </div>

      <div className="w-full max-w-2xl bg-gray-800 rounded-lg p-6">
        <div className="mb-4 space-y-2">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
        </div>
        <ChatInput
          message={message}
          onChange={setMessage}
          onSend={handleSend}
        />
      </div>
    </main>
  )
}