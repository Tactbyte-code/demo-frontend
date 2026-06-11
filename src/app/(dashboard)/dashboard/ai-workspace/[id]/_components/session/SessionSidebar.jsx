"use client";
import { useState } from "react";
import ChatSessionList from "./ChatSessionList";
import { useChatSessions } from "../../../_hooks/useChatSessions";
import { ChevronLeft, ChevronRight, SquarePen } from "lucide-react";

export default function SessionSidebar({ workspaceId, activeChatId, onSelectChat }) {
  const { sessions, loading, createSession, deleteSession } = useChatSessions(workspaceId);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`shrink-0 border-r border-border flex flex-col h-full transition-all duration-300 ${
        collapsed ? "w-12" : "w-60"
      }`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-border">
        {!collapsed && (
          <span className="text-xs font-bold uppercase tracking-wide text-muted">Chats</span>
        )}
        <div className={`flex items-center gap-1 ${collapsed ? "w-full justify-center" : ""}`}>
          {!collapsed && (
            <button
              onClick={createSession}
              className="p-1 rounded hover:bg-secondary"
              title="New chat"
            >
              <SquarePen size={14} />
            </button>
          )}
          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className="p-1 rounded hover:bg-secondary"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>
      </div>

      {/* BODY */}
      {collapsed ? (
        <div className="flex flex-col items-center py-3">
          <button
            onClick={createSession}
            className="p-1 rounded hover:bg-secondary"
            title="New chat"
          >
            <SquarePen size={14} />
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <p className="text-xs text-muted px-4 py-3">Loading...</p>
          ) : (
            <ChatSessionList
              sessions={sessions}
              activeChatId={activeChatId}
              onSelect={onSelectChat}
              onDelete={deleteSession}
            />
          )}
        </div>
      )}
    </div>
  );
}