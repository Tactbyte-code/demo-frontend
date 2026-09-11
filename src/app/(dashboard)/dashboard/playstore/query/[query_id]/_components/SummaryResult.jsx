"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Star, MessageSquare, TrendingUp, BarChart2,
    Zap, Bug, Lightbulb, ThumbsUp, Target, Clock,
    Cpu, Info, Quote, Wrench, AlertCircle, Sparkles,
    ChevronRight, User
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

// ─── Panel animation variants ─────────────────────────────────────────────────
const panelVariants = {
    hidden: (direction) => ({
        opacity: 0,
        x: direction > 0 ? 40 : -40,
    }),
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.2 },
    },
    exit: (direction) => ({
        opacity: 0,
        x: direction > 0 ? -40 : 40,
        transition: { duration: 0.15 },
    }),
};

// ─── Tab definitions ──────────────────────────────────────────────────────────
const TABS = [
    { id: "overview", label: "Overview", icon: BarChart2 },
    { id: "themes", label: "Themes", icon: MessageSquare },
    { id: "actions", label: "Next Steps", icon: Target },
    { id: "signals", label: "Signals", icon: Zap },
    { id: "reviews", label: "Reviews", icon: Quote }, // New Tab
];

// ─── Variant Mapping ──────────────────────────────────────────────────────────
const TAG_VARIANTS = {
    neutral: "bg-[var(--surface-raised)] text-[var(--text-subtle)] border-[var(--border-solid)]",
    praise: "bg-[var(--success-bg)] text-[var(--success)] border-[var(--success)]",
    request: "bg-[var(--info-bg)] text-[var(--info)] border-[var(--info)]",
    bug: "bg-[var(--destructive-bg)] text-[var(--destructive)] border-[var(--destructive)]",
    warning: "bg-[var(--warning-bg)] text-[var(--warning)] border-[var(--warning)]",
};

const SEV_MAP = {
    High: { dot: "bg-[var(--destructive)]", badge: "bg-[var(--destructive-bg)] text-[var(--destructive)] border-[var(--destructive)]" },
    Medium: { dot: "bg-[var(--warning)]", badge: "bg-[var(--warning-bg)] text-[var(--warning)] border-[var(--warning)]" },
    Low: { dot: "bg-[var(--success)]", badge: "bg-[var(--success-bg)] text-[var(--success)] border-[var(--success)]" },
};

const SENTIMENT_MAP = {
    positive: "bg-[var(--success-bg)] text-[var(--success)] border-[var(--success)]",
    negative: "bg-[var(--destructive-bg)] text-[var(--destructive)] border-[var(--destructive)]",
    mixed: "bg-[var(--warning-bg)] text-[var(--warning)] border-[var(--warning)]",
};

// ─── Tiny primitives ──────────────────────────────────────────────────────────
function SectionLabel({ children }) {
    return (
        <p className="text-[clamp(10px,2vw,12px)] font-semibold uppercase tracking-widest text-[var(--primary)] mb-1.5">
            {children}
        </p>
    );
}

function Tag({ children, variant = "neutral" }) {
    const variantClass = TAG_VARIANTS[variant] ?? TAG_VARIANTS.neutral;
    return (
        <span className={`inline-block text-[11px] leading-5 px-2 border rounded-none ${variantClass}`}>
            {children}
        </span>
    );
}

function SentimentPill({ sentiment }) {
    const variantClass = SENTIMENT_MAP[sentiment?.toLowerCase()] ?? SENTIMENT_MAP.mixed;
    return (
        <span className={`inline-flex items-center text-[12px] font-medium px-2.5 border rounded-none ${variantClass}`}>
            {sentiment ?? "mixed"}
        </span>
    );
}

