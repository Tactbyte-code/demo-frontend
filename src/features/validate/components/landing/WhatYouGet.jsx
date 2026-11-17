"use client";

import {
    ArrowUpRight,
    BrainCircuit,
    ChartNoAxesCombined,
    CircleCheck,
    CircleHelp,
    Crosshair,
    Lightbulb,
    Search,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    Users,
    Zap,
} from "lucide-react";

const insights = [
    {
        icon: Users,
        label: "Customer pain",
        value: "Strong signal",
        detail: "Real problems worth solving",
        color: "text-violet-600",
        bg: "bg-violet-100",
    },
    {
        icon: TrendingUp,
        label: "Market demand",
        value: "Growing interest",
        detail: "Evidence of market activity",
        color: "text-emerald-600",
        bg: "bg-emerald-100",
    },
    {
        icon: Crosshair,
        label: "Competition",
        value: "Opportunities found",
        detail: "Room to differentiate",
        color: "text-orange-600",
        bg: "bg-orange-100",
    },
];

function ScoreRing() {
    return (
        <div className="relative flex h-[142px] w-[142px] shrink-0 items-center justify-center">
            <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full -rotate-90">
                <circle
                    cx="60"
                    cy="60"
                    r="49"
                    fill="none"
                    stroke="#F1E9FC"
                    strokeWidth="9"
                />
                <circle
                    cx="60"
                    cy="60"
                    r="49"
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeDasharray="301"
                    strokeDashoffset="66"
                />
                <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7138D5" />
                        <stop offset="100%" stopColor="#F02D83" />
                    </linearGradient>
                </defs>
            </svg>

            <div className="text-center">
                <p className="text-[38px] font-black tracking-tight text-gray-900">
                    78
                </p>
                <p className="text-[9px] font-bold tracking-[0.16em] text-gray-400">
                    SAMPLE SCORE
                </p>
            </div>
        </div>
    );
}

function InsightRow({ item }) {
    const Icon = item.icon;

    return (
        <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.bg}`}>
                <Icon className={`h-5 w-5 ${item.color}`} />
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-gray-500">
                    {item.label}
                </p>
                <p className="mt-0.5 text-sm font-bold text-gray-900">
                    {item.value}
                </p>
            </div>

            <CircleCheck className="h-4 w-4 shrink-0 text-emerald-500" />
        </div>
    );
}

function ReportPreview() {
    return (
        <div className="relative mx-auto w-full max-w-[570px]">
            {/* Background glow */}
            <div className="absolute inset-8 rounded-full bg-purple-300/40 blur-[90px]" />

            {/* Decorative orbit */}
            <div className="absolute -right-5 top-10 h-32 w-32 rounded-full border border-dashed border-purple-300/70" />
            <div className="absolute -bottom-5 -left-5 h-28 w-28 rounded-full border border-dashed border-pink-300/70" />

            {/* Main report */}
            <div className="relative rounded-[26px] border border-white/80 bg-white p-5 shadow-[0_30px_90px_-30px_rgba(112,56,213,0.35)] sm:p-7">
                {/* Report header */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#7138D5] to-[#F02D83] text-white">
                            <BrainCircuit className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-sm font-bold text-gray-900">
                                Validation report
                            </p>
                            <p className="text-[11px] text-gray-400">
                                AI-powered idea analysis
                            </p>
                        </div>
                    </div>

                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-600">
                        ANALYZED
                    </span>
                </div>

                {/* Idea being analyzed */}
                <div className="py-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
                        Your idea
                    </p>

                    <p className="text-base font-bold leading-7 text-gray-800">
                        An AI-powered platform that helps small businesses understand their customers.
                    </p>
                </div>

                {/* Score section */}
                <div className="flex flex-col items-center gap-5 rounded-2xl bg-gradient-to-br from-[#FAF7FF] to-[#FFF5FA] p-5 sm:flex-row">
                    <ScoreRing />

                    <div className="flex-1 text-center sm:text-left">
                        <p className="text-xs font-semibold text-gray-400">
                            Overall assessment
                        </p>

                        <h3 className="mt-1 text-xl font-extrabold text-gray-900">
                            Promising potential
                        </h3>

                        <p className="mt-2 text-xs leading-5 text-gray-500">
                            A sample preview of how your idea's market signals and opportunities could be presented.
                        </p>

                        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-purple-700 shadow-sm">
                            <Sparkles className="h-3 w-3" />
                            Sample insight
                        </div>
                    </div>
                </div>

                {/* Research insights */}
                <div className="mt-6">
                    <div className="mb-3 flex items-center justify-between">
                        <p className="text-xs font-bold text-gray-900">
                            Key research signals
                        </p>
                        <span className="text-[10px] font-medium text-gray-400">
                            REPORT PREVIEW
                        </span>
                    </div>

                    <div className="space-y-2.5">
                        {insights.map((item) => (
                            <InsightRow key={item.label} item={item} />
                        ))}
                    </div>
                </div>

                {/* Bottom report footer */}
                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-2 text-[10px] font-medium text-gray-400">
                        <ShieldCheck className="h-4 w-4 text-purple-500" />
                        Research-backed insights
                    </div>

                    <div className="flex items-center gap-1 text-[10px] font-bold text-purple-600">
                        Explore report
                        <ArrowUpRight className="h-3 w-3" />
                    </div>
                </div>
            </div>

            {/* Floating research badge */}
            <div className="absolute -left-4 top-[25%] hidden items-center gap-2.5 rounded-2xl border border-white bg-white px-4 py-3 shadow-[0_12px_35px_-12px_rgba(112,56,213,0.25)] sm:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100">
                    <Search className="h-4 w-4 text-violet-600" />
                </div>
                <div>
                    <p className="text-[10px] font-medium text-gray-400">
                        Research engine
                    </p>
                    <p className="text-xs font-bold text-gray-800">
                        Market signals
                    </p>
                </div>
            </div>

            {/* Floating insight badge */}
            <div className="absolute -right-4 bottom-[17%] hidden items-center gap-2.5 rounded-2xl border border-white bg-white px-4 py-3 shadow-[0_12px_35px_-12px_rgba(112,56,213,0.25)] sm:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-100">
                    <Zap className="h-4 w-4 text-pink-600" />
                </div>
                <div>
                    <p className="text-[10px] font-medium text-gray-400">
                        AI analysis
                    </p>
                    <p className="text-xs font-bold text-gray-800">
                        Actionable insights
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function WhatYouGet() {
    return (
        <section className="relative isolate overflow-hidden bg-white px-6 py-10 sm:px-10 lg:px-12 lg:pb-10">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-purple-100/50 blur-[100px]" />
            <div className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-pink-100/50 blur-[100px]" />

            <div className="relative mx-auto max-w-[1280px]">
                <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
                    {/* Left content */}
                    <div className="max-w-[510px]">
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50/80 px-4 py-2">
                            <ChartNoAxesCombined className="h-4 w-4 text-purple-600" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-purple-700">
                                Your idea, under the microscope
                            </span>
                        </div>

                        <h2 className="text-4xl font-black leading-[1.12] tracking-tight text-gray-950 sm:text-5xl lg:text-[56px]">
                            More than a generic idea.
                            <span className="mt-2 block bg-gradient-to-r from-[#7138D5] via-[#B22AE1] to-[#F02D83] bg-clip-text text-transparent">
                                A clearer picture.
                            </span>
                        </h2>

                        <p className="mt-6 max-w-[440px] text-base text-gray-500">
                            Don't rely on assumptions to decide what comes next.
                            Get a deeper understanding of your idea through AI-powered
                            market research and structured validation.
                        </p>

                        {/* What the report reveals */}
                        <div className="mt-10 space-y-6">
                            <div className="flex gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-100">
                                    <Users className="h-5 w-5 text-violet-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">
                                        Understand the problem
                                    </h3>
                                    <p className="mt-1 text-sm leading-6 text-gray-500">
                                        Explore customer pain points and discover whether
                                        the problem is worth solving.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pink-100">
                                    <TrendingUp className="h-5 w-5 text-pink-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">
                                        Find market opportunities
                                    </h3>
                                    <p className="mt-1 text-sm leading-6 text-gray-500">
                                        Examine demand, competition, and the space
                                        your idea could occupy.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-100">
                                    <Lightbulb className="h-5 w-5 text-orange-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">
                                        Decide what to do next
                                    </h3>
                                    <p className="mt-1 text-sm leading-6 text-gray-500">
                                        Turn research findings into a more informed
                                        next step for your idea.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex items-center gap-2 text-sm font-semibold text-purple-700">
                            <CircleHelp className="h-4 w-4" />
                            Make decisions with evidence, not guesswork.
                        </div>
                    </div>

                    {/* Right visual */}
                    <div className="relative px-1 py-8 sm:px-6 lg:py-12">
                        <ReportPreview />
                    </div>
                </div>
            </div>
        </section>
    );
}