import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ExternalLink,
  Star,
  ThumbsUp,
  ThumbsDown,
  Tag,
  Lock,
  MessageSquare,
  Heart,
  Zap,
  Clock,
  User,
  TrendingUp,
} from "lucide-react";

// ── helpers ──────────────────────────────────────────────────────────────────
function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function scoreColor(score) {
  if (score >= 8) return { bg: "#ecfdf5", text: "#065f46", border: "#6ee7b7" };
  if (score >= 6) return { bg: "#fefce8", text: "#713f12", border: "#fde68a" };
  return { bg: "#fff1f2", text: "#881337", border: "#fecdd3" };
}

function platformIcon(platform) {
  if (platform === "reddit")
    return (
      <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="10" fill="#FF4500" />
        <path
          fill="white"
          d="M16.67 10a1.46 1.46 0 00-2.47-1.06 7.15 7.15 0 00-3.84-1.22l.65-3.07 2.12.44a1 1 0 101.06-1.06 1 1 0 00-.95.68l-2.37-.5a.27.27 0 00-.32.21l-.73 3.42a7.14 7.14 0 00-3.87 1.22 1.46 1.46 0 10-1.6 2.36 2.87 2.87 0 000 .37c0 1.87 2.18 3.38 4.87 3.38s4.87-1.51 4.87-3.38a2.87 2.87 0 000-.37 1.46 1.46 0 00.52-1.82zM7.5 11a1 1 0 111 1 1 1 0 01-1-1zm5.6 2.71a3.58 3.58 0 01-3.1.53 3.58 3.58 0 01-3.1-.53.2.2 0 01.28-.28 3.2 3.2 0 002.82.45 3.2 3.2 0 002.82-.45.2.2 0 01.28.28zm-.1-1.71a1 1 0 111-1 1 1 0 01-1 1z"
        />
      </svg>
    );
  return <MessageSquare size={14} />;
}

const STATUSES = ["new", "replied", "contacted", "closed"];

const STATUS_STYLES = {
  new: { bg: "#eff6ff", text: "#1d4ed8", dot: "#3b82f6" },
  replied: { bg: "#f0fdf4", text: "#15803d", dot: "#22c55e" },
  contacted: { bg: "#fefce8", text: "#a16207", dot: "#eab308" },
  closed: { bg: "#f9fafb", text: "#6b7280", dot: "#9ca3af" },
};

function Spinner() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 10,
        height: 10,
        border: "1.5px solid currentColor",
        borderTopColor: "transparent",
        borderRadius: "50%",
        animation: "spin 0.6s linear infinite",
      }}
    />
  );
}