// ─── Review Card (New) ───────────────────────────────────────────────────────
function ReviewCard({ review }) {
    return (
        <div className="p-4 bg-[var(--surface-raised)] border border-[var(--border-solid)] mb-2">
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-none bg-[var(--surface)] border border-[var(--border-solid)] flex items-center justify-center">
                        <User size={12} className="text-[var(--text-subtle)]" />
                    </div>
                    <span className="text-[12px] font-medium text-[var(--text-main)]">
                        {review.user_name || "User"}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={10}
                            className={i < (review.rating || 0) ? "text-[var(--warning)] fill-[var(--warning)]" : "text-[var(--border-solid)]"}
                        />
                    ))}
                </div>
            </div>
            <p className="text-[13px] text-[var(--text-main)] leading-relaxed mb-2">
                {review.content || review.text}
            </p>
            <div className="flex items-center justify-between">
                <span className="text-[11px] text-[var(--text-muted)]">
                    {review.date || review.at}
                </span>
                {review.sentiment && <SentimentPill sentiment={review.sentiment} />}
            </div>
        </div>
    );
}

// ─── Metric card ─────────────────────────────────────────────────────────────
function MetricCard({ label, value, sub }) {
    return (
        <div className="bg-[var(--surface-raised)] border border-[var(--border-solid)] p-3 px-3.5 rounded-none">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)] mb-1.5">
                {label}
            </p>
            {typeof value === "string" || typeof value === "number"
                ? <p className="text-2xl font-medium text-[var(--text-main)] leading-none">{value}</p>
                : <div>{value}</div>
            }
            {sub && <p className="text-[11px] text-[var(--text-muted)] mt-1">{sub}</p>}
        </div>
    );
}

// ─── Rating bar ───────────────────────────────────────────────────────────────
function RatingBar({ star, count, total }) {
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    const barColor = star >= 4 ? "bg-[var(--success)]" : star === 3 ? "bg-[var(--warning)]" : "bg-[var(--destructive)]";
    return (
        <div className="flex items-center gap-2.5 mb-1.5">
            <span className="text-[11px] font-mono text-[var(--text-subtle)] w-6 text-right shrink-0">
                {star}★
            </span>
            <div className="flex-1 h-1.25 bg-[var(--surface-raised)] overflow-hidden rounded-none">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 * (5 - star) }}
                    className={`h-full rounded-none ${barColor}`}
                />
            </div>
            <span className="text-[11px] font-mono text-[var(--text-muted)] w-7 shrink-0">
                {count}
            </span>
        </div>
    );
}

// ─── Signal group ─────────────────────────────────────────────────────────────
function SignalGroup({ title, items, variant, icon: Icon, iconColor }) {
    if (!items?.length) return null;
    return (
        <div className="mb-5">
            <div className="flex items-center gap-1.25 mb-2">
                <Icon size={11} className="shrink-0" style={{ color: iconColor }} />
                <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: iconColor }}>
                    {title}
                </p>
            </div>
            <div className="flex flex-wrap gap-1.25">
                {items.map((item, i) => <Tag key={i} variant={variant}>{item}</Tag>)}
            </div>
        </div>
    );
}

