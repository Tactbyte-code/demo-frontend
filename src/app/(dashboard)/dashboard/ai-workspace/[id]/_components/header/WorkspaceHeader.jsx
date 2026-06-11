"use client";

import { useState } from "react";
import {
  Sparkles,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  CalendarDays,
  BrainCircuit,
} from "lucide-react";

export default function WorkspaceHeader({ workspace }) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="relative shrink-0 overflow-hidden border-b border-border bg-gradient-to-b from-surface to-background">
      {/* glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(var(--primary-rgb),0.12),transparent_35%)]" />

      {/* grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative px-6 py-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          {/* LEFT */}
          <div className="min-w-0 flex-1">
            {/* top */}
            <div className="flex flex-wrap items-center gap-3">
              {/* badge */}
              <div className="flex items-center gap-1.5 border border-primary/20 bg-primary/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-primary">
                <Sparkles className="h-3 w-3" />
                AI Workspace
              </div>

              {/* title */}
              <div className="flex min-w-0 items-center gap-2">
                <h1 className="truncate text-xl font-semibold tracking-tight text-foreground">
                  {workspace?.name || "Untitled Workspace"}
                </h1>

                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted" />
              </div>
            </div>

            {/* meta row */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 border border-border bg-background px-2.5 py-1.5 text-xs text-muted">
                <CalendarDays className="h-3.5 w-3.5" />
                {workspace?.created_at
                  ? new Date(workspace.created_at).toLocaleDateString()
                  : "Recently created"}
              </div>

              <button
                onClick={() => setShowDescription(!showDescription)}
                className="flex items-center gap-1.5 border border-border bg-background px-2.5 py-1.5 text-xs text-muted transition-colors hover:bg-muted/40"
              >
                {showDescription ? (
                  <>
                    Hide Details
                    <ChevronUp className="h-3.5 w-3.5" />
                  </>
                ) : (
                  <>
                    Show Details
                    <ChevronDown className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* expandable description */}
            <div
              className={`grid transition-all duration-300 ease-out ${
                showDescription
                  ? "mt-4 grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="max-w-2xl border border-border bg-background/70 p-4 backdrop-blur-sm">
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted">
                    Description
                  </div>

                  <p className="text-sm leading-relaxed text-muted">
                    {workspace?.description ||
                      "AI-powered workspace for research, generation, automation, and collaborative workflows."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3">
            <div className="min-w-[120px] border border-border bg-background px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted">
                Status
              </p>

              <div className="mt-1 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />

                <span className="text-sm font-medium">Active</span>
              </div>
            </div>

            <div className="hidden min-w-[140px] border border-border bg-background px-4 py-3 sm:block">
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted">
                AI Model
              </p>

              <p className="mt-1 text-sm font-medium">Sarvam 105B</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}