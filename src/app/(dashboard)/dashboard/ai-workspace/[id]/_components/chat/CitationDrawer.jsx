import { X } from "lucide-react";

export default function CitationDrawer({ citation, onClose }) {
  return (
    <div className="w-72 shrink-0 border-l border-border flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <span className="text-xs font-bold truncate">{citation.filename}</span>
        <button onClick={onClose} className="p-1 hover:bg-secondary rounded">
          <X size={14} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <p className="text-xs text-muted leading-relaxed">{citation.excerpt}</p>
      </div>
    </div>
  );
}