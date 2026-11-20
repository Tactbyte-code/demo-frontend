
"use client";

import Link from "next/link";
import {
    ArrowUpRight,
    MessageCircle,
    ArrowRight,
    Sparkles,
    TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { scrollToSection } from "@/lib/scrollToSection";

const conversations = [
    {
        community: "r/SaaS",
        time: "2h ago",
        text: "I've tried 4 different tools for this and none of them actually solve the problem.",
        replies: "38 replies",
        tone: "orange",
    },
    {
        community: "r/Entrepreneur",
        time: "5h ago",
        text: "Is anyone else struggling with how expensive this process has become?",
        replies: "24 replies",
        tone: "purple",
    },
    {
        community: "r/smallbusiness",
        time: "8h ago",
        text: "I wish there was a simpler way to manage all of this without hiring someone.",
        replies: "51 replies",
        tone: "green",
    },
];

export default function RedditFinalCTA() {
    return (
        <section className="relative overflow-hidden bg-[#17120F] px-5 py-20 sm:px-8 lg:pb-32">
            {/* Background atmosphere */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#FF5B24]/10 blur-[130px]" />
                <div className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-[#F97316]/10 blur-[130px]" />
                <div
                    className="absolute inset-0 opacity-[0.045]"
                    style={{
                        backgroundImage:
                            "radial-gradient(#ffffff 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                    }}
                />
            </div>

            <div className="relative mx-auto max-w-7xl">
                <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">

                    {/* Left: Editorial CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#FF7A45]/25 bg-[#FF7A45]/10 px-4 py-2 text-sm font-medium text-[#FF986E]">
                            <Sparkles size={15} />
                            Your next opportunity starts here
                        </div>

                        <h2 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-[-0.055em] text-white sm:text-6xl lg:text-[76px]">
                            The next big idea is
                            <span className="relative mx-2 inline-block text-[#FF7442]">
                                already
                            </span>
                            being discussed.
                        </h2>

                        <p className="mt-8 max-w-lg text-base leading-8 text-[#B8AAA2] sm:text-lg">
                            Somewhere on Reddit, people are talking about
                            problems they desperately want solved. Find those
                            conversations, understand what matters, and turn
                            real frustrations into your next opportunity.
                        </p>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <div
                                onClick={()=>scrollToSection('reddit-hero')}
                                className="group inline-flex items-center justify-center gap-3 rounded-lg bg-[#FF6B35] px-7 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-1 hover:bg-[#FF7D4D] hover:shadow-[0_12px_35px_rgba(255,107,53,0.25)]"
                            >
                                Start a reddit analysis
                                <ArrowUpRight
                                    size={18}
                                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                                />
                            </div>

                            <div className="flex items-center gap-3 px-2 text-sm text-[#A99A91]">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5">
                                    <MessageCircle size={15} />
                                </span>
                                Start with a problem. Not a guess.
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Live conversation editorial composition */}
                    <motion.div
                        initial={{ opacity: 0, x: 35 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="relative"
                    >
                        {/* Floating insight label */}
                        <div className="absolute -top-8 right-2 z-20 flex items-center gap-2 rounded-lg border border-[#FF8A5C]/20 bg-[#29201B] px-4 py-3 shadow-xl sm:right-8">
                            <TrendingUp size={16} className="text-[#FF8A5C]" />
                            <span className="text-xs font-medium text-[#F5D8C9]">
                                Hidden opportunities
                            </span>
                        </div>

                        <div className="relative space-y-0">
                            {conversations.map((item, index) => (
                                <motion.div
                                    key={item.community}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.25 + index * 0.15,
                                    }}
                                    className={`relative border-l border-white/10 py-5 pl-8 ${
                                        index === 0 ? "pt-8" : ""
                                    }`}
                                >
                                    {/* Timeline dot */}
                                    <span
                                        className={`absolute -left-[5px] top-8 h-[9px] w-[9px] rounded-full ${
                                            item.tone === "orange"
                                                ? "bg-[#FF7442]"
                                                : item.tone === "purple"
                                                  ? "bg-[#A78BFA]"
                                                  : "bg-[#6FCF97]"
                                        }`}
                                    />

                                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.045] p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.075] sm:p-6">
                                        <div className="mb-4 flex items-center justify-between">
                                            <span className="text-sm font-semibold text-white">
                                                {item.community}
                                            </span>
                                            <span className="text-xs text-[#897A71]">
                                                {item.time}
                                            </span>
                                        </div>

                                        <p className="text-[15px] leading-7 text-[#D8CBC3]">
                                            “{item.text}”
                                        </p>

                                        <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
                                            <span className="text-xs text-[#96877F]">
                                                {item.replies}
                                            </span>
                                            <ArrowUpRight
                                                size={15}
                                                className="text-[#FF8A5C]"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Insight connector */}
                            <div className="ml-8 flex items-center gap-3 border-l border-[#FF7442]/50 py-5 pl-8">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF6B35]/15 text-[#FF8A5C]">
                                    <Sparkles size={17} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-[#FF986E]">
                                        ProblemPulse connects the dots.
                                    </p>
                                    <p className="mt-1 text-xs text-[#9D8D83]">
                                        Conversations → Patterns → Opportunities
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pointer-events-none absolute -bottom-8 -right-5 -z-0 h-40 w-40 rounded-full border border-[#FF7442]/10" />
                    </motion.div>
                </div>

                {/* Bottom brand signature */}
                <div className="mt-24 flex flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm font-medium tracking-wide text-[#A99A91]">
                        Stop assuming. Start discovering.
                    </p>
                    <div className="flex items-center gap-2 text-xs tracking-wider text-[#76675F]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF7442]" />
                        BUILT FOR CURIOUS FOUNDERS
                    </div>
                </div>
            </div>
        </section>
    );
}
