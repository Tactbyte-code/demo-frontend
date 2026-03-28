import { motion } from "framer-motion";
import { ExternalLink, Loader2 } from "lucide-react";

export function SourceCard({ source, index, selected, atMax, pending, onToggle }) {
    return (
        <motion.div
            key={source.id ?? index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            onClick={() => !atMax && !pending && onToggle(source.id, selected)}
            className="rounded-xl border p-4 flex items-start gap-4 transition-all"
            style={{
                backgroundColor: selected ? "var(--info-bg)" : "var(--surface)",
                borderColor: selected ? "var(--primary)" : "var(--border-solid)",
                cursor: pending || atMax ? "not-allowed" : "pointer",
                opacity: atMax ? 0.5 : 1,
            }}
        >
            {/* checkbox / spinner */}
            <div
                className="shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all"
                style={{
                    borderColor: pending ? "var(--text-subtle)" : selected ? "var(--primary)" : "var(--border-secondary)",
                    backgroundColor: pending ? "transparent" : selected ? "var(--primary)" : "transparent",
                }}
            >
                {pending ? (
                    <Loader2 className="w-2.5 h-2.5 animate-spin" style={{ color: "var(--text-subtle)" }} />
                ) : selected ? (
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                ) : null}
            </div>

            {/* content */}
            <div className="flex-1 min-w-0">
                {source.subreddit && (
                    <span
                        className="text-[10px] font-mono font-bold mb-1 block"
                        style={{ color: selected ? "var(--primary)" : "var(--text-subtle)" }}
                    >
                        r/{source.subreddit}
                    </span>
                )}
                <p
                    className="text-sm font-semibold mb-1 truncate"
                    style={{ color: selected ? "var(--primary)" : "var(--text-main)" }}
                >
                    {source.title}
                </p>
                {source.snippet && (
                    <p className="text-xs leading-relaxed mb-2" style={{ color: "var(--text-muted)" }}>
                        {source.snippet}
                    </p>
                )}
                <div className="flex items-center gap-3">
                    <p className="text-[11px] font-mono truncate" style={{ color: "var(--text-subtle)" }}>
                        {source.url}
                    </p>
                    {source.score != null && (
                        <span className="text-[10px] font-mono shrink-0" style={{ color: "var(--text-subtle)" }}>
                            {source.score} pts
                        </span>
                    )}
                    {source.num_comments != null && (
                        <span className="text-[10px] font-mono shrink-0" style={{ color: "var(--text-subtle)" }}>
                            {source.num_comments} comments
                        </span>
                    )}
                </div>
            </div>

            <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="shrink-0 mt-0.5 opacity-40 hover:opacity-100 transition-opacity"
            >
                <ExternalLink className="w-4 h-4" style={{ color: selected ? "var(--primary)" : "var(--text-subtle)" }} />
            </a>
        </motion.div>
    );
}