"use client";
import { useState } from "react";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import CitationDrawer from "./CitationDrawer";
import { useChat } from "../../../_hooks/useChat";

export default function ChatPanel({ workspaceId }) {
  const { messages, sending, sendMessage } = useChat(workspaceId);
  const [activeCitation, setActiveCitation] = useState(null);

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