"use client";
import { useEffect, useState } from "react";
import { getChatSessions, createChatSession } from "@/lib/api/ai-workspace";

export function useChatSessions(workspaceId) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, [workspaceId]);

  async function fetchSessions() {
    try {
      const res = await getChatSessions(workspaceId);
      setSessions(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createSession() {
    try {
      const newSession = await createChatSession(workspaceId);
      setSessions((prev) => [newSession, ...prev]);
      return newSession;
    } catch (err) {
      console.error(err);
    }
  }

  return { sessions, loading, createSession };
}