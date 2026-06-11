import CitationChip from "./CitationChip";

export default function ChatMessage({ message, onCitationClick }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] rounded-lg px-4 py-2 text-sm ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-foreground"
        }`}
      >
        <p>{message.content}</p>
        {message.citations?.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {message.citations.map((citation, i) => (
              <CitationChip
                key={i}
                index={i + 1}
                citation={citation}
                onClick={() => onCitationClick(citation)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}