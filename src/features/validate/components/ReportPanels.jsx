"use client"

import React, { useState } from 'react';
import { getConviction, getTierColor, formatLabel, getHostname } from '@/lib/utils';
import {
    AlertTriangle, ShieldAlert, ShieldCheck, Link2,
    ExternalLink, FileText, LayoutDashboard, Inbox,
    Users, Banknote, Crosshair, MapPin, Globe, Activity,
    Info,
    HelpCircle,
    SlidersHorizontal,
    TrendingUp,
} from 'lucide-react';
import {
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell
} from 'recharts';
import { motion } from 'framer-motion';
import Link from 'next/link';

// ==========================================
// 1. CONTENT DICTIONARIES FOR TOOLTIPS
// ==========================================

const DIMENSION_DEFINITIONS = {
    pain_point_severity: "Measures the exact quantifiable time or money the customer loses today. High severity means customers are desperate for a solution.",
    market_timing_and_size: "Evaluates the Total Addressable Market (TAM) and growth trajectory to ensure the market is large enough to support a venture-scale business.",
    competitive_defensibility: "Assesses the moat against incumbents. High defensibility means incumbents are entrenched; low means there is room to disrupt.",
    monetization_viability: "Evaluates the target customer's willingness to pay against standard industry pricing to ensure sustainable unit economics.",
    landscape_saturation: "Looks at the sheer number of established players. High saturation means a crowded red ocean; low means a nascent or fragmented market.",
    execution_feasibility: "Estimates the technical, regulatory, and financial friction of building the MVP and actually reaching the market."
};

const CHART_EXPLANATIONS = {
    pain_point_severity: {
        "This Venture": "Expected time or money wasted when using your proposed solution.",
        "Industry Avg": "Time or money wasted using standard, average tools available today.",
        "Legacy Tool": "Time or money wasted doing things the old-fashioned, manual way."
    },
    market_timing_and_size: {
        "This Venture": "The specific slice of the market your venture is directly targeting.",
        "Industry Target": "The broader industry addressable market size.",
        "Top Incumbent": "The total market cap or revenue of the largest player in this space."
    },
    competitive_defensibility: {
        "This Venture": "Your estimated initial market share or seed funding requirement.",
        "Average Startup": "Typical funding or market share of a mid-tier startup in this space.",
        "Top Incumbent": "The massive market share or war chest of the dominant incumbent."
    },
    monetization_viability: {
        "This Venture": "Your target pricing or average revenue per user (ARPU).",
        "Industry Avg": "The standard market price most competitors charge.",
        "Top Incumbent": "The premium pricing commanded by enterprise leaders."
    },
    landscape_saturation: {
        "This Venture": "Your single entry into the market (always 1).",
        "Direct Peers": "Number of startups doing exactly or almost exactly what you do.",
        "Total Category": "Total number of established players in the broader software category."
    },
    execution_feasibility: {
        "This Venture": "Your estimated time or capital required to build a minimum viable product (MVP).",
        "Industry Avg": "Standard time/cost for an average startup to launch in this space.",
        "Enterprise Build": "Time/cost for a massive corporation to build a similar feature."
    }
};

// ==========================================
// 2. CUSTOM RECHARTS TOOLTIPS
// ==========================================

const CustomRadarTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null;
    const data = payload[0].payload;
    const tier = getConviction(data.score * 10);

    return (
        <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-card)] p-3 shadow-lg backdrop-blur-md max-w-xs z-50">
            <div className="flex items-center justify-between gap-3 mb-1.5">
                <span className="text-xs font-bold text-[var(--text-header)] truncate">
                    {data.subject}
                </span>
                <span
                    className="text-xs font-mono font-bold px-1.5 py-0.5 rounded"
                    style={{ color: tier.color, backgroundColor: `${tier.color}15` }}
                >
                    {data.score} / 10
                </span>
            </div>
            {data.metricLabel && (
                <div className="text-[11px] text-[var(--text-muted)] flex items-center justify-between gap-2 border-t border-[var(--border)] pt-1.5 mt-1.5">
                    <span className="truncate">{data.metricLabel}:</span>
                    <span className="font-mono font-semibold text-[var(--text-main)]">
                        {data.metricValue !== null ? `${data.metricValue} ${data.metricUnit || ''}` : 'Unverified'}
                    </span>
                </div>
            )}
        </div>
    );
};

