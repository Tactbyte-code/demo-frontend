"use client";

import { scrollToSection } from "@/lib/scrollToSection";
import { motion } from "framer-motion";
import {
    AlertCircle,
    ArrowUpRight,
    CheckCircle2,
    Flame,
    Lightbulb,
    Sparkles,
    Star,
    TrendingUp,
    Zap,
} from "lucide-react";

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            delay: i * 0.1,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

export default function PlaystoreWhatYouGet() {
    return (
        <section className="relative overflow-hidden bg-white px-5 py-20 sm:px-8 lg:pb-28">
            {/* Subtle top glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[640px] -translate-x-1/2 rounded-full bg-[#E8F6EC] opacity-60 blur-3xl" />

            <div className="relative mx-auto max-w-[1250px]">
                {/* Header */}
                <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#D4E7D9] bg-[#F5FBF7] px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] text-[#188038]">
                            <Sparkles className="h-3.5 w-3.5" />
                            BEYOND STAR RATINGS
                        </div>

                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#142B1B] sm:text-4xl lg:text-5xl lg:leading-[1.1]">
                            Thousands of voices.
                            <span className="block text-[#188038]">
                                Four kinds of clarity.
                            </span>
                        </h2>
                    </div>

                    <p className="max-w-md text-sm leading-7 text-[#637A6B] sm:text-base lg:pb-1">
                        Every review tells a fragment of the story. We cluster
                        raw Play Store feedback into four clear signals so you
                        know what to fix, keep, and build next.
                    </p>
                </div>

                {/* 2x2 Bento Grid */}
                <div className="mt-14 grid gap-6 md:grid-cols-2">
                    {/* 01: Pain Points */}
                    <motion.div
                        custom={0}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="group flex flex-col justify-between rounded-3xl border border-[#DCEBE0] bg-[#FAFDFB] p-6 transition-all duration-300 hover:border-[#B5DFC0] hover:shadow-[0_20px_50px_-15px_rgba(20,43,27,0.08)] sm:p-8"
                    >
                        <div>
                            <div className="flex items-center justify-between">
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#E5F5E9] text-[#188038]">
                                    <AlertCircle className="h-5 w-5" />
                                </span>
                                <span className="font-mono text-xs font-semibold text-[#8DA193]">
                                    01 / PAIN POINTS
                                </span>
                            </div>

                            <h3 className="mt-5 text-xl font-bold text-[#142B1B]">
                                Pinpoint what frustrates users
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-[#637A6B]">
                                Automatically surface recurring bugs, crashes,
                                and UX friction buried inside low-star reviews.
                            </p>
                        </div>

                        {/* Mini UI: Extracted friction */}
                        <div className="mt-7 rounded-2xl border border-[#E4EFE7] bg-white p-4 shadow-xs">
                            <div className="flex items-center justify-between">
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`h-3.5 w-3.5 ${star <= 2
                                                ? "fill-[#F4B942] text-[#F4B942]"
                                                : "text-[#E2ECE4]"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="inline-flex items-center gap-1 rounded-full bg-[#FEF2F2] px-2.5 py-0.5 text-[11px] font-semibold text-[#B91C1C]">
                                    <Flame className="h-3 w-3" />
                                    312 mentions
                                </span>
                            </div>

                            <p className="mt-3 text-sm leading-6 text-[#304536]">
                                &ldquo;Love the features, but{" "}
                                <span className="rounded bg-[#FEF2F2] px-1.5 py-0.5 font-semibold text-[#991B1B]">
                                    the app takes forever to load
                                </span>{" "}
                                after the latest update.&rdquo;
                            </p>

                            <div className="mt-3.5 flex items-center justify-between border-t border-[#F0F5F1] pt-3 text-[11px]">
                                <span className="font-medium text-[#718477]">
                                    Cluster: Startup Performance
                                </span>
                                <span className="font-semibold text-[#188038]">
                                    High Priority
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* 02: Sentiment */}
                    <motion.div
                        custom={1}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="group flex flex-col justify-between rounded-3xl border border-[#DCEBE0] bg-[#FAFDFB] p-6 transition-all duration-300 hover:border-[#B5DFC0] hover:shadow-[0_20px_50px_-15px_rgba(20,43,27,0.08)] sm:p-8"
                    >
                        <div>
                            <div className="flex items-center justify-between">
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#E5F5E9] text-[#188038]">
                                    <Star className="h-5 w-5" />
                                </span>
                                <span className="font-mono text-xs font-semibold text-[#8DA193]">
                                    02 / SENTIMENT
                                </span>
                            </div>

                            <h3 className="mt-5 text-xl font-bold text-[#142B1B]">
                                Track how users actually feel
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-[#637A6B]">
                                Go deeper than an average rating. See how
                                sentiment shifts after every release and update.
                            </p>
                        </div>

                        {/* Mini UI: Sentiment breakdown */}
                        <div className="mt-7 rounded-2xl border border-[#E4EFE7] bg-white p-4 shadow-xs">
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-[11px] font-medium text-[#718477]">
                                        Overall sentiment score
                                    </p>
                                    <p className="mt-0.5 text-2xl font-bold text-[#142B1B]">
                                        74%{" "}
                                        <span className="text-xs font-semibold text-[#188038]">
                                            +8.4% vs last release
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* Segmented bar */}
                            <div className="mt-4 flex h-3 w-full overflow-hidden rounded-full bg-[#EDF3EF]">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "68%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                    className="bg-[#188038]"
                                />
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "18%" }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.7,
                                        delay: 0.1,
                                        ease: "easeOut",
                                    }}
                                    className="bg-[#A8D8B5]"
                                />
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "14%" }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.7,
                                        delay: 0.2,
                                        ease: "easeOut",
                                    }}
                                    className="bg-[#E57373]"
                                />
                            </div>

                            <div className="mt-3.5 grid grid-cols-3 gap-2 text-[11px]">
                                <div className="flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-[#188038]" />
                                    <span className="text-[#536B5B]">
                                        Positive <strong>68%</strong>
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-[#A8D8B5]" />
                                    <span className="text-[#536B5B]">
                                        Neutral <strong>18%</strong>
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-[#E57373]" />
                                    <span className="text-[#536B5B]">
                                        Negative <strong>14%</strong>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* 03: Feature Demands */}
                    <motion.div
                        custom={2}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="group flex flex-col justify-between rounded-3xl border border-[#DCEBE0] bg-[#FAFDFB] p-6 transition-all duration-300 hover:border-[#B5DFC0] hover:shadow-[0_20px_50px_-15px_rgba(20,43,27,0.08)] sm:p-8"
                    >
                        <div>
                            <div className="flex items-center justify-between">
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#E5F5E9] text-[#188038]">
                                    <Lightbulb className="h-5 w-5" />
                                </span>
                                <span className="font-mono text-xs font-semibold text-[#8DA193]">
                                    03 / FEATURE DEMANDS
                                </span>
                            </div>

                            <h3 className="mt-5 text-xl font-bold text-[#142B1B]">
                                Discover what users want next
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-[#637A6B]">
                                Stop guessing your roadmap. Rank the most
                                requested capabilities straight from real user
                                reviews.
                            </p>
                        </div>

                        {/* Mini UI: Ranked feature requests */}
                        <div className="mt-7 space-y-2.5 rounded-2xl border border-[#E4EFE7] bg-white p-4 shadow-xs">
                            {[
                                {
                                    label: "Offline mode & local sync",
                                    count: "184 asks",
                                    pct: "88%",
                                },
                                {
                                    label: "Calendar two-way integration",
                                    count: "129 asks",
                                    pct: "64%",
                                },
                                {
                                    label: "Home screen quick widget",
                                    count: "92 asks",
                                    pct: "45%",
                                },
                            ].map((item) => (
                                <div key={item.label} className="space-y-1.5">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="font-semibold text-[#142B1B]">
                                            {item.label}
                                        </span>
                                        <span className="font-medium text-[#188038]">
                                            {item.count}
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#EDF5EF]">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: item.pct }}
                                            viewport={{ once: true }}
                                            transition={{
                                                duration: 0.65,
                                                ease: "easeOut",
                                            }}
                                            className="h-full rounded-full bg-gradient-to-r from-[#188038] to-[#5BB974]"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* 04: Opportunities */}
                    <motion.div
                        custom={3}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="group flex flex-col justify-between rounded-3xl border border-[#DCEBE0] bg-[#FAFDFB] p-6 transition-all duration-300 hover:border-[#B5DFC0] hover:shadow-[0_20px_50px_-15px_rgba(20,43,27,0.08)] sm:p-8"
                    >
                        <div>
                            <div className="flex items-center justify-between">
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#E5F5E9] text-[#188038]">
                                    <TrendingUp className="h-5 w-5" />
                                </span>
                                <span className="font-mono text-xs font-semibold text-[#8DA193]">
                                    04 / OPPORTUNITIES
                                </span>
                            </div>

                            <h3 className="mt-5 text-xl font-bold text-[#142B1B]">
                                Turn feedback into growth
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-[#637A6B]">
                                Spot high-leverage improvements that boost
                                retention, ratings, and user satisfaction
                                fastest.
                            </p>
                        </div>

                        {/* Mini UI: Actionable opportunity card */}
                        <div className="mt-7 rounded-2xl border border-[#CBE6D2] bg-gradient-to-br from-[#F2FAF4] to-[#E5F5E9] p-4 shadow-xs">
                            <div className="flex items-center justify-between">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-[#188038] shadow-2xs">
                                    <Zap className="h-3 w-3" />
                                    Quick Win
                                </span>
                                <span className="text-[11px] font-semibold text-[#536B5B]">
                                    Est. rating lift: +0.4★
                                </span>
                            </div>

                            <p className="mt-3 text-sm font-bold text-[#142B1B]">
                                Ship offline caching before adding new modules
                            </p>

                            <div className="mt-3 space-y-1.5">
                                {[
                                    "Resolves #1 complaint from 3-star reviews",
                                    "High demand among daily active users",
                                ].map((point) => (
                                    <div
                                        key={point}
                                        className="flex items-center gap-2 text-xs text-[#304536]"
                                    >
                                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#188038]" />
                                        <span>{point}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* High-contrast closing banner */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5 }}
                    className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#142B1B] px-6 py-8 text-white sm:flex-row sm:items-center sm:px-10"
                >
                    <div>
                        <p className="text-xl font-bold tracking-tight sm:text-2xl">
                            Stop counting reviews.{" "}
                            <span className="text-[#81C995]">
                                Start understanding them.
                            </span>
                        </p>
                        <p className="mt-1.5 text-xs text-[#A5BFA9] sm:text-sm">
                            Real Play Store feedback transformed into clear,
                            prioritized product direction.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => scrollToSection("playstore-hero")}
                        className="group inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-[#81C995] px-5 py-3 text-sm font-bold text-[#142B1B] shadow-sm transition-all duration-200 hover:bg-[#9AD6AA] active:scale-[0.98]"
                    >
                        <span>Analyze your app</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}