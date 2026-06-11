"use client";
import { useState, useEffect } from "react";
import { getMessages, sendMessage as sendMessageApi } from "@/lib/api/ai-workspace";

export function useChat(workspaceId, chatId) {
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);

  // load history when session changes
  useEffect(() => {
    if (!chatId) return;
    fetchMessages();
  }, [chatId]);

  async function fetchMessages() {
    try {
      const res = await getMessages(workspaceId, chatId);
      setMessages(res);
    } catch (err) {
      console.error(err);
    }
  }

  async function sendMessage(content) {
    if (!chatId) return;

    // optimistic user bubble
    const userMsg = { id: Date.now(), role: "user", content, citations: [] };
    setMessages((prev) => [...prev, userMsg]);
    setSending(true);

    try {
      const res = await sendMessageApi(workspaceId, chatId, content);
      const assistantMsg = {
        id: res.id,
        role: "assistant",
        content: res.content,
        citations: res.citations || [],
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      // remove optimistic message on failure
      setMessages((prev) => prev.filter((m) => m.id !== userMsg.id));
    } finally {
      setSending(false);
    }
  }

  return { messages, sending, sendMessage };
}