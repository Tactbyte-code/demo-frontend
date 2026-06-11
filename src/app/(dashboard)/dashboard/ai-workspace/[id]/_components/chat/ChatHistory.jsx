import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

export default function ChatHistory({ messages, onCitationClick }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
      {messages.length === 0 && (
        <p className="text-xs text-muted text-center mt-8">
          Ask anything about your sources.
        </p>
      )}
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} onCitationClick={onCitationClick} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}