// NEW: Micro Tooltip for the Bar Chart
const CustomBarTooltip = ({ active, payload, label, dimensionKey, unit }) => {
    if (!active || !payload || !payload.length) return null;
    const value = payload[0].value;

    // Safely lookup the explanation based on the dimension and the specific bar label
    const explanation = CHART_EXPLANATIONS[dimensionKey]?.[label] || "Comparative benchmark value based on market data.";

    return (
        <div className="rounded-md border border-[var(--border)] bg-[var(--surface-card)] p-2 shadow-lg w-[180px] z-50">
            <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className="text-[10px] font-bold text-[var(--text-header)] leading-tight">{label}</span>
                <span className="text-[10px] font-mono font-bold text-[var(--text-main)] shrink-0">
                    {value.toLocaleString()} {unit}
                </span>
            </div>
            <p className="text-[9px] text-[var(--text-muted)] leading-snug border-t border-[var(--border)] pt-1.5">
                {explanation}
            </p>
        </div>
    );
};

// ==========================================
// 3. MAIN DIMENSIONS PANEL COMPONENT
// ==========================================

export const EmptyPanel = ({ text }) => (
    <div className="py-16 flex flex-col items-center justify-center text-center">
        <Inbox className="w-12 h-12 text-[var(--text-subtle)] mb-4 opacity-50" />
        <p className="text-sm font-medium text-[var(--text-subtle)]">{text}</p>
    </div>
);

