export default function CitationChip({ index, citation, onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-background border border-border hover:bg-secondary"
    >
      [{index}] {citation.filename}
    </button>
  );
}