"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowLeft,
    ArrowUpRight,
    ChevronRight,
    LoaderCircle,
    MessageSquare,
    Quote,
    Sparkles,
} from "lucide-react";
import {
    useRedditQueryStatus,
    useRedditPosts,
    useRedditResult,
} from "@/features/reddit/hooks/useRedditAnalysis";
import { RSTATUS } from "@/utils/reddit/status";
import { useAuthStore } from "@/store/authStore";

// ── Config ────────────────────────────────────────────────────────────────
const TABS = [
    { id: "overview", label: "Overview" },
    { id: "themes", label: "Core Issues" },
    { id: "actions", label: "Actions" },
    { id: "sources", label: "Sources" },
    { id: "signals", label: "Signals" },
    { id: "meta", label: "Meta" },
];

const SENTIMENT = {
    positive: { label: "Positive", chip: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
    negative: { label: "Negative", chip: "bg-rose-50 text-rose-700 border-rose-200", dot: "bg-rose-500" },
    mixed: { label: "Mixed", chip: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
    neutral: { label: "Neutral", chip: "bg-slate-50 text-slate-600 border-slate-200", dot: "bg-slate-400" },
};

const SEVERITY = {
    High: "bg-rose-50 text-rose-700 border-rose-200",
    Medium: "bg-amber-50 text-amber-700 border-amber-200",
    Low: "bg-slate-50 text-slate-600 border-slate-200",
};

const IMPACT = {
    financial: "bg-rose-50 text-rose-700",
    operational: "bg-amber-50 text-amber-700",
    technical: "bg-sky-50 text-sky-700",
    ux: "bg-emerald-50 text-emerald-700",
};

const CONFIDENCE = {
    High: "text-emerald-600",
    Medium: "text-amber-600",
    Low: "text-rose-600",
};

const fmtDate = (value) => {
    if (!value) return "—";
    const d = new Date(value);
    return Number.isNaN(d.getTime())
        ? "—"
        : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

// ── Atoms ─────────────────────────────────────────────────────────────────
const SentimentBadge = ({ sentiment, small = false }) => {
    const c = SENTIMENT[sentiment?.toLowerCase()] ?? SENTIMENT.neutral;
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${c.chip} ${small ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
                }`}
        >
            <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
            {c.label}
        </span>
    );
};

const Pill = ({ label, muted = false }) => (
    <span
        className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${muted
                ? "border-slate-200 bg-slate-50 text-slate-600"
                : "border-orange-200 bg-orange-50 text-[#C23B00]"
            }`}
    >
        {label}
    </span>
);

const Card = ({ children, className = "" }) => (
    <div
        className={`rounded-2xl border border-orange-100 bg-white shadow-[0_8px_30px_rgba(255,69,0,0.05)] ${className}`}
    >
        {children}
    </div>
);

const Eyebrow = ({ children }) => (
    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF4500]">{children}</p>
);

const EmptyState = ({ text }) => (
    <p className="py-10 text-center text-sm text-slate-400">{text}</p>
);

const RelevanceBar = ({ score = 0, detailed = false }) => (
    <div className="flex w-full flex-col gap-1">
        {detailed && (
            <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Relevance</span>
                <span className="font-mono text-xs font-semibold text-[#FF4500]">{score}%</span>
            </div>
        )}
        <div className="flex items-center gap-2">
            <div className={`relative flex-1 overflow-hidden rounded-full bg-orange-100 ${detailed ? "h-1.5" : "h-1"}`}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#FF4500] to-[#FF8A4D]"
                />
            </div>
            {!detailed && (
                <span className="w-8 shrink-0 text-right font-mono text-[10px] font-semibold text-[#FF4500]">
                    {score}%
                </span>
            )}
        </div>
    </div>
);

// ── Tab: Overview ─────────────────────────────────────────────────────────
const OverviewTab = ({ data }) => {
    const stats = [
        { label: "Total signals", value: data.total_signals },
        { label: "Themes", value: data.themes?.length ?? 0 },
        { label: "Posts analyzed", value: data.meta?.total_posts },
        { label: "Comments analyzed", value: data.meta?.total_comments },
    ];

    return (
        <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map(({ label, value }) => (
                    <Card key={label} className="p-4">
                        <p className="text-2xl font-bold tracking-tight text-[#1A1A1B]">{value ?? "—"}</p>
                        <p className="mt-0.5 text-xs font-medium text-slate-500">{label}</p>
                    </Card>
                ))}
            </div>

            {data.direct_answer && (
                <div className="relative overflow-hidden rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-5 sm:p-6">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-200/30 blur-2xl" />
                    <div className="relative">
                        <div className="mb-2 flex items-center gap-2">
                            <Sparkles size={15} className="text-[#FF4500]" />
                            <Eyebrow>Direct answer</Eyebrow>
                        </div>
                        <p className="text-sm leading-7 text-[#1A1A1B] sm:text-[15px]">{data.direct_answer}</p>
                    </div>
                </div>
            )}

            {data.executive_summary && (
                <Card className="p-5 sm:p-6">
                    <Eyebrow>Executive summary</Eyebrow>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{data.executive_summary}</p>
                </Card>
            )}
        </div>
    );
};

