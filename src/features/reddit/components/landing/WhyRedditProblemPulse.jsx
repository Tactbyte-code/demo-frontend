
"use client";

import { scrollToSection } from "@/lib/scrollToSection";
import {
    ArrowRight,
    Check,
    MessageSquareText,
    Search,
    BrainCircuit,
    TrendingUp,
    Clock3,
    Users,
    Target,
    Sparkles,
    ChartNoAxesCombined,
    Quote,
} from "lucide-react";
import Link from "next/link";

const advantages = [
    {
        icon: Users,
        title: "Real people, real problems",
        description:
            "Explore honest conversations where people openly discuss frustrations, unmet needs, and challenges they want solved.",
    },
    {
        icon: Search,
        title: "Discover problems, not assumptions",
        description:
            "Move beyond guessing what customers need. Find recurring problems backed by actual discussions and experiences.",
    },
    {
        icon: BrainCircuit,
        title: "AI-powered research",
        description:
            "Let AI process large volumes of conversations and organize scattered discussions into meaningful research insights.",
    },
    {
        icon: TrendingUp,
        title: "Find opportunities worth exploring",
        description:
            "Identify recurring pain points, emerging needs, and potential product opportunities before investing in an idea.",
    },
];

const comparison = [
    {
        feature: "Finding relevant discussions",
        manual: "Search multiple subreddits manually",
        problemPulse: "AI-assisted research",
    },
    {
        feature: "Identifying recurring problems",
        manual: "Read and compare comments yourself",
        problemPulse: "Structured pain point discovery",
    },
    {
        feature: "Understanding user sentiment",
        manual: "Interpret conversations individually",
        problemPulse: "Organized sentiment insights",
    },
    {
        feature: "Discovering opportunities",
        manual: "Connect findings on your own",
        problemPulse: "AI-generated opportunity insights",
    },
    {
        feature: "Research output",
        manual: "Scattered notes and browser tabs",
        problemPulse: "One organized analysis report",
    },
];

