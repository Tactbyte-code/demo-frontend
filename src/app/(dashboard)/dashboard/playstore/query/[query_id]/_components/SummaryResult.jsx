"use client";
import { motion } from "framer-motion";
import {
    TrendingUp, Star, MessageSquare, Lightbulb,
    BarChart2, AlertCircle, CheckSquare, Zap,
    Bug, Wrench, ThumbsUp, Target, Clock, Cpu,
    Info, Quote, Sparkles
} from "lucide-react";

// ─── helpers ───────────────────────────────────────────────────────────────────
function SectionHeader({ icon: Icon, title }) {
    return (
        <div className="flex items-center gap-2 mb-4">
            <Icon className="w-4 h-4" style={{ color: "var(--primary)" }} />
            <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>
                {title}
            </h3>
        </div>
    );
}

function Card({ children, delay = 0, className = "" }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className={`rounded-2xl p-6 ${className}`}
            style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border-solid)",
                boxShadow: "var(--shadow-sm)",
            }}
        >
            {children}
        </motion.div>
    );
}

// ─── Sentiment & Severity badges ───────────────────────────────────────────────
const SENTIMENT_STYLES = {
    positive: { bg: "color-mix(in srgb, var(--success) 12%, var(--surface))", color: "var(--success)", border: "color-mix(in srgb, var(--success) 25%, transparent)" },
    neutral: { bg: "color-mix(in srgb, var(--accent) 12%, var(--surface))", color: "var(--accent)", border: "color-mix(in srgb, var(--accent) 25%, transparent)" },
    negative: { bg: "color-mix(in srgb, var(--destructive) 12%, var(--surface))", color: "var(--destructive)", border: "color-mix(in srgb, var(--destructive) 25%, transparent)" },
    mixed: { bg: "color-mix(in srgb, var(--text-muted) 12%, var(--surface))", color: "var(--text-main)", border: "color-mix(in srgb, var(--border-solid) 25%, transparent)" },
};

