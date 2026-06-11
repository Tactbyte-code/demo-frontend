import SourceItem from "./SourceItem";

export default function SourceList({ sources }) {
  if (!sources || sources.length === 0) {
    return (
      <p className="text-xs text-muted px-4 py-3">No sources yet. Upload a file to get started.</p>
    );
  }

  return (
    <ul className="flex flex-col py-2">
      {sources.map((source) => (
        <SourceItem key={source.id} source={source} />
      ))}
    </ul>
  );
}