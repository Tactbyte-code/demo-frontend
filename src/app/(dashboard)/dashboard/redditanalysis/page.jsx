"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, RotateCcw } from "lucide-react";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const SENTIMENT = {
    negative: { textColor: "text-red-400", bgColor: "bg-red-950/40", borderColor: "border-red-800/50", dotBg: "bg-red-400", label: "Negative" },
    positive: { textColor: "text-emerald-400", bgColor: "bg-emerald-950/40", borderColor: "border-emerald-800/50", dotBg: "bg-emerald-400", label: "Positive" },
    neutral: { textColor: "text-slate-400", bgColor: "bg-slate-800/40", borderColor: "border-slate-700/50", dotBg: "bg-slate-400", label: "Neutral" },
    mixed: { textColor: "text-amber-400", bgColor: "bg-amber-950/40", borderColor: "border-amber-800/50", dotBg: "bg-amber-400", label: "Mixed" },
};

const SEVERITY = {
    High: { pill: "text-rose-400 border-rose-800/50 bg-rose-950/40", bar: "bg-rose-500", accent: "#f43f5e", quoteAccent: "rgba(244,63,94,0.06)", quoteBorder: "rgba(244,63,94,0.2)" },
    Medium: { pill: "text-amber-400 border-amber-800/50 bg-amber-950/40", bar: "bg-amber-500", accent: "#f59e0b", quoteAccent: "rgba(245,158,11,0.06)", quoteBorder: "rgba(245,158,11,0.2)" },
    Low: { pill: "text-teal-400 border-teal-800/50 bg-teal-950/40", bar: "bg-teal-500", accent: "#14b8a6", quoteAccent: "rgba(20,184,166,0.06)", quoteBorder: "rgba(20,184,166,0.2)" },
};

const STEPS = [
    "Scanning Reddit threads",
    "Extracting signals",
    "Clustering themes",
    "Analyzing sentiment",
    "Mapping market signals",
    "Generating insights",
];

const PHASES = { QUERY: "query", LOADING: "loading", RESULTS: "results" };

const EXAMPLES = [
    "gym culture in Mumbai",
    "solo travel north east India",
    "EV adoption challenges India",
    "street food safety Delhi",
    "remote work culture Bangalore",
    "startup funding climate 2024",
];

const API_URL = process.env.NEXT_PUBLIC_REDDIT_API_URL ?? "";
const API_KEY = process.env.NEXT_PUBLIC_REDDIT_API_KEY ?? "";

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ─── HIGHLIGHT ────────────────────────────────────────────────────────────────
function HighlightText({ text, query }) {
    if (!query || !text) return <>{text}</>;
    const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
    return <>{parts.map((p, i) =>
        p.toLowerCase() === query.toLowerCase()
            ? <mark key={i} className="rounded px-0.5 font-semibold not-italic"
                style={{ backgroundColor: "color-mix(in srgb, var(--primary) 18%, transparent)", color: "var(--primary)" }}>{p}</mark>
            : p
    )}</>;
}

function RelevanceBar({ score }) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ backgroundColor: "var(--surface-raised)" }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${score ?? 0}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, var(--primary), var(--accent))" }} />
            </div>
            <span className="text-[11px] font-semibold w-8 text-right font-mono" style={{ color: "var(--text-muted)" }}>{score ?? 0}%</span>
        </div>
    );
}