export const DimensionsPanel = ({ summary, reduceMotion = false }) => {
    const [hoveredDimension, setHoveredDimension] = useState(null);

    const entries = summary?.dimensional_scores ? Object.entries(summary.dimensional_scores) : [];

    if (entries.length === 0) {
        return <EmptyPanel text="No dimensional scores are available yet." />;
    }

    const radarData = entries.map(([key, dim]) => ({
        key,
        subject: formatLabel(key),
        score: typeof dim?.score === 'number' ? dim.score : 0,
        fullMark: 10,
        metricLabel: dim?.key_metric?.label,
        metricValue: dim?.key_metric?.value,
        metricUnit: dim?.key_metric?.unit,
        signalStrength: dim?.signal_strength
    }));

    return (
        <div className="space-y-8">
            {/* Top Section: Interactive Spider / Radar Visualization */}
            <div className="p-6 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-card)] shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-[var(--border)]">
                    <div>
                        <h3 className="text-base font-bold text-[var(--text-header)] flex items-center gap-2">
                            <Activity className="w-4 h-4 text-sky-500" />
                            Dimensional Profile Radar
                        </h3>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                            Multivariate assessment across all 6 validation vectors (Scale: 1–10).
                        </p>
                    </div>
                </div>

                <div className="w-full h-[320px] sm:h-[360px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={radarData} outerRadius="70%">
                            <PolarGrid stroke="var(--border)" strokeDasharray="3 3" />
                            <PolarAngleAxis
                                dataKey="subject"
                                tick={({ payload, x, y, cx, cy, verticalAnchor, ...rest }) => (
                                    <text
                                        {...rest}
                                        x={x}
                                        y={y}
                                        textAnchor={x > cx ? 'start' : x < cx ? 'end' : 'middle'}
                                        fill="var(--text-muted)"
                                        className="text-[11px] font-medium"
                                    >
                                        {payload.value}
                                    </text>
                                )}
                            />
                            <PolarRadiusAxis angle={30} domain={[0, 10]} stroke="var(--border)" tick={{ fill: 'var(--text-subtle)', fontSize: 10 }} tickCount={6} />
                            <Tooltip content={<CustomRadarTooltip />} />
                            <Radar
                                name="Score"
                                dataKey="score"
                                stroke="#0284c7"
                                fill="#0ea5e9"
                                fillOpacity={0.35}
                                strokeWidth={2}
                                dot={{ r: 4, fill: '#0284c7', strokeWidth: 1, stroke: 'var(--surface-card)' }}
                                activeDot={{ r: 6, fill: '#38bdf8', stroke: '#0284c7', strokeWidth: 2 }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bottom Section: Granular Dimension Score Cards with Individual Bar Charts */}
            <div className="grid gap-6 sm:grid-cols-2">
                {entries.map(([key, dim], i) => {
                    const rawScore = typeof dim?.score === 'number' ? dim.score : null;
                    const scaledScore = rawScore !== null ? rawScore * 10 : 0;
                    const tier = getConviction(rawScore !== null ? scaledScore : null);
                    const signal = getTierColor(dim?.signal_strength === 'High' ? 'low' : dim?.signal_strength === 'Low' ? 'high' : dim?.signal_strength);

                    const rawChartData = dim?.key_metric?.chart_data;
                    const safeChartData = Array.isArray(rawChartData)
                        ? rawChartData.filter(d => d.value !== null && d.value !== undefined)
                        : [];
                    const hasChartData = safeChartData.length > 0;

                    return (
                        <div
                            key={key}
                            onMouseEnter={() => setHoveredDimension(key)}
                            onMouseLeave={() => setHoveredDimension(null)}
                            className="flex flex-col p-5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-card)] hover:shadow-md transition-all relative overflow-visible"
                        >
                            {/* Card Header & Scores */}
                            <div className="flex items-baseline justify-between gap-4 mb-2 relative">

                                {/* Info Tooltip Wrapper */}
                                <div className="flex items-center gap-1.5 group cursor-help">
                                    <h4 className="font-semibold text-[var(--text-main)] truncate">
                                        {formatLabel(key)}
                                    </h4>
                                    <Info className="w-3.5 h-3.5 text-[var(--text-subtle)] transition-colors group-hover:text-[var(--text-main)]" />

                                    {/* Hover Reveal Box (CSS driven) */}
                                    <div className="absolute top-full left-0 mt-2 w-64 p-2.5 bg-[var(--surface-raised)] border border-[var(--border)] rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 pointer-events-none">
                                        <p className="text-[10px] text-[var(--text-main)] leading-relaxed">
                                            {DIMENSION_DEFINITIONS[key] || "Measures this specific vector of the venture's viability."}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    {dim?.signal_strength && (
                                        <span
                                            className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full"
                                            style={{ color: signal.color, backgroundColor: signal.tint }}
                                        >
                                            {dim.signal_strength} Sig
                                        </span>
                                    )}
                                    <span className="text-sm font-bold tabular-nums" style={{ color: tier.color }}>
                                        {rawScore !== null ? rawScore : '—'}
                                        <span className="text-[var(--text-subtle)] font-normal text-xs">/10</span>
                                    </span>
                                </div>
                            </div>

                            {/* Score Progress Bar */}
                            <div className="h-2 rounded-full bg-[var(--surface-raised)] overflow-hidden mb-3">
                                <motion.div
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: tier.color }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${scaledScore}%` }}
                                    transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 0.05 * i }}
                                />
                            </div>

                            {/* Rationale Narrative */}
                            {dim?.rationale && (
                                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4 flex-grow">
                                    {dim.rationale}
                                </p>
                            )}

                            {/* Individual Dimension Bar Chart */}
                            <div className="mt-auto pt-4 border-t border-[var(--border)]">
                                <div className="flex items-center justify-between mb-3 text-xs text-[var(--text-subtle)] font-medium">
                                    <span>{dim?.key_metric?.label || "Comparative Analysis"}</span>
                                    <span>{dim?.key_metric?.unit}</span>
                                </div>

                                {hasChartData ? (
                                    <div className="h-36 w-full relative z-10">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={safeChartData} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                                                <XAxis
                                                    dataKey="name"
                                                    tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
                                                    axisLine={false}
                                                    tickLine={false}
                                                />
                                                <YAxis
                                                    tick={{ fontSize: 10, fill: 'var(--text-muted)' }}
                                                    axisLine={false}
                                                    tickLine={false}
                                                    tickFormatter={(val) => val.toLocaleString()}
                                                />

                                                {/* Use the new CustomBarTooltip */}
                                                <Tooltip
                                                    cursor={{ fill: 'var(--surface-hover)' }}
                                                    content={<CustomBarTooltip dimensionKey={key} unit={dim?.key_metric?.unit} />}
                                                />

                                                <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={40}>
                                                    {safeChartData.map((entry, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={index === 0 ? tier.color : 'var(--border)'}
                                                            opacity={index === 0 ? 1 : 0.6}
                                                        />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-12 rounded bg-[var(--surface-raised)] text-xs text-[var(--text-subtle)] border border-[var(--border)]">
                                        No quantitative benchmark data found
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// --- KPI Metric Badge Component ---
// const MetricBadge = ({ metric }) => {
//     if (!metric) return null;
//     const hasValue = metric.value !== null && metric.value !== undefined;

//     return (
//         <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[var(--surface-raised)] border border-[var(--border)] mt-3">
//             <div className="flex items-center gap-1.5 text-xs text-[var(--text-subtle)] truncate">
//                 <TrendingUp className="w-3.5 h-3.5 shrink-0 opacity-70" />
//                 <span className="truncate">{metric.label}</span>
//             </div>

//             <div className="flex items-baseline gap-1 shrink-0 font-mono">
//                 {hasValue ? (
//                     <>
//                         <span className="text-sm font-bold text-[var(--text-main)]">
//                             {Number(metric.value).toLocaleString()}
//                         </span>
//                         {metric.unit && (
//                             <span className="text-xs text-[var(--text-muted)]">
//                                 {metric.unit}
//                             </span>
//                         )}
//                     </>
//                 ) : (
//                     <span
//                         className="text-[11px] font-medium px-2 py-0.5 rounded bg-[var(--surface-hover)] text-[var(--text-subtle)] border border-[var(--border)]"
//                         title="No concrete figure identified in scanned market sources"
//                     >
//                         Unverified
//                     </span>
//                 )}
//             </div>
//         </div>
//     );
// };

export const VerdictPanel = ({ summary }) => (
    <div className="flex gap-4 p-2">
        <LayoutDashboard className="w-6 h-6 shrink-0 text-[var(--primary)] mt-1" />
        <p className="text-lg leading-relaxed text-[var(--text-main)] font-medium max-w-[65ch]">
            {summary?.executive_verdict || "No executive verdict is available for this query yet."}
        </p>
    </div>
);

export const CompetitorsPanel = ({ summary }) => {
    const list = Array.isArray(summary?.competitive_landscape) ? summary.competitive_landscape : [];
    if (list.length === 0) return <EmptyPanel text="No competitive landscape data is available yet." />;

    // Partition into local/regional challengers and global incumbents
    const localCompetitors = list.filter((item) =>
        ['local', 'regional'].includes(item?.scope?.toLowerCase())
    );
    const globalCompetitors = list.filter(
        (item) => !['local', 'regional'].includes(item?.scope?.toLowerCase())
    );

    const CompetitorCard = ({ competitor }) => {
        const tier = getTierColor(competitor?.threat_level);
        const isLocal = competitor?.scope?.toLowerCase() === 'local';
        const isRegional = competitor?.scope?.toLowerCase() === 'regional';

        return (
            <div className="flex flex-col p-5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-card)] shadow-sm transition-shadow hover:shadow-md">

                {/* Header: Name, Scope & Threat Level */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                        <ShieldAlert className="w-5 h-5 shrink-0 text-[var(--text-subtle)]" />
                        <h4 className="font-bold text-[var(--text-header)] text-lg line-clamp-1 flex items-center gap-2">
                            {competitor?.name || 'Unnamed'}

                            {/* Website Link Icon */}
                            {competitor?.website_url && (
                                <Link
                                    href={competitor.website_url.startsWith('http') ? competitor.website_url : `https://${competitor.website_url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--text-muted)] hover:text-sky-500 transition-colors shrink-0"
                                    title={`Visit ${competitor.name}`}
                                >
                                    <ExternalLink className="w-4 h-4" />
                                </Link>
                            )}
                        </h4>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                        {competitor?.scope && (
                            <span
                                className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${isLocal
                                    ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20'
                                    : isRegional
                                        ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
                                        : 'bg-[var(--surface-raised)] text-[var(--text-muted)] border-[var(--border)]'
                                    }`}
                            >
                                {isLocal || isRegional ? (
                                    <MapPin className="w-3 h-3" />
                                ) : (
                                    <Globe className="w-3 h-3" />
                                )}
                                {formatLabel(competitor.scope)}
                            </span>
                        )}

                        {competitor?.threat_level && (
                            <span
                                className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap"
                                style={{ color: tier.color, backgroundColor: tier.tint }}
                            >
                                {formatLabel(competitor.threat_level)} Threat
                            </span>
                        )}
                    </div>
                </div>

                {/* Description */}
                {competitor?.description && (
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5 pb-4 border-b border-[var(--border)]">
                        {competitor.description}
                    </p>
                )}

                {/* Details Grid */}
                <div className="flex flex-col gap-4 flex-grow">
                    <div className="grid grid-cols-2 gap-4">
                        {competitor?.target_segment && (
                            <div>
                                <div className="flex items-center gap-1.5 mb-1 text-[var(--text-subtle)]">
                                    <Users className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Target Segment</span>
                                </div>
                                <p className="text-sm text-[var(--text-main)] font-medium leading-snug">
                                    {competitor.target_segment}
                                </p>
                            </div>
                        )}

                        {competitor?.pricing_model && (
                            <div>
                                <div className="flex items-center gap-1.5 mb-1 text-[var(--text-subtle)]">
                                    <Banknote className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Pricing</span>
                                </div>
                                <p className="text-sm text-[var(--text-main)] font-medium tabular-nums leading-snug">
                                    {competitor.pricing_model}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Core Weakness */}
                    {competitor?.core_weakness && (
                        <div className="bg-[var(--destructive-bg)] border border-[var(--destructive)]/30 rounded-lg p-3 mt-2">
                            <div className="flex items-center gap-1.5 mb-1.5 text-[var(--destructive)]">
                                <AlertTriangle className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Core Weakness</span>
                            </div>
                            <p className="text-sm text-[var(--text-main)] leading-relaxed">
                                {competitor.core_weakness}
                            </p>
                        </div>
                    )}

                    {/* Attack Vector / How to Differentiate */}
                    {competitor?.how_to_differentiate && (
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 mt-auto">
                            <div className="flex items-center gap-1.5 mb-1.5 text-emerald-600 dark:text-emerald-400">
                                <Crosshair className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Attack Vector</span>
                            </div>
                            <p className="text-sm text-[var(--text-main)] leading-relaxed">
                                {competitor.how_to_differentiate}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-10">
            {/* Section 1: Local & Regional Challengers */}
            {localCompetitors.length > 0 && (
                <section className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-sky-500" />
                            <h3 className="text-base font-bold text-[var(--text-header)] tracking-tight">
                                Local & Regional Challengers
                            </h3>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                            {localCompetitors.length} {localCompetitors.length === 1 ? 'player' : 'players'}
                        </span>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                        {localCompetitors.map((competitor, i) => (
                            <CompetitorCard key={`local-${competitor?.name || i}`} competitor={competitor} />
                        ))}
                    </div>
                </section>
            )}

            {/* Section 2: Global Incumbents */}
            {globalCompetitors.length > 0 && (
                <section className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                        <div className="flex items-center gap-2">
                            <Globe className="w-5 h-5 text-indigo-500" />
                            <h3 className="text-base font-bold text-[var(--text-header)] tracking-tight">
                                Global Incumbents
                            </h3>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                            {globalCompetitors.length} {globalCompetitors.length === 1 ? 'player' : 'players'}
                        </span>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2">
                        {globalCompetitors.map((competitor, i) => (
                            <CompetitorCard key={`global-${competitor?.name || i}`} competitor={competitor} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export const VulnerabilitiesPanel = ({ summary }) => {
    const list = Array.isArray(summary?.critical_vulnerabilities) ? summary.critical_vulnerabilities : []
    if (list.length === 0) return <EmptyPanel text="No critical vulnerabilities have been flagged yet." />

    return (
        <ul className="space-y-3">
            {list.map((item, i) => (
                <li
                    key={i}
                    className="flex gap-4 p-4 rounded-[var(--radius)] border border-[var(--destructive)] bg-[var(--destructive-bg)]"
                >
                    <AlertTriangle className="w-5 h-5 shrink-0 text-[var(--destructive)] mt-0.5" />
                    <span className="text-sm leading-relaxed text-[var(--text-main)] font-medium">{item}</span>
                </li>
            ))}
        </ul>
    )
};

export const NextStepsPanel = ({ summary }) => {
    const list = Array.isArray(summary?.actionable_next_steps) ? summary.actionable_next_steps : []
    if (list.length === 0) return <EmptyPanel text="No next steps have been generated yet." />

    return (
        <ol className="space-y-4">
            {list.map((step, i) => (
                <li key={i} className="flex gap-4 p-5 rounded-[var(--radius)] bg-[var(--surface-card)] border border-[var(--border)] shadow-sm">
                    <div className="shrink-0 mt-0.5">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--primary)] text-white font-bold text-sm shadow-inner">
                            {i + 1}
                        </div>
                    </div>
                    <span className="text-base leading-relaxed text-[var(--text-main)] font-medium">{step}</span>
                </li>
            ))}
        </ol>
    )
};

export const SourcesPanel = ({ summary }) => {
    const evidentiary = Array.isArray(summary?.evidentiary_sources) ? summary.evidentiary_sources : []
    const allSources = Array.isArray(summary?.all_sources) ? summary.all_sources : []

    if (evidentiary.length === 0 && allSources.length === 0) {
        return <EmptyPanel text="No sources are available yet." />
    }

    return (
        <div className="space-y-6">

            {/* Evidentiary Sources Card */}
            {evidentiary.length > 0 && (
                <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <ShieldCheck className="w-5 h-5 text-[var(--primary)]" />
                        <h3 className="font-bold text-[var(--text-header)]">Evidentiary Sources</h3>
                    </div>
                    <ul className="grid gap-3 sm:grid-cols-2">
                        {evidentiary.map((source, i) => {
                            const url = typeof source === 'string' ? source : source?.url
                            const title = typeof source === 'object' ? source?.title : null
                            if (!url) return null
                            return (
                                <li key={i}>
                                    <a
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)] hover:shadow-sm transition-all group h-full"
                                    >
                                        <ExternalLink className="w-4 h-4 shrink-0 text-[var(--text-subtle)] group-hover:text-[var(--primary)] transition-colors" />
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-sm font-semibold text-[var(--text-main)] group-hover:text-[var(--primary)] truncate transition-colors">
                                                {title || getHostname(url)}
                                            </span>
                                            <span className="text-xs text-[var(--text-subtle)] truncate">{getHostname(url)}</span>
                                        </div>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}

            {/* All Explored Sources Card */}
            {allSources.length > 0 && (
                <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface-card)] shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <Link2 className="w-5 h-5 text-[var(--text-subtle)]" />
                        <h3 className="font-bold text-[var(--text-header)]">All Explored Sources</h3>
                    </div>
                    <ul className="flex flex-col gap-3">
                        {allSources.map((source, i) => {
                            if (!source?.url) return null;
                            return (
                                <li key={i}>
                                    <a
                                        href={source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block p-4 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] transition-all group"
                                    >
                                        <h4 className="text-sm font-semibold text-[var(--text-main)] group-hover:text-[var(--primary)] transition-colors mb-1 line-clamp-1">
                                            {source.title || getHostname(source.url)}
                                        </h4>
                                        <div className="flex items-center gap-1.5 text-xs text-[var(--text-subtle)]">
                                            <ExternalLink className="w-3 h-3 shrink-0" />
                                            <span className="truncate">{source.url}</span>
                                        </div>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}

        </div>
    )
};

export const MetaPanel = ({ summary }) => {
    const entries = summary?.meta ? Object.entries(summary.meta).filter(([, v]) => v !== null && v !== undefined) : []
    if (entries.length === 0) return <EmptyPanel text="No generation metadata is available." />

    return (
        <dl className="divide-y divide-[var(--border)] rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface-card)] overflow-hidden">
            {entries.map(([key, value]) => (
                <div key={key} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-[var(--surface-hover)] transition-colors">
                    <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-[var(--text-subtle)]" />
                        <dt className="text-sm font-medium text-[var(--text-muted)]">{formatLabel(key)}</dt>
                    </div>
                    <dd className="text-sm font-bold text-[var(--text-main)] tabular-nums">{String(value)}</dd>
                </div>
            ))}
        </dl>
    )
};