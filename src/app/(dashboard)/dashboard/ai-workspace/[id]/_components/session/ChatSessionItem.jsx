import { MessageSquare } from "lucide-react";

export default function ChatSessionItem({ session, active, onSelect }) {
  return (
    <button
      onClick={() => onSelect(session.id)}
      className={`w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-secondary transition-colors ${
        active ? "bg-secondary" : ""
      }`}
    >
      <MessageSquare size={13} className="text-muted shrink-0" />
      <span className="text-xs truncate flex-1">
        {session.title || "Untitled chat"}
      </span>
    </button>
  );
}