// ── Tab: Core issues ──────────────────────────────────────────────────────
const PainPointRow = ({ pp, initialOpen = false }) => {
    const [open, setOpen] = useState(initialOpen);
    const impactClass = IMPACT[pp.impact?.toLowerCase()] ?? "bg-amber-50 text-amber-700";

    return (
        <div className="border-b border-orange-100 last:border-0">
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex w-full cursor-pointer items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-orange-50/40"
            >
                <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }} className="mt-1 shrink-0 text-[#FF4500]">
                    <ChevronRight size={16} />
                </motion.span>
                <div className="min-w-0 flex-1">
                    <p className="mb-2 text-sm font-medium leading-snug text-[#1A1A1B]">{pp.issue}</p>
                    <div className="flex flex-wrap items-center gap-2">
                        {pp.severity && (
                            <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${SEVERITY[pp.severity] ?? SEVERITY.Low}`}>
                                {pp.severity}
                            </span>
                        )}
                        {pp.impact && (
                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${impactClass}`}>
                                {pp.impact}
                            </span>
                        )}
                        {pp.sentiment && <SentimentBadge sentiment={pp.sentiment} small />}
                    </div>
                </div>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="space-y-4 border-t border-orange-100 bg-[#FFF8F4] px-4 pb-4 pt-3">
                            {pp.example_quote && (
                                <div>
                                    <Eyebrow>Quote</Eyebrow>
                                    <p className="mt-2 border-l-2 border-[#FF4500] pl-3 text-xs italic leading-relaxed text-slate-600">
                                        “{pp.example_quote}”
                                    </p>
                                </div>
                            )}

                            {pp.user_suggested_solutions?.length > 0 && (
                                <div>
                                    <Eyebrow>User suggestions</Eyebrow>
                                    <div className="mt-2 space-y-2 rounded-xl border border-orange-100 bg-white p-3">
                                        {pp.user_suggested_solutions.map((s, i) => (
                                            <div key={i} className="flex items-start gap-2">
                                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF4500]" />
                                                <p className="text-xs leading-relaxed text-slate-700">{s}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {pp.system_actions?.length > 0 && (
                                <div>
                                    <Eyebrow>Recommended actions</Eyebrow>
                                    <div className="mt-2 space-y-2">
                                        {pp.system_actions.map((a, i) => (
                                            <div key={i} className="space-y-1.5 rounded-xl border border-orange-100 bg-white p-3">
                                                <p className="text-xs font-semibold text-[#1A1A1B]">{a.action}</p>
                                                {a.how && (
                                                    <p className="text-xs leading-relaxed text-slate-600">
                                                        <span className="mr-1 text-[9px] font-bold uppercase tracking-widest text-[#FF4500]">How</span>
                                                        {a.how}
                                                    </p>
                                                )}
                                                {a.why && (
                                                    <p className="text-xs leading-relaxed text-slate-600">
                                                        <span className="mr-1 text-[9px] font-bold uppercase tracking-widest text-[#FF4500]">Why</span>
                                                        {a.why}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ThemesTab = ({ data }) => {
    const [activeId, setActiveId] = useState(data.themes?.[0]?.id ?? null);
    const theme = data.themes?.find((t) => t.id === activeId);

    if (!data.themes?.length) return <EmptyState text="No themes found." />;

    return (
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
            {/* Theme list */}
            <div className="flex shrink-0 gap-2 overflow-x-auto pb-2 lg:w-64 lg:flex-col lg:overflow-visible lg:pb-0">
                {data.themes.map((t) => {
                    const active = activeId === t.id;
                    return (
                        <button
                            key={t.id}
                            onClick={() => setActiveId(t.id)}
                            className={`flex w-50 shrink-0 cursor-pointer flex-col items-start rounded-xl border px-3.5 py-3 text-left transition-all lg:w-full ${active
                                    ? "border-[#FF4500] bg-orange-50 shadow-sm ring-1 ring-orange-200"
                                    : "border-orange-100 bg-white hover:border-orange-300 hover:bg-orange-50/40"
                                }`}
                        >
                            <span className={`w-full text-xs font-semibold leading-snug ${active ? "text-[#C23B00]" : "text-[#1A1A1B]"}`}>
                                {t.title}
                            </span>
                            <div className="mt-2.5 w-full">
                                <RelevanceBar score={t.relevance_score} />
                            </div>
                            <div className="mt-2.5 flex w-full items-center justify-between gap-2">
                                <SentimentBadge sentiment={t.sentiment} small />
                                <span className="shrink-0 font-mono text-[10px] text-slate-400">{t.signal_count} signals</span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Detail */}
            <AnimatePresence mode="wait">
                {theme && (
                    <motion.div
                        key={theme.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="min-w-0 flex-1 space-y-4"
                    >
                        <Card className="p-5">
                            <div className="flex items-start justify-between gap-3">
                                <h2 className="text-base font-bold tracking-tight text-[#1A1A1B]">{theme.title}</h2>
                                <SentimentBadge sentiment={theme.sentiment} small />
                            </div>
                            <p className="mb-3 mt-1 font-mono text-[10px] text-slate-400">{theme.signal_count} signals</p>
                            <RelevanceBar score={theme.relevance_score} detailed />
                            <p className="mt-4 text-sm leading-7 text-slate-600">{theme.summary}</p>

                            {(theme.brands_mentioned?.length > 0 || theme.demographic_signals?.length > 0) && (
                                <div className="mt-5 grid grid-cols-1 gap-4 border-t border-orange-100 pt-4 sm:grid-cols-2">
                                    {theme.brands_mentioned?.length > 0 && (
                                        <div>
                                            <Eyebrow>Brands</Eyebrow>
                                            <div className="mt-2 flex flex-wrap gap-1.5">
                                                {theme.brands_mentioned.map((b, i) => <Pill key={`${b}-${i}`} label={b} />)}
                                            </div>
                                        </div>
                                    )}
                                    {theme.demographic_signals?.length > 0 && (
                                        <div>
                                            <Eyebrow>Demographics</Eyebrow>
                                            <div className="mt-2 flex flex-wrap gap-1.5">
                                                {theme.demographic_signals.map((d, i) => <Pill key={`${d}-${i}`} label={d} muted />)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </Card>

                        {theme.pain_points?.length > 0 && (
                            <Card className="overflow-hidden">
                                <div className="flex items-center gap-2 border-b border-orange-100 bg-orange-50/50 px-4 py-3">
                                    <span className="h-2 w-2 rounded-[2px] bg-[#FF4500]" />
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                        Pain points <span className="text-slate-400">({theme.pain_points.length})</span>
                                    </p>
                                </div>
                                {theme.pain_points.map((pp, i) => (
                                    <PainPointRow key={i} pp={pp} initialOpen={i === 0} />
                                ))}
                            </Card>
                        )}

                        {theme.user_signals?.length > 0 && (
                            <Card className="overflow-hidden">
                                <div className="flex items-center gap-2 border-b border-orange-100 bg-orange-50/50 px-4 py-3">
                                    <span className="h-2 w-2 rounded-full bg-[#FF4500]" />
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#C23B00]">
                                        User signals <span className="text-orange-300">({theme.user_signals.length})</span>
                                    </p>
                                </div>
                                <div className="divide-y divide-orange-100">
                                    {theme.user_signals.map((signal, i) => (
                                        <div key={i} className="flex gap-3 px-4 py-3.5 transition-colors hover:bg-orange-50/40">
                                            <Quote size={14} className="mt-1 shrink-0 text-orange-300" />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm italic leading-relaxed text-slate-600">“{signal.text}”</p>
                                                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                                                    {signal.source && <span className="font-mono text-[10px] text-slate-400">{signal.source}</span>}
                                                    {signal.author && <span className="font-mono text-[10px] text-slate-400">— {signal.author}</span>}
                                                    {signal.tags?.map((tag, ti) => (
                                                        <span key={ti} className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-semibold text-[#C23B00]">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ── Tab: Actions ──────────────────────────────────────────────────────────
// Accepts either plain strings or objects, since the exact shape may vary.
const normalizeAction = (item) => {
    if (typeof item === "string") return { title: item };
    return {
        title: item?.action || item?.title || item?.step || item?.recommendation || "",
        description: item?.description || item?.details || item?.how || "",
        why: item?.why || item?.rationale || "",
        priority: item?.priority || item?.impact || "",
    };
};

const ActionsTab = ({ data }) => {
    const actions = (data.actionable_next_steps || []).map(normalizeAction).filter((a) => a.title);

    if (!actions.length) return <EmptyState text="No actionable steps found." />;

    return (
        <div className="flex flex-col gap-3">
            {actions.map((a, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                    <Card className="flex gap-4 p-4 sm:p-5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF4500] to-[#FF7A45] text-xs font-bold text-white shadow-md shadow-orange-200">
                            {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0 flex-1 space-y-1.5">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                                <p className="text-sm font-semibold leading-snug text-[#1A1A1B]">{a.title}</p>
                                {a.priority && (
                                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${SEVERITY[a.priority] ?? SEVERITY.Low}`}>
                                        {a.priority}
                                    </span>
                                )}
                            </div>
                            {a.description && <p className="text-xs leading-6 text-slate-600">{a.description}</p>}
                            {a.why && (
                                <p className="text-xs leading-6 text-slate-600">
                                    <span className="mr-1 text-[9px] font-bold uppercase tracking-widest text-[#FF4500]">Why</span>
                                    {a.why}
                                </p>
                            )}
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};

// ── Tab: Sources ──────────────────────────────────────────────────────────
const SourcesTab = ({ sources }) => {
    if (!sources.length) return <EmptyState text="No sources found." />;

    return (
        <div className="flex flex-col gap-3">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {sources.length} posts analyzed
            </p>
            {sources.map((s, i) => (
                <Card key={s.id ?? i} className="p-4 transition-colors hover:border-orange-300">
                    <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-semibold leading-snug text-[#1A1A1B]">{s.title}</p>
                        {s.url && (
                            <a
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open on Reddit"
                                className="shrink-0 rounded-lg border border-orange-200 bg-orange-50 p-1.5 text-[#FF4500] transition-colors hover:bg-[#FF4500] hover:text-white"
                            >
                                <ArrowUpRight size={14} />
                            </a>
                        )}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                        {s.subreddit && <span className="font-mono text-[10px] font-semibold text-[#FF4500]">r/{s.subreddit}</span>}
                        {s.score != null && <span className="font-mono text-[10px] text-slate-400">↑ {s.score}</span>}
                        {s.num_comments != null && <span className="font-mono text-[10px] text-slate-400">{s.num_comments} comments</span>}
                        {s.created_utc && <span className="font-mono text-[10px] text-slate-400">{fmtDate(s.created_utc * 1000)}</span>}
                    </div>

                    {s.selftext && (
                        <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-slate-500">{s.selftext}</p>
                    )}
                </Card>
            ))}
        </div>
    );
};

// ── Tab: Signals ──────────────────────────────────────────────────────────
const SignalsTab = ({ data }) => {
    const ms = data.market_signals;
    if (!ms) return <EmptyState text="No signals found." />;

    const sections = [
        { label: "Emerging topics", items: ms.emerging_topics },
        { label: "Brands mentioned", items: ms.brands_mentioned },
        { label: "Geographic signals", items: ms.geographic_signals },
        { label: "Demographic signals", items: ms.demographic_signals },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {sections.map(({ label, items }) => (
                <Card key={label} className="p-4">
                    <Eyebrow>{label}</Eyebrow>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {items?.length ? (
                            items.map((item, i) => <Pill key={`${item}-${i}`} label={item} muted />)
                        ) : (
                            <span className="text-xs text-slate-400">—</span>
                        )}
                    </div>
                </Card>
            ))}
        </div>
    );
};

// ── Tab: Meta ─────────────────────────────────────────────────────────────
const MetaTab = ({ data }) => {
    const meta = data.meta;
    if (!meta) return <EmptyState text="No metadata found." />;

    const rows = [
        { label: "Model", value: meta.model, mono: true },
        { label: "Confidence", value: meta.confidence, color: CONFIDENCE[meta.confidence] },
        { label: "Date range", value: meta.date_range, mono: true },
        { label: "Total posts", value: meta.total_posts },
        { label: "Total comments", value: meta.total_comments },
        { label: "Subreddit rank", value: meta.subreddit_rank != null ? `#${meta.subreddit_rank}` : null },
        { label: "Caveats", value: meta.caveats, italic: true },
    ].filter((r) => r.value != null);

    return (
        <Card className="overflow-hidden">
            {rows.map(({ label, value, mono, color, italic }, i) => (
                <div key={label} className={`flex items-start gap-4 px-5 py-3.5 ${i % 2 ? "bg-orange-50/40" : "bg-white"}`}>
                    <p className="w-36 shrink-0 pt-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</p>
                    <p className={`flex-1 text-sm ${mono ? "font-mono" : ""} ${color ?? "text-[#1A1A1B]"} ${italic ? "italic text-slate-500" : ""}`}>
                        {value}
                    </p>
                </div>
            ))}
        </Card>
    );
};

// ── Page ──────────────────────────────────────────────────────────────────
export default function RedditReportPage() {
    const { queryId } = useParams();
    const router = useRouter();

    const user = useAuthStore((s) => s.user);
    const authLoading = useAuthStore((s) => s.loading);

    const analysisPath = `/reddit/analysis/${queryId}`;

    const { data: queryData, isLoading: queryLoading } = useRedditQueryStatus(queryId);
    const isCompleted = queryData?.status === RSTATUS.COMPLETED;

    const { data: summary, isLoading: resultLoading, isError: resultError } = useRedditResult(queryId, isCompleted && !!user);
    const { data: sources = [] } = useRedditPosts(queryId, isCompleted && !!user);

    console.log('summary: ', summary);

    const [activeTab, setActiveTab] = useState("overview");
    const tabBarRef = useRef(null);
    const tabRefs = useRef({});

    // Guests go back to the analysis page (which shows the login prompt);
    // unfinished analyses go back to the progress view.
    useEffect(() => {
        if (authLoading || queryLoading) return;
        if (!user || (queryData?.status && !isCompleted)) {
            router.replace(analysisPath);
        }
    }, [authLoading, queryLoading, user, queryData?.status, isCompleted, router, analysisPath]);

    // Keep the active tab centered in the scrollable tab bar.
    useEffect(() => {
        const el = tabRefs.current[activeTab];
        const bar = tabBarRef.current;
        if (el && bar) {
            bar.scrollTo({
                left: el.offsetLeft - bar.offsetWidth / 2 + el.offsetWidth / 2,
                behavior: "smooth",
            });
        }
    }, [activeTab]);

    const counts = useMemo(
        () => ({
            themes: summary?.themes?.length ?? 0,
            actions: summary?.actionable_next_steps?.length ?? 0,
            sources: sources.length,
        }),
        [summary, sources]
    );

    const loading = authLoading || queryLoading || (isCompleted && resultLoading);

    if (loading || !user || !isCompleted) {
        return (
            <div className="flex min-h-[91vh] w-full flex-col items-center justify-center gap-4 px-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100">
                    <LoaderCircle className="h-9 w-9 animate-spin text-[#FF4500]" />
                </div>
                <p className="text-sm font-medium text-slate-500">Loading your report...</p>
            </div>
        );
    }

    if (resultError || !summary) {
        return (
            <div className="flex min-h-[91vh] w-full flex-col items-center justify-center gap-4 px-4 text-center">
                <p className="text-sm font-medium text-rose-600">We couldn&apos;t load this report.</p>
                <button
                    onClick={() => router.push("/reddit/analysis")}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:border-orange-300"
                >
                    <ArrowLeft size={16} /> Back
                </button>
            </div>
        );
    }

    return (
        <div className="mx-auto w-full max-w-full px-8 py-8">
            <button
                onClick={() => router.push("/dashboard/reddit")}
                className="mb-5 flex cursor-pointer items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400 transition-colors hover:text-[#FF4500]"
            >
                <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>

            {/* Hero */}
            <div className="overflow-hidden rounded-lg border border-orange-100/80 bg-white shadow-[0_16px_60px_rgba(255,69,0,0.10)]">
                <div className="h-1.5 w-full bg-linear-to-r from-[#FF4500] via-[#FF6A33] to-[#FFA24D]" />
                <div className="flex flex-col gap-4 p-5 sm:p-7">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                            <Eyebrow>Reddit analysis{summary.subreddit ? ` · r/${String(summary.subreddit).replace(/^r\//, "")}` : ""}</Eyebrow>
                            <div className="mt-2 flex items-start gap-2.5">
                                <MessageSquare className="mt-1 h-4 w-4 shrink-0 text-[#FF4500]" />
                                <h1 className="text-lg font-bold leading-snug tracking-tight text-[#1A1A1B] sm:text-xl">
                                    {queryData?.query}
                                </h1>
                            </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-3">
                            <SentimentBadge sentiment={summary.overall_sentiment} />
                            <span className="font-mono text-[11px] text-slate-400">{fmtDate(summary.analyzed_at)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab bar */}
            <div
                ref={tabBarRef}
                className="sticky top-0 z-20 mt-5 flex overflow-x-auto rounded-lg border border-orange-100 bg-white/90 p-1.5 shadow-sm backdrop-blur"
            >
                {TABS.map((tab) => {
                    const count = tab.id === "themes" ? counts.themes : tab.id === "actions" ? counts.actions : tab.id === "sources" ? counts.sources : 0;
                    const active = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            ref={(el) => (tabRefs.current[tab.id] = el)}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative flex shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold transition-colors md:flex-1 ${active ? "text-white" : "text-slate-500 hover:text-[#C23B00]"
                                }`}
                        >
                            {active && (
                                <motion.span
                                    layoutId="report-tab-pill"
                                    className="absolute inset-0 rounded-md bg-gradient-to-r from-[#FF4500] to-[#FF6A33] shadow-md shadow-orange-200"
                                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{tab.label}</span>
                            {count > 0 && (
                                <span
                                    className={`relative z-10 rounded-full px-1.5 py-0.5 font-mono text-[9px] font-bold ${active ? "bg-white/25 text-white" : "bg-orange-100 text-[#C23B00]"
                                        }`}
                                >
                                    {count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Tab content */}
            <div className="mt-5">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === "overview" && <OverviewTab data={summary} />}
                        {activeTab === "themes" && <ThemesTab data={summary} />}
                        {activeTab === "actions" && <ActionsTab data={summary} />}
                        {activeTab === "sources" && <SourcesTab sources={sources} />}
                        {activeTab === "signals" && <SignalsTab data={summary} />}
                        {activeTab === "meta" && <MetaTab data={summary} />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}