export default function WhyRedditProblemPulse() {
    return (
        <section className="relative overflow-hidden bg-white pb-24 pt-10 sm:pb-28">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#FF4500]/[0.035] blur-3xl" />
            <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-orange-100/40 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-6">
                {/* Section heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#FF4500]/15 bg-[#FFF4EF] px-3.5 py-1.5">
                        <Sparkles size={14} className="text-[#FF4500]" />
                        <span className="text-xs font-semibold tracking-wide text-[#C83A0A]">
                            WHY REDDIT RESEARCH
                        </span>
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1B] sm:text-4xl lg:text-5xl leading-tight">
                        Stop guessing.
                        <span className="block text-[#FF4500]">
                            Start listening.
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6B7280] sm:text-base">
                        Your potential customers are already talking about
                        their problems. Reddit brings those conversations
                        together. ProblemPulse helps you turn them into
                        actionable product insights.
                    </p>
                </div>

                {/* Main visual panel */}
                <div className="mt-16 overflow-hidden rounded-3xl bg-[#171719] shadow-[0_24px_80px_rgba(26,26,27,0.12)]">
                    <div className="grid lg:grid-cols-[1fr_0.9fr]">
                        {/* Left content */}
                        <div className="relative flex flex-col justify-center overflow-hidden px-7 py-12 sm:px-12 sm:py-14">
                            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/[0.06]" />
                            <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/[0.06]" />

                            <div className="relative">
                                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF4500]/15 text-[#FF7043]">
                                    <MessageSquareText size={24} />
                                </div>

                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FF7043]">
                                    The power of Reddit
                                </p>

                                <h3 className="mt-4 max-w-lg text-2xl font-bold leading-tight text-white sm:text-3xl">
                                    The best product ideas often begin with
                                    someone&apos;s frustration.
                                </h3>

                                <p className="mt-5 max-w-lg text-sm leading-7 text-[#A1A1AA]">
                                    People share what isn't working, what
                                    they're struggling with, and what they
                                    wish existed. These conversations can
                                    reveal opportunities traditional
                                    brainstorming might miss.
                                </p>

                                <div className="mt-9 flex flex-wrap items-center gap-3">
                                    <div className="flex -space-x-2">
                                        {["r/", "r/", "r/"].map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#171719] bg-[#29292D] text-[11px] font-bold text-[#FF7043]"
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>

                                    <p className="text-xs text-[#A1A1AA]">
                                        Real conversations. Meaningful insights.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right visual */}
                        <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-[#202023] px-6 py-12 sm:px-10">
                            <div className="absolute inset-0 opacity-20">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FF4500_0%,transparent_65%)]" />
                            </div>

                            <div className="relative w-full max-w-md">
                                {/* Conversation card */}
                                <div className="rounded-2xl border border-white/10 bg-[#2B2B30] p-5 shadow-2xl">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FF4500]/15 text-[#FF7043]">
                                            <MessageSquareText size={17} />
                                        </div>

                                        <div>
                                            <p className="text-xs font-semibold text-white">
                                                Customer conversations
                                            </p>
                                            <p className="text-[10px] text-[#92929B]">
                                                Reddit discussions
                                            </p>
                                        </div>

                                        <div className="ml-auto flex h-2 w-2 rounded-full bg-emerald-400" />
                                    </div>

                                    <div className="mt-5 space-y-3">
                                        <div className="rounded-xl bg-[#37373D] p-3.5">
                                            <p className="text-xs leading-5 text-[#E4E4E7]">
                                                "I've tried three different
                                                tools, but none of them solve
                                                this particular problem..."
                                            </p>
                                        </div>

                                        <div className="rounded-xl bg-[#37373D] p-3.5">
                                            <p className="text-xs leading-5 text-[#E4E4E7]">
                                                "Why is there still no simple
                                                solution for managing all of
                                                this?"
                                            </p>
                                        </div>

                                        <div className="rounded-xl bg-[#37373D] p-3.5">
                                            <p className="text-xs leading-5 text-[#E4E4E7]">
                                                "I would genuinely pay for
                                                something that fixes this."
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Transformation indicator */}
                                <div className="flex justify-center py-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FF4500]/30 bg-[#FF4500]/10 text-[#FF7043]">
                                        <ArrowRight
                                            size={17}
                                            className="rotate-90"
                                        />
                                    </div>
                                </div>

                                {/* Insight card */}
                                <div className="rounded-2xl border border-[#FF7043]/30 bg-gradient-to-br from-[#3B211D] to-[#292326] p-5 shadow-xl">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF4500]/20 text-[#FF7043]">
                                            <Sparkles size={16} />
                                        </div>
                                        <p className="text-xs font-semibold text-white">
                                            Actionable insight
                                        </p>
                                    </div>

                                    <p className="mt-4 text-sm font-semibold leading-6 text-white">
                                        Repeated frustration reveals a
                                        potential unmet customer need.
                                    </p>

                                    <div className="mt-4 flex items-center gap-2 text-[11px] font-medium text-[#FF9A7B]">
                                        <Target size={13} />
                                        Potential product opportunity
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advantages */}
                <div className="mt-20">
                    <div className="mb-9 max-w-xl">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF4500]">
                            More than just social listening
                        </p>

                        <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#1A1A1B] sm:text-3xl">
                            Why founders look at Reddit
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-[#6B7280]">
                            Reddit offers a different perspective on market
                            research: one shaped by the problems people
                            actually experience.
                        </p>
                    </div>

                    <div className="grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
                        {advantages.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div key={item.title} className="group">
                                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-[#F2D5CC] bg-[#FFF5F1] text-[#B8320A] transition-all duration-300 group-hover:border-[#FF4500]/30 group-hover:bg-[#FF4500] group-hover:text-white">
                                        <Icon size={21} strokeWidth={1.8} />
                                    </div>

                                    <p className="mb-2 text-[11px] font-bold tracking-wider text-[#B8320A]">
                                        0{index + 1}
                                    </p>

                                    <h4 className="text-base font-bold text-[#1A1A1B]">
                                        {item.title}
                                    </h4>

                                    <p className="mt-2 text-sm leading-6 text-[#737373]">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Comparison */}
                <div className="mt-24">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF4500]">
                            Research, reimagined
                        </p>

                        <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#1A1A1B] sm:text-3xl">
                            From endless scrolling to structured insights
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-[#6B7280]">
                            Reddit is full of valuable information. The
                            challenge is finding, connecting, and making
                            sense of it.
                        </p>
                    </div>

                    <div className="mt-10 overflow-hidden rounded-2xl border border-[#EAEAEA] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                        {/* Table header */}
                        <div className="grid grid-cols-[1fr_1fr_1.15fr] border-b border-[#EAEAEA] bg-[#FAFAFA] px-4 py-4 sm:px-7">
                            <p className="text-xs font-semibold text-[#737373] sm:text-sm">
                                Research task
                            </p>

                            <p className="text-xs font-semibold text-[#737373] sm:text-sm">
                                Manual research
                            </p>

                            <div className="flex items-center gap-1.5">
                                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#FF4500] text-white">
                                    <Sparkles size={13} />
                                </span>
                                <p className="text-xs font-bold text-[#B8320A] sm:text-sm">
                                    ProblemPulse
                                </p>
                            </div>
                        </div>

                        {/* Table rows */}
                        {comparison.map((item, index) => (
                            <div
                                key={item.feature}
                                className={`grid grid-cols-[1fr_1fr_1.15fr] items-center gap-2 px-4 py-4 sm:px-7 ${index !== comparison.length - 1
                                    ? "border-b border-[#F0F0F0]"
                                    : ""
                                    }`}
                            >
                                <p className="text-xs font-semibold text-[#262626] sm:text-sm">
                                    {item.feature}
                                </p>

                                <p className="text-[11px] leading-5 text-[#737373] sm:text-sm">
                                    {item.manual}
                                </p>

                                <div className="flex items-start gap-1.5">
                                    <Check
                                        size={14}
                                        className="mt-0.5 shrink-0 text-[#FF4500]"
                                    />
                                    <p className="text-[11px] font-semibold leading-5 text-[#262626] sm:text-sm">
                                        {item.problemPulse}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="mt-4 text-center text-[11px] leading-5 text-[#9CA3AF]">
                        ProblemPulse streamlines research and insight
                        discovery. It complements, rather than replaces,
                        direct customer conversations and validation.
                    </p>
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 flex flex-col items-center justify-between gap-6 rounded-2xl border border-[#F2D5CC] bg-gradient-to-r from-[#FFF5F1] via-white to-[#FFF8F5] px-7 py-9 sm:flex-row sm:px-10">
                    <div>
                        <div className="flex items-center gap-2 text-[#B8320A]">
                            <ChartNoAxesCombined size={18} />
                            <span className="text-xs font-bold uppercase tracking-wider">
                                Turn conversations into opportunities
                            </span>
                        </div>

                        <h3 className="mt-3 text-xl font-bold text-[#1A1A1B] sm:text-2xl">
                            Find out what your potential customers really need.
                        </h3>

                        <p className="mt-2 text-sm text-[#737373]">
                            Start exploring the problems people are already
                            talking about.
                        </p>
                    </div>

                    <div
                        onClick={() => scrollToSection("reddit-hero")}
                        className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#FF4500] px-6 text-sm font-semibold text-white shadow-lg shadow-orange-900/15 transition-all hover:-translate-y-0.5 hover:bg-[#D93B00] hover:shadow-xl active:translate-y-0"
                    >
                        Explore Reddit Analysis
                        <ArrowRight
                            size={16}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