function SentimentBadge({ sentiment }) {
    const key = sentiment?.toLowerCase();
    const s = SENTIMENT_STYLES[key] ?? SENTIMENT_STYLES.neutral;
    return (
        <span
            className="px-3 py-1 rounded-full text-xs font-bold capitalize"
            style={{ backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}` }}
        >
            {sentiment ?? "—"}
        </span>
    );
}

function SeverityBadge({ severity }) {
    const colorMap = {
        High: { bg: "color-mix(in srgb, var(--destructive) 15%, transparent)", color: "var(--destructive)" },
        Medium: { bg: "color-mix(in srgb, var(--accent) 15%, transparent)", color: "var(--accent)" },
        Low: { bg: "color-mix(in srgb, var(--success) 15%, transparent)", color: "var(--success)" },
    };
    const style = colorMap[severity] || colorMap.Medium;
    return (
        <span className="text-xs font-bold px-2 py-0.5 rounded" style={style}>
            {severity}
        </span>
    );
}

// ─── Rating breakdown bar ──────────────────────────────────────────────────────
function RatingBar({ star, count, total }) {
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    return (
        <div className="flex items-center gap-3">
            <span className="text-xs font-mono w-5 text-right shrink-0" style={{ color: "var(--text-subtle)" }}>
                {star}★
            </span>
            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--border-solid)" }}>
                <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: star >= 4 ? "var(--success)" : star === 3 ? "var(--accent)" : "var(--destructive)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />
            </div>
            <span className="text-xs font-semibold w-8 shrink-0" style={{ color: "var(--text-muted)" }}>
                {count}
            </span>
        </div>
    );
}

// ─── Pain Point Item (Nested inside Themes) ───────────────────────────────────
function PainPointItem({ point }) {
    return (
        <div
            className="mt-3 pt-3 border-t flex flex-col gap-2"
            style={{ borderColor: "var(--border-subtle)" }}
        >
            <div className="flex justify-between items-start gap-2">
                <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: "var(--text-main)" }}>{point.issue}</p>
                    {point.impact && (
                        <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "var(--text-subtle)" }}>
                            <AlertCircle className="w-3 h-3" /> {point.impact}
                        </p>
                    )}
                </div>
                <SeverityBadge severity={point.severity} />
            </div>

            {point.example_quote && (
                <div
                    className="text-xs italic px-3 py-2 rounded-lg border-l-2 flex items-start gap-2"
                    style={{ backgroundColor: "var(--glass-surface)", borderColor: "var(--primary)", color: "var(--text-muted)" }}
                >
                    <Quote className="w-3 h-3 mt-0.5 shrink-0 opacity-50" />
                    <span>{point.example_quote}</span>
                </div>
            )}

            {/* User Suggestions & System Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {point.user_suggested_solutions?.length > 0 && (
                    <div className="text-xs">
                        <span className="font-bold block mb-1" style={{ color: "var(--text-subtle)" }}>User Suggestions</span>
                        <ul className="list-disc list-inside space-y-1" style={{ color: "var(--text-muted)" }}>
                            {point.user_suggested_solutions.map((s, i) => <li key={i}>{s}</li>)}
                        </ul>
                    </div>
                )}
                {point.system_actions?.length > 0 && (
                    <div className="text-xs">
                        <span className="font-bold block mb-1 flex items-center gap-1" style={{ color: "var(--text-subtle)" }}>
                            <Wrench className="w-3 h-3" /> System Actions
                        </span>
                        <ul className="space-y-1.5">
                            {point.system_actions.map((action, i) => (
                                <li key={i} className="flex flex-col p-2 rounded bg-black/5 dark:bg-white/5">
                                    <span className="font-semibold" style={{ color: "var(--text-main)" }}>{action.action}</span>
                                    {action.why && <span style={{ color: "var(--text-muted)" }} className="mt-0.5">Why: {action.why}</span>}
                                    {action.how && <span style={{ color: "var(--text-muted)" }} className="mt-0.5 opacity-80">How: {action.how}</span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Theme Card (Expanded) ────────────────────────────────────────────────────────
function ThemeCard({ theme }) {
    const s = SENTIMENT_STYLES[theme.sentiment?.toLowerCase()] ?? SENTIMENT_STYLES.neutral;

    return (
        <motion.div
            className="rounded-xl p-4 flex flex-col"
            // style={{ backgroundColor: s.bg, border: `1px solid ${s.border}` }}
            style={{ backgroundColor: "var(--surface)", border: `1px solid ${s.border}` }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                    <h4 className="text-base font-bold" style={{ color: s.color }}>{theme.title}</h4>
                    {theme.summary && <p className="text-xs mt-1" style={{ color: "var(--text-main)" }}>{theme.summary}</p>}
                </div>
                <div className="text-right shrink-0">
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--surface)", color: "var(--text-subtle)", border: "1px solid var(--border-solid)" }}>
                        {theme.signal_count} signals
                    </span>
                    {theme.relevance_score != null && (
                        <div className="text-xs mt-1 font-bold" style={{ color: "var(--text-subtle)" }}>
                            Relevance: {theme.relevance_score}%
                        </div>
                    )}
                </div>
            </div>

            {/* Render Pain Points */}
            {theme.pain_points?.length > 0 && (
                <div className="mt-2 space-y-2">
                    {theme.pain_points.map((pp, i) => <PainPointItem key={i} point={pp} />)}
                </div>
            )}
        </motion.div>
    );
}

// ─── Market Signal Item ────────────────────────────────────────────────────────
function MarketSignalCategory({ title, items, icon: Icon, colorVar }) {
    if (!items || items.length === 0) return null;

    return (
        <div>
            <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4" style={{ color: colorVar }} />
                <span className="text-sm font-bold capitalize" style={{ color: "var(--text-subtle)" }}>{title.replace(/_/g, ' ')}</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {items.map((item, i) => (
                    <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-md"
                        style={{ backgroundColor: "var(--glass-surface)", border: "1px solid var(--border-subtle)", color: "var(--text-main)" }}
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}

// ─── Next step item ────────────────────────────────────────────────────────────
function NextStep({ step, index }) {
    // Robust handling of review_source which can be a string or an object
    const renderSource = (source) => {
        if (!source) return null;

        if (typeof source === 'string') {
            return <span className="italic">"{source}"</span>;
        }

        if (typeof source === 'object') {
            // Extract relevant fields from the evidence object
            const text = source.solution || source.issue || '';
            const theme = source.theme;
            return (
                <span className="italic">
                    "{text}"
                    {theme && <span className="font-normal not-italic opacity-60 ml-1">({theme})</span>}
                </span>
            );
        }

        return String(source);
    };

    return (
        <div className="flex gap-3 items-start p-3 rounded-xl" style={{ backgroundColor: "var(--glass-surface)" }}>
            <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                style={{ backgroundColor: "var(--primary)", color: "white" }}
            >
                {step.priority || index + 1}
            </div>
            <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-sm font-bold mr-2" style={{ color: "var(--text-main)" }}>{step.step}</span>
                    <div className="flex gap-1.5">
                        {step.quick_win && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1" style={{ backgroundColor: "color-mix(in srgb, var(--success) 20%, transparent)", color: "var(--success)" }}>
                                <Sparkles className="w-2.5 h-2.5" /> Quick Win
                            </span>
                        )}
                        {step.effort && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase" style={{ backgroundColor: "var(--border-solid)", color: "var(--text-subtle)" }}>
                                {step.effort}
                            </span>
                        )}
                    </div>
                </div>

                {step.rationale && <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{step.rationale}</p>}

                <div className="flex flex-col gap-1 mt-1 border-l-2 pl-2" style={{ borderColor: "var(--border-subtle)" }}>
                    {step.how && (
                        <p className="text-xs" style={{ color: "var(--text-subtle)" }}>
                            <strong className="text-[var(--text-main)]">How: </strong> {step.how}
                        </p>
                    )}
                    {step.review_source && (
                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                            Source: {renderSource(step.review_source)}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export function SummaryResult({ data }) {
    if (!data) return null;

    const {
        app_name,
        analyzed_at,
        direct_answer,
        executive_summary,
        overall_sentiment,
        total_signals,
        average_rating,
        themes,
        market_signals,
        actionable_next_steps,
        rating_breakdown,
        meta,
    } = data;

    // Format Date
    const formattedDate = analyzed_at
        ? new Date(analyzed_at).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
        : null;

    // Rating breakdown logic
    const ratingEntries = rating_breakdown
        ? Object.entries(rating_breakdown)
            .map(([star, count]) => ({ star: Number(star), count: Number(count) }))
            .sort((a, b) => b.star - a.star)
        : [];
    const totalRatings = ratingEntries.reduce((s, r) => s + r.count, 0);

    return (
        <div className="flex flex-col gap-5">
            {/* ── Header ───────────────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                <div>
                    <h2 className="text-xl font-bold" style={{ color: "var(--text-main)" }}>{app_name || "App Analysis"}</h2>
                    {formattedDate && (
                        <p className="text-xs flex items-center gap-1 mt-1" style={{ color: "var(--text-muted)" }}>
                            <Clock className="w-3 h-3" /> Analyzed on {formattedDate}
                        </p>
                    )}
                </div>
                {meta?.model && (
                    <span className="text-xs font-mono px-2 py-1 rounded-md flex items-center gap-1" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--border-solid)", color: "var(--text-subtle)" }}>
                        <Cpu className="w-3 h-3" /> {meta.model}
                    </span>
                )}
            </div>

            {/* ── Direct answer ───────────────────────────────────────────────────── */}
            {direct_answer && (
                <Card delay={0.05}>
                    <div
                        className="rounded-xl px-5 py-4"
                        style={{
                            background: "linear-gradient(135deg, color-mix(in srgb, var(--primary) 8%, var(--surface)), color-mix(in srgb, var(--accent) 5%, var(--surface)))",
                            border: "1px solid var(--glass-border)",
                        }}
                    >
                        <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--primary)" }}>
                            Direct Answer
                        </p>
                        <p className="text-base font-semibold leading-relaxed" style={{ color: "var(--text-main)" }}>
                            {direct_answer}
                        </p>
                    </div>
                </Card>
            )}

            {/* ── Stats row ───────────────────────────────────────────────────────── */}
            <div className="grid grid-cols-3 gap-4">
                <StatCard icon={Star} label="Avg Rating" value={average_rating ?? "—"} delay={0.07} />
                <StatCard icon={MessageSquare} label="Signals" value={total_signals ?? "—"} delay={0.09} />
                <StatCard
                    icon={TrendingUp}
                    label="Sentiment"
                    value={<SentimentBadge sentiment={overall_sentiment} />}
                    delay={0.11}
                    raw
                />
            </div>

            {/* ── Executive summary ───────────────────────────────────────────────── */}
            {executive_summary && (
                <Card delay={0.13}>
                    <SectionHeader icon={BarChart2} title="Executive Summary" />
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        {executive_summary}
                    </p>
                </Card>
            )}

            {/* ── Market signals (New Structure) ──────────────────────────────────────── */}
            {market_signals && typeof market_signals === 'object' && (
                <Card delay={0.15}>
                    <SectionHeader icon={Zap} title="Market Signals" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <MarketSignalCategory title="features_praised" items={market_signals.features_praised} icon={ThumbsUp} colorVar="var(--success)" />
                        <MarketSignalCategory title="features_requested" items={market_signals.features_requested} icon={Lightbulb} colorVar="var(--accent)" />
                        <MarketSignalCategory title="bugs_reported" items={market_signals.bugs_reported} icon={Bug} colorVar="var(--destructive)" />
                        <MarketSignalCategory title="competitor_mentions" items={market_signals.competitor_mentions} icon={TrendingUp} colorVar="var(--primary)" />
                    </div>
                </Card>
            )}

            {/* ── Rating breakdown ────────────────────────────────────────────────── */}
            {ratingEntries.length > 0 && (
                <Card delay={0.17}>
                    <SectionHeader icon={Star} title="Rating Breakdown" />
                    <div className="flex flex-col gap-2.5">
                        {ratingEntries.map(({ star, count }) => (
                            <RatingBar key={star} star={star} count={count} total={totalRatings} />
                        ))}
                    </div>
                </Card>
            )}

            {/* ── Themes (Deep Analysis) ──────────────────────────────────────────────── */}
            {Array.isArray(themes) && themes.length > 0 && (
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 px-1">
                        <SectionHeader icon={MessageSquare} title="Deep Dive Themes" />
                    </div>
                    {themes.map((t, i) => <ThemeCard key={i} theme={t} />)}
                </div>
            )}

            {/* ── Actionable next steps ────────────────────────────────────────────── */}
            {Array.isArray(actionable_next_steps) && actionable_next_steps.length > 0 && (
                <Card delay={0.21}>
                    <SectionHeader icon={Target} title="Actionable Next Steps" />
                    <div className="flex flex-col gap-3">
                        {actionable_next_steps.map((s, i) => <NextStep key={i} step={s} index={i} />)}
                    </div>
                </Card>
            )}

            {/* ── Meta Footer ────────────────────────────────────────────────────── */}
            {meta && (
                <div className="flex justify-between items-center text-xs px-2 opacity-70" style={{ color: "var(--text-muted)" }}>
                    <span className="flex items-center gap-1">
                        <Info className="w-3 h-3" />
                        Confidence: <span className="font-bold">{meta.confidence || 'N/A'}</span>
                    </span>
                    {meta.caveats && <span className="text-right italic hidden sm:block">{meta.caveats}</span>}
                </div>
            )}
        </div>
    );
}

// ─── StatCard ──────────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, delay, raw = false }) {
    return (
        <Card delay={delay}>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5" style={{ color: "var(--text-subtle)" }} />
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-subtle)" }}>
                        {label}
                    </span>
                </div>
                {raw ? (
                    <div>{value}</div>
                ) : (
                    <span className="text-2xl font-bold" style={{ color: "var(--text-main)" }}>{value}</span>
                )}
            </div>
        </Card>
    );
}