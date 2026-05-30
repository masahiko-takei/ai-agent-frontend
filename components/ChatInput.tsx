type Props = {
  message: string
  onChange: (value: string) => void
  onSend: () => void
}

export default function ChatInput({ message, onChange, onSend }: Props) {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSend()}
        placeholder="メッセージを入力..."
        className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 outline-none"
      />
      <button
        onClick={onSend}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
      >
        送信
      </button>
    </div>
  )
}