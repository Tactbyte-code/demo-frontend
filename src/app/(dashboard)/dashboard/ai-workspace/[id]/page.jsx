"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getWorkspace } from "@/lib/api/ai-workspace";
import WorkspaceHeader from "./_components/header/WorkspaceHeader";
import SessionSidebar from "./_components/session/SessionSidebar";
import ChatPanel from "./_components/chat/ChatPanel";
import SourceSidebar from "./_components/source/SourceSidebar";

export default function Page() {
  const { id } = useParams();
  const [workspace, setWorkspace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeChatId, setActiveChatId] = useState(null);

  useEffect(() => {
    fetchWorkspace();
  }, [id]);

  async function fetchWorkspace() {
    try {
      const res = await getWorkspace(id);
      setWorkspace(res);
    } catch (err) {
      console.error(err);
      setWorkspace(null);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-muted">
        Loading...
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-muted">
        Workspace not found.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <WorkspaceHeader workspace={workspace} />
      <div className="flex flex-1 overflow-hidden">
        <SessionSidebar
          workspaceId={id}
          activeChatId={activeChatId}
          onSelectChat={setActiveChatId}
        />
        <ChatPanel workspaceId={id} chatId={activeChatId} />
        <SourceSidebar workspaceId={id} />
      </div>
    </div>
  );
}