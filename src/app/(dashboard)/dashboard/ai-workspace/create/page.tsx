"use client";

import { createWorkspace } from "@/lib/api/ai-workspace";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await createWorkspace(form);

      console.log(res);

      // window.location.href = "/dashboard/ai-workspace";
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-border px-8 py-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/ai-workspace"
            className="flex h-10 w-10 items-center justify-center border border-border hover:border-primary/40 transition"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div>
            <h1 className="text-lg font-bold">Create Workspace</h1>
            <p className="text-xs text-muted">
              Create a new AI workspace
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs text-muted border border-border px-3 py-2">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          AI Workspace
        </div>
      </div>

      {/* FORM */}
      <div className="px-8 py-8">
        <div className="max-w-2xl border border-border bg-surface">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* NAME */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-3">
                Workspace Name
              </label>

              <input
                type="text"
                required
                placeholder="Enter workspace name"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary transition"
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-3">
                Description
              </label>

              <textarea
                rows={5}
                placeholder="Describe this workspace..."
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full resize-none border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary transition"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Link
                href="/dashboard/ai-workspace"
                className="border border-border px-5 py-3 text-xs font-bold hover:border-primary/40 transition"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-primary px-5 py-3 text-xs font-bold text-white disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
                    Create Workspace
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}