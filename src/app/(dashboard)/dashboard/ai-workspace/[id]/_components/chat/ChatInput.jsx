"use client";
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  // auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  }

  return (
    <div className="shrink-0 px-4 py-4">
      <div
        className={`flex items-end gap-3 rounded-xl border bg-background px-4 py-3 transition-colors ${
          disabled
            ? "border-border opacity-60"
            : "border-border hover:border-muted focus-within:border-foreground"
        }`}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about your sources..."
          disabled={disabled}
          className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted leading-relaxed"
          style={{ minHeight: "24px", maxHeight: "160px", overflowY: "auto" }}
        />
        <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        className={`shrink-0 p-2 rounded-lg transition-all ${
            value.trim() && !disabled
            ? "bg-foreground text-background hover:opacity-80"
            : "bg-secondary text-muted opacity-40 cursor-not-allowed"
        }`}
        >
        <Send size={14} />
        </button>
      </div>
      <p className="text-xs text-muted mt-2 text-center">
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  );
}