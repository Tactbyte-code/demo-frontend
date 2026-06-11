import ChatSessionItem from "./ChatSessionItem";

export default function ChatSessionList({ sessions, activeChatId, onSelect }) {
  if (!sessions || sessions.length === 0) {
    return (
      <p className="text-xs text-muted px-4 py-2">No chats yet. Start a new one.</p>
    );
  }

  const grouped = groupByDate(sessions);

  return (
    <ul className="flex flex-col pb-2">
      {Object.entries(grouped).map(([label, items]) => (
        <li key={label}>
          <p className="text-xs text-muted px-4 py-1.5 font-medium">{label}</p>
          {items.map((session) => (
            <ChatSessionItem
              key={session.id}
              session={session}
              active={session.id === activeChatId}
              onSelect={onSelect}
            />
          ))}
        </li>
      ))}
    </ul>
  );
}

function groupByDate(sessions) {
  const now = new Date();
  const groups = { Today: [], Yesterday: [], "Previous 7 days": [], Older: [] };

  sessions.forEach((s) => {
    const d = new Date(s.created_at);
    const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24));
    if (diff === 0) groups["Today"].push(s);
    else if (diff === 1) groups["Yesterday"].push(s);
    else if (diff <= 7) groups["Previous 7 days"].push(s);
    else groups["Older"].push(s);
  });

  // drop empty groups
  return Object.fromEntries(Object.entries(groups).filter(([, v]) => v.length > 0));
}