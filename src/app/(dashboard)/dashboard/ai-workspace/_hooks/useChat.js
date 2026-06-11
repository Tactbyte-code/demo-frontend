"use client";
import { useState } from "react";
import { sendMessage as sendMessageApi } from "@/lib/api/ai-workspace";

export function useChat(workspaceId) {
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);

  async function sendMessage(content) {
    const userMsg = { id: Date.now(), role: "user", content };
    setMessages((prev) => [...prev, userMsg]);
    setSending(true);
    try {
      const res = await sendMessageApi(workspaceId, content);
      const assistantMsg = {
        id: Date.now() + 1,
        role: "assistant",
        content: res.answer,
        citations: res.citations || [],
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  }

  return { messages, sending, sendMessage };
}