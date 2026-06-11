"use client";
import { useState } from "react";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import CitationDrawer from "./CitationDrawer";
import { useChat } from "../../../_hooks/useChat";

export default function ChatPanel({ workspaceId, chatId }) {
  const { messages, sending, sendMessage } = useChat(workspaceId, chatId);
  const [activeCitation, setActiveCitation] = useState(null);

  if (!chatId) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-muted">
        Select a chat or create a new one.
      </div>
    );
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex flex-col flex-1 overflow-hidden">
        <ChatHistory messages={messages} onCitationClick={setActiveCitation} />
        <ChatInput onSend={sendMessage} disabled={sending} />
      </div>
      {activeCitation && (
        <CitationDrawer citation={activeCitation} onClose={() => setActiveCitation(null)} />
      )}
    </div>
  );
}