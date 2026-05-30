type Message = {
  text: string
  role: "user" | "ai"
}

type Props = {
  message: Message
}

export default function ChatMessage({ message }: Props) {
  return (
    <div
      className={`rounded-lg px-4 py-2 max-w-xs ${
        message.role === "user"
          ? "bg-blue-600 ml-auto"
          : "bg-gray-700"
      }`}
    >
      {message.text}
    </div>
  )
}