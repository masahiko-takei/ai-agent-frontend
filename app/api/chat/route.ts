import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
})

export async function POST(request: NextRequest) {
  const { message } = await request.json()

  const response = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 1024,
    messages: [{ role: "user", content: message }]
  })

  const reply = response.content[0].type === "text"
    ? response.content[0].text
    : "エラーが発生しました"

  return NextResponse.json({ reply })
}