"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import {
    AlertCircle,
    ArrowLeft,
    BarChart2,
    Bug,
    ChevronRight,
    Clock,
    Lightbulb,
    LoaderCircle,
    MessageSquare,
    Quote,
    Smartphone,
    Sparkles,
    Star,
    Target,
    ThumbsUp,
    Wrench,
    Zap,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { getQueryResult } from "@/lib/api/playstore";
import { getReviews } from "@/features/playstore/api/getReviews";
import { usePlaystoreQueryStatus } from "@/features/playstore/hooks/usePlaystoreAnalysis";
import { PSTATUS } from "@/utils/playstore/status";

// ── Data hooks ────────────────────────────────────────────────────────────
const usePlaystoreResult = (queryId, enabled) =>
    useQuery({
        queryKey: ["playstore-query-result", queryId],
        queryFn: () => getQueryResult(queryId),
        enabled: !!queryId && enabled,
    });

const usePlaystoreReviews = (queryId, enabled) =>
    useQuery({
        queryKey: ["playstore-query-reviews", queryId],
        queryFn: async () => {
            const data = await getReviews(queryId);
            if (Array.isArray(data?.reviews)) return data.reviews;
            return Array.isArray(data) ? data : [];
        },
        enabled: !!queryId && enabled,
    });

// ── Config ────────────────────────────────────────────────────────────────
const TABS = [
    { id: "overview", label: "Overview", icon: BarChart2 },
    { id: "themes", label: "Themes", icon: MessageSquare },
    { id: "actions", label: "Next Steps", icon: Target },
    { id: "signals", label: "Signals", icon: Zap },
    { id: "reviews", label: "Reviews", icon: Quote },
];

const SENTIMENT = {
    positive: { label: "Positive", chip: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
    negative: { label: "Negative", chip: "bg-rose-50 text-rose-700 border-rose-200", dot: "bg-rose-500" },
    mixed: { label: "Mixed", chip: "bg-amber-50 text-amber-700 border-amber-200", dot: "bg-amber-500" },
    neutral: { label: "Neutral", chip: "bg-slate-50 text-slate-600 border-slate-200", dot: "bg-slate-400" },
};

const SEVERITY = {
    High: { dot: "bg-rose-500", badge: "bg-rose-50 text-rose-700 border-rose-200" },
    Medium: { dot: "bg-amber-500", badge: "bg-amber-50 text-amber-700 border-amber-200" },
    Low: { dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
};

const THEME_ACCENT = {
    negative: { border: "border-l-rose-500", text: "text-rose-700" },
    positive: { border: "border-l-emerald-500", text: "text-emerald-700" },
    mixed: { border: "border-l-amber-500", text: "text-amber-700" },
    neutral: { border: "border-l-slate-400", text: "text-slate-700" },
};

const fmtDate = (value) => {
    if (!value) return null;
    const d = new Date(value);
    return Number.isNaN(d.getTime())
        ? null
        : d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
};

// ── Atoms ─────────────────────────────────────────────────────────────────
const Card = ({ children, className = "" }) => (
    <div className={`rounded-2xl border border-emerald-100 bg-white shadow-[0_8px_30px_rgba(1,135,95,0.05)] ${className}`}>
        {children}
    </div>
);

const Eyebrow = ({ children, className = "" }) => (
    <p className={`text-[10px] font-bold uppercase tracking-[0.16em] text-[#01875F] ${className}`}>{children}</p>
);

const SectionHead = ({ icon: Icon, title, right }) => (
    <div className="flex items-center justify-between gap-2 border-b border-emerald-100 bg-emerald-50/50 px-4 py-3">
        <div className="flex items-center gap-2">
            <Icon size={14} className="shrink-0 text-[#01875F]" />
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{title}</p>
        </div>
        {right}
    </div>
);

const EmptyState = ({ text }) => (
    <Card className="flex h-56 items-center justify-center">
        <p className="text-sm text-slate-400">{text}</p>
    </Card>
);

const SentimentBadge = ({ sentiment, small = false }) => {
    const c = SENTIMENT[sentiment?.toLowerCase()] ?? SENTIMENT.mixed;
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

const Stars = ({ score = 0, size = 12 }) => (
    <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
            <Star
                key={s}
                size={size}
                className={s <= Math.round(score) ? "fill-amber-400 text-amber-400" : "text-slate-200"}
            />
        ))}
    </div>
);

