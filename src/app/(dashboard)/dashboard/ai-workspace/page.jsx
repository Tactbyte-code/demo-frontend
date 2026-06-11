"use client";

import { getWorkspaces } from "@/lib/api/ai-workspace";
import { Plus, Target } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Page() {

  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  useEffect(() => {
    fetchWorkspaces();
  }, []);

  async function fetchWorkspaces() {
    try {
      const data = await getWorkspaces();

      if (Array.isArray(data)) {
        setWorkspaces(data);
      } else if (Array.isArray(data?.data)) {
        setWorkspaces(data.data);
      } else {
        setWorkspaces([]);
      }
    } catch (err) {
      console.error(err);
      setWorkspaces([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
        <div className="min-h-screen bg-background text-foreground">
          {/* HEADER */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-border">
            <div>
              <h1 className="text-lg font-bold">Workspaces</h1>
              <p className="text-xs text-muted">
                Manage your workspaces
              </p>
            </div>

            <Link href={'/dashboard/ai-workspace/create'}
              // onClick={() => setShowCampaignForm(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-primary text-white"
            >
              <Plus className="w-3.5 h-3.5" />
              Create Workspace
            </Link>
          </div>

          <div className="px-8 py-6">
              {loading ? (
                <div className="text-sm text-muted">
                  Loading workspaces...
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {workspaces.map((workspace, i) => (
                    <Link href={`/dashboard/ai-workspace/${workspace.id}`} key={workspace.id || i}>
                      <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border border-border bg-surface p-5 hover:border-primary/40 transition"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 border border-border rounded-full">
                          <Target className="w-4 h-4 text-primary" />
                        </div>

                        <span className="text-[10px] text-muted">
                          {workspace.created_at
                            ? new Date(workspace.created_at).toLocaleDateString()
                            : "—"}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold mb-1">
                        {workspace.name || "Untitled Campaign"}
                      </h3>

                      <p className="text-xs text-muted">
                        {workspace.description || "No description"}
                      </p>
                    </motion.div>
                    </Link>
                  ))}
                </div>
              )}
          </div>
        </div>
    </>
  );
}