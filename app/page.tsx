"use client"

import { useState, useEffect, useRef } from "react"
import ChatMessage from "@/components/ChatMessage"
import ChatInput from "@/components/ChatInput"
import { useChatStore } from "@/store/chatStore"

export default function Home() {
  const [message, setMessage] = useState("")
  const { messages, addMessage } = useChatStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (message.trim() === "") return

    addMessage({ text: message, role: "user" })
    setMessage("")

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    })

    const data = await response.json()
    addMessage({ text: data.reply, role: "ai" })
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">AI Agent App</h1>
        <p className="text-gray-400">学習用AIエージェントアプリ</p>
      </div>

      <div className="w-full max-w-2xl bg-gray-800 rounded-lg p-6">
        <div className="mb-4 space-y-2 max-h-96 overflow-y-auto">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
          <div ref={messagesEndRef} />
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