// ─── Pain point ───────────────────────────────────────────────────────────────
function PainPointItem({ point }) {
    const sc = SEV_MAP[point.severity] ?? SEV_MAP.Medium;
    return (
        <div className="pt-3 mt-3 border-t border-[var(--border)]">
            <div className="flex items-start gap-2 mb-1.5">
                <span className={`w-1.5 h-1.5 mt-1.25 shrink-0 rounded-none ${sc.dot}`} />
                <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-[var(--text-main)] leading-relaxed">
                        {point.issue}
                    </p>
                    {point.impact && (
                        <p className="text-[11px] text-[var(--text-muted)] mt-0.75 flex items-center gap-1">
                            <AlertCircle size={9} /> {point.impact}
                        </p>
                    )}
                </div>
                {point.severity && (
                    <span className={`text-[10px] font-medium px-1.5 shrink-0 border rounded-none ${sc.badge}`}>
                        {point.severity}
                    </span>
                )}
            </div>

            {point.example_quote && (
                <div className="text-[12px] italic px-3 py-2 mb-2 border-l-2 border-[var(--primary)] bg-[var(--info-bg)] text-[var(--primary)] flex items-start gap-1.5">
                    <Quote size={10} className="shrink-0 mt-0.5 opacity-50" />
                    <span>{point.example_quote}</span>
                </div>
            )}

            {point.system_actions?.length > 0 && (
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)] mb-1.5 flex items-center gap-1">
                        <Wrench size={9} /> Recommended actions
                    </p>
                    <div className="flex flex-col gap-1.25">
                        {point.system_actions.map((a, i) => (
                            <div key={i} className="text-[12px] p-2 px-2.5 bg-[var(--surface-raised)] border border-[var(--border-solid)] rounded-none">
                                <p className="font-medium text-[var(--text-main)] mb-0.5">{a.action}</p>
                                {a.why && <p className="text-[var(--text-muted)]">{a.why}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Theme card ───────────────────────────────────────────────────────────────
function ThemeCard({ theme }) {
    const [open, setOpen] = useState(false);
    const borderClass = (theme.sentiment === 'negative' ? "border-l-[var(--destructive)]" : theme.sentiment === 'positive' ? "border-l-[var(--success)]" : "border-l-[var(--warning)]");
    const textClass = (theme.sentiment === 'negative' ? "text-[var(--destructive)]" : theme.sentiment === 'positive' ? "text-[var(--success)]" : "text-[var(--warning)]");

    return (
        <div className={`border border-[var(--border-solid)] border-l-2 mb-2 rounded-none ${borderClass}`}>
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full text-left p-3 px-4 bg-[var(--surface)] border-none cursor-pointer flex items-start justify-between gap-2.5 hover:bg-[var(--surface-hover)] transition-colors"
            >
                <div className="flex-1 min-w-0">
                    <p className={`text-[13px] font-medium ${open ? 'mb-0' : 'mb-0.75'} ${textClass}`}>
                        {theme.title}
                    </p>
                    {!open && (
                        <p className="text-[12px] text-[var(--text-muted)] leading-normal line-clamp-2">
                            {theme.summary}
                        </p>
                    )}
                </div>
                <div className="flex flex-col items-end gap-0.75 shrink-0">
                    <span className="text-[10px] font-mono text-[var(--text-subtle)] bg-[var(--surface-raised)] border border-[var(--border-solid)] px-1.5 py-0.25 rounded-none">
                        {theme.signal_count} signals
                    </span>
                    {theme.relevance_score != null && (
                        <span className="text-[10px] text-[var(--text-muted)]">
                            {theme.relevance_score}% rel.
                        </span>
                    )}
                </div>
                <ChevronRight
                    size={13}
                    className={`text-[var(--text-subtle)] shrink-0 mt-0.5 transition-transform duration-200 ${open ? 'rotate-90' : 'rotate-0'}`}
                />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <Separator className="bg-[var(--border-solid)]" />
                        <div className="px-4 pb-4">
                            <p className="text-[13px] text-[var(--text-muted)] leading-relaxed pt-3">
                                {theme.summary}
                            </p>
                            {theme.pain_points?.map((pp, i) => <PainPointItem key={i} point={pp} />)}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Next step ────────────────────────────────────────────────────────────────
function NextStep({ step, index }) {
    const src = typeof step.review_source === "string"
        ? step.review_source
        : step.review_source?.issue ?? step.review_source?.solution ?? "";

    return (
        <div className="flex gap-3 items-start p-3 px-3.5 bg-[var(--surface-raised)] border border-[var(--border-solid)] rounded-none">
            <div className="w-6 h-6 shrink-0 bg-[var(--primary)] text-[var(--text-light)] flex items-center justify-center text-[11px] font-medium rounded-none">
                {step.priority ?? index + 1}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-start flex-wrap gap-2 mb-1">
                    <p className="text-[13px] font-medium text-[var(--text-main)] flex-1">{step.step}</p>
                    <div className="flex gap-1.25 shrink-0 flex-wrap">
                        {step.quick_win && (
                            <span className="text-[10px] font-medium px-1.5 py-0.5 bg-[var(--success-bg)] text-[var(--success)] border border-[var(--success)] inline-flex items-center gap-0.75 rounded-none">
                                <Sparkles size={9} /> Quick win
                            </span>
                        )}
                        {step.effort && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-[var(--surface)] border border-[var(--border-solid)] text-[var(--text-subtle)] inline-flex items-center gap-0.75 rounded-none">
                                <Clock size={9} /> {step.effort}
                            </span>
                        )}
                    </div>
                </div>
                {step.rationale && (
                    <p className="text-[12px] text-[var(--text-muted)] leading-relaxed mb-1.5">
                        {step.rationale}
                    </p>
                )}
            </div>
        </div>
    );
}

// ─── Tab bar ──────────────────────────────────────────────────────────────────
function TabBar({ tabs, active, onChange }) {
    const containerRef = useRef(null);
    const tabRefs = useRef({});

    useEffect(() => {
        const activeEl = tabRefs.current[active];
        if (activeEl && containerRef.current) {
            activeEl.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            });
        }
    }, [active]);

    return (
        <div
            ref={containerRef}
            className="
                flex 
                overflow-x-auto 
                md:overflow-hidden 
                border border-[var(--color-border-solid)] 
                bg-[var(--color-surface-raised)] 
                mb-4
            "
        >
            {tabs.map((tab, i) => {
                const isActive = active === tab.id;
                const Icon = tab.icon;

                return (
                    <button
                        key={tab.id}
                        ref={(el) => (tabRefs.current[tab.id] = el)}
                        onClick={() => onChange(tab.id)}
                        className={`
                            relative
                            flex items-center justify-center gap-1.5
                            
                            /* 📱 Mobile behavior */
                            shrink-0 px-3 py-2.5 text-[12px]
                            
                            /* 💻 Desktop behavior */
                            md:flex-1 md:shrink md:px-0 md:py-3
                            
                            whitespace-nowrap
                            transition-colors duration-200
                            
                            ${isActive
                                ? "text-[var(--color-primary)] font-medium"
                                : "text-[var(--color-subtle)]"
                            }
                            
                            ${i < tabs.length - 1
                                ? "border-r border-[var(--color-border-solid)]"
                                : ""
                            }
                        `}
                    >
                        {/* Active indicator */}
                        {isActive && (
                            <motion.div
                                layoutId="tab-indicator"
                                className="absolute inset-0 border-b-2 border-[var(--color-primary)]"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}

                        <div className="relative z-10 flex items-center gap-1.5">
                            <Icon size={12} />
                            <span>{tab.label}</span>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ children, className = "" }) {
    return (
        <div className={`bg-[var(--surface)] border border-[var(--border-solid)] mb-3 rounded-none ${className}`}>
            {children}
        </div>
    );
}

function SectionHead({ icon: Icon, title }) {
    return (
        <div className="flex items-center gap-2 p-2.5 px-4 border-b border-[var(--border)] bg-[var(--surface-card)]">
            <Icon size={13} className="text-[var(--text-subtle)] shrink-0" />
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-subtle)]">
                {title}
            </p>
        </div>
    );
}

function SectionBody({ children, className = "" }) {
    return <div className={`${className}`}>{children}</div>;
}

function StarRating({ score }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star
                    key={s}
                    className="w-3 h-3"
                    fill={s <= score ? "var(--color-warning)" : "none"}
                    style={{ color: s <= score ? "var(--color-warning)" : "var(--color-border-solid)" }}
                />
            ))}
        </div>
    );
}

function fmtDate(dateStr) {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function InlineReviewCard({ review, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }} // slightly reduced delay for performance
        >
            <div className="border border-[var(--color-border-solid)] p-4 flex flex-col gap-2 rounded-none bg-[var(--color-surface)]">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-[var(--color-foreground)]">
                            {review.username || "Anonymous"}
                        </span>
                        <StarRating score={review.score ?? 0} />
                    </div>

                    <div className="flex items-center gap-3">
                        {review.thumbs_up > 0 && (
                            <div className="flex items-center gap-1 text-[var(--color-subtle)]">
                                <ThumbsUp className="w-3 h-3" />
                                <span className="text-xs">{review.thumbs_up}</span>
                            </div>
                        )}

                        {review.review_created && (
                            <span className="text-xs text-[var(--color-subtle)]">
                                {fmtDate(review.review_created)}
                            </span>
                        )}
                    </div>
                </div>

                {review.content && (
                    <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                        {review.content}
                    </p>
                )}

                {review.reply_content && (
                    <div
                        className="mt-1 px-3 py-2 text-xs leading-relaxed border rounded-none"
                        style={{
                            backgroundColor: "var(--color-info-bg)",
                            borderColor: "var(--color-info)",
                            color: "var(--color-muted)",
                        }}
                    >
                        <span className="font-semibold text-[var(--color-primary)]">
                            Developer reply - {" "}
                        </span>
                        {review.reply_content}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function SummaryResult({ data, reviews, reviewsLoaded = true, showReviews = true }) {
    const [activeTab, setActiveTab] = useState("overview");
    const [direction, setDirection] = useState(0);

    if (!data) return null;

    const TAB_IDS = TABS.map(t => t.id);

    const handleSwipe = (event, info) => {
        const threshold = 50;
        const currentIndex = TAB_IDS.indexOf(activeTab);

        if (info.offset.x < -threshold && currentIndex < TAB_IDS.length - 1) {
            setDirection(1);
            setActiveTab(TAB_IDS[currentIndex + 1]);
        }

        if (info.offset.x > threshold && currentIndex > 0) {
            setDirection(-1);
            setActiveTab(TAB_IDS[currentIndex - 1]);
        }
    };

    const {
        app_name, app_id, analyzed_at,
        direct_answer, executive_summary,
        overall_sentiment, total_signals, average_rating,
        themes, market_signals, actionable_next_steps,
        rating_breakdown,
    } = data;

    const formattedDate = analyzed_at
        ? new Date(analyzed_at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })
        : null;

    const ratingEntries = rating_breakdown
        ? Object.entries(rating_breakdown)
            .map(([star, count]) => ({ star: Number(star), count: Number(count) }))
            .sort((a, b) => b.star - a.star)
        : [];
    const totalRatings = ratingEntries.reduce((s, r) => s + r.count, 0);

    const INITIAL_COUNT = 20;
    const LOAD_MORE_COUNT = 10;

    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const handleLoadMore = () => {
        setIsLoadingMore(true);

        // simulate slight delay (optional, feels smoother)
        setTimeout(() => {
            setVisibleCount((prev) =>
                Math.min(prev + LOAD_MORE_COUNT, reviews.length)
            );
            setIsLoadingMore(false);
        }, 300);
    };

    const handleScroll = (e) => {
        const el = e.target;
        const threshold = 100;

        if (el.scrollTop + el.clientHeight >= el.scrollHeight - threshold) {
            handleLoadMore();
        }
    };

    useEffect(() => {
        if (activeTab === "reviews") {
            setVisibleCount(INITIAL_COUNT);
        }
    }, [activeTab]);

    return (
        <div className="font-[var(--font-poppins)]">

            <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 shrink-0 bg-[var(--info-bg)] border border-[var(--primary)] flex items-center justify-center rounded-none">
                        <Sparkles size={18} className="text-[var(--primary)]" />
                    </div>
                    <div>
                        <h2 className="text-lg font-medium text-[var(--text-main)] m-0">{app_name ?? "App Analysis"}</h2>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                            {app_id && <span className="font-mono text-[11px] text-[var(--text-subtle)] bg-[var(--surface-raised)] border border-[var(--border-solid)] px-1.5 py-0.25 rounded-none">{app_id}</span>}
                            {formattedDate && <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1"><Clock size={9} /> {formattedDate}</span>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
                <MetricCard label="Avg rating" value={average_rating ?? "—"} sub={`${totalRatings} reviews`} />
                <MetricCard label="Signals" value={total_signals ?? "—"} sub="Play Store" />
                <MetricCard label="Sentiment" value={<SentimentPill sentiment={overall_sentiment} />} sub="Overall tone" />
            </div>

            <TabBar tabs={TABS} active={activeTab} onChange={setActiveTab} />

            {/* 👇 SWIPE WRAPPER ADDED HERE */}
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleSwipe}
            >
                <AnimatePresence mode="wait">

                    {activeTab === "overview" && (
                        <motion.div
                            key="overview"
                            variants={panelVariants}
                            custom={direction}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {direct_answer && (
                                <Section className="">
                                    <SectionHead icon={Info} title="Direct answer" />
                                    <SectionBody className="p-4">
                                        <div className="border-l-2 border-[var(--primary)] pl-3.5">
                                            <p className="text-[13px] text-[var(--text-main)]">{direct_answer}</p>
                                        </div>
                                    </SectionBody>
                                </Section>
                            )}
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-3 mb-3">
                                <Section className="mb-0">
                                    <SectionHead icon={BarChart2} title="Executive summary" />
                                    <SectionBody className="p-4"><p className="text-[13px] text-[var(--text-muted)]">{executive_summary}</p></SectionBody>
                                </Section>
                                <Section className="mb-0">
                                    <SectionHead icon={Star} title="Rating breakdown" />
                                    <SectionBody className="p-4">
                                        {ratingEntries.map(({ star, count }) => (
                                            <RatingBar key={star} star={star} count={count} total={totalRatings} />
                                        ))}
                                    </SectionBody>
                                </Section>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "themes" && (
                        <motion.div
                            key="themes"
                            variants={panelVariants}
                            custom={direction}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <SectionBody>
                                {Array.isArray(themes) && themes.map((t, i) => <ThemeCard key={i} theme={t} />)}
                            </SectionBody>
                        </motion.div>
                    )}

                    {activeTab === "signals" && (
                        <motion.div
                            key="signals"
                            variants={panelVariants}
                            custom={direction}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <Section>
                                <SectionHead icon={Zap} title="Market signals" />
                                <SectionBody className="p-4">
                                    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-8">
                                        <SignalGroup title="Features praised" items={market_signals?.features_praised} variant="praise" icon={ThumbsUp} iconColor="var(--success)" />
                                        <SignalGroup title="Features requested" items={market_signals?.features_requested} variant="request" icon={Lightbulb} iconColor="var(--info)" />
                                        <SignalGroup title="Bugs reported" items={market_signals?.bugs_reported} variant="bug" icon={Bug} iconColor="var(--destructive)" />
                                    </div>
                                </SectionBody>
                            </Section>
                        </motion.div>
                    )}

                    {activeTab === "reviews" && (
                        <motion.div
                            key="reviews"
                            variants={panelVariants}
                            custom={direction}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <Section>
                                <SectionHead icon={MessageSquare} title="Reviews" />
                                <SectionBody className="p-4">
                                    {reviews.length === 0 ? (
                                        <p className="text-sm py-4 text-center text-[var(--color-subtle)]">
                                            No reviews found.
                                        </p>
                                    ) : (
                                        <div className="flex flex-col gap-3 max-h-150 overflow-y-auto pr-1">
                                            {reviews?.slice(0, visibleCount).map((r, i) => (
                                                <InlineReviewCard
                                                    key={r.id ?? r.review_id ?? i}
                                                    review={r}
                                                    index={i}
                                                />
                                            ))}

                                            {/* ✅ Load More Button */}
                                            {visibleCount < reviews.length && (
                                                <div className="flex justify-center pt-2">
                                                    <button
                                                        onClick={handleLoadMore}
                                                        disabled={isLoadingMore}
                                                        className="text-xs px-3 py-1.5 border border-[var(--color-border-solid)] bg-[var(--color-surface-raised)] hover:bg-[var(--color-surface-hover)] transition-colors disabled:opacity-50"
                                                    >
                                                        {isLoadingMore ? "Loading..." : "Load more reviews"}
                                                    </button>
                                                </div>
                                            )}

                                            {/* ✅ End indicator */}
                                            {visibleCount >= reviews.length && (
                                                <p className="text-xs text-center text-[var(--color-subtle)] pt-2">
                                                    You’ve reached the end
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </SectionBody>
                            </Section>
                        </motion.div>
                    )}

                    {activeTab === "actions" && (
                        <motion.div
                            key="actions"
                            variants={panelVariants}
                            custom={direction}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <SectionBody className="p-0">
                                {Array.isArray(actionable_next_steps) &&
                                    actionable_next_steps.length > 0 ? (
                                    <div className="flex flex-col gap-2">
                                        {actionable_next_steps.map((s, i) => (
                                            <NextStep key={i} step={s} index={i} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-[300px] border border-[var(--border-solid)] bg-[var(--surface)]">
                                        <p className="text-sm text-[var(--text-subtle)]">
                                            No actions found.
                                        </p>
                                    </div>
                                )}
                            </SectionBody>
                        </motion.div>
                    )}

                </AnimatePresence>
            </motion.div>
        </div>
    );
}