// ── main component ────────────────────────────────────────────────────────────
export default function LeadRow({
  lead,
  index = 0,
  campaignId,
  onStatusChange,
  updateLeadStatus,
}) {
  const [updating, setUpdating] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [thumbed, setThumbed] = useState(null); // "up" | "down" | null

  // Flatten nested post fields onto the lead
  const post = lead.post ?? {};
  const title = lead.title ?? post.title;
  const body = lead.body ?? post.content;
  const author = lead.author ?? post.author;
  const url = lead.url ?? post.url;
  const subreddit = lead.subreddit ?? post.subreddit;
  const platform = lead.platform;
  const score = lead.ai_score ?? lead.score ?? 0;
  const keyword = lead.search_keyword ?? lead.matched_keyword;
  const intent = lead.intent;
  const likes = post.likes ?? 0;
  const comments = post.comments_count ?? 0;
  const createdAt = lead.created_at ?? post.post_created_at;
  const status = lead.status ?? "new";

  const sc = scoreColor(score);
  const ss = STATUS_STYLES[status] ?? STATUS_STYLES.new;

  const handleStatus = async (newStatus) => {
    setStatusOpen(false);
    setUpdating(true);
    try {
      if (updateLeadStatus) await updateLeadStatus(campaignId, lead.id, newStatus);
      if (onStatusChange) onStatusChange(lead.id, newStatus);
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .lead-row-status-menu button:hover { background: #f3f4f6; }
        .lead-row-action:hover { color: #111 !important; }
        .lead-row-expand:hover { background: #f9fafb; }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04, duration: 0.25 }}
        style={{
          borderBottom: "1px solid #f0f0f0",
          padding: "14px 4px",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        {/* ── TOP ROW ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          {/* LEFT: checkbox + status + meta */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", flex: 1, minWidth: 0 }}>
            <input type="checkbox" style={{ accentColor: "#6366f1", width: 13, height: 13, flexShrink: 0 }} />

            {/* Status pill */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setStatusOpen((p) => !p)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  background: ss.bg, color: ss.text,
                  border: `1px solid ${ss.dot}40`,
                  borderRadius: 20, padding: "2px 8px 2px 6px",
                  fontSize: 11, fontWeight: 500, cursor: "pointer",
                  letterSpacing: "0.01em",
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: ss.dot, flexShrink: 0 }} />
                {status}
                <ChevronDown size={10} style={{ opacity: 0.6, marginLeft: 2 }} />
                {updating && <Spinner />}
              </button>

              <AnimatePresence>
                {statusOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.12 }}
                    style={{
                      position: "absolute", top: "calc(100% + 4px)", left: 0, zIndex: 30,
                      background: "#fff", border: "1px solid #e5e7eb",
                      borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                      minWidth: 120, overflow: "hidden",
                    }}
                  >
                    {STATUSES.map((s) => {
                      const c = STATUS_STYLES[s];
                      return (
                        <button
                          key={s}
                          className="lead-row-status-menu"
                          onClick={() => handleStatus(s)}
                          style={{
                            display: "flex", alignItems: "center", gap: 6,
                            width: "100%", padding: "7px 12px",
                            fontSize: 12, cursor: "pointer",
                            border: "none", background: "transparent",
                            color: "#374151", textAlign: "left",
                          }}
                        >
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot }} />
                          {s}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Platform */}
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "#6b7280" }}>
              {platformIcon(platform)}
              {subreddit ? `r/${subreddit}` : platform}
            </span>

            <span style={{ color: "#d1d5db", fontSize: 12 }}>·</span>

            {/* Author */}
            <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, color: "#6b7280" }}>
              <User size={11} />
              {author}
            </span>

            <span style={{ color: "#d1d5db", fontSize: 12 }}>·</span>

            {/* Time */}
            {createdAt && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, color: "#9ca3af" }}>
                <Clock size={11} />
                {timeAgo(createdAt)}
              </span>
            )}
          </div>

          {/* RIGHT: actions + score */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {/* Likes / comments */}
            <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, color: "#9ca3af" }}>
              <Heart size={11} />
              {likes}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, color: "#9ca3af" }}>
              <MessageSquare size={11} />
              {comments}
            </span>

            {/* Thumbs */}
            <button
              className="lead-row-action"
              onClick={() => setThumbed(thumbed === "up" ? null : "up")}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: thumbed === "up" ? "#22c55e" : "#d1d5db", transition: "color 0.15s" }}
            >
              <ThumbsUp size={13} />
            </button>
            <button
              className="lead-row-action"
              onClick={() => setThumbed(thumbed === "down" ? null : "down")}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: thumbed === "down" ? "#ef4444" : "#d1d5db", transition: "color 0.15s" }}
            >
              <ThumbsDown size={13} />
            </button>

            {/* External link */}
            {url && (
              <a href={url} target="_blank" rel="noreferrer" style={{ color: "#9ca3af", display: "inline-flex", transition: "color 0.15s" }}>
                <ExternalLink size={13} />
              </a>
            )}

            {/* AI Score */}
            <span
              style={{
                display: "inline-flex", alignItems: "center", gap: 4,
                background: sc.bg, color: sc.text,
                border: `1px solid ${sc.border}`,
                borderRadius: 6, padding: "2px 7px",
                fontSize: 11, fontWeight: 700, letterSpacing: "0.02em",
              }}
            >
              <Star size={10} fill={sc.text} stroke="none" />
              {score.toFixed(1)}
            </span>
          </div>
        </div>

        {/* ── BODY ── */}
        {lead.locked ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "28px 0", gap: 10, textAlign: "center" }}>
            <Lock size={28} style={{ color: "#6366f1" }} />
            <p style={{ fontSize: 13, fontWeight: 600, color: "#111", margin: 0 }}>Start Free Trial to View Content</p>
            <button style={{ padding: "6px 16px", fontSize: 12, fontWeight: 600, background: "#6366f1", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
              Start Free Trial
            </button>
          </div>
        ) : (
          <div style={{ marginTop: 10, paddingLeft: 22 }}>
            {/* Title with link */}
            {title && (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: "#111", textDecoration: "none", marginBottom: 4 }}
              >
                {title}
                <ExternalLink size={11} style={{ color: "#9ca3af", flexShrink: 0 }} />
              </a>
            )}

            {/* Body preview */}
            {body && (
              <p
                style={{
                  fontSize: 12, color: "#6b7280", lineHeight: 1.65, margin: "0 0 8px",
                  display: "-webkit-box", WebkitLineClamp: expanded ? "unset" : 3,
                  WebkitBoxOrient: "vertical", overflow: "hidden",
                }}
              >
                {body}
              </p>
            )}

            {body && body.length > 200 && (
              <button
                className="lead-row-expand"
                onClick={() => setExpanded((p) => !p)}
                style={{ fontSize: 11, color: "#6366f1", background: "none", border: "none", cursor: "pointer", padding: "1px 4px", borderRadius: 4 }}
              >
                {expanded ? "Show less" : "Show more"}
              </button>
            )}

            {/* Intent */}
            {intent && (
              <div
                style={{
                  display: "flex", alignItems: "flex-start", gap: 6,
                  marginTop: 8, background: "#fafaf9",
                  border: "1px solid #e5e7eb", borderLeft: "3px solid #a78bfa",
                  borderRadius: "0 6px 6px 0", padding: "7px 10px",
                }}
              >
                <Zap size={12} style={{ color: "#7c3aed", marginTop: 1, flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.06em" }}>Intent</span>
                  <p style={{ fontSize: 12, color: "#374151", lineHeight: 1.55, margin: "2px 0 0" }}>{intent}</p>
                </div>
              </div>
            )}

            {/* Tags row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
              {keyword && (
                <span
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    fontSize: 10, fontWeight: 500, padding: "2px 7px",
                    background: "#ede9fe", color: "#4c1d95",
                    border: "1px solid #c4b5fd", borderRadius: 4,
                  }}
                >
                  <Tag size={9} />
                  {keyword}
                </span>
              )}
              {lead.similarity_score != null && (
                <span
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    fontSize: 10, fontWeight: 500, padding: "2px 7px",
                    background: "#eff6ff", color: "#1e40af",
                    border: "1px solid #bfdbfe", borderRadius: 4,
                  }}
                >
                  <TrendingUp size={9} />
                  sim {(lead.similarity_score * 100).toFixed(0)}%
                </span>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}