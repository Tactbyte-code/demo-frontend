"use client";
import { MessageSquare, Trash2 } from "lucide-react";
import { useState } from "react";

export default function ChatSessionItem({ session, active, onSelect, onDelete }) {
  const [hovered, setHovered] = useState(false);

  function handleDelete(e) {
    e.stopPropagation();
    onDelete(session.id);
  }

  return (
    <button
      onClick={() => onSelect(session.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-secondary transition-colors group ${
        active ? "bg-secondary" : ""
      }`}
    >
      <MessageSquare size={13} className="text-muted shrink-0" />
      <span className="text-xs truncate flex-1">
        {session.title || "Untitled chat"}
      </span>
      {(hovered || active) && (
        <span
          role="button"
          onClick={handleDelete}
          className="shrink-0 p-0.5 rounded hover:bg-background text-muted hover:text-red-500 transition-colors"
        >
          <Trash2 size={12} />
        </span>
      )}
    </button>
  );
}