// ── Overview ──────────────────────────────────────────────────────────────
const RatingBar = ({ star, count, total }) => {
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    const color = star >= 4 ? "from-emerald-500 to-emerald-400" : star === 3 ? "from-amber-500 to-amber-400" : "from-rose-500 to-rose-400";
    return (
        <div className="mb-2 flex items-center gap-3 last:mb-0">
            <span className="w-6 shrink-0 text-right font-mono text-[11px] font-semibold text-slate-500">{star}★</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-emerald-50">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 * (5 - star) }}
                    className={`h-full rounded-full bg-linear-to-r ${color}`}
                />
            </div>
            <span className="w-12 shrink-0 text-right font-mono text-[11px] text-slate-400">{count}</span>
        </div>
    );
};

const OverviewTab = ({ data }) => {
    const entries = useMemo(
        () =>
            data.rating_breakdown
                ? Object.entries(data.rating_breakdown)
                    .map(([star, count]) => ({ star: Number(star), count: Number(count) }))
                    .sort((a, b) => b.star - a.star)
                : [],
        [data.rating_breakdown]
    );
    const total = entries.reduce((s, r) => s + r.count, 0);

    return (
        <div className="flex flex-col gap-4">
            {data.direct_answer && (
                <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5 sm:p-6">
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-200/30 blur-2xl" />
                    <div className="relative">
                        <div className="mb-2 flex items-center gap-2">
                            <Sparkles size={15} className="text-[#01875F]" />
                            <Eyebrow>Direct answer</Eyebrow>
                        </div>
                        <p className="text-sm leading-7 text-[#0F2A22] sm:text-[15px]">{data.direct_answer}</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
                <Card className="overflow-hidden lg:col-span-3">
                    <SectionHead icon={BarChart2} title="Executive summary" />
                    <p className="p-5 text-sm leading-7 text-slate-600">{data.executive_summary || "—"}</p>
                </Card>

                <Card className="overflow-hidden lg:col-span-2">
                    <SectionHead icon={Star} title="Rating breakdown" />
                    <div className="p-5">
                        {entries.length ? (
                            entries.map((r) => <RatingBar key={r.star} star={r.star} count={r.count} total={total} />)
                        ) : (
                            <p className="text-sm text-slate-400">No rating data.</p>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
};

// ── Themes ────────────────────────────────────────────────────────────────
const PainPoint = ({ point }) => {
    const sev = SEVERITY[point.severity] ?? SEVERITY.Medium;
    return (
        <div className="mt-4 border-t border-emerald-100 pt-4">
            <div className="mb-2 flex items-start gap-2.5">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${sev.dot}`} />
                <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold leading-relaxed text-[#0F2A22]">{point.issue}</p>
                    {point.impact && (
                        <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
                            <AlertCircle size={10} /> {point.impact}
                        </p>
                    )}
                </div>
                {point.severity && (
                    <span className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-bold ${sev.badge}`}>
                        {point.severity}
                    </span>
                )}
            </div>

            {point.example_quote && (
                <div className="mb-3 flex items-start gap-2 rounded-r-xl border-l-2 border-[#01875F] bg-emerald-50/60 px-3 py-2.5 text-xs italic leading-relaxed text-[#065F46]">
                    <Quote size={11} className="mt-0.5 shrink-0 opacity-50" />
                    <span>{point.example_quote}</span>
                </div>
            )}

            {point.system_actions?.length > 0 && (
                <div>
                    <p className="mb-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        <Wrench size={10} /> Recommended actions
                    </p>
                    <div className="flex flex-col gap-2">
                        {point.system_actions.map((a, i) => (
                            <div key={i} className="rounded-xl border border-emerald-100 bg-[#F7FCF9] p-3 text-xs">
                                <p className="font-semibold text-[#0F2A22]">{a.action}</p>
                                {a.why && <p className="mt-0.5 leading-relaxed text-slate-500">{a.why}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const ThemeCard = ({ theme, defaultOpen = false }) => {
    const [open, setOpen] = useState(defaultOpen);
    const accent = THEME_ACCENT[theme.sentiment?.toLowerCase()] ?? THEME_ACCENT.mixed;

    return (
        <div className={`overflow-hidden rounded-2xl border border-l-4 border-emerald-100 bg-white shadow-[0_8px_30px_rgba(1,135,95,0.05)] ${accent.border}`}>
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex w-full cursor-pointer items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-emerald-50/40"
            >
                <div className="min-w-0 flex-1">
                    <p className={`text-sm font-semibold ${accent.text}`}>{theme.title}</p>
                    {!open && <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">{theme.summary}</p>}
                </div>

                <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-[#01875F]">
                        {theme.signal_count ?? 0} signals
                    </span>
                    {theme.relevance_score != null && (
                        <span className="text-[10px] text-slate-400">{theme.relevance_score}% relevance</span>
                    )}
                </div>

                <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.2 }} className="mt-0.5 shrink-0 text-[#01875F]">
                    <ChevronRight size={16} />
                </motion.span>
            </button>

            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                    >
                        <div className="border-t border-emerald-100 px-4 pb-5 pt-4">
                            <p className="text-sm leading-7 text-slate-600">{theme.summary}</p>
                            {theme.pain_points?.map((pp, i) => <PainPoint key={i} point={pp} />)}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ThemesTab = ({ data }) => {
    if (!Array.isArray(data.themes) || !data.themes.length) return <EmptyState text="No themes found." />;
    return (
        <div className="flex flex-col gap-3">
            {data.themes.map((t, i) => (
                <ThemeCard key={t.id ?? i} theme={t} defaultOpen={i === 0} />
            ))}
        </div>
    );
};

// ── Next steps ────────────────────────────────────────────────────────────
const ActionsTab = ({ data }) => {
    const steps = data.actionable_next_steps;
    if (!Array.isArray(steps) || !steps.length) return <EmptyState text="No actions found." />;

    return (
        <div className="flex flex-col gap-3">
            {steps.map((s, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                >
                    <Card className="flex gap-4 p-4 sm:p-5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#01875F] to-[#00B67A] text-xs font-bold text-white shadow-md shadow-emerald-200">
                            {s.priority ?? i + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                                <p className="min-w-0 flex-1 text-sm font-semibold leading-snug text-[#0F2A22]">{s.step}</p>
                                <div className="flex shrink-0 flex-wrap gap-1.5">
                                    {s.quick_win && (
                                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                                            <Sparkles size={10} /> Quick win
                                        </span>
                                    )}
                                    {s.effort && (
                                        <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                                            <Clock size={10} /> {s.effort}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {s.rationale && <p className="mt-1.5 text-xs leading-6 text-slate-500">{s.rationale}</p>}
                        </div>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};

// ── Signals ───────────────────────────────────────────────────────────────
const SignalsTab = ({ data }) => {
    const ms = data.market_signals;
    const groups = [
        { title: "Features praised", items: ms?.features_praised, icon: ThumbsUp, tone: "text-emerald-700", chip: "border-emerald-200 bg-emerald-50 text-emerald-700" },
        { title: "Features requested", items: ms?.features_requested, icon: Lightbulb, tone: "text-sky-700", chip: "border-sky-200 bg-sky-50 text-sky-700" },
        { title: "Bugs reported", items: ms?.bugs_reported, icon: Bug, tone: "text-rose-700", chip: "border-rose-200 bg-rose-50 text-rose-700" },
    ];

    if (!ms || groups.every((g) => !g.items?.length)) return <EmptyState text="No signals found." />;

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {groups.map(({ title, items, icon: Icon, tone, chip }) => (
                <Card key={title} className="p-4">
                    <div className={`mb-3 flex items-center gap-1.5 ${tone}`}>
                        <Icon size={13} />
                        <p className="text-[10px] font-bold uppercase tracking-widest">{title}</p>
                        <span className="ml-auto font-mono text-[10px] opacity-60">{items?.length ?? 0}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {items?.length ? (
                            items.map((item, i) => (
                                <span key={i} className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${chip}`}>
                                    {item}
                                </span>
                            ))
                        ) : (
                            <span className="text-xs text-slate-400">—</span>
                        )}
                    </div>
                </Card>
            ))}
        </div>
    );
};

// ── Reviews ───────────────────────────────────────────────────────────────
const INITIAL_COUNT = 20;
const LOAD_MORE_COUNT = 10;

const ReviewCard = ({ review, index }) => {
    const name = review.username || "Anonymous";
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(index, 10) * 0.02 }}
            className="flex flex-col gap-2.5 rounded-2xl border border-emerald-100 bg-white p-4"
        >
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#01875F] to-[#00B67A] text-xs font-bold uppercase text-white">
                        {name.charAt(0)}
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-[#0F2A22]">{name}</span>
                        <Stars score={review.score ?? 0} size={11} />
                    </div>
                </div>

                <div className="flex items-center gap-3 text-slate-400">
                    {review.thumbs_up > 0 && (
                        <span className="flex items-center gap-1 text-xs">
                            <ThumbsUp size={12} /> {review.thumbs_up}
                        </span>
                    )}
                    {review.review_created && <span className="text-xs">{fmtDate(review.review_created)}</span>}
                </div>
            </div>

            {review.content && <p className="text-sm leading-relaxed text-slate-600">{review.content}</p>}

            {review.reply_content && (
                <div className="rounded-xl border border-sky-100 bg-sky-50/60 px-3 py-2.5 text-xs leading-relaxed text-slate-600">
                    <span className="font-semibold text-[#01875F]">Developer reply · </span>
                    {review.reply_content}
                </div>
            )}
        </motion.div>
    );
};

const ReviewsTab = ({ reviews, loading }) => {
    const [filter, setFilter] = useState("all");
    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

    const counts = useMemo(() => {
        const c = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviews.forEach((r) => {
            const s = Math.round(r.score ?? 0);
            if (c[s] != null) c[s] += 1;
        });
        return c;
    }, [reviews]);

    const filtered = useMemo(
        () => (filter === "all" ? reviews : reviews.filter((r) => Math.round(r.score ?? 0) === filter)),
        [reviews, filter]
    );

    useEffect(() => setVisibleCount(INITIAL_COUNT), [filter]);

    if (loading) {
        return (
            <Card className="flex h-56 items-center justify-center gap-3">
                <LoaderCircle className="h-5 w-5 animate-spin text-[#01875F]" />
                <p className="text-sm text-slate-400">Loading reviews...</p>
            </Card>
        );
    }

    if (!reviews.length) return <EmptyState text="No reviews found." />;

    const chips = [{ id: "all", label: "All", count: reviews.length }, ...[5, 4, 3, 2, 1].map((s) => ({ id: s, label: `${s}★`, count: counts[s] }))];

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
                {chips.map((c) => {
                    const active = filter === c.id;
                    return (
                        <button
                            key={c.id}
                            onClick={() => setFilter(c.id)}
                            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${active
                                    ? "border-[#01875F] bg-[#01875F] text-white shadow-md shadow-emerald-200"
                                    : "border-emerald-100 bg-white text-slate-500 hover:border-emerald-300"
                                }`}
                        >
                            {c.label}
                            <span className={`font-mono text-[10px] ${active ? "text-white/80" : "text-slate-400"}`}>{c.count}</span>
                        </button>
                    );
                })}
            </div>

            {filtered.length === 0 ? (
                <EmptyState text="No reviews for this rating." />
            ) : (
                <div className="flex flex-col gap-3">
                    {filtered.slice(0, visibleCount).map((r, i) => (
                        <ReviewCard key={r.id ?? r.review_id ?? i} review={r} index={i} />
                    ))}

                    {visibleCount < filtered.length ? (
                        <div className="flex justify-center pt-2">
                            <button
                                onClick={() => setVisibleCount((p) => Math.min(p + LOAD_MORE_COUNT, filtered.length))}
                                className="cursor-pointer rounded-xl border border-emerald-200 bg-white px-5 py-2 text-xs font-semibold text-[#01875F] transition-colors hover:bg-emerald-50"
                            >
                                Load more reviews ({filtered.length - visibleCount} left)
                            </button>
                        </div>
                    ) : (
                        <p className="pt-2 text-center text-xs text-slate-400">You&apos;ve reached the end</p>
                    )}
                </div>
            )}
        </div>
    );
};

// ── Page ──────────────────────────────────────────────────────────────────
export default function PlaystoreReportPage() {
    const { queryId } = useParams();
    const router = useRouter();

    const user = useAuthStore((s) => s.user);
    const authLoading = useAuthStore((s) => s.loading);

    const analysisPath = `/playstore/analysis/${queryId}`;

    const { data: queryData, isLoading: queryLoading } = usePlaystoreQueryStatus(queryId);
    const isCompleted = queryData?.status === PSTATUS.COMPLETED;
    const canLoad = isCompleted && !!user;

    const { data: summary, isLoading: resultLoading, isError: resultError } = usePlaystoreResult(queryId, canLoad);
    const { data: reviews = [], isLoading: reviewsLoading } = usePlaystoreReviews(queryId, canLoad);

    console.log('summary: ', summary);

    const [activeTab, setActiveTab] = useState("overview");
    const [direction, setDirection] = useState(0);
    const tabBarRef = useRef(null);
    const tabRefs = useRef({});

    // Guests go back to the analysis page (login prompt); unfinished analyses go back to progress.
    useEffect(() => {
        if (authLoading || queryLoading) return;
        if (!user || (queryData?.status && !isCompleted)) router.replace(analysisPath);
    }, [authLoading, queryLoading, user, queryData?.status, isCompleted, router, analysisPath]);

    // Keep the active tab centered in the scrollable bar.
    useEffect(() => {
        const el = tabRefs.current[activeTab];
        const bar = tabBarRef.current;
        if (el && bar) {
            bar.scrollTo({ left: el.offsetLeft - bar.offsetWidth / 2 + el.offsetWidth / 2, behavior: "smooth" });
        }
    }, [activeTab]);

    const changeTab = (id) => {
        const from = TABS.findIndex((t) => t.id === activeTab);
        const to = TABS.findIndex((t) => t.id === id);
        setDirection(to >= from ? 1 : -1);
        setActiveTab(id);
    };

    const handleSwipe = (_, info) => {
        const threshold = 60;
        const i = TABS.findIndex((t) => t.id === activeTab);
        if (info.offset.x < -threshold && i < TABS.length - 1) changeTab(TABS[i + 1].id);
        if (info.offset.x > threshold && i > 0) changeTab(TABS[i - 1].id);
    };

    const loading = authLoading || queryLoading || (canLoad && resultLoading);

    if (loading || !user || !isCompleted) {
        return (
            <div className="flex min-h-[91vh] w-full flex-col items-center justify-center gap-4 px-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100">
                    <LoaderCircle className="h-9 w-9 animate-spin text-[#01875F]" />
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
                    onClick={() => router.push("/playstore")}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 hover:border-emerald-300"
                >
                    <ArrowLeft size={16} /> Back
                </button>
            </div>
        );
    }

    const avg = summary.average_rating != null ? Number(summary.average_rating) : null;
    const totalRatings = summary.rating_breakdown
        ? Object.values(summary.rating_breakdown).reduce((s, c) => s + Number(c), 0)
        : reviews.length;
    const analyzedAt = summary.analyzed_at
        ? new Date(summary.analyzed_at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })
        : null;

    const counts = {
        themes: summary.themes?.length ?? 0,
        actions: summary.actionable_next_steps?.length ?? 0,
        reviews: reviews.length,
    };

    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-8">
            <button
                onClick={() => router.push("/playstore")}
                className="mb-5 flex cursor-pointer items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400 transition-colors hover:text-[#01875F]"
            >
                <ArrowLeft className="h-3.5 w-3.5" /> Back
            </button>

            {/* Hero */}
            <div className="overflow-hidden rounded-3xl border border-emerald-100/80 bg-white shadow-[0_16px_60px_rgba(1,135,95,0.10)]">
                <div className="h-1.5 w-full bg-gradient-to-r from-[#00A0FF] via-[#00D95F] to-[#FFD500]" />

                <div className="flex flex-col gap-6 p-5 sm:p-7 md:flex-row md:items-center md:justify-between">
                    <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#01875F] to-[#00B67A] text-white shadow-lg shadow-emerald-200">
                            <Smartphone size={26} />
                        </div>
                        <div className="min-w-0">
                            <Eyebrow>Play Store analysis</Eyebrow>
                            <h1 className="mt-1 truncate text-xl font-bold tracking-tight text-[#0F2A22] sm:text-2xl">
                                {summary.app_name ?? "App Analysis"}
                            </h1>
                            <div className="mt-1.5 flex flex-wrap items-center gap-2">
                                {summary.app_id && (
                                    <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 font-mono text-[10px] text-slate-500">
                                        {summary.app_id}
                                    </span>
                                )}
                                {analyzedAt && (
                                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                                        <Clock size={10} /> {analyzedAt}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Key stats */}
                    <div className="grid shrink-0 grid-cols-3 gap-3 sm:gap-5">
                        <div className="rounded-2xl border border-emerald-100 bg-[#F7FCF9] px-4 py-3 text-center">
                            <p className="text-2xl font-bold leading-none text-[#0F2A22]">{avg != null ? avg.toFixed(1) : "—"}</p>
                            <div className="mt-1.5 flex justify-center">
                                <Stars score={avg ?? 0} size={10} />
                            </div>
                            <p className="mt-1 text-[10px] text-slate-400">{totalRatings} reviews</p>
                        </div>
                        <div className="rounded-2xl border border-emerald-100 bg-[#F7FCF9] px-4 py-3 text-center">
                            <p className="text-2xl font-bold leading-none text-[#0F2A22]">{summary.total_signals ?? "—"}</p>
                            <p className="mt-2.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Signals</p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-emerald-100 bg-[#F7FCF9] px-4 py-3">
                            <SentimentBadge sentiment={summary.overall_sentiment} small />
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Overall</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab bar */}
            <div
                ref={tabBarRef}
                className="sticky top-0 z-20 mt-5 flex overflow-x-auto rounded-2xl border border-emerald-100 bg-white/90 p-1.5 shadow-sm backdrop-blur"
            >
                {TABS.map((tab) => {
                    const active = activeTab === tab.id;
                    const Icon = tab.icon;
                    const count = counts[tab.id === "actions" ? "actions" : tab.id] ?? 0;
                    return (
                        <button
                            key={tab.id}
                            ref={(el) => (tabRefs.current[tab.id] = el)}
                            onClick={() => changeTab(tab.id)}
                            className={`relative flex shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold transition-colors md:flex-1 ${active ? "text-white" : "text-slate-500 hover:text-[#01875F]"
                                }`}
                        >
                            {active && (
                                <motion.span
                                    layoutId="playstore-report-tab"
                                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#01875F] to-[#00B67A] shadow-md shadow-emerald-200"
                                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10 flex items-center gap-1.5">
                                <Icon size={13} />
                                {tab.label}
                            </span>
                            {count > 0 && (
                                <span
                                    className={`relative z-10 rounded-full px-1.5 py-0.5 font-mono text-[9px] font-bold ${active ? "bg-white/25 text-white" : "bg-emerald-100 text-[#01875F]"
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
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleSwipe}
                className="mt-5 touch-pan-y"
            >
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={activeTab}
                        custom={direction}
                        initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
                        animate={{ opacity: 1, x: 0, transition: { duration: 0.2 } }}
                        exit={{ opacity: 0, x: direction > 0 ? -30 : 30, transition: { duration: 0.15 } }}
                    >
                        {activeTab === "overview" && <OverviewTab data={summary} />}
                        {activeTab === "themes" && <ThemesTab data={summary} />}
                        {activeTab === "actions" && <ActionsTab data={summary} />}
                        {activeTab === "signals" && <SignalsTab data={summary} />}
                        {activeTab === "reviews" && <ReviewsTab reviews={reviews} loading={reviewsLoading} />}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </div>
    );
}