"use client";

import {
    Lightbulb,
    Search,
    ArrowUpRight,
    Check,
    SearchCheck,
    MessageSquare,
    TrendingUp,
    ShieldCheck,
    CircleDot,
    Sparkles,
} from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Start with your idea",
        description:
            "Tell us what you're planning to build. Describe the problem, your solution, and who you want to help.",
        label: "YOUR INPUT",
    },
    {
        number: "02",
        title: "Let AI do the research",
        description:
            "We investigate market demand, customer pain points, competitors, and real-world opportunities.",
        label: "AI ANALYSIS",
    },
    {
        number: "03",
        title: "Make decisions with clarity",
        description:
            "Get a structured validation report with insights that help you decide what to build next.",
        label: "YOUR RESULTS",
    },
];

function IdeaVisual() {
    return (
        <div className="relative mx-auto flex h-[250px] w-full max-w-[340px] items-center justify-center perspective-1000">
            {/* Interactive Glow */}
            <div className="absolute h-52 w-52 rounded-full bg-[#C084FC]/20 blur-[55px] transition-all duration-500 group-hover:bg-[#C084FC]/40 group-hover:scale-110" />

            <div className="relative w-[280px] rotate-[-2deg] rounded-[22px] border border-[#E9D5FF] bg-white/95 p-5 shadow-[0_15px_40px_-15px_rgba(112,36,232,0.15)] backdrop-blur-sm transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:rotate-0 group-hover:scale-[1.02] group-hover:shadow-[0_25px_60px_-15px_rgba(112,36,232,0.3)]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F3E8FF] transition-colors group-hover:bg-[#E9D5FF]">
                            <Lightbulb className="h-4 w-4 text-[#8528DF]" />
                        </div>
                        <span className="text-xs font-bold text-[#29154F]">
                            Your startup idea
                        </span>
                    </div>

                    <span className="rounded-full bg-[#F3E8FF] px-2.5 py-1 text-[10px] font-bold text-[#8528DF]">
                        DRAFT
                    </span>
                </div>

                <div className="mt-5 rounded-xl bg-[#FBF7FF] p-4 transition-colors group-hover:bg-[#F3E8FF]/50">
                    <p className="text-xs font-semibold leading-6 text-[#655184]">
                        A platform that helps small businesses understand
                        customer feedback and improve their products.
                    </p>

                    <div className="mt-4 flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E9D5FF]">
                            <div className="h-full w-[75%] rounded-full bg-gradient-to-r from-[#7628ED] to-[#D946A8] transition-all duration-700 ease-out group-hover:w-[85%]" />
                        </div>
                        <span className="text-[10px] font-bold text-[#8528DF]">
                            Idea
                        </span>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-medium text-[#9A86B5]">
                        Ready for validation
                    </span>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F3E8FF] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                        <ArrowUpRight className="h-4 w-4 text-[#8528DF]" />
                    </div>
                </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -right-2 top-4 flex items-center gap-2 rounded-xl border border-[#E9D5FF] bg-white px-3 py-2 shadow-lg transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:shadow-xl">
                <Sparkles className="h-4 w-4 text-[#A22BDD]" />
                <span className="text-[10px] font-bold text-[#655184]">
                    Starts here
                </span>
            </div>
        </div>
    );
}

function ResearchVisual() {
    const sources = [
        { icon: MessageSquare, label: "Customer pain points" },
        { icon: SearchCheck, label: "Market demand" },
        { icon: TrendingUp, label: "Market opportunities" },
        { icon: ShieldCheck, label: "Competitor landscape" },
    ];

    return (
        <div className="relative mx-auto flex h-[250px] w-full max-w-[340px] items-center justify-center">
            <div className="absolute h-52 w-52 rounded-full bg-[#D946EF]/15 blur-[55px] transition-all duration-500 group-hover:bg-[#D946EF]/30 group-hover:scale-110" />

            <div className="relative w-[285px] rotate-[1.5deg] rounded-[22px] border border-[#E9D5FF] bg-white/95 p-5 shadow-[0_15px_40px_-15px_rgba(178,42,225,0.15)] backdrop-blur-sm transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:rotate-0 group-hover:scale-[1.02] group-hover:shadow-[0_25px_60px_-15px_rgba(178,42,225,0.3)]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FAE8FF] transition-colors group-hover:bg-[#F3D9FF]">
                            <Search className="h-4 w-4 text-[#B22AE1]" />
                        </div>
                        <span className="text-xs font-bold text-[#29154F]">
                            Research engine
                        </span>
                    </div>

                    <span className="flex items-center gap-1.5 rounded-full bg-[#F0FDF4] px-2.5 py-1 text-[10px] font-bold text-[#16A34A]">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22C55E]" />
                        ANALYZING
                    </span>
                </div>

                <div className="mt-5 space-y-3">
                    {sources.map((source) => {
                        const Icon = source.icon;
                        return (
                            <div
                                key={source.label}
                                className="flex items-center gap-3 rounded-xl bg-[#FBF7FF] px-3 py-2.5 transition-transform hover:scale-[1.02]"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                                    <Icon className="h-4 w-4 text-[#A22BDD]" />
                                </div>
                                <span className="flex-1 text-[11px] font-semibold text-[#655184]">
                                    {source.label}
                                </span>
                                <Check className="h-4 w-4 text-[#22C55E] opacity-75 group-hover:opacity-100" />
                            </div>
                        );
                    })}
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-medium text-[#9A86B5]">
                        Processing 10,000+ data points
                    </span>
                    <Sparkles className="h-4 w-4 text-[#B22AE1] transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
                </div>
            </div>
        </div>
    );
}

function ReportVisual() {
    return (
        <div className="relative mx-auto flex h-[250px] w-full max-w-[340px] items-center justify-center">
            <div className="absolute h-52 w-52 rounded-full bg-[#F472B6]/20 blur-[55px] transition-all duration-500 group-hover:bg-[#F472B6]/35 group-hover:scale-110" />

            <div className="relative w-[285px] rotate-[-1.5deg] rounded-[22px] border border-[#E9D5FF] bg-white/95 p-5 shadow-[0_15px_40px_-15px_rgba(240,45,131,0.15)] backdrop-blur-sm transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:rotate-0 group-hover:scale-[1.02] group-hover:shadow-[0_25px_60px_-15px_rgba(240,45,131,0.3)]">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#29154F]">
                        Validation report
                    </span>

                    <span className="rounded-full bg-[#F0FDF4] px-2.5 py-1 text-[10px] font-bold text-[#16A34A] shadow-sm">
                        COMPLETE
                    </span>
                </div>

                <div className="mt-5 flex items-center gap-5">
                    <div
                        className="relative flex h-[90px] w-[90px] shrink-0 items-center justify-center rounded-full transition-transform duration-700 group-hover:rotate-180"
                        style={{
                            background: "conic-gradient(#A22BDD 0% 78%, #F3E8FF 78% 100%)",
                        }}
                    >
                        <div className="flex h-[74px] w-[74px] flex-col items-center justify-center rounded-full bg-white transition-transform duration-700 group-hover:-rotate-180">
                            <span className="text-2xl font-extrabold text-[#29154F]">
                                78
                            </span>
                            <span className="text-[9px] font-bold text-[#9A86B5]">
                                SAMPLE SCORE
                            </span>
                        </div>
                    </div>

                    <div className="min-w-0">
                        <p className="text-xs font-bold text-[#29154F]">
                            Market potential
                        </p>
                        <p className="mt-1 text-[10px] leading-4 text-[#9A86B5]">
                            Illustrative report preview
                        </p>
                        <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#F3E8FF] px-2 py-1 text-[10px] font-bold text-[#8528DF] transition-colors group-hover:bg-[#E9D5FF]">
                            <Sparkles className="h-3 w-3" />
                            Insights ready
                        </div>
                    </div>
                </div>

                <div className="mt-5 space-y-3">
                    <div>
                        <div className="mb-1.5 flex justify-between text-[10px] font-semibold text-[#655184]">
                            <span>Market demand</span>
                            <span className="text-[#A22BDD]">Strong</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-[#F3E8FF]">
                            <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-[#7628ED] to-[#B22AE1] transition-all duration-700 ease-out group-hover:w-[90%]" />
                        </div>
                    </div>

                    <div>
                        <div className="mb-1.5 flex justify-between text-[10px] font-semibold text-[#655184]">
                            <span>Competition</span>
                            <span className="text-[#F02D83]">Moderate</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-[#F3E8FF]">
                            <div className="h-full w-[58%] rounded-full bg-gradient-to-r from-[#B22AE1] to-[#F02D83] transition-all duration-700 ease-out group-hover:w-[65%]" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -right-3 bottom-6 flex items-center gap-2 rounded-xl border border-[#E9D5FF] bg-white px-3 py-2 shadow-lg transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:shadow-xl">
                <Check className="h-4 w-4 text-[#22C55E]" />
                <span className="text-[10px] font-bold text-[#655184]">
                    Generated
                </span>
            </div>
        </div>
    );
}

const visuals = [IdeaVisual, ResearchVisual, ReportVisual];

export default function HowItWorks() {
    return (
        <section className="relative overflow-hidden bg-[#FFFAFF] px-6 py-20 sm:px-10 lg:px-12 lg:pb-10">
            {/* Background Orbs */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-40 top-20 h-[350px] w-[350px] rounded-full bg-[#A855F7]/10 blur-[110px]" />
                <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#EC4899]/10 blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-[1250px]">
                {/* Heading */}
                <div className="mx-auto mb-20 max-w-[720px] text-center">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#A855F7]/20 bg-[#F3E8FF] px-4 py-2 transition-transform hover:scale-105">
                        <Sparkles className="h-4 w-4 fill-[#8528DF] text-[#8528DF]" />
                        <span className="text-sm font-bold text-[#7022C4]">
                            From idea to insight
                        </span>
                    </div>

                    <h2 className="text-3xl font-extrabold tracking-tight text-[#1C103E] sm:text-4xl lg:text-5xl">
                        How your idea becomes{" "}
                        <span className="bg-linear-to-r from-[#7024E8] via-[#A22BDD] to-[#F02D87] bg-clip-text text-transparent">
                            validated
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-[600px] text-base font-medium leading-7 text-[#655184] sm:text-lg">
                        No complicated frameworks. No endless research. Just
                        three steps between your idea and a clearer direction.
                    </p>
                </div>

                {/* Journey */}
                <div className="relative grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-8">
                    {steps.map((step, index) => {
                        const Visual = visuals[index];

                        return (
                            <div key={step.number} className="group relative">
                                {/* Desktop connecting line scoped per column to prevent text cutting */}
                                {index !== steps.length - 1 && (
                                    <div className="absolute left-[56px] top-[27px] -z-10 hidden h-[2px] w-[calc(100%+32px)] bg-linear-to-r from-[#E9D5FF] to-[#FBCFE8] md:block" />
                                )}

                                {/* Number and timeline node */}
                                <div className="relative z-10 inline-flex items-center justify-center rounded-full bg-[#FFFAFF] pl-1 py-1 pr-5 md:justify-start shadow-[0_8px_20px_rgba(113,56,213,0.35),0_3px_8px_rgba(162,43,221,0.2)]">

                                    {/* Number */}
                                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-[5px] border-white bg-gradient-to-br from-[#7628ED] via-[#B22AE1] to-[#F02D83] text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(113,56,213,0.35),0_3px_8px_rgba(162,43,221,0.2)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_12px_28px_rgba(113,56,213,0.45),0_5px_12px_rgba(162,43,221,0.25)]">
                                        {step.number}
                                    </div>

                                    {/* Step label */}
                                    <span className="ml-3 text-[11px] font-extrabold tracking-[0.2em] text-[#A22BDD]">
                                        {step.label}
                                    </span>
                                </div>

                                {/* Illustration Area */}
                                <div className="relative isolate mt-5 min-h-[276px] overflow-hidden rounded-[28px] border border-[#EEDFFA] bg-gradient-to-br from-[#F7EDFF] via-[#FBF4FF] to-[#FDEDF6] px-3 py-3 transition-colors duration-500 group-hover:from-[#F3E8FF] group-hover:to-[#FCE7F3]">
                                    <Visual />
                                </div>

                                {/* Description */}
                                <div className="mt-7 text-center transition-all duration-300 group-hover:translate-y-1 md:text-left">
                                    <h3 className="text-xl font-extrabold tracking-tight text-[#29154F] sm:text-2xl">
                                        {step.title}
                                    </h3>

                                    <p className="mt-3 text-sm font-medium leading-7 text-[#725B99] sm:text-base">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Mobile progression dots */}
                                {index !== steps.length - 1 && (
                                    <div className="absolute -bottom-10 left-1/2 flex -translate-x-1/2 items-center gap-2 text-[#B18ACF] md:hidden">
                                        <CircleDot className="h-4 w-4 animate-pulse" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Bottom statement */}
                <div className="mt-10 flex flex-col items-center justify-center gap-3 border-t border-[#EADCF8] pt-10 text-center sm:flex-row">
                    <Sparkles className="h-5 w-5 text-[#A22BDD]" />
                    <p className="text-sm font-semibold text-[#725B99] sm:text-base">
                        Stop guessing. Start validating.{" "}
                        <span className="bg-linear-to-r from-[#7024E8] to-[#F02D87] bg-clip-text font-extrabold text-transparent">
                            Build with confidence.
                        </span>
                    </p>
                </div>
            </div>
        </section>
    );
}