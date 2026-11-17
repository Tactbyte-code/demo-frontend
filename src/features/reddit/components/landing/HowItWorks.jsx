
"use client";

import { scrollToSection } from "@/lib/scrollToSection";
import {
    Search,
    MessageCircle,
    MessagesSquare,
    ArrowRight,
    ArrowDown,
    ArrowUpRight,
    Sparkles,
    BrainCircuit,
    Target,
    TrendingUp,
    Lightbulb,
    FileText,
    ExternalLink,
    Quote,
    Check,
    SearchCheck,
    ListChecks,
    CircleDot,
    Radar,
} from "lucide-react";

const conversations = [
    {
        subreddit: "r/SaaS",
        title: "Why are project management tools so complicated?",
        text: "I spend more time organizing tasks across different tools than actually getting work done.",
        highlight: "Too many disconnected tools",
        comments: "48 comments",
    },
    {
        subreddit: "r/startups",
        title: "What's a good way to manage a small remote team?",
        text: "Most platforms have features I don't need. I just want something simple that everyone can use.",
        highlight: "Overcomplicated workflows",
        comments: "31 comments",
    },
    {
        subreddit: "r/productivity",
        title: "Anyone else tired of switching between productivity apps?",
        text: "Notes here, tasks there, updates somewhere else. Nothing really connects.",
        highlight: "Fragmented workflows",
        comments: "62 comments",
    },
];

const insights = [
    {
        icon: Target,
        title: "Recurring frustrations",
        description: "Problems people repeatedly bring up.",
        color: "#FF4500",
        bg: "#FFF0EB",
    },
    {
        icon: TrendingUp,
        title: "Emerging patterns",
        description: "Needs and trends across communities.",
        color: "#D97706",
        bg: "#FFF7E8",
    },
    {
        icon: Lightbulb,
        title: "Potential opportunities",
        description: "Problems worth exploring further.",
        color: "#0D9488",
        bg: "#E8F8F5",
    },
];

function SectionLabel({ children }) {
    return (
        <div className="mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#FF4500]" />
            <span className="text-[10px] font-extrabold tracking-[0.18em] text-[#FF4500]">
                {children}
            </span>
        </div>
    );
}

function ConversationStream() {
    return (
        <div className="relative">
            <div className="absolute -left-4 top-8 h-48 w-48 rounded-full bg-[#FF4500]/10 blur-[70px]" />

            <div className="relative">
                <div className="mb-5 flex items-center justify-between">
                    <SectionLabel>01 — DISCOVER</SectionLabel>
                    <span className="text-[10px] font-semibold text-[#A1A1AA]">
                        Real community discussions
                    </span>
                </div>

                <div className="space-y-3">
                    {conversations.map((item, index) => (
                        <div
                            key={item.title}
                            className={`relative rounded-2xl border bg-white p-4 shadow-[0_8px_30px_rgba(40,20,10,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(40,20,10,0.08)] ${index === 1
                                ? "border-[#FFB69F]"
                                : "border-[#EFE9E6]"
                                }`}
                        >
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFF0EB]">
                                        <MessageCircle className="h-3.5 w-3.5 text-[#FF4500]" />
                                    </div>

                                    <span className="text-[11px] font-extrabold text-[#FF4500]">
                                        {item.subreddit}
                                    </span>
                                </div>

                                <span className="text-[9px] font-medium text-[#A1A1AA]">
                                    {item.comments}
                                </span>
                            </div>

                            <h4 className="mt-3 text-sm font-extrabold leading-5 text-[#292524]">
                                {item.title}
                            </h4>

                            <p className="mt-2 text-xs leading-6 text-[#78716C]">
                                {item.text}
                            </p>

                            <div className="mt-3 flex items-center justify-between gap-2 border-t border-[#F2EEEB] pt-3">
                                <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#D94B21]">
                                    <SearchCheck className="h-3.5 w-3.5" />
                                    {item.highlight}
                                </span>

                                <ExternalLink className="h-3.5 w-3.5 text-[#B6AAA4]" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex items-center gap-2 pl-1">
                    <Radar className="h-4 w-4 text-[#FF4500]" />
                    <p className="text-[10px] font-semibold text-[#A1A1AA]">
                        Relevant conversations become research signals
                    </p>
                </div>
            </div>
        </div>
    );
}

function PatternExtraction() {
    return (
        <div className="relative">
            <div className="mb-5 flex items-center justify-between">
                <SectionLabel>02 — CONNECT THE DOTS</SectionLabel>
            </div>

            <div className="relative overflow-hidden rounded-[26px] border border-[#F5D9CD] bg-gradient-to-br from-[#FFF5F0] via-white to-[#FFF1E9] p-5 sm:p-7">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#FF4500]/10 blur-[60px]" />

                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF4500] shadow-lg shadow-[#FF4500]/20">
                                <BrainCircuit className="h-5 w-5 text-white" />
                            </div>

                            <div>
                                <p className="text-sm font-extrabold text-[#292524]">
                                    AI pattern recognition
                                </p>
                                <p className="text-[10px] text-[#A1A1AA]">
                                    Connecting similar experiences
                                </p>
                            </div>
                        </div>

                        <Sparkles className="h-5 w-5 text-[#FF7043]" />
                    </div>

                    {/* Conversation signals */}
                    <div className="mt-7 grid grid-cols-3 gap-2">
                        {["Discussion A", "Discussion B", "Discussion C"].map(
                            (item, index) => (
                                <div
                                    key={item}
                                    className="rounded-xl border border-[#F0DDD5] bg-white p-3 text-center shadow-sm"
                                >
                                    <MessageCircle className="mx-auto h-4 w-4 text-[#FF7043]" />
                                    <p className="mt-2 text-[9px] font-bold text-[#57534E]">
                                        {item}
                                    </p>
                                    <span className="mt-1 block text-[8px] text-[#A8A29E]">
                                        Signal 0{index + 1}
                                    </span>
                                </div>
                            )
                        )}
                    </div>

                    {/* Connection lines */}
                    <div className="relative flex h-16 items-start justify-center">
                        <div className="absolute left-[16.5%] top-0 h-8 w-[67%] rounded-b-xl border-b border-x border-dashed border-[#FF9B7B]" />
                        <div className="absolute left-1/2 top-0 h-12 border-l border-dashed border-[#FF9B7B]" />
                        <div className="absolute bottom-0 flex h-7 w-7 items-center justify-center rounded-full bg-[#FF4500] shadow-lg shadow-[#FF4500]/20">
                            <ArrowDown className="h-4 w-4 text-white" />
                        </div>
                    </div>

                    {/* Combined insight */}
                    <div className="rounded-2xl border border-[#FFB69F] bg-white p-4 shadow-[0_8px_25px_rgba(255,69,0,0.07)]">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-[#FF4500]" />
                            <span className="text-[10px] font-extrabold tracking-wide text-[#FF4500]">
                                COMMON PATTERN IDENTIFIED
                            </span>
                        </div>

                        <h3 className="mt-3 text-base font-extrabold leading-6 text-[#292524]">
                            People want simpler, connected workflows.
                        </h3>

                        <p className="mt-2 text-xs leading-6 text-[#78716C]">
                            Similar frustrations appearing across different
                            communities point toward a shared unmet need.
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {["Repeated frustration", "Unmet need", "Opportunity"].map(
                                (tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full bg-[#FFF0EB] px-2.5 py-1 text-[9px] font-bold text-[#D94B21]"
                                    >
                                        {tag}
                                    </span>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InsightOutputs() {
    return (
        <div className="relative">
            <div className="mb-5 flex items-center justify-between">
                <SectionLabel>03 — TURN INTO ACTION</SectionLabel>
            </div>

            <div className="space-y-3">
                {insights.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="group flex items-center gap-4 rounded-2xl border border-[#EFE9E6] bg-white p-4 shadow-[0_8px_25px_rgba(40,20,10,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#FFB69F] hover:shadow-[0_12px_30px_rgba(255,69,0,0.08)]"
                        >
                            <div
                                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                                style={{ backgroundColor: item.bg }}
                            >
                                <Icon
                                    className="h-5 w-5"
                                    style={{ color: item.color }}
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-extrabold text-[#292524]">
                                    {item.title}
                                </p>
                                <p className="mt-1 text-xs leading-5 text-[#928781]">
                                    {item.description}
                                </p>
                            </div>

                            <ArrowUpRight className="h-4 w-4 shrink-0 text-[#C4B5AE] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#FF4500]" />
                        </div>
                    );
                })}
            </div>

            {/* Final report */}
            <div className="relative mt-5 overflow-hidden rounded-[22px] bg-[#25211F] p-5 text-white shadow-[0_15px_40px_rgba(40,20,10,0.12)]">
                <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#FF4500]/20 blur-[50px]" />

                <div className="relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-[#FF8A65]" />
                            <span className="text-sm font-extrabold">
                                Your research report
                            </span>
                        </div>

                        <span className="rounded-full bg-[#FFFFFF]/10 px-2.5 py-1 text-[9px] font-bold text-[#86E5A7]">
                            COMPLETE
                        </span>
                    </div>

                    <p className="mt-3 text-xs leading-6 text-[#C7BDB8]">
                        Everything brought together in one structured report,
                        with evidence and links to the original discussions.
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                        <div className="flex items-center gap-2">
                            <Quote className="h-4 w-4 text-[#FF8A65]" />
                            <span className="text-[10px] font-semibold text-[#E7D8D0]">
                                Backed by Reddit sources
                            </span>
                        </div>

                        <ArrowUpRight className="h-5 w-5 text-[#FF8A65]" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ExploreCTA() {
    const scrollToHero = () => {
        document.getElementById("reddit-hero")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <div className="relative mt-0 overflow-hidden rounded-[24px] border border-[#F5D9CD] bg-gradient-to-r from-[#FFF0E9] via-[#FFF8F4] to-[#FFF1E9] p-6 sm:p-7">
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-10 -top-20 h-48 w-48 rounded-full bg-[#FF4500]/10 blur-[60px]" />

            <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                <div className="max-w-[400px]">
                    <div className="mb-2 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-[#FF4500]" />
                        <span className="text-[10px] font-extrabold tracking-[0.16em] text-[#D94B21]">
                            YOUR NEXT BIG IDEA STARTS HERE
                        </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-[#292524] sm:text-xl">
                        Ready to discover what people really need?
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-[#827873]">
                        Search real conversations. Find real problems. Uncover opportunities.
                    </p>
                </div>

                <button
                    onClick={scrollToHero}
                    className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-[#FF4500] px-5 py-3 text-xs font-extrabold text-white shadow-lg shadow-[#FF4500]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E83F00] hover:shadow-xl"
                >
                    Start researching
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
            </div>
        </div>
    );
}

export default function HowItWorks() {
    return (
        <section className="relative overflow-hidden bg-[#FFFCFA] px-5 py-15 sm:px-10 lg:px-12 lg:pb-20">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-40 top-10 h-[350px] w-[350px] rounded-full bg-[#FF4500]/[0.06] blur-[110px]" />
                <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#FF8A65]/[0.08] blur-[120px]" />

                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "radial-gradient(#A34A2D 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
            </div>

            <div className="relative mx-auto max-w-[1300px]">
                {/* Heading */}
                <div className="mx-auto mb-25 max-w-4xl text-center">
                    <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-[#FF4500]/20 bg-[#FFF0EB] px-4 py-2">
                        <MessagesSquare className="h-4 w-4 text-[#FF4500]" />
                        <span className="text-xs font-extrabold tracking-wide text-[#D94B21]">
                            HOW REDDIT RESEARCH WORKS
                        </span>
                    </div>

                    <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#292524] sm:text-4xl lg:text-5xl">
                        The answers are already out there.
                        <span className="ml-2 bg-linear-to-r from-[#FF4500] via-[#F06A3C] to-[#E89A63] bg-clip-text text-transparent">
                            We help you find them.
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-5xl text-sm font-medium leading-7 text-[#827873] sm:text-base">
                        Behind every Reddit discussion is a real experience.
                        We bring those conversations together, uncover the
                        problems people share, and turn them into research
                        you can actually use.
                    </p>
                </div>

                {/* Research journey */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.75fr] lg:gap-8 lg:items-stretch">
                    <ConversationStream />

                    <div className="flex flex-col gap-8">
                        <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-2">
                            <PatternExtraction />
                            <InsightOutputs />
                        </div>

                        {/* CTA pushed to the bottom */}
                        <div className="mt-auto">
                            <ExploreCTA />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
