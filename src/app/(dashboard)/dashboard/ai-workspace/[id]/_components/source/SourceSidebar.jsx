"use client";
import { useState } from "react";
import SourceList from "./SourceList";
import UploadButton from "./UploadButton";
import { useSources } from "../../../_hooks/useSources";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SourceSidebar({ workspaceId }) {
  const { sources, loading, uploadSource } = useSources(workspaceId);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`shrink-0 border-l border-border flex flex-col h-full transition-all duration-300 ${
        collapsed ? "w-12" : "w-60"
      }`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-border">
        <div className={`flex items-center gap-1 ${collapsed ? "w-full justify-center" : ""}`}>
          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className="p-1 rounded hover:bg-secondary"
          >
            {collapsed ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
          </button>
        </div>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-muted">Sources</span>
            <UploadButton onUpload={uploadSource} />
          </div>
        )}
      </div>

      {/* BODY */}
      {collapsed ? (
        <div className="flex flex-col items-center py-3">
          <UploadButton onUpload={uploadSource} />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <p className="text-xs text-muted px-4 py-3">Loading sources...</p>
          ) : (
            <SourceList sources={sources} />
          )}
        </div>
      )}
    </div>
  );
}