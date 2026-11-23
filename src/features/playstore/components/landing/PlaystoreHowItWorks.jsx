"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    AlertCircle,
    BrainCircuit,
    Check,
    ChevronRight,
    Link2,
    MessageSquare,
    Smartphone,
    Sparkles,
    Star,
    TrendingUp,
    Zap,
} from "lucide-react";

const steps = [
    {
        number: "01",
        label: "Add your app",
        title: "Start with any Play Store app.",
        description:
            "Simply paste your Google Play Store app URL. We'll identify the app and prepare its review data for analysis.",
        icon: Smartphone,
    },
    {
        number: "02",
        label: "AI analyzes reviews",
        title: "Turn thousands of reviews into signals.",
        description:
            "Our AI examines user reviews to uncover recurring complaints, feature requests, sentiment patterns, and emerging trends.",
        icon: BrainCircuit,
    },
    {
        number: "03",
        label: "Explore insights",
        title: "Know exactly what users want.",
        description:
            "Get a structured report highlighting your app's strengths, weaknesses, user pain points, and opportunities for improvement.",
        icon: TrendingUp,
    },
];

const cardTransition = {
    initial: { opacity: 0, y: 16, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -12, scale: 0.98 },
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
};

function AppPreview() {
    return (
        <motion.div
            {...cardTransition}
            className="w-full max-w-[400px] rounded-2xl border border-[#D4E7D9] bg-white p-5 shadow-[0_24px_60px_-15px_rgba(20,43,27,0.12)]"
        >
            {/* App header */}
            <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#E5F5E9] to-[#CBEAD3] ring-1 ring-[#BFE2C8]">
                    <Smartphone className="h-5 w-5 text-[#188038]" />
                </div>

                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-[#142B1B]">
                        FocusFlow Tasks
                    </p>
                    <p className="text-xs text-[#637A6B]">
                        Productivity · Google Play
                    </p>
                </div>

                <div className="flex items-center gap-1 rounded-full bg-[#F0F8F2] px-2.5 py-1 text-xs font-bold text-[#188038]">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    4.2
                </div>
            </div>

            {/* URL bar */}
            <div className="mt-5 rounded-xl border border-[#E5EFE8] bg-[#F7FBF8] p-3">
                <div className="flex items-center gap-2 text-xs">
                    <Link2 className="h-3.5 w-3.5 shrink-0 text-[#188038]" />
                    <span className="truncate font-mono text-[11px] text-[#536B5B]">
                        play.google.com/store/apps/details?id=com.focusflow
                    </span>
                    <span className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#188038] text-white">
                        <Check className="h-3 w-3" />
                    </span>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#DCEBE0]">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-[#188038] to-[#34A853]"
                    />
                </div>
            </div>

            {/* Key stats */}
            <div className="mt-4 grid grid-cols-3 gap-2.5">
                {[
                    ["Reviews", "12.4K"],
                    ["Avg. Rating", "4.2 / 5"],
                    ["Release", "v4.8.2"],
                ].map(([label, value]) => (
                    <div
                        key={label}
                        className="rounded-xl border border-[#E8F1EB] bg-[#FCFDFC] p-3"
                    >
                        <p className="text-[10px] font-medium text-[#718477]">
                            {label}
                        </p>
                        <p className="mt-1 text-sm font-bold text-[#142B1B]">
                            {value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Footer status */}
            <div className="mt-5 flex items-center justify-between border-t border-[#EDF3EF] pt-3.5">
                <span className="flex items-center gap-2 text-xs text-[#637A6B]">
                    <span className="h-2 w-2 rounded-full bg-[#34A853]" />
                    Ready for AI analysis
                </span>
                <span className="rounded-full bg-[#E5F5E9] px-2.5 py-0.5 text-[11px] font-semibold text-[#188038]">
                    Verified
                </span>
            </div>
        </motion.div>
    );
}

function AnalysisPreview() {
    const bars = [42, 68, 52, 85, 62, 96, 74, 88, 58, 78];

    return (
        <motion.div
            {...cardTransition}
            className="w-full max-w-[400px] rounded-2xl border border-[#D4E7D9] bg-white p-5 shadow-[0_24px_60px_-15px_rgba(20,43,27,0.12)]"
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-bold text-[#142B1B]">
                        Review analysis
                    </p>
                    <p className="mt-0.5 text-xs text-[#637A6B]">
                        Clustering 12,400 user reviews
                    </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E5F5E9] px-2.5 py-1 text-[11px] font-semibold text-[#188038]">
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34A853] opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#188038]" />
                    </span>
                    AI active
                </span>
            </div>

            {/* Bar visualization */}
            <div className="mt-5 rounded-xl border border-[#E8F1EB] bg-[#F8FCF9] p-3.5">
                <div className="flex h-24 items-end gap-2">
                    {bars.map((height, index) => (
                        <div
                            key={index}
                            className="flex h-full flex-1 items-end rounded-md bg-[#E8F3EB]"
                        >
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{
                                    duration: 0.55,
                                    delay: index * 0.04,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="w-full rounded-md bg-gradient-to-t from-[#188038] to-[#5BB974]"
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-2.5 flex justify-between text-[10px] font-medium text-[#718477]">
                    <span>Sentiment distribution</span>
                    <span>Pattern confidence: 98%</span>
                </div>
            </div>

            {/* Processing tasks */}
            <div className="mt-4 space-y-2.5">
                {[
                    ["Positive feedback", "Core strengths mapped"],
                    ["Recurring complaints", "14 pain points grouped"],
                    ["Feature requests", "Top user asks ranked"],
                ].map(([title, subtitle], index) => (
                    <motion.div
                        key={title}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + index * 0.08 }}
                        className="flex items-center gap-3 rounded-xl border border-[#EDF3EF] px-3 py-2.5"
                    >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#E5F5E9]">
                            <Check className="h-3.5 w-3.5 text-[#188038]" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-[#142B1B]">
                                {title}
                            </p>
                            <p className="text-[11px] text-[#718477]">
                                {subtitle}
                            </p>
                        </div>
                        <span className="rounded-md bg-[#F0F8F2] px-2 py-0.5 text-[10px] font-semibold text-[#188038]">
                            Done
                        </span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

function InsightsPreview() {
    return (
        <motion.div
            {...cardTransition}
            className="w-full max-w-[400px] rounded-2xl border border-[#D4E7D9] bg-white p-5 shadow-[0_24px_60px_-15px_rgba(20,43,27,0.12)]"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-[#142B1B]">
                        Insight report
                    </p>
                    <p className="mt-0.5 text-xs text-[#637A6B]">
                        Prioritized by user impact
                    </p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E5F5E9] text-[#188038]">
                    <Sparkles className="h-4 w-4" />
                </div>
            </div>

            {/* Highlight callout */}
            <div className="mt-4 rounded-xl border border-[#D4E7D9] bg-gradient-to-br from-[#F1F9F3] to-[#E5F5E9] p-4">
                <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#188038]">
                        <AlertCircle className="h-3.5 w-3.5" />
                        Top pain point
                    </span>
                    <span className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-[#142B1B] shadow-sm">
                        High impact
                    </span>
                </div>
                <p className="mt-2 text-base font-bold leading-snug text-[#142B1B]">
                    Slow startup after the latest update.
                </p>
                <p className="mt-1.5 text-xs text-[#536B5B]">
                    Mentioned in <span className="font-semibold text-[#142B1B]">34%</span> of recent 1–2 star reviews.
                </p>
            </div>

            {/* Structured breakdown */}
            <div className="mt-4 space-y-2.5">
                {[
                    {
                        icon: MessageSquare,
                        label: "Crash on login screen",
                        meta: "218 mentions",
                        tag: "Bug",
                    },
                    {
                        icon: Zap,
                        label: "Offline mode & sync",
                        meta: "164 requests",
                        tag: "Opportunity",
                    },
                    {
                        icon: Star,
                        label: "Clean UI & dark theme",
                        meta: "78% positive",
                        tag: "Strength",
                    },
                ].map(({ icon: Icon, label, meta, tag }) => (
                    <div
                        key={label}
                        className="flex items-center gap-3 rounded-xl border border-[#EDF3EF] px-3 py-2.5 transition-colors hover:border-[#CFE5D5] hover:bg-[#FAFDFB]"
                    >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F0F8F2] text-[#188038]">
                            <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold text-[#142B1B]">
                                {label}
                            </p>
                            <p className="text-[11px] text-[#718477]">{meta}</p>
                        </div>
                        <span className="rounded-full bg-[#F0F8F2] px-2.5 py-0.5 text-[10px] font-semibold text-[#188038]">
                            {tag}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

const previews = [AppPreview, AnalysisPreview, InsightsPreview];

export default function PlaystoreHowItWorks() {
    const [activeStep, setActiveStep] = useState(0);

    const active = steps[activeStep];
    const ActivePreview = previews[activeStep];

    return (
        <section className="relative overflow-hidden bg-[#F8FCF9] px-5 py-20 sm:px-8 lg:pb-28">
            {/* Ambient background accents */}
            <div className="pointer-events-none absolute -right-32 top-16 h-96 w-96 rounded-full bg-[#DFF3E5] opacity-60 blur-3xl" />
            <div className="pointer-events-none absolute -left-32 bottom-10 h-80 w-80 rounded-full bg-[#E8F6EC] opacity-60 blur-3xl" />

            <div className="relative mx-auto max-w-6xl">
                {/* Section heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#D4E7D9] bg-white px-3.5 py-1.5 text-[11px] font-bold tracking-[0.12em] text-[#188038] shadow-xs">
                        <Sparkles className="h-3.5 w-3.5" />
                        SIMPLE PROCESS · DEEP INSIGHTS
                    </div>

                    <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#142B1B] sm:text-4xl lg:text-[44px] lg:leading-[1.12]">
                        From app reviews to{" "}
                        <span className="bg-gradient-to-r from-[#188038] to-[#34A853] bg-clip-text text-transparent">
                            clear direction.
                        </span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#637A6B] sm:text-base">
                        Understand what your users are saying without manually
                        digging through thousands of Play Store reviews.
                    </p>
                </div>

                {/* Interactive layout */}
                <div className="mt-16 grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
                    {/* Left: Step selector */}
                    <div className="min-h-[430px] space-y-3 sm:min-h-[400px]">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = activeStep === index;

                            return (
                                <button
                                    key={step.number}
                                    type="button"
                                    onClick={() => setActiveStep(index)}
                                    aria-expanded={isActive}
                                    className={`group relative w-full cursor-pointer overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${isActive
                                            ? "border-[#B5DFC0] bg-white shadow-[0_14px_40px_-10px_rgba(24,128,56,0.12)]"
                                            : "border-transparent bg-white/40 hover:border-[#DCEBE0] hover:bg-white/80"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="playstore-active-step"
                                            transition={{
                                                type: "spring",
                                                stiffness: 380,
                                                damping: 32,
                                            }}
                                            className="absolute inset-y-4 left-0 w-1 rounded-r-full bg-[#188038]"
                                        />
                                    )}

                                    <div className="flex items-start gap-4">
                                        <div
                                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${isActive
                                                    ? "bg-[#188038] text-white shadow-sm shadow-[#188038]/25"
                                                    : "border border-[#E5EFE8] bg-white text-[#637A6B] group-hover:border-[#CBE6D2] group-hover:bg-[#EBF7EE] group-hover:text-[#188038]"
                                                }`}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between">
                                                <span
                                                    className={`text-[10px] font-bold tracking-[0.16em] ${isActive
                                                            ? "text-[#188038]"
                                                            : "text-[#8DA193]"
                                                        }`}
                                                >
                                                    STEP {step.number}
                                                </span>

                                                <ChevronRight
                                                    className={`h-4 w-4 transition-all duration-200 ${isActive
                                                            ? "translate-x-0 text-[#188038] opacity-100"
                                                            : "-translate-x-1 text-[#8DA193] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                                        }`}
                                                />
                                            </div>

                                            <h3 className="mt-1.5 text-base font-bold text-[#142B1B] sm:text-lg">
                                                {step.label}
                                            </h3>

                                            <AnimatePresence initial={false}>
                                                {isActive && (
                                                    <motion.div
                                                        initial={{
                                                            height: 0,
                                                            opacity: 0,
                                                        }}
                                                        animate={{
                                                            height: "auto",
                                                            opacity: 1,
                                                        }}
                                                        exit={{
                                                            height: 0,
                                                            opacity: 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.24,
                                                            ease: "easeOut",
                                                        }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="mt-2 max-w-md text-sm leading-6 text-[#637A6B]">
                                                            {step.description}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}

                        <div className="flex items-center gap-2 px-5 pt-2 text-xs text-[#718477]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#34A853]" />
                            Click any step to preview the workflow
                        </div>
                    </div>

                    {/* Right: Visual stage */}
                    <div
                        className="relative flex min-h-[540px] flex-col justify-between overflow-hidden rounded-[28px] border border-emerald-300 bg-white p-6 shadow-inner sm:p-9"
                        style={{
                            backgroundImage:
                                "radial-gradient(#C7E2CE 1px, transparent 1px)",
                            backgroundSize: "20px 20px",
                        }}
                    >
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.65),transparent_70%)]" />

                        {/* Stage header */}
                        <div className="relative z-10 mb-6 flex items-center justify-between gap-4">
                            <div>
                                <p className="text-[10px] font-bold tracking-[0.16em] text-[#188038]">
                                    STEP {active.number} · {active.label.toUpperCase()}
                                </p>
                                <p className="mt-1 text-sm font-semibold text-[#142B1B]">
                                    {active.title}
                                </p>
                            </div>

                            <div className="flex items-center gap-1.5">
                                {steps.map((step, index) => (
                                    <button
                                        key={step.number}
                                        type="button"
                                        aria-label={`Go to step ${step.number}: ${step.label}`}
                                        onClick={() => setActiveStep(index)}
                                        className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${index === activeStep
                                                ? "w-7 bg-[#188038]"
                                                : "w-2 bg-[#BEDAC6] hover:bg-[#95C5A3]"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Preview card */}
                        <div className="relative z-10 flex flex-1 items-center justify-center">
                            <AnimatePresence mode="wait">
                                <ActivePreview key={activeStep} />
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Bottom trust strip */}
                <div className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-[#E3EFE6] pt-8 text-xs font-medium text-[#637A6B] sm:text-sm">
                    {[
                        "No manual review reading",
                        "Zero guesswork",
                        "Actionable product signals",
                    ].map((item) => (
                        <div key={item} className="flex items-center gap-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E5F5E9] text-[#188038]">
                                <Check className="h-3 w-3" />
                            </span>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}