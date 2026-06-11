import { useRef } from "react";
import { Plus } from "lucide-react";

export default function UploadButton({ onUpload, iconOnly = false }) {
  const inputRef = useRef(null);

  function handleChange(e) {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
    e.target.value = "";
  }

  return (
    <>
      <button
        onClick={() => inputRef.current?.click()}
        className="p-1 rounded hover:bg-secondary"
        title="Upload source"
      >
        <Plus size={14} />
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.txt,.docx"
        className="hidden"
        onChange={handleChange}
      />
    </>
  );
}