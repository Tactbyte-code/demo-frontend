"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  Send,
  ChevronLeft,
  Plus,
  Loader2,
  CheckCircle2,
  Clock,
  Ticket,
  HeadphonesIcon,
  Inbox,
  Lock,
  Check,
  WifiOff,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { auth } from "@/lib/firebase";

const API = process.env.NEXT_PUBLIC_API_URL;

const defer = (fn) => {
  const id = globalThis.setTimeout(fn, 0);
  return () => globalThis.clearTimeout(id);
};

const statusMeta = {
  open: { label: "Open", color: "#22c55e" },
  in_progress: { label: "In Progress", color: "#f59e0b" },
  closed: { label: "Closed", color: "#94a3b8" },
};

// ─── Mobile detection hook ────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

function StatusBadge({ status }) {
  const m = statusMeta[status] || statusMeta.open;
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
      style={{
        background: `${m.color}20`,
        color: m.color,
        border: `1px solid ${m.color}40`,
      }}
    >
      {m.label}
    </span>
  );
}

function fmt(iso) {
  return new Date(iso).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getSubjectPlaceholder(team) {
  if (!team) return "Brief summary of your issue… (optional)";
  const slug = (team.slug || "").toLowerCase();
  if (slug === "auth") return "e.g. Can't log in, password reset not working…";
  if (slug === "ai" || slug === "ai-team")
    return "e.g. AI giving wrong results, slow responses…";
  if (slug === "payment" || slug === "payments")
    return "e.g. Payment failed, charged twice, refund…";
  return "Brief summary of your issue… (optional)";
}

function getMessagePlaceholder(team) {
  if (!team) return "Tell us what's happening…";
  const slug = (team.slug || "").toLowerCase();
  if (slug === "auth") return "Describe your authentication issue in detail…";
  if (slug === "ai" || slug === "ai-team")
    return "Describe the AI issue — what query ran and what was unexpected?";
  if (slug === "payment" || slug === "payments")
    return "Describe your payment issue — include any error messages.";
  return "Tell us what's happening — the more detail, the faster we can help!";
}

async function getAuthHeaders() {
  const token = await auth.currentUser?.getIdToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function getReplyKey(reply) {
  return [
    reply?.is_admin ?? 0,
    reply?.reply_type || "message",
    (reply?.message || "").trim(),
  ].join("|");
}

function mergeReplies(localReplies = [], incomingReplies = []) {
  const seenKeys = new Set();
  const seenIds = new Set();
  const merged = [];

  for (const r of incomingReplies || []) {
    if (!r) continue;
    merged.push(r);
    if (r.id != null) seenIds.add(String(r.id));
    seenKeys.add(getReplyKey(r));
  }

  for (const local of localReplies || []) {
    if (!local) continue;
    const localId = local.id != null ? String(local.id) : null;
    const localKey = getReplyKey(local);
    const exists = (localId && seenIds.has(localId)) || seenKeys.has(localKey);
    if (!exists && (local.pending || local._optimistic)) {
      merged.push(local);
    }
  }

  return merged.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );
}

function mergeTicketState(prev, incoming) {
  if (!prev) return incoming;
  const prevMs = prev.updated_at ? new Date(prev.updated_at).getTime() : 0;
  const incomingMs = incoming.updated_at
    ? new Date(incoming.updated_at).getTime()
    : 0;
  const base = incomingMs >= prevMs ? incoming : prev;
  return {
    ...base,
    ...incoming,
    replies: mergeReplies(prev.replies || [], incoming.replies || []),
  };
}

function openSSE(url, getHeaders, onEvent, onStatusChange) {
  const controller = new AbortController();
  let retryMs = 1000;
  let hasConnected = false;
  let retryTimer = null;

  const scheduleReconnect = () => {
    if (controller.signal.aborted) return;
    retryTimer = globalThis.setTimeout(connect, retryMs);
  };

  controller.signal.addEventListener("abort", () => {
    if (retryTimer) {
      globalThis.clearTimeout(retryTimer);
      retryTimer = null;
    }
  });

  async function connect() {
    if (controller.signal.aborted) return;
    onStatusChange(hasConnected ? "reconnecting" : "connecting");
    try {
      const headers = await getHeaders();
      const res = await fetch(url, { headers, signal: controller.signal });
      if (!res.ok) throw new Error(`SSE HTTP ${res.status}`);
      if (!res.body) throw new Error("SSE response has no body");

      retryMs = 1000;
      hasConnected = true;
      onStatusChange("live");

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const parts = buf.split("\n\n");
        buf = parts.pop() || "";
        for (const part of parts) {
          const dataLine = part.split("\n").find((l) => l.startsWith("data: "));
          if (!dataLine) continue;
          try {
            const event = JSON.parse(dataLine.slice(6));
            if (event.type !== "heartbeat") onEvent(event);
          } catch {
            // ignore malformed JSON
          }
        }
      }

      if (!controller.signal.aborted) {
        onStatusChange("reconnecting");
        scheduleReconnect();
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      onStatusChange("reconnecting");
      retryMs = Math.min(retryMs * 2, 15000);
      if (!controller.signal.aborted) scheduleReconnect();
    }
  }

  connect();
  return controller;
}

function SseIndicator({ status, muted = false }) {
  const mutedColor = muted ? "var(--sidebar-muted)" : "var(--text-muted)";
  if (status === "live") {
    return (
      <>
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
        </span>
        <span className="text-[9px]" style={{ color: mutedColor }}>
          Live
        </span>
      </>
    );
  }
  if (status === "connecting") {
    return (
      <>
        <Loader2
          size={9}
          className="animate-spin"
          style={{ color: "#38bdf8" }}
        />
        <span className="text-[9px]" style={{ color: "#38bdf8" }}>
          Connecting…
        </span>
      </>
    );
  }
  return (
    <>
      <WifiOff size={9} style={{ color: "#f59e0b" }} />
      <span className="text-[9px]" style={{ color: "#f59e0b" }}>
        Reconnecting…
      </span>
    </>
  );
}

function AgentViewingIndicator({ agentName }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-2"
    >
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[8px] font-black text-white"
        style={{ background: "var(--primary)" }}
      >
        {(agentName || "S")[0].toUpperCase()}
      </div>
      <div
        className="flex items-center gap-1 px-3 py-2 rounded-2xl"
        style={{
          background: "color-mix(in srgb, var(--primary) 10%, transparent)",
          border:
            "1px solid color-mix(in srgb, var(--primary) 20%, transparent)",
          borderTopLeftRadius: 4,
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--primary)" }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
      <span className="text-[9px]" style={{ color: "var(--sidebar-muted)" }}>
        {agentName ? `${agentName} is viewing…` : "Support is viewing…"}
      </span>
    </motion.div>
  );
}

function MessageBubble({
  isAdmin,
  message,
  time,
  label,
  pending = false,
  sent = false,
}) {
  return (
    <div
      className={`flex flex-col gap-1 ${isAdmin ? "items-start" : "items-end"}`}
    >
      <span
        className="text-[9px] font-bold uppercase tracking-widest px-1"
        style={{ color: "var(--sidebar-muted)" }}
      >
        {label}
      </span>
      <div
        className="max-w-[82%] px-3 py-2 rounded-2xl text-sm leading-relaxed"
        style={
          isAdmin
            ? {
                background:
                  "color-mix(in srgb, var(--primary) 10%, transparent)",
                border:
                  "1px solid color-mix(in srgb, var(--primary) 20%, transparent)",
                color: "var(--text-main)",
                borderTopLeftRadius: 4,
              }
            : {
                background: pending
                  ? "color-mix(in srgb, var(--primary) 60%, transparent)"
                  : "var(--primary)",
                color: "white",
                borderTopRightRadius: 4,
                opacity: pending ? 0.75 : 1,
              }
        }
      >
        {message}
      </div>
      <div className="flex items-center gap-1 px-1">
        <span className="text-[9px]" style={{ color: "var(--sidebar-muted)" }}>
          {fmt(time)}
        </span>
        {!isAdmin && pending && (
          <Clock
            size={9}
            style={{ color: "var(--sidebar-muted)" }}
            className="opacity-60"
          />
        )}
        {!isAdmin && !pending && sent && (
          <span
            className="flex items-center gap-0.5 text-[9px] font-semibold"
            style={{ color: "#22c55e" }}
          >
            <Check size={9} strokeWidth={3} />
            <Check size={9} strokeWidth={3} style={{ marginLeft: -4 }} />
            Sent
          </span>
        )}
      </div>
    </div>
  );
}

function ForwardedNote({ reply }) {
  return (
    <div className="flex justify-center">
      <span
        className="text-[9px] px-3 py-1 rounded-full font-semibold"
        style={{
          background: "color-mix(in srgb, #f59e0b 12%, transparent)",
          color: "#f59e0b",
          border: "1px solid color-mix(in srgb, #f59e0b 25%, transparent)",
        }}
      >
        {reply.message}
      </span>
    </div>
  );
}

// ─── Waiting auto-message shown until first admin reply ───────────────────────
function WaitingMessage({ userName }) {
  return (
    <motion.div
      key="waiting-banner"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col gap-1 items-start"
    >
      <span
        className="text-[9px] font-bold uppercase tracking-widest px-1"
        style={{ color: "var(--sidebar-muted)" }}
      >
        Support
      </span>
      <div className="flex items-start gap-2 max-w-[82%]">
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[8px] font-black text-white mt-0.5"
          style={{ background: "var(--primary)" }}
        >
          S
        </div>
        <div
          className="px-3 py-2 rounded-2xl text-sm leading-relaxed"
          style={{
            background: "color-mix(in srgb, var(--primary) 10%, transparent)",
            border:
              "1px solid color-mix(in srgb, var(--primary) 20%, transparent)",
            color: "var(--text-main)",
            borderTopLeftRadius: 4,
          }}
        >
          Hi <span className="font-semibold">{userName || "there"}</span>, our
          executives are currently engaged. One of our team members will connect
          with you shortly.
        </div>
      </div>
      <div className="flex items-center gap-1 px-6">
        <Loader2
          size={9}
          className="animate-spin"
          style={{ color: "var(--sidebar-muted)" }}
        />
        <span className="text-[9px]" style={{ color: "var(--sidebar-muted)" }}>
          Waiting for a team member…
        </span>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared inner panel content
// ─────────────────────────────────────────────────────────────────────────────
function PanelContent({
  view,
  setView,
  tickets,
  activeTicket,
  loading,
  sending,
  msg,
  setMsg,
  newSubject,
  setNewSubject,
  newMsg,
  setNewMsg,
  newTeam,
  creating,
  teams,
  teamsLoading,
  sseStatus,
  agentViewing,
  agentViewingName,
  bottomRef,
  inputRef,
  handleClose,
  openTicket,
  sendReply,
  createTicket,
  raiseNewTicket,
  disconnectSSE,
  isMobile,
}) {
  return (
    <>
      {/* ── Header ── */}
      <div
        className="flex items-center justify-between px-4 shrink-0"
        style={{
          paddingTop: isMobile ? 12 : 12,
          paddingBottom: 12,
          borderBottom: "1px solid var(--sidebar-border)",
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--primary) 10%, transparent), color-mix(in srgb, var(--accent) 8%, transparent))",
          borderRadius: isMobile ? "20px 20px 0 0" : undefined,
        }}
      >
        {isMobile && (
          <div
            className="absolute top-2.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full"
            style={{ background: "var(--sidebar-border)" }}
          />
        )}

        <div className="flex items-center gap-2.5">
          {view !== "list" && (
            <button
              onClick={() => {
                disconnectSSE();
                setView("list");
              }}
              className="p-1 rounded-md hover:bg-white/10 transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              <ChevronLeft size={16} />
            </button>
          )}
          <HeadphonesIcon size={16} style={{ color: "var(--primary)" }} />
          <span
            className="text-sm font-bold"
            style={{ color: "var(--text-main)" }}
          >
            {view === "list"
              ? "Support"
              : view === "new"
                ? "New Ticket"
                : activeTicket?.ticket_id || "Chat"}
          </span>
          {view === "chat" && activeTicket && (
            <StatusBadge status={activeTicket.status} />
          )}
        </div>

        <div className="flex items-center gap-2">
          {view === "chat" && activeTicket?.status !== "closed" && (
            <span className="flex items-center gap-1">
              <SseIndicator status={sseStatus} muted />
            </span>
          )}
          {view === "list" && (
            <button
              onClick={raiseNewTicket}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold transition-all"
              style={{ background: "var(--primary)", color: "white" }}
            >
              <Plus size={12} /> New
            </button>
          )}
          <button
            onClick={handleClose}
            className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* LIST VIEW */}
        {view === "list" && (
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2
                  size={22}
                  className="animate-spin"
                  style={{ color: "var(--primary)" }}
                />
              </div>
            ) : tickets.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-3 py-8">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background:
                      "color-mix(in srgb, var(--primary) 12%, transparent)",
                  }}
                >
                  <Inbox size={24} style={{ color: "var(--primary)" }} />
                </div>
                <p
                  className="text-xs font-semibold text-center"
                  style={{ color: "var(--text-muted)" }}
                >
                  No tickets yet.
                  <br />
                  Raise one if you need help!
                </p>
                <button
                  onClick={raiseNewTicket}
                  className="px-4 py-2 rounded-lg text-xs font-bold transition-all"
                  style={{ background: "var(--primary)", color: "white" }}
                >
                  + Raise a Ticket
                </button>
              </div>
            ) : (
              tickets.map((t) => {
                const lastReply = t.replies?.[t.replies.length - 1];
                const hasAdminReply = t.replies?.some((r) => r.is_admin === 1);
                const preview = lastReply
                  ? (lastReply.is_admin ? "Support: " : "You: ") +
                    lastReply.message.slice(0, 40)
                  : t.message.slice(0, 40);
                const tooLong = (lastReply?.message || t.message).length > 40;
                return (
                  <button
                    key={t.id}
                    onClick={() => openTicket(t)}
                    className="w-full text-left rounded-xl p-3 transition-all"
                    style={{
                      background:
                        "color-mix(in srgb, var(--primary) 5%, transparent)",
                      border: "1px solid var(--sidebar-border)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span
                        className="text-xs font-bold truncate flex-1"
                        style={{ color: "var(--text-main)" }}
                      >
                        {t.subject}
                      </span>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {hasAdminReply && (
                          <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                        )}
                        <StatusBadge status={t.status} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[10px] truncate max-w-[70%]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {preview}
                        {tooLong ? "…" : ""}
                      </span>
                      <span
                        className="text-[9px] shrink-0 ml-2"
                        style={{ color: "var(--sidebar-muted)" }}
                      >
                        {fmt(t.updated_at)}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        )}

        {/* NEW TICKET VIEW */}
        {view === "new" && (
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            <div>
              <label
                className="block text-[10px] font-bold uppercase tracking-widest mb-1.5"
                style={{ color: "var(--sidebar-muted)" }}
              >
                Subject
              </label>
              <input
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder={getSubjectPlaceholder(newTeam)}
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                style={{
                  background:
                    "color-mix(in srgb, var(--primary) 6%, transparent)",
                  border: "1px solid var(--sidebar-border)",
                  color: "var(--text-main)",
                }}
              />
            </div>
            <div className="flex-1">
              <label
                className="block text-[10px] font-bold uppercase tracking-widest mb-1.5"
                style={{ color: "var(--sidebar-muted)" }}
              >
                Describe your issue
              </label>
              <textarea
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                placeholder={getMessagePlaceholder(newTeam)}
                rows={5}
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none resize-none"
                style={{
                  background:
                    "color-mix(in srgb, var(--primary) 6%, transparent)",
                  border: "1px solid var(--sidebar-border)",
                  color: "var(--text-main)",
                }}
              />
            </div>
            <button
              onClick={() => void createTicket()}
              disabled={
                !newMsg.trim() ||
                !newTeam ||
                creating ||
                teamsLoading ||
                !newSubject.trim()
              }
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all disabled:opacity-50"
              style={{ background: "var(--primary)", color: "white" }}
            >
              {creating ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <Send size={15} />
              )}
              {creating ? "Raising ticket…" : "Submit Ticket"}
            </button>
          </div>
        )}

        {/* CHAT VIEW */}
        {view === "chat" && activeTicket && (
          <>
            <div
              className="px-4 py-2 shrink-0 flex items-center gap-2"
              style={{
                borderBottom: "1px solid var(--sidebar-border)",
                background:
                  "color-mix(in srgb, var(--primary) 4%, transparent)",
              }}
            >
              <Ticket size={11} style={{ color: "var(--sidebar-muted)" }} />
              <span
                className="text-[10px] font-mono"
                style={{ color: "var(--sidebar-muted)" }}
              >
                {activeTicket.ticket_id} · {activeTicket.assigned_team} team
              </span>
              {activeTicket.status !== "closed" && (
                <span className="ml-auto flex items-center gap-1">
                  <SseIndicator status={sseStatus} muted />
                </span>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              <MessageBubble
                isAdmin={false}
                message={activeTicket.message}
                time={activeTicket.created_at}
                label="You"
                pending={false}
                sent={true}
              />

              {/* ── Auto-waiting message: visible until first admin reply ── */}
              <AnimatePresence>
                {!activeTicket.replies?.some((r) => r.is_admin === 1) && (
                  <WaitingMessage userName={activeTicket.user_name} />
                )}
              </AnimatePresence>

              {activeTicket.replies?.map((r) =>
                r.reply_type === "forwarded" ? (
                  <ForwardedNote key={r.id} reply={r} />
                ) : (
                  <MessageBubble
                    key={r.id}
                    isAdmin={r.is_admin === 1}
                    message={r.message}
                    time={r.created_at}
                    label={r.is_admin === 1 ? "Support" : "You"}
                    pending={r.pending === true}
                    sent={!r.pending && r.is_admin === 0}
                  />
                ),
              )}
              <AnimatePresence>
                {agentViewing && activeTicket.status !== "closed" && (
                  <AgentViewingIndicator agentName={agentViewingName} />
                )}
              </AnimatePresence>
              {activeTicket.status === "closed" && (
                <div className="flex flex-col items-center gap-3 py-4">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full"
                    style={{
                      background: "rgba(34,197,94,0.12)",
                      border: "1px solid rgba(34,197,94,0.25)",
                    }}
                  >
                    <CheckCircle2 size={22} style={{ color: "#22c55e" }} />
                  </div>
                  <div className="text-center">
                    <p
                      className="text-xs font-bold mb-1"
                      style={{ color: "#22c55e" }}
                    >
                      Ticket Resolved
                    </p>
                    <p
                      className="text-[10px] leading-relaxed"
                      style={{ color: "var(--sidebar-muted)" }}
                    >
                      This ticket has been closed by our support team.
                      <br />
                      We hope your issue was fully resolved!
                    </p>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {activeTicket.status !== "closed" ? (
              <div
                className="shrink-0 px-3 py-3"
                style={{ borderTop: "1px solid var(--sidebar-border)" }}
              >
                <div
                  className="flex items-end gap-2 rounded-xl px-3 py-2"
                  style={{
                    background:
                      "color-mix(in srgb, var(--primary) 6%, transparent)",
                    border: "1px solid var(--sidebar-border)",
                  }}
                >
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        void sendReply();
                      }
                    }}
                    placeholder="Type a message…"
                    className="flex-1 resize-none text-sm bg-transparent outline-none"
                    style={{ color: "var(--text-main)", maxHeight: 80 }}
                  />
                  <button
                    onClick={() => void sendReply()}
                    disabled={!msg.trim() || sending}
                    className="p-2 rounded-lg transition-all disabled:opacity-40 shrink-0"
                    style={{ background: "var(--primary)", color: "white" }}
                  >
                    {sending ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Send size={14} />
                    )}
                  </button>
                </div>
                <p
                  className="text-[9px] mt-1 text-center"
                  style={{ color: "var(--sidebar-muted)" }}
                >
                  Enter to send · Shift+Enter for newline
                </p>
              </div>
            ) : (
              <div
                className="shrink-0 flex items-center justify-center gap-1.5 py-2.5"
                style={{ borderTop: "1px solid var(--sidebar-border)" }}
              >
                <Lock size={10} style={{ color: "var(--sidebar-muted)" }} />
                <span
                  className="text-[10px]"
                  style={{ color: "var(--sidebar-muted)" }}
                >
                  Replies are locked for closed tickets
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TicketChatPopup
// ─────────────────────────────────────────────────────────────────────────────
export default function TicketChatPopup({
  open,
  setOpen,
  hasUnread,
  setHasUnread,
  closeSidebar,
}) {
  const isMobile = useIsMobile();

  const [view, setView] = useState("list");
  const [tickets, setTickets] = useState([]);
  const [activeTicket, setActive] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState("");
  const [userEmail, setUserEmail] = useState(null);
  const [userName, setUserName] = useState(null);
  const [newSubject, setNewSubject] = useState("");
  const [newMsg, setNewMsg] = useState("");
  const [newTeam, setNewTeam] = useState(null);
  const [creating, setCreating] = useState(false);
  const [teams, setTeams] = useState([]);
  const [teamsLoading, setTeamsLoading] = useState(false);
  const [sseStatus, setSseStatus] = useState("connecting");
  const [agentViewing, setAgentViewing] = useState(false);
  const [agentViewingName, setAgentViewingName] = useState(null);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const openRef = useRef(open);
  const sseControllerRef = useRef(null);
  const agentViewingTimer = useRef(null);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Auto-close sidebar on mobile when drawer opens
  useEffect(() => {
    if (open && isMobile && typeof closeSidebar === "function") {
      closeSidebar();
    }
  }, [open, isMobile, closeSidebar]);

  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobile && open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isMobile, open]);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      if (u) {
        setUserEmail(u.email);
        setUserName(u.displayName || u.email?.split("@")[0] || "User");
      } else {
        setUserEmail(null);
        setUserName(null);
      }
    });
    return unsub;
  }, []);

  const loadTickets = useCallback(
    async (silent = false) => {
      if (!userEmail) return [];
      if (!silent) setLoading(true);
      try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${API}/user/tickets/`, {
          headers,
          cache: "no-store",
        });

        if (!res.ok) {
          if (!silent) setLoading(false);
          return [];
        }

        const data = await res.json();
        const list = Array.isArray(data) ? data : [];
        const sorted = [...list].sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
        );

        setTickets(sorted);

        setActive((prev) => {
          if (!prev) return prev;
          const fresh = sorted.find((t) => String(t.id) === String(prev.id));
          if (!fresh) return prev;
          return mergeTicketState(prev, fresh);
        });

        setHasUnread(() => {
          if (openRef.current) return false;
          return sorted.some((t) => t.replies?.some((r) => r.is_admin === 1));
        });

        return sorted;
      } catch {
        return [];
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [userEmail, setHasUnread],
  );

  const applyTicketUpdate = useCallback(
    (incoming) => {
      setActive((prev) => {
        if (!prev || String(prev.id) !== String(incoming.id)) return prev;
        return mergeTicketState(prev, incoming);
      });
      setTickets((prev) => {
        const exists = prev.some((t) => String(t.id) === String(incoming.id));
        if (!exists) return [incoming, ...prev];
        return [...prev]
          .map((t) =>
            String(t.id) === String(incoming.id)
              ? mergeTicketState(t, incoming)
              : t,
          )
          .sort(
            (a, b) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime(),
          );
      });
      setHasUnread(() => {
        if (openRef.current) return false;
        return incoming.replies?.some((r) => r.is_admin === 1) ?? false;
      });
    },
    [setHasUnread],
  );

  const connectSSE = useCallback(
    (ticketId) => {
      sseControllerRef.current?.abort();
      sseControllerRef.current = null;
      setSseStatus("connecting");

      const url = `${API}/user/tickets/${ticketId}/stream`;
      sseControllerRef.current = openSSE(
        url,
        getAuthHeaders,
        (event) => {
          if (event.type === "init") {
            setActive((prev) => {
              if (!prev || String(prev.id) !== String(event.ticket.id))
                return event.ticket;
              const prevMs = prev.updated_at
                ? new Date(prev.updated_at).getTime()
                : 0;
              const initMs = event.ticket.updated_at
                ? new Date(event.ticket.updated_at).getTime()
                : 0;
              if (initMs <= prevMs) return prev;
              return mergeTicketState(prev, event.ticket);
            });
            setTickets((prev) => {
              const t = event.ticket;
              const exists = prev.some((x) => String(x.id) === String(t.id));
              if (!exists) return [t, ...prev];
              return [...prev]
                .map((x) =>
                  String(x.id) === String(t.id) ? mergeTicketState(x, t) : x,
                )
                .sort(
                  (a, b) =>
                    new Date(b.updated_at).getTime() -
                    new Date(a.updated_at).getTime(),
                );
            });
            setHasUnread(() => {
              if (openRef.current) return false;
              return (
                event.ticket.replies?.some((r) => r.is_admin === 1) ?? false
              );
            });
          } else if (event.type === "ticket_update") {
            applyTicketUpdate(event.ticket);
          } else if (event.type === "agent_viewing") {
            setAgentViewing(true);
            setAgentViewingName(event.agent_name ?? null);
            if (agentViewingTimer.current)
              globalThis.clearTimeout(agentViewingTimer.current);
            agentViewingTimer.current = globalThis.setTimeout(() => {
              setAgentViewing(false);
              setAgentViewingName(null);
            }, 8000);
          } else if (event.type === "agent_left") {
            setAgentViewing(false);
            setAgentViewingName(null);
            if (agentViewingTimer.current) {
              globalThis.clearTimeout(agentViewingTimer.current);
              agentViewingTimer.current = null;
            }
          }
        },
        (status) => setSseStatus(status),
      );
    },
    [applyTicketUpdate, setHasUnread],
  );

  const disconnectSSE = useCallback(() => {
    sseControllerRef.current?.abort();
    sseControllerRef.current = null;
    setSseStatus("connecting");
    setAgentViewing(false);
    setAgentViewingName(null);
    if (agentViewingTimer.current) {
      globalThis.clearTimeout(agentViewingTimer.current);
      agentViewingTimer.current = null;
    }
  }, []);

  useEffect(() => {
    const shouldConnect = view === "chat" && !!activeTicket?.id && !!userEmail;
    if (shouldConnect) {
      const cancel = defer(() => connectSSE(activeTicket.id));
      return () => {
        cancel();
        disconnectSSE();
      };
    }
    const cancel = defer(() => disconnectSSE());
    return cancel;
  }, [view, activeTicket?.id, userEmail, connectSSE, disconnectSSE]);

  useEffect(() => {
    if (!open || !userEmail) return;
    return defer(() => {
      void loadTickets();
    });
  }, [open, userEmail, loadTickets]);

  useEffect(() => {
    if (!open || !userEmail) return;
    const interval = globalThis.setInterval(() => {
      void loadTickets(true);
    }, 1000);
    return () => globalThis.clearInterval(interval);
  }, [open, userEmail, loadTickets]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeTicket?.replies?.length, agentViewing]);

  useEffect(() => {
    if (view !== "chat") return;
    const t = globalThis.setTimeout(() => inputRef.current?.focus(), 150);
    return () => globalThis.clearTimeout(t);
  }, [view]);

  const fetchTeams = useCallback(async () => {
    setTeamsLoading(true);
    try {
      const res = await fetch(`${API}/user/tickets/teams/active`, {
        cache: "no-store",
      });
      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      setTeams(list);
      if (list.length > 0) setNewTeam(list[0]);
    } catch {
      /* swallow */
    } finally {
      setTeamsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (view !== "new" || teams.length > 0) return;
    return defer(() => {
      void fetchTeams();
    });
  }, [view, teams.length, fetchTeams]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setHasUnread(false);
    disconnectSSE();
  }, [setOpen, setHasUnread, disconnectSSE]);

  const openTicket = useCallback((t) => {
    setActive(t);
    setView("chat");
  }, []);

  const sendReply = useCallback(async () => {
    if (!msg.trim() || !activeTicket || sending) return;
    const ticketId = activeTicket.id;
    const msgToSend = msg.trim();
    const tempId = `temp-${Date.now()}`;
    const now = new Date().toISOString();

    const pendingReply = {
      id: tempId,
      ticket_id: ticketId,
      message: msgToSend,
      is_admin: 0,
      reply_type: "message",
      created_at: now,
      pending: true,
      _optimistic: true,
    };

    setMsg("");
    setActive((prev) =>
      prev
        ? {
            ...prev,
            replies: [...(prev.replies || []), pendingReply],
            updated_at: now,
          }
        : prev,
    );
    setTickets((prev) =>
      [...prev].map((t) =>
        String(t.id) === String(ticketId)
          ? {
              ...t,
              updated_at: now,
              replies: [...(t.replies || []), pendingReply],
            }
          : t,
      ),
    );

    setSending(true);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${API}/user/tickets/${ticketId}/reply`, {
        method: "POST",
        headers,
        body: JSON.stringify({ message: msgToSend }),
      });
      if (!res.ok) throw new Error("Failed to send reply");

      const data = await res.json().catch(() => null);
      if (data && typeof data === "object") {
        setActive((prev) => {
          if (!prev || String(prev.id) !== String(ticketId)) return prev;
          return mergeTicketState(prev, data);
        });
        setTickets((prev) =>
          [...prev]
            .map((t) =>
              String(t.id) === String(ticketId) ? mergeTicketState(t, data) : t,
            )
            .sort(
              (a, b) =>
                new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime(),
            ),
        );
      }

      const latestTickets = await loadTickets(true);
      const latest = latestTickets.find(
        (t) => String(t.id) === String(ticketId),
      );
      if (latest) {
        setActive((prev) => {
          if (!prev || String(prev.id) !== String(ticketId)) return prev;
          return mergeTicketState(prev, latest);
        });
        setTickets((prev) =>
          [...prev]
            .map((t) =>
              String(t.id) === String(ticketId)
                ? mergeTicketState(t, latest)
                : t,
            )
            .sort(
              (a, b) =>
                new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime(),
            ),
        );
      }
    } catch {
      setActive((prev) =>
        prev
          ? {
              ...prev,
              replies: (prev.replies || []).filter((r) => r.id !== tempId),
            }
          : prev,
      );
      setTickets((prev) =>
        prev.map((t) =>
          String(t.id) === String(ticketId)
            ? {
                ...t,
                replies: (t.replies || []).filter((r) => r.id !== tempId),
              }
            : t,
        ),
      );
      setMsg(msgToSend);
    } finally {
      setSending(false);
    }
  }, [msg, activeTicket, sending, loadTickets]);

  const createTicket = useCallback(async () => {
    if (!newMsg.trim() || !newTeam || creating) return;
    setCreating(true);
    try {
      const headers = await getAuthHeaders();
      const res = await fetch(`${API}/user/tickets/`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          subject: newSubject.trim() || `${newTeam.name} support request`,
          message: newMsg.trim(),
          user_email: userEmail,
          user_name: userName,
          ticket_type: newTeam.slug,
          user_plan: "free",
        }),
      });
      if (!res.ok) throw new Error("Failed to create ticket");
      const ticket = await res.json();
      setTickets((prev) => [ticket, ...prev.filter((t) => t.id !== ticket.id)]);
      setNewSubject("");
      setNewMsg("");
      setNewTeam(teams[0] || null);
      setActive(ticket);
      setView("chat");
    } catch {
      /* swallow */
    } finally {
      setCreating(false);
    }
  }, [newSubject, newMsg, creating, userEmail, userName, newTeam, teams]);

  const raiseNewTicket = useCallback(() => {
    setActive(null);
    disconnectSSE();
    setNewSubject("");
    setNewMsg("");
    if (teams.length > 0) setNewTeam(teams[0]);
    setView("new");
  }, [teams, disconnectSSE]);

  const panelProps = {
    view,
    setView,
    tickets,
    activeTicket,
    loading,
    sending,
    msg,
    setMsg,
    newSubject,
    setNewSubject,
    newMsg,
    setNewMsg,
    newTeam,
    creating,
    teams,
    teamsLoading,
    sseStatus,
    agentViewing,
    agentViewingName,
    bottomRef,
    inputRef,
    handleClose,
    openTicket,
    sendReply,
    createTicket,
    raiseNewTicket,
    disconnectSSE,
    isMobile,
  };

  if (isMobile) {
    return (
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-9998"
              style={{
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                background: "rgba(0, 0, 0, 0.45)",
              }}
              onClick={handleClose}
            />
            <motion.div
              key="mobile-drawer"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[9999] flex flex-col"
              style={{
                height: "85dvh",
                backgroundColor: "var(--sidebar-bg)",
                borderTop: "1px solid var(--sidebar-border)",
                borderRadius: "20px 20px 0 0",
                boxShadow: "0 -8px 40px rgba(0,0,0,0.35)",
                paddingTop: 16,
              }}
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <div
                className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full"
                style={{ background: "var(--sidebar-border)" }}
              />
              <PanelContent {...panelProps} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="fixed bottom-20 left-4 z-9999 flex flex-col shadow-2xl overflow-hidden"
          style={{
            width: "min(360px, calc(100vw - 2rem))",
            height: "min(520px, calc(100dvh - 6rem))",
            backgroundColor: "var(--sidebar-bg)",
            border: "1px solid var(--sidebar-border)",
            borderRadius: 16,
          }}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <PanelContent {...panelProps} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Sidebar trigger button ─────────────────────────────────────────────────────
export function SidebarTrigger({ open, setOpen, hasUnread }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setOpen((p) => !p);
      }}
      onTouchEnd={(e) => e.stopPropagation()}
      className="relative w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group"
      style={{
        background: open
          ? "color-mix(in srgb, var(--primary) 15%, transparent)"
          : "color-mix(in srgb, var(--primary) 7%, transparent)",
        border: open
          ? "1px solid color-mix(in srgb, var(--primary) 35%, transparent)"
          : "1px dashed color-mix(in srgb, var(--primary) 30%, transparent)",
        color: "var(--text-main)",
      }}
    >
      {hasUnread && (
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
        </span>
      )}
      <HeadphonesIcon
        size={16}
        style={{ color: open ? "var(--primary)" : "var(--sidebar-main)" }}
        className="group-hover:scale-110 transition-transform"
      />
      <span className="flex-1 text-left tracking-tight">Support</span>
      {hasUnread && (
        <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-red-500 text-white">
          NEW
        </span>
      )}
    </button>
  );
}