// ─── PAIN POINT CARD ─────────────────────────────────────────────────────────
function PainPointCard({ pt, searchQuery }) {
    const sev = SEVERITY[pt?.severity] || SEVERITY.Low;
    return (
        <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "var(--surface-card)", border: "1px solid var(--border-solid)" }}>
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "var(--border-solid)" }}>
                <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${sev.bar}`} />
                    <span className="text-[13px] font-semibold truncate" style={{ color: "var(--text-main)" }}>
                        <HighlightText text={pt?.issue} query={searchQuery} />
                    </span>
                </div>
                {pt?.severity && (
                    <span className={`shrink-0 ml-3 text-[9px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full border ${sev.pill}`}>
                        {pt.severity}
                    </span>
                )}
            </div>
            {pt?.example_quote && (
                <div className="px-4 pt-3 pb-3 border-b" style={{ background: sev.quoteAccent, borderColor: sev.quoteBorder }}>
                    <div className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center mt-0.5"
                            style={{ background: `${sev.accent}22`, border: `1px solid ${sev.accent}44` }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="8" r="4" stroke={sev.accent} strokeWidth="2" />
                                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={sev.accent} strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-1">
                                <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: sev.accent }}>User Voice</span>
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded font-mono"
                                    style={{ color: "var(--text-subtle)", backgroundColor: "var(--surface-raised)", border: "1px solid var(--border-solid)" }}>reddit</span>
                            </div>
                            <p className="text-[12px] font-medium italic leading-relaxed" style={{ color: "var(--text-muted)" }}>
                                "<HighlightText text={pt.example_quote} query={searchQuery} />"
                            </p>
                        </div>
                    </div>
                </div>
            )}
            {pt?.impact && (
                <div className="flex items-center gap-3 px-4 py-2.5" style={{ backgroundColor: "var(--surface-raised)" }}>
                    <div className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0" style={{ background: sev.accent }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span className="text-[11px] font-bold uppercase mr-1 flex-shrink-0" style={{ color: sev.accent }}>Impact</span>
                    <span className="text-[12px] font-medium" style={{ color: "var(--text-muted)" }}>{pt.impact}</span>
                </div>
            )}
        </div>
    );
}

// ─── SIGNAL CARD ─────────────────────────────────────────────────────────────
function SignalCard({ theme, index, searchQuery }) {
    const [collapsed, setCollapsed] = useState(false);
    const s = SENTIMENT[theme?.sentiment] || SENTIMENT.neutral;
    const leftAccent = { negative: "#f87171", positive: "#34d399", neutral: "#64748b", mixed: "#fbbf24" };

    return (
        <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }} transition={{ delay: 0.04 * index, duration: 0.2 }} className="mb-3">
            <div className="rounded-xl overflow-hidden transition-shadow"
                style={{
                    backgroundColor: "var(--surface)",
                    border: "1px solid var(--border-solid)",
                    borderLeftWidth: 3,
                    borderLeftColor: leftAccent[theme?.sentiment] || "#64748b",
                    boxShadow: "var(--shadow-sm)",
                }}>
                <div className="px-5 pt-4 pb-4">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="text-[10px] font-black tracking-widest uppercase font-mono" style={{ color: "var(--text-subtle)" }}>
                                    Theme {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded border ${s.bgColor} ${s.borderColor} ${s.textColor}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${s.dotBg}`} />{s.label}
                                </span>
                                {theme?.signal_count != null && (
                                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded border font-mono"
                                        style={{ backgroundColor: "var(--info-bg)", borderColor: "color-mix(in srgb, var(--primary) 20%, transparent)", color: "var(--primary)" }}>
                                        {theme.signal_count} signals
                                    </span>
                                )}
                            </div>
                            {theme?.title && (
                                <h3 className="text-[15px] font-bold tracking-tight mb-2" style={{ color: "var(--text-main)" }}>
                                    <HighlightText text={theme.title} query={searchQuery} />
                                </h3>
                            )}
                            {theme?.relevance_score != null && (
                                <div className="mb-3">
                                    <span className="text-[10px] font-black uppercase tracking-widest font-mono" style={{ color: "var(--text-subtle)" }}>Relevance</span>
                                    <RelevanceBar score={theme.relevance_score} />
                                </div>
                            )}
                            {theme?.summary && (
                                <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                                    <HighlightText text={theme.summary} query={searchQuery} />
                                </p>
                            )}
                        </div>
                        <button onClick={() => setCollapsed(c => !c)}
                            className="flex-shrink-0 mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer"
                            style={{ border: "1px solid var(--border-solid)", backgroundColor: "var(--surface-card)" }}>
                            <motion.svg animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.2 }}
                                width="12" height="12" viewBox="0 0 24 24" fill="none">
                                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                                    style={{ color: "var(--text-subtle)" }} />
                            </motion.svg>
                        </button>
                    </div>
                </div>

                <AnimatePresence initial={false}>
                    {!collapsed && (
                        <motion.div key="content"
                            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                            style={{ overflow: "hidden" }}>

                            {theme?.pain_points?.length > 0 && (
                                <div className="px-4 pb-4 pt-4 border-t" style={{ borderColor: "var(--border-solid)" }}>
                                    <p className="text-[10px] font-black tracking-widest uppercase font-mono mb-3 px-1" style={{ color: "var(--text-subtle)" }}>Pain Points</p>
                                    <div className="flex flex-col gap-2.5">
                                        {theme.pain_points.map((pt, j) => <PainPointCard key={j} pt={pt} searchQuery={searchQuery} />)}
                                    </div>
                                </div>
                            )}

                            {theme?.quotes?.length > 0 && (
                                <div className="px-5 pb-4 pt-4 border-t" style={{ borderColor: "var(--border-solid)" }}>
                                    <p className="text-[10px] font-black tracking-widest uppercase font-mono mb-2.5" style={{ color: "var(--text-subtle)" }}>Quotes</p>
                                    <div className="flex flex-col gap-2">
                                        {theme.quotes.map((q, j) => (
                                            <div key={j} className="rounded-lg p-3"
                                                style={{ backgroundColor: "var(--surface-card)", borderLeft: "3px solid var(--primary)", border: "1px solid var(--border-solid)" }}>
                                                {q?.text && <p className="text-[12px] italic leading-relaxed mb-2" style={{ color: "var(--text-muted)" }}>"{q.text}"</p>}
                                                <div className="flex items-center gap-2">
                                                    {q?.author && <span className="text-[10px] font-semibold font-mono" style={{ color: "var(--text-subtle)" }}>u/{q.author}</span>}
                                                    {q?.permalink && (
                                                        <a href={q.permalink} target="_blank" rel="noreferrer"
                                                            className="text-[10px] font-medium transition-colors"
                                                            style={{ color: "var(--primary)" }}>View thread ↗</a>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {theme?.sources?.length > 0 && (
                                <div className="px-5 pb-4 pt-4 border-t" style={{ borderColor: "var(--border-solid)" }}>
                                    <p className="text-[10px] font-black tracking-widest uppercase font-mono mb-2.5" style={{ color: "var(--text-subtle)" }}>Sources</p>
                                    <div className="flex flex-col gap-2">
                                        {theme.sources.map((src, j) => (
                                            <div key={j} className="flex items-start gap-2.5 rounded-lg px-3 py-2.5"
                                                style={{ backgroundColor: "var(--surface-card)", border: "1px solid var(--border-solid)" }}>
                                                <div className="flex-1 min-w-0">
                                                    {src?.preview && <p className="text-[12px] truncate mb-1" style={{ color: "var(--text-main)" }}>{src.preview}</p>}
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        {src?.author && <span className="text-[10px] font-mono" style={{ color: "var(--text-subtle)" }}>u/{src.author}</span>}
                                                        {src?.created && <span className="text-[10px]" style={{ color: "var(--text-subtle)" }}>
                                                            {new Date(src.created).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                                        </span>}
                                                        {src?.score != null && <span className="text-[10px] font-semibold font-mono" style={{ color: "var(--warning)" }}>↑ {src.score}</span>}
                                                        {src?.kind && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded font-mono"
                                                            style={{ backgroundColor: "var(--surface-raised)", color: "var(--text-subtle)", border: "1px solid var(--border-solid)" }}>{src.kind}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {(theme?.system_actions?.length > 0 || theme?.reddit_user_actions?.length > 0 || theme?.demographic_signals?.length > 0) && (
                                <div className="px-5 pb-4 pt-4 border-t" style={{ borderColor: "var(--border-solid)" }}>
                                    <div className="grid grid-cols-2 gap-4">
                                        {theme?.system_actions?.length > 0 && (
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest font-mono mb-2" style={{ color: "var(--text-subtle)" }}>Recommended Actions</p>
                                                <div className="flex flex-col gap-1.5">
                                                    {theme.system_actions.map((a, k) => (
                                                        <div key={k} className="flex items-start gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: "var(--primary)" }} />
                                                            <span className="text-[12px] leading-relaxed" style={{ color: "var(--text-muted)" }}>{a}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {theme?.reddit_user_actions?.length > 0 && (
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest font-mono mb-2" style={{ color: "var(--text-subtle)" }}>User Behaviour</p>
                                                <div className="flex flex-col gap-1.5">
                                                    {theme.reddit_user_actions.map((a, k) => (
                                                        <div key={k} className="flex items-start gap-2">
                                                            <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: "var(--warning)" }} />
                                                            <span className="text-[12px] leading-relaxed" style={{ color: "var(--text-muted)" }}>{a}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {theme?.demographic_signals?.length > 0 && (
                                        <div className="mt-4 pt-3.5 border-t" style={{ borderColor: "var(--border-solid)" }}>
                                            <p className="text-[10px] font-black uppercase tracking-widest font-mono mb-2" style={{ color: "var(--text-subtle)" }}>Demographics</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {theme.demographic_signals.map(d => (
                                                    <span key={d} className="inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-1 rounded-full"
                                                        style={{ backgroundColor: "color-mix(in srgb, var(--accent) 8%, var(--surface))", border: "1px solid color-mix(in srgb, var(--accent) 20%, transparent)", color: "var(--accent)" }}>
                                                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--accent)" }} />{d}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {theme?.brands_mentioned?.length > 0 && (
                                <div className="border-t px-5 py-3" style={{ borderColor: "var(--border-solid)", backgroundColor: "var(--surface-card)" }}>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-[10px] font-black uppercase tracking-widest font-mono mr-1" style={{ color: "var(--text-subtle)" }}>Brands</span>
                                        {theme.brands_mentioned.map(b => (
                                            <span key={b} className="text-[10px] font-semibold px-2 py-0.5 rounded"
                                                style={{ backgroundColor: "var(--surface-raised)", border: "1px solid var(--border-solid)", color: "var(--text-muted)" }}>{b}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function SlidingSidebar({ data, onSearchQuery }) {
    const [isOpen, setIsOpen] = useState(false);
    const ms = data?.market_signals;

    const listItem = (item, accentColor) => (
        <button key={item} onClick={() => onSearchQuery(item.split(" ")[0])}
            className="w-full flex items-center gap-2.5 text-left px-3 py-2 rounded-xl transition-all cursor-pointer"
            style={{ border: "1px solid var(--border-solid)", backgroundColor: "var(--surface-card)" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = accentColor; e.currentTarget.style.backgroundColor = `${accentColor}11`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-solid)"; e.currentTarget.style.backgroundColor = "var(--surface-card)"; }}>
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
            <span className="text-[11px] font-medium" style={{ color: "var(--text-muted)" }}>{item}</span>
        </button>
    );

    return (
        <div className="flex items-start gap-2" style={{ position: "sticky", top: 24 }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div key="panel"
                        initial={{ width: 0, opacity: 0 }} animate={{ width: 224, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden flex-shrink-0">
                        <div className="rounded-2xl p-4 mr-1 flex flex-col gap-4"
                            style={{
                                width: 224,
                                backgroundColor: "var(--surface)",
                                border: "1px solid var(--border-solid)",
                                boxShadow: "var(--shadow-lg)"
                            }}>
                            <div>
                                <p className="text-[9px] font-black tracking-widest uppercase font-mono mb-2" style={{ color: "var(--text-subtle)" }}>Source</p>
                                {data?.subreddit && <p className="text-[13px] font-bold mb-0.5" style={{ color: "var(--text-main)" }}>{data.subreddit}</p>}
                                <p className="text-[11px] mb-3" style={{ color: "var(--text-subtle)" }}>Reddit community</p>
                                <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--border-solid)" }}>
                                    {[
                                        ["Rank", data?.meta?.subreddit_rank != null ? `#${data.meta.subreddit_rank}` : "—"],
                                        ["Confidence", data?.meta?.confidence ?? "—"],
                                        ["Posts", data?.meta?.total_posts ?? "—"],
                                        ["Model", data?.meta?.model ?? "—"],
                                    ].map(([k, v], i) => (
                                        <div key={k} className="flex justify-between items-center px-3 py-2"
                                            style={{ borderBottom: i < 3 ? "1px solid var(--border-solid)" : "none", backgroundColor: "var(--surface-card)" }}>
                                            <span className="text-[10px] font-medium" style={{ color: "var(--text-subtle)" }}>{k}</span>
                                            <span className="text-[10px] font-bold font-mono" style={{ color: "var(--text-main)" }}>{v}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {ms?.emerging_topics?.length > 0 && (
                                <div>
                                    <div className="h-px mb-3" style={{ backgroundColor: "var(--border-solid)" }} />
                                    <p className="text-[9px] font-black tracking-widest uppercase font-mono mb-2" style={{ color: "var(--text-subtle)" }}>Emerging Topics</p>
                                    <div className="flex flex-col gap-1.5">
                                        {ms.emerging_topics.map(item => listItem(item, "var(--primary)"))}
                                    </div>
                                </div>
                            )}
                            {ms?.demographic_signals?.length > 0 && (
                                <div>
                                    <div className="h-px mb-3" style={{ backgroundColor: "var(--border-solid)" }} />
                                    <p className="text-[9px] font-black tracking-widest uppercase font-mono mb-2" style={{ color: "var(--text-subtle)" }}>Demographics</p>
                                    <div className="flex flex-col gap-1.5">
                                        {ms.demographic_signals.map(item => listItem(item, "var(--accent)"))}
                                    </div>
                                </div>
                            )}
                            {ms?.brands_mentioned?.length > 0 && (
                                <div>
                                    <div className="h-px mb-3" style={{ backgroundColor: "var(--border-solid)" }} />
                                    <p className="text-[9px] font-black tracking-widest uppercase font-mono mb-2" style={{ color: "var(--text-subtle)" }}>Brands</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {ms.brands_mentioned.map(b => (
                                            <button key={b} onClick={() => onSearchQuery(b)}
                                                className="text-[10px] font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer"
                                                style={{ backgroundColor: "var(--surface-card)", border: "1px solid var(--border-solid)", color: "var(--text-muted)" }}
                                                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary)"; }}
                                                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-solid)"; e.currentTarget.style.color = "var(--text-muted)"; }}>
                                                {b}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {ms?.geographic_signals?.length > 0 && (
                                <div>
                                    <div className="h-px mb-3" style={{ backgroundColor: "var(--border-solid)" }} />
                                    <p className="text-[9px] font-black tracking-widest uppercase font-mono mb-2" style={{ color: "var(--text-subtle)" }}>Geography</p>
                                    <div className="flex flex-col gap-1.5">
                                        {ms.geographic_signals.map(item => listItem(item, "var(--success)"))}
                                    </div>
                                </div>
                            )}
                            {data?.analyzed_at && (
                                <p className="text-[10px] text-center font-mono" style={{ color: "var(--text-subtle)" }}>
                                    {new Date(data.analyzed_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                                </p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col items-center flex-shrink-0">
                <button onClick={() => setIsOpen(o => !o)}
                    className="relative flex flex-col items-center justify-center gap-1.5 w-10 py-3 rounded-2xl transition-all duration-200 cursor-pointer"
                    style={{
                        backgroundColor: isOpen ? "var(--primary)" : "var(--surface-card)",
                        border: `1px solid ${isOpen ? "var(--primary)" : "var(--border-solid)"}`,
                        boxShadow: isOpen ? "0 0 16px color-mix(in srgb, var(--primary) 30%, transparent)" : "none",
                    }}>
                    <div className="relative w-3.5 h-3.5 flex items-center justify-center">
                        <motion.div animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 0 : -3 }} transition={{ duration: 0.18 }}
                            className="absolute w-3.5 h-0.5 rounded-full"
                            style={{ backgroundColor: isOpen ? "#fff" : "var(--text-muted)" }} />
                        <motion.div animate={{ opacity: isOpen ? 0 : 1 }} transition={{ duration: 0.14 }}
                            className="absolute w-3.5 h-0.5 rounded-full"
                            style={{ backgroundColor: "var(--text-muted)" }} />
                        <motion.div animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? 0 : 3 }} transition={{ duration: 0.18 }}
                            className="absolute w-3.5 h-0.5 rounded-full"
                            style={{ backgroundColor: isOpen ? "#fff" : "var(--text-muted)" }} />
                    </div>
                    <span className="text-[8px] font-black tracking-wider uppercase leading-none"
                        style={{ color: isOpen ? "rgba(255,255,255,0.7)" : "var(--text-subtle)" }}>
                        {isOpen ? "Close" : "Info"}
                    </span>
                </button>
            </div>
        </div>
    );
}

// ─── LOADER ───────────────────────────────────────────────────────────────────
function Loader({ query, status }) {
    const [step, setStep] = useState(0);
    const [dots, setDots] = useState(0);
    useEffect(() => { const t = setInterval(() => setDots(d => (d + 1) % 4), 420); return () => clearInterval(t); }, []);
    useEffect(() => { const t = setInterval(() => setStep(s => Math.min(s + 1, STEPS.length - 1)), 720); return () => clearInterval(t); }, []);
    const label = status === "IN_QUEUE" ? "Waiting in Queue" : status === "IN_PROGRESS" ? "Processing" : "Analyzing";

    return (
        <div className="flex flex-col items-center justify-center min-h-[90vh] px-6 py-12"
            style={{ backgroundColor: "var(--background)" }}>
            {/* Dual ring spinner */}
            <div className="relative w-24 h-24 mb-8">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full"
                    style={{ border: "2px solid transparent", borderTopColor: "var(--primary)", borderRightColor: "color-mix(in srgb, var(--primary) 20%, transparent)" }} />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute rounded-full"
                    style={{ inset: 8, border: "1.5px solid transparent", borderBottomColor: "var(--accent)", borderLeftColor: "color-mix(in srgb, var(--accent) 20%, transparent)" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div animate={{ scale: [0.85, 1.05, 0.85] }} transition={{ duration: 2, repeat: Infinity }}
                        className="w-8 h-8 rounded-full"
                        style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))", boxShadow: "0 0 20px color-mix(in srgb, var(--primary) 40%, transparent)" }} />
                </div>
            </div>

            <p className="text-[10px] font-black tracking-[0.25em] uppercase font-mono mb-2" style={{ color: "var(--text-subtle)" }}>{label}</p>
            {query && (
                <h3 className="text-lg font-semibold mb-8 text-center max-w-xl leading-snug" style={{ color: "var(--text-main)" }}>
                    "{query}"
                </h3>
            )}

            <div className="rounded-2xl p-5 w-full max-w-xs"
                style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border-solid)", boxShadow: "var(--shadow-md)" }}>
                {STEPS.map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: i <= step ? 1 : 0.2, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className={`flex items-center gap-2.5 ${i < STEPS.length - 1 ? "mb-3" : ""}`}>
                        <motion.div animate={{ scale: i === step ? [1, 1.4, 1] : 1 }}
                            transition={{ duration: 0.5, repeat: i === step ? Infinity : 0 }}
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{
                                backgroundColor: i < step ? "var(--success)" : i === step ? "var(--primary)" : "var(--border-solid)"
                            }} />
                        <span className="text-[12px] font-mono"
                            style={{ color: i === step ? "var(--primary)" : i < step ? "var(--success)" : "var(--text-subtle)", fontWeight: i === step ? 600 : 400 }}>
                            {s}{i === step ? ".".repeat(dots) : i < step ? " ✓" : ""}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// ─── QUERY SCREEN — redesigned ─────────────────────────────────────────────
function QueryScreen({ onSubmit, submitLoading, error }) {
    const [query, setQuery] = useState("");
    const [focused, setFocused] = useState(false);
    const textareaRef = useRef(null);

    const canSubmit = query.trim() && !submitLoading;

    function handleSubmit(e) {
        e?.preventDefault();
        if (!canSubmit) return;
        onSubmit({ query: query.trim() });
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && canSubmit) handleSubmit();
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden"
            style={{ backgroundColor: "var(--background)" }}>

            {/* Ambient background orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div className="absolute rounded-full"
                    style={{ width: 480, height: 480, top: "-10%", left: "-8%", background: "radial-gradient(circle, color-mix(in srgb, var(--primary) 12%, transparent), transparent 65%)" }}
                    animate={{ x: [0, 20, 0], y: [0, -14, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
                <motion.div className="absolute rounded-full"
                    style={{ width: 360, height: 360, bottom: "0%", right: "-5%", background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 8%, transparent), transparent 65%)" }}
                    animate={{ x: [0, -18, 0], y: [0, 16, 0] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
                {/* Dot grid */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: "radial-gradient(circle, var(--text-main) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
            </div>

            <div className="relative z-10 w-full max-w-2xl">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                    className="text-center mb-10">
                    {/* Icon */}
                    <div className="flex justify-center mb-5">
                        <div className="relative">
                            <motion.div className="absolute -inset-2 rounded-2xl"
                                style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))" }}
                                animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0, 0.15] }}
                                transition={{ duration: 3, repeat: Infinity }} />
                            <div className="relative w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ background: "linear-gradient(135deg, var(--primary), var(--accent))", boxShadow: "0 0 32px color-mix(in srgb, var(--primary) 35%, transparent)" }}>
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </div>

                    <h1 className="text-4xl font-black tracking-tight mb-2" style={{ color: "var(--text-main)" }}>
                        Reddit Intelligence
                    </h1>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        Deep sentiment analysis from Reddit communities. Enter any topic to begin.
                    </p>
                </motion.div>

                {/* Search card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
                    <form onSubmit={handleSubmit}>
                        <motion.div
                            animate={{
                                boxShadow: focused
                                    ? "0 0 0 1.5px var(--primary), 0 8px 40px color-mix(in srgb, var(--primary) 18%, transparent)"
                                    : "var(--shadow-md)"
                            }}
                            transition={{ duration: 0.2 }}
                            className="rounded-2xl overflow-hidden"
                            style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border-solid)" }}>

                            {/* Top glow on focus */}
                            <motion.div className="h-px w-full"
                                animate={{ opacity: focused ? 1 : 0 }}
                                style={{ background: "linear-gradient(90deg, transparent, var(--primary), var(--accent), transparent)" }} />

                            <div className="p-5 pb-4">
                                <div className="flex items-start gap-3">
                                    <div className="mt-0.5 flex-shrink-0">
                                        <Sparkles className="w-4 h-4" style={{ color: focused || query ? "var(--primary)" : "var(--text-subtle)" }} />
                                    </div>
                                    <textarea
                                        ref={textareaRef}
                                        value={query}
                                        onChange={e => setQuery(e.target.value)}
                                        onFocus={() => setFocused(true)}
                                        onBlur={() => setFocused(false)}
                                        onKeyDown={handleKeyDown}
                                        rows={3}
                                        placeholder="e.g. gym culture in Mumbai, EV adoption India, street food safety Delhi..."
                                        className="flex-1 w-full bg-transparent outline-none resize-none text-sm leading-relaxed"
                                        style={{ color: "var(--text-main)", fontFamily: "inherit" }}
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between px-5 py-3 border-t" style={{ borderColor: "var(--border-solid)", backgroundColor: "var(--surface-card)" }}>
                                <span className="text-[10px] font-mono" style={{ color: "var(--text-subtle)" }}>
                                    {query.length > 0 ? `${query.length} chars` : "⌘↵ to run"}
                                </span>
                                <button type="submit" disabled={!canSubmit}
                                    className="flex items-center gap-2 px-4 h-8 rounded-xl text-[11px] font-bold uppercase tracking-widest font-mono transition-all"
                                    style={{
                                        background: canSubmit ? "linear-gradient(135deg, var(--primary), color-mix(in srgb, var(--primary) 60%, var(--accent)))" : "var(--surface-raised)",
                                        color: canSubmit ? "#fff" : "var(--text-subtle)",
                                        boxShadow: canSubmit ? "0 2px 12px color-mix(in srgb, var(--primary) 30%, transparent)" : "none",
                                        border: "1px solid transparent",
                                        cursor: canSubmit ? "pointer" : "not-allowed",
                                        opacity: canSubmit ? 1 : 0.5,
                                    }}>
                                    {submitLoading
                                        ? <><div className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />Analyzing…</>
                                        : <>Analyze <ArrowRight className="w-3 h-3" /></>
                                    }
                                </button>
                            </div>
                        </motion.div>
                    </form>
                </motion.div>

                {/* Example queries */}
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
                    className="mt-6">
                    <p className="text-[9px] font-black uppercase tracking-[0.25em] font-mono mb-3 text-center" style={{ color: "var(--text-subtle)" }}>
                        Try an example
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {EXAMPLES.map((ex, i) => (
                            <motion.button
                                key={ex}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25 + i * 0.05 }}
                                onClick={() => { setQuery(ex); textareaRef.current?.focus(); }}
                                className="px-3.5 py-1.5 rounded-full text-[11px] font-medium transition-all cursor-pointer"
                                style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border-solid)", color: "var(--text-muted)" }}
                            // onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.color = "var(--primary)"; e.currentTarget.style.backgroundColor = "var(--info-bg)"; }}
                            // onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-solid)"; e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.backgroundColor = "var(--surface)"; }}
                            >
                                {ex}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Error */}
                <AnimatePresence>
                    {error && (
                        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="mt-4 flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-semibold"
                            style={{ backgroundColor: "var(--destructive-bg)", border: "1px solid color-mix(in srgb, var(--destructive) 25%, transparent)", color: "var(--destructive)" }}>
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
function StatCard({ label, value, delay = 0, color, icon }) {
    if (value == null) return null;
    return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
            <div className="rounded-xl p-4 flex items-center gap-3"
                style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border-solid)", boxShadow: "var(--shadow-sm)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base"
                    style={{ backgroundColor: `${color}15`, border: `1px solid ${color}25` }}>
                    {icon}
                </div>
                <div>
                    <p className="text-[9px] font-black uppercase tracking-widest font-mono mb-0.5" style={{ color: "var(--text-subtle)" }}>{label}</p>
                    <p className="text-2xl font-bold tracking-tight leading-none" style={{ color }}>{value}</p>
                </div>
            </div>
        </motion.div>
    );
}

// ─── RESULTS SEARCH BAR ───────────────────────────────────────────────────────
function ThemeSearchBar({ value, onChange, resultCount, totalCount }) {
    const [focused, setFocused] = useState(false);
    const inputRef = useRef(null);
    const hasQuery = value.length > 0;

    return (
        <div className="relative mb-3">
            <motion.div animate={{ boxShadow: focused ? "0 0 0 1.5px var(--primary)" : "none" }} transition={{ duration: 0.15 }}
                className="flex items-center rounded-xl overflow-hidden"
                style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border-solid)" }}>
                <div className="px-3 pl-4 flex items-center shrink-0">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ color: focused ? "var(--primary)" : "var(--text-subtle)" }}>
                        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                        <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
                <input ref={inputRef} id="theme-search" type="text" value={value}
                    onChange={e => onChange(e.target.value)}
                    onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                    placeholder="Search insights, pain points, brands..."
                    className="flex-1 border-none outline-none bg-transparent py-2.5 text-[13px]"
                    style={{ color: "var(--text-main)", fontFamily: "inherit" }} />
                <div className="flex items-center gap-1.5 pr-3">
                    <AnimatePresence>
                        {hasQuery && (
                            <motion.span initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                                className="text-[10px] font-bold px-2 py-0.5 rounded font-mono"
                                style={{ color: "var(--primary)", backgroundColor: "var(--info-bg)", border: "1px solid color-mix(in srgb, var(--primary) 20%, transparent)" }}>
                                {resultCount}/{totalCount}
                            </motion.span>
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {hasQuery && (
                            <motion.button initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
                                onClick={() => { onChange(""); inputRef.current?.focus(); }}
                                className="w-5 h-5 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                                style={{ border: "1px solid var(--border-solid)", backgroundColor: "var(--surface-card)" }}>
                                <svg width="7" height="7" viewBox="0 0 10 10" fill="none">
                                    <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" style={{ color: "var(--text-subtle)" }} />
                                </svg>
                            </motion.button>
                        )}
                    </AnimatePresence>
                    {!hasQuery && !focused && (
                        <kbd className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                            style={{ color: "var(--text-subtle)", backgroundColor: "var(--surface-raised)", border: "1px solid var(--border-solid)" }}>/</kbd>
                    )}
                </div>
            </motion.div>
            <AnimatePresence>
                {hasQuery && resultCount === 0 && (
                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="text-[12px] mt-2 pl-1" style={{ color: "var(--text-muted)" }}>
                        No insights match <strong style={{ color: "var(--text-main)" }}>"{value}"</strong>
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── RESULTS ─────────────────────────────────────────────────────────────────
function Results({ data, onReset }) {
    const [searchQuery, setSearchQuery] = useState("");
    const score = data?.meta?.subreddit_score != null ? (data.meta.subreddit_score * 100).toFixed(1) : null;
    const s = SENTIMENT[data?.overall_sentiment] || SENTIMENT.neutral;
    const themes = data?.themes ?? [];

    useEffect(() => {
        const handler = (e) => {
            if (e.key === "/" && e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
                e.preventDefault(); document.getElementById("theme-search")?.focus();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    const filteredThemes = searchQuery.trim()
        ? themes.filter(theme => {
            const q = searchQuery.toLowerCase();
            return (
                theme?.title?.toLowerCase().includes(q) ||
                theme?.summary?.toLowerCase().includes(q) ||
                theme?.sentiment?.toLowerCase().includes(q) ||
                theme?.pain_points?.some(p => p?.issue?.toLowerCase().includes(q) || p?.example_quote?.toLowerCase().includes(q)) ||
                theme?.brands_mentioned?.some(b => b?.toLowerCase().includes(q)) ||
                theme?.system_actions?.some(a => a?.toLowerCase().includes(q)) ||
                theme?.demographic_signals?.some(d => d?.toLowerCase().includes(q)) ||
                theme?.reddit_user_actions?.some(a => a?.toLowerCase().includes(q)) ||
                theme?.quotes?.some(qt => qt?.text?.toLowerCase().includes(q)) ||
                theme?.sources?.some(src => src?.preview?.toLowerCase().includes(q))
            );
        })
        : themes;

    return (
        <div className="px-8 pt-7 pb-16" style={{ backgroundColor: "var(--background)", minHeight: "100vh" }}>
            {/* Header */}
            <div className="flex justify-between items-start mb-6 flex-wrap gap-3">
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <button onClick={onReset}
                            className="flex items-center gap-1.5 text-[12px] font-semibold transition-colors cursor-pointer bg-transparent border-none"
                            style={{ color: "var(--text-muted)", fontFamily: "inherit" }}
                            onMouseEnter={e => e.currentTarget.style.color = "var(--text-main)"}
                            onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}>
                            <RotateCcw className="w-3 h-3" /> New analysis
                        </button>
                        {data?.subreddit && (
                            <>
                                <span style={{ color: "var(--border-solid)" }}>·</span>
                                <span className="text-[12px] font-mono" style={{ color: "var(--text-subtle)" }}>{data.subreddit}</span>
                            </>
                        )}
                    </div>
                    {data?.query && <h1 className="text-xl font-bold tracking-tight capitalize" style={{ color: "var(--text-main)" }}>{data.query}</h1>}
                    <p className="text-[12px] mt-0.5 font-mono" style={{ color: "var(--text-subtle)" }}>
                        {data?.analyzed_at && new Date(data.analyzed_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                        {data?.analyzed_at && data?.meta?.model && " · "}
                        {data?.meta?.model}
                    </p>
                </div>
                <div className="flex items-center gap-2.5">
                    {data?.overall_sentiment && (
                        <span className={`inline-flex items-center text-[11px] font-semibold px-3 py-1.5 rounded-lg border ${s.bgColor} ${s.borderColor} ${s.textColor}`}>
                            <span className={`w-2 h-2 rounded-full mr-2 ${s.dotBg}`} />{s.label} Sentiment
                        </span>
                    )}
                    {score != null && (
                        <div className="rounded-xl px-4 py-2 flex items-baseline gap-1"
                            style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border-solid)", boxShadow: "var(--shadow-sm)" }}>
                            <span className="text-xl font-bold tracking-tight leading-none" style={{ color: "var(--primary)" }}>{score}%</span>
                            <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>confidence</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="h-px mb-6" style={{ backgroundColor: "var(--border-solid)" }} />

            <div className="grid grid-cols-4 gap-3 mb-6">
                <StatCard label="Total Signals" value={data?.total_signals} delay={0.04} color="var(--primary)" icon="⚡" />
                <StatCard label="Posts Scanned" value={data?.meta?.total_posts} delay={0.08} color="var(--warning)" icon="📄" />
                <StatCard label="Comments" value={data?.meta?.total_comments} delay={0.12} color="var(--success)" icon="💬" />
                <StatCard label="Insights Found" value={themes.length || null} delay={0.16} color="var(--accent)" icon="🔍" />
            </div>

            <div className="flex gap-4 items-start">
                <div className="flex-1 min-w-0">
                    {(data?.executive_summary) && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                            className="rounded-xl p-5 mb-5"
                            style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border-solid)", boxShadow: "var(--shadow-sm)" }}>
                            <p className="text-[9px] font-black tracking-widest uppercase font-mono mb-2" style={{ color: "var(--text-subtle)" }}>Executive Summary</p>
                            <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-muted)" }}>{data.executive_summary}</p>
                        </motion.div>
                    )}

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
                        <div className="flex justify-between items-center mb-2.5">
                            <p className="text-[9px] font-black tracking-widest uppercase font-mono" style={{ color: "var(--text-subtle)" }}>Insights</p>
                            <span className="text-[11px] font-mono" style={{ color: "var(--text-subtle)" }}>{filteredThemes.length} of {themes.length} shown</span>
                        </div>
                        <ThemeSearchBar value={searchQuery} onChange={setSearchQuery} resultCount={filteredThemes.length} totalCount={themes.length} />
                        <AnimatePresence mode="popLayout">
                            {filteredThemes.map((theme, i) => (
                                <SignalCard key={theme?.id ?? i} theme={theme} index={i} searchQuery={searchQuery.trim()} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>

                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="flex-shrink-0">
                    <SlidingSidebar data={data} onSearchQuery={setSearchQuery} />
                </motion.div>
            </div>
        </div>
    );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function RedditIntelligencePage() {
    const [phase, setPhase] = useState(PHASES.QUERY);
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    async function handleSubmit({ query: q }) {
        setQuery(q);
        setError(null);
        setStatus("");
        setSubmitLoading(true);
        setPhase(PHASES.LOADING);
        try {
            const submitRes = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
                body: JSON.stringify({
                    input: { query: q, max_comments: 50, num_results: 25, provider: "hf", model: "" },
                }),
            });
            if (!submitRes.ok) throw new Error(`Failed to submit job (${submitRes.status})`);
            const { id } = await submitRes.json();

            const base = API_URL.substring(0, API_URL.lastIndexOf("/"));
            const statusURL = `${base}/status/${id}`;

            while (true) {
                await sleep(2000);
                const statusRes = await fetch(statusURL, { headers: { Authorization: `Bearer ${API_KEY}` } });
                if (!statusRes.ok) throw new Error("Failed to fetch job status");
                const statusData = await statusRes.json();
                setStatus(statusData?.status ?? "");
                if (statusData?.status === "FAILED") throw new Error("Job failed on the server");
                if (statusData?.output) {
                    setData(statusData.output?.body);
                    setPhase(PHASES.RESULTS);
                    break;
                }
            }
        } catch (err) {
            setError(err.message);
            setPhase(PHASES.QUERY);
        } finally {
            setSubmitLoading(false);
        }
    }

    function reset() { setPhase(PHASES.QUERY); setData(null); setError(null); setStatus(""); }

    return (
        <div style={{ backgroundColor: "var(--background)" }}>
            <AnimatePresence mode="wait">
                {phase === PHASES.QUERY && (
                    <motion.div key="query" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                        <QueryScreen onSubmit={handleSubmit} submitLoading={submitLoading} error={error} />
                    </motion.div>
                )}
                {phase === PHASES.LOADING && (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                        <Loader query={query} status={status} />
                    </motion.div>
                )}
                {phase === PHASES.RESULTS && (
                    <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                        <Results data={data} onReset